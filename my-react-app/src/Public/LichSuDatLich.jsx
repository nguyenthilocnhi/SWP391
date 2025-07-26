import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderCustomer from "../components/HeaderCustomer";
import Footer from "../components/Footer";

const styles = {
  page: {
    fontFamily: "'Segoe UI', sans-serif",
    background: "#f9f9f9",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    width: "100vw",
    boxSizing: "border-box",
  },
  container: {
    maxWidth: 1100,
    width: "100%",
    margin: "90px auto 40px auto",
    background: "#fff",
    padding: "30px 20px",
    borderRadius: 18,
    boxShadow: "0 6px 12px rgba(34,197,94,0.08)",
    border: "2px solid #bbf7d0",
  },
  h2: {
    textAlign: "left",
    color: "#15803d",
    marginBottom: 20,
    fontSize: 28,
    fontWeight: 800,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    overflowX: "auto",
    marginTop: 24,
    borderRadius: '16px 16px 0 0',
    boxShadow: '0 2px 12px rgba(52,211,153,0.08)',
    overflow: 'hidden',
  },
  th: {
    backgroundColor: "#22c55e",
    color: "#fff",
    textTransform: "none",
    fontWeight: 700,
    padding: "14px 16px",
    border: "none",
    fontSize: 16,
  },
  td: {
    padding: "14px 16px",
    border: "none",
    textAlign: "center",
    fontSize: 15,
    color: "#15803d",
  },
  status0: { color: '#f59e42', fontWeight: 600 }, // Chờ xử lý
  status1: { color: '#22c55e', fontWeight: 600 }, // Đã thanh toán
  status2: { color: '#ef4444', fontWeight: 600 }, // Đã hủy
};

function LichSuDatLich() {
  const [lichTongHop, setLichTongHop] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    Promise.all([
      fetch('https://api-gender2.purintech.id.vn/api/Appointment/test-appointments', {
        headers: {
          'accept': '*/*',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      }).then(res => res.json()),
      fetch('https://api-gender2.purintech.id.vn/api/Appointment/advice-appointments', {
        headers: {
          'accept': '*/*',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      }).then(res => res.json())
    ]).then(([testData, adviceData]) => {
      const testList = Array.isArray(testData?.obj) ? testData.obj.map(item => ({
        ...item,
        loaiDichVu: 'Xét nghiệm',
        tenDichVu: item.testName,
        thoiLuong: item.duration,
      })) : [];
      const adviceList = Array.isArray(adviceData?.obj) ? adviceData.obj.map(item => ({
        ...item,
        loaiDichVu: 'Tư vấn',
        tenDichVu: item.consultationType,
        thoiLuong: item.duration,
      })) : [];
      setLichTongHop([...testList, ...adviceList]);
    }).catch(() => setLichTongHop([]));
  }, []);

  // Hàm xóa lịch xét nghiệm
  const handleDeleteTestAppointment = (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa lịch xét nghiệm này?')) return;
    const token = localStorage.getItem('token');
    fetch(`https://api-gender2.purintech.id.vn/api/Appointment/test-appointment/${id}`, {
      method: 'DELETE',
      headers: {
        'accept': '*/*',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.code === 200) {
          setLichTongHop(prev => prev.filter(item => !(item.id === id && item.loaiDichVu === 'Xét nghiệm')));
          alert('Xóa thành công!');
        } else {
          alert('Xóa không thành công!');
        }
      })
      .catch(() => alert('Lỗi khi xóa lịch!'));
  };

  // Hàm xóa lịch tư vấn
  const handleDeleteAdviceAppointment = (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa lịch tư vấn này?')) return;
    const token = localStorage.getItem('token');
    fetch(`https://api-gender2.purintech.id.vn/api/Appointment/advice-appointment/${id}`, {
      method: 'DELETE',
      headers: {
        'accept': '*/*',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.code === 200) {
          setLichTongHop(prev => prev.filter(item => !(item.id === id && item.loaiDichVu === 'Tư vấn')));
          alert('Xóa thành công!');
        } else {
          alert('Xóa không thành công!');
        }
      })
      .catch(() => alert('Lỗi khi xóa lịch!'));
  };

  return (
    <div style={styles.page}>
      <HeaderCustomer />
      <div style={styles.container}>
        <h2 style={styles.h2}>Lịch dịch vụ đã đặt</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Loại dịch vụ</th>
              <th style={styles.th}>Tên khách</th>
              <th style={styles.th}>Số điện thoại</th>
              <th style={styles.th}>Tên dịch vụ</th>
              <th style={styles.th}>Thời gian</th>
              <th style={styles.th}>Thời lượng</th>
              <th style={styles.th}>Giá</th>
              <th style={styles.th}>Trạng thái</th>
              <th style={styles.th}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {lichTongHop.length === 0 ? (
              <tr><td colSpan={9} style={styles.td}>Không có lịch dịch vụ nào.</td></tr>
            ) : (
              lichTongHop.map(item => (
                <tr key={item.id + '-' + item.loaiDichVu}>
                  <td style={styles.td}>{item.loaiDichVu}</td>
                  <td style={styles.td}>{item.fullName}</td>
                  <td style={styles.td}>{item.phoneNumber || item.phone}</td>
                  <td style={styles.td}>{item.tenDichVu}</td>
                  <td style={styles.td}>{new Date(item.appointmentDate).toLocaleString('vi-VN')}</td>
                  <td style={styles.td}>{item.thoiLuong}</td>
                  <td style={styles.td}>{item.price?.toLocaleString('vi-VN')}.000 VND</td>
                  <td style={item.serviceStatus === 1 ? styles.status1 : item.serviceStatus === 2 ? styles.status2 : styles.status0}>
                    {item.serviceStatus === 1 ? 'Đã thanh toán' : item.serviceStatus === 2 ? 'Đã hủy' : 'Chờ xử lý'}
                  </td>
                  <td style={styles.td}>
                    {item.loaiDichVu === 'Xét nghiệm' ? (
                      <button style={{background:'#ef4444',color:'#fff',border:'none',borderRadius:4,padding:'6px 12px',cursor:'pointer'}} onClick={() => handleDeleteTestAppointment(item.id)}>
                        Xóa
                      </button>
                    ) : item.loaiDichVu === 'Tư vấn' ? (
                      <button style={{background:'#ef4444',color:'#fff',border:'none',borderRadius:4,padding:'6px 12px',cursor:'pointer'}} onClick={() => handleDeleteAdviceAppointment(item.id)}>
                        Xóa
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default LichSuDatLich; 