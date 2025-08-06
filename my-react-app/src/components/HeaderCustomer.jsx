import React, { useEffect, useState, useRef } from 'react';
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
  top: -10px;
  right: -15px;
  background-color: #ef4444;
  color: #fff;
  padding: 0 6px;
  min-width: 6px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 11px;
  font-weight: bold;
  border: 2px solid #fff;
  box-shadow: 0 2px 6px rgba(239,68,68,0.15);
  z-index: 2;
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
    { id: 1, text: 'Kết quả xét nghiệm đã có', time: '09:00 01/07' },
    { id: 2, text: 'Lịch hẹn khám vào ngày mai', time: '08:45 01/07' },
    { id: 3, text: 'Ưu đãi giảm 10% đang chờ bạn', time: '08:00 01/07' }
  ]);
  const [userName, setUserName] = useState('');
  const bellRef = useRef();
  const userRef = useRef();

  useEffect(() => {
  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('https://api-gender2.purintech.id.vn/api/Customer/get-user-info', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.code === 200 && data.obj?.fullName) {
        setUserName(data.obj.fullName);
      } else {
        setUserName('Khách');
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông tin user:', error);
      setUserName('Khách');
    }
  };

  fetchUserInfo();
}, []);

  // Đóng dropdown khi click ra ngoài (chuông)
  useEffect(() => {
    if (!showNotifications) return;
    const handleClick = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showNotifications]);

  // Đóng dropdown khi click ra ngoài (profile)
  useEffect(() => {
    if (!showUserMenu) return;
    const handleClick = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showUserMenu]);

  // Tự động thêm thông báo mới mỗi 200 giây
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const pad = n => n.toString().padStart(2, '0');
      const time = `${pad(now.getHours())}:${pad(now.getMinutes())} ${pad(now.getDate())}/${pad(now.getMonth()+1)}`;
      setNotifications(nots => [
        { id: Date.now(), text: 'Bạn có thông báo mới!', time },
        ...nots
      ]);
    }, 200000);
    return () => clearInterval(interval);
  }, []);

  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);
  const toggleNotifications = () => setShowNotifications(!showNotifications);
  const handleDeleteNotification = (id) => {
    setNotifications(nots => nots.filter(n => n.id !== id));
  };

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
            <li><Link to="/customer/tu-van-vien">Tư vấn viên</Link></li>
          </ul>
        </Nav>

        <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <SearchForm onSubmit={e => { e.preventDefault(); /* handle search here */ }}>
            <input type="text" name="q" placeholder="Tìm kiếm..." required />
            <button type="submit">
              <img src="https://i.postimg.cc/mgxvN3zN/t-m-ki-m.png" alt="Tìm kiếm" />
            </button>
          </SearchForm>

          <NotificationWrapper ref={bellRef}>
            <a href="#" onClick={e => { e.preventDefault(); toggleNotifications(); }} style={{position:'relative', display:'inline-block'}}>
              {/* Thay hình ảnh chuông bằng icon font-awesome */}
              <i className="fas fa-bell" style={{fontSize: '23px', color: '#4b5563'}}></i>
              {notifications.length > 0 && (
                <Badge>{notifications.length}</Badge>
              )}
            </a>
            <NotificationBox $visible={showNotifications} style={{right:0, minWidth:260}}>
              {notifications.length === 0 ? (
                <p style={{color:'#9ca3af', textAlign:'center'}}>Chưa có thông báo nào</p>
              ) : (
                <ul style={{padding:0, margin:0, listStyle:'none'}}>
                  {notifications.map((item) => (
                    <li key={item.id} style={{display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid #f3f4f6', padding:'8px 0'}}>
                      <div>
                        <div className="notify-content">{item.text}</div>
                        <span style={{color:'#9ca3af', fontSize:13}}>{item.time}</span>
                      </div>
                      <button onClick={() => handleDeleteNotification(item.id)} style={{background:'none', border:'none', color:'#ef4444', fontSize:16, cursor:'pointer', marginLeft:8}} title="Xóa thông báo">✕</button>
                    </li>
                  ))}
                </ul>
              )}
            </NotificationBox>
          </NotificationWrapper>

          <UserInfo ref={userRef} onClick={toggleUserMenu}>
            <Avatar src="https://i.postimg.cc/SKWH4csZ/Avatar-pnj.jpg" alt="Avatar" />
            <div className="user-details">
              <span className="user-name">{userName}</span>
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
