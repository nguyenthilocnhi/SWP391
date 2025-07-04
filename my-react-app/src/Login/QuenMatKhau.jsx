import React, { useState } from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const QuenMatKhau = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Mật khẩu và xác nhận không khớp.");
    } else {
      window.location.href = "thanhcong.html";
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(to right, #e8f5e9, #ffffff);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .reset-container {
          background-color: #fff;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 420px;
        }

        .logo {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .logo a {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: #2e7d32;
        }

        .logo img {
          width: 48px;
          height: 48px;
          margin-right: 0.5rem;
        }

        .logo h1 {
          font-size: 24px;
          font-weight: 600;
        }

        h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #2e7d32;
        }

        form input {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 1rem;
          border: 1px solid #a5d6a7;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s ease;
        }

        form input:focus {
          border-color: #66bb6a;
        }

        button {
          width: 100%;
          padding: 0.75rem;
          background-color: #43a047;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #388e3c;
        }
      `}</style>

      <div className="reset-container">
        <div className="form-box">
          <div className="logo">
            <Link to="/">
              <img src="https://i.postimg.cc/mZjYJ7wm/logo.jpg" alt="Logo An Giới" />
              <h1>An Giới</h1>
            </Link>
          </div>

          <h2>Đặt lại mật khẩu</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="password"
              placeholder="Mật khẩu mới"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              id="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit">Đặt lại</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default QuenMatKhau;
