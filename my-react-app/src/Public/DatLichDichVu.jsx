import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderCustomer from "../components/HeaderCustomer";
import Footer from "../components/Footer";

const styles = {
  page: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    background: "#e6f9ed",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  main: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "#e6f9ed",
    padding: 0,
    width: "99vw",
  },
  card: {
    width: "100%",
    maxWidth: 1000,
    minHeight: 480,
    background: "#fff",
    borderRadius: 18,
    boxShadow: "0 8px 32px rgba(34,197,94,0.10)",
    display: "flex",
    overflow: "hidden",
    margin: "80px auto 0 auto",
  },
  imageBox: {
    flex: 1,
    minWidth: 320,
    background: "#f0fdfa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    borderRadius: "18px 0 0 18px",
  },
  image: {
    maxWidth: 350,
    width: "100%",
    height: "auto",
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  formBox: {
    flex: 1,
    minWidth: 320,
    background: "#fff",
    padding: 40,
    borderRadius: "0 18px 18px 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: "none",
  },
  h2: {
    fontSize: 28,
    fontWeight: 800,
    marginBottom: 28,
    color: "#15803d",
    textAlign: "center",
    letterSpacing: 1,
  },
  label: {
    display: "block",
    margin: "16px 0 6px",
    fontWeight: 600,
    color: "#047857",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    border: "1.5px solid #bbf7d0",
    borderRadius: 7,
    fontSize: 16,
    fontFamily: "inherit",
    boxSizing: "border-box",
    transition: "border-color 0.3s, box-shadow 0.3s",
    marginBottom: 0,
    background: "#f6fff9",
    color: "#15803d",
  },
  select: {
    width: "100%",
    padding: "12px 14px",
    border: "1.5px solid #bbf7d0",
    borderRadius: 7,
    fontSize: 16,
    backgroundColor: "#f6fff9",
    color: "#15803d",
    transition: "border-color 0.3s, box-shadow 0.3s",
  },
  button: {
    marginTop: 28,
    width: "100%",
    backgroundColor: "#22c55e",
    color: "white",
    padding: 14,
    border: "none",
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 18,
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    boxShadow: "0 2px 8px rgba(34,197,94,0.10)",
  },
  buttonHover: {
    backgroundColor: "#15803d",
  },
  required: {
    color: "red",
  },
  alert: {
    position: "fixed",
    top: 110,
    right: 20,
    backgroundColor: "#10b981",
    color: "white",
    padding: "10px 28px",
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: 1000,
    fontWeight: 600,
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    gap: 10,
    animation: "slideIn 0.3s ease",
  },
  alertHidden: {
    display: "none",
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
  '@media (maxWidth: 900px)': {
    card: {
      flexDirection: "column",
      width: "100%",
      maxWidth: 500,
      borderRadius: 18,
      minHeight: 0,
    },
    imageBox: {
      borderRadius: "18px 18px 0 0",
      padding: 24,
    },
    formBox: {
      borderRadius: "0 0 18px 18px",
      padding: 24,
    },
  },
};

function DatLichDichVu() {
  const [form, setForm] = useState({
    dichvu: "",
  });
  const [alert, setAlert] = useState({ show: false, message: "" });
  const [buttonHover, setButtonHover] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Đặt Lịch Dịch Vụ";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { dichvu } = form;
    if (!dichvu) {
      setAlert({ show: true, message: "Vui lòng chọn dịch vụ." });
      return;
    }
    if (dichvu === "Tư Vấn") {
      navigate("/customer/dat-lich-tu-van");
      return;
    }
    if (dichvu === "Xét Nghiệm") {
      navigate("/customer/dat-lich-xet-nghiem");
      return;
    }
    // Nếu dịch vụ khác (mặc định lưu lịch và chuyển trang thành công)
    const lich = {
      dichVu: dichvu,
      trangThai: "Chờ xử lý",
    };
    const danhSachLich = JSON.parse(localStorage.getItem("lichDat")) || [];
    danhSachLich.push(lich);
    localStorage.setItem("lichDat", JSON.stringify(danhSachLich));
    setAlert({ show: true, message: "Đặt lịch dịch vụ thành công!" });
    setTimeout(() => {
      setAlert({ show: false, message: "" });
      navigate("/customer/thanh-cong-dat-lich");
    }, 1200);
  };

  return (
    <div style={styles.page}>
      <HeaderCustomer />
      {/* Alert */}
      <div style={alert.show ? styles.alert : styles.alertHidden}>
        <span>{alert.message}</span>
        <button style={styles.closeBtn} onClick={() => setAlert({ show: false, message: "" })}>&times;</button>
      </div>
      <main style={styles.main}>
        <div style={window.innerWidth <= 900 ? { ...styles.card, ...styles['@media (maxWidth: 900px)'].card } : styles.card}>
          <div style={window.innerWidth <= 900 ? { ...styles.imageBox, ...styles['@media (maxWidth: 900px)'].imageBox } : styles.imageBox}>
            <img
              src="https://i.postimg.cc/mDwrMJHk/N-n.png"
              alt="Minh họa dịch vụ"
              style={styles.image}
            />
          </div>
          <form
            style={window.innerWidth <= 900 ? { ...styles.formBox, ...styles['@media (maxWidth: 900px)'].formBox } : styles.formBox}
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <h2 style={styles.h2}>Đặt lịch dịch vụ</h2>
            <label style={styles.label}>
              Dịch vụ <span style={styles.required}>*</span>
            </label>
            <select
              name="dichvu"
              style={styles.select}
              value={form.dichvu}
              onChange={handleChange}
              required
            >
              <option value="">-- Chọn dịch vụ --</option>
              <option value="Tư Vấn">Tư Vấn</option>
              <option value="Xét Nghiệm">Xét Nghiệm</option>
            </select>
            <button
              type="submit"
              style={buttonHover ? { ...styles.button, ...styles.buttonHover } : styles.button}
              onMouseEnter={() => setButtonHover(true)}
              onMouseLeave={() => setButtonHover(false)}
            >
              Tiếp tục
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default DatLichDichVu; 