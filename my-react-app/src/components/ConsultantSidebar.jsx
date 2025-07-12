import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserFriends, FaCalendarAlt, FaComments, FaClipboardList, FaCog, FaHeadphones, FaSignOutAlt, FaHome, FaRegCalendarCheck } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";

const ConsultantSidebar = ({ consultantName }) => {
  const location = useLocation();
  const { pathname } = location;

  const navLinks = [
    { href: "/consultant/trangchu", icon: <FaHome />, label: "Tổng quan" },
    { href: "/consultant/lich-hen", icon: <FaRegCalendarCheck />, label: "Lịch hẹn" },
    { href: "/consultant/lich-lam-viec", icon: <FaCalendarAlt />, label: "Lịch làm việc" },
    { href: "/consultant/tu-van-truc-tuyen", icon: <FaComments />, label: "Tư vấn trực tuyến" },
    { href: "/consultant/hoi-dap", icon: <MdHealthAndSafety />, label: "Hỏi đáp" },
    { href: "/consultant/danh-gia", icon: <FaUserFriends />, label: "Đánh giá" },
    { href: "/consultant/viet-blog", icon: <FaClipboardList />, label: "Viết Blog" },
  ];

  return (
    <>
      <style>{`
.sidebar {
  width: 180px;
  background: linear-gradient(160deg, #b2f5ea, #81e6d9);
  padding: 4px 8px 4px 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1000;
  justify-content: flex-start;
}
.sidebar .user-info {
  text-align: center;
  margin-bottom: 6px;
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
.sidebar nav .nav-link,
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
.sidebar nav .nav-link.active,
.sidebar nav a:hover,
.sidebar nav .nav-link:hover {
  background-color: #ffffff;
  color: #0f766e;
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}
.bottom-links {
  margin-top: 8px;
}
      `}</style>
      <aside className="sidebar">
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
          <div>
            <div className="user-info">
              <img className="avatar" src="https://i.postimg.cc/rFsJ2wWR/tuvanvien.jpg" alt="Consultant" />
              <div className="name">{consultantName}</div>
            </div>
          </div>
          <div style={{flex: 1, minHeight: 0}}>
            <nav>
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={pathname.startsWith(link.href) ? "active nav-link" : "nav-link"}
                >
                  {link.icon} {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="bottom-links" style={{
            marginTop: 0,
            marginBottom: 0,
            paddingBottom: 8,
            background: "inherit",
            position: "sticky",
            bottom: 0
          }}>
            <Link to="/consultant/cai-dat" className={pathname.startsWith("/consultant/cai-dat") ? "active" : ""}><FaCog /> Cài đặt</Link>
            <Link to="/consultant/ho-tro" className={pathname.startsWith("/consultant/ho-tro") ? "active" : ""}><FaHeadphones /> Hỗ trợ</Link>
            <Link to="/consultant/dang-xuat"><FaSignOutAlt /> Đăng xuất</Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ConsultantSidebar; 