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
  headerSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    flexWrap: "wrap",
    gap: 15,
  },
  h2: {
    textAlign: "left",
    color: "#15803d",
    marginBottom: 0,
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
  status0: { color: '#f59e42', fontWeight: 600 },
  status1: { color: '#22c55e', fontWeight: 600 },
  status2: { color: '#ef4444', fontWeight: 600 },
};

function LichSuDatLich() {
  const [lichTongHop, setLichTongHop] = useState([]);
  const [filteredLich, setFilteredLich] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  const filterAppointments = (filterType, statusType = 'all') => {
  setActiveFilter(filterType);
  setStatusFilter(statusType);
  setCurrentPage(1);

  localStorage.setItem('activeFilter', filterType);
  localStorage.setItem('statusFilter', statusType);

  let filtered = lichTongHop;
  if (filterType !== 'all') {
    filtered = filtered.filter(item => item.loaiDichVu === filterType);
  }
  if (statusType !== 'all') {
    filtered = filtered.filter(item => getStatusText(item.serviceStatus, item.loaiDichVu) === statusType);
  }
  setFilteredLich(filtered);
};

const filterByStatus = (statusType) => {
  setStatusFilter(statusType);
  setCurrentPage(1);
  localStorage.setItem('statusFilter', statusType);

  let filtered = lichTongHop;
  if (activeFilter !== 'all') {
    filtered = filtered.filter(item => item.loaiDichVu === activeFilter);
  }
  if (statusType !== 'all') {
    filtered = filtered.filter(item => getStatusText(item.serviceStatus, item.loaiDichVu) === statusType);
  }
  setFilteredLich(filtered);
};


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLich.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLich.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getStatusText = (serviceStatus, loaiDichVu) => {
    if (loaiDichVu === 'Xét nghiệm') {
      switch (serviceStatus) {
        case 0: return 'Chờ xác nhận';
        case 1: return 'Đã xác nhận';
        case 2: return 'Đã lấy mẫu';
        case 3: return 'Chờ kết quả';
        case 4: return 'Đã trả kết quả';
        default: return 'Chờ xử lý';
      }
    } else {
      switch (serviceStatus) {
        case 1: return 'Đã thanh toán';
        case 2: return 'Đã hủy';
        default: return 'Chờ xử lý';
      }
    }
  };

  const getStatusStyle = (serviceStatus, loaiDichVu) => {
    if (loaiDichVu === 'Xét nghiệm') {
      switch (serviceStatus) {
        case 0: return styles.status0;
        case 1: return styles.status1;
        case 2: return styles.status1;
        case 3: return styles.status0;
        case 4: return styles.status1;
        default: return styles.status0;
      }
    } else {
      return serviceStatus === 1 ? styles.status1 : serviceStatus === 2 ? styles.status2 : styles.status0;
    }
  };

  const getStatusOptions = () => {
    if (activeFilter === 'Xét nghiệm') {
      return ['Tất cả trạng thái', 'Chờ xác nhận', 'Đã xác nhận', 'Đã lấy mẫu', 'Chờ kết quả', 'Đã trả kết quả'];
    } else if (activeFilter === 'Tư vấn') {
      return ['Tất cả trạng thái', 'Chờ xử lý', 'Đã thanh toán', 'Đã hủy'];
    } else {
      return ['Tất cả trạng thái', 'Chờ xử lý', 'Chờ xác nhận', 'Đã xác nhận', 'Đã lấy mẫu', 'Chờ kết quả', 'Đã trả kết quả', 'Đã thanh toán', 'Đã hủy'];
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('https://api-gender2.purintech.id.vn/api/Appointment/advice-and-test-appointments', {
      headers: {
        'accept': '*/*',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    })
      .then(res => res.json())
      .then(data => {
        const list = Array.isArray(data?.obj)
          ? data.obj.map(item => ({
              ...item,
              loaiDichVu: item.type?.toLowerCase() === "xét nghiệm" ? "Xét nghiệm" : "Tư vấn",
              tenDichVu: item.name,
              thoiLuong: item.duration,
              phone: item.phoneNumber || item.phone,
              appointmentDate: item.appointmentDate,
              createdAt: item.createdDate,
            }))
          : [];
        setLichTongHop(list);
      })
      .catch(() => setLichTongHop([]));
  }, []);

  useEffect(() => {
  if (lichTongHop.length > 0) {
    const savedFilter = localStorage.getItem('activeFilter') || 'all';
    const savedStatus = localStorage.getItem('statusFilter') || 'all';
    filterAppointments(savedFilter, savedStatus);
  }
}, [lichTongHop]);



  return (
    <div style={styles.page}>
      <HeaderCustomer />
      <div style={styles.container}>
        <div style={styles.headerSection}>
          <h2 style={styles.h2}>Lịch dịch vụ đã đặt</h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', gap: '16px' }}>
          <select
            value={activeFilter}
            onChange={(e) => filterAppointments(e.target.value, 'all')}
            style={{
              padding: '10px 20px',
              fontSize: 16,
              fontWeight: 600,
              border: '2px solid #22c55e',
              borderRadius: 8,
              backgroundColor: '#fff',
              color: '#15803d',
              cursor: 'pointer',
              minWidth: '200px',
              outline: 'none',
            }}
          >
            <option value="all">Tất cả dịch vụ</option>
            <option value="Tư vấn">Tư vấn</option>
            <option value="Xét nghiệm">Xét nghiệm</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => filterByStatus(e.target.value)}
            style={{
              padding: '10px 20px',
              fontSize: 16,
              fontWeight: 600,
              border: '2px solid #22c55e',
              borderRadius: 8,
              backgroundColor: '#fff',
              color: '#15803d',
              cursor: 'pointer',
              minWidth: '200px',
              outline: 'none',
            }}
          >
            {getStatusOptions().map((option, index) => (
              <option key={index} value={option === 'Tất cả trạng thái' ? 'all' : option}>
                {option}
              </option>
            ))}
          </select>
        </div>
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
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr><td colSpan={8} style={styles.td}>Không có lịch dịch vụ nào.</td></tr>
            ) : (
              currentItems.map(item => (
                <tr key={item.id + '-' + item.loaiDichVu}>
                  <td style={styles.td}>{item.loaiDichVu}</td>
                  <td style={styles.td}>{item.fullName}</td>
                  <td style={styles.td}>{item.phoneNumber || item.phone}</td>
                  <td style={styles.td}>{item.tenDichVu}</td>
                  <td style={styles.td}>{new Date(item.appointmentDate).toLocaleString('vi-VN')}</td>
                  <td style={styles.td}>{item.thoiLuong}</td>
                  <td style={styles.td}>{item.price?.toLocaleString('vi-VN')}.000 VND</td>
                  <td style={getStatusStyle(item.serviceStatus, item.loaiDichVu)}>
                    {getStatusText(item.serviceStatus, item.loaiDichVu)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {filteredLich.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '15px', color: '#666', fontSize: '14px' }}>
            Hiển thị {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredLich.length)} trong tổng số {filteredLich.length} lịch
          </div>
        )}
        {filteredLich.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', gap: '8px' }}>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} style={{ padding: '8px 16px', border: '1px solid #22c55e', borderRadius: 6, backgroundColor: currentPage === 1 ? '#e0e0e0' : '#fff', color: currentPage === 1 ? '#999' : '#22c55e', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: 14 }}>Trước</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i + 1} onClick={() => handlePageChange(i + 1)} style={{ padding: '8px 12px', border: '1px solid #22c55e', borderRadius: 6, backgroundColor: currentPage === i + 1 ? '#22c55e' : '#fff', color: currentPage === i + 1 ? '#fff' : '#22c55e', cursor: 'pointer', fontWeight: currentPage === i + 1 ? 700 : 600, fontSize: 14 }}>{i + 1}</button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} style={{ padding: '8px 16px', border: '1px solid #22c55e', borderRadius: 6, backgroundColor: currentPage === totalPages ? '#e0e0e0' : '#fff', color: currentPage === totalPages ? '#999' : '#22c55e', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: 14 }}>Sau</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default LichSuDatLich;
