// ========== KHỞI TẠO CHÍNH ==========

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

function createCharts(data) {
    console.log('🔄 Đang vẽ biểu đồ...');

    currentTopKVFilter = 'all';
    currentBottomKVFilter = 'all';
    currentKVFilter = 'all';

    const topFilter = document.querySelector('.kv-filter-employee:first-child');
    if (topFilter) {
        topFilter.querySelectorAll('.kv-btn-employee').forEach(btn => {
            btn.classList.remove('top-active');
        });
        topFilter.querySelector('[data-kv="all"]').classList.add('top-active');
    }

    const bottomFilter = document.querySelector('.kv-filter-employee:last-child');
    if (bottomFilter) {
        bottomFilter.querySelectorAll('.kv-btn-employee').forEach(btn => {
            btn.classList.remove('bottom-active');
        });
        bottomFilter.querySelector('[data-kv="all"]').classList.add('bottom-active');
    }

    const areaFilter = document.querySelector('.kv-filter');
    if (areaFilter) {
        areaFilter.querySelectorAll('.kv-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        areaFilter.querySelector('[data-kv="all"]').classList.add('active');
    }

    if (topCompletionChart) topCompletionChart.destroy();
    if (bottomCompletionChart) bottomCompletionChart.destroy();
    if (topAreaChart) topAreaChart.destroy();
    if (bottomAreaChart) bottomAreaChart.destroy();
    if (areaRevenueChart) areaRevenueChart.destroy();

    if (!data || data.length === 0) {
        console.warn('⚠️ Không có dữ liệu để vẽ biểu đồ');
        return;
    }

    const activeData = filterActiveEmployees(data);
    createTopCompletionChart(activeData);
    createBottomCompletionChart(activeData);
    
    createTopAreaChart(data);
    createBottomAreaChart(data);
    createAreaRevenueChart(data);
    console.log(`✅ Đã vẽ xong biểu đồ (${activeData.length} nhân viên active / ${data.length} tổng số)`);
}

function displaySummaryStats(data) {
    const summaryStats = document.getElementById('summaryStats');
    summaryStats.innerHTML = '';
    if (!data || data.length === 0) return;

    const tongDoanhSoTH = data.reduce((sum, item) => sum + (item.doanh_so?.th || 0), 0);
    const tongDoanhSoKH = getKVTargetFromNPP('all');
    const tlTrungBinh = tongDoanhSoKH > 0 ? (tongDoanhSoTH / tongDoanhSoKH * 100) : 0;

    const activeData = filterActiveEmployees(data);
    let nvCaoNhat = null;
    if (activeData.length > 0) {
        nvCaoNhat = activeData.reduce((max, item) => (item.doanh_so?.th || 0) > (max.doanh_so?.th || 0) ? item : max, activeData[0]);
    }

    const nvCaoNhatInfo = nvCaoNhat ? getEmployeeDisplayInfo(nvCaoNhat.ma_nv) : null;
    const nvCaoNhatNPP = nvCaoNhatInfo?.maDonVi ? getGroupName(nvCaoNhatInfo.maDonVi) : 'N/A';

    const kvRevenue = {};
    data.forEach(item => {
        const maKV = item.ma_kv || 'Khác';
        const kv = findKVFromGroup(maKV);
        const revenue = item.doanh_so?.th || 0;
        if (!kvRevenue[kv]) kvRevenue[kv] = 0;
        kvRevenue[kv] += revenue;
    });

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

    const nppActualRevenue = {};
    data.forEach(item => {
        const maKV = item.ma_kv || 'Khác';
        const revenue = item.doanh_so?.th || 0;
        if (!nppActualRevenue[maKV]) nppActualRevenue[maKV] = 0;
        nppActualRevenue[maKV] += revenue;
    });

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
            value: nvCaoNhat ? getEmployeeName(nvCaoNhat.ma_nv) : 'N/A',
            subValue: nvCaoNhat ? formatNumber(nvCaoNhat.doanh_so?.th || 0) : '0',
            subLabel: 'Doanh số',
            nppInfo: nvCaoNhat ? ` - ${nvCaoNhatNPP}` : ''
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

        const mergedData = mergeKPIData(data.result || []);
        currentData = mergedData;
        allData = JSON.parse(JSON.stringify(mergedData));
        document.getElementById('reportTitle').textContent = `Báo cáo KPI Miền Bắc tháng ${month}/${year}`;
        
        dataInfo.style.display = 'none';
        
        setTimeout(() => createCharts(currentData), 100);
        displaySummaryStats(currentData);
        reportSection.classList.add('active');
        console.log(`✅ Đã tải xong dữ liệu KPI: ${currentData.length} nhân viên`);
    } catch (error) {
        console.error('❌ Lỗi chi tiết:', error);
        showError(`Lỗi khi tải dữ liệu: ${error.message}`);
    } finally {
        searchBtn.disabled = false;
        loading.classList.remove('active');
    }
}

async function initializeAndFetchKPI() {
    console.log('🚀 Tự động tải dữ liệu KPI...');

    const loading = document.getElementById('loading');
    const searchBtn = document.getElementById('searchBtn');

    searchBtn.disabled = true;
    loading.classList.add('active');

    try {
        console.log('🔄 Đang tải dữ liệu nhân viên và nhóm...');
        await Promise.all([fetchEmployees(), fetchGroups()]);

        console.log('⏳ Đợi 2 giây trước khi gọi API KPI...');
        await new Promise(resolve => setTimeout(resolve, 2000));

        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;
        const auth = document.getElementById('auth').value;

        console.log(`🔄 Đang tải dữ liệu KPI tháng ${month}/${year}...`);

        const url = `https://openapi.mobiwork.vn/OpenAPI/V1/KPI?thang=${month}&nam=${year}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'accept': 'application/json', 'Authorization': auth }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        currentData = data.result || [];
        allData = JSON.parse(JSON.stringify(currentData));

        document.getElementById('reportTitle').textContent = `Báo cáo KPI Miền Bắc tháng ${month}/${year}`;
        
        const dataInfo = document.getElementById('dataInfo');
        dataInfo.style.display = 'none';
        
        setTimeout(() => createCharts(currentData), 100);
        displaySummaryStats(currentData);
        document.getElementById('reportSection').classList.add('active');

        console.log(`✅ Đã tải xong dữ liệu KPI: ${currentData.length} nhân viên`);
    } catch (error) {
        console.error('❌ Lỗi khi tự động tải dữ liệu:', error);
        showError(`Lỗi khi tự động tải dữ liệu: ${error.message}`);
    } finally {
        searchBtn.disabled = false;
        loading.classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const today = new Date();
    document.getElementById('month').value = today.getMonth() + 1;
    document.getElementById('year').value = today.getFullYear();
    console.log('🚀 Ứng dụng đã sẵn sàng!');

    setTimeout(() => {
        initializeAndFetchKPI();
    }, 1000);
});