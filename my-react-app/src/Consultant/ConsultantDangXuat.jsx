import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ConsultantLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("consultantToken");
    localStorage.removeItem("consultantInfo");
    const timer = setTimeout(() => {
      navigate("/login");
    }, 1800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0fdf4",
        fontFamily: "Inter, sans-serif",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "48px 32px",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(16,185,129,0.10)",
          textAlign: "center",
          minWidth: 320
        }}
      >
        <h2 style={{ color: "#059669", marginBottom: 16 }}>Đăng xuất thành công!</h2>
        <p>Bạn sẽ được chuyển về trang đăng nhập trong giây lát...</p>
      </div>
    </div>
  );
};

export default ConsultantLogout;
