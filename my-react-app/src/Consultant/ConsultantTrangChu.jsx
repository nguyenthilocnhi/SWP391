import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaUserFriends, FaCalendarAlt, FaChartPie, FaComments, FaClipboardList, FaCog, FaHeadphones, FaSignOutAlt, FaHome } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f9fafb;
  font-family: 'Inter', sans-serif;
`;
const Sidebar = styled.aside`
  width: 250px;
  background: linear-gradient(160deg, #34d399 0%, #10b981 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 0 24px 0;
  position: fixed;
  top: 0; left: 0; bottom: 0;
  z-index: 100;
`;
const LogoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 32px 24px 24px 24px;
  img {
    height: 48px;
  }
  span {
    font-size: 1.3rem;
    font-weight: 700;
    letter-spacing: 1px;
  }
`;
const SideNav = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 12px;
  a {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 28px;
    color: #fff;
    font-size: 1.08rem;
    font-weight: 500;
    border-radius: 8px;
    text-decoration: none;
    transition: background 0.18s;
    &:hover, &.active {
      background: rgba(255,255,255,0.13);
      color: #fff;
    }
  }
`;
const SideBottom = styled.div`
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  a {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 28px;
    color: #fff;
    font-size: 1.05rem;
    border-radius: 8px;
    text-decoration: none;
    transition: background 0.18s;
    &:hover {
      background: rgba(255,255,255,0.13);
    }
  }
`;
const Main = styled.div`
  flex: 1;
  margin-left: 250px;
  background: #f9fafb;
  min-height: 100vh;
`;
const Topbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 0 36px;
  height: 72px;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 10;
`;
const SearchBox = styled.input`
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 16px;
  width: 320px;
  font-size: 1rem;
  margin-right: 24px;
`;
const TopRight = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;
const Bell = styled.div`
  position: relative;
  font-size: 1.6rem;
  color: #10b981;
  cursor: pointer;
  .badge {
    position: absolute;
    top: -6px; right: -8px;
    background: #ef4444;
    color: #fff;
    font-size: 0.8rem;
    border-radius: 50%;
    padding: 2px 6px;
    font-weight: 700;
  }
`;
const UserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #10b981;
  }
  span {
    font-weight: 600;
    color: #222;
  }
`;
const Content = styled.div`
  padding: 36px 36px 0 36px;
`;
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 32px;
  margin-bottom: 36px;
`;
const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(16,185,129,0.08);
  padding: 28px 24px 18px 24px;
  min-height: 340px;
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 1.15rem;
    font-weight: 700;
    margin-bottom: 18px;
    color: #10b981;
  }
`;
const ChartPlaceholder = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #10b981;
  font-size: 1.2rem;
  font-weight: 600;
  min-height: 220px;
`;

const ConsultantTrangChu = () => {
  const [consultantName, setConsultantName] = useState("Nguyễn Văn A");
  const [greetingName, setGreetingName] = useState("Nguyễn Văn A");
  const [appointmentCount, setAppointmentCount] = useState(12);
  const [questionCount, setQuestionCount] = useState(3);
  const [ratingScore, setRatingScore] = useState(4.7);

  return (
    <Wrapper>
      <Sidebar>
        <LogoBox>
          <img src="https://i.postimg.cc/g2C1ys2D/nh-ch-p-m-n-h-nh-2025-06-29-000958.png" alt="Logo" />
          <span>An Giới</span>
        </LogoBox>
        <SideNav>
          <a href="#" className="active"><FaHome />Tổng quan</a>
          <a href="#"><FaUserFriends />Quản lý khách hàng</a>
          <a href="#"><FaCalendarAlt />Lịch hẹn</a>
          <a href="#"><FaChartPie />Thống kê</a>
          <a href="#"><FaComments />Tư vấn trực tuyến</a>
          <a href="#"><MdHealthAndSafety />Bài viết sức khỏe</a>
        </SideNav>
        <SideBottom>
          <a href="#"><FaCog />Cài đặt</a>
          <a href="#"><FaHeadphones />Hỗ trợ</a>
          <a href="#"><FaSignOutAlt />Đăng xuất</a>
        </SideBottom>
      </Sidebar>
      <Main>
        <Topbar>
          <span style={{ fontSize: "1.35rem", fontWeight: 600, color: "#222" }}>Xin chào, {consultantName}</span>
          <div style={{ flex: 1 }} />
          <SearchBox placeholder="Tìm kiếm khách hàng, bài viết..." />
          <TopRight>
            <Bell>
              <IoMdNotifications />
              <span className="badge">3</span>
            </Bell>
            <UserBox>
              <img src="https://i.postimg.cc/rFsJ2wWR/tuvanvien.jpg" alt="Consultant" />
              <span>{consultantName}</span>
            </UserBox>
          </TopRight>
        </Topbar>
        <Content>
          <CardGrid>
            <Card>
              <h3>Thống kê tư vấn theo tháng</h3>
              <ChartPlaceholder>
                {/* Tích hợp chart thực tế ở đây */}
                Biểu đồ tư vấn trực tiếp & trực tuyến
              </ChartPlaceholder>
            </Card>
            <Card>
              <h3>Thống kê xét nghiệm theo tháng</h3>
              <ChartPlaceholder>
                {/* Tích hợp chart thực tế ở đây */}
                Biểu đồ xét nghiệm STI & máu
              </ChartPlaceholder>
            </Card>
          </CardGrid>
          {/* Thêm các section khác như lịch hẹn gần đây, bảng, ... ở đây */}
        </Content>
      </Main>
    </Wrapper>
  );
};

export default ConsultantTrangChu;