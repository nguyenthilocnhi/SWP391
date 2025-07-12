import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserFriends, FaCalendarAlt, FaComments, FaClipboardList, FaCog, FaHeadphones, FaSignOutAlt, FaHome, FaRegCalendarCheck } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";

const ConsultantSidebar = () => {
  const location = useLocation();
  const { pathname } = location;

  // Phân nhóm menu
  const mainLinks = [
    { href: "/consultant/trangchu", icon: <FaHome size={22} />, label: "Tổng quan" },
    { href: "/consultant/lich-hen", icon: <FaRegCalendarCheck size={22} />, label: "Lịch hẹn" },
    { href: "/consultant/lich-lam-viec", icon: <FaCalendarAlt size={22} />, label: "Lịch làm việc" },
    { href: "/consultant/tu-van-truc-tuyen", icon: <FaComments size={22} />, label: "Tư vấn trực tuyến" },
    { href: "/consultant/hoi-dap", icon: <MdHealthAndSafety size={22} />, label: "Hỏi đáp" },
    { href: "/consultant/danh-gia", icon: <FaUserFriends size={22} />, label: "Đánh giá" },
    { href: "/consultant/viet-blog", icon: <FaClipboardList size={22} />, label: "Bài viết" },
    { href: "/consultant/bai-viet-cua-toi", icon: <FaClipboardList size={22} />, label: "Bài viết của tôi" },
  ];
  const supportLinks = [
    { href: "/consultant/cai-dat", icon: <FaCog size={20} />, label: "Cài đặt" },
    { href: "/consultant/ho-tro", icon: <FaHeadphones size={20} />, label: "Hỗ trợ" },
    { href: "/consultant/dang-xuat", icon: <FaSignOutAlt size={20} />, label: "Đăng xuất" },
  ];

  return (
    <>
      <style>{`
.sidebar-modern {
  width: 210px;
  background: linear-gradient(160deg, #bbf7d0 0%, #22c55e 100%);
  padding: 18px 0 12px 0;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.07);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1000;
  border-top-right-radius: 32px;
  border-bottom-right-radius: 32px;
  transition: box-shadow 0.2s;
  overflow: hidden;
}
.sidebar-modern .sidebar-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}
.sidebar-modern .main-menu {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding-bottom: 16px;
}
.sidebar-modern nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.sidebar-modern .nav-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 13px 28px 13px 28px;
  margin: 2px 0;
  font-size: 15px;
  color: #22223b;
  text-decoration: none;
  border-radius: 16px;
  font-weight: 500;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  position: relative;
}
.sidebar-modern .nav-link.active, .sidebar-modern .nav-link:hover {
  background: #fff;
  color: #16a34a;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.10);
}
.sidebar-modern .nav-link.active::before {
  content: '';
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 32px;
  background: #22c55e;
  border-radius: 6px;
}
.sidebar-modern .group-label {
  font-size: 12px;
  color: #16a34a;
  font-weight: 700;
  margin: 18px 0 8px 28px;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.sidebar-modern .bottom-links {
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  background: inherit;
  padding-bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  z-index: 2;
}
      `}</style>
      <aside className="sidebar-modern">
        <div className="sidebar-inner">
          {/* Main menu */}
          <div className="main-menu">
            <div className="group-label">Chức năng</div>
            <nav>
              {mainLinks.map(link => (
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
          {/* Support & account */}
          <div className="bottom-links">
            <div className="group-label">Hỗ trợ & Tài khoản</div>
            {supportLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={pathname.startsWith(link.href) ? "active nav-link" : "nav-link"}
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default ConsultantSidebar; 