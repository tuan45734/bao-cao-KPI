// Thêm vào đầu file script.js, sau các khai báo biến
// Dữ liệu NPP từ file Excel
const nppData = [
 {   "ten": "NPP Công Giang",   "doanhSo": 1000000000,   "kv": "KV1" },
 {   "ten": "NPP Cường Thịnh",   "doanhSo": 720000000,   "kv": "KV1" },
 {   "ten": "NPP Dũng Cúc",   "doanhSo": 400000000,   "kv": "KV1" },
 {   "ten": "NPP Đức Nam Tiến",   "doanhSo": 900000000,   "kv": "KV1" },
 {   "ten": "NPP Long Liên",   "doanhSo": 1050000000,   "kv": "KV1" },
 {   "ten": "NPP Bảo Lâm",   "doanhSo": 1669801000,   "kv": "KV1" },
 {   "ten": "NPP Lâm Hạ",   "doanhSo": 720000000,   "kv": "KV1" },
 {   "ten": "NPP Nguyên Vũ",   "doanhSo": 1635000000,   "kv": "KV1" },
 {   "ten": "NPP Vũ Tấm",   "doanhSo": 1250000000,   "kv": "KV1" },
 {   "ten": "NPP Thảo Nam",   "doanhSo": 1050000000,   "kv": "KV1" },
 {   "ten": "NPP Tuấn Huê",   "doanhSo": 1180000000,   "kv": "KV1" },
 {   "ten": "NPP Tuấn Yến",   "doanhSo": 1070000000,   "kv": "KV1" },
 {   "ten": "NPP Duy Anh",   "doanhSo": 806236000,   "kv": "KV2" },
 {   "ten": "NPP Hoa Việt",   "doanhSo": 1306094000,   "kv": "KV2" },
 {   "ten": "NPP Hùng Huệ",   "doanhSo": 806236000,   "kv": "KV2" },
 {   "ten": "NPP Long Châm",   "doanhSo": 806236000,   "kv": "KV2" },
 {   "ten": "NPP Ngọc Kiên",   "doanhSo": 1259604000,   "kv": "KV2" },
 {   "ten": "NPP Ngọc Thêu",   "doanhSo": 1259604000,   "kv": "KV2" },
 {   "ten": "NPP Thành Lụa",   "doanhSo": 740000000,   "kv": "KV2" },
 {   "ten": "NPP Phong Hiền",   "doanhSo": 962447000,   "kv": "KV2" },
 {   "ten": "NPP Phúc Thịnh",   "doanhSo": 810042000,   "kv": "KV2" },
 {   "ten": "NPP Phương Đông",   "doanhSo": 3030456000,   "kv": "KV2" },
 {   "ten": "NPP Tuấn Huyền",   "doanhSo": 806237000,   "kv": "KV2" },
 {   "ten": "NPP Bảo Cường",   "doanhSo": 1275000000,   "kv": "KV3" },
 {   "ten": "NPP Hikoji",   "doanhSo": 1465000000,   "kv": "KV3" },
 {   "ten": "NPP Long Hải",   "doanhSo": 965000000,   "kv": "KV3" },
 {   "ten": "NPP Tân Hoa",   "doanhSo": 1308000000,   "kv": "KV3" },
 {   "ten": "NPP Tây Đô",   "doanhSo": 1360000000,   "kv": "KV3" },
 {   "ten": "NPP Thành Hân",   "doanhSo": 1760000000,   "kv": "KV3" },
 {   "ten": "NPP Thắng Lợi",   "doanhSo": 1309000000,   "kv": "KV3" },
 {   "ten": "NPP Tiến Thịnh",   "doanhSo": 1260000000,   "kv": "KV3" },
 {   "ten": "NPP Ánh Thu",   "doanhSo": 1399882300,   "kv": "KV4" },
 {   "ten": "NPP Dũng Béo",   "doanhSo": 1166568583,   "kv": "KV4" },
 {   "ten": "NPP Thăng Hương",   "doanhSo": 933254867,   "kv": "KV4" },
 {   "ten": "NPP Dương Minh",   "doanhSo": 1399882300,   "kv": "KV4" },
 {   "ten": "NPP Đức Oanh",   "doanhSo": 933254867,   "kv": "KV4" },
 {   "ten": "NPP Hưng Thịnh",   "doanhSo":  1166568583,   "kv": "KV4" },
 {   "ten": "NPP Ngọc Phúc",   "doanhSo": 933254867,   "kv": "KV4" },
 {   "ten": "NPP Nguyễn Đình Hân",   "doanhSo": 1399882300,   "kv": "KV4" },
 {   "ten": "NPP Tân Thúy",   "doanhSo": 2333137167,   "kv": "KV4" },
 {   "ten": "NPP Thảo Thắng",   "doanhSo": 1399882300,   "kv": "KV4" },
 {   "ten": "NPP Tùng Phương",   "doanhSo": 933254867,   "kv": "KV4" },
 {   "ten": "NPP Đồng Lợi",   "doanhSo": 842336138,   "kv": "KV5" },
 {   "ten": "NPP Hải Hằng",   "doanhSo": 1203337340,   "kv": "KV5" },
 {   "ten": "NPP Hoàng Minh",   "doanhSo": 1484940907,   "kv": "KV5" },
 {   "ten": "NPP Oanh Định",   "doanhSo": 682100632,   "kv": "KV5" },
 {   "ten": "NPP Sơn Lâm",   "doanhSo": 1431184296,   "kv": "KV5" },
 {   "ten": "NPP Thái Hoà",   "doanhSo": 1510581931,   "kv": "KV5" },
 {   "ten": "NPP Thảo Xuân",   "doanhSo": 1083003606,   "kv": "KV5" },
 {   "ten": "NPP Tiên Lan",   "doanhSo": 1323671074,   "kv": "KV5" },
 {   "ten": "NPP Hiền Cường",   "doanhSo": 907878933,   "kv": "KV5" },
 {   "ten": "NPP Tuấn Vân",   "doanhSo": 842336138,   "kv": "KV5" },
 {   "ten": "NPP Vũ Đức Nam",   "doanhSo": 722002404,   "kv": "KV5" },
 {   "ten": "NPP Anh Minh HT",   "doanhSo": 1200000000,   "kv": "KV6" },
 {   "ten": "NPP Hà Thanh",   "doanhSo": 1150000000,   "kv": "KV6" },
 {   "ten": "NPP Hồng Đức",   "doanhSo": 740000000,   "kv": "KV6" },
 {   "ten": "NPP Thanh Bình",   "doanhSo": 708000000,   "kv": "KV6" },
 {   "ten": "NPP Linh Trang",   "doanhSo": 760000000,   "kv": "KV6" },
 {   "ten": "NPP Mạnh Hà 1",   "doanhSo": 1150000000,   "kv": "KV6" },
 {   "ten": "NPP Minh Châu",   "doanhSo": 920000000,   "kv": "KV6" },
 {   "ten": "NPP Nhung Tùng",   "doanhSo": 1380000000,   "kv": "KV6" },
 {   "ten": "NPP Phương Hà",   "doanhSo": 1140000000,   "kv": "KV6" },
 {   "ten": "NPP Mạnh Hà 2",   "doanhSo": 630000000,   "kv": "KV6" },
 {   "ten": "NPP Tân Bích An",   "doanhSo": 570000000,   "kv": "KV6" },
 {   "ten": "NPP Thành Thanh",   "doanhSo": 1150000000,   "kv": "KV6" },
 {   "ten": "NPP Trường Hằng",   "doanhSo": 800000000,   "kv": "KV6" },
 {   "ten": "NPP Minh Lộc",   "doanhSo": 352000000,   "kv": "KV6" },
 {   "ten": "NPP Thông Thơm",   "doanhSo": 380000000,   "kv": "KV6" }
];
const additionalKPIData = [
// {
//         "ma_nv": "A109.12",
//         "doanh_so": { "kh": 254000000, "th": 24088535	, "tl": 9.5 },
//         "ma_kv": "NPP Hikoji"
// },
//     {
//         "ma_nv": "A304.05",
//         "doanh_so": { "kh": 247490151, "th": 19256600, "tl": 7.8 },
//         "ma_kv": "NPP Hoàng Minh"
// },{
//         "ma_nv": "A301.14",
//         "doanh_so": { "kh": 233313717, "th": 28830240, "tl": 12.4 },
//         "ma_kv": "NPP Tân Thúy"
// },{
//         "ma_nv": "A104.02",
//         "doanh_so": { "kh": 190000000, "th": 16946020, "tl": 8.9 },
//         "ma_kv": "NPP Vũ Tấm"
// },{
//         "ma_nv": "A104.01",
//         "doanh_so": { "kh": 190000000, "th": 1690140, "tl": 0.9 },
//         "ma_kv": "NPP Vũ Tấm"
// },{
//         "ma_nv": "A316.02",
//         "doanh_so": { "kh": 228989487, "th": 6188420, "tl": 2.7 },
//         "ma_kv": "NPP Sơn Lâm"
// },
// {
//         "ma_nv": "A316.01",
//         "doanh_so": { "kh": 228989487, "th": 4240340, "tl": 1.9 },
//         "ma_kv": "NPP Sơn Lâm"
// },
// {
//         "ma_nv": "A316.03",
//         "doanh_so": { "kh": 228989487, "th": 1393560, "tl": 0.6 },
//         "ma_kv": "NPP Sơn Lâm"
// },{
//         "ma_nv": "A304.10",
//         "doanh_so": { "kh": 227430757, "th": 35373120, "tl": 15.6 },
//         "ma_kv": "NPP Đồng Lợi"
// },{
//         "ma_nv": "A304.10",
//         "doanh_so": { "kh": 220000000, "th": 29023500, "tl": 13.2 },
//         "ma_kv": "NPP Phương Hà"
// },{
//         "ma_nv": "A402.07",
//         "doanh_so": { "kh": 252000000, "th": 16668100, "tl": 6.6 },
//         "ma_kv": "NPP Tân Hoa"
// },{
//         "ma_nv": "A403.01",
//         "doanh_so": { "kh": 233313717, "th": 23550480, "tl": 10.1 },
//         "ma_kv": "NPP Tùng Phương"
// }
];
let currentData = null;
let topCompletionChart = null;
let bottomCompletionChart = null;
let topAreaChart = null;
let bottomAreaChart = null;
let areaRevenueChart = null;
let allData = null;
let employeeMap = new Map();
let groupMap = new Map();
let hasDataLabelsPlugin = false;
let currentTopKVFilter = 'all';
let currentBottomKVFilter = 'all';
let currentKVFilter = 'all';

function getNPPTarget(maNPP) {
    if (!maNPP) return 0;

    // Tìm NPP trong danh sách
    const npp = nppData.find(item => {
        // Loại bỏ "NPP " prefix để so sánh tốt hơn
        const normalizedMaNPP = maNPP.replace(/^NPP\s+/i, '').toLowerCase();
        const normalizedTen = item.ten.replace(/^NPP\s+/i, '').toLowerCase();

        return normalizedTen.includes(normalizedMaNPP) ||
            normalizedMaNPP.includes(normalizedTen);
    });

    return npp ? npp.doanhSo : 0;
}
function mergeKPIData(apiData) {
    if (!apiData) return [];

    // Tạo map từ dữ liệu API để dễ dàng cập nhật
    const dataMap = new Map();
    apiData.forEach(item => {
        dataMap.set(item.ma_nv, item);
    });

    // Hợp nhất dữ liệu bổ sung
    additionalKPIData.forEach(additionalItem => {
        if (dataMap.has(additionalItem.ma_nv)) {
            // Nếu đã tồn tại, cập nhật doanh số
            const existingItem = dataMap.get(additionalItem.ma_nv);
            existingItem.doanh_so.th = (existingItem.doanh_so.th || 0) + (additionalItem.doanh_so.th || 0);
            existingItem.doanh_so.kh = Math.max(existingItem.doanh_so.kh || 0, additionalItem.doanh_so.kh || 0);
            if (existingItem.doanh_so.kh > 0) {
                existingItem.doanh_so.tl = (existingItem.doanh_so.th / existingItem.doanh_so.kh * 100).toFixed(1);
            }
        } else {
            // Nếu chưa tồn tại, thêm mới
            dataMap.set(additionalItem.ma_nv, { ...additionalItem });
        }
    });

    return Array.from(dataMap.values());
}
function calculateNPPRevenue(data) {
    const nppRevenue = new Map();

    // Khởi tạo dữ liệu cho tất cả NPP
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
// Đăng ký plugin datalabels
try {
    if (typeof ChartDataLabels !== 'undefined') {
        Chart.register(ChartDataLabels);
        hasDataLabelsPlugin = true;
        console.log('✅ Đã đăng ký ChartDataLabels plugin');
    } else {
        console.warn('⚠️ Không tìm thấy ChartDataLabels plugin');
    }
} catch (e) {
    console.warn('⚠️ Lỗi khi đăng ký ChartDataLabels plugin:', e);
}

// ========== HÀM HỖ TRỢ ==========

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

// ========== HÀM HIỂN THỊ LOADING ==========

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

// ========== HÀM TẢI DỮ LIỆU ==========

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
                    employeeMap.set(emp.ma, { ten: emp.ten, ma_don_vi: emp.ma_don_vi || null });
                }
            });
        }
        console.log(`✅ Đã tải ${employeeMap.size} nhân viên`);
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

async function searchKPI() {
    
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;
    const auth = document.getElementById('auth').value;
    const searchBtn = document.getElementById('searchBtn');
    const loading = document.getElementById('loading');
    const reportSection = document.getElementById('reportSection');
    const errorMessage = document.getElementById('errorMessage');
    const dataInfo = document.getElementById('dataInfo');

    if (!month || !year || !auth) {
        showError('Vui lòng nhập đầy đủ thông tin: Tháng, Năm và Authorization');
        return;
    }

    searchBtn.disabled = true;
    loading.classList.add('active');
    reportSection.classList.remove('active');
    errorMessage.style.display = 'none';
    dataInfo.style.display = 'none';

    try {
        console.log('🔄 Đang tải dữ liệu nhân viên và nhóm...');
        await Promise.all([fetchEmployees(), fetchGroups()]);
        console.log('⏳ Đợi 2 giây trước khi gọi API KPI...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('🔄 Đang tải dữ liệu KPI...');

        const url = `https://openapi.mobiwork.vn/OpenAPI/V1/KPI?thang=${month}&nam=${year}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'accept': 'application/json', 'Authorization': auth }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        // Hợp nhất dữ liệu từ API và dữ liệu bổ sung
        const mergedData = mergeKPIData(data.result || []);

        currentData = mergedData;
        allData = JSON.parse(JSON.stringify(mergedData));
        document.getElementById('reportTitle').textContent = `Báo cáo KPI Miền Bắc tháng ${month}/${year}`;
        displayDataInfo(currentData);
        setTimeout(() => createCharts(currentData), 100);
        displaySummaryStats(currentData);
        reportSection.classList.add('active');
        console.log(`✅ Đã tải xong dữ liệu KPI: ${currentData.length} nhân viên (bao gồm dữ liệu bổ sung)`);
    } catch (error) {
        console.error('❌ Lỗi chi tiết:', error);
        showError(`Lỗi khi tải dữ liệu: ${error.message}`);
    } finally {
        searchBtn.disabled = false;
        loading.classList.remove('active');
    }
}

function displayDataInfo(data) {
    const dataInfo = document.getElementById('dataInfo');
    if (data && data.length > 0) {
        dataInfo.innerHTML = `📊 Đã tìm thấy ${data.length} nhân viên có dữ liệu KPI`;
        dataInfo.style.display = 'block';
    }
}

function filterTopEmployees(kv, event) {
    // Reset tất cả nút trong cùng group
    const parentDiv = event.target.closest('.kv-filter-employee');
    parentDiv.querySelectorAll('.kv-btn-employee').forEach(btn => {
        btn.classList.remove('top-active');
    });
    event.target.classList.add('top-active');

    currentTopKVFilter = kv;
    if (!currentData) return;

    const chartCard = event.target.closest('.chart-card');
    showChartLoading(chartCard);

    setTimeout(() => {
        let filteredData = currentData;
        if (kv !== 'all') {
            filteredData = currentData.filter(item => {
                const itemKV = findKVFromGroup(item.ma_kv || 'Khác');
                return itemKV === kv;
            });
        }

        if (filteredData.length === 0) {
            showToast(`Không có dữ liệu nhân viên cho ${kv}`);
            parentDiv.querySelectorAll('.kv-btn-employee').forEach(btn => {
                btn.classList.remove('top-active');
            });
            parentDiv.querySelector('[data-kv="all"]').classList.add('top-active');
            currentTopKVFilter = 'all';
            createTopCompletionChart(currentData);
        } else {
            createTopCompletionChart(filteredData, kv);
        }
        hideChartLoading(chartCard);
    }, 300);
}

function filterBottomEmployees(kv, event) {
    // Reset tất cả nút trong cùng group
    const parentDiv = event.target.closest('.kv-filter-employee');
    parentDiv.querySelectorAll('.kv-btn-employee').forEach(btn => {
        btn.classList.remove('bottom-active');
    });
    event.target.classList.add('bottom-active');

    currentBottomKVFilter = kv;
    if (!currentData) return;

    const chartCard = event.target.closest('.chart-card');
    showChartLoading(chartCard);

    setTimeout(() => {
        let filteredData = currentData;
        if (kv !== 'all') {
            filteredData = currentData.filter(item => {
                const itemKV = findKVFromGroup(item.ma_kv || 'Khác');
                return itemKV === kv;
            });
        }

        if (filteredData.length === 0) {
            showToast(`Không có dữ liệu nhân viên cho ${kv}`);
            parentDiv.querySelectorAll('.kv-btn-employee').forEach(btn => {
                btn.classList.remove('bottom-active');
            });
            parentDiv.querySelector('[data-kv="all"]').classList.add('bottom-active');
            currentBottomKVFilter = 'all';
            createBottomCompletionChart(currentData);
        } else {
            createBottomCompletionChart(filteredData, kv);
        }
        hideChartLoading(chartCard);
    }, 300);
}

function filterAreaRevenue(kv, event) {
    const parentDiv = event.target.closest('.kv-filter');
    parentDiv.querySelectorAll('.kv-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    currentKVFilter = kv;
    if (!currentData) return;

    const nppRevenueData = calculateNPPRevenue(currentData);
    updateTotalRevenueFromNPP(nppRevenueData);

    const chartCard = event.target.closest('.chart-card');

    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'kv-loading';
    loadingDiv.innerHTML = '<div class="spinner-small"></div><p>Đang lọc dữ liệu...</p>';
    loadingDiv.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(255,255,255,0.9); padding: 20px; border-radius: 10px; z-index: 10;';
    chartCard.style.position = 'relative';
    chartCard.appendChild(loadingDiv);

    setTimeout(() => {
        if (kv === 'all') {
            createAreaRevenueChart(currentData);
        } else {
            createNPPChartByKV(currentData, kv);
        }

        const loadingDiv = chartCard.querySelector('.kv-loading');
        if (loadingDiv) loadingDiv.remove();
    }, 300);
}

function updateTotalRevenue(data, kv = 'all') {
    if (!data) return;

    let totalRevenue = 0;
    let totalTarget = 0;

    if (kv === 'all') {
        totalRevenue = data.reduce((sum, item) => sum + (item.doanh_so?.th || 0), 0);
        totalTarget = getKVTargetFromNPP('all');
    } else {
        totalRevenue = data
            .filter(item => {
                const itemKV = findKVFromGroup(item.ma_kv || 'Khác');
                return itemKV === kv;
            })
            .reduce((sum, item) => sum + (item.doanh_so?.th || 0), 0);

        totalTarget = getKVTargetFromNPP(kv);
    }

    const completionRate = totalTarget > 0 ? (totalRevenue / totalTarget * 100).toFixed(1) : 0;

    const totalRevenueElement = document.getElementById('totalRevenueAll');
    if (totalRevenueElement) {
        totalRevenueElement.innerHTML = `${formatNumber(totalRevenue)} / ${formatNumber(totalTarget)} (${completionRate}%)`;
    }
}

// ========== HÀM TẠO BIỂU ĐỒ ==========

function createCharts(data) {
    console.log('🔄 Đang vẽ biểu đồ...');

    // Reset filters
    currentTopKVFilter = 'all';
    currentBottomKVFilter = 'all';
    currentKVFilter = 'all';

    // Reset active states - Top chart
    const topFilter = document.querySelector('.kv-filter-employee:first-child');
    if (topFilter) {
        topFilter.querySelectorAll('.kv-btn-employee').forEach(btn => {
            btn.classList.remove('top-active');
        });
        topFilter.querySelector('[data-kv="all"]').classList.add('top-active');
    }

    // Reset active states - Bottom chart
    const bottomFilter = document.querySelector('.kv-filter-employee:last-child');
    if (bottomFilter) {
        bottomFilter.querySelectorAll('.kv-btn-employee').forEach(btn => {
            btn.classList.remove('bottom-active');
        });
        bottomFilter.querySelector('[data-kv="all"]').classList.add('bottom-active');
    }

    // Reset active states - Area chart
    const areaFilter = document.querySelector('.kv-filter');
    if (areaFilter) {
        areaFilter.querySelectorAll('.kv-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        areaFilter.querySelector('[data-kv="all"]').classList.add('active');
    }

    // Destroy old charts
    if (topCompletionChart) topCompletionChart.destroy();
    if (bottomCompletionChart) bottomCompletionChart.destroy();
    if (topAreaChart) topAreaChart.destroy();
    if (bottomAreaChart) bottomAreaChart.destroy();
    if (areaRevenueChart) areaRevenueChart.destroy();

    if (!data || data.length === 0) {
        console.warn('⚠️ Không có dữ liệu để vẽ biểu đồ');
        return;
    }

    createTopCompletionChart(data);
    createBottomCompletionChart(data);
    createTopAreaChart(data);
    createBottomAreaChart(data);
    createAreaRevenueChart(data);
    console.log('✅ Đã vẽ xong biểu đồ');
}
function createTopCompletionChart(data, kv = 'all') {
    if (!data || data.length === 0) return;

    const chartCard = document.getElementById('topCompletionChart')?.closest('.chart-card');
    if (chartCard) {
        const titleElement = chartCard.querySelector('h3');
        if (titleElement) {
            if (kv === 'all') {
                titleElement.innerHTML = '🏆 15 Nhân viên doanh số cao nhất (Miền Bắc)';
            } else {
                const kvName = getGroupName(kv) || kv;
                titleElement.innerHTML = `🏆 15 Nhân viên doanh số cao nhất - ${kvName}`;
            }
        }
    }

    const topData = [...data]
        .filter(item => (item.doanh_so?.th || 0) > 0)
        .sort((a, b) => (b.doanh_so?.th || 0) - (a.doanh_so?.th || 0))
        .slice(0, 15);

    if (topData.length === 0) {
        const ctx = document.getElementById('topCompletionChart').getContext('2d');
        if (topCompletionChart) topCompletionChart.destroy();
        topCompletionChart = new Chart(ctx, {
            type: 'bar',
            data: { labels: ['Không có dữ liệu'], datasets: [{ label: 'Doanh số (VNĐ)', data: [0], backgroundColor: 'rgba(200,200,200,0.5)' }] },
            options: { plugins: { legend: { display: false }, tooltip: { enabled: false } } }
        });
        return;
    }

    // Sửa labels để hiển thị thêm KV
    const labels = topData.map(item => {
        const { ten, maDonVi, groupPath } = getEmployeeDisplayInfo(item.ma_nv);
        // Lấy KV của nhân viên
        const employeeKV = findKVFromGroup(item.ma_kv || 'Khác');
        const kvDisplay = employeeKV !== 'Khác' ? ` [${employeeKV}]` : '';

        if (groupPath && maDonVi) return `${ten}${kvDisplay}-${maDonVi}`;
        if (maDonVi) return `${ten}${kvDisplay} (${maDonVi})`;
        if (groupPath) return `${ten}${kvDisplay}\n(${groupPath})`;
        return `${ten}${kvDisplay}`;
    });

    const revenues = topData.map(item => item.doanh_so?.th || 0);

    const maxRevenue = Math.max(...revenues);
    let maxAxis = Math.ceil(maxRevenue * 1.3 / 1000000) * 1000000;

    try {
        const ctx = document.getElementById('topCompletionChart').getContext('2d');
        if (topCompletionChart) topCompletionChart.destroy();

        topCompletionChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Doanh số (VNĐ)',
                    data: revenues,
                    backgroundColor: revenues.map(revenue => {
                        if (revenue >= 100000000) return 'rgba(76, 175, 80, 0.7)';
                        if (revenue >= 50000000) return 'rgba(33, 150, 243, 0.7)';
                        if (revenue >= 10000000) return 'rgba(255, 193, 7, 0.7)';
                        return 'rgba(244, 67, 54, 0.7)';
                    }),
                    borderColor: revenues.map(revenue => {
                        if (revenue >= 100000000) return 'rgba(76, 175, 80, 1)';
                        if (revenue >= 50000000) return 'rgba(33, 150, 243, 1)';
                        if (revenue >= 10000000) return 'rgba(255, 193, 7, 1)';
                        return 'rgba(244, 67, 54, 1)';
                    }),
                    borderWidth: 1,
                    borderRadius: 5
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { font: { size: 12 } } },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: { size: 14, weight: 'bold' },
                        bodyFont: { size: 13 },
                        padding: 12,
                        callbacks: {
                            label: function (context) {
                                const item = topData[context.dataIndex];
                                const revenue = context.raw;
                                const target = item.doanh_so?.kh || 0;
                                const completionRate = target > 0 ? ((revenue / target) * 100).toFixed(1) : 0;
                                const kvInfo = findKVFromGroup(item.ma_kv || 'Khác');
                                return [
                                    `📍 Khu vực: ${kvInfo}`,
                                    `💰 Doanh số: ${formatNumber(revenue)}`,
                                    `🎯 Kế hoạch: ${formatNumber(target)}`,
                                    `📊 Tỷ lệ HT: ${completionRate}%`
                                ];
                            }
                        }
                    },
                    datalabels: hasDataLabelsPlugin ? {
                        display: true,
                        anchor: 'end',
                        align: 'end',
                        offset: 5,
                        color: '#333',
                        font: { weight: 'bold', size: 11 },
                        formatter: value => formatNumber(value)
                    } : {}
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: maxAxis,
                        ticks: {
                            callback: value => formatNumber(value),
                            stepSize: maxAxis / 5
                        },
                        title: {
                            display: true,
                            text: 'Doanh số (VNĐ)',
                            font: { weight: 'bold' }
                        }
                    },
                    y: {
                        ticks: {
                            font: { size: 10 },
                            callback: function (value, index, values) {
                                const label = this.getLabelForValue(value);
                                return label && label.length > 50 ? label.substring(0, 47) + '...' : label;
                            }
                        }
                    }
                },
                layout: { padding: { left: 10, right: 10, top: 20, bottom: 20 } }
            }
        });
    } catch (error) {
        console.error('❌ Lỗi vẽ biểu đồ top doanh số:', error);
    }
}

function createBottomCompletionChart(data, kv = 'all') {
    if (!data || data.length === 0) return;

    const chartCard = document.getElementById('bottomCompletionChart')?.closest('.chart-card');
    if (chartCard) {
        const titleElement = chartCard.querySelector('h3');
        if (titleElement) {
            if (kv === 'all') {
                titleElement.innerHTML = '⚠️ 15 Nhân viên doanh số thấp nhất (Miền Bắc)';
            } else {
                const kvName = getGroupName(kv) || kv;
                titleElement.innerHTML = `⚠️ 15 Nhân viên doanh số thấp nhất - ${kvName}`;
            }
        }
    }

    const bottomData = [...data]
        .filter(item => (item.doanh_so?.th || 0) > 0)
        .sort((a, b) => (a.doanh_so?.th || 0) - (b.doanh_so?.th || 0))
        .slice(0, 15);

    if (bottomData.length === 0) {
        const ctx = document.getElementById('bottomCompletionChart').getContext('2d');
        if (bottomCompletionChart) bottomCompletionChart.destroy();
        bottomCompletionChart = new Chart(ctx, {
            type: 'bar',
            data: { labels: ['Không có dữ liệu'], datasets: [{ label: 'Doanh số (VNĐ)', data: [0], backgroundColor: 'rgba(200,200,200,0.5)' }] },
            options: { plugins: { legend: { display: false }, tooltip: { enabled: false } } }
        });
        return;
    }

    // Sửa labels để hiển thị thêm KV
    const labels = bottomData.map(item => {
        const { ten, maDonVi, groupPath } = getEmployeeDisplayInfo(item.ma_nv);
        // Lấy KV của nhân viên
        const employeeKV = findKVFromGroup(item.ma_kv || 'Khác');
        const kvDisplay = employeeKV !== 'Khác' ? ` [${employeeKV}]` : '';

        if (groupPath && maDonVi) return `${ten}${kvDisplay}-${maDonVi}`;
        if (maDonVi) return `${ten}${kvDisplay} (${maDonVi})`;
        if (groupPath) return `${ten}${kvDisplay}\n(${groupPath})`;
        return `${ten}${kvDisplay}`;
    });

    const revenues = bottomData.map(item => item.doanh_so?.th || 0);

    const maxRevenue = Math.max(...revenues);
    let maxAxis = Math.ceil(maxRevenue * 1.5 / 1000000) * 1000000;
    if (maxAxis < 10000000) maxAxis = 10000000;

    try {
        const ctx = document.getElementById('bottomCompletionChart').getContext('2d');
        if (bottomCompletionChart) bottomCompletionChart.destroy();

        bottomCompletionChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Doanh số (VNĐ)',
                    data: revenues,
                    backgroundColor: revenues.map((revenue, index) => {
                        return `rgba(244, 67, 54, ${0.4 + (index * 0.03)})`;
                    }),
                    borderColor: revenues.map(() => 'rgba(244, 67, 54, 1)'),
                    borderWidth: 1,
                    borderRadius: 5
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { font: { size: 12 } } },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: { size: 14, weight: 'bold' },
                        bodyFont: { size: 13 },
                        padding: 12,
                        callbacks: {
                            label: function (context) {
                                const item = bottomData[context.dataIndex];
                                const revenue = context.raw;
                                const target = item.doanh_so?.kh || 0;
                                const completionRate = target > 0 ? ((revenue / target) * 100).toFixed(1) : 0;
                                const kvInfo = findKVFromGroup(item.ma_kv || 'Khác');
                                return [
                                    `📍 Khu vực: ${kvInfo}`,
                                    `💰 Doanh số: ${formatNumber(revenue)}`,
                                    `🎯 Kế hoạch: ${formatNumber(target)}`,
                                    `📊 Tỷ lệ HT: ${completionRate}%`
                                ];
                            }
                        }
                    },
                    datalabels: hasDataLabelsPlugin ? {
                        display: true,
                        anchor: 'end',
                        align: 'end',
                        offset: 5,
                        color: '#333',
                        font: { weight: 'bold', size: 11 },
                        formatter: value => formatNumber(value)
                    } : {}
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: maxAxis,
                        ticks: {
                            callback: value => formatNumber(value),
                            stepSize: maxAxis / 5
                        },
                        title: {
                            display: true,
                            text: 'Doanh số (VNĐ)',
                            font: { weight: 'bold' }
                        }
                    },
                    y: {
                        ticks: {
                            font: { size: 10 },
                            callback: function (value, index, values) {
                                const label = this.getLabelForValue(value);
                                return label && label.length > 50 ? label.substring(0, 47) + '...' : label;
                            }
                        }
                    }
                },
                layout: { padding: { left: 10, right: 10, top: 20, bottom: 20 } }
            }
        });
    } catch (error) {
        console.error('❌ Lỗi vẽ biểu đồ bottom doanh số:', error);
    }
}
function updateTotalRevenueFromNPP(nppRevenueData) {
    if (!nppRevenueData) return;

    let totalActualRevenue = 0;
    let totalTarget = 0;

    if (currentKVFilter === 'all') {
        totalActualRevenue = nppRevenueData.reduce((sum, npp) => sum + npp.actualRevenue, 0);
        totalTarget = getKVTargetFromNPP('all');
    } else {
        const filteredNPPs = nppRevenueData.filter(npp => npp.kv === currentKVFilter);
        totalActualRevenue = filteredNPPs.reduce((sum, npp) => sum + npp.actualRevenue, 0);
        totalTarget = getKVTargetFromNPP(currentKVFilter);
    }

    const completionRate = totalTarget > 0 ? (totalActualRevenue / totalTarget * 100).toFixed(1) : 0;

    const totalRevenueElement = document.getElementById('totalRevenueAll');
    if (totalRevenueElement) {
        totalRevenueElement.innerHTML = `${formatNumber(totalActualRevenue)} / ${formatNumber(totalTarget)} (${completionRate}%)`;
    }
}
function createAreaRevenueChart(data) {
    // Tính doanh số thực theo KV từ dữ liệu KPI
    const nppRevenueData = calculateNPPRevenue(data);

    // Tính tổng doanh số theo KV
    const kvActualRevenue = {};
    nppRevenueData.forEach(npp => {
        if (!kvActualRevenue[npp.kv]) {
            kvActualRevenue[npp.kv] = 0;
        }
        kvActualRevenue[npp.kv] += npp.actualRevenue;
    });

    // Chuẩn bị dữ liệu cho biểu đồ
    const kvData = [];
    const uniqueKVs = [...new Set(nppData.map(item => item.kv))];

    uniqueKVs.forEach(kv => {
        const actualRevenue = kvActualRevenue[kv] || 0;
        const targetRevenue = getKVTargetFromNPP(kv);
        const completionRate = targetRevenue > 0 ? (actualRevenue / targetRevenue * 100) : 0;

        kvData.push({
            kv: kv,
            actualRevenue: actualRevenue,
            targetRevenue: targetRevenue,
            completionRate: completionRate
        });
    });

    // Cập nhật tổng doanh thu hiển thị
    updateTotalRevenueFromNPP(nppRevenueData);

    // Sắp xếp theo tỷ lệ hoàn thành
    kvData.sort((a, b) => b.completionRate - a.completionRate);

    const labels = kvData.map(item => getGroupName(item.kv) || item.kv);
    const completionRates = kvData.map(item => item.completionRate);

    const chartCard = document.getElementById('areaRevenueChart')?.closest('.chart-card');
    if (chartCard) {
        const titleElement = chartCard.querySelector('h3');
        if (titleElement && currentKVFilter === 'all') {
            titleElement.innerHTML = '🥧 Tỷ lệ hoàn thành KPI theo Khu vực';
        }
    }

    try {
        const ctx = document.getElementById('areaRevenueChart').getContext('2d');
        if (areaRevenueChart) areaRevenueChart.destroy();

        const config = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Tỷ lệ hoàn thành (%)',
                    data: completionRates,
                    backgroundColor: completionRates.map(rate => {
                        if (rate >= 100) return 'rgba(76, 175, 80, 0.8)';
                        if (rate >= 80) return 'rgba(33, 150, 243, 0.8)';
                        if (rate >= 50) return 'rgba(255, 193, 7, 0.8)';
                        return 'rgba(244, 67, 54, 0.8)';
                    }),
                    borderColor: 'white',
                    borderWidth: 2,
                    borderRadius: 5
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: { size: 14, weight: 'bold' },
                        bodyFont: { size: 13 },
                        padding: 12,
                        callbacks: {
                            label: function (context) {
                                const index = context.dataIndex;
                                const item = kvData[index];
                                return [
                                    `💰 Doanh số TH: ${formatNumber(item.actualRevenue)}`,
                                    `🎯 Kế hoạch: ${formatNumber(item.targetRevenue)}`,
                                    `📊 Tỷ lệ HT: ${item.completionRate.toFixed(1)}%`
                                ];
                            }
                        }
                    },
                    datalabels: hasDataLabelsPlugin ? {
                        display: true,
                        anchor: 'end',
                        align: 'end',
                        offset: 5,
                        color: '#333',
                        font: { weight: 'bold', size: 11 },
                        formatter: value => value.toFixed(1) + '%'
                    } : {}
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: value => value + '%',
                            stepSize: 10
                        },
                        title: {
                            display: true,
                            text: 'Tỷ lệ hoàn thành (%)',
                            font: { weight: 'bold' }
                        }
                    },
                    y: {
                        ticks: {
                            font: { size: 12 }
                        }
                    }
                }
            }
        };

        areaRevenueChart = new Chart(ctx, config);
    } catch (error) {
        console.error('❌ Lỗi vẽ biểu đồ tỷ lệ hoàn thành khu vực:', error);
    }
}

function createNPPChartByKV(data, kv) {
    if (!data || data.length === 0) return;

    const nppRevenueData = calculateNPPRevenue(data);
    const filteredNPPs = nppRevenueData.filter(npp => npp.kv === kv);

    if (filteredNPPs.length === 0) {
        showToast(`Không có dữ liệu NPP cho ${kv}`);
        return;
    }

    // Sắp xếp theo tỷ lệ hoàn thành
    const chartData = filteredNPPs
        .map(npp => ({
            ten: npp.ten,
            revenue: npp.actualRevenue,
            target: npp.target,
            completionRate: npp.target > 0 ? (npp.actualRevenue / npp.target * 100) : 0
        }))
        .sort((a, b) => b.completionRate - a.completionRate);

    const labels = chartData.map(item => item.ten.replace(/^NPP\s+/i, ''));
    const completionRates = chartData.map(item => item.completionRate);

    // Tính giá trị max cho trục X
    const maxCompletion = Math.max(...completionRates);
    let maxAxis = Math.ceil((maxCompletion + 10) / 10) * 10;
    if (maxAxis < 100) maxAxis = 100;

    try {
        const ctx = document.getElementById('areaRevenueChart').getContext('2d');
        if (areaRevenueChart) areaRevenueChart.destroy();

        const kvName = getGroupName(kv) || kv;
        const chartCard = ctx.canvas.closest('.chart-card');
        const titleElement = chartCard.querySelector('h3');
        if (titleElement) titleElement.innerHTML = `🏢 Tỷ lệ hoàn thành KPI NPP - ${kvName}`;

        const config = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Tỷ lệ hoàn thành (%)',
                    data: completionRates,
                    backgroundColor: completionRates.map(rate => {
                        if (rate >= 100) return 'rgba(76, 175, 80, 0.8)';
                        if (rate >= 80) return 'rgba(255, 193, 7, 0.8)';
                        if (rate >= 50) return 'rgba(255, 152, 0, 0.8)';
                        return 'rgba(244, 67, 54, 0.8)';
                    }),
                    borderColor: 'white',
                    borderWidth: 2,
                    borderRadius: 5
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: { size: 14, weight: 'bold' },
                        bodyFont: { size: 13 },
                        padding: 12,
                        callbacks: {
                            label: function (context) {
                                const index = context.dataIndex;
                                const item = chartData[index];
                                return [
                                    `💰 Doanh số TH: ${formatNumber(item.revenue)}`,
                                    `🎯 Kế hoạch: ${formatNumber(item.target)}`,
                                    `📊 Tỷ lệ HT: ${item.completionRate.toFixed(1)}%`
                                ];
                            }
                        }
                    },
                    datalabels: hasDataLabelsPlugin ? {
                        display: true,
                        anchor: 'end',
                        align: 'end',
                        offset: 5,
                        color: '#333',
                        font: { weight: 'bold', size: 11 },
                        formatter: value => value.toFixed(1) + '%'
                    } : {}
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: maxAxis,
                        ticks: {
                            callback: value => value + '%',
                            stepSize: maxAxis > 100 ? 20 : 10
                        },
                        title: {
                            display: true,
                            text: 'Tỷ lệ hoàn thành (%)',
                            font: { weight: 'bold' }
                        }
                    },
                    y: {
                        ticks: {
                            font: { size: 12 },
                            callback: function (value, index, values) {
                                const label = this.getLabelForValue(value);
                                return label && label.length > 30 ? label.substring(0, 27) + '...' : label;
                            }
                        }
                    }
                }
            }
        };

        areaRevenueChart = new Chart(ctx, config);
    } catch (error) {
        console.error('❌ Lỗi vẽ biểu đồ NPP theo KV:', error);
    }
}

function createTopAreaChart(data) {
    if (!data || data.length === 0) return;

    const areaMap = {};
    data.forEach(item => {
        const area = item.ma_kv || 'N/A';
        if (!areaMap[area]) areaMap[area] = {
            tongDoanhSoTH: 0,
            count: 0,
            target: getNPPTarget(area),
            kv: findKVFromGroup(area) // Lấy KV của NPP
        };
        areaMap[area].tongDoanhSoTH += item.doanh_so?.th || 0;
        areaMap[area].count += 1;
    });

    const areaData = Object.entries(areaMap)
        .map(([area, values]) => ({
            area,
            tenHienThi: `${getGroupName(area)} [${values.kv}]`, // Thêm KV vào tên hiển thị
            tongDoanhSoTH: values.tongDoanhSoTH,
            soNhanVien: values.count,
            target: values.target,
            kv: values.kv,
            completionRate: values.target > 0 ? (values.tongDoanhSoTH / values.target * 100) : 0
        }))
        .sort((a, b) => b.tongDoanhSoTH - a.tongDoanhSoTH)
        .slice(0, 10);

    if (areaData.length === 0) return;

    const labels = areaData.map(item => item.tenHienThi);
    const doanhSoData = areaData.map(item => item.tongDoanhSoTH);
    const targetData = areaData.map(item => item.target);

    const maxDoanhSo = Math.max(...doanhSoData, ...targetData);
    let maxAxis = Math.ceil(maxDoanhSo * 1.3 / 1000000) * 1000000;

    try {
        const ctx = document.getElementById('topAreaChart').getContext('2d');
        if (topAreaChart) topAreaChart.destroy();

        topAreaChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Doanh số thực tế',
                        data: doanhSoData,
                        backgroundColor: 'rgba(76, 175, 80, 0.7)',
                        borderColor: 'rgba(76, 175, 80, 1)',
                        borderWidth: 1,
                        borderRadius: 5
                    },
                    {
                        label: 'Kế hoạch',
                        data: targetData,
                        backgroundColor: 'rgba(33, 150, 243, 0.3)',
                        borderColor: 'rgba(33, 150, 243, 1)',
                        borderWidth: 2,
                        borderRadius: 5,
                        borderDash: [5, 5]
                    }
                ]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: { size: 12 },
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: { size: 14, weight: 'bold' },
                        bodyFont: { size: 13 },
                        padding: 12,
                        callbacks: {
                            label: function (context) {
                                const item = areaData[context.dataIndex];
                                if (context.dataset.label === 'Doanh số thực tế') {
                                    return [
                                        `📍 Khu vực: ${item.kv}`,
                                        `💰 Doanh số TH: ${formatNumber(context.raw)}`,
                                        `👥 Số nhân viên: ${item.soNhanVien}`,
                                        `📊 Bình quân: ${formatNumber(context.raw / item.soNhanVien)}/người`
                                    ];
                                } else {
                                    return `🎯 Kế hoạch: ${formatNumber(context.raw)}`;
                                }
                            },
                            footer: function (context) {
                                const item = areaData[context[0].dataIndex];
                                return `📈 Tỷ lệ HT: ${item.completionRate.toFixed(1)}%`;
                            }
                        }
                    },
                    datalabels: hasDataLabelsPlugin ? {
                        display: function (context) {
                            return context.dataset.label === 'Doanh số thực tế';
                        },
                        anchor: 'end',
                        align: 'end',
                        offset: 5,
                        color: '#333',
                        font: { weight: 'bold', size: 11 },
                        formatter: value => formatNumber(value)
                    } : {}
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: maxAxis,
                        ticks: {
                            callback: value => formatNumber(value),
                            stepSize: maxAxis / 5
                        },
                        title: {
                            display: true,
                            text: 'Doanh số (VNĐ)',
                            font: { weight: 'bold' }
                        }
                    },
                    y: {
                        ticks: {
                            font: { size: 12 },
                            callback: function (value, index, values) {
                                const label = this.getLabelForValue(value);
                                return label && label.length > 35 ? label.substring(0, 32) + '...' : label;
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('❌ Lỗi vẽ biểu đồ top area doanh số:', error);
    }
}

function createBottomAreaChart(data) {
    if (!data || data.length === 0) return;

    const areaMap = {};
    data.forEach(item => {
        const area = item.ma_kv || 'N/A';
        if (!areaMap[area]) areaMap[area] = {
            tongDoanhSoTH: 0,
            count: 0,
            target: getNPPTarget(area),
            kv: findKVFromGroup(area) // Lấy KV của NPP
        };
        areaMap[area].tongDoanhSoTH += item.doanh_so?.th || 0;
        areaMap[area].count += 1;
    });

    const areaData = Object.entries(areaMap)
        .filter(([_, values]) => values.tongDoanhSoTH > 0)
        .map(([area, values]) => ({
            area,
            tenHienThi: `${getGroupName(area)} [${values.kv}]`, // Thêm KV vào tên hiển thị
            tongDoanhSoTH: values.tongDoanhSoTH,
            soNhanVien: values.count,
            target: values.target,
            kv: values.kv,
            completionRate: values.target > 0 ? (values.tongDoanhSoTH / values.target * 100) : 0
        }))
        .sort((a, b) => a.tongDoanhSoTH - b.tongDoanhSoTH)
        .slice(0, 10);

    if (areaData.length === 0) return;

    const labels = areaData.map(item => item.tenHienThi);
    const doanhSoData = areaData.map(item => item.tongDoanhSoTH);
    const targetData = areaData.map(item => item.target);

    const maxDoanhSo = Math.max(...doanhSoData, ...targetData);
    let maxAxis = Math.ceil(maxDoanhSo * 1.3 / 1000000) * 1000000;
    if (maxAxis < 10000000) maxAxis = 10000000;

    try {
        const ctx = document.getElementById('bottomAreaChart').getContext('2d');
        if (bottomAreaChart) bottomAreaChart.destroy();

        bottomAreaChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Doanh số thực tế',
                        data: doanhSoData,
                        backgroundColor: 'rgba(244, 67, 54, 0.7)',
                        borderColor: 'rgba(244, 67, 54, 1)',
                        borderWidth: 1,
                        borderRadius: 5
                    },
                    {
                        label: 'Kế hoạch',
                        data: targetData,
                        backgroundColor: 'rgba(33, 150, 243, 0.3)',
                        borderColor: 'rgba(33, 150, 243, 1)',
                        borderWidth: 2,
                        borderRadius: 5,
                        borderDash: [5, 5]
                    }
                ]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: { size: 12 },
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: { size: 14, weight: 'bold' },
                        bodyFont: { size: 13 },
                        padding: 12,
                        callbacks: {
                            label: function (context) {
                                const item = areaData[context.dataIndex];
                                if (context.dataset.label === 'Doanh số thực tế') {
                                    return [
                                        `📍 Khu vực: ${item.kv}`,
                                        `💰 Doanh số TH: ${formatNumber(context.raw)}`,
                                        `👥 Số nhân viên: ${item.soNhanVien}`,
                                        `📊 Bình quân: ${formatNumber(context.raw / item.soNhanVien)}/người`
                                    ];
                                } else {
                                    return `🎯 Kế hoạch: ${formatNumber(context.raw)}`;
                                }
                            },
                            footer: function (context) {
                                const item = areaData[context[0].dataIndex];
                                return `📈 Tỷ lệ HT: ${item.completionRate.toFixed(1)}%`;
                            }
                        }
                    },
                    datalabels: hasDataLabelsPlugin ? {
                        display: function (context) {
                            return context.dataset.label === 'Doanh số thực tế';
                        },
                        anchor: 'end',
                        align: 'end',
                        offset: 5,
                        color: '#333',
                        font: { weight: 'bold', size: 11 },
                        formatter: value => formatNumber(value)
                    } : {}
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: maxAxis,
                        ticks: {
                            callback: value => formatNumber(value),
                            stepSize: maxAxis / 5
                        },
                        title: {
                            display: true,
                            text: 'Doanh số (VNĐ)',
                            font: { weight: 'bold' }
                        }
                    },
                    y: {
                        ticks: {
                            font: { size: 12 },
                            callback: function (value, index, values) {
                                const label = this.getLabelForValue(value);
                                return label && label.length > 35 ? label.substring(0, 32) + '...' : label;
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('❌ Lỗi vẽ biểu đồ bottom area doanh số:', error);
    }
}

// ========== HÀM HIỂN THỊ THỐNG KÊ ==========

function displaySummaryStats(data) {
    const summaryStats = document.getElementById('summaryStats');
    summaryStats.innerHTML = '';
    if (!data || data.length === 0) return;

    const tongDoanhSoTH = data.reduce((sum, item) => sum + (item.doanh_so?.th || 0), 0);
    const tongDoanhSoKH = getKVTargetFromNPP('all'); // Tổng kế hoạch từ tất cả NPP

    const tlTrungBinh = tongDoanhSoKH > 0 ? (tongDoanhSoTH / tongDoanhSoKH * 100) : 0;

    const nvCaoNhat = data.reduce((max, item) => (item.doanh_so?.th || 0) > (max.doanh_so?.th || 0) ? item : max, data[0]);

    // Lấy thông tin NPP của nhân viên cao nhất
    const nvCaoNhatInfo = getEmployeeDisplayInfo(nvCaoNhat.ma_nv);
    const nvCaoNhatNPP = nvCaoNhatInfo.maDonVi ? getGroupName(nvCaoNhatInfo.maDonVi) : 'N/A';

    // Tính doanh số theo KV
    const kvRevenue = {};
    data.forEach(item => {
        const maKV = item.ma_kv || 'Khác';
        const kv = findKVFromGroup(maKV);
        const revenue = item.doanh_so?.th || 0;
        if (!kvRevenue[kv]) kvRevenue[kv] = 0;
        kvRevenue[kv] += revenue;
    });

    // Tìm KV có doanh thu cao nhất
    let kvCaoNhat = null;
    let maxRevenue = 0;
    Object.entries(kvRevenue).forEach(([kv, revenue]) => {
        if (revenue > maxRevenue && kv !== 'Khác') {
            maxRevenue = revenue;
            const target = getKVTargetFromNPP(kv);
            kvCaoNhat = {
                ma: kv,
                doanhThu: revenue,
                target: target,
                tl: target > 0 ? (revenue / target * 100) : 0
            };
        }
    });

    // Tìm NPP có doanh thu cao nhất (từ dữ liệu thực tế)
    const nppActualRevenue = {};
    data.forEach(item => {
        const maKV = item.ma_kv || 'Khác';
        const revenue = item.doanh_so?.th || 0;
        if (!nppActualRevenue[maKV]) nppActualRevenue[maKV] = 0;
        nppActualRevenue[maKV] += revenue;
    });

    // Tìm NPP có doanh thu thực tế cao nhất
    let nppCaoNhatThucTe = null;
    let maxNPPActualRevenue = 0;
    Object.entries(nppActualRevenue).forEach(([maNPP, revenue]) => {
        if (revenue > maxNPPActualRevenue) {
            maxNPPActualRevenue = revenue;
            nppCaoNhatThucTe = {
                ten: getGroupName(maNPP) || maNPP,
                doanhSoTH: revenue,
                target: getNPPTarget(maNPP)
            };
        }
    });

    const stats = [
        { label: '🎯 Tổng DS KH (từ NPP)', value: tongDoanhSoKH },
        { label: '💰 Tổng DS TH', value: tongDoanhSoTH },
        { label: '📈 Tỷ lệ TB', value: tlTrungBinh, unit: '%' },
        {
            label: '🏆 NV cao nhất',
            value: getEmployeeName(nvCaoNhat.ma_nv),
            subValue: formatNumber(nvCaoNhat.doanh_so?.th || 0),
            subLabel: 'Doanh số',
            nppInfo: ` - ${nvCaoNhatNPP}`
        },
        {
            label: '🏢 NPP có DS cao nhất',
            value: nppCaoNhatThucTe ? nppCaoNhatThucTe.ten : 'N/A',
            subValue: formatNumber(nppCaoNhatThucTe ? nppCaoNhatThucTe.doanhSoTH : 0),
            subLabel: 'Doanh số TH',
            tlValue: nppCaoNhatThucTe && nppCaoNhatThucTe.target > 0 ?
                `KH: ${formatNumber(nppCaoNhatThucTe.target)} (${(nppCaoNhatThucTe.doanhSoTH / nppCaoNhatThucTe.target * 100).toFixed(1)}%)` : ''
        },
        {
            label: '📍 KV doanh thu cao nhất',
            value: kvCaoNhat ? getGroupName(kvCaoNhat.ma) : 'N/A',
            subValue: formatNumber(kvCaoNhat ? kvCaoNhat.doanhThu : 0),
            subLabel: 'Doanh số TH',
            tlValue: kvCaoNhat ? `KH: ${formatNumber(kvCaoNhat.target)} (${kvCaoNhat.tl.toFixed(1)}%)` : ''
        }
    ];

    stats.forEach(stat => {
        const statCard = document.createElement('div');
        statCard.className = 'stat-card';

        if (stat.unit === '%') {
            statCard.innerHTML = `<div class="stat-label">${stat.label}</div><div class="stat-value">${stat.value.toFixed(1)}%</div>`;
        } else if (stat.subValue) {
            if (stat.nppInfo) {
                statCard.innerHTML = `
                    <div class="stat-label">${stat.label}</div>
                    <div class="stat-value">${stat.value}</div>
                    <div style="font-size: 12px; opacity: 0.9; display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
                        <span>${stat.subLabel}: ${stat.subValue}</span>
                        <span>${stat.nppInfo}</span>
                        ${stat.tlValue ? `<span>${stat.tlValue}</span>` : ''}
                    </div>
                `;
            } else {
                statCard.innerHTML = `
                    <div class="stat-label">${stat.label}</div>
                    <div class="stat-value">${stat.value}</div>
                    <div style="font-size: 12px; opacity: 0.9; display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
                        <span>${stat.subLabel}: ${stat.subValue}</span>
                        ${stat.tlValue ? `<span>${stat.tlValue}</span>` : ''}
                    </div>
                `;
            }
        } else {
            statCard.innerHTML = `<div class="stat-label">${stat.label}</div><div class="stat-value">${formatNumber(stat.value)}</div>`;
        }

        summaryStats.appendChild(statCard);
    });
}
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

// ========== TỰ ĐỘNG GỌI API KHI LOAD TRANG ==========

// Hàm khởi tạo và tự động gọi API
async function initializeAndFetchKPI() {
    console.log('🚀 Tự động tải dữ liệu KPI...');

    // Hiển thị loading
    const loading = document.getElementById('loading');
    const searchBtn = document.getElementById('searchBtn');

    searchBtn.disabled = true;
    loading.classList.add('active');

    try {
        // Tải dữ liệu nhân viên và nhóm
        console.log('🔄 Đang tải dữ liệu nhân viên và nhóm...');
        await Promise.all([fetchEmployees(), fetchGroups()]);

        // Đợi 2 giây trước khi gọi API KPI
        console.log('⏳ Đợi 2 giây trước khi gọi API KPI...');
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Lấy thông tin tháng và năm hiện tại
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;
        const auth = document.getElementById('auth').value;

        console.log(`🔄 Đang tải dữ liệu KPI tháng ${month}/${year}...`);

        // Gọi API KPI
        const url = `https://openapi.mobiwork.vn/OpenAPI/V1/KPI?thang=${month}&nam=${year}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'accept': 'application/json', 'Authorization': auth }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        // Xử lý dữ liệu
        currentData = data.result || [];
        allData = JSON.parse(JSON.stringify(currentData));

        // Cập nhật tiêu đề
        document.getElementById('reportTitle').textContent = `Báo cáo KPI Miền Bắc tháng ${month}/${year}`;

        // Hiển thị thông tin
        displayDataInfo(currentData);

        // Vẽ biểu đồ
        setTimeout(() => createCharts(currentData), 100);

        // Hiển thị thống kê
        displaySummaryStats(currentData);

        // Hiển thị báo cáo
        document.getElementById('reportSection').classList.add('active');

        console.log(`✅ Đã tải xong dữ liệu KPI: ${currentData.length} nhân viên`);

    } catch (error) {
        console.error('❌ Lỗi khi tự động tải dữ liệu:', error);
        showError(`Lỗi khi tự động tải dữ liệu: ${error.message}`);
    } finally {
        // Ẩn loading
        searchBtn.disabled = false;
        loading.classList.remove('active');
    }
}

// Ghi đè hàm DOMContentLoaded để tự động gọi API
document.addEventListener('DOMContentLoaded', function () {
    const today = new Date();
    document.getElementById('month').value = today.getMonth() + 1;
    document.getElementById('year').value = today.getFullYear();
    console.log('🚀 Ứng dụng đã sẵn sàng!');

    // Tự động gọi API sau khi trang load 1 giây
    // setTimeout(() => {
    //     initializeAndFetchKPI();
    // }, 1000);
});