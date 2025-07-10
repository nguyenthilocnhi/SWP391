import React, { useState } from 'react';
import StaffSidebar from '../components/staffSidebar';
import StaffHeader from '../components/staffHeader';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2'; // Thêm thư viện biểu đồ

const Container = styled.div`
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
  width: 100vw;
  margin: 0;
  padding: 2rem 0;
`;

const ContentArea = styled.main`
  flex: 1;
  padding: 2.5rem 3rem;
  background: transparent;
  overflow-y: auto;
  margin-left: 250px;
  min-height: 100vh;
  @media (max-width: 768px) {
    margin-left: 80px;
    padding: 1rem;
  }
  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const QuickStats = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

const StatCard = styled.div`
  flex: 1;
  background: #e0f7fa;
  border-radius: 10px;
  padding: 0.75rem 0.5rem;
  text-align: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  margin: 0 0.5rem;
  min-width: 120px;
  max-width: 150px;
`;

const StatValue = styled.h2`
  font-size: 1.3rem;
  color: #0d8a5f;
  margin: 0 0 0.25rem 0;
`;

const StatDescription = styled.p`
  font-size: 0.95rem;
  color: #333;
  margin: 0;
`;

const ChartSection = styled.section`
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

const ChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #0d8a5f;
`;

const MainSections = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  margin-bottom: 2.5rem;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const Appointment = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(16,185,129,0.08);
  padding: 28px 24px;
  flex: 1 1 600px;
  max-width: 100%;
`;

const Results = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(16,185,129,0.08);
  padding: 28px 24px;
  flex: 1 1 600px;
  max-width: 100%;
`;

const AppointmentTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 18px;
  color: #0d8a5f;
`;

const ResultsTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 18px;
  color: #0d8a5f;
`;

const AppointmentItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e0f2f1;
  font-size: 16px;
  color: #333;
  &:last-child { border-bottom: none; }
`;

const ResultItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e0f2f1;
  font-size: 16px;
  color: #333;
  &:last-child { border-bottom: none; }
`;

const Status = styled.span`
  border-radius: 14px;
  padding: 4px 16px;
  font-size: 1em;
  font-weight: 600;
  display: inline-block;
  white-space: nowrap;
  background: linear-gradient(90deg, #e0f7fa 0%, #b2f5ea 100%);
  color: #0d8a5f;
  &.confirmed { background: linear-gradient(90deg, #e0e7ff 0%, #c7d2fe 100%); color: #3730a3; }
  &.done, &.tracking { background: linear-gradient(90deg, #d1fae5 0%, #a7f3d0 100%); color: #065f46; }
  &.waiting { background: linear-gradient(90deg, #fef3c7 0%, #fde68a 100%); color: #92400e; }
`;

const ViewDetails = styled.span`
  color: #0d8a5f;
  cursor: pointer;
  font-weight: 500;
  transition: text-decoration 0.2s;
  &:hover { text-decoration: underline; }
`;

const Customer = styled.section`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 18px rgba(16,185,129,0.10);
  padding: 28px 24px;
  flex: 1 1 100%;
  max-width: 100%;
`;

const CustomerTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 18px;
  color: #0d8a5f;
`;

const CustomerTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 16px;
  color: #333;
  background: #f9f9f9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(16,185,129,0.06);
`;

const CustomerTh = styled.th`
  font-weight: bold;
  color: #111;
  padding: 14px 18px;
  text-align: left;
  vertical-align: middle;
  background: #e0f7fa;
`;

const CustomerTd = styled.td`
  padding: 12px 18px;
  text-align: left;
  vertical-align: middle;
  background: #fff;
`;

const StaffTrangChu = () => {
  const [viewMode, setViewMode] = useState('daily'); // Chế độ xem: daily, weekly, quarterly

  // Giả định số lượng lịch hẹn hôm nay và hôm qua
  const todayAppointments = 5; // Số lượng lịch hẹn hôm nay
  const yesterdayAppointments = 3; // Số lượng lịch hẹn hôm qua

  // Helper để lấy 7 ngày gần nhất dạng dd/MM
  function getLast7DaysLabels() {
    const labels = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      labels.push(d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }));
    }
    return labels;
  }

  // Helper để lấy 7 tuần gần nhất
  function getLast7WeeksLabels() {
    const labels = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i * 7);
      const week = getWeekNumber(d);
      labels.push(`Tuần ${week}`);
    }
    return labels;
  }
  // Helper lấy số tuần trong năm
  function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1)/7);
    return weekNo;
  }
  // Helper để lấy 4 quý gần nhất
  function getLast4QuartersLabels() {
    const labels = [];
    const today = new Date();
    let year = today.getFullYear();
    let quarter = Math.floor((today.getMonth()) / 3) + 1;
    for (let i = 3; i >= 0; i--) {
      let q = quarter - i;
      let y = year;
      if (q <= 0) {
        q += 4;
        y -= 1;
      }
      labels.push(`Q${q}/${y}`);
    }
    return labels;
  }

  // Dữ liệu mẫu cho từng chế độ
  const dailyData = [3, 5, 2, 8, 6, 7, 4];
  const weeklyData = [25, 32, 28, 40, 35, 30, 38];
  const quarterlyData = [110, 125, 98, 140];

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Ngày',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Số lượng',
        },
      },
    },
  };

  let chartData;
  if (viewMode === 'daily') {
    chartData = {
      labels: getLast7DaysLabels(),
      datasets: [
        {
          label: 'Số đặt lịch xét nghiệm theo ngày',
          data: dailyData,
          borderColor: 'rgba(13, 138, 95, 1)',
          backgroundColor: 'rgba(13, 138, 95, 0.2)',
          fill: true,
        },
      ],
    };
  } else if (viewMode === 'weekly') {
    chartData = {
      labels: getLast7WeeksLabels(),
      datasets: [
        {
          label: 'Số đặt lịch xét nghiệm theo tuần',
          data: weeklyData,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
        },
      ],
    };
  } else {
    chartData = {
      labels: getLast4QuartersLabels(),
      datasets: [
        {
          label: 'Số đặt lịch xét nghiệm theo quý',
          data: quarterlyData,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true,
        },
      ],
    };
  }

  return (
    <Container className="container">
      <StaffSidebar />
      <ContentArea className="content-area">
        <StaffHeader
          userName="Nguyễn Thị Hương"
          userRole="Nhân viên"
          avatar="https://placehold.co/40x40"
          online={true}
          welcome="Chào mừng trở lại, Hương!"
        />

        {/* Thống kê nhanh */}
        <QuickStats>
          <StatCard>
            <StatValue>12</StatValue>
            <StatDescription>Lịch hẹn chờ xác nhận</StatDescription>
          </StatCard>
          <StatCard>
            <StatValue>{todayAppointments}</StatValue>
            <StatDescription>Lịch hôm nay ({todayAppointments - yesterdayAppointments > 0 ? '+' : ''}{todayAppointments - yesterdayAppointments})</StatDescription>
          </StatCard>
          <StatCard>
            <StatValue>7</StatValue>
            <StatDescription>Cần trả kết quả</StatDescription>
          </StatCard>
          <StatCard>
            <StatValue>142</StatValue>
            <StatDescription>Tổng lịch đã xử lý trong tháng</StatDescription>
          </StatCard>
        </QuickStats>

        {/* Biểu đồ trực quan */}
        <ChartSection>
          <ChartTitle>Biểu đồ số đặt lịch xét nghiệm theo {viewMode === 'daily' ? 'ngày' : viewMode === 'weekly' ? 'tuần' : 'quý'}</ChartTitle>
          <ChartModeSwitcher>
            <ChartModeBtn className={viewMode === 'daily' ? 'active' : ''} onClick={() => setViewMode('daily')}>Ngày</ChartModeBtn>
            <ChartModeBtn className={viewMode === 'weekly' ? 'active' : ''} onClick={() => setViewMode('weekly')}>Tuần</ChartModeBtn>
            <ChartModeBtn className={viewMode === 'quarterly' ? 'active' : ''} onClick={() => setViewMode('quarterly')}>Quý</ChartModeBtn>
          </ChartModeSwitcher>
          <div style={{ width: '100%', height: 320 }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </ChartSection>

        <MainSections className="main-sections">
          <Appointment className="appointment">
            <AppointmentTitle className="appointment-title">Lịch hẹn hôm nay</AppointmentTitle>
            <ul>
              <AppointmentItem className="appointment-item">
                <span>Nguyễn Văn A</span>
                <span>14:30 - 15:00</span>
                <Status className="status confirmed">Đã xác nhận</Status>
                <ViewDetails className="view-details">Xem chi tiết</ViewDetails>
              </AppointmentItem>
              <AppointmentItem className="appointment-item">
                <span>Trần Thị B</span>
                <span>15:00 - 15:30</span>
                <Status className="status done">Hoàn thành</Status>
                <ViewDetails className="view-details">Xem chi tiết</ViewDetails>
              </AppointmentItem>
              <AppointmentItem className="appointment-item">
                <span>Lê Văn C</span>
                <span>16:00 - 16:30</span>
                <Status className="status waiting">Đang chờ</Status>
                <ViewDetails className="view-details">Xem chi tiết</ViewDetails>
              </AppointmentItem>
            </ul>
          </Appointment>
          <Results className="results">
            <ResultsTitle className="results-title">Kết quả xét nghiệm gần đây</ResultsTitle>
            <ul>
              <ResultItem className="result-item">
                <span>Nguyễn Văn A</span>
                <span>Xét nghiệm HIV</span>
                <span>Kết quả: Âm tính</span>
                <ViewDetails className="view-details">Xem chi tiết</ViewDetails>
              </ResultItem>
              <ResultItem className="result-item">
                <span>Trần Thị B</span>
                <span>Xét nghiệm COVID-19</span>
                <span>Kết quả: Dương tính</span>
                <ViewDetails className="view-details">Xem chi tiết</ViewDetails>
              </ResultItem>
            </ul>
          </Results>
        </MainSections>
        <Customer className="customer">
          <CustomerTitle className="customer-title">Khách hàng gần đây</CustomerTitle>
          <CustomerTable>
            <thead>
              <tr>
                <CustomerTh>Khách hàng</CustomerTh>
                <CustomerTh>Giới tính</CustomerTh>
                <CustomerTh>Lý do khám</CustomerTh>
                <CustomerTh>Trạng thái</CustomerTh>
              </tr>
            </thead>
            <tbody>
              <tr>
                <CustomerTd>Nguyễn Văn A</CustomerTd>
                <CustomerTd>Nam</CustomerTd>
                <CustomerTd>Tư vấn ECP</CustomerTd>
                <CustomerTd><Status className="status tracking">Đang theo dõi</Status></CustomerTd>
              </tr>
              <tr>
                <CustomerTd>Trần Thị B</CustomerTd>
                <CustomerTd>Nữ</CustomerTd>
                <CustomerTd>Xét nghiệm HIV</CustomerTd>
                <CustomerTd><Status className="status waiting">Chờ kết quả</Status></CustomerTd>
              </tr>
            </tbody>
          </CustomerTable>
        </Customer>
      </ContentArea>
    </Container>
  );
};

export default StaffTrangChu;

// Nút chuyển chế độ xem biểu đồ
const ChartModeSwitcher = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 10px;
`;
const ChartModeBtn = styled.button`
  padding: 6px 16px;
  border: none;
  border-radius: 6px;
  background: #e0f7fa;
  color: #018866;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover, &.active {
    background: #09a370;
    color: #fff;
  }
`;
