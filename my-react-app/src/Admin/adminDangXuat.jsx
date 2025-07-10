import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const CenterWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f6fefb;
  overflow: auto;
`;
const Card = styled.div`
  max-width: 600px;
  min-height: 60vh;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  padding: 40px 28px 32px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;
const Title = styled.h2`
  text-align: center;
  color: #059669;
  margin-bottom: 18px;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
`;
const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #4ade80;
  margin-bottom: 14px;
  box-shadow: 0 2px 12px rgba(76,220,128,0.15);
  background: #f3f4f6;
`;
const SuccessIcon = styled.div`
  position: relative;
  display: inline-block;
  margin-top: -24px;
  margin-bottom: 8px;
  svg {
    position: absolute;
    bottom: -12px;
    left: 15px;
    background-color: white;
    border-radius: 50%;
    border: 2px solid #e5e7eb;
    padding: 4px;
    width: 24px;
    height: 24px;
  }
`;
const InfoBox = styled.div`
  background-color: #f0f7ff;
  color: #374151;
  padding: 8px 20px;
  border-radius: 12px;
  font-size: 15px;
  margin-bottom: 24px;
  margin-top: 18px;
  strong { color: #111827; }
  span { color: #2563eb; }
`;
const LoginBtn = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 14px 28px;
  background: linear-gradient(90deg, #059669 60%, #4ade80 100%);
  color: #fff;
  font-weight: 700;
  font-size: 17px;
  border: none;
  border-radius: 10px;
  width: 90%;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(76,220,128,0.10);
  transition: background 0.2s, box-shadow 0.2s;
  margin-bottom: 12px;
  margin-top: 10px;
  &:hover { background: #059669; box-shadow: 0 4px 16px rgba(76,220,128,0.13); }
  svg { margin-right: 8px; }
`;
const FooterLinks = styled.div`
  margin-top: 20px;
  font-size: 15px;
  color: #4b5563;
  a {
    color: #2563eb;
    text-decoration: none;
    margin: 0 6px;
    &:hover { text-decoration: underline; }
  }
  span { color: #d1d5db; }
`;

const defaultAvatar = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a66d16bd-5c13-4822-b69f-18a8346d9bd3.png';
const LOCAL_KEY = 'admin_profile';

const AdminDangXuat = () => {
  const [logoutTime, setLogoutTime] = useState('');
  const [avatar, setAvatar] = useState(defaultAvatar);

  useEffect(() => {
    // Lấy avatar trước khi clear localStorage
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAvatar(parsed.avatar || defaultAvatar);
      } catch {
        setAvatar(defaultAvatar);
      }
    } else {
      setAvatar(defaultAvatar);
    }
    localStorage.clear();
    sessionStorage.clear();
    const now = new Date();
    const options = {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: true
    };
    setLogoutTime(now.toLocaleDateString('vi-VN', options));
  }, []);

  return (
    <CenterWrapper>
      <Card>
        <Avatar src={avatar} alt="Tạm biệt" />
        <SuccessIcon>
          <svg width="20" height="20" fill="none" stroke="green" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </SuccessIcon>
        <Title>Đăng xuất thành công</Title>
        <p style={{ fontSize: 16, color: '#4b5563', marginBottom: 0, textAlign: 'center' }}>
          Bạn đã đăng xuất khỏi hệ thống an toàn. Vui lòng đóng trình duyệt nếu đang sử dụng máy tính công cộng.
        </p>
        <InfoBox>
          <p style={{ margin: 0 }}><strong>Thời gian:</strong> <span>{logoutTime}</span></p>
        </InfoBox>
        <LoginBtn href="/login">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clipRule="evenodd" />
          </svg>
          Đăng nhập lại
        </LoginBtn>
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <a href="/admin/trangchu" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500, fontSize: 16 }}>
            Quay về trang chủ
          </a>
        </div>
      </Card>
    </CenterWrapper>
  );
};

export default AdminDangXuat;