import React from "react";
import { IoMdNotifications } from "react-icons/io";

const ConsultantTopbar = ({ notificationCount }) => (
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
    `}</style>
    <img className="logo" src="https://i.postimg.cc/g2C1ys2D/nh-ch-p-m-n-h-nh-2025-06-29-000958.png" alt="Logo" />
    <input className="search" placeholder="Tìm kiếm khách hàng, bài viết..." />
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      <div style={{ position: "relative", fontSize: "1.6rem", color: "#10b981", cursor: "pointer" }}>
        <IoMdNotifications />
        <span style={{
          position: "absolute", top: -6, right: -8, background: "#ef4444", color: "#fff",
          fontSize: "0.8rem", borderRadius: "50%", padding: "2px 6px", fontWeight: 700
        }}>{notificationCount}</span>
      </div>
    </div>
  </div>
);

export default ConsultantTopbar; 