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
  status0: { color: '#f59e42', fontWeight: 600 }, // Chờ xác nhận - cam
  status1: { color: '#22c55e', fontWeight: 600 }, // Đã xác nhận - xanh lá
  status2: { color: '#3b82f6', fontWeight: 600 }, // Đã tới - xanh dương
  status3: { color: '#f59e42', fontWeight: 600 }, // Đang thực hiện - cam
  status4: { color: '#8b5cf6', fontWeight: 600 }, // Đã lấy mẫu - tím
  status5: { color: '#f59e42', fontWeight: 600 }, // Chờ kết quả - cam
  status6: { color: '#10b981', fontWeight: 600 }, // Đã trả kết quả - xanh ngọc
  status7: { color: '#059669', fontWeight: 600 }, // Hoàn thành - xanh đậm
  status8: { color: '#ef4444', fontWeight: 600 }, // Không tới - đỏ
};

function LichSuDatLich() {
  const [lichTongHop, setLichTongHop] = useState([]);
  const [filteredLich, setFilteredLich] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  const filterAppointments = (filterType, statusType = statusFilter) => {
    setActiveFilter(filterType);
    setCurrentPage(1);
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

  useEffect(() => {
    filterAppointments(activeFilter, statusFilter);
  }, [lichTongHop, activeFilter, statusFilter]);

  const getStatusText = (serviceStatus, loaiDichVu) => {
    if (loaiDichVu === 'Xét nghiệm') {
      switch (serviceStatus) {
        case 0: return 'Chờ xác nhận';
        case 1: return 'Đã xác nhận';
        case 2: return 'Đã tới';
        case 3: return 'Đang thực hiện';
        case 4: return 'Đã lấy mẫu';
        case 5: return 'Chờ kết quả';
        case 6: return 'Đã trả kết quả';
        case 7: return 'Hoàn thành';
        case 8: return 'Không tới';
        default: return 'Không rõ';
      }
    } else {
      switch (serviceStatus) {
        case 0: return 'Chờ xác nhận';
        case 1: return 'Đã xác nhận';
        case 2: return 'Đã tới';
        case 3: return 'Đang thực hiện';
        case 4: return 'Đã lấy mẫu';
        case 5: return 'Chờ kết quả';
        case 6: return 'Đã trả kết quả';
        case 7: return 'Hoàn thành';
        case 8: return 'Không tới';
        default: return 'Không rõ';
      }
    }
  };

  const getStatusStyle = (serviceStatus, loaiDichVu) => {
    if (loaiDichVu === 'Xét nghiệm') {
      switch (serviceStatus) {
        case 0: return styles.status0; // Chờ xác nhận - cam
        case 1: return styles.status1; // Đã xác nhận - xanh lá
        case 2: return styles.status2; // Đã tới - xanh dương
        case 3: return styles.status3; // Đang thực hiện - cam
        case 4: return styles.status4; // Đã lấy mẫu - tím
        case 5: return styles.status5; // Chờ kết quả - cam
        case 6: return styles.status6; // Đã trả kết quả - xanh ngọc
        case 7: return styles.status7; // Hoàn thành - xanh đậm
        case 8: return styles.status8; // Không tới - đỏ
        default: return styles.status0;
      }
    } else {
      switch (serviceStatus) {
        case 0: return styles.status0; // Chờ xác nhận - cam
        case 1: return styles.status1; // Đã xác nhận - xanh lá
        case 2: return styles.status2; // Đã tới - xanh dương
        case 3: return styles.status3; // Đang thực hiện - cam
        case 4: return styles.status4; // Đã lấy mẫu - tím
        case 5: return styles.status5; // Chờ kết quả - cam
        case 6: return styles.status6; // Đã trả kết quả - xanh ngọc
        case 7: return styles.status7; // Hoàn thành - xanh đậm
        case 8: return styles.status8; // Không tới - đỏ
        default: return styles.status0;
      }
    }
  };

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
      const merged = [...testList, ...adviceList].sort(
        (a, b) => new Date(b.createdAt || b.appointmentDate) - new Date(a.createdAt || a.appointmentDate)
      );
      setLichTongHop(merged);
    }).catch(() => setLichTongHop([]));
  }, []);

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
            onChange={(e) => filterAppointments(e.target.value, statusFilter)}
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
            <option value="all">Tất cả trạng thái</option>
                         <option value="Chờ xác nhận">Chờ xác nhận</option>
             <option value="Đã xác nhận">Đã xác nhận</option>
             <option value="Đã tới">Đã tới</option>
             <option value="Đang thực hiện">Đang thực hiện</option>
             <option value="Đã lấy mẫu">Đã lấy mẫu</option>
             <option value="Chờ kết quả">Chờ kết quả</option>
             <option value="Đã trả kết quả">Đã trả kết quả</option>
             <option value="Hoàn thành">Hoàn thành</option>
             <option value="Không tới">Không tới</option>
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
