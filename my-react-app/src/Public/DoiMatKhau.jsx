import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const style = {
  page: {
    minHeight: "100vh",
    width: "100vw",
    background: "#f0fdf4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    boxSizing: "border-box",
  },
  container: {
    maxWidth: 450,
    width: "100%",
    background: "#fff",
    padding: 30,
    borderRadius: 12,
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    border: "2px solid #a7f3d0",
  },
  h2: {
    textAlign: "center",
    marginBottom: 24,
    color: "#047857",
  },
  label: {
    fontWeight: 600,
    display: "block",
    marginTop: 18,
  },
  input: {
    width: "100%",
    padding: 10,
    marginTop: 6,
    borderRadius: 6,
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  button: {
    marginTop: 20,
    padding: 12,
    width: "100%",
    background: "#22c55e",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    transition: "background 0.3s",
    fontSize: 16,
  },
  buttonHover: {
    background: "#16a34a",
  },
  secondaryBtn: {
    background: "transparent",
    color: "#047857",
    border: "1px dashed #047857",
    marginTop: 10,
    width: "100%",
    padding: 12,
    borderRadius: 6,
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 16,
  },
  secondaryBtnHover: {
    background: "#d1fae5",
  },
  success: {
    textAlign: "center",
    color: "#15803d",
    marginTop: 16,
  },
  error: {
    textAlign: "center",
    color: "#dc2626",
    marginTop: 16,
  },
};

function DoiMatKhau() {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState(""); // "success" | "error"
  const [btnHover, setBtnHover] = useState(false);
  const [btn2Hover, setBtn2Hover] = useState(false);

  useEffect(() => {
    sendOTP();
    // eslint-disable-next-line
  }, []);

  const sendOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(otp);
    alert("Mã OTP mới của bạn là: " + otp); // Thay bằng gửi email thực tế
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("userSettings")) || {};

    if (oldPassword !== user.password) {
      setMessage("Mật khẩu cũ không đúng.");
      setMsgType("error");
      return;
    }
    if (newPassword.length < 6) {
      setMessage("Mật khẩu mới phải từ 6 ký tự.");
      setMsgType("error");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("Xác nhận mật khẩu không khớp.");
      setMsgType("error");
      return;
    }
    if (otp !== generatedOTP) {
      setMessage("Mã OTP không chính xác.");
      setMsgType("error");
      return;
    }

    // Đổi mật khẩu
    localStorage.setItem(
      "userSettings",
      JSON.stringify({ ...user, password: newPassword })
    );
    setMessage("Mật khẩu đã được cập nhật thành công! Đang chuyển hướng...");
    setMsgType("success");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setOtp("");
    setTimeout(() => {
      navigate("/customer/cai-dat");
    }, 2500);
  };

  return (
    <div style={style.page}>
      <div style={style.container}>
        <h2 style={style.h2}>Đổi Mật Khẩu</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="oldPassword" style={style.label}>
            Mật khẩu cũ:
          </label>
          <input
            type="password"
            id="oldPassword"
            style={style.input}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />

          <label htmlFor="newPassword" style={style.label}>
            Mật khẩu mới:
          </label>
          <input
            type="password"
            id="newPassword"
            style={style.input}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <label htmlFor="confirmPassword" style={style.label}>
            Xác nhận mật khẩu mới:
          </label>
          <input
            type="password"
            id="confirmPassword"
            style={style.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <label htmlFor="otp" style={style.label}>
            Mã xác thực OTP (gửi qua email):
          </label>
          <input
            type="text"
            id="otp"
            style={style.input}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button
            type="submit"
            style={{
              ...style.button,
              ...(btnHover ? style.buttonHover : {}),
            }}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
          >
            Xác nhận đổi mật khẩu
          </button>
          <button
            type="button"
            style={{
              ...style.secondaryBtn,
              ...(btn2Hover ? style.secondaryBtnHover : {}),
            }}
            onClick={() => {
              sendOTP();
              setMessage("Mã OTP mới đã được gửi!");
              setMsgType("success");
            }}
            onMouseEnter={() => setBtn2Hover(true)}
            onMouseLeave={() => setBtn2Hover(false)}
          >
            Gửi lại OTP
          </button>
        </form>
        {message && (
          <div style={msgType === "success" ? style.success : style.error}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default DoiMatKhau;