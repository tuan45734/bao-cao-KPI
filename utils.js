// ========== HÀM TIỆN ÍCH ==========

function formatNumber(num) {
    if (typeof num !== 'number') return num;
    return new Intl.NumberFormat('vi-VN', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);
}

function getChartColor(index, alpha = 1) {
    const colors = [
        `rgba(102, 126, 234, ${alpha})`, `rgba(76, 175, 80, ${alpha})`, `rgba(255, 152, 0, ${alpha})`,
        `rgba(244, 67, 54, ${alpha})`, `rgba(33, 150, 243, ${alpha})`, `rgba(156, 39, 176, ${alpha})`,
        `rgba(255, 193, 7, ${alpha})`, `rgba(0, 150, 136, ${alpha})`
    ];
    return colors[index % colors.length];
}

function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: white;
        padding: 12px 24px;
        border-radius: 30px;
        font-size: 14px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideUp 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
}

function showChartLoading(chartCard) {
    if (!chartCard) return;
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'chart-loading';
    loadingDiv.innerHTML = '<div class="spinner-small"></div><p>Đang lọc dữ liệu...</p>';
    loadingDiv.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255,255,255,0.95);
        padding: 20px;
        border-radius: 10px;
        z-index: 10;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        text-align: center;
    `;
    chartCard.style.position = 'relative';
    chartCard.appendChild(loadingDiv);
}

function hideChartLoading(chartCard) {
    if (!chartCard) return;
    const loadingDiv = chartCard.querySelector('.chart-loading');
    if (loadingDiv) loadingDiv.remove();
}

// ========== HÀM XỬ LÝ DỮ LIỆU ==========

function filterActiveEmployees(data) {
    if (!data) return [];
    
    return data.filter(item => {
        const maNV = item.ma_nv;
        if (!maNV) return false;
        
        const empInfo = employeeMap.get(maNV);
        if (empInfo) {
            return empInfo.trang_thai === "1";
        }
        
        const baseCode = maNV.split('.')[0];
        const baseEmpInfo = employeeMap.get(baseCode);
        if (baseEmpInfo) {
            return baseEmpInfo.trang_thai === "1";
        }
        
        return true;
    });
}

function getNPPTarget(maNPP) {
    if (!maNPP) return 0;

    const npp = nppData.find(item => {
        const normalizedMaNPP = maNPP.replace(/^NPP\s+/i, '').toLowerCase();
        const normalizedTen = item.ten.replace(/^NPP\s+/i, '').toLowerCase();
        return normalizedTen.includes(normalizedMaNPP) || normalizedMaNPP.includes(normalizedTen);
    });

    return npp ? npp.doanhSo : 0;
}

function mergeKPIData(apiData) {
    if (!apiData) return [];

    const dataMap = new Map();
    apiData.forEach(item => {
        dataMap.set(item.ma_nv, item);
    });

    additionalKPIData.forEach(additionalItem => {
        if (dataMap.has(additionalItem.ma_nv)) {
            const existingItem = dataMap.get(additionalItem.ma_nv);
            existingItem.doanh_so.th = (existingItem.doanh_so.th || 0) + (additionalItem.doanh_so.th || 0);
            existingItem.doanh_so.kh = Math.max(existingItem.doanh_so.kh || 0, additionalItem.doanh_so.kh || 0);
            if (existingItem.doanh_so.kh > 0) {
                existingItem.doanh_so.tl = (existingItem.doanh_so.th / existingItem.doanh_so.kh * 100).toFixed(1);
            }
        } else {
            dataMap.set(additionalItem.ma_nv, { ...additionalItem });
        }
    });

    return Array.from(dataMap.values());
}

function calculateNPPRevenue(data) {
    const nppRevenue = new Map();

    nppData.forEach(npp => {
        nppRevenue.set(npp.ten, {
            ten: npp.ten,
            kv: npp.kv,
            target: npp.doanhSo,
            actualRevenue: 0,
            count: 0
        });
    });

    data.forEach(item => {
        const maKV = item.ma_kv || '';
        
        const matchingNPP = nppData.find(npp => {
            const normalizedNPP = npp.ten.replace(/^NPP\s+/i, '').toLowerCase();
            const normalizedMaKV = maKV.replace(/^NPP\s+/i, '').toLowerCase();
            return normalizedMaKV.includes(normalizedNPP) || normalizedNPP.includes(normalizedMaKV);
        });

        if (matchingNPP && nppRevenue.has(matchingNPP.ten)) {
            const revenueData = nppRevenue.get(matchingNPP.ten);
            revenueData.actualRevenue += item.doanh_so?.th || 0;
            revenueData.count += 1;
        }
    });

    return Array.from(nppRevenue.values());
}

function getKVTargetFromNPP(kv) {
    if (kv === 'all') {
        return nppData.reduce((sum, item) => sum + item.doanhSo, 0);
    }
    const kvNPPs = nppData.filter(item => item.kv === kv);
    return kvNPPs.reduce((sum, item) => sum + item.doanhSo, 0);
}

function getAllParentGroups(maDonVi) {
    if (!maDonVi) return [];
    const groups = [];
    let currentMa = maDonVi;
    let visited = new Set();

    while (currentMa && !visited.has(currentMa)) {
        visited.add(currentMa);
        const group = groupMap.get(currentMa);
        if (!group) break;
        if (group.ten && group.ten !== currentMa) {
            groups.unshift(group.ten);
        }
        currentMa = group.ma_nhom_cha;
    }
    return groups;
}

function getEmployeeDisplayInfo(maNV) {
    if (!maNV) return { ten: 'N/A', display: 'N/A', groupPath: '', maDonVi: '' };
    let employeeName = maNV;
    let maDonVi = null;

    if (employeeMap.has(maNV)) {
        const emp = employeeMap.get(maNV);
        employeeName = emp.ten || maNV;
        maDonVi = emp.ma_don_vi;
    } else {
        const baseCode = maNV.split('.')[0];
        if (employeeMap.has(baseCode)) {
            const emp = employeeMap.get(baseCode);
            employeeName = emp.ten || maNV;
            maDonVi = emp.ma_don_vi;
        }
    }

    const parentGroups = getAllParentGroups(maDonVi);
    const groupPath = parentGroups.length > 0 ? parentGroups.join(' › ') : '';
    let display = employeeName;
    if (maDonVi) {
        display = `${employeeName} (${maDonVi})`;
    }
    return { ten: employeeName, maDonVi: maDonVi || '', display: display, groupPath: groupPath };
}

function getEmployeeName(maNV) {
    if (!maNV) return 'N/A';
    if (employeeMap.has(maNV)) return employeeMap.get(maNV).ten;
    const baseCode = maNV.split('.')[0];
    if (employeeMap.has(baseCode)) return employeeMap.get(baseCode).ten;
    return maNV;
}

function getGroupName(maNhom) {
    if (!maNhom) return 'N/A';
    const group = groupMap.get(maNhom);
    return group ? group.ten : maNhom;
}

function findKVFromGroup(maNhom) {
    if (!maNhom) return 'Khác';
    if (maNhom.startsWith('KV') && maNhom.length <= 3) return maNhom;
    let currentMa = maNhom;
    let visited = new Set();

    while (currentMa && !visited.has(currentMa)) {
        visited.add(currentMa);
        const group = groupMap.get(currentMa);
        if (!group) break;
        if (group.ma_nhom_cha && group.ma_nhom_cha.startsWith('KV') && group.ma_nhom_cha.length <= 3) {
            return group.ma_nhom_cha;
        }
        if (currentMa.startsWith('KV') && currentMa.length <= 3) return currentMa;
        currentMa = group.ma_nhom_cha;
    }
    return 'Khác';
}

// ========== HÀM TẢI DỮ LIỆU API ==========

async function fetchEmployees() {
    const loadingEmployees = document.getElementById('loadingEmployees');
    loadingEmployees.style.display = 'block';
    try {
        const auth = document.getElementById('auth').value;
        const response = await fetch('https://openapi.mobiwork.vn/OpenAPI/V1/Sale', {
            method: 'GET',
            headers: { 'accept': 'application/json', 'Authorization': auth }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (data.data && Array.isArray(data.data)) {
            data.data.forEach(emp => {
                if (emp.ma && emp.ten) {
                    employeeMap.set(emp.ma, { 
                        ten: emp.ten, 
                        ma_don_vi: emp.ma_don_vi || null,
                        trang_thai: emp.trang_thai || "0"
                    });
                }
            });
        }
        const activeCount = Array.from(employeeMap.values()).filter(emp => emp.trang_thai === "1").length;
        console.log(`✅ Đã tải ${employeeMap.size} nhân viên (${activeCount} đang hoạt động)`);
    } catch (error) {
        console.error('❌ Lỗi khi tải danh sách nhân viên:', error);
        showError(`Lỗi khi tải danh sách nhân viên: ${error.message}`);
    } finally {
        loadingEmployees.style.display = 'none';
    }
}

async function fetchGroups() {
    const loadingGroups = document.getElementById('loadingGroups');
    loadingGroups.style.display = 'block';
    try {
        const auth = document.getElementById('auth').value;
        const response = await fetch('https://openapi.mobiwork.vn/OpenAPI/V1/SaleGroup', {
            method: 'GET',
            headers: { 'accept': 'application/json', 'Authorization': auth }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (data.data && Array.isArray(data.data)) {
            data.data.forEach(group => {
                if (group.ma_nhom && group.ten_nhom) {
                    groupMap.set(group.ma_nhom, {
                        ten: group.ten_nhom,
                        ma_nhom_cha: group.ma_nhom_cha || null,
                        loai_nhom: group.loai_nhom || ''
                    });
                }
            });
        }
        console.log(`✅ Đã tải ${groupMap.size} nhóm`);
    } catch (error) {
        console.error('❌ Lỗi khi tải danh sách nhóm:', error);
        showError(`Lỗi khi tải danh sách nhóm: ${error.message}`);
    } finally {
        loadingGroups.style.display = 'none';
    }
}