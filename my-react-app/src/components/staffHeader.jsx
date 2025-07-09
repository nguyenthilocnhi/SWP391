import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px 16px 32px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  margin-bottom: 10px;
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
const StatusDot = styled.span`
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.online ? '#4caf50' : '#ccc'};
  border: 2px solid #fff;
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
  userName = 'Nguyễn Thị Hương',
  userRole = 'Nhân viên',
  avatar = 'https://placehold.co/40x40',
  online = true,
  welcome = 'Chào mừng trở lại, Hương!'
}) => {
  return (
    <Header className="header">
      <Title>{welcome}</Title>
      <HeaderSearch className="header-search" action="#" method="get">
        <SearchInput type="text" placeholder="Tìm kiếm..." name="search" />
        <SearchButton type="submit"><i className="fas fa-search"></i></SearchButton>
      </HeaderSearch>
      <HeaderActions className="header-actions">
        <UserHeaderInfo className="user-header-info">
          <UserHeaderName className="user-header-name">{userName}</UserHeaderName>
          <UserHeaderRole className="user-header-role">{userRole}</UserHeaderRole>
        </UserHeaderInfo>
        <AvatarWrapper className="avatar">
          <AvatarImg src={avatar} alt="Avatar" className="rounded-full" />
          <StatusDot className={online ? 'status-dot online' : 'status-dot offline'} online={online} />
        </AvatarWrapper>
      </HeaderActions>
    </Header>
  );
};

export default StaffHeader;
