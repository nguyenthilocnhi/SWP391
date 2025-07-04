import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 95%;
  padding: 10px 40px;
  background-color: #ffffff;
  z-index: 999;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  img {
    height: 70px;
  }
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    display: flex;
    gap: 2.5rem;
    padding: 0;
    margin: 0;
  }
  a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    font-size: 16px;
    transition: color 0.3s ease;
  }
  a:hover {
    color: #10b981;
  }
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  input {
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-radius: 20px;
    outline: none;
    font-size: 14px;
  }
  button {
    background: none;
    border: none;
    margin-left: 8px;
    cursor: pointer;
    img {
      width: 18px;
      height: 18px;
    }
  }
`;

const NotificationWrapper = styled.div`
  position: relative;
`;

const NotificationIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const Badge = styled.span`
  position: absolute;
  top: -6px;
  right: -15px;
  background-color: red;
  color: white;
  padding: 2px 6px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
`;

const NotificationBox = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  width: 280px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 16px;
  z-index: 999;
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  flex-direction: column;
  gap: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
`;

const UserMenu = styled.div`
  position: absolute;
  top: 50px;
  right: -15px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  width: 200px;
  z-index: 999;
  display: ${({ visible }) => (visible ? 'block' : 'none')};

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      border-bottom: 1px solid #eee;
      a {
        display: block;
        padding: 10px 16px;
        text-decoration: none;
        color: #333;
        font-size: 14px;
        transition: background-color 0.2s;
        &:hover {
          background-color: #f9f9f9;
        }
      }
    }
  }
`;

export default function HeaderCustomer() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    'Kết quả xét nghiệm đã có',
    'Lịch hẹn khám vào ngày mai',
    'Ưu đãi giảm 10% đang chờ bạn'
  ]);

  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);
  const toggleNotifications = () => setShowNotifications(!showNotifications);

  return (
    <Header>
      <HeaderContainer>
        <Logo>
          <Link to="/Frontend/Public/Customer/TrangchuCustomer.html">
            <img src="https://i.postimg.cc/mZjYJ7wm/logo.jpg" alt="Logo An Giới" />
          </Link>
        </Logo>

        <Nav className="main-nav">
          <ul>
            <li><Link to="/introduce">Giới thiệu</Link></li>
            <li><Link to="/dich-vu">Dịch vụ</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/datlich">Đặt lịch</Link></li>
            <li><Link to="/tuvanvien">Tư vấn viên</Link></li>
          </ul>
        </Nav>

        <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <SearchForm action="/Frontend/Public/Customer/timkiem_Customer.html" method="get">
            <input type="text" name="q" placeholder="Tìm kiếm..." required />
            <button type="submit">
              <img src="https://i.postimg.cc/mgxvN3zN/t-m-ki-m.png" alt="Tìm kiếm" />
            </button>
          </SearchForm>

          <NotificationWrapper>
            <a href="#" onClick={e => { e.preventDefault(); toggleNotifications(); }}>
              <NotificationIcon src="https://i.postimg.cc/TP8K01px/notifications-24dp-1-F1-F1-F-FILL0-wght400-GRAD0-opsz24.png" alt="Thông báo" />
              <Badge>{notifications.length}</Badge>
            </a>
            <NotificationBox visible={showNotifications}>
              <p>Bạn có {notifications.length} thông báo mới</p>
              <ul>
                {notifications.map((item, index) => (
                  <li key={index}><div className="notify-content">{item}</div></li>
                ))}
              </ul>
            </NotificationBox>
          </NotificationWrapper>

          <UserInfo onClick={toggleUserMenu}>
            <Avatar src="https://i.postimg.cc/vZVQXR5n/avatar-default.png" alt="Avatar" />
            <div className="user-details">
              <span className="user-name">Nguyễn Bích M</span>
              <span className="user-role">Khách Hàng</span>
            </div>
            <span className="user-dropdown">▼</span>
            <UserMenu visible={showUserMenu}>
              <ul>
                <li><a href="/Frontend/Public/Customer/Thongtincanhan.html">Thông tin cá nhân</a></li>
                <li><a href="/Frontend/Public/Customer/theodoichuky.html">Theo dõi chu kỳ</a></li>
                <li><a href="/Frontend/Public/Customer/Lichsudatlich.html">Lịch sử đặt lịch</a></li>
                <li><a href="/Frontend/Public/Customer/KetQuaXetNghiem.html">Kết quả xét nghiệm</a></li>
                <li><a href="/Frontend/Public/Customer/LichsudichvuVadanhgia.html">Lịch sử dịch vụ và đánh giá</a></li>
                <li><a href="/Frontend/Public/Customer/nhacnho.html">Nhắc uống thuốc tránh thai</a></li>
                <li><a href="/Frontend/Public/Customer/Datcauhoi.html">Đặt câu hỏi</a></li>
                <li><a href="/Frontend/Public/Customer/Setting.html">Cài đặt</a></li>
              </ul>
            </UserMenu>
          </UserInfo>
        </div>
      </HeaderContainer>
    </Header>
  );
}
