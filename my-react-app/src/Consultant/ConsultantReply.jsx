import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ConsultantReply = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");

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
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f9fafb"
    }}>
      <div style={{ maxWidth: 600, width: "100%", background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px #a7f3d0", padding: 32 }}>
        <h2 style={{ color: "#059669" }}>Phản hồi câu hỏi</h2>
        <div style={{ marginBottom: 16 }}>
          <b>Khách hàng:</b> {question.customer}<br />
          <b>Tiêu đề:</b> {question.subject}<br />
          <b>Nội dung:</b> {question.content}
        </div>
        <form onSubmit={handleSubmit}>
          <label>Phản hồi của bạn:</label>
          <textarea
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            rows={6}
            style={{ width: "100%", borderRadius: 6, border: "1.5px solid #22c55e", marginTop: 8, marginBottom: 16, padding: 10 }}
            required
          />
          <button type="submit" style={{ background: "#22c55e", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 600, cursor: "pointer" }}>
            Gửi phản hồi
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConsultantReply; 