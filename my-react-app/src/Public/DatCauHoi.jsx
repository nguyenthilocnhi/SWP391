import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const styles = {
  page: {
    fontFamily: "'Segoe UI', sans-serif",
    lineHeight: 1.6,
    color: "#15803d",
    backgroundColor: "#e6f9ed",
    minHeight: "100vh",
    width: "100vw",
    margin: 0,
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },
  container: {
    maxWidth: 700,
    width: "100%",
    backgroundColor: "#fff",
    padding: "30px 40px",
    borderRadius: 12,
    boxShadow: "0 6px 12px rgba(34,197,94,0.08)",
    border: "2px solid #bbf7d0",
    position: "relative",
  },
  logo: {
    textAlign: "center",
    marginBottom: 20,
  },
  logoImg: {
    maxWidth: 120,
  },
  h1: {
    textAlign: "center",
    marginBottom: 24,
    fontSize: 24,
    color: "#047857",
  },
  alertSuccess: {
    textAlign: "center",
    color: "#15803d",
    backgroundColor: "#d1fae5",
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
    display: "block",
    border: "1px solid #86efac",
  },
  form: {
    width: "100%",
  },
  label: {
    display: "block",
    marginTop: 12,
    fontWeight: 600,
    color: "#047857",
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 6,
    border: "1.5px solid #22c55e",
    marginTop: 4,
    fontSize: 15,
    boxSizing: "border-box",
    color: "#15803d",
    backgroundColor: "#f6fff9",
  },
  textarea: {
    width: "100%",
    padding: 10,
    borderRadius: 6,
    border: "1.5px solid #22c55e",
    marginTop: 4,
    fontSize: 15,
    boxSizing: "border-box",
    resize: "vertical",
    color: "#15803d",
    backgroundColor: "#f6fff9",
  },
  button: {
    marginTop: 20,
    width: "100%",
    padding: 12,
    backgroundColor: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#15803d",
  },
  nameAnonymousRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: 20,
    marginTop: 12,
    marginBottom: 16,
  },
  nameField: {
    flex: 1,
  },
  anonymousToggle: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 0,
    whiteSpace: "nowrap",
  },
  anonymousCheckbox: {
    transform: "scale(1.2)",
    accentColor: "#22c55e",
  },
  cornerHistory: {
    position: "fixed",
    top: 20,
    right: 20,
    zIndex: 1000,
  },
  historyIcon: {
    display: "inline-block",
    backgroundColor: "#22c55e",
    color: "#fff",
    fontSize: 22,
    padding: "10px 12px",
    borderRadius: "50%",
    textDecoration: "none",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    transition: "background-color 0.3s",
  },
  historyIconHover: {
    backgroundColor: "#16a34a",
  },
  "@media (maxWidth: 480px)": {
    container: {
      padding: 20,
      margin: 20,
    },
  },
};

const specialtyDescriptions = {
  namkhoa: "Chuyên về các vấn đề sức khỏe nam giới, sinh lý, sinh sản.",
  phukhoa: "Chuyên về sức khỏe phụ nữ, kinh nguyệt, sinh sản.",
  noitiet: "Chuyên về nội tiết tố, hormone, các bệnh lý liên quan.",
  xetnghiem: "Tư vấn về các loại xét nghiệm, quy trình, kết quả."
};

const topicDescriptions = {
  kinhnguyet: "Các vấn đề về chu kỳ kinh nguyệt, rối loạn kinh nguyệt.",
  tranhthai: "Tư vấn các biện pháp tránh thai an toàn, hiệu quả.",
  benhly: "Triệu chứng, dấu hiệu các bệnh lý thường gặp.",
  tamsinhly: "Tâm lý, tình cảm, các vấn đề về giới tính.",
  khac: "Các chủ đề khác liên quan đến sức khỏe."
};

function DatCauHoi() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    specialty: "",
    topic: "",
    subject: "",
    message: "",
    anonymous: false,
  });
  const [success, setSuccess] = useState(false);
  const [historyHover, setHistoryHover] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Nếu bỏ ẩn danh thì reset name
    if (name === "anonymous" && !checked) {
      setForm((prev) => ({ ...prev, name: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = form.anonymous ? "Ẩn danh" : form.name.trim();
    const newQuestion = {
      id: "q" + Math.floor(Math.random() * 1000000),
      customer: name,
      email: form.email.trim(),
      age: form.age,
      gender: form.gender,
      specialty: form.specialty,
      topic: form.topic,
      subject: form.subject.trim(),
      content: form.message.trim(),
      time: new Date().toLocaleString("vi-VN"),
      status: "waiting",
    };

    // Lưu vào localStorage
    const consultantList = JSON.parse(localStorage.getItem("questions")) || [];
    consultantList.push(newQuestion);
    localStorage.setItem("questions", JSON.stringify(consultantList));

    const historyList = JSON.parse(localStorage.getItem("questionHistory")) || [];
    historyList.push(newQuestion);
    localStorage.setItem("questionHistory", JSON.stringify(historyList));

    setSuccess(true);
    setForm({
      name: "",
      email: "",
      age: "",
      gender: "",
      specialty: "",
      topic: "",
      subject: "",
      message: "",
      anonymous: false,
    });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div style={styles.page}>
      {/* Nút lịch sử góc phải */}
      <div style={styles.cornerHistory}>
        <Link
          to="/customer/lich-su-cau-hoi"
          style={{
            ...styles.historyIcon,
            ...(historyHover ? styles.historyIconHover : {}),
          }}
          title="Xem lịch sử câu hỏi"
          onMouseEnter={() => setHistoryHover(true)}
          onMouseLeave={() => setHistoryHover(false)}
        >
          📋
        </Link>
      </div>
      <main style={styles.container}>
        <div style={styles.logo}>
          <a href="/customer">
            <img
              src="https://i.postimg.cc/mZjYJ7wm/logo.jpg"
              alt="Logo An Giới"
              style={styles.logoImg}
            />
          </a>
        </div>
        <h1 style={styles.h1}>Gửi Câu Hỏi Tư Vấn Sức Khỏe</h1>
        {success && (
          <div style={styles.alertSuccess}>
            ✅ Câu hỏi của bạn đã được gửi thành công!
          </div>
        )}
        <form style={styles.form} onSubmit={handleSubmit} autoComplete="off">
          <div style={styles.nameAnonymousRow}>
            {!form.anonymous && (
              <div style={styles.nameField}>
                <label htmlFor="name">Họ và tên</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  style={styles.input}
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div style={styles.anonymousToggle}>
              <input
                type="checkbox"
                id="anonymousCheckbox"
                name="anonymous"
                checked={form.anonymous}
                onChange={handleChange}
                style={styles.anonymousCheckbox}
              />
              <label htmlFor="anonymousCheckbox">Gửi ẩn danh</label>
            </div>
          </div>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            style={styles.input}
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="age">Tuổi</label>
          <input
            type="number"
            id="age"
            name="age"
            min="10"
            max="100"
            style={styles.input}
            value={form.age}
            onChange={handleChange}
            required
          />

          <label htmlFor="gender">Giới tính</label>
          <select
            id="gender"
            name="gender"
            style={styles.input}
            value={form.gender}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn giới tính --</option>
            <option value="nam">Nam</option>
            <option value="nu">Nữ</option>
            <option value="khac">Khác</option>
          </select>

          <label htmlFor="specialty">Chuyên khoa liên quan</label>
          <select
            id="specialty"
            name="specialty"
            style={styles.input}
            value={form.specialty}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn chuyên khoa --</option>
            <option value="namkhoa">Nam khoa</option>
            <option value="phukhoa">Phụ khoa</option>
            <option value="noitiet">Nội tiết</option>
            <option value="xetnghiem">Xét nghiệm</option>
          </select>

          {form.specialty && (
            <div style={{ color: "#15803d", fontSize: 14, marginTop: 4, marginBottom: 4 }}>
              {specialtyDescriptions[form.specialty]}
            </div>
          )}

          <label htmlFor="topic">Chủ đề câu hỏi</label>
          <select
            id="topic"
            name="topic"
            style={styles.input}
            value={form.topic}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn chủ đề --</option>
            <option value="kinhnguyet">Chu kỳ kinh nguyệt</option>
            <option value="tranhthai">Biện pháp tránh thai</option>
            <option value="benhly">Triệu chứng bệnh lý</option>
            <option value="tamsinhly">Tâm lý - tình cảm</option>
            <option value="khac">Khác</option>
          </select>

          {form.topic && (
            <div style={{ color: "#15803d", fontSize: 14, marginTop: 4, marginBottom: 4 }}>
              {topicDescriptions[form.topic]}
            </div>
          )}

          <label htmlFor="subject">Tiêu đề câu hỏi</label>
          <input
            type="text"
            id="subject"
            name="subject"
            style={styles.input}
            value={form.subject}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Nội dung câu hỏi</label>
          <textarea
            id="message"
            name="message"
            rows={6}
            style={styles.textarea}
            value={form.message}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            style={styles.button}
            onMouseDown={e => (e.target.style.backgroundColor = "#16a34a")}
            onMouseUp={e => (e.target.style.backgroundColor = "#22c55e")}
            onMouseLeave={e => (e.target.style.backgroundColor = "#22c55e")}
          >
            Gửi câu hỏi
          </button>
        </form>
      </main>
    </div>
  );
}

export default DatCauHoi;
