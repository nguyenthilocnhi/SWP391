import React, { useState } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  width: 100vw; /* Thêm dòng này */
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa; /* Nên thêm màu nền nhẹ cho đẹp */
`;

const Card = styled.div`
  background-color: #ffffff;
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  text-align: center;
  max-width: 420px;
  width: 100%;
  transition: all 0.3s ease;
`;

const Logo = styled.div`
  img {
    width: 100px;
    margin-bottom: 16px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const Title = styled.h2`
  font-size: 24px;
  color: #222;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  padding: 14px 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #4caf50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
    outline: none;
  }
`;

const Button = styled.button`
  padding: 14px;
  background-color: #4caf50;
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #43a047;
  }
`;

const Resend = styled.div`
  font-size: 14px;
  color: #007bff;
  text-align: right;
  cursor: pointer;
  text-decoration: underline;
  margin-top: -8px;
`;

const Message = styled.p`
  margin-top: 16px;
  font-size: 14px;
  color: #e53935;
`;

function XacThucOTP() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api-gender2.purintech.id.vn/api/Auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({ email, otp }),
      });

      const result = await response.json();
      if (result.code === 200) {
        setMessage(result.message || "✅ Xác thực OTP thành công!");
        // TODO: điều hướng sang trang khác nếu cần
      } else {
        setMessage(result.message || "❌ Xác thực OTP thất bại!");
      }
    } catch (error) {
      setMessage("⚠️ Có lỗi xảy ra khi xác thực OTP!");
    }
  };

  return (
    <Wrapper>
      <Card>
        <Logo>
        <Link to="/">
            <img src="https://i.postimg.cc/mZjYJ7wm/logo.jpg" alt="Logo An Giới" />
          </Link>
        </Logo>
        <Title>Xác thực OTP</Title>
        <Subtitle>Nhập mã xác thực được gửi đến email của bạn</Subtitle>

        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Nhập mã OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <Resend>Gửi lại mã?</Resend>
          <Button type="submit">Xác thực</Button>
        </Form>

        {message && <Message>{message}</Message>}
      </Card>
    </Wrapper>
  );
}

export default XacThucOTP;
