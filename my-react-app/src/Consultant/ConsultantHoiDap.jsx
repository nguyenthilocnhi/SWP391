import React, { useState, useEffect } from "react";
import ConsultantSidebar from "../components/ConsultantSidebar";
import ConsultantTopbar from "../components/ConsultantTopbar";
import { useNavigate } from "react-router-dom";

const ConsultantHoiDap = () => {
  const [questions, setQuestions] = useState([]);
  const consultantName = "Nguyễn Thị Huyền";
  const notificationCount = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const qs = JSON.parse(localStorage.getItem("questions") || "[]");
    qs.forEach(q => { if (q.status === "unanswered") q.status = "waiting"; });
    localStorage.setItem("questions", JSON.stringify(qs));
    setQuestions(qs.filter(q => q.status === "waiting"));
  }, []);

  // Xóa handleAnswer, chuyển sang dùng navigate

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
        .hd-main-card { width: 95%; margin: 0 auto 32px auto; background: #ecfdf5; border-radius: 18px; box-shadow: 0 2px 12px rgba(16,185,129,0.08); padding: 36px 40px 32px 40px; display: flex; flex-direction: column; align-items: center; }
        .hd-title { font-size: 2rem; font-weight: 700; color: #059669; margin-bottom: 12px; text-align: center; }
        .hd-desc { color: #166534; font-size: 1.1rem; margin-bottom: 32px; text-align: center; }
        .hd-list { width: 100%; display: flex; flex-wrap: wrap; gap: 24px; justify-content: center; }
        .hd-question-card { background: #fff; border-radius: 14px; box-shadow: 0 2px 8px rgba(16,185,129,0.08); padding: 24px 32px; display: flex; flex-direction: column; align-items: flex-start; min-width: 260px; max-width: 400px; }
        .hd-name { font-weight: 600; font-size: 1.1rem; margin-bottom: 6px; color: #059669; }
        .hd-time { color: #6b7280; font-size: 0.98rem; margin-bottom: 8px; }
        .hd-question { color: #166534; font-size: 1.08rem; margin-bottom: 14px; }
        .hd-btn { background: #34d399; color: #fff; border: none; border-radius: 8px; padding: 8px 18px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: background 0.2s; align-self: flex-end; }
        .hd-btn:hover { background: #059669; }
        .hd-empty { color: #6b7280; font-size: 1.1rem; margin-top: 32px; text-align: center; }
        @media (max-width: 900px) { .hd-main-card { padding: 12px 2px; } .hd-list { flex-direction: column; align-items: center; } }
      `}</style>
      <div className="dashboard">
        <ConsultantSidebar consultantName={consultantName} />
        <main className="main">
          <ConsultantTopbar notificationCount={notificationCount} />
          <div className="hd-main-card">
            <div className="hd-title">Hỏi đáp khách hàng</div>
            <div className="hd-desc">Danh sách các câu hỏi khách hàng gửi đến tư vấn viên.</div>
            <div className="hd-list">
              {questions.length === 0 ? (
                <div className="hd-empty">Không có câu hỏi nào đang chờ trả lời.</div>
              ) : (
                questions.map(q => (
                  <div className="hd-question-card" key={q.id}>
                    <div className="hd-name">{q.customer}</div>
                    <div className="hd-time">{q.time}</div>
                    <div className="hd-question">
                      <b>{q.subject}</b>
                      <div style={{marginTop: 6}}>{q.content}</div>
                    </div>
                    <button className="hd-btn" onClick={() => navigate(`/consultant/hoi-dap/tra-loi/${q.id}`)}>Trả lời</button>
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

export default ConsultantHoiDap;
