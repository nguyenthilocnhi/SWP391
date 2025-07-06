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
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  flex-direction: column;
  gap: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  cursor: pointer;
  .user-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 1.1;
  }
  .user-name {
    font-size: 15px;
    font-weight: 600;
    color: #222;
    margin-bottom: 2px;
  }
  .user-role {
    font-size: 12px;
    color: #888;
    font-weight: 400;
    margin: 0;
  }
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
  display: ${({ $visible }) => ($visible ? 'block' : 'none')};

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
          <Link to="/customer">
            <img src="https://i.postimg.cc/mZjYJ7wm/logo.jpg" alt="Logo An Giới" />
          </Link>
        </Logo>

        <Nav className="main-nav">
          <ul>
            <li><Link to="/customer/introduce">Giới thiệu</Link></li>
            <li><Link to="/customer/service">Dịch vụ</Link></li>
            <li><Link to="/customer/blog">Blog</Link></li>
            <li><Link to="/customer/dat-lich-dich-vu">Đặt lịch</Link></li>
            <li><Link to="/customer/tuvanvien">Tư vấn viên</Link></li>
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
            <NotificationBox $visible={showNotifications}>
              <p>Bạn có {notifications.length} thông báo mới</p>
              <ul>
                {notifications.map((item, index) => (
                  <li key={index}><div className="notify-content">{item}</div></li>
                ))}
              </ul>
            </NotificationBox>
          </NotificationWrapper>

          <UserInfo onClick={toggleUserMenu}>
            <Avatar src="/src/assets/react.svg" alt="Avatar" />
            <div className="user-details">
              <span className="user-name">Nguyễn Bích M</span>
              <span className="user-role">Khách Hàng</span>
            </div>
            <span className="user-dropdown">▼</span>
            <UserMenu $visible={showUserMenu}>
              <ul>
                <li><a href="/customer/thong-tin-ca-nhan">Thông tin cá nhân</a></li>
                <li><a href="/customer/theo-doi-chu-ky">Theo dõi chu kỳ</a></li>
                <li><a href="/customer/lich-su-dat-lich">Lịch sử đặt lịch</a></li>
                <li><a href="/customer/ket-qua-xet-nghiem">Kết quả xét nghiệm</a></li>
                <li><a href="/customer/lich-su-dich-vu-va-danh-gia">Lịch sử dịch vụ và đánh giá</a></li>
                <li><a href="/customer/nhac-nho">Nhắc uống thuốc tránh thai</a></li>
                <li><a href="/customer/dat-cau-hoi">Đặt câu hỏi</a></li>
                <li><a href="/customer/cai-dat">Cài đặt</a></li>
              </ul>
            </UserMenu>
          </UserInfo>
        </div>
      </HeaderContainer>
    </Header>
  );
}
