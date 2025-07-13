import React, { useState } from "react";
import ConsultantSidebar from "../components/ConsultantSidebar";
import ConsultantTopbar from "../components/ConsultantTopbar";

const styles = {
  page: {
    fontFamily: "'Segoe UI', sans-serif",
    background: "#e6f9ed",
    minHeight: "100vh",
    padding: 0,
  },
  dashboard: {
    display: "flex",
    minHeight: "100vh",
    minWidth: "100vw",
    width: "100vw",
    backgroundColor: "#f9fafb",
  },
  main: {
    flex: 1,
    marginLeft: 180,
    padding: "40px 32px",
    backgroundColor: "#ffffff",
    overflowX: "hidden",
    minHeight: "100vh",
  },
  grid: {
    display: "flex",
    gap: 32,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 6px 16px #bbf7d0",
    padding: 32,
    minWidth: 320,
    maxWidth: 370,
    flex: "1 1 320px",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  h2: {
    color: "#047857",
    fontSize: 20,
    marginBottom: 18,
    fontWeight: 700,
  },
  label: {
    fontWeight: 600,
    color: "#047857",
    marginTop: 12,
    marginBottom: 4,
    display: "block",
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    border: "1.5px solid #22c55e",
    fontSize: 16,
    marginBottom: 12,
    background: "#f6fff9",
    color: "#15803d",
  },
  avatarWrap: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #bbf7d0",
    background: "#e5e7eb",
    color: "#6b7280",
    fontSize: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  avatarLink: {
    color: "#047857",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: 15,
    marginTop: 8,
  },
  button: {
    width: "100%",
    padding: 12,
    background: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 8,
  },
  toggleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  toggleLabel: {
    color: "#166534",
    fontWeight: 500,
    fontSize: 16,
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    background: "#d1fae5",
    position: "relative",
    cursor: "pointer",
    transition: "background 0.2s",
    border: "1.5px solid #22c55e",
    display: "inline-block",
  },
  toggleActive: {
    background: "#22c55e",
  },
  toggleCircle: {
    position: "absolute",
    top: 2,
    left: 2,
    width: 20,
    height: 20,
    borderRadius: "50%",
    background: "#fff",
    transition: "left 0.2s",
    boxShadow: "0 1px 4px #bbf7d0",
  },
  toggleCircleActive: {
    left: 22,
  },
  success: {
    color: "#15803d",
    background: "#d1fae5",
    border: "1px solid #86efac",
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
    textAlign: "center",
  }
};

function ConsultantCaiDat() {
  // Thông tin cá nhân mẫu
  const [info, setInfo] = useState({
    name: "Nguyễn Thị Hương",
    email: "huong@angioi.com",
    phone: "0123456789",
    avatar: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [notify, setNotify] = useState({
    appointment: true,
    question: true,
    email: false,
  });
  const [password, setPassword] = useState({
    old: "",
    new: "",
    confirm: "",
  });
  const [success, setSuccess] = useState("");
  const consultantName = info.name;
  const notificationCount = 3;

  // Đổi ảnh đại diện
  const handleAvatarChange = e => {
    if (e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
      setInfo(prev => ({
        ...prev,
        avatar: URL.createObjectURL(e.target.files[0])
      }));
    }
  };

  // Cập nhật thông tin cá nhân
  const handleInfoChange = e => {
    const { name, value } = e.target;
    setInfo(prev => ({ ...prev, [name]: value }));
  };

  // Cập nhật toggle thông báo
  const handleToggle = key => {
    setNotify(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Đổi mật khẩu
  const handlePasswordChange = e => {
    const { name, value } = e.target;
    setPassword(prev => ({ ...prev, [name]: value }));
  };

  // Submit cập nhật thông tin
  const handleInfoSubmit = e => {
    e.preventDefault();
    setSuccess("Đã cập nhật thông tin cá nhân!");
    setTimeout(() => setSuccess(""), 2000);
  };

  // Submit đổi mật khẩu
  const handlePasswordSubmit = e => {
    e.preventDefault();
    if (!password.old || !password.new || password.new !== password.confirm) {
      setSuccess("Vui lòng kiểm tra lại mật khẩu!");
      setTimeout(() => setSuccess(""), 2000);
      return;
    }
    setSuccess("Đổi mật khẩu thành công!");
    setPassword({ old: "", new: "", confirm: "" });
    setTimeout(() => setSuccess(""), 2000);
  };

  return (
    <div style={styles.page}>
      <div style={styles.dashboard}>
        <ConsultantSidebar consultantName={consultantName} />
        <main style={styles.main}>
          <ConsultantTopbar notificationCount={notificationCount} consultantName={consultantName} />
          <div style={styles.grid}>
            {/* Card 1: Thông tin cá nhân */}
            <div style={styles.card}>
              <div style={styles.h2}>Thông tin cá nhân</div>
              <form onSubmit={handleInfoSubmit}>
                <div style={styles.avatarWrap}>
                  {info.avatar ? (
                    <img src={info.avatar} alt="avatar" style={styles.avatar} />
                  ) : (
                    <div style={styles.avatar}>80 × 80</div>
                  )}
                  <label style={styles.avatarLink}>
                    Đổi ảnh đại diện
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
                <label style={styles.label}>Họ và tên</label>
                <input
                  style={styles.input}
                  name="name"
                  value={info.name}
                  onChange={handleInfoChange}
                  required
                />
                <label style={styles.label}>Email</label>
                <input
                  style={styles.input}
                  name="email"
                  type="email"
                  value={info.email}
                  onChange={handleInfoChange}
                  required
                />
                <label style={styles.label}>Số điện thoại</label>
                <input
                  style={styles.input}
                  name="phone"
                  value={info.phone}
                  onChange={handleInfoChange}
                  required
                />
                <button style={styles.button} type="submit">
                  Cập nhật thông tin
                </button>
              </form>
            </div>
            {/* Card 2: Cài đặt thông báo */}
            <div style={styles.card}>
              <div style={styles.h2}>Cài đặt thông báo</div>
              <div style={styles.toggleRow}>
                <span style={styles.toggleLabel}>Thông báo lịch hẹn mới</span>
                <span
                  style={{
                    ...styles.toggle,
                    ...(notify.appointment ? styles.toggleActive : {})
                  }}
                  onClick={() => handleToggle("appointment")}
                >
                  <span
                    style={{
                      ...styles.toggleCircle,
                      ...(notify.appointment ? styles.toggleCircleActive : {})
                    }}
                  />
                </span>
              </div>
              <div style={styles.toggleRow}>
                <span style={styles.toggleLabel}>Thông báo câu hỏi mới</span>
                <span
                  style={{
                    ...styles.toggle,
                    ...(notify.question ? styles.toggleActive : {})
                  }}
                  onClick={() => handleToggle("question")}
                >
                  <span
                    style={{
                      ...styles.toggleCircle,
                      ...(notify.question ? styles.toggleCircleActive : {})
                    }}
                  />
                </span>
              </div>
              <div style={styles.toggleRow}>
                <span style={styles.toggleLabel}>Thông báo email</span>
                <span
                  style={{
                    ...styles.toggle,
                    ...(notify.email ? styles.toggleActive : {})
                  }}
                  onClick={() => handleToggle("email")}
                >
                  <span
                    style={{
                      ...styles.toggleCircle,
                      ...(notify.email ? styles.toggleCircleActive : {})
                    }}
                  />
                </span>
              </div>
            </div>
            {/* Card 3: Bảo mật */}
            <div style={styles.card}>
              <div style={styles.h2}>Bảo mật</div>
              <form onSubmit={handlePasswordSubmit}>
                <label style={styles.label}>Mật khẩu hiện tại</label>
                <input
                  style={styles.input}
                  type="password"
                  name="old"
                  placeholder="Nhập mật khẩu hiện tại"
                  value={password.old}
                  onChange={handlePasswordChange}
                  required
                />
                <label style={styles.label}>Mật khẩu mới</label>
                <input
                  style={styles.input}
                  type="password"
                  name="new"
                  placeholder="Nhập mật khẩu mới"
                  value={password.new}
                  onChange={handlePasswordChange}
                  required
                />
                <label style={styles.label}>Xác nhận mật khẩu mới</label>
                <input
                  style={styles.input}
                  type="password"
                  name="confirm"
                  placeholder="Nhập lại mật khẩu mới"
                  value={password.confirm}
                  onChange={handlePasswordChange}
                  required
                />
                <button style={styles.button} type="submit">
                  Đổi mật khẩu
                </button>
              </form>
            </div>
          </div>
          {success && <div style={styles.success}>{success}</div>}
        </main>
      </div>
    </div>
  );
}

export default ConsultantCaiDat;
