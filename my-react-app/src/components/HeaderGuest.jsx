import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 40px;
  background-color: #ffffff;
  z-index: 999;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  height: 80px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    height: auto;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  img {
    height: 70px;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.05);
    }
    @media (max-width: 480px) {
      height: 60px;
    }
  }
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    display: flex;
    gap: 2rem;
    padding: 0;
    margin: 0;

    @media (max-width: 768px) {
      gap: 1rem;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  li a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    font-size: 16px;
    transition: color 0.3s ease;
    padding: 8px 12px;
    border-radius: 6px;

    &:hover {
      color: #10b981;
    }

    @media (max-width: 480px) {
      font-size: 14px;
      padding: 6px 8px;
    }
  }
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;

  input {
    padding: 8px 16px;
    border: 1px solid #e5e7eb;
    border-radius: 20px;
    outline: none;
    font-size: 14px;
    width: 200px;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #10b981;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }

    @media (max-width: 768px) {
      width: 150px;
    }

    @media (max-width: 480px) {
      width: 120px;
      padding: 6px 12px;
    }
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: transparent;
    }

    img {
      width: 18px;
      height: 18px;
    }
  }
`;

function HeaderGuest() {
  return (
    <Header>
      <HeaderContainer>
        <Logo>
          <Link to="/">
            <img src="https://i.postimg.cc/mZjYJ7wm/logo.jpg" alt="Logo An Giới" />
          </Link>
        </Logo>

        <Nav className="main-nav">
          <ul>
            <li><Link to="/introduce">Giới thiệu</Link></li>
            <li><Link to="/dich-vu">Dịch vụ</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/tuvanvien">Tư vấn viên</Link></li>
            <li><Link to="/login">Đăng nhập</Link></li>
            <li><Link to="/register">Đăng ký</Link></li>
          </ul>
        </Nav>

        <SearchForm action="/Frontend/Public/Guest/timkiem.html" method="get">
          <input type="text" name="q" placeholder="Tìm kiếm..." required />
          <button type="submit">
            <img src="https://i.postimg.cc/mgxvN3zN/t-m-ki-m.png" alt="Tìm kiếm" />
          </button>
        </SearchForm>
      </HeaderContainer>
    </Header>
  );
}

export default HeaderGuest;
