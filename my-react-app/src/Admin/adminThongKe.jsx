import React, { useEffect, useRef, useState } from 'react';
import AdminLayout from '../components/adminLayout';
import Chart from 'chart.js/auto';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  margin-bottom: 28px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.05);
  padding: 18px 24px 10px 24px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    padding: 12px 6px 6px 6px;
  }
`;
const FilterLabel = styled.label`
  font-size: 15px;
  color: #374151;
  font-weight: 500;
  margin-right: 6px;
`;
const FilterInput = styled.input`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 15px;
  background: #f9fafb;
`;
const FilterSelect = styled.select`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 15px;
  background: #f9fafb;
`;

const MainContent = styled.main`
  padding: 120px 0 24px 250px;
  background: #f9fafb;
  min-height: 100vh;
  width: 100vw;
  max-width: 99vw;
  margin: 0;
  overflow-x: hidden;
  box-sizing: border-box;
  @media (max-width: 1200px) {
    padding-left: 0;
  }
  @media (max-width: 768px) {
    padding-top: 80px;
    padding-left: 0;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  padding: 0 8px;
  @media (max-width: 1200px) {
    max-width: 100vw;
    padding: 0 4px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 32px;
  width: 100%;
  box-sizing: border-box;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
const StatsCard = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.05);
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StatsLeft = styled.div`
  display: flex;
  flex-direction: column;
`;
const StatsLabel = styled.span`
  font-size: 14px;
  color: #6b7280;
`;
const StatsNumber = styled.span`
  font-size: 24px;
  font-weight: bold;
  margin: 4px 0;
`;
const StatsIconWrapper = styled.div`
  padding: 12px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ChartsRow = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 24px;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
const ChartBox = styled.div`
  flex: 1 1 0;
  max-width: 100%;
  width: 100%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  padding: 14px 10px 10px 10px;
`;
const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
const ChartTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
`;

// Dữ liệu mẫu cho thống kê
const sampleAppointments = [
  { date: '2024-07-01', service: 'tuvan', status: 'done', revenue: 500000, userNew: true },
  { date: '2024-07-01', service: 'kham', status: 'processing', revenue: 1200000, userNew: false },
  { date: '2024-07-02', service: 'xetnghiem', status: 'done', revenue: 800000, userNew: true },
  { date: '2024-07-03', service: 'theodoi', status: 'done', revenue: 600000, userNew: false },
  { date: '2024-07-04', service: 'tuvan', status: 'cancel', revenue: 0, userNew: false },
  { date: '2024-07-05', service: 'kham', status: 'done', revenue: 1500000, userNew: true },
  { date: '2024-07-06', service: 'xetnghiem', status: 'processing', revenue: 900000, userNew: false },
  { date: '2024-07-07', service: 'theodoi', status: 'done', revenue: 700000, userNew: false },
  { date: '2024-07-07', service: 'tuvan', status: 'done', revenue: 400000, userNew: true },
];

function filterAppointments(data, fromDate, toDate, serviceType, status) {
  return data.filter(item => {
    const matchFrom = fromDate ? item.date >= fromDate : true;
    const matchTo = toDate ? item.date <= toDate : true;
    const matchService = serviceType === 'all' ? true : item.service === serviceType;
    const matchStatus = status === 'all' ? true : item.status === status;
    return matchFrom && matchTo && matchService && matchStatus;
  });
}

const serviceMap = {
  tuvan: 'Tư vấn',
  xetnghiem: 'Xét nghiệm',
  theodoi: 'Theo dõi thai',
};

// Dữ liệu mẫu cho theo dõi uống thuốc
const sampleMedication = [
  { date: '2024-07-01', user: 'Nguyễn Văn A', status: 'on_time', type: '21' },
  { date: '2024-07-01', user: 'Trần Thị B', status: 'late', type: '28' },
  { date: '2024-07-02', user: 'Nguyễn Văn A', status: 'on_time', type: '21' },
  { date: '2024-07-02', user: 'Trần Thị B', status: 'missed', type: '28' },
  { date: '2024-07-03', user: 'Nguyễn Văn A', status: 'on_time', type: '21' },
  { date: '2024-07-03', user: 'Trần Thị B', status: 'on_time', type: '28' },
  { date: '2024-07-04', user: 'Nguyễn Văn A', status: 'late', type: '21' },
  { date: '2024-07-04', user: 'Trần Thị B', status: 'on_time', type: '28' },
  // Thêm dữ liệu tháng 8 để so sánh
  { date: '2024-08-01', user: 'Nguyễn Văn A', status: 'on_time', type: '21' },
  { date: '2024-08-02', user: 'Nguyễn Văn A', status: 'on_time', type: '21' },
  { date: '2024-08-01', user: 'Trần Thị B', status: 'on_time', type: '28' },
  { date: '2024-08-03', user: 'Nguyễn Văn C', status: 'on_time', type: '21' },
  { date: '2024-08-04', user: 'Nguyễn Văn C', status: 'on_time', type: '21' },
  { date: '2024-08-05', user: 'Trần Thị D', status: 'on_time', type: '28' },
];

// Dữ liệu mẫu cho theo dõi chu kỳ
const sampleCycle = [
  { date: '2024-07-01', user: 'Nguyễn Thị C', status: 'normal' },
  { date: '2024-07-02', user: 'Nguyễn Thị C', status: 'normal' },
  { date: '2024-07-03', user: 'Nguyễn Thị C', status: 'abnormal' },
  { date: '2024-07-04', user: 'Nguyễn Thị C', status: 'normal' },
  { date: '2024-07-01', user: 'Lê Thị D', status: 'normal' },
  { date: '2024-07-02', user: 'Lê Thị D', status: 'normal' },
  { date: '2024-07-03', user: 'Lê Thị D', status: 'normal' },
  { date: '2024-07-04', user: 'Lê Thị D', status: 'abnormal' },
];

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #059669;
  margin: 36px 0 18px 0;
`;
const SmallStatsGrid = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 18px;
  @media (max-width: 900px) { flex-direction: column; }
`;
const SmallStatsCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.05);
  padding: 18px 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.05);
  margin-top: 12px;
`;
const Th = styled.th`
  text-align: left;
  padding: 10px 14px;
  font-size: 14px;
  color: #059669;
  border-bottom: 1px solid #e5e7eb;
`;
const Td = styled.td`
  padding: 10px 14px;
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
`;

const AdminThongKe = () => {
  const appointmentsChartRef = useRef(null);
  const servicesChartRef = useRef(null);

  // Bộ lọc nâng cao
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [serviceType, setServiceType] = useState('all');
  const [status, setStatus] = useState('all');

  // Bộ lọc loại thuốc tránh thai
  const [pillType, setPillType] = useState('all');

  // Thêm state dùng chung cho chu kỳ thời gian tất cả biểu đồ
  const [allTimeUnit, setAllTimeUnit] = useState('day'); // 'day' | 'week' | 'month' | 'year'

  // Đảm bảo chỉ khai báo duy nhất:
  const serviceTypes = Object.keys(serviceMap);
  const pieColors = ['#4f46e5', '#22c55e', '#f59e0b', '#ef4444'];
  const groupByTimeUnit = (data, unit) => {
    const map = new Map();
    data.forEach(item => {
      let key = '';
      if (unit === 'day') key = item.date;
      else if (unit === 'week') key = dayjs(item.date).isoWeekYear() + '-W' + String(dayjs(item.date).isoWeek()).padStart(2, '0');
      else if (unit === 'month') key = item.date.slice(0,7);
      else if (unit === 'year') key = item.date.slice(0,4);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(item);
    });
    // Trả về mảng key đã sort
    const keys = Array.from(map.keys()).sort();
    return { keys, map };
  };

  useEffect(() => {
    let chart1 = null;
    let chart2 = null;
    if (appointmentsChartRef.current) {
      const ctx1 = appointmentsChartRef.current.getContext('2d');
      chart1 = new Chart(ctx1, {
        type: 'line',
        data: {
          labels: ['01/07', '02/07', '03/07', '04/07', '05/07', '06/07', '07/07'],
          datasets: [{
            label: 'Lịch hẹn',
            data: [10, 15, 7, 20, 12, 18, 25],
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            borderColor: '#4f46e5',
            tension: 0.4,
            fill: true,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          }
        }
      });
    }
    if (servicesChartRef.current) {
      const ctx2 = servicesChartRef.current.getContext('2d');
      chart2 = new Chart(ctx2, {
        type: 'doughnut',
        data: {
          labels: ['Tư vấn', 'Khám tổng quát', 'Xét nghiệm', 'Theo dõi thai'],
          datasets: [{
            label: 'Dịch vụ',
            data: [40, 25, 20, 15],
            backgroundColor: ['#4f46e5', '#22c55e', '#f59e0b', '#ef4444'],
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            }
          }
        }
      });
    }
    return () => {
      if (chart1) chart1.destroy();
      if (chart2) chart2.destroy();
    };
  }, []);

  // Tính toán số liệu động
  const today = new Date().toISOString().slice(0, 10);
  const filtered = filterAppointments(sampleAppointments, fromDate, toDate, serviceType, status);
  const todayAppointments = filterAppointments(sampleAppointments, today, today, serviceType, status);
  const countToday = todayAppointments.length;
  const countUserNew = filtered.filter(a => a.userNew).length;
  const totalRevenue = filtered.reduce((sum, a) => sum + a.revenue, 0);
  // Dịch vụ phổ biến nhất
  const serviceCount = {};
  filtered.forEach(a => { serviceCount[a.service] = (serviceCount[a.service] || 0) + 1; });
  const mostUsedService = Object.keys(serviceCount).length > 0 ? serviceMap[Object.entries(serviceCount).sort((a,b)=>b[1]-a[1])[0][0]] : 'Không có';

  // Chuẩn bị dữ liệu cho biểu đồ
  // 1. Biểu đồ cột: Số lịch hẹn theo ngày, tách theo dịch vụ tư vấn và xét nghiệm
  const dateLabels = Array.from(new Set(filtered.map(a => a.date))).sort();
  // Số lịch hẹn tư vấn theo ngày
  const appointmentsTuVanByDate = dateLabels.map(date => filtered.filter(a => a.date === date && a.service === 'tuvan').length);
  // Số lịch hẹn xét nghiệm theo ngày
  const appointmentsXetNghiemByDate = dateLabels.map(date => filtered.filter(a => a.date === date && a.service === 'xetnghiem').length);
  // 2. Biểu đồ cột: Doanh thu theo ngày, tách theo dịch vụ tư vấn và xét nghiệm
  const revenueTuVanByDate = dateLabels.map(date => filtered.filter(a => a.date === date && a.service === 'tuvan').reduce((sum, a) => sum + a.revenue, 0));
  const revenueXetNghiemByDate = dateLabels.map(date => filtered.filter(a => a.date === date && a.service === 'xetnghiem').reduce((sum, a) => sum + a.revenue, 0));

  // 3. Biểu đồ tròn: Tỷ lệ các loại dịch vụ
  const serviceCounts = serviceTypes.map(type => filtered.filter(a => a.service === type).length);

  // Lọc dữ liệu uống thuốc
  const filteredMedication = sampleMedication.filter(item => {
    const matchFrom = fromDate ? item.date >= fromDate : true;
    const matchTo = toDate ? item.date <= toDate : true;
    const matchType = pillType === 'all' ? true : item.type === pillType;
    return matchFrom && matchTo && matchType;
  });
  // Lấy tháng (YYYY-MM) từ ngày
  function getMonth(dateStr) { return dateStr.slice(0,7); }
  const medMonths = Array.from(new Set(filteredMedication.map(a => getMonth(a.date)))).sort();
  // Số người dùng duy nhất mỗi tháng
  const medUsersByMonth = medMonths.map(month => {
    const users = new Set(filteredMedication.filter(a => getMonth(a.date) === month).map(a => a.user));
    return users.size;
  });
  // Tổng số người dùng duy nhất toàn bộ
  const medUsers = Array.from(new Set(filteredMedication.map(a => a.user)));
  const medTotal = filteredMedication.length;

  // Lọc dữ liệu chu kỳ
  const filteredCycle = sampleCycle.filter(item => {
    const matchFrom = fromDate ? item.date >= fromDate : true;
    const matchTo = toDate ? item.date <= toDate : true;
    return matchFrom && matchTo;
  });
  const cycleDates = Array.from(new Set(filteredCycle.map(a => a.date))).sort();
  const cycleTotal = filteredCycle.length;
  const cycleNormalTotal = filteredCycle.filter(a => a.status === 'normal').length;
  const cycleAbnormalTotal = filteredCycle.filter(a => a.status === 'abnormal').length;

  // Group cho lịch hẹn
  const appointmentsGroup = groupByTimeUnit(filtered, allTimeUnit);
  const appointmentsLabels = appointmentsGroup.keys;
  const appointmentsByPeriod = appointmentsLabels.map(key => appointmentsGroup.map.get(key).length);

  // Group cho doanh thu
  const revenueByPeriod = appointmentsLabels.map(key => appointmentsGroup.map.get(key).reduce((sum, a) => sum + a.revenue, 0));

  // Group cho tỷ lệ dịch vụ
  const serviceCountsByPeriod = serviceTypes.map(type => {
    // Đếm số lượng từng loại dịch vụ theo từng chu kỳ
    const group = groupByTimeUnit(filtered.filter(a => a.service === type), allTimeUnit);
    return appointmentsLabels.map(key => group.map.get(key)?.length || 0);
  });

  // Group cho uống thuốc
  const medGroup = groupByTimeUnit(filteredMedication, allTimeUnit);
  const medLabels = medGroup.keys;
  const medUsersByPeriod = medLabels.map(key => {
    const users = new Set(medGroup.map.get(key)?.map(a => a.user));
    return users.size;
  });

  // Group cho chu kỳ
  const cycleGroup = groupByTimeUnit(filteredCycle, allTimeUnit);
  const cycleLabels = cycleGroup.keys;
  const cycleNormal = cycleLabels.map(key => cycleGroup.map.get(key)?.filter(a => a.status === 'normal').length || 0);
  const cycleAbnormal = cycleLabels.map(key => cycleGroup.map.get(key)?.filter(a => a.status === 'abnormal').length || 0);

  return (
    <>
      <AdminLayout />
      <MainContent>
        <ContentWrapper>
          <h2 style={{ marginBottom: '16px', fontSize: 22, fontWeight: 700, color: '#1f2937' }}>Thống kê hoạt động</h2>
          {/* Bộ lọc nâng cao */}
          <FilterBar>
            <div>
              <FilterLabel>Từ ngày</FilterLabel>
              <FilterInput type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
            </div>
            <div>
              <FilterLabel>Đến ngày</FilterLabel>
              <FilterInput type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
            </div>
            <div>
              <FilterLabel>Loại dịch vụ</FilterLabel>
              <FilterSelect value={serviceType} onChange={e => setServiceType(e.target.value)}>
                <option value="all">Tất cả</option>
                <option value="tuvan">Tư vấn</option>
                <option value="xetnghiem">Xét nghiệm</option>
                <option value="theodoi">Theo dõi thai</option>
              </FilterSelect>
            </div>
            <div>
              <FilterLabel>Trạng thái</FilterLabel>
              <FilterSelect value={status} onChange={e => setStatus(e.target.value)}>
                <option value="all">Tất cả</option>
                <option value="done">Hoàn thành</option>
                <option value="processing">Đang xử lý</option>
                <option value="cancel">Đã hủy</option>
              </FilterSelect>
            </div>
            <div>
              <FilterLabel>Chu kỳ thống kê</FilterLabel>
              <FilterSelect value={allTimeUnit} onChange={e => setAllTimeUnit(e.target.value)} style={{minWidth:100}}>
                <option value="day">Ngày</option>
                <option value="week">Tuần</option>
                <option value="month">Tháng</option>
                <option value="year">Năm</option>
              </FilterSelect>
            </div>
          </FilterBar>
          <StatsGrid>
            <StatsCard>
              <StatsLeft>
                <StatsLabel>Lịch hẹn hôm nay</StatsLabel>
                <StatsNumber>{countToday}</StatsNumber>
              </StatsLeft>
              <StatsIconWrapper style={{ backgroundColor: '#eef2ff' }}>
                <i className="fas fa-calendar-check" style={{ color: '#4f46e5', fontSize: 20 }}></i>
              </StatsIconWrapper>
            </StatsCard>
            <StatsCard>
              <StatsLeft>
                <StatsLabel>Người dùng mới</StatsLabel>
                <StatsNumber>{countUserNew}</StatsNumber>
              </StatsLeft>
              <StatsIconWrapper style={{ backgroundColor: '#dcfce7' }}>
                <i className="fas fa-user-plus" style={{ color: '#22c55e', fontSize: 20 }}></i>
              </StatsIconWrapper>
            </StatsCard>
            <StatsCard>
              <StatsLeft>
                <StatsLabel>Doanh thu</StatsLabel>
                <StatsNumber>{totalRevenue.toLocaleString('vi-VN')}₫</StatsNumber>
              </StatsLeft>
              <StatsIconWrapper style={{ backgroundColor: '#dbeafe' }}>
                <i className="fas fa-coins" style={{ color: '#2563eb', fontSize: 20 }}></i>
              </StatsIconWrapper>
            </StatsCard>
            <StatsCard>
              <StatsLeft>
                <StatsLabel>Dịch vụ phổ biến</StatsLabel>
                <StatsNumber>{mostUsedService}</StatsNumber>
              </StatsLeft>
              <StatsIconWrapper style={{ backgroundColor: '#fee2e2' }}>
                <i className="fas fa-star" style={{ color: '#ef4444', fontSize: 20 }}></i>
              </StatsIconWrapper>
            </StatsCard>
          </StatsGrid>
          <ChartsRow>
            <ChartBox>
              <ChartHeader>
                <ChartTitle>Lịch hẹn theo {allTimeUnit === 'day' ? 'ngày' : allTimeUnit === 'week' ? 'tuần' : allTimeUnit === 'month' ? 'tháng' : 'năm'}</ChartTitle>
              </ChartHeader>
              {dateLabels.length > 0 ? (
                <Bar
                  data={{
                    labels: dateLabels,
                    datasets: [
                      {
                        label: 'Tư vấn',
                        data: appointmentsTuVanByDate,
                        backgroundColor: '#4f46e5',
                      },
                      {
                        label: 'Xét nghiệm',
                        data: appointmentsXetNghiemByDate,
                        backgroundColor: '#22c55e',
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: 'top' } },
                    scales: {
                      y: {
                        beginAtZero: true,
                        min: 0,
                        ticks: {
                          stepSize: 1,
                          callback: function(value) { return Number.isInteger(value) ? value : null; }
                        }
                      }
                    },
                  }}
                  height={220}
                />
              ) : (
                <div style={{color:'#888',textAlign:'center',padding:'32px 0'}}>Không có dữ liệu</div>
              )}
            </ChartBox>
            <ChartBox>
              <ChartHeader>
                <ChartTitle>Doanh thu theo {allTimeUnit === 'day' ? 'ngày' : allTimeUnit === 'week' ? 'tuần' : allTimeUnit === 'month' ? 'tháng' : 'năm'}</ChartTitle>
              </ChartHeader>
              {dateLabels.length > 0 ? (
                <Bar
                  data={{
                    labels: dateLabels,
                    datasets: [
                      {
                        label: 'Tư vấn',
                        data: revenueTuVanByDate,
                        backgroundColor: '#4f46e5',
                      },
                      {
                        label: 'Xét nghiệm',
                        data: revenueXetNghiemByDate,
                        backgroundColor: '#22c55e',
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: 'top' } },
                    scales: { y: { beginAtZero: true, min: 0 } },
                  }}
                  height={220}
                />
              ) : (
                <div style={{color:'#888',textAlign:'center',padding:'32px 0'}}>Không có dữ liệu</div>
              )}
            </ChartBox>
          </ChartsRow>
          {/* SECTION: Thống kê theo dõi uống thuốc */}
          <SectionTitle>Thống kê theo dõi uống thuốc</SectionTitle>
          <div style={{marginBottom:12}}>
            <FilterLabel>Loại thuốc:</FilterLabel>
            <FilterSelect value={pillType} onChange={e => setPillType(e.target.value)} style={{minWidth:120}}>
              <option value="all">Tất cả</option>
              <option value="21">21 ngày</option>
              <option value="28">28 ngày</option>
            </FilterSelect>
          </div>
          <SmallStatsGrid>
            <SmallStatsCard>
              <StatsLabel>Tổng số người dùng</StatsLabel>
              <StatsNumber>{medUsers.length}</StatsNumber>
            </SmallStatsCard>
            <SmallStatsCard>
              <StatsLabel>Tổng số lượt ghi nhận</StatsLabel>
              <StatsNumber>{medTotal}</StatsNumber>
            </SmallStatsCard>
          </SmallStatsGrid>
          {/* Xóa bảng danh sách dữ liệu uống thuốc */}

          {/* SECTION: Thống kê theo dõi chu kỳ */}
          <SectionTitle>Thống kê theo dõi chu kỳ</SectionTitle>
          <SmallStatsGrid>
            <SmallStatsCard>
              <StatsLabel>Tổng số người sử dụng</StatsLabel>
              <StatsNumber>{Array.from(new Set(filteredCycle.map(a => a.user))).length}</StatsNumber>
            </SmallStatsCard>
            <SmallStatsCard>
              <StatsLabel>Tổng số lượt ghi nhận</StatsLabel>
              <StatsNumber>{cycleTotal}</StatsNumber>
            </SmallStatsCard>
          </SmallStatsGrid>
          {/* Ẩn các số liệu khác */}
        </ContentWrapper>
      </MainContent>
    </>
  );
};

export default AdminThongKe;
