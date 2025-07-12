import React from "react";
import { IoMdNotifications } from "react-icons/io";

const ConsultantTopbar = ({ notificationCount, consultantName }) => (
  <div className="topbar">
    <style>{`
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 32px;
  position: sticky;
  top: 0;
  z-index: 101;
}
.topbar .logo {
  height: 60px;
}
.search {
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  width: 260px;
  background-color: #f9fafb;
}
.topbar .userbox {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 18px;
}
.topbar .avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #10b981;
  background: #fff;
  box-shadow: 0 1px 6px rgba(0,0,0,0.08);
}
.topbar .username {
  font-size: 15px;
  font-weight: 700;
  color: #1976d2;
  white-space: nowrap;
}
    `}</style>
    <img className="logo" src="https://i.postimg.cc/g2C1ys2D/nh-ch-p-m-n-hh-2025-06-29-000958.png" alt="Logo" />
    <input className="search" placeholder="Tìm kiếm khách hàng, bài viết..." />
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      <div style={{ position: "relative", fontSize: "1.6rem", color: "#10b981", cursor: "pointer" }}>
        <IoMdNotifications />
        <span style={{
          position: "absolute", top: -6, right: -8, background: "#ef4444", color: "#fff",
          fontSize: "0.8rem", borderRadius: "50%", padding: "2px 6px", fontWeight: 700
        }}>{notificationCount}</span>
      </div>
      <div className="userbox">
        <img className="avatar" src="https://i.postimg.cc/rFsJ2wWR/tuvanvien.jpg" alt="Consultant" />
        <span className="username">{consultantName}</span>
      </div>
    </div>
  </div>
);

export default ConsultantTopbar; 