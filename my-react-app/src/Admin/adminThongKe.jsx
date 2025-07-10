import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import styled from 'styled-components';


const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  max-width: 100vw;
  overflow: hidden;
  position: relative;
  background-color: #f9fafb;
  font-family: 'Inter', sans-serif;
`;

const ContentArea = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 100vw;
  overflow: hidden;
`;

const MainContent = styled.main`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #f9fafb;
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
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
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
  min-width: 478px;
  max-width: 100%;
  width: 100%;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
  padding: 24px;
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

const AdminThongKe = () => {
  const appointmentsChartRef = useRef(null);
  const servicesChartRef = useRef(null);

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

  return (
    <MainContainer>
      {/* Sidebar + Header có thể import riêng */}
      <div id="admin-sidebar" />
      <ContentArea>
        <div id="admin-header" />
        <MainContent>
          <h2 style={{ marginBottom: '16px' }}>Thống kê hoạt động</h2>

          <StatsGrid>
            <StatsCard>
              <StatsLeft>
                <StatsLabel>Lịch hẹn hôm nay</StatsLabel>
                <StatsNumber>36</StatsNumber>
              </StatsLeft>
              <StatsIconWrapper style={{ backgroundColor: '#eef2ff' }}>
                <i className="fas fa-calendar-check" style={{ color: '#4f46e5', fontSize: 20 }}></i>
              </StatsIconWrapper>
            </StatsCard>

            <StatsCard>
              <StatsLeft>
                <StatsLabel>Người dùng mới</StatsLabel>
                <StatsNumber>12</StatsNumber>
              </StatsLeft>
              <StatsIconWrapper style={{ backgroundColor: '#dcfce7' }}>
                <i className="fas fa-user-plus" style={{ color: '#22c55e', fontSize: 20 }}></i>
              </StatsIconWrapper>
            </StatsCard>

            <StatsCard>
              <StatsLeft>
                <StatsLabel>Doanh thu</StatsLabel>
                <StatsNumber>8.200.000₫</StatsNumber>
              </StatsLeft>
              <StatsIconWrapper style={{ backgroundColor: '#dbeafe' }}>
                <i className="fas fa-coins" style={{ color: '#2563eb', fontSize: 20 }}></i>
              </StatsIconWrapper>
            </StatsCard>

            <StatsCard>
              <StatsLeft>
                <StatsLabel>Dịch vụ phổ biến</StatsLabel>
                <StatsNumber>Tư vấn sức khỏe</StatsNumber>
              </StatsLeft>
              <StatsIconWrapper style={{ backgroundColor: '#fee2e2' }}>
                <i className="fas fa-star" style={{ color: '#ef4444', fontSize: 20 }}></i>
              </StatsIconWrapper>
            </StatsCard>
          </StatsGrid>

          <ChartsRow>
            <ChartBox>
              <ChartHeader>
                <ChartTitle>Lịch hẹn theo ngày</ChartTitle>
              </ChartHeader>
              <canvas ref={appointmentsChartRef}></canvas>
            </ChartBox>

            <ChartBox>
              <ChartHeader>
                <ChartTitle>Dịch vụ được sử dụng</ChartTitle>
              </ChartHeader>
              <canvas ref={servicesChartRef}></canvas>
            </ChartBox>
          </ChartsRow>
        </MainContent>
      </ContentArea>
    </MainContainer>
  );
};

export default AdminThongKe;
