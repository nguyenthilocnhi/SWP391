import React, { useState, useEffect } from "react";
import ConsultantSidebar from "../components/ConsultantSidebar";
import ConsultantTopbar from "../components/ConsultantTopbar";
import { FaCheckCircle, FaRegCircle, FaUserClock } from "react-icons/fa";
const timeSlots = [
  "06:00 - 11:00",
  "11:00 - 16:00",
  "16:00 - 21:00"
];
const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];
const weekOptions = [
  "01/07 - 07/07",
  "08/07 - 14/07",
  "15/07 - 21/07",
  "22/07 - 28/07"
];

// 0: Không có ca, 1: Có ca làm, 2: Đã đặt bởi khách
const initialMatrix = [
  [0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 0, 1]
];

const statusText = {
  0: "Không có ca làm",
  1: "Có ca làm",
  2: "Đã đặt bởi khách"
};
const statusIcon = {
  0: <FaRegCircle />, // rảnh
  1: <FaCheckCircle />, // có ca
  2: <FaUserClock /> // đã đặt
};

function isToday(colIdx) {
  const today = new Date().getDay(); // 0: CN, 1: Thứ 2, ...
  return (colIdx === 6 && today === 0) || colIdx === today - 1;
}

function countWorkShifts(matrix, colIdx) {
  return matrix.reduce((sum, row) => sum + (row[colIdx] === 1 ? 1 : 0), 0);
}

const getMatrixKey = (week) => `workScheduleMatrix_${week}`;

const ConsultantLichLamViecNew = () => {
  const [week, setWeek] = useState(weekOptions[0]);
  const [matrix, setMatrix] = useState(initialMatrix);
  const [popup, setPopup] = useState(null);
  const consultantName = "Nguyễn Thị Huyền";
  const notificationCount = 3;

  // Load matrix theo tuần khi đổi tuần
  useEffect(() => {
    const data = localStorage.getItem(getMatrixKey(week));
    if (data) {
      setMatrix(JSON.parse(data));
    } else {
      setMatrix(initialMatrix);
    }
  }, [week]);

  // Popup chỉnh sửa trạng thái ca
  const openEditPopup = (row, col) => setPopup({ row, col, status: matrix[row][col] || 0 });
  const closePopup = () => setPopup(null);
  const updateStatus = (newStatus) => {
    const newMatrix = matrix.map((r, i) =>
      i === popup.row ? r.map((c, j) => (j === popup.col ? newStatus : c)) : r
    );
    setMatrix(newMatrix);
    // Lưu luôn khi chỉnh sửa
    localStorage.setItem(getMatrixKey(week), JSON.stringify(newMatrix));
    closePopup();
  };

  // Lưu dữ liệu bảng hiện tại vào localStorage theo tuần
  const saveToLocal = () => {
    localStorage.setItem(getMatrixKey(week), JSON.stringify(matrix));
    alert("Đã lưu lịch làm việc cho tuần này!");
  };
  // Tải lại dữ liệu từ localStorage theo tuần
  const loadFromLocal = () => {
    const data = localStorage.getItem(getMatrixKey(week));
    if (data) setMatrix(JSON.parse(data));
    else setMatrix(initialMatrix);
  };

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
.main {
  flex: 1;
  margin-left: 180px;
  padding: 40px 32px;
  background-color: #ffffff;
  overflow-x: hidden;
  min-height: 100vh;
}
        .ws-main-card { width: 90%; margin: 0 auto 32px auto; background: #ecfdf5; border-radius: 18px; box-shadow: 0 2px 12px rgba(16,185,129,0.08); padding: 36px 40px 32px 40px; display: flex; flex-direction: column; align-items: center; }
        .ws-title { font-size: 2rem; font-weight: 700; color: #059669; margin-bottom: 28px; text-align: center; }
        .work-schedule-table { border-collapse: separate; border-spacing: 0 10px; width: 100%; background: #ecfdf5; border-radius: 12px; overflow: hidden; margin-bottom: 24px; }
        .work-schedule-table th, .work-schedule-table td { text-align: center; padding: 16px 8px; font-size: 1.1rem; }
        .work-schedule-table th.today { background: #fef08a; color: #b45309; }
        .time-col { font-weight: 600; background: #d1fae5; position: sticky; left: 0; z-index: 2; }
        .slot { border-radius: 8px; cursor: pointer; transition: box-shadow 0.2s; min-width: 40px; min-height: 36px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
        .status-0 { background: #e5e7eb; color: #6b7280; }
        .status-1 { background: #34d399; color: #fff; }
        .status-2 { background: #ef4444; color: #fff; }
        .slot:hover { box-shadow: 0 2px 8px rgba(16,185,129,0.12); }
        .llv-header { display: flex; justify-content: flex-end; align-items: center; margin-bottom: 18px; width: 100%; }
        .llv-header label { font-weight: 500; margin-right: 8px; }
        .llv-week-select { padding: 8px 12px; border-radius: 8px; border: 1px solid #d1fae5; font-size: 1rem; }
        .llv-legend { display: flex; gap: 32px; margin: 24px 0 0 0; align-items: center; }
        .llv-legend-item { display: flex; align-items: center; gap: 8px; font-size: 1.05rem; }
        .llv-legend-color { width: 28px; height: 18px; border-radius: 6px; display: inline-block; }
        .llv-actions { margin-top: 32px; display: flex; gap: 12px; justify-content: flex-end; width: 100%; }
        .llv-btn { border: none; border-radius: 10px; padding: 8px 18px; font-size: 0.98rem; font-weight: 600; cursor: pointer; transition: background 0.2s; display: flex; align-items: center; gap: 6px; }
        .llv-btn.delete { background: #f87171; color: #fff; }
        .llv-btn.delete:hover { background: #dc2626; }
        .llv-btn.export { background: #38bdf8; color: #fff; }
        .llv-btn.export:hover { background: #0ea5e9; }
        .llv-btn.import { background: #fde047; color: #92400e; }
        .llv-btn.import:hover { background: #facc15; }
        .llv-popup-bg { position: fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.2); display:flex; align-items:center; justify-content:center; z-index:2000; }
        .llv-popup { background:#fff; border-radius:12px; padding:32px 28px; min-width:320px; box-shadow:0 2px 12px rgba(16,185,129,0.12); }
        .llv-popup h3 { margin-top:0; color:#059669; }
        .llv-popup .status-btns { display: flex; gap: 12px; margin: 18px 0; }
        .llv-popup .status-btns button { font-size: 1.1rem; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; }
        .llv-popup .status-btns .status-0 { background: #e5e7eb; color: #374151; }
        .llv-popup .status-btns .status-1 { background: #34d399; color: #fff; }
        .llv-popup .status-btns .status-2 { background: #ef4444; color: #fff; }
        .llv-popup button.close { background: #10b981; color: #fff; margin-top: 8px; }
        @media (max-width: 900px) { .ws-main-card { padding: 12px 2px; } .work-schedule-table { min-width: 600px; } }
      `}</style>
      <div className="dashboard">
        <ConsultantSidebar consultantName={consultantName} />
        <main className="main">
          <ConsultantTopbar notificationCount={notificationCount} consultantName={consultantName} />
          <div className="ws-main-card">
            <div className="ws-title">Bảng Phân Công Làm Việc</div>
            <div className="llv-header">
              <label>Tuần:</label>
              <select className="llv-week-select" value={week} onChange={e => setWeek(e.target.value)}>
                {weekOptions.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
            <table className="work-schedule-table">
              <thead>
                <tr>
                  <th>Khung giờ</th>
                  {days.map((day, idx) => (
                    <th key={day} className={isToday(idx) ? "today" : ""}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot, rowIdx) => (
                  <tr key={slot}>
                    <td className="time-col">{slot}</td>
                    {days.map((day, colIdx) => (
                      <td key={day}>
                        <div
                          className={`slot status-${matrix[rowIdx][colIdx] || 0}`}
                          onClick={() => openEditPopup(rowIdx, colIdx)}
                          title={statusText[matrix[rowIdx][colIdx] || 0]}
                        >
                          {statusIcon[matrix[rowIdx][colIdx] || 0]}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td style={{ fontWeight: 600 }}>Tổng ca làm</td>
                  {days.map((_, colIdx) => (
                    <td key={colIdx}>{countWorkShifts(matrix, colIdx)}</td>
                  ))}
                </tr>
              </tfoot>
            </table>
            <div className="llv-legend">
              <div className="llv-legend-item"><span className="llv-legend-color" style={{ background: "#34d399" }}></span> Có ca làm</div>
              <div className="llv-legend-item"><span className="llv-legend-color" style={{ background: "#e5e7eb" }}></span> Không có ca làm</div>
              <div className="llv-legend-item"><span className="llv-legend-color" style={{ background: "#ef4444" }}></span> Đã đặt bởi khách</div>
            </div>
            <div className="llv-actions">
              <button className="llv-btn delete" onClick={() => { setMatrix(initialMatrix); localStorage.setItem(getMatrixKey(week), JSON.stringify(initialMatrix)); }}>🗑 Xóa tất cả</button>
              <button className="llv-btn export" onClick={saveToLocal}>📥 Xuất lịch</button>
              <button className="llv-btn import" onClick={loadFromLocal}>📤 Nhập lịch</button>
            </div>
          </div>
          {/* Popup chỉnh sửa ca */}
          {popup && (
            <div className="llv-popup-bg" onClick={closePopup}>
              <div className="llv-popup" onClick={e => e.stopPropagation()}>
                <h3>Chỉnh sửa ca làm</h3>
                <div><b>Khung giờ:</b> {timeSlots[popup.row]}</div>
                <div><b>Ngày:</b> {days[popup.col]}</div>
                <div className="status-btns">
                  <button className="status-0" onClick={() => updateStatus(0)}>{statusIcon[0]} Không có ca</button>
                  <button className="status-1" onClick={() => updateStatus(1)}>{statusIcon[1]} Có ca</button>
                  <button className="status-2" onClick={() => updateStatus(2)}>{statusIcon[2]} Đã đặt</button>
                </div>
                <button className="close" onClick={closePopup}>Đóng</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default ConsultantLichLamViecNew;
