import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const SidebarContainer = styled.div`
  min-width: 250px;
  width: 250px;
  padding: 1.5rem 1rem;
  background: linear-gradient(135deg, #09a370 0%, #0d8a5f 100%);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: fixed;
  left: 0;
  top: 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  @media (max-width: 768px) {
    min-width: 80px;
    width: 80px;
    padding: 1rem 0.5rem;
  }
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  @media (max-width: 768px) {
    justify-content: center;
    margin-bottom: 1.5rem;
  }
`;
const LogoImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;
const LogoText = styled.p`
  font-size: 1.35rem;
  font-weight: bold;
  color: #ffffff;
  letter-spacing: 2px;
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  @media (max-width: 768px) {
    display: none;
  }
`;
const Nav = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;
const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 14px 20px;
  color: #ffffff;
  text-decoration: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background: ${({ $active }) => $active ? 'rgba(255,255,255,0.2)' : 'none'};
  border-left: ${({ $active }) => $active ? '4px solid #ffffff' : 'none'};
  &:hover {
    background: rgba(255,255,255,0.15);
    color: #ffffff;
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0;
    background: rgba(255,255,255,0.1);
    transition: width 0.3s ease;
  }
  &:hover::before {
    width: 100%;
  }
  @media (max-width: 768px) {
    padding: 12px;
    justify-content: center;
    font-size: 1.3em;
  }
`;
const NavIcon = styled.i`
  margin-right: 12px;
  font-size: 1.2em;
  width: 20px;
  text-align: center;
  transition: transform 0.3s ease;
  ${NavItem}:hover & {
    transform: scale(1.1);
  }
  @media (max-width: 768px) {
    margin-right: 0;
    font-size: 1.3em;
  }
`;
const SidebarText = styled.span`
  font-weight: 500;
  font-size: 0.95rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

const navLinks = [
  { to: '/staff/trangchu', icon: 'fas fa-home', text: 'Trang chủ' },
  { to: '/staff/lich-lam-viec', icon: 'fas fa-calendar-alt', text: 'Lịch làm việc' },
  { to: '/staff/quanlydatlich', icon: 'fas fa-calendar-check', text: 'Quản lý đặt lịch' },
  { to: '/staff/traketquaxetnghiem', icon: 'fas fa-flask', text: 'Trả kết quả xét nghiệm' },
  { to: '/staff/caidat', icon: 'fas fa-cog', text: 'Cài đặt' },
];

const StaffSidebar = () => {
  const location = useLocation();
  return (
    <SidebarContainer className="sidebar">
      <Logo className="logo">
        <Link to="/staff/trangchu">
          <LogoImg src="https://i.postimg.cc/hvw59Nzx/logo-staff.png" alt="Logo Trung Tâm" />
        </Link>
        <LogoText className="logo-text">AN GIỚI</LogoText>
      </Logo>
      <Nav>
        {navLinks.map(link => (
          <NavItem
            key={link.to}
            to={link.to}
            $active={location.pathname === link.to}
            className="nav-item"
          >
            <NavIcon className={link.icon} />
            <SidebarText className="sidebar-text">{link.text}</SidebarText>
          </NavItem>
        ))}
      </Nav>
    </SidebarContainer>
  );
};

export default StaffSidebar;
