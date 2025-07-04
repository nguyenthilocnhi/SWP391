import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DangNhap = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (trimmedEmail && trimmedPassword) {
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", trimmedEmail);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      try {
        const response = await fetch('https://api-gender2.purintech.id.vn/api/Auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'accept': '*/*'
          },
          body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword })
        });
        const data = await response.json();
        if (data.code === 200) {
          setMessage('Đăng nhập thành công!');
          localStorage.setItem('token', data.obj);
          localStorage.setItem('role', 'customer');
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("sessionExpire", Date.now() + 15 * 60 * 1000); // 15 phút
          window.location.href = "/customer";
        } else {
          setMessage(data.message || 'Đăng nhập thất bại!');
        }
      } catch (error) {
        setMessage('Lỗi kết nối server!');
      }
    } else {
      setMessage("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  return (
    <>
      <style>
        {`
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

        .login-container {
          width: 100%;
          max-width: 420px;
          padding: 2rem;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .logo {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .logo img {
          width: 80px;
          height: auto;
          margin-bottom: 0.5rem;
        }

        .logo h2 {
          font-size: 20px;
          font-weight: 600;
          color: #2e7d32;
        }

        .login-form label {
          display: block;
          margin-top: 1rem;
          margin-bottom: 0.25rem;
          font-weight: 500;
          color: #333;
        }

        .login-form input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .login-form input:focus {
          border-color: #66bb6a;
        }

        .forgot-password {
          text-align: right;
          margin-top: 0.5rem;
          margin-bottom: 1.2rem;
        }

        .forgot-password a {
          font-size: 0.9rem;
          color: #388e3c;
          text-decoration: none;
        }

        .forgot-password a:hover {
          text-decoration: underline;
        }

        button[type="submit"] {
          width: 100%;
          padding: 0.75rem;
          background-color: #43a047;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button[type="submit"]:hover {
          background-color: #388e3c;
        }

        .signup-link {
          text-align: center;
          margin-top: 1.5rem;
          font-size: 0.95rem;
        }

        .signup-link a {
          color: #2e7d32;
          text-decoration: none;
          font-weight: 600;
        }

        .signup-link a:hover {
          text-decoration: underline;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          color: #555;
          cursor: pointer;
          user-select: none;
          transition: color 0.2s ease;
        }

        .remember-me:hover {
          color: #2e7d32;
        }

        .remember-me input[type="checkbox"] {
          appearance: none;
          width: 18px;
          height: 18px;
          border: 2px solid #ddd;
          border-radius: 4px;
          background-color: white;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .remember-me input[type="checkbox"]:hover {
          border-color: #66bb6a;
          box-shadow: 0 0 0 2px rgba(102, 187, 106, 0.1);
        }

        .remember-me input[type="checkbox"]:checked {
          background-color: #43a047;
          border-color: #43a047;
          box-shadow: 0 0 0 2px rgba(67, 160, 71, 0.2);
          animation: checkboxPop 0.2s ease;
        }

        .remember-me input[type="checkbox"]:checked::after {
          content: "✓";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
          line-height: 1;
        }

        .remember-me input[type="checkbox"]:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(67, 160, 71, 0.3);
        }

        @keyframes checkboxPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        `}
      </style>

      <div className="login-container">
        <div className="login-box">
          <div className="logo">
            <Link to="/">
              <img src="https://i.postimg.cc/mZjYJ7wm/logo.jpg" alt="Logo An Giới" />
            </Link>
            <h2>Chào mừng bạn đến với An Giới</h2>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="forgot-password">
              <Link to="/forgot-password">Quên mật khẩu?</Link>
            </div>

            <button type="submit">Đăng nhập</button>

            <p className="signup-link">
              Chưa có tài khoản?{" "}
              <Link to="/register">Đăng ký ngay</Link>
            </p>
          </form>

          <label className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Ghi nhớ đăng nhập
          </label>

          {message && <p>{message}</p>}
        </div>
      </div>
    </>
  );
};

export default DangNhap;
