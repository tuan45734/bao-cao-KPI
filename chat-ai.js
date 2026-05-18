// ========== CHAT AI - DEEPSEEK INTEGRATION ==========

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-chat';
const API_KEY_STORAGE_KEY = 'deepseek_api_key';

let isChatOpen = false;
let isSending = false;
let chatHistory = [];

// ========== KHỞI TẠO ==========

function initChat() {
    const savedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (savedKey) {
        document.getElementById('deepseekApiKey').value = savedKey;
        document.getElementById('apiKeyStatus').textContent = '✅ API Key đã được lưu';
        document.getElementById('apiKeyStatus').className = 'chat-api-key-status success';
    }
}

// ========== TOGGLE CHAT ==========

function toggleChat() {
    const panel = document.getElementById('chatPanel');
    const btn = document.getElementById('chatToggleBtn');
    isChatOpen = !isChatOpen;
    
    if (isChatOpen) {
        panel.style.display = 'flex';
        btn.style.display = 'none';
        setTimeout(() => {
            document.getElementById('chatInput').focus();
            scrollToBottom();
        }, 100);
    } else {
        panel.style.display = 'none';
        btn.style.display = 'flex';
    }
}

// ========== API KEY ==========

function toggleApiKeySection() {
    const body = document.getElementById('chatApiKeyBody');
    const chevron = document.getElementById('apiKeyChevron');
    if (body.style.display === 'none') {
        body.style.display = 'block';
        chevron.style.transform = 'rotate(180deg)';
    } else {
        body.style.display = 'none';
        chevron.style.transform = '';
    }
}

function saveApiKey() {
    const keyInput = document.getElementById('deepseekApiKey');
    const statusEl = document.getElementById('apiKeyStatus');
    const key = keyInput.value.trim();
    
    if (!key) {
        statusEl.textContent = '❌ Vui lòng nhập API Key';
        statusEl.className = 'chat-api-key-status error';
        return;
    }
    
    if (!key.startsWith('sk-')) {
        statusEl.textContent = '❌ API Key không hợp lệ (phải bắt đầu bằng sk-)';
        statusEl.className = 'chat-api-key-status error';
        return;
    }
    
    localStorage.setItem(API_KEY_STORAGE_KEY, key);
    statusEl.textContent = '✅ API Key đã được lưu thành công!';
    statusEl.className = 'chat-api-key-status success';
    
    setTimeout(() => {
        statusEl.textContent = '';
        statusEl.className = 'chat-api-key-status';
    }, 3000);
}

function getApiKey() {
    const key = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (key) return key;
    
    const inputKey = document.getElementById('deepseekApiKey').value.trim();
    if (inputKey) {
        localStorage.setItem(API_KEY_STORAGE_KEY, inputKey);
        return inputKey;
    }
    return null;
}

// ========== QUICK QUESTION BUTTONS ==========

function sendQuickQuestion(question) {
    document.getElementById('chatInput').value = question;
    sendChatMessage();
}

// ========== INPUT HANDLING ==========

function autoResizeInput(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
}

function handleChatKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendChatMessage();
    }
}

// ========== BUILD SYSTEM PROMPT WITH CURRENT DATA CONTEXT ==========

function buildSystemPrompt() {
    let context = `Bạn là trợ lý AI phân tích báo cáo KPI Tất Cả. 
Bạn có nhiệm vụ trả lời các câu hỏi về số liệu báo cáo dựa trên dữ liệu hiện tại.
Trả lời bằng tiếng Việt, ngắn gọn, chính xác, thân thiện.
Khi hiển thị số tiền, dùng định dạng Việt Nam (phân cách hàng nghìn bằng dấu chấm).
Khi hiển thị tỷ lệ %, làm tròn 1 chữ số thập phân.

DỮ LIỆU BÁO CÁO HIỆN TẠI:
`;

    // Report title info
    const reportTitle = document.getElementById('reportTitle');
    if (reportTitle) {
        context += `- Tiêu đề báo cáo: ${reportTitle.textContent}\n`;
    }

    // Current month/year
    const month = document.getElementById('month')?.value || 'N/A';
    const year = document.getElementById('year')?.value || 'N/A';
    context += `- Kỳ báo cáo: Tháng ${month}/${year}\n`;

    if (!currentData || currentData.length === 0) {
        context += `- Chưa có dữ liệu KPI. Hãy yêu cầu người dùng tải dữ liệu trước.\n`;
        return context;
    }

    // Total employees
    const totalEmployees = currentData.length;
    const activeEmployees = filterActiveEmployees(currentData).length;
    context += `- Tổng số nhân viên: ${totalEmployees} (${activeEmployees} đang hoạt động)\n`;

    // Overall revenue
    const tongDoanhSoTH = currentData.reduce((sum, item) => sum + (item.doanh_so?.th || 0), 0);
    const tongDoanhSoKH = getKVTargetFromNPP('all');
    const tlTrungBinh = tongDoanhSoKH > 0 ? (tongDoanhSoTH / tongDoanhSoKH * 100) : 0;
    context += `- Tổng doanh số thực tế: ${formatNumber(tongDoanhSoTH)} VNĐ\n`;
    context += `- Tổng kế hoạch: ${formatNumber(tongDoanhSoKH)} VNĐ\n`;
    context += `- Tỷ lệ hoàn thành trung bình: ${tlTrungBinh.toFixed(1)}%\n`;

    // Top 5 employees by revenue
    const top5 = [...currentData]
        .filter(item => (item.doanh_so?.th || 0) > 0)
        .sort((a, b) => (b.doanh_so?.th || 0) - (a.doanh_so?.th || 0))
        .slice(0, 5);

    if (top5.length > 0) {
        context += `\n-- TOP 5 NHÂN VIÊN DOANH SỐ CAO NHẤT --\n`;
        top5.forEach((item, i) => {
            const name = getEmployeeName(item.ma_nv);
            const revenue = item.doanh_so?.th || 0;
            const target = item.doanh_so?.kh || 0;
            const tl = target > 0 ? ((revenue / target) * 100).toFixed(1) : 0;
            const kv = findKVFromGroup(item.ma_kv || 'Khác');
            context += `${i + 1}. ${name} - KV: ${kv} - DS: ${formatNumber(revenue)} - KH: ${formatNumber(target)} - TL: ${tl}%\n`;
        });
    }

    // Bottom 5 employees
    const bottom5 = [...currentData]
        .filter(item => (item.doanh_so?.th || 0) > 0)
        .sort((a, b) => (a.doanh_so?.th || 0) - (b.doanh_so?.th || 0))
        .slice(0, 5);

    if (bottom5.length > 0) {
        context += `\n-- 5 NHÂN VIÊN DOANH SỐ THẤP NHẤT --\n`;
        bottom5.forEach((item, i) => {
            const name = getEmployeeName(item.ma_nv);
            const revenue = item.doanh_so?.th || 0;
            const target = item.doanh_so?.kh || 0;
            const tl = target > 0 ? ((revenue / target) * 100).toFixed(1) : 0;
            const kv = findKVFromGroup(item.ma_kv || 'Khác');
            context += `${i + 1}. ${name} - KV: ${kv} - DS: ${formatNumber(revenue)} - KH: ${formatNumber(target)} - TL: ${tl}%\n`;
        });
    }

    // Revenue by KV
    context += `\n-- DOANH SỐ THEO KHU VỰC --\n`;
    const kvRevenue = {};
    currentData.forEach(item => {
        const kv = findKVFromGroup(item.ma_kv || 'Khác');
        const revenue = item.doanh_so?.th || 0;
        if (!kvRevenue[kv]) kvRevenue[kv] = { th: 0, count: 0 };
        kvRevenue[kv].th += revenue;
        kvRevenue[kv].count += 1;
    });

    const uniqueKVs = [...new Set(nppData.map(item => item.kv))];
    uniqueKVs.forEach(kv => {
        const data = kvRevenue[kv] || { th: 0, count: 0 };
        const target = getKVTargetFromNPP(kv);
        const tl = target > 0 ? ((data.th / target) * 100).toFixed(1) : 0;
        const kvName = getGroupName(kv) || kv;
        context += `${kvName}: DS=${formatNumber(data.th)} - KH=${formatNumber(target)} - TL=${tl}% - ${data.count} NV\n`;
    });

    // NPP data
    context += `\n-- DỮ LIỆU NPP (NHÀ PHÂN PHỐI) --\n`;
    const nppRevenue = calculateNPPRevenue(currentData);
    nppRevenue.sort((a, b) => b.actualRevenue - a.actualRevenue);
    nppRevenue.slice(0, 10).forEach((npp, i) => {
        const tl = npp.target > 0 ? ((npp.actualRevenue / npp.target) * 100).toFixed(1) : 0;
        context += `${i + 1}. ${npp.ten} (${npp.kv}): TH=${formatNumber(npp.actualRevenue)} - KH=${formatNumber(npp.target)} - TL=${tl}%\n`;
    });

    return context;
}

// ========== SEND MESSAGE TO DEEPSEEK ==========

async function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const sendBtn = document.querySelector('.chat-send-btn');
    const messagesContainer = document.getElementById('chatMessages');
    const question = input.value.trim();

    if (!question || isSending) return;

    // Check API key
    const apiKey = getApiKey();
    if (!apiKey) {
        addMessage('Vui lòng nhập API Key DeepSeek trước khi sử dụng. Nhấn vào "Cấu hình API Key" ở trên để nhập.', 'ai');
        document.getElementById('chatApiKeyBody').style.display = 'block';
        document.getElementById('apiKeyChevron').style.transform = 'rotate(180deg)';
        return;
    }

    // Add user message
    addMessage(question, 'user');
    input.value = '';
    input.style.height = 'auto';
    isSending = true;
    sendBtn.disabled = true;

    // Show typing indicator
    const typingEl = showTypingIndicator();

    try {
        const systemPrompt = buildSystemPrompt();
        
        // Build messages array
        const messages = [
            { role: 'system', content: systemPrompt },
            ...chatHistory.slice(-10), // Last 10 messages for context
            { role: 'user', content: question }
        ];

        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: DEEPSEEK_MODEL,
                messages: messages,
                temperature: 0.3,
                max_tokens: 2048,
                stream: false
            })
        });

        if (!response.ok) {
            let errorMsg = `Lỗi API (${response.status})`;
            if (response.status === 401) {
                errorMsg = 'API Key không hợp lệ. Vui lòng kiểm tra lại API Key.';
            } else if (response.status === 429) {
                errorMsg = 'Đã vượt quá giới hạn request. Vui lòng thử lại sau.';
            } else if (response.status === 402) {
                errorMsg = 'Tài khoản không đủ credit. Vui lòng nạp thêm.';
            } else {
                try {
                    const errData = await response.json();
                    errorMsg = errData.error?.message || errorMsg;
                } catch (e) {}
            }
            throw new Error(errorMsg);
        }

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || 'Xin lỗi, tôi không thể xử lý yêu cầu này.';
        
        // Remove typing indicator
        removeTypingIndicator(typingEl);
        
        // Add AI response
        addMessage(reply, 'ai');
        
        // Save to history (only user + assistant pairs)
        chatHistory.push({ role: 'user', content: question });
        chatHistory.push({ role: 'assistant', content: reply });

    } catch (error) {
        removeTypingIndicator(typingEl);
        addMessage(`❌ ${error.message}`, 'ai');
        console.error('Chat AI error:', error);
    } finally {
        isSending = false;
        sendBtn.disabled = false;
        input.focus();
    }
}

// ========== UI HELPERS ==========

function addMessage(text, type) {
    const container = document.getElementById('chatMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message chat-message-${type}`;
    
    const icon = type === 'user' ? 'fa-user' : 'fa-robot';
    
    // Format text: make numbers stand out
    let formattedText = text;
    if (type === 'ai') {
        // Highlight numbers in the AI response
        formattedText = text.replace(/(\d{1,3}(?:\.\d{3})*(?:,\d+)?)/g, '<span class="highlight-number">$1</span>');
    }
    
    msgDiv.innerHTML = `
        <div class="chat-message-avatar"><i class="fas ${icon}"></i></div>
        <div class="chat-message-content">${formattedText}</div>
    `;
    
    container.appendChild(msgDiv);
    scrollToBottom();
}

function showTypingIndicator() {
    const container = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-typing';
    typingDiv.id = 'chatTypingIndicator';
    typingDiv.innerHTML = `
        <div class="chat-message-avatar"><i class="fas fa-robot"></i></div>
        <div class="chat-typing-dots">
            <span></span><span></span><span></span>
        </div>
    `;
    container.appendChild(typingDiv);
    scrollToBottom();
    return typingDiv;
}

function removeTypingIndicator(element) {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

function scrollToBottom() {
    const container = document.getElementById('chatMessages');
    setTimeout(() => {
        container.scrollTop = container.scrollHeight;
    }, 50);
}

function clearChat() {
    const container = document.getElementById('chatMessages');
    // Keep only the first welcome message
    container.innerHTML = `
        <div class="chat-message chat-message-ai">
            <div class="chat-message-avatar"><i class="fas fa-robot"></i></div>
            <div class="chat-message-content">
                Xin chào! Tôi là trợ lý AI. Hãy hỏi tôi về số liệu báo cáo KPI hiện tại, ví dụ:
                <ul style="margin: 8px 0 0 20px; font-size: 13px; opacity: 0.8;">
                    <li>Tổng doanh số thực tế là bao nhiêu?</li>
                    <li>Nhân viên có doanh số cao nhất?</li>
                    <li>Khu vực nào hoạt động tốt nhất?</li>
                    <li>Phân tích tình hình KV1</li>
                </ul>
            </div>
        </div>
    `;
    chatHistory = [];
}

// Export init function
window.initChat = initChat;
window.toggleChat = toggleChat;
window.toggleApiKeySection = toggleApiKeySection;
window.saveApiKey = saveApiKey;
window.sendChatMessage = sendChatMessage;
window.sendQuickQuestion = sendQuickQuestion;
window.handleChatKeyDown = handleChatKeyDown;
window.autoResizeInput = autoResizeInput;
window.clearChat = clearChat;
