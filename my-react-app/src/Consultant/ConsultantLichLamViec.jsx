import React, { useState } from "react";
import { FaUserFriends, FaCalendarAlt, FaComments, FaCog, FaHeadphones, FaSignOutAlt, FaHome } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";

const timeSlots = [
  "06:00 - 11:00",
  "11:00 - 16:00",
  "16:00 - 21:00"
];
const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];
const weekOptions = [
  "01/07 - 07/07",
  "07/07 - 13/07",
  "14/07 - 20/07"
];

// 0: Không có ca, 1: Có ca làm, 2: Đã đặt bởi khách
const initialMatrix = [
  [0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 0, 1]
];

const statusColor = {
  0: "#d1d5db", // xám
  1: "#34d399", // xanh lá
  2: "#ef4444"  // đỏ
};
const statusText = {
  0: "Không có ca làm",
  1: "Có ca làm",
  2: "Đã đặt bởi khách"
};

const ConsultantLichLamViecBang = () => {
  const [week, setWeek] = useState(weekOptions[1]);
  const [matrix, setMatrix] = useState(initialMatrix);

  // Popup chi tiết ca
  const [popup, setPopup] = useState(null);
  const handleCellClick = (row, col) => {
    setPopup({ row, col, status: matrix[row][col] || 0 });
  };
  const closePopup = () => setPopup(null);

  // Lưu dữ liệu vào localStorage (demo)
  const saveToLocal = () => {
    localStorage.setItem("workScheduleMatrix", JSON.stringify(matrix));
    alert("Đã lưu lịch làm việc!");
  };

  // Tải dữ liệu từ localStorage (demo)
  const loadFromLocal = () => {
    const data = localStorage.getItem("workScheduleMatrix");
    if (data) setMatrix(JSON.parse(data));
  };

  return (
    <>
      <style>{`
        .dashboard { display: flex; min-height: 100vh; background: #f9fafb; }
        .sidebar { width: 180px; background: linear-gradient(160deg, #b2f5ea, #81e6d9); padding: 16px; display: flex; flex-direction: column; box-shadow: 2px 0 6px rgba(0,0,0,0.05); position: fixed; top: 0; left: 0; height: 100vh; z-index: 1000; }
        .sidebar .user-info { text-align: center; margin-bottom: 24px; }
        .sidebar .avatar { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; margin: 0 auto 10px; border: 2px solid #fff; }
        .sidebar .name { font-size: 14px; font-weight: 600; }
        .sidebar nav a, .sidebar .bottom-links a { display: block; padding: 10px 12px; margin: 6px 0; font-size: 14px; color: #1f2937; text-decoration: none; border-radius: 8px; transition: background 0.2s; }
        .sidebar nav a.active, .sidebar nav a:hover { background-color: #ffffff; color: #0f766e; font-weight: 600; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
        .main { flex: 1; margin-left: 180px; padding: 40px 32px; background-color: #ffffff; min-height: 100vh; }
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
        .bottom-links { margin-top: 24px; }
        .lichlamviec-bang-bg {
          background: #ecfdf5;
          border-radius: 18px;
          padding: 24px 40px 18px 40px;
          margin: 0 auto;
          box-shadow: 0 1px 6px rgba(16,185,129,0.04);
          overflow-x: auto;
        }
        .llv-header {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-bottom: 12px;
        }
        .llv-header label {
          font-weight: 500;
          margin-right: 8px;
        }
        .llv-week-select {
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #d1fae5;
          font-size: 1rem;
        }
        .llv-table {
          width: 100%;
          min-width: 800px;               /* Đảm bảo không bị bóp quá nhỏ */
          border-collapse: separate;
          border-spacing: 0 18px;
        }
        .llv-table th {
          background: #a3e635;
          color: #166534;
          font-size: 1.1rem;
          font-weight: 700;
          padding: 16px 0;
          border: none;
        }
        .llv-table td {
          text-align: center;
          padding: 0;
          border: none;
        }
        .llv-slot {
          width: 90px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          border-radius: 22px;
          font-weight: 600;
          color: #166534;
          font-size: 1.08rem;
          background: #d1fae5;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .llv-slot.status-0 {
          background: #d1d5db;
          color: #374151;
        }
        .llv-slot.status-1 {
          background: #34d399;
          color: #fff;
        }
        .llv-slot.status-2 {
          background: #ef4444;
          color: #fff;
        }
        .llv-legend {
          display: flex;
          gap: 32px;
          margin: 24px 0 0 0;
          align-items: center;
        }
        .llv-legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1.05rem;
        }
        .llv-legend-color {
          width: 28px;
          height: 18px;
          border-radius: 6px;
          display: inline-block;
        }
        .llv-actions {
          margin-top: 32px;
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }
        .llv-btn {
          border: none;
          border-radius: 10px;
          padding: 8px 18px;
          font-size: 0.98rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .llv-btn.delete { background: #f87171; color: #fff; }
        .llv-btn.delete:hover { background: #dc2626; }
        .llv-btn.export { background: #38bdf8; color: #fff; }
        .llv-btn.export:hover { background: #0ea5e9; }
        .llv-btn.import { background: #fde047; color: #92400e; }
        .llv-btn.import:hover { background: #facc15; }
        .llv-popup-bg { position: fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.2); display:flex; align-items:center; justify-content:center; z-index:2000; }
        .llv-popup { background:#fff; border-radius:12px; padding:32px 28px; min-width:320px; box-shadow:0 2px 12px rgba(16,185,129,0.12); }
        .llv-popup h3 { margin-top:0; color:#059669; }
        .llv-popup button { margin-top:18px; background:#10b981; color:#fff; border:none; border-radius:8px; padding:8px 20px; font-size:1rem; cursor:pointer; }
        @media (max-width: 900px) {
          .lichlamviec-bang-bg {
            padding: 12px 4px;
            max-width: 100vw;
          }
          .llv-table {
            min-width: 600px;
          }
        }
        .ws-main-card {
          max-width: 1100px;
          margin: 0 auto 32px auto;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 2px 12px rgba(16,185,129,0.08);
          padding: 36px 40px 32px 40px;
        }
        .ws-title {
          font-size: 2rem;
          font-weight: 700;
          color: #059669;
          margin-bottom: 28px;
          text-align: center;
        }
      `}</style>
      <div className="dashboard">
        {/* Sidebar */}
        <aside className="sidebar">
          <div>
            <div className="user-info">
              <img className="avatar" src="https://i.postimg.cc/rFsJ2wWR/tuvanvien.jpg" alt="Consultant" />
              <div className="name">Nguyễn Văn A</div>
            </div>
            <nav>
              <a href="/consultant/trangchu"><FaHome /> Tổng quan</a>
              <a href="#"><FaUserFriends /> Quản lý khách hàng</a>
              <a href="#"><FaCalendarAlt /> Lịch hẹn</a>
              <a href="#" className="active"><FaCalendarAlt /> Lịch làm việc</a>
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
          {/* Lịch làm việc */}
          <div className="ws-main-card">
            <div className="ws-title">Lịch làm việc</div>
            <div className="lichlamviec-bang-bg">
              <div className="llv-header">
                <label>Tuần:</label>
                <select className="llv-week-select" value={week} onChange={e => setWeek(e.target.value)}>
                  {weekOptions.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
              <table className="llv-table">
                <thead>
                  <tr>
                    <th>THỜI GIAN</th>
                    {days.map(day => <th key={day}>{day}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((slot, rowIdx) => (
                    <tr key={slot}>
                      <th style={{ background: "#d9f99d", color: "#166534", fontWeight: 600 }}>{slot}</th>
                      {days.map((day, colIdx) => (
                        <td key={day}>
                          <div
                            className={`llv-slot status-${matrix[rowIdx][colIdx] || 0}`}
                            title={statusText[matrix[rowIdx][colIdx] || 0]}
                            onClick={() => handleCellClick(rowIdx, colIdx)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="llv-legend">
                <div className="llv-legend-item">
                  <span className="llv-legend-color" style={{ background: "#34d399" }}></span> Có ca làm
                </div>
                <div className="llv-legend-item">
                  <span className="llv-legend-color" style={{ background: "#d1d5db" }}></span> Không có ca làm
                </div>
                <div className="llv-legend-item">
                  <span className="llv-legend-color" style={{ background: "#ef4444" }}></span> Đã đặt bởi khách
                </div>
              </div>
              <div className="llv-actions">
                <button className="llv-btn delete" onClick={() => setMatrix(initialMatrix)}>🗑 Xóa tất cả</button>
                <button className="llv-btn export" onClick={saveToLocal}>📥 Xuất lịch</button>
                <button className="llv-btn import" onClick={loadFromLocal}>📤 Nhập lịch</button>
              </div>
            </div>
          </div>
          {/* Popup chi tiết ca */}
          {popup && (
            <div className="llv-popup-bg" onClick={closePopup}>
              <div className="llv-popup" onClick={e => e.stopPropagation()}>
                <h3>Chi tiết ca làm</h3>
                <div><b>Khung giờ:</b> {timeSlots[popup.row]}</div>
                <div><b>Ngày:</b> {days[popup.col]}</div>
                <div><b>Trạng thái:</b> {statusText[popup.status]}</div>
                <button onClick={closePopup}>Đóng</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default ConsultantLichLamViecBang;
