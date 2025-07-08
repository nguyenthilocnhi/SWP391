import React from 'react';
import StaffSidebar from '../components/staffSidebar';
import StaffHeader from '../components/staffHeader';
import styled from 'styled-components';

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
const Dashboard = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2.5rem;
  background: rgba(255,255,255,0.7);
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(16,185,129,0.10);
  padding: 2rem 1.5rem 1rem 1.5rem;
`;
const Card = styled.div`
  flex: 1 1 220px;
  text-align: center;
  background: linear-gradient(135deg, #e0f7fa 0%, #f4fff7 100%);
  border-radius: 16px;
  padding: 1.5rem 1rem;
  box-shadow: 0 4px 18px rgba(16,185,129,0.10);
  transition: box-shadow 0.2s, transform 0.2s;
  font-size: 1.1rem;
  font-weight: 500;
  &:hover {
    box-shadow: 0 8px 32px rgba(16,185,129,0.18);
    transform: translateY(-4px) scale(1.03);
  }
`;
const CardValue = styled.div`
  font-size: 2.3rem;
  font-weight: bold;
  color: #0d8a5f;
  margin-top: 0.5rem;
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
const Notifications = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(16,185,129,0.08);
  padding: 28px 24px;
  flex: 1 1 400px;
  max-width: 100%;
`;
const AppointmentTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 18px;
  color: #0d8a5f;
`;
const NotificationsTitle = styled.h3`
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
const NotificationsItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e0f2f1;
  font-size: 16px;
  color: #333;
  &:last-child { border-bottom: none; }
`;
const Time = styled.span`
  font-size: 0.95em;
  color: #888;
  margin-left: 8px;
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
        <Dashboard className="dashboard">
          <Card className="card">
            <div>Lịch hẹn hôm nay</div>
            <CardValue className="card-value">12</CardValue>
          </Card>
          <Card className="card">
            <div>Khách hàng mới</div>
            <CardValue className="card-value">4</CardValue>
          </Card>
          <Card className="card">
            <div>Thông báo</div>
            <CardValue className="card-value">3</CardValue>
          </Card>
        </Dashboard>
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
          <Notifications className="notifications">
            <NotificationsTitle className="notifications-title">Thông báo mới</NotificationsTitle>
            <ul>
              <NotificationsItem className="notifications-item">Có lịch hẹn mới <Time className="time">15 phút trước</Time></NotificationsItem>
              <NotificationsItem className="notifications-item">Có câu hỏi mới <Time className="time">2 giờ trước</Time></NotificationsItem>
            </ul>
          </Notifications>
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
