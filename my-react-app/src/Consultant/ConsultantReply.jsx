import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ConsultantSidebar from "../components/ConsultantSidebar";
import ConsultantTopbar from "../components/ConsultantTopbar";

const ConsultantReply = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const consultantName = "Nguyễn Thị Huyền";
  const notificationCount = 3;

  useEffect(() => {
    const qs = JSON.parse(localStorage.getItem("questions") || "[]");
    const q = qs.find(q => q.id === id);
    setQuestion(q);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const qs = JSON.parse(localStorage.getItem("questions") || "[]");
    const updated = qs.map(q =>
      q.id === id ? { ...q, status: "answered", answer, answerTime: new Date().toLocaleString("vi-VN") } : q
    );
    localStorage.setItem("questions", JSON.stringify(updated));

    // Cập nhật cho khách hàng
    const history = JSON.parse(localStorage.getItem("questionHistory") || "[]");
    const updatedHistory = history.map(q =>
      q.id === id ? { ...q, status: "answered", answer, answerTime: new Date().toLocaleString("vi-VN") } : q
    );
    localStorage.setItem("questionHistory", JSON.stringify(updatedHistory));

    alert("Đã gửi phản hồi!");
    navigate("/consultant/hoi-dap");
  };

  if (!question) return <div>Không tìm thấy câu hỏi.</div>;

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
        .reply-container {
          max-width: 800px;
          margin: 0 auto;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 2px 12px rgba(16,185,129,0.08);
          padding: 32px;
          border: 1px solid #d1fae5;
        }
        .reply-title {
          color: #059669;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 24px;
          text-align: center;
        }
        .question-info {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
        }
        .question-info b {
          color: #047857;
        }
        .question-info div {
          margin-bottom: 8px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          color: #047857;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .form-group textarea {
          width: 100%;
          border-radius: 8px;
          border: 1.5px solid #22c55e;
          padding: 12px;
          font-family: inherit;
          font-size: 14px;
          resize: vertical;
          background: #f9fafb;
        }
        .form-group textarea:focus {
          outline: none;
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
        }
        .submit-btn {
          background: #22c55e;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 12px 24px;
          font-weight: 600;
          cursor: pointer;
          font-size: 16px;
          transition: background 0.2s;
        }
        .submit-btn:hover {
          background: #16a34a;
        }
      `}</style>
      <div className="dashboard">
        <ConsultantSidebar consultantName={consultantName} />
        <main className="main">
          <ConsultantTopbar notificationCount={notificationCount} consultantName={consultantName} />
          <div className="reply-container">
            <h2 className="reply-title">Phản hồi câu hỏi</h2>
            <div className="question-info">
              <div><b>Khách hàng:</b> {question.customer}</div>
              <div><b>Tiêu đề:</b> {question.subject}</div>
              <div><b>Nội dung:</b> {question.content}</div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Phản hồi của bạn:</label>
                <textarea
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  rows={6}
                  placeholder="Nhập phản hồi của bạn..."
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Gửi phản hồi
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default ConsultantReply; 