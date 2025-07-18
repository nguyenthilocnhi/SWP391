import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderCustomer from "../components/HeaderCustomer";
import Footer from "../components/Footer";

const STATUS_LABELS = {
  "Chờ xử lý": { label: "Chờ xử lý", className: "pending" },
  "Đã xác nhận": { label: "Đã xác nhận", className: "confirmed" },
  "Đã hủy": { label: "Đã hủy", className: "cancelled" },
};

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
    maxWidth: 900,
    width: "100%",
    margin: "90px auto 40px auto",
    background: "#fff",
    padding: "30px 20px",
    borderRadius: 12,
    boxShadow: "0 6px 12px rgba(34,197,94,0.08)",
    border: "2px solid #bbf7d0",
  },
  h2: {
    textAlign: "center",
    color: "#2f855a",
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 600,
  },
  filterBar: {
    marginBottom: 25,
    padding: "18px 20px",
    background: "linear-gradient(135deg, #f0fff4 0%, #e6fffa 100%)",
    borderRadius: 12,
    boxShadow: "0 4px 15px rgba(47, 133, 90, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    border: "1px solid #d1fae5",
    gap: 10,
  },
  filterLabel: {
    fontWeight: 600,
    color: "#2f855a",
    fontSize: 15,
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  filterSelect: {
    padding: "10px 15px",
    border: "2px solid #d1fae5",
    borderRadius: 8,
    backgroundColor: "white",
    fontSize: 14,
    fontWeight: 500,
    color: "#374151",
    cursor: "pointer",
    minWidth: 160,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    overflowX: "auto",
    marginTop: 24,
    borderRadius: '16px 16px 0 0',
    border: '2px solid #34d399',
    boxShadow: '0 2px 12px rgba(52,211,153,0.08)',
    overflow: 'hidden',
  },
  th: {
    backgroundColor: "#f0fff4",
    color: "#2f855a",
    textTransform: "uppercase",
    fontWeight: 600,
    padding: "14px 16px",
    border: "1px solid #e2e8f0",
    fontSize: 15,
  },
  td: {
    padding: "14px 16px",
    border: "1px solid #e2e8f0",
    textAlign: "left",
    fontSize: 15,
    color: "#333",
  },
  status: {
    padding: "4px 10px",
    borderRadius: 16,
    fontSize: 13,
    fontWeight: 600,
    display: "inline-block",
  },
  btnView: {
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: 4,
    padding: "6px 10px",
    fontSize: 14,
    cursor: "pointer",
    margin: "0 2px",
    transition: "all 0.3s",
  },
  btnViewHover: {
    backgroundColor: "#2563eb",
    transform: "scale(1.05)",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(31, 41, 55, 0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 32,
    borderRadius: 16,
    width: "90%",
    maxWidth: 500,
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
    fontFamily: "'Inter', sans-serif",
    animation: "fadeIn 0.3s ease-in-out",
  },
  modalTitle: {
    fontSize: 22,
    marginBottom: 20,
    color: "#111827",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  modalInfo: {
    flex: 1,
  },
  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 24,
  },
  closeButton: {
    backgroundColor: "#e11d48",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: 6,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
};

function LichSuDatLich() {
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [adviceAppointments, setAdviceAppointments] = useState([]);
  const [loadingAdvice, setLoadingAdvice] = useState(true);
  const [filter, setFilter] = useState("");

  // Lấy danh sách lịch xét nghiệm từ API
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoadingAppointments(false);
      return;
    }
    fetch('https://api-gender2.purintech.id.vn/api/Appointment/test-appointments', {
      method: 'GET',
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Lỗi lấy dữ liệu');
        return res.json();
      })
      .then(data => {
        setAppointments(data.obj || []);
        setLoadingAppointments(false);
      })
      .catch(err => {
        setLoadingAppointments(false);
      });
  }, []);

  // Lấy danh sách lịch tư vấn từ API
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoadingAdvice(false);
      setAdviceAppointments([]);
      return;
    }
    fetch('https://api-gender2.purintech.id.vn/api/Appointment/advice-appointments', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        let newList = [];
        if (Array.isArray(data)) newList = data;
        else if (Array.isArray(data.obj)) newList = data.obj;
        setAdviceAppointments(newList);
        setLoadingAdvice(false);
      })
      .catch(() => {
        setAdviceAppointments([]);
        setLoadingAdvice(false);
      });
  }, []);

  // Thêm hàm xử lý xóa lịch xét nghiệm từ API
  function handleDeleteAppointment(id) {
    if (!window.confirm("Bạn có chắc muốn xóa lịch xét nghiệm này?")) return;
    const token = localStorage.getItem('token');
    fetch(`https://api-gender2.purintech.id.vn/api/Appointment/test-appointment/${id}`, {
      method: 'DELETE',
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Xóa không thành công');
        // Xóa thành công, cập nhật lại danh sách
        setAppointments(prev => prev.filter(item => item.id !== id));
        alert('Xóa thành công!');
      })
      .catch(err => {
        alert('Lỗi: ' + err.message);
      });
  }

  function handleDeleteAdviceAppointment(id) {
    if (!window.confirm("Bạn có chắc muốn xóa lịch tư vấn này?")) return;
    const token = localStorage.getItem('token');
    fetch(`https://api-gender2.purintech.id.vn/api/Appointment/advice-appointment/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Xóa không thành công');
        // Xóa thành công, cập nhật lại danh sách
        setAdviceAppointments(prev => prev.filter(item => item.id !== id));
        alert('Xóa thành công!');
      })
      .catch(err => {
        alert('Lỗi: ' + err.message);
      });
  }

  // Gộp dữ liệu lịch xét nghiệm và lịch tư vấn từ API
  const mergedAppointments = [
    ...Array.isArray(appointments) ? appointments.map(item => ({
      id: item.id,
      fullName: item.fullName,
      phone: item.phoneNumber,
      appointmentDate: item.appointmentDate,
      serviceType: 'Xét nghiệm',
      serviceName: item.testName,
      note: item.note,
    })) : [],
    ...Array.isArray(adviceAppointments) ? adviceAppointments.map(item => ({
      id: item.id,
      fullName: item.fullName,
      phone: item.phone || item.phoneNumber || "",
      appointmentDate: item.appointmentDate,
      serviceType: 'Tư vấn',
      serviceName: item.consultationType,
      note: item.note,
      meetLink: item.meetLink,
      contactType: item.contactType,
    })) : []
  ].sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));

  return (
    <div style={styles.page}>
      <HeaderCustomer />
      <div style={styles.container}>
        <h2 style={styles.h2}>Lịch Sử Đặt Lịch</h2>
        <div style={styles.filterBar}>
          <label style={styles.filterLabel}>
            Loại dịch vụ:
            <select
              style={styles.filterSelect}
              value={filter}
              onChange={e => setFilter(e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="Xét nghiệm">Xét nghiệm</option>
              <option value="Tư vấn">Tư vấn</option>
            </select>
          </label>
        </div>
        <div style={{overflowX: 'auto'}}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Ngày hẹn</th>
                <th style={styles.th}>Dịch vụ</th>
                <th style={styles.th}>Tên dịch vụ</th>
                <th style={styles.th}>Họ tên</th>
                <th style={styles.th}>SĐT</th>
                <th style={styles.th}>Ghi chú</th>
                <th style={styles.th}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {mergedAppointments.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{textAlign: 'center', color: '#888'}}>Không có lịch đặt nào.</td>
                </tr>
              ) : (
                mergedAppointments
                  .filter(item => !filter || item.serviceType === filter)
                  .map(item => (
                    <tr key={item.serviceType + '-' + item.id}>
                      <td style={styles.td}>{new Date(item.appointmentDate).toLocaleString()}</td>
                      <td style={styles.td}>{item.serviceType}</td>
                      <td style={styles.td}>{item.serviceName}</td>
                      <td style={styles.td}>{item.fullName}</td>
                      <td style={styles.td}>{item.phone}</td>
                      <td style={styles.td}>{item.note}</td>
                      <td style={styles.td}>
                        {item.serviceType === 'Tư vấn' && item.contactType === 2 && item.meetLink ? (
                          <a href={item.meetLink} target="_blank" rel="noopener noreferrer" style={{color: '#d97706', fontWeight: 'bold', wordBreak: 'break-all'}}>Link Meet</a>
                        ) : '-'}
                      </td>
                      <td style={styles.td}>
                        <button
                          style={{...styles.btnView, backgroundColor: '#ef4444'}}
                          onClick={() => {
                            if (item.serviceType === 'Xét nghiệm') handleDeleteAppointment(item.id);
                            else handleDeleteAdviceAppointment(item.id);
                          }}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LichSuDatLich; 