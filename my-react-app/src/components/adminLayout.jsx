import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';

// SIDEBAR STYLES
const Sidebar = styled.div`
  background: linear-gradient(135deg, #09a370 0%, #0d8a5f 100%);
  color: #fff;
  width: 250px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  z-index: 20;
  transition: transform 0.3s ease-in-out;

  &.hidden {
    transform: translateX(-100%);
  }
`;

const SidebarHeader = styled.div`
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 4rem;
  height: 4rem;
  object-fit: cover;
`;

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  position: absolute;
  right: 10px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Nav = styled.nav`
  padding: 16px;
  flex-grow: 1;
`;

const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 14px 20px;
  border-radius: 10px;
  text-decoration: none;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 10px;
  background: ${({ className }) => className && className.includes('active') ? 'rgba(255,255,255,0.15)' : 'none'};
  border-left: ${({ className }) => className && className.includes('active') ? '4px solid #fff' : 'none'};
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  &:hover, &.active {
    background: rgba(255,255,255,0.15);
    color: #fff;
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  i {
    margin-right: 12px;
  }
`;

const MenuItemButton = styled.button`
  display: flex;
  align-items: center;
  padding: 14px 20px;
  border-radius: 10px;
  border: none;
  background: none;
  color: #fff;
  width: 100%;
  text-align: left;
  font: inherit;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s;
  &:hover, &:focus {
    background: rgba(255,255,255,0.15);
    color: #fff;
    outline: none;
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  i {
    margin-right: 12px;
  }
`;

// HEADER STYLES
const Header = styled.header`
  background: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  border-radius: 16px;
  position: fixed;
  top: 0;
  left: 250px;
  right: 0;
  z-index: 10;
  padding: 12px 24px 12px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  @media (max-width: 1024px) {
    left: 0;
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const HeaderTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #018866;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SearchContainer = styled.div`
  position: relative;

  input {
    padding: 8px 16px 8px 36px;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;
  }

  i {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: #9ca3af;
  }
`;

const BellButton = styled.button`
  background: none;
  border: none;
  position: relative;
  cursor: pointer;
  color: #4b5563;

  &:hover {
    color: #111827;
  }

  span {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 8px;
    height: 8px;
    background-color: #ef4444;
    border-radius: 50%;
    display: none;
  }
`;

const BellBadge = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 18px;
  height: 18px;
  background: #ef4444;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 1px 4px rgba(239,68,68,0.13);
`;

const AdminInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  span {
    font-weight: 500;
    color: #374151;
  }
`;

const NotificationDropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  min-width: 260px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.13);
  padding: 12px 0;
  z-index: 100;
`;

const NotificationItem = styled.div`
  padding: 12px 20px;
  color: #374151;
  font-size: 15px;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  &:last-child { border-bottom: none; }
  &:hover { background: #f3f4f6; }
`;

const NotificationTime = styled.span`
  color: #9ca3af;
  font-size: 13px;
  margin-left: 8px;
  white-space: nowrap;
`;

const TrashBtn = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.15s;
  &:hover { background: #f3f4f6; }
`;

const NotificationEmpty = styled.div`
  padding: 18px 0;
  color: #9ca3af;
  text-align: center;
  font-size: 15px;
`;

const SearchDropdown = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.13);
  z-index: 99;
  max-height: 260px;
  overflow-y: auto;
`;

const SearchGroup = styled.div`
  padding: 8px 0 0 0;
`;

const SearchGroupTitle = styled.div`
  font-size: 13px;
  color: #059669;
  font-weight: 700;
  padding: 0 18px 4px 18px;
`;

const SearchItem = styled.div`
  padding: 10px 18px;
  font-size: 15px;
  color: #374151;
  cursor: pointer;
  &:hover { background: #f3f4f6; }
`;

const LOCAL_KEY = 'admin_profile';

export default function AdminLayout() {
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const location = useLocation();
  const [adminInfo, setAdminInfo] = useState({
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a66d16bd-5c13-4822-b69f-18a8346d9bd3.png',
    name: 'Admin',
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    {id: 1, text: 'Bạn có lịch hẹn mới lúc 10:00 sáng mai.', time: '09:00 01/07'},
    {id: 2, text: 'Khách hàng A vừa gửi câu hỏi mới.', time: '08:45 01/07'},
  ]);
  const bellRef = useRef();
  const [search, setSearch] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef();
  // Dữ liệu giả lập
  const customers = [
    { id: 1, name: 'Nguyễn Văn A', phone: '0901234567' },
    { id: 2, name: 'Trần Thị B', phone: '0902345678' },
    { id: 3, name: 'Lê Văn C', phone: '0903456789' },
  ];
  const posts = [
    { id: 1, title: 'Cách chăm sóc sức khỏe mùa hè' },
    { id: 2, title: 'Dinh dưỡng hợp lý cho người lớn tuổi' },
    { id: 3, title: 'Tập thể dục đúng cách mỗi ngày' },
  ];
  // Lọc kết quả
  const filteredCustomers = customers.filter(c => search && c.name.toLowerCase().includes(search.toLowerCase()));
  const filteredPosts = posts.filter(p => search && p.title.toLowerCase().includes(search.toLowerCase()));
  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    if (!showSearchDropdown) return;
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showSearchDropdown]);

  const toggleSidebar = () => {
    setSidebarHidden(!sidebarHidden);
  };

  const confirmLogout = () => {
    return window.confirm('Bạn có chắc chắn muốn đăng xuất?');
  };

  useEffect(() => {
    // Auto highlight menu
    const items = document.querySelectorAll('.menu-item');
    items.forEach(item => {
      if (item.getAttribute('href') === location.pathname) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }, [location.pathname]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAdminInfo({
          avatar: parsed.avatar || adminInfo.avatar,
          name: parsed.info?.name || adminInfo.name,
        });
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (!showDropdown) return;
    const handleClick = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showDropdown]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const pad = n => n.toString().padStart(2, '0');
      const time = `${pad(now.getHours())}:${pad(now.getMinutes())} ${pad(now.getDate())}/${pad(now.getMonth()+1)}`;
      setNotifications(nots => [
        { id: Date.now(), text: 'Thông báo mới tự động!', time },
        ...nots
      ]);
    }, 200000);
    return () => clearInterval(interval);
  }, []);

  const handleDeleteNotification = (id) => {
    setNotifications(nots => nots.filter(n => n.id !== id));
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  // Ưu tiên lấy userName và userDisplayName từ localStorage
  const localUserName = localStorage.getItem('userName');
  const localUserDisplayName = localStorage.getItem('userDisplayName');
  const displayName = localUserName || adminInfo.name || 'Admin';
  const displayRole = localUserDisplayName || 'Quản trị viên';

  return (
    <>
      <Sidebar className={sidebarHidden ? 'hidden' : ''}>
        <SidebarHeader>
          <LogoWrapper>
            <Link to="/admin/trangchu">
              <LogoImg src="https://i.postimg.cc/FRmWy0G5/Screenshot-2025-06-30-233025-removebg-preview.png" alt="Logo An Giới" style={{cursor: 'pointer'}} />
            </Link>
          </LogoWrapper>
          <MenuToggle onClick={toggleSidebar}>
            <i className="fas fa-bars"></i>
          </MenuToggle>
        </SidebarHeader>
        <Nav>
          <MenuList>
            <li><MenuItem to="/admin/trangchu" className="menu-item"><i className="fas fa-home" />Trang chủ</MenuItem></li>
            <li><MenuItem to="/admin/taikhoan" className="menu-item"><i className="fas fa-users" />Quản lý tài khoản</MenuItem></li>
            <li><MenuItem to="/admin/quan-ly-dich-vu" className="menu-item"><i className="fas fa-stethoscope" />Quản lý dịch vụ</MenuItem></li>
            <li><MenuItem to="/admin/danh-gia" className="menu-item"><i className="fas fa-star" />Quản lý đánh giá</MenuItem></li>
            <li><MenuItem to="/admin/thongke" className="menu-item"><i className="fas fa-chart-pie" />Thống kê</MenuItem></li>
            <li><MenuItem to="/admin/baiviet" className="menu-item"><i className="fas fa-newspaper" />Bài viết sức khỏe</MenuItem></li>
            <li><MenuItem to="/admin/caidat" className="menu-item"><i className="fas fa-cog" />Cài đặt</MenuItem></li>
            <li>
              <MenuItemButton
                type="button"
                className="menu-item"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt" />Đăng xuất
              </MenuItemButton>
            </li>
          </MenuList>
        </Nav>
      </Sidebar>

      <Header>
        <HeaderTitle>Xin chào, {displayName}</HeaderTitle>
        <HeaderActions>
          <SearchContainer ref={searchRef}>
            <input
              type="text"
              placeholder="Tìm kiếm khách hàng, bài viết..."
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => search && setShowSearchDropdown(true)}
              style={{background:'#f9fafb'}}
            />
            <i className="fas fa-search"></i>
            {showSearchDropdown && (search && (filteredCustomers.length > 0 || filteredPosts.length > 0)) && (
              <SearchDropdown>
                {filteredCustomers.length > 0 && (
                  <SearchGroup>
                    <SearchGroupTitle>Khách hàng</SearchGroupTitle>
                    {filteredCustomers.map(c => (
                      <SearchItem key={c.id} onClick={() => alert(`Khách hàng: ${c.name} - ${c.phone}`)}>
                        {c.name} <span style={{color:'#9ca3af', fontSize:13}}>({c.phone})</span>
                      </SearchItem>
                    ))}
                  </SearchGroup>
                )}
                {filteredPosts.length > 0 && (
                  <SearchGroup>
                    <SearchGroupTitle>Bài viết</SearchGroupTitle>
                    {filteredPosts.map(p => (
                      <SearchItem key={p.id} onClick={() => alert(`Bài viết: ${p.title}`)}>
                        {p.title}
                      </SearchItem>
                    ))}
                  </SearchGroup>
                )}
              </SearchDropdown>
            )}
          </SearchContainer>
          <div style={{position:'relative'}} ref={bellRef}>
            <BellButton onClick={() => setShowDropdown(v => !v)}>
              <i className="fas fa-bell"></i>
              {notifications.length > 0 && (
                <BellBadge>{notifications.length}</BellBadge>
              )}
            </BellButton>
            {showDropdown && (
              <NotificationDropdown>
                {notifications.length === 0 ? (
                  <NotificationEmpty>Chưa có thông báo nào</NotificationEmpty>
                ) : (
                  notifications.map(n => (
                    <NotificationItem key={n.id}>
                      <span>{n.text}<NotificationTime>{n.time}</NotificationTime></span>
                      <TrashBtn onClick={() => handleDeleteNotification(n.id)} title="Xóa thông báo">
                        <FaTrashAlt />
                      </TrashBtn>
                    </NotificationItem>
                  ))
                )}
              </NotificationDropdown>
            )}
          </div>
          <AdminInfo>
            <img src={adminInfo.avatar} alt="Admin" />
            <span>{displayName}</span>
            <span style={{fontSize:'12px', color:'#888', marginLeft:6}}>{displayRole}</span>
          </AdminInfo>
        </HeaderActions>
      </Header>
    </>
  );
}
