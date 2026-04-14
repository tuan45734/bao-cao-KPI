// ========== BIỂU ĐỒ NPP ==========

function createTopAreaChart(data) {
    if (!data || data.length === 0) return;

    const areaMap = {};
    data.forEach(item => {
        const area = item.ma_kv || 'N/A';
        if (!areaMap[area]) areaMap[area] = {
            tongDoanhSoTH: 0,
            count: 0,
            target: getNPPTarget(area),
            kv: findKVFromGroup(area)
        };
        areaMap[area].tongDoanhSoTH += item.doanh_so?.th || 0;
        areaMap[area].count += 1;
    });

    const areaData = Object.entries(areaMap)
        .map(([area, values]) => ({
            area,
            tenHienThi: `${getGroupName(area)} [${values.kv}]`,
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

    const maxDoanhSo = Math.max(...doanhSoData);
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
                    }
                ]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { font: { size: 12 }, usePointStyle: true } },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: { size: 14, weight: 'bold' },
                        bodyFont: { size: 13 },
                        padding: 12,
                        callbacks: {
                            label: function (context) {
                                const item = areaData[context.dataIndex];
                                return [
                                    `📍 Khu vực: ${item.kv}`,
                                    `💰 Doanh số TH: ${formatNumber(context.raw)}`,
                                    `🎯 Kế hoạch: ${formatNumber(item.target)}`,
                                    `👥 Số nhân viên: ${item.soNhanVien}`,
                                    `📊 Bình quân: ${formatNumber(context.raw / item.soNhanVien)}/người`,
                                    `📈 Tỷ lệ HT: ${item.completionRate.toFixed(1)}%`
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
                        ticks: { callback: value => formatNumber(value), stepSize: maxAxis / 5 },
                        title: { display: true, text: 'Doanh số (VNĐ)', font: { weight: 'bold' } }
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
            kv: findKVFromGroup(area)
        };
        areaMap[area].tongDoanhSoTH += item.doanh_so?.th || 0;
        areaMap[area].count += 1;
    });

    const areaData = Object.entries(areaMap)
        .filter(([_, values]) => values.tongDoanhSoTH > 0)
        .map(([area, values]) => ({
            area,
            tenHienThi: `${getGroupName(area)} [${values.kv}]`,
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

    const maxDoanhSo = Math.max(...doanhSoData);
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
                    }
                ]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { font: { size: 12 }, usePointStyle: true } },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: { size: 14, weight: 'bold' },
                        bodyFont: { size: 13 },
                        padding: 12,
                        callbacks: {
                            label: function (context) {
                                const item = areaData[context.dataIndex];
                                return [
                                    `📍 Khu vực: ${item.kv}`,
                                    `💰 Doanh số TH: ${formatNumber(context.raw)}`,
                                    `🎯 Kế hoạch: ${formatNumber(item.target)}`,
                                    `👥 Số nhân viên: ${item.soNhanVien}`,
                                    `📊 Bình quân: ${formatNumber(context.raw / item.soNhanVien)}/người`,
                                    `📈 Tỷ lệ HT: ${item.completionRate.toFixed(1)}%`
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
                        ticks: { callback: value => formatNumber(value), stepSize: maxAxis / 5 },
                        title: { display: true, text: 'Doanh số (VNĐ)', font: { weight: 'bold' } }
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