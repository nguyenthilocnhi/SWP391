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
    background: "#059669", // Đổi từ backgroundColor sang background
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
  const [services, setServices] = useState([]);
  const [showMeetLink, setShowMeetLink] = useState(false);
  const [displayedMeetLink, setDisplayedMeetLink] = useState("");

  // Thêm mảng 12 link Meet ở đầu component
  const meetLinks = [
    "https://meet.google.com/oer-ykxb-mbj",
    "https://meet.google.com/hvx-pqoa-tyy",
    "https://meet.google.com/ejx-zdvn-avr",
    "https://meet.google.com/ceb-bqzm-ksd",
    "https://meet.google.com/hsk-wgks-ydd",
    "https://meet.google.com/ixr-oqur-rxu",
    "https://meet.google.com/tpv-zgof-ogb",
    "https://meet.google.com/mhk-zaie-pjc",
    "https://meet.google.com/brf-nmfp-row",
    "https://meet.google.com/gro-eqfo-fkw",
    "https://meet.google.com/ggu-wjuc-hst",
    "https://meet.google.com/hqr-eovq-yqr"
  ];

  useEffect(() => {
    document.title = "Đặt Lịch Tư Vấn";
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);

    // Fetch danh sách dịch vụ tư vấn
    fetch('https://api-gender2.purintech.id.vn/api/Appointment/advice-names')
      .then(res => res.json())
      .then(data => {
        console.log("DANH SÁCH DỊCH VỤ:", data); // Thêm log để kiểm tra dữ liệu trả về
        if (Array.isArray(data)) setServices(data);
        else if (Array.isArray(data.obj)) setServices(data.obj);
        else setServices([]);
      })
      .catch(() => setServices([]));
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

  const datLichTuVan = async (data) => {
    try {
      const response = await fetch('https://api-gender2.purintech.id.vn/api/Appointment/advice-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Nếu cần token:
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Có lỗi khi đặt lịch tư vấn');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ngay, gio, hinhThuc, loaiTuVan, ghichu } = form;
    if (!ngay || !gio || !loaiTuVan) {
      setMessage('Vui lòng điền đầy đủ thông tin bắt buộc.');
      return;
    }
    if (isNaN(Number(loaiTuVan))) {
      setMessage('Vui lòng chọn loại tư vấn hợp lệ.');
      return;
    }
    const selectedDate = new Date(ngay);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setMessage('Không thể đặt lịch cho ngày trong quá khứ. Vui lòng chọn ngày từ hôm nay trở đi.');
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bạn cần đăng nhập để đặt lịch!');
      navigate('/login');
      return;
    }
    // Xác định contactType từ hinhThuc
    let contactType = 1; // 1: Trực tiếp, 2: Online
    let meetLink = "";
    if (hinhThuc === 'Online') {
      contactType = 2;
      // Chọn ngẫu nhiên 1 link Meet
      meetLink = meetLinks[Math.floor(Math.random() * meetLinks.length)];
    }
    const payload = {
      appointmentDate: new Date(`${ngay}T${gio}:00`).toISOString(),
      adviceServiceId: Number(loaiTuVan),
      note: ghichu || "",
      contactType: contactType,
      ...(meetLink && { meetLink })
    };
    console.log('Payload gửi lên:', payload);
    fetch('https://api-gender2.purintech.id.vn/api/Appointment/advice-appointment', {
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
        console.log('Response đặt lịch:', data);
        setMessage(data.message || 'Đặt lịch thành công!');
        
        // Lưu lịch vào localStorage
        const lich = {
          ngay: form.ngay,
          gio: form.gio,
          hinhThuc: form.hinhThuc,
          loaiTuVan: form.loaiTuVan,
          ghichu: form.ghichu,
          trangThai: "Chờ xử lý",
          id: data.obj?.id || null,
          ...(meetLink && { meetLink })
        };
        
        const danhSachLich = JSON.parse(localStorage.getItem('lichDat') || '[]');
        danhSachLich.push(lich);
        localStorage.setItem('lichDat', JSON.stringify(danhSachLich));
        
        // Nếu là online, hiển thị link Meet cho khách trước khi chuyển trang
        if (hinhThuc === 'Online' && meetLink) {
          setShowMeetLink(true);
          setDisplayedMeetLink(meetLink);
          localStorage.setItem('lastMeetLink', meetLink);
          setTimeout(() => {
            navigate('/customer/thanh-toan', { state: { meetLink } });
          }, 3500); // Hiển thị link 3.5s rồi chuyển trang
          return;
        }
        
        // Reset form và chuyển trang
        setForm({
          ngay: '',
          gio: '',
          hinhThuc: 'Trực tiếp',
          loaiTuVan: '',
          ghichu: '',
        });
        navigate('/customer/thanh-toan');
      })
      .catch(error => {
        if (error.message !== 'Unauthorized') {
          setMessage('Có lỗi xảy ra khi đặt lịch: ' + error.message);
        }
        console.error('Lỗi:', error);
      });
  };

  return (
    <div style={styles.page}>
      <HeaderCustomer />
      {/* Hiển thị link Meet khi đặt lịch online */}
      {showMeetLink && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#10B981',
          color: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          zIndex: 1000,
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <h3 style={{ margin: '0 0 15px 0' }}>Link Meet của bạn:</h3>
          <p style={{ margin: '0 0 15px 0', wordBreak: 'break-all' }}>{displayedMeetLink}</p>
          <p style={{ margin: '0', fontSize: '14px' }}>Chuyển đến trang thanh toán sau 3 giây...</p>
        </div>
      )}
      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.h2}>Đặt Lịch Tư Vấn</h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div style={styles.formRow}>
              <div style={styles.formCol}>
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
                {/* Loại tư vấn */}
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
                  {Array.isArray(services) && services.map(item => (
                    <option key={item.id} value={item.id}>{item.consultationType}</option>
                  ))}
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