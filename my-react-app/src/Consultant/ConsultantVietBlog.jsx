import React, { useState } from "react";
import ConsultantSidebar from "../components/ConsultantSidebar";
import ConsultantTopbar from "../components/ConsultantTopbar";

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#f9fafb",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "100vh",
    background: "#f9fafb",
    width: "100%",
    height: "100vh",
    padding: 0,
  },
  card: {
    width: "100%",
    maxWidth: 700,
    margin: "48px auto 0 auto",
    background: "#fff",
    borderRadius: 18,
    boxShadow: "0 4px 24px rgba(34,197,94,0.10)",
    padding: "40px 32px 32px 32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
  },
  title: {
    fontSize: 32,
    fontWeight: 800,
    color: "#059669",
    marginBottom: 32,
    textAlign: "center",
    letterSpacing: 1,
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  label: {
    fontWeight: 600,
    color: "#065f46",
    marginTop: 18,
    display: "block",
    fontSize: 16,
    textAlign: "left",
    width: "100%",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  input: {
    width: "100%",
    padding: 12,
    margin: "7px 0 0 0",
    border: "1px solid #a7f3d0",
    borderRadius: 10,
    fontSize: 16,
    background: "#f0fdf4",
    color: "#15803d",
    marginBottom: 0,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  textarea: {
    width: "100%",
    padding: 12,
    margin: "7px 0 0 0",
    border: "1px solid #a7f3d0",
    borderRadius: 10,
    fontSize: 16,
    background: "#f0fdf4",
    color: "#15803d",
    minHeight: 220,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  button: {
    margin: "32px 0 0 0",
    width: "100%",
    background: "linear-gradient(90deg, #22c55e 0%, #10b981 100%)",
    color: "white",
    padding: 16,
    border: "none",
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 18,
    cursor: "pointer",
    transition: "background 0.3s",
    textAlign: "center",
    letterSpacing: 1,
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  message: {
    marginTop: 18,
    fontWeight: 600,
    textAlign: "center",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  guide: {
    fontSize: 14,
    color: "#888",
    marginTop: 8,
    marginBottom: 0,
    width: "100%",
    textAlign: "left",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  }
};

function ConsultantVietBlog() {
  const [form, setForm] = useState({
    title: "",
    image: "",
    content: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      setMessage("Vui lòng nhập tiêu đề và nội dung bài viết.");
      return;
    }
    // Lưu vào localStorage (hoặc gọi API)
    const blogs = JSON.parse(localStorage.getItem("consultantBlogs") || "[]");
    const newBlog = {
      ...form,
      date: new Date().toLocaleString(),
      author: "Consultant Demo",
      id: Date.now()
    };
    blogs.push(newBlog);
    localStorage.setItem("consultantBlogs", JSON.stringify(blogs));
    // Chuyển sang trang chi tiết blog vừa tạo
    navigate(`/blog/chi-tiet/${newBlog.id}`);
  };

  return (
    <div style={styles.container}>
      <ConsultantSidebar />
      <div style={styles.main}>
        <ConsultantTopbar />
        <div style={styles.card}>
          <div style={styles.title}>Viết Bài Blog Mới</div>
          <form onSubmit={handleSubmit} style={{width: '100%', maxWidth: 540}}>
            <label style={styles.label}>Tiêu đề bài viết <span style={{ color: "#ef4444" }}>*</span></label>
            <input
              type="text"
              name="title"
              style={styles.input}
              value={form.title}
              onChange={handleChange}
              required
            />
            <label style={styles.label}>Ảnh đại diện (URL)</label>
            <input
              type="text"
              name="image"
              style={styles.input}
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
            />
            <label style={styles.label}>Nội dung bài viết <span style={{ color: "#ef4444" }}>*</span></label>
            <textarea
              name="content"
              style={styles.textarea}
              value={form.content}
              onChange={handleChange}
              required
              placeholder="Bạn có thể dùng các thẻ HTML cơ bản như <h2>, <ul>, <li>, <strong>..."
            />
            <div style={styles.guide}>
              <span>Ví dụ: &lt;h2&gt;Tiêu đề phụ&lt;/h2&gt;, &lt;ul&gt;&lt;li&gt;Ý 1&lt;/li&gt;&lt;/ul&gt;, &lt;strong&gt;in đậm&lt;/strong&gt;.<br/>Nội dung sẽ hiển thị đẹp như trang blog chi tiết.</span>
            </div>
            <button type="submit" style={styles.button}>Đăng bài</button>
            {message && (
              <div style={{ ...styles.message, color: message.includes("thành công") ? "#10B981" : "#EF4444" }}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConsultantVietBlog;
