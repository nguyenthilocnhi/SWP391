import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  width: 100vw;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  margin: 0;
  margin-top: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    border-radius: 0;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  background-color: #d0f0dc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;

  .logo {
    width: 200px;
    margin-bottom: 40px;
  }

  .illustration {
    width: 150%;
    max-width: 340px;
  }
`;

const RightSection = styled.div`
  flex: 1;
  padding: 32px;

  h1 {
    font-size: 24px;
    color: #2e7d32;
    text-align: center;
    margin-bottom: 24px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .form-group.name-row {
    display: flex;
    gap: 10px;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  input {
    padding: 10px 14px;
    font-size: 15px;
    border: 1.4px solid #c5e1c5;
    border-radius: 8px;
    background-color: #fdfdfd;
    transition: all 0.2s ease-in-out;
  }

  input:focus {
    border-color: #81c784;
    background-color: #f1f8e9;
    outline: none;
  }

  button {
    background-color: #4caf50;
    color: white;
    padding: 12px;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s ease;
  }

  button:hover {
    background-color: #388e3c;
  }

  p {
    text-align: center;
    margin-top: 16px;
    font-size: 14px;

    a {
      color: #2e7d32;
      text-decoration: none;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const DangKy = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      fullName,
      dateOfBirth,
      email,
      password,
      confirmPassword,
      address,
      phoneNumber,
    };
    try {
      const response = await fetch('https://api-gender2.purintech.id.vn/api/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*'
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.code === 200) {
        alert(result.message || 'Đăng ký thành công! Vui lòng kiểm tra email để xác thực.');
        navigate('/verify-otp', { state: { email } });
      } else {
        alert(result.message || 'Đăng ký thất bại!');
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi đăng ký!');
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <LeftSection>
          <Link to="/">
            <img className="logo" src="https://i.postimg.cc/X7T9qyhn/logo.png" alt="Logo An Giới" />
          </Link>
          <img className="illustration" src="https://i.postimg.cc/t4WWx4QW/h-nh.png" alt="Minh họa bác sĩ" />
        </LeftSection>
        <RightSection>
          <h1>Đăng ký tài khoản</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" name="fullName" placeholder="Họ và tên" required value={fullName} onChange={e => setFullName(e.target.value)} />
            <input type="date" name="dateOfBirth" placeholder="Ngày sinh" required value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} />
            <input type="text" name="phone" placeholder="Số điện thoại" required value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
            <input type="email" name="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
            <input type="text" name="address" placeholder="Địa chỉ" required value={address} onChange={e => setAddress(e.target.value)} />
            <input type="password" name="password" placeholder="Mật khẩu" required value={password} onChange={e => setPassword(e.target.value)} />
            <input type="password" name="confirm_password" placeholder="Xác nhận mật khẩu" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <button type="submit">ĐĂNG KÝ</button>
          </form>
          <p>
            Đã có tài khoản?{' '}
            <Link to="/login">Đăng nhập</Link>
          </p>
        </RightSection>
      </Container>
    </>
  );
};

export default DangKy;
