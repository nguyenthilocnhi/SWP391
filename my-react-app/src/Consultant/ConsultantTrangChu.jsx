import React, { useState } from "react";
import { FaUserFriends, FaCalendarAlt, FaComments, FaClipboardList, FaCog, FaHeadphones, FaSignOutAlt, FaHome, FaRegCalendarCheck } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";

const ConsultantTrangChu = () => {
  const [consultantName] = useState("Nguyễn Văn A");
  const [appointmentCount] = useState(12);
  const [questionCount] = useState(3);
  const [ratingScore] = useState(4.7);

  return (
    <>
      <style>{`
html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  background-color: #f9fafb;
  color: #1f2937;
}
body {
  min-height: 100vh;
  min-width: 100vw;
  box-sizing: border-box;
}
#root {
  height: 100%;
}
.dashboard {
  display: flex;
  min-height: 100vh;
  min-width: 100vw;
  width: 100vw;
  background-color: #f9fafb;
}
.sidebar {
  width: 180px;
  background: linear-gradient(160deg, #b2f5ea, #81e6d9);
  padding: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1000;
}
.sidebar .user-info {
  text-align: center;
  margin-bottom: 24px;
}
.sidebar .avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 10px;
  border: 2px solid #fff;
}
.sidebar .name {
  font-size: 14px;
  font-weight: 600;
}
.sidebar nav a,
.sidebar .bottom-links a {
  display: block;
  padding: 10px 12px;
  margin: 6px 0;
  font-size: 14px;
  color: #1f2937;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.2s;
}
.sidebar nav a.active,
.sidebar nav a:hover {
  background-color: #ffffff;
  color: #0f766e;
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}
.main {
  flex: 1;
  margin-left: 180px;
  padding: 40px 32px;
  background-color: #ffffff;
  overflow-x: hidden;
  min-height: 100vh;
}
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
.welcome {
  text-align: center;
  padding: 24px 16px;
  background-color: #ecfdf5;
  border: 1px solid #d1fae5;
  border-radius: 12px;
  margin-bottom: 32px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  max-width: 100%;
}
.welcome h2 {
  font-size: 20px;
  color: #065f46;
  margin-bottom: 16px;
  font-weight: 600;
}
.profile {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.circle-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #10b981;
  object-fit: cover;
}
.highlight {
  color: #047857;
  font-weight: 700;
  font-size: 18px;
}
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 100vw;
}
.card {
  background-color: #f0fdf4;
  border: 1px solid #d1fae5;
  border-left: 4px solid #34d399;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.04);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  min-width: 0;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 14px rgba(0,0,0,0.08);
}
.card p {
  font-size: 14px;
  color: #4b5563;
  margin: 0;
}
.card h2 {
  font-size: 30px;
  color: #065f46;
  margin: 8px 0 4px;
  font-weight: 700;
}
.card a {
  display: inline-block;
  margin-top: 6px;
  font-size: 14px;
  color: #059669;
  text-decoration: none;
  font-weight: 500;
}
.card a:hover {
  text-decoration: underline;
}
.bottom-links {
  margin-top: 24px; /* hoặc 16px tuỳ ý */
}
      `}</style>
      <div className="dashboard">
        {/* Sidebar */}
        <aside className="sidebar">
          <div>
            <div className="user-info">
              <img className="avatar" src="https://i.postimg.cc/rFsJ2wWR/tuvanvien.jpg" alt="Consultant" />
              <div className="name">{consultantName}</div>
            </div>
            <nav>
              <a href="#" className="active"><FaHome /> Tổng quan</a>
              <a href="#"><FaUserFriends /> Quản lý khách hàng</a>
              <a href="#"><FaRegCalendarCheck /> Lịch hẹn</a>
              <a href="/consultant/lich-lam-viec"><FaCalendarAlt /> Lịch làm việc</a>
              <a href="#"><FaComments /> Tư vấn trực tuyến</a>
              <a href="#"><MdHealthAndSafety /> Bài viết sức khỏe</a>
            </nav>
          </div>
          <div className="bottom-links">
            <a href="#"><FaCog /> Cài đặt</a>
            <a href="#"><FaHeadphones /> Hỗ trợ</a>
            <a href="#"><FaSignOutAlt /> Đăng xuất</a>
          </div>
        </aside>

        {/* Main content */}
        <main className="main">
          {/* Topbar */}
          <div className="topbar">
            <img className="logo" src="https://i.postimg.cc/g2C1ys2D/nh-ch-p-m-n-h-nh-2025-06-29-000958.png" alt="Logo" />
            <input className="search" placeholder="Tìm kiếm khách hàng, bài viết..." />
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ position: "relative", fontSize: "1.6rem", color: "#10b981", cursor: "pointer" }}>
                <IoMdNotifications />
                <span style={{
                  position: "absolute", top: -6, right: -8, background: "#ef4444", color: "#fff",
                  fontSize: "0.8rem", borderRadius: "50%", padding: "2px 6px", fontWeight: 700
                }}>3</span>
              </div>
            </div>
          </div>

          {/* Welcome section */}
          <section className="welcome">
            <h2>Xin chào, <span className="highlight">{consultantName}</span>!</h2>
            <div className="profile">
              <img className="circle-avatar" src="https://i.postimg.cc/rFsJ2wWR/tuvanvien.jpg" alt="Consultant" />
              <div>
                <div>Chào mừng bạn đến với trang quản lý tư vấn viên.</div>
                <div>Hãy kiểm tra các thông tin và cập nhật hoạt động của bạn.</div>
              </div>
            </div>
          </section>

          {/* Stat cards */}
          <section className="stats">
            <div className="card">
              <p>Lịch hẹn trong tháng</p>
              <h2>{appointmentCount}</h2>
              <a href="#">Xem chi tiết</a>
            </div>
            <div className="card">
              <p>Câu hỏi mới</p>
              <h2>{questionCount}</h2>
              <a href="#">Xem chi tiết</a>
            </div>
            <div className="card">
              <p>Điểm đánh giá</p>
              <h2>{ratingScore}</h2>
              <a href="#">Xem chi tiết</a>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default ConsultantTrangChu;