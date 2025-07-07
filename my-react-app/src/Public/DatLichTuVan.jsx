import React, { useState, useEffect } from "react";
import HeaderCustomer from "../components/HeaderCustomer";
import { useNavigate } from "react-router-dom";

const styles = {
  page: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    background: "linear-gradient(135deg, #e0f7fa 0%, #e6ffe6 100%)",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
  },
  main: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: "calc(100vh - 128px)",
    padding: 0,
    background: "transparent",
  },
  card: {
    width: "100%",
    maxWidth: 500,
    minHeight: 0,
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 8px 32px rgba(34,197,94,0.10)",
    display: "block",
    overflow: "hidden",
    margin: "120px auto 0 auto",
  },
  imageBox: {
    flex: 1,
    minWidth: 340,
    background: "#f0fdfa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: "4px 0 0 4px",
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
    minWidth: 260,
    maxWidth: 420,
    width: "100%",
    background: "#fff",
    padding: 12,
    borderRadius: "0 4px 4px 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: "none",
  },
  h2: {
    textAlign: "center",
    marginBottom: 32,
    color: "#15803d",
    fontWeight: 800,
    fontSize: 30,
    letterSpacing: 1,
    textShadow: "0 2px 8px #e0f7fa",
  },
  label: {
    fontWeight: 600,
    marginTop: 18,
    display: "block",
    color: "#047857",
    fontSize: 16,
  },
  input: {
    width: "100%",
    padding: "13px 16px",
    marginTop: 7,
    border: "1.5px solid #bbf7d0",
    borderRadius: 10,
    fontSize: 16,
    fontFamily: "inherit",
    boxSizing: "border-box",
    background: "#f6fff9",
    color: "#15803d",
    marginBottom: 0,
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  inputFocus: {
    borderColor: "#22c55e",
    boxShadow: "0 0 0 2px #bbf7d0",
  },
  select: {
    width: "100%",
    padding: "13px 16px",
    marginTop: 7,
    border: "1.5px solid #bbf7d0",
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: "#f6fff9",
    color: "#15803d",
    transition: "border-color 0.2s, box-shadow 0.2s",
    outline: "none",
  },
  textarea: {
    width: "100%",
    padding: "13px 16px",
    marginTop: 7,
    border: "1.5px solid #bbf7d0",
    borderRadius: 10,
    fontSize: 16,
    fontFamily: "inherit",
    background: "#f6fff9",
    color: "#15803d",
    transition: "border-color 0.2s, box-shadow 0.2s",
    outline: "none",
  },
  button: {
    marginTop: 32,
    width: "100%",
    background: "linear-gradient(90deg, #22c55e 0%, #10b981 100%)",
    color: "white",
    padding: 16,
    border: "none",
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 18,
    cursor: "pointer",
    transition: "background 0.3s, box-shadow 0.3s",
    boxShadow: "0 2px 8px rgba(34,197,94,0.10)",
    letterSpacing: 1,
  },
  buttonHover: {
    background: "linear-gradient(90deg, #15803d 0%, #22c55e 100%)",
    boxShadow: "0 4px 16px rgba(34,197,94,0.18)",
  },
  required: {
    color: "#ef4444",
    fontWeight: 700,
    marginLeft: 2,
  },
  dateDisplay: {
    marginTop: 6,
    color: "#10B981",
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 0,
  },
  '@media (maxWidth: 600px)': {
    formContainer: {
      padding: 18,
      borderRadius: 12,
    },
    h2: {
      fontSize: 22,
      marginBottom: 18,
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

  useEffect(() => {
    document.title = "Đặt Lịch Tư Vấn";
    // Tự động điền dữ liệu khi trang tải
    setForm((prev) => ({
      ...prev,
      hoten: localStorage.getItem("tempHoTen") || "",
      sdt: localStorage.getItem("tempSDT") || "",
    }));
    // Giới hạn ngày chỉ cho phép chọn từ hiện tại trở đi
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
  }, []);

  // Hiển thị ngày đã chọn
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

  function handleSubmit(e) {
    e.preventDefault();
    const { hoten, sdt, ngay, gio, hinhThuc, loaiTuVan, ghichu } = form;
    // Kiểm tra ngày đã chọn có phải là ngày trong quá khứ không
    const selectedDate = new Date(ngay);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      alert("Không thể đặt lịch cho ngày trong quá khứ. Vui lòng chọn ngày từ hôm nay trở đi.");
      return;
    }
    if (!hoten.trim() || !sdt.trim() || !ngay || !gio || !loaiTuVan) {
      alert("Vui lòng điền đầy đủ các trường bắt buộc.");
      return;
    }
    // Chuyển đổi ngày sang định dạng dd/mm/yyyy
    const ngayFormat = formatDate(ngay);
    // Tạo link Google Meet nếu chọn Online
    let googleMeetLink = "";
    if (hinhThuc === "Online") {
      const randomCode = Math.random().toString(36).substring(2, 12);
      googleMeetLink = `https://meet.google.com/${randomCode.slice(0, 3)}-${randomCode.slice(3, 6)}-${randomCode.slice(6, 9)}`;
      localStorage.setItem("latestMeetLink", googleMeetLink);
    } else {
      localStorage.removeItem("latestMeetLink");
    }
    const lich = {
      hoTen: hoten,
      sdt,
      ngay: ngayFormat,
      gio,
      hinhThuc,
      loaiTuVan,
      dichVu: "Tư Vấn",
      lyDo: ghichu,
      trangThai: "Chờ xử lý",
    };
    const danhSach = JSON.parse(localStorage.getItem("lichDat")) || [];
    danhSach.push(lich);
    localStorage.setItem("lichDat", JSON.stringify(danhSach));
    // Xoá dữ liệu tạm
    localStorage.removeItem("tempHoTen");
    localStorage.removeItem("tempSDT");
    // Chuyển trang
    navigate("/customer/thanh-toan");
  }

  return (
    <div style={styles.page}>
      <HeaderCustomer />
      <main style={styles.main}>
        <div style={styles.card}>
          <div style={styles.formBox}>
            <h2 style={styles.h2}>Đặt Lịch Tư Vấn</h2>
            <form onSubmit={handleSubmit} autoComplete="off">
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
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DatLichTuVan; 