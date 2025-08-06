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
  const [showReappointmentModal, setShowReappointmentModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newAppointmentDate, setNewAppointmentDate] = useState('');
  const [newAppointmentTime, setNewAppointmentTime] = useState('');
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

  const handleReappointment = (item) => {
    setSelectedItem(item);
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setNewAppointmentDate(tomorrow.toISOString().split('T')[0]);
    setNewAppointmentTime('09:00');
    setShowReappointmentModal(true);
  };

  const confirmReappointment = async () => {
    if (!selectedItem || !newAppointmentDate || !newAppointmentTime) {
      alert('Vui lòng chọn ngày và giờ hẹn mới!');
      return;
    }
    
    try {
      // const newDateTime = new Date(`${newAppointmentDate}T${newAppointmentTime}`);
      const token = localStorage.getItem('token');

      // Chọn endpoint phù hợp
      let endpoint = '';
      if (selectedItem.loaiDichVu === 'Tư vấn') {
        endpoint = `https://api-gender2.purintech.id.vn/api/Appointment/advice-result/${selectedItem.id}/approve`;
      } else {
        endpoint = `https://api-gender2.purintech.id.vn/api/Appointment/test-result/${selectedItem.id}/approve`;
      }

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'accept': '*/*'
        },
        body: JSON.stringify({
          serviceStatus: 0 // Reset về trạng thái "Chờ xác nhận"
          // appointmentDate: newDateTime.toISOString(),
          // note: selectedItem.note || '',
          // suggestion: ''
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Cập nhật thất bại');
      }

      // Thêm delay để đảm bảo server xử lý xong
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Refresh lại dữ liệu từ server để đảm bảo đồng bộ
      const refreshResponse = await fetch('https://api-gender2.purintech.id.vn/api/Appointment/advice-and-test-appointments', {
        headers: {
          'accept': '*/*',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      
      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        const refreshedList = Array.isArray(refreshData?.obj)
          ? refreshData.obj.map(item => ({
              ...item,
              loaiDichVu: item.type?.toLowerCase() === "xét nghiệm" ? "Xét nghiệm" : "Tư vấn",
              tenDichVu: item.name,
              thoiLuong: item.duration,
              phone: item.phoneNumber || item.phone,
              appointmentDate: item.appointmentDate,
              createdAt: item.createdDate,
            }))
          : [];
        setLichTongHop(refreshedList);
      } else {
        // Nếu refresh thất bại, cập nhật local state
        const updatedLichTongHop = lichTongHop.map(item => {
          if (item.id === selectedItem.id) {
            return {
              ...item,
              appointmentDate: newDateTime.toISOString(),
              serviceStatus: 0 // Reset về trạng thái "Chờ xác nhận"
            };
          }
          return item;
        });
        setLichTongHop(updatedLichTongHop);
      }
      
      // Hiển thị thông báo thành công
      alert('Đặt lịch lại thành công! Lịch hẹn đã được cập nhật.');
      
      setShowReappointmentModal(false);
      setSelectedItem(null);
      setNewAppointmentDate('');
      setNewAppointmentTime('');
    } catch (error) {
      console.error('Lỗi khi cập nhật lịch hẹn:', error);
      alert('Lỗi khi cập nhật lịch hẹn: ' + error.message);
    }
  };

  const cancelReappointment = () => {
    setShowReappointmentModal(false);
    setSelectedItem(null);
    setNewAppointmentDate('');
    setNewAppointmentTime('');
  };

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
        default: return 'Chờ xử lý';
      }
    } else {
      switch (serviceStatus) {
        case 0: return 'Chờ xác nhận';
        case 1: return 'Đã xác nhận';
        case 2: return 'Đã tới';
        case 3: return 'Đang thực hiện';
        case 4: return 'Đã tư vấn';
        case 5: return 'Hoàn thành';
        case 6: return 'Không tới';
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
        case 5: return styles.status0;
        case 6: return styles.status1;
        case 7: return styles.status1;
        case 8: return styles.status2;
        default: return styles.status0;
      }
    } else {
      switch (serviceStatus) {
        case 0: return styles.status0;
        case 1: return styles.status1;
        case 2: return styles.status1;
        case 3: return styles.status0;
        case 4: return styles.status1;
        case 5: return styles.status1;
        case 6: return styles.status2;
        default: return styles.status0;
      }
    }
  };

  const getStatusOptions = () => {
    if (activeFilter === 'Xét nghiệm') {
      return ['Tất cả trạng thái', 'Chờ xác nhận', 'Đã xác nhận', 'Đã tới', 'Đang thực hiện', 'Đã lấy mẫu', 'Chờ kết quả', 'Đã trả kết quả', 'Hoàn thành', 'Không tới'];
    } else if (activeFilter === 'Tư vấn') {
      return ['Tất cả trạng thái', 'Chờ xác nhận', 'Đã xác nhận', 'Đã tới', 'Đang thực hiện', 'Đã tư vấn', 'Hoàn thành', 'Không tới'];
    } else {
      return ['Tất cả trạng thái', 'Chờ xác nhận', 'Đã xác nhận', 'Đã tới', 'Đang thực hiện', 'Đã lấy mẫu', 'Chờ kết quả', 'Đã trả kết quả', 'Hoàn thành', 'Không tới', 'Đã tư vấn'];
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
              <th style={styles.th}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr><td colSpan={9} style={styles.td}>Không có lịch dịch vụ nào.</td></tr>
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
                  <td style={styles.td}>
                    {getStatusText(item.serviceStatus, item.loaiDichVu) === 'Không tới' && (
                      <button
                        onClick={() => handleReappointment(item)}
                        style={{
                          backgroundColor: '#22c55e',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '8px 16px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#16a34a'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#22c55e'}
                      >
                        Đặt lịch lại
                      </button>
                    )}
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

      {/* Modal Đặt lịch lại */}
      {showReappointmentModal && selectedItem && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              marginBottom: '16px', 
              color: '#15803d',
              textAlign: 'center',
              fontWeight: '600'
            }}>
              Xác nhận đặt lịch lại
            </h2>
            
                         <div style={{ marginBottom: '20px' }}>
               <p style={{ marginBottom: '12px', fontSize: '1rem', color: '#374151' }}>
                 <strong>Dịch vụ:</strong> {selectedItem.tenDichVu}
               </p>
               <p style={{ marginBottom: '12px', fontSize: '1rem', color: '#374151' }}>
                 <strong>Loại dịch vụ:</strong> {selectedItem.loaiDichVu}
               </p>
                               <p style={{ marginBottom: '8px', fontSize: '1rem', color: '#374151' }}>
                  <strong>Ngày hẹn đã chọn:</strong> {new Date(selectedItem.appointmentDate).toLocaleDateString('vi-VN')}
                </p>
                                <p style={{ marginBottom: '12px', fontSize: '1rem', color: '#374151' }}>
                  <strong>Giờ hẹn đã chọn:</strong> {new Date(selectedItem.appointmentDate).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false })}
                </p>
                
                <div style={{ 
                  marginBottom: '20px', 
                  padding: '16px', 
                  backgroundColor: '#f8fafc', 
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    marginBottom: '12px', 
                    color: '#15803d',
                    fontWeight: '600'
                  }}>
                    Chọn thời gian mới:
                  </h3>
                  
                                     <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                     <div style={{ flex: '1', minWidth: '150px', maxWidth: '180px' }}>
                       <label style={{ 
                         display: 'block', 
                         marginBottom: '6px', 
                         fontSize: '0.9rem', 
                         fontWeight: '600',
                         color: '#374151'
                       }}>
                         Ngày hẹn mới:
                       </label>
                       <input
                         type="date"
                         value={newAppointmentDate}
                         onChange={(e) => setNewAppointmentDate(e.target.value)}
                         min={new Date().toISOString().split('T')[0]}
                         style={{
                           width: '100%',
                           padding: '9px 7px',
                           border: '1px solid #d1d5db',
                           borderRadius: '6px',
                           fontSize: '0.9rem'
                         }}
                       />
                     </div>
                     
                     <div style={{ flex: '1', minWidth: '120px', maxWidth: '150px' }}>
                       <label style={{ 
                         display: 'block', 
                         marginBottom: '6px', 
                         fontSize: '0.9rem', 
                         fontWeight: '600',
                         color: '#374151'
                       }}>
                         Giờ hẹn mới:
                       </label>
                       <input
                         type="time"
                         value={newAppointmentTime}
                         onChange={(e) => setNewAppointmentTime(e.target.value)}
                         style={{
                           width: '100%',
                           padding: '8px 12px',
                           border: '1px solid #d1d5db',
                           borderRadius: '6px',
                           fontSize: '0.9rem'
                         }}
                       />
                     </div>
                   </div>
                </div>
                
                <p style={{ 
                  marginBottom: '16px', 
                  fontSize: '0.95rem', 
                  color: '#6b7280',
                  fontStyle: 'italic'
                }}>
                  Bạn có chắc chắn muốn đặt lịch lại cho dịch vụ này với thời gian mới không?
                </p>
             </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: '12px' 
            }}>
              <button
                onClick={cancelReappointment}
                style={{ 
                  padding: '10px 20px', 
                  borderRadius: '8px', 
                  backgroundColor: '#e5e7eb', 
                  color: '#374151',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.95rem'
                }}
              >
                Hủy
              </button>
              <button
                onClick={confirmReappointment}
                style={{ 
                  padding: '10px 20px', 
                  borderRadius: '8px', 
                  backgroundColor: '#22c55e', 
                  color: 'white', 
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.95rem'
                }}
              >
                Đặt lịch lại
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default LichSuDatLich;
