import React from "react";
import { FaUserFriends, FaCalendarAlt, FaComments, FaClipboardList, FaCog, FaHeadphones, FaSignOutAlt, FaHome, FaRegCalendarCheck } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";

const ConsultantSidebar = ({ consultantName }) => (
  <>
    <style>{`
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
.bottom-links {
  margin-top: 24px;
}
    `}</style>
    <aside className="sidebar">
      <div>
        <div className="user-info">
          <img className="avatar" src="https://i.postimg.cc/rFsJ2wWR/tuvanvien.jpg" alt="Consultant" />
          <div className="name">{consultantName}</div>
        </div>
        <nav>
          <a href="/consultant/trangchu" className="active"><FaHome /> Tổng quan</a>
          <a href="/consultant/lich-hen"><FaRegCalendarCheck /> Lịch hẹn</a>
          <a href="/consultant/lich-lam-viec"><FaCalendarAlt /> Lịch làm việc</a> 
          <a href="/consultant/tu-van-truc-tuyen"><FaComments /> Tư vấn trực tuyến</a>
          <a href="/consultant/hoi-dap"><MdHealthAndSafety /> Hỏi đáp</a>
          <a href="/consultant/danh-gia"><FaUserFriends /> Đánh giá</a>
        </nav>
      </div>
      <div className="bottom-links">
        <a href="/consultant/cai-dat"><FaCog /> Cài đặt</a>
        <a href="/consultant/ho-tro"><FaHeadphones /> Hỗ trợ</a>
        <a href="/consultant/dang-xuat"><FaSignOutAlt /> Đăng xuất</a>
      </div>
    </aside>
  </>
);

export default ConsultantSidebar; 