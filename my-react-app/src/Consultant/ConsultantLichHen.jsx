import React, { useState, useEffect } from "react";
import ConsultantSidebar from "../components/ConsultantSidebar";
import ConsultantTopbar from "../components/ConsultantTopbar";
import { useLocation } from "react-router-dom";

const ConsultantLichHen = () => {
  const location = useLocation();
  const { appointmentCount } = location.state || {};
  const [appointments, setAppointments] = useState([]);
  const consultantName = "Nguyễn Thị Huyền";
  const notificationCount = 3;

  useEffect(() => {
    const lichDat = JSON.parse(localStorage.getItem("lichDat") || "[]");
    setAppointments(lichDat);
  }, []);

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
        .lh-main-card { width: 95%; margin: 0 auto 32px auto; background: #ecfdf5; border-radius: 18px; box-shadow: 0 2px 12px rgba(16,185,129,0.08); padding: 36px 40px 32px 40px; display: flex; flex-direction: column; align-items: center; }
        .lh-title { font-size: 2rem; font-weight: 700; color: #059669; margin-bottom: 12px; text-align: center; }
        .lh-desc { color: #166534; font-size: 1.1rem; margin-bottom: 32px; text-align: center; }
        .lh-table { width: 100%; border-collapse: separate; border-spacing: 0 8px; background: #ecfdf5; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 6px rgba(16,185,129,0.04); }
        .lh-table th, .lh-table td { text-align: center; padding: 12px 8px; font-size: 1.05rem; }
        .lh-table th { background: #a7f3d0; color: #166534; font-weight: 700; }
        .lh-table tr { background: #fff; border-radius: 8px; }
        .lh-table td { border-bottom: 1px solid #d1fae5; }
        .lh-btn-detail { background: #34d399; color: #fff; border: none; border-radius: 8px; padding: 6px 14px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
        .lh-btn-detail:hover { background: #059669; }
        .lh-empty { color: #6b7280; font-size: 1.1rem; margin-top: 32px; text-align: center; }
        @media (max-width: 900px) { .lh-main-card { padding: 12px 2px; } .lh-table th, .lh-table td { font-size: 0.95rem; padding: 8px 4px; } }
      `}</style>
      <div className="dashboard">
        <ConsultantSidebar consultantName={consultantName} />
        <main className="main">
          <ConsultantTopbar notificationCount={notificationCount} consultantName={consultantName} />
          <div className="lh-main-card">
            <div className="lh-title">Lịch hẹn tư vấn</div>
            <div className="lh-desc">Danh sách các lịch hẹn tư vấn của khách hàng.</div>
            {appointmentCount !== undefined && (
              <div style={{ margin: '16px 0', color: '#047857', fontWeight: 600 }}>
                Tổng số lịch hẹn trong tháng: {appointmentCount}
              </div>
            )}
            {appointments.length === 0 ? (
              <div className="lh-empty">Không có lịch hẹn nào.</div>
            ) : (
              <table className="lh-table">
                <thead>
                  <tr>
                    <th>Khách hàng</th>
                    <th>SĐT</th>
                    <th>Ngày</th>
                    <th>Giờ</th>
                    <th>Hình thức</th>
                    <th>Loại tư vấn</th>
                    <th>Trạng thái</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((a, idx) => (
                    <tr key={idx}>
                      <td>{a.hoTen}</td>
                      <td>{a.sdt}</td>
                      <td>{a.ngay}</td>
                      <td>{a.gio}</td>
                      <td>{a.hinhThuc}</td>
                      <td>{a.loaiTuVan}</td>
                      <td>{a.trangThai}</td>
                      <td><button className="lh-btn-detail">Xem chi tiết</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default ConsultantLichHen;
