import React, { useState, useEffect } from "react";
import HeaderCustomer from "../components/HeaderCustomer";
import { useNavigate } from "react-router-dom";

const styles = {
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
    borderRadius: 20,
    boxShadow: "0 8px 20px rgba(34,197,94,0.1)",
    maxWidth: 600,
    width: "100%",
    border: "2px solid #34D399",
    margin: "120px auto 0 auto",
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
  },
  input: {
    width: "100%",
    padding: 10,
    marginTop: 6,
    border: "1px solid #a7f3d0",
    borderRadius: 8,
    fontSize: 14,
    boxSizing: "border-box",
    background: "#f0fdf4",
    color: "#15803d",
    marginBottom: 0,
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  select: {
    width: "100%",
    padding: 10,
    marginTop: 6,
    border: "1px solid #a7f3d0",
    borderRadius: 8,
    fontSize: 14,
    boxSizing: "border-box",
    background: "#f0fdf4",
    color: "#15803d",
    transition: "border-color 0.2s, box-shadow 0.2s",
    outline: "none",
  },
  textarea: {
    width: "100%",
    padding: 10,
    marginTop: 6,
    border: "1px solid #a7f3d0",
    borderRadius: 8,
    fontSize: 14,
    boxSizing: "border-box",
    background: "#f0fdf4",
    color: "#15803d",
    transition: "border-color 0.2s, box-shadow 0.2s",
    outline: "none",
  },
  button: {
    marginTop: 24,
    width: "100%",
    padding: 12,
    backgroundColor: "#10B981",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background-color 0.3s",
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
};

function DatLichXetNghiem() {
  const [form, setForm] = useState({
    ngay: "",
    gio: "",
    loaiXetNghiem: "",
    ghichu: "",
  });
  const [dateDisplay, setDateDisplay] = useState("");
  const [buttonHover, setButtonHover] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [testTypes, setTestTypes] = useState([]); // Thêm state cho loại xét nghiệm
  const [selectedService, setSelectedService] = useState(null); // Thêm state cho dịch vụ được chọn
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Đặt Lịch Xét Nghiệm";
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);

    // Gọi API lấy loại xét nghiệm
    const token = localStorage.getItem('token');
    fetch('https://api-gender2.purintech.id.vn/api/Service/test-services', {
      headers: {
        'accept': '*/*',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.obj) {
          setTestTypes(data.obj);
        } else {
          setTestTypes([]);
        }
      })
      .catch(() => setTestTypes([]));
  }, []);

  useEffect(() => {
    if (form.ngay) {
      setDateDisplay(`Ngày đã chọn: ${formatDate(form.ngay)}`);
    } else {
      setDateDisplay("");
    }
  }, [form.ngay]);

  // Thêm useEffect để lấy thông tin chi tiết dịch vụ khi chọn loại xét nghiệm
  useEffect(() => {
    if (form.loaiXetNghiem) {
      const selectedTest = testTypes.find(test => test.testName === form.loaiXetNghiem);
      if (selectedTest) {
        // Gọi API lấy thông tin chi tiết
        const token = localStorage.getItem('token');
        fetch(`https://api-gender2.purintech.id.vn/api/Service/test-service/${selectedTest.id}`, {
          headers: {
            'accept': '*/*',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          }
        })
          .then(res => res.json())
          .then(data => {
            if (data && data.obj) {
              setSelectedService(data.obj);
            }
          })
          .catch(() => setSelectedService(null));
      }
    } else {
      setSelectedService(null);
    }
  }, [form.loaiXetNghiem, testTypes]);

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
    const { ngay, gio, loaiXetNghiem } = form;
    if (!ngay || !gio || !loaiXetNghiem) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bạn cần đăng nhập để đặt lịch!');
      navigate('/login');
      return;
    }

    const payload = {
      appointmentDate: new Date(`${form.ngay}T${form.gio}:00`).toISOString(),
      testServiceId: selectedService?.id || 1, // Sử dụng ID từ dịch vụ được chọn
      note: form.ghichu || ""
    };

    fetch('https://api-gender2.purintech.id.vn/api/Appointment/test-appointment', {
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
            // Token hết hạn hoặc không hợp lệ
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
        // Lưu thông tin lịch hẹn vào localStorage để trang thanh toán lấy tên dịch vụ
        const lichMoi = {
          ...payload,
          serviceName: selectedService?.testName,
          gia: selectedService?.price,
          gio: form.gio,
          ngay: form.ngay,
          id: selectedService?.id
        };
        const lichDat = JSON.parse(localStorage.getItem('lichDat')) || [];
        lichDat.push(lichMoi);
        localStorage.setItem('lichDat', JSON.stringify(lichDat));
        alert(data.message || "Đặt lịch thành công!");
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
          <h2 style={styles.h2}>Đặt Lịch Xét Nghiệm</h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div style={styles.formRow}>
              <div style={styles.formCol}>
                <label style={styles.label}>
                  Ngày tháng năm <span style={styles.required}>*</span>
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
                <label style={styles.label}>Ghi chú / Yêu cầu đặc biệt</label>
                <textarea
                  name="ghichu"
                  style={styles.textarea}
                  rows={3}
                  placeholder="(Không bắt buộc)"
                  value={form.ghichu}
                  onChange={handleChange}
                />
              </div>
              <div style={styles.formCol}>
                <label style={styles.label}>
                  Giờ xét nghiệm <span style={styles.required}>*</span>
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
                  Loại xét nghiệm <span style={styles.required}>*</span>
                </label>
                <select
                  name="loaiXetNghiem"
                  style={styles.select}
                  value={form.loaiXetNghiem}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Chọn loại --</option>
                  {testTypes.map((item) => (
                    <option key={item.id} value={item.testName}>{item.testName}</option>
                  ))}
                </select>
              </div>
            </div>
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
      </main>
    </div>
  );
}

export default DatLichXetNghiem; 