import React, { useState, useEffect } from "react";
import ConsultantSidebar from "../components/ConsultantSidebar";
import ConsultantTopbar from "../components/ConsultantTopbar";
import { useNavigate } from "react-router-dom";

const ConsultantTuVanTrucTuyen = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const consultantName = "Nguyễn Thị Huyền";
  const notificationCount = 3;

  useEffect(() => {
    const onlineBookings = JSON.parse(localStorage.getItem("onlineBookings") || "[]");
    setCustomers(onlineBookings.filter(b => b.status === "waiting"));
  }, [navigate]);

  const handleStartConsult = (id) => {
    // Cập nhật trạng thái booking
    const onlineBookings = JSON.parse(localStorage.getItem("onlineBookings") || "[]");
    const updated = onlineBookings.map(b => b.id === id ? { ...b, status: "consulting" } : b);
    localStorage.setItem("onlineBookings", JSON.stringify(updated));
    setCustomers(updated.filter(b => b.status === "waiting"));
    alert("Bắt đầu tư vấn cho khách hàng!");
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
        .tvtt-main-card { width: 90%; margin: 0 auto 32px auto; background: #ecfdf5; border-radius: 18px; box-shadow: 0 2px 12px rgba(16,185,129,0.08); padding: 36px 40px 32px 40px; display: flex; flex-direction: column; align-items: center; }
        .tvtt-title { font-size: 2rem; font-weight: 700; color: #059669; margin-bottom: 12px; text-align: center; }
        .tvtt-desc { color: #166534; font-size: 1.1rem; margin-bottom: 32px; text-align: center; }
        .tvtt-list { width: 100%; display: flex; flex-wrap: wrap; gap: 24px; justify-content: center; }
        .tvtt-customer-card { background: #fff; border-radius: 14px; box-shadow: 0 2px 8px rgba(16,185,129,0.08); padding: 24px 32px; display: flex; flex-direction: column; align-items: center; min-width: 220px; max-width: 260px; }
        .tvtt-avatar { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; border: 3px solid #34d399; margin-bottom: 12px; }
        .tvtt-name { font-weight: 600; font-size: 1.1rem; margin-bottom: 6px; color: #059669; }
        .tvtt-wait { color: #b91c1c; font-size: 0.98rem; margin-bottom: 14px; }
        .tvtt-btn { background: #34d399; color: #fff; border: none; border-radius: 8px; padding: 8px 18px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
        .tvtt-btn:hover { background: #059669; }
        .tvtt-empty { color: #6b7280; font-size: 1.1rem; margin-top: 32px; text-align: center; }
        @media (max-width: 900px) { .tvtt-main-card { padding: 12px 2px; } .tvtt-list { flex-direction: column; align-items: center; } }
      `}</style>
      <div className="dashboard">
        <ConsultantSidebar consultantName={consultantName} />
        <main className="main">
          <ConsultantTopbar notificationCount={notificationCount} consultantName={consultantName} />
          <div className="tvtt-main-card">
            <div className="tvtt-title">Tư vấn trực tuyến</div>
            <div className="tvtt-desc">Danh sách khách hàng đang chờ tư vấn. Hãy nhấn "Bắt đầu tư vấn" để kết nối với khách hàng.</div>
            <div className="tvtt-list">
              {customers.length === 0 ? (
                <div className="tvtt-empty">Không có khách hàng nào đang chờ tư vấn.</div>
              ) : (
                customers.map(c => (
                  <div className="tvtt-customer-card" key={c.id}>
                    <img className="tvtt-avatar" src={c.avatar} alt={c.name} />
                    <div className="tvtt-name">{c.name}</div>
                    <div className="tvtt-wait">Chờ: {c.waitingTime}</div>
                    <button className="tvtt-btn" onClick={() => handleStartConsult(c.id)}>Bắt đầu tư vấn</button>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ConsultantTuVanTrucTuyen;
