import React, { useState } from "react";
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const QuenMatKhau = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Mật khẩu và xác nhận không khớp.");
      setLoading(false);
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://api-gender2.purintech.id.vn/api/Auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          newPassword: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Navigate to success page after a short delay
        setTimeout(() => {
          navigate('/dat-lai-mat-khau-thanh-cong');
        }, 2000);
      } else {
        setError(data.message || 'Có lỗi xảy ra khi đặt lại mật khẩu.');
      }
    } catch (error) {
      setError('Không thể kết nối đến máy chủ. Vui lòng thử lại.');
    } finally {
      setLoading(false);
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

        button:hover:not(:disabled) {
          background-color: #388e3c;
        }

        button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .error-message {
          color: #d32f2f;
          background-color: #ffebee;
          padding: 0.75rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          text-align: center;
        }

        .success-message {
          color: #2e7d32;
          background-color: #e8f5e9;
          padding: 0.75rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          text-align: center;
        }

        .loading {
          opacity: 0.7;
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
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Đặt lại mật khẩu thành công! Đang chuyển hướng...</div>}
          
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || success}
            />
            <input
              type="password"
              id="password"
              placeholder="Mật khẩu mới"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading || success}
            />
            <input
              type="password"
              id="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading || success}
            />
            <button type="submit" disabled={loading || success}>
              {loading ? 'Đang xử lý...' : 'Đặt lại'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default QuenMatKhau;
