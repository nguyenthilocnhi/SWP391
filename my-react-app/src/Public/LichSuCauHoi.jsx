import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import HeaderCustomer from '../components/HeaderCustomer';
import Footer from '../components/Footer';
const specialtyMap = {
  phukhoa: "Phụ khoa",
  sanphukhoa: "Sản phụ khoa",
  noitiet: "Nội tiết",
  tamly: "Tâm lý",
  dinhduong: "Dinh dưỡng",
  namkhoa: "Nam khoa",
  xetnghiem: "Xét nghiệm",
  khac: "Khác"
};

const statusMap = {
  answered: "Đã trả lời",
  pending: "Đang chờ trả lời",
  unanswered: "Chưa trả lời"
};

const styles = {
  page: {
    fontFamily: "'Segoe UI', sans-serif",
    background: "#e6f9ed",
    color: "#15803d",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: "100vw",
    boxSizing: "border-box",
  },
  container: {
    maxWidth: 900,
    width: "100%",
    margin: "120px auto 40px auto",
    background: "#fff",
    padding: "30px 20px",
    borderRadius: 12,
    boxShadow: "0 6px 12px rgba(34,197,94,0.08)",
    border: "2px solid #bbf7d0",
  },
  goAsk: {
    textAlign: "right",
    marginBottom: 20,
  },
  askBtn: {
    padding: "10px 16px",
    background: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: 16,
    transition: "background 0.3s",
  },
  askBtnHover: {
    background: "#15803d",
  },
  h1: {
    fontSize: 24,
    marginBottom: 20,
    color: "#047857",
    textAlign: "center",
  },
  filterBar: {
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  select: {
    padding: 8,
    borderRadius: 6,
    border: "1.5px solid #22c55e",
    color: "#15803d",
    background: "#f6fff9",
    fontSize: 15,
  },
  questionList: {},
  questionCard: {
    background: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    boxShadow: "0 2px 8px rgba(34,197,94,0.05)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    border: "1.5px solid #bbf7d0",
  },
  questionInfo: {
    flex: 1,
  },
  questionActions: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    minWidth: 120,
    alignItems: "flex-end",
  },
  viewBtn: {
    padding: "8px 12px",
    background: "#10b981",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 15,
    marginBottom: 4,
  },
  deleteBtn: {
    background: "#e53e3e",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
  },
  popupOverlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100vw", height: "100vh",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  popup: {
    background: "#fff",
    padding: 24,
    borderRadius: 10,
    maxWidth: 500,
    width: "90%",
    color: "#15803d",
    boxShadow: "0 4px 16px rgba(34,197,94,0.15)",
    border: "2px solid #bbf7d0",
  },
  popupBtn: {
    marginTop: 20,
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
  },
  alertBox: {
    position: "fixed",
    top: 95,
    right: 20,
    background: "#10b981",
    color: "#fff",
    padding: "3px 20px",
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    display: "flex",
    alignItems: "center",
    gap: 10,
    zIndex: 1000,
    animation: "slideIn 0.3s ease",
  },
  alertBoxHidden: {
    display: "none",
  },
  undoBtn: {
    background: "#3182ce",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    marginTop: 8,
    borderRadius: 4,
    cursor: "pointer",
    fontWeight: 600,
  },
  closeBtn: {
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 18,
    background: "none",
    border: "none",
    color: "#fff",
    marginLeft: 8,
  },
};

function LichSuCauHoi() {
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [popup, setPopup] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", undo: false });
  const [deleted, setDeleted] = useState(null);
  const [askBtnHover, setAskBtnHover] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("questionHistory")) || [];
    setQuestions(data);
  }, []);

  const filteredQuestions = questions.filter(
    (q) => filter === "all" || q.status === filter
  );

  const handleDelete = (index) => {
    if (!window.confirm("Bạn có chắc muốn xóa câu hỏi này?")) return;
    const q = filteredQuestions[index];
    const idx = questions.findIndex((item) => item.id === q.id);
    const newQuestions = [...questions];
    newQuestions.splice(idx, 1);
    setQuestions(newQuestions);
    localStorage.setItem("questionHistory", JSON.stringify(newQuestions));
    setDeleted({ data: q, idx });
    setAlert({ show: true, message: "❌ Câu hỏi đã bị xóa.", undo: true });
    setTimeout(() => setAlert({ show: false, message: "", undo: false }), 10000);
  };

  const handleUndo = () => {
    if (deleted) {
      const newQuestions = [...questions];
      newQuestions.splice(deleted.idx, 0, deleted.data);
      setQuestions(newQuestions);
      localStorage.setItem("questionHistory", JSON.stringify(newQuestions));
      setAlert({ show: true, message: "✅ Đã khôi phục câu hỏi.", undo: false });
      setTimeout(() => setAlert({ show: false, message: "", undo: false }), 3000);
      setDeleted(null);
    }
  };

  return (
    <div style={styles.page}>
      <HeaderCustomer />
      {/* Alert Notification */}
      <div style={alert.show ? styles.alertBox : styles.alertBoxHidden}>
        <span>{alert.message}</span>
        {alert.undo && (
          <button style={styles.undoBtn} onClick={handleUndo}>
            Hoàn tác
          </button>
        )}
        <button
          style={styles.closeBtn}
          onClick={() => setAlert({ show: false, message: "", undo: false })}
        >
          &times;
        </button>
      </div>
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <div style={styles.container}>
          <div style={styles.goAsk}>
            <a
              href="/customer/dat-cau-hoi"
              style={{
                ...styles.askBtn,
                ...(askBtnHover ? styles.askBtnHover : {}),
              }}
              onMouseEnter={() => setAskBtnHover(true)}
              onMouseLeave={() => setAskBtnHover(false)}
            >
              ➕ Gửi câu hỏi mới
            </a>
          </div>
          <h1 style={styles.h1}>Lịch sử câu hỏi của bạn</h1>
          <div style={styles.filterBar}>
            <label htmlFor="status">Lọc theo trạng thái:</label>
            <select
              id="status"
              style={styles.select}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="answered">Đã trả lời</option>
              <option value="pending">Đang chờ trả lời</option>
              <option value="unanswered">Chưa trả lời</option>
            </select>
          </div>
          <div style={styles.questionList}>
            {filteredQuestions.length === 0 && (
              <div style={{ color: "#047857", textAlign: "center", margin: 32 }}>
                Không có câu hỏi nào.
              </div>
            )}
            {filteredQuestions.map((q, idx) => (
              <div key={q.id} style={styles.questionCard}>
                <div style={styles.questionInfo}>
                  <h2 style={{ margin: 0, color: "#15803d" }}>{q.subject}</h2>
                  <p>
                    <strong>Trạng thái:</strong> {statusMap[q.status] || q.status}
                  </p>
                  <p>
                    <strong>Chuyên khoa:</strong> {specialtyMap[q.specialty] || q.specialty}
                  </p>
                  <p>
                    <strong>Ngày gửi:</strong> {q.time || q.date}
                  </p>
                </div>
                <div style={styles.questionActions}>
                  <button
                    style={styles.viewBtn}
                    onClick={() => setPopup(q)}
                  >
                    Xem chi tiết
                  </button>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(idx)}
                  >
                    🗑 Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Popup chi tiết */}
      {popup && (
        <div style={styles.popupOverlay} onClick={() => setPopup(null)}>
          <div
            style={styles.popup}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Chi tiết câu hỏi</h3>
            <p>
              <strong>Tiêu đề:</strong> {popup.subject}
            </p>
            <p>
              <strong>Chuyên khoa:</strong> {specialtyMap[popup.specialty] || popup.specialty}
            </p>
            <p>
              <strong>Trạng thái:</strong> {statusMap[popup.status] || popup.status}
            </p>
            <p>
              <strong>Ngày gửi:</strong> {popup.time || popup.date}
            </p>
            <p>
              <strong>Nội dung:</strong> {popup.content || popup.message || "(Không có nội dung chi tiết)"}
            </p>
            <p>
              <strong>Người gửi:</strong> {popup.customer || popup.name || "Ẩn danh"}
            </p>
            <p>
              <strong>Email:</strong> {popup.email || "(Không có email)"}
            </p>
            <button style={styles.popupBtn} onClick={() => setPopup(null)}>
              Đóng
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default LichSuCauHoi;
