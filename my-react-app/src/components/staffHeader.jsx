import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 35px 16px 40px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  margin-bottom: 10px;
  position: fixed;
  top: 0;
  left: 250px;
  width: calc(100vw - 250px);
  z-index: 100;
  box-sizing: border-box;
  overflow-x: auto;
  @media (max-width: 768px) {
    left: 80px;
    width: calc(100vw - 80px);
  }
`;
const Title = styled.h2`
  font-size: 1.5rem;
  color: #018866;
  margin: 0;
`;
const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const UserHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 12px;
`;
const UserHeaderName = styled.span`
  font-weight: 600;
  color: #333;
  font-size: 1.1rem;
`;
const UserHeaderRole = styled.span`
  font-size: 0.95rem;
  color: #888;
`;
const AvatarWrapper = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
`;
const AvatarImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
const HeaderSearch = styled.form`
  display: flex;
  align-items: center;
  margin: 0 24px;
  background: #f4f6fa;
  border-radius: 24px;
  padding: 4px 12px;
  box-shadow: 0 1px 4px rgba(42,91,215,0.04);
  height: 40px;
`;
const SearchInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  padding: 8px 8px 8px 0;
  font-size: 1rem;
  width: 200px;
  color: #333;
`;
const SearchButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: #000000;
  font-size: 1.1em;
  padding: 0 4px;
  display: flex;
  align-items: center;
  transition: color 0.2s;
  &:hover {
    color: #0cb3a2;
  }
`;

const StaffHeader = ({
  userName,
  userRole = 'Nhân viên',
  avatar,
  online = true,
  welcome
}) => {
  // Load thông tin từ localStorage
  const getInitialHeaderProfile = () => {
    try {
      const savedHeaderProfile = localStorage.getItem('staffHeaderProfile');
      if (savedHeaderProfile) {
        return JSON.parse(savedHeaderProfile);
      }
    } catch (error) {
      console.error('Lỗi khi load header profile từ localStorage:', error);
    }
    return {
      name: 'Nguyễn Thị Hương',
      avatar: 'https://placehold.co/40x40',
    };
  };

  const [headerProfile, setHeaderProfile] = useState(getInitialHeaderProfile);

  // Lắng nghe sự kiện storage để đồng bộ giữa các tab
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'staffHeaderProfile') {
        try {
          const savedHeaderProfile = localStorage.getItem('staffHeaderProfile');
          if (savedHeaderProfile) {
            const parsedHeaderProfile = JSON.parse(savedHeaderProfile);
            setHeaderProfile(parsedHeaderProfile);
          }
        } catch (error) {
          console.error('Lỗi khi sync header profile từ storage:', error);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Ưu tiên lấy userName và userDisplayName từ localStorage
  const localUserName = localStorage.getItem('userName');
  const localUserDisplayName = localStorage.getItem('userDisplayName');
  const displayName = localUserName || userName || headerProfile.name;
  const displayRole = localUserDisplayName || userRole || 'Nhân viên';
  const displayAvatar = avatar || headerProfile.avatar;
  const displayWelcome = welcome || `Chào mừng trở lại, ${displayName.split(' ').pop()}!`;

  return (
    <Header className="header">
      <Title>{displayWelcome}</Title>
      <HeaderSearch className="header-search" action="#" method="get">
        <SearchInput type="text" placeholder="Tìm kiếm..." name="search" />
        <SearchButton type="submit"><i className="fas fa-search"></i></SearchButton>
      </HeaderSearch>
      <HeaderActions className="header-actions">
        <UserHeaderInfo className="user-header-info">
          <UserHeaderName className="user-header-name">{displayName}</UserHeaderName>
          <UserHeaderRole className="user-header-role">{displayRole}</UserHeaderRole>
        </UserHeaderInfo>
        <AvatarWrapper className="avatar">
          <AvatarImg src={avatar} alt="Avatar" className="rounded-full" />
        </AvatarWrapper>
      </HeaderActions>
    </Header>
  );
};

export default StaffHeader;
