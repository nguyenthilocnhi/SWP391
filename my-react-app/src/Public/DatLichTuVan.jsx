import React, { useState, useEffect } from "react";
import HeaderCustomer from "../components/HeaderCustomer";
import { useNavigate } from "react-router-dom";

const styles = {
  page: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    background: "#f0fdf4",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    width: "100vw",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  },
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f0fdf4",
    padding: 0,
  },
  card: {
    background: "#fff",
    padding: 32,
    borderRadius: 24,
    boxShadow: "0 8px 20px rgba(34,197,94,0.1)",
    maxWidth: 600,
    width: "100%",
    border: "2px solid #34D399",
    margin: "140px auto 40px auto",
  },
  h2: {
    textAlign: "center",
    marginBottom: 24,
    color: "#059669",
    fontWeight: 800,
    fontSize: 28,
    letterSpacing: 1,
  },
  formRow: {
    display: "flex",
    gap: 20,
    marginBottom: 0,
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
  },
  formCol: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: 0,
    maxWidth: 600,
    width: "100%",
  },
  label: {
    fontWeight: 600,
    marginTop: 16,
    display: "block",
    color: "#065f46",
    fontSize: 15,
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: 10,
    margin: "7px 0 0 0",
    border: "1px solid #a7f3d0",
    borderRadius: 8,
    fontSize: 14,
    boxSizing: "border-box",
    background: "#f0fdf4",
    color: "#15803d",
    marginBottom: 0,
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    textAlign: "left",
  },
  select: {
    width: "100%",
    padding: 10,
    margin: "7px 0 0 0",
    border: "1px solid #a7f3d0",
    borderRadius: 8,
    fontSize: 14,
    boxSizing: "border-box",
    background: "#f0fdf4",
    color: "#15803d",
    transition: "border-color 0.2s, box-shadow 0.2s",
    outline: "none",
    textAlign: "left",
  },
  textarea: {
    width: "100%",
    padding: 10,
    margin: "7px 0 0 0",
    border: "1px solid #a7f3d0",
    borderRadius: 8,
    fontSize: 14,
    boxSizing: "border-box",
    background: "#f0fdf4",
    color: "#15803d",
    transition: "border-color 0.2s, box-shadow 0.2s",
    outline: "none",
    textAlign: "left",
  },
  button: {
    margin: "28px 0 0 0",
    width: "100%",
    background: "linear-gradient(90deg, #22c55e 0%, #10b981 100%)",
    color: "white",
    padding: 14,
    border: "none",
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 17,
    cursor: "pointer",
    transition: "background 0.3s",
    textAlign: "center",
  },
  buttonHover: {
    backgroundColor: "#059669",
  },
  required: {
    color: "#ef4444",
    fontWeight: 700,
    marginLeft: 2,
  },
  dateDisplay: {
    marginTop: 5,
    color: "#10B981",
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 0,
  },
  '@media (maxWidth: 700px)': {
    card: {
      padding: 16,
    },
    formRow: {
      flexDirection: "column",
      gap: 0,
    },
    formCol: {
      width: "100%",
    },
  },
};

function DatLichTuVan() {
  const [form, setForm] = useState({
    hoten: "",
    sdt: "",
    ngay: "",
    gio: "",
    hinhThuc: "Trực tiếp",
    loaiTuVan: "",
    ghichu: "",
  });
  const [dateDisplay, setDateDisplay] = useState("");
  const [buttonHover, setButtonHover] = useState(false);
  const [minDate, setMinDate] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = "Đặt Lịch Tư Vấn";
    setForm((prev) => ({
      ...prev,
      hoten: localStorage.getItem("tempHoTen") || "",
      sdt: localStorage.getItem("tempSDT") || "",
    }));
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
  }, []);

  useEffect(() => {
    if (form.ngay) {
      setDateDisplay(`Ngày đã chọn: ${formatDate(form.ngay)}`);
    } else {
      setDateDisplay("");
    }
  }, [form.ngay]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { hoten, sdt, ngay, gio, hinhThuc, loaiTuVan, ghichu } = form;
    if (!hoten || !sdt || !ngay || !gio || !loaiTuVan) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }
    const selectedDate = new Date(ngay);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      alert("Không thể đặt lịch cho ngày trong quá khứ. Vui lòng chọn ngày từ hôm nay trở đi.");
      return;
    }
    // --- Gọi API đặt lịch tư vấn ---
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bạn cần đăng nhập để đặt lịch!');
      navigate('/login');
      return;
    }
    const payload = {
      appointmentDate: new Date(`${ngay}T${gio}:00`).toISOString(),
      consultationType: loaiTuVan,
      consultationMethod: hinhThuc,
      note: ghichu || ""
    };
    fetch('https://api-gender2.purintech.id.vn/api/Appointment/consult-appointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    })
      .then(res => {
        if (!res.ok) {
          if (res.status === 401) {
            alert('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!');
            localStorage.removeItem('token');
            navigate('/login');
            throw new Error('Unauthorized');
          }
          return res.json().then(err => { throw new Error(err.message || JSON.stringify(err)); });
        }
        return res.json();
      })
      .then(data => {
        alert(data.message || "Đặt lịch thành công!");
        localStorage.removeItem("tempHoTen");
        localStorage.removeItem("tempSDT");
        navigate("/customer/thanh-toan");
      })
      .catch(error => {
        if (error.message !== 'Unauthorized') {
          alert("Có lỗi xảy ra khi đặt lịch: " + error.message);
        }
        console.error("Lỗi:", error);
      });
  }

  return (
    <div style={styles.page}>
      <HeaderCustomer />
      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.h2}>Đặt Lịch Tư Vấn</h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div style={styles.formRow}>
              <div style={styles.formCol}>
                <label style={styles.label}>
                  Họ và tên <span style={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="hoten"
                  style={styles.input}
                  value={form.hoten}
                  onChange={handleChange}
                  required
                />
                <label style={styles.label}>
                  Ngày tư vấn <span style={styles.required}>*</span>
                </label>
                <input
                  type="date"
                  name="ngay"
                  style={styles.input}
                  value={form.ngay}
                  min={minDate}
                  onChange={handleChange}
                  required
                />
                <div style={styles.dateDisplay}>{dateDisplay}</div>
                <label style={styles.label}>Hình thức tư vấn</label>
                <select
                  name="hinhThuc"
                  style={styles.select}
                  value={form.hinhThuc}
                  onChange={handleChange}
                >
                  <option value="Trực tiếp">Trực tiếp</option>
                  <option value="Online">Online</option>
                </select>
              </div>
              <div style={styles.formCol}>
                <label style={styles.label}>
                  Số điện thoại <span style={styles.required}>*</span>
                </label>
                <input
                  type="tel"
                  name="sdt"
                  style={styles.input}
                  value={form.sdt}
                  onChange={handleChange}
                  required
                />
                <label style={styles.label}>
                  Giờ tư vấn <span style={styles.required}>*</span>
                </label>
                <input
                  type="time"
                  name="gio"
                  style={styles.input}
                  value={form.gio}
                  onChange={handleChange}
                  required
                />
                <label style={styles.label}>
                  Loại tư vấn <span style={styles.required}>*</span>
                </label>
                <select
                  name="loaiTuVan"
                  style={styles.select}
                  value={form.loaiTuVan}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Chọn loại tư vấn --</option>
                  <option value="Tư vấn trước khi làm xét nghiệm STI">Tư vấn trước khi làm xét nghiệm STI</option>
                  <option value="Tư vấn sau khi nhận kết quả xét nghiệm">Tư vấn sau khi nhận kết quả xét nghiệm</option>
                  <option value="Tư vấn xét nghiệm định kỳ">Tư vấn xét nghiệm định kỳ</option>
                  <option value="Tư vấn lựa chọn gói xét nghiệm phù hợp">Tư vấn lựa chọn gói xét nghiệm phù hợp</option>
                  <option value="Tư vấn cho cặp đôi trước QHTD không bao">Tư vấn cho cặp đôi trước QHTD không bao</option>
                  <option value="Tư vấn sức khỏe sinh sản">Tư vấn sức khỏe sinh sản</option>
                  <option value="Tư vấn tình dục an toàn">Tư vấn tình dục an toàn</option>
                  <option value="Tư vấn dậy thì và sức khỏe giới tính cho thanh thiếu niên">Tư vấn dậy thì và sức khỏe giới tính cho thanh thiếu niên</option>
                </select>
              </div>
            </div>
            <label style={styles.label}>Ghi chú / Lý do</label>
            <textarea
              name="ghichu"
              style={styles.textarea}
              rows={3}
              placeholder="(Không bắt buộc)"
              value={form.ghichu}
              onChange={handleChange}
            />
            <button
              type="submit"
              style={buttonHover ? { ...styles.button, ...styles.buttonHover } : styles.button}
              onMouseEnter={() => setButtonHover(true)}
              onMouseLeave={() => setButtonHover(false)}
            >
              Đặt lịch
            </button>
            {message && <div style={{ color: message.includes("thành công") ? "#10B981" : "#EF4444", marginTop: "10px" }}>{message}</div>}
          </form>
        </div>
      </main>
    </div>
  );
}

export default DatLichTuVan; 