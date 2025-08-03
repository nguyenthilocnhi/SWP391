import React, { useState, useEffect } from "react";
import AdminLayout from "../components/adminLayout";

const AdminCapNhatTrangThai = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Hàm lọc theo trạng thái
  const filterByStatus = (statusType) => {
    setStatusFilter(statusType);
    if (statusType === 'all') {
      setFilteredAppointments(appointments);
    } else {
      const filtered = appointments.filter(item => {
        const statusText = getStatusText(item.serviceStatus);
        return statusText === statusType;
      });
      setFilteredAppointments(filtered);
    }
  };

  // Hàm lấy text trạng thái
  const getStatusText = (serviceStatus) => {
    switch (serviceStatus) {
      case 0: return 'Chờ xác nhận';
      case 1: return 'Đã xác nhận';
      case 2: return 'Chờ xử lý';
      case 3: return 'Đang xử lý';
      case 4: return 'Hoàn thành';
      case 5: return 'Chờ kết quả';
      case 6: return 'Đã trả kết quả';
      case 7: return 'Hoàn thành';
      case 8: return 'Đã hủy';
      default: return 'Chờ xác nhận';
    }
  };

  // Hàm lấy màu trạng thái
  const getStatusColor = (serviceStatus) => {
    switch (serviceStatus) {
      case 0: return { bg: '#fef3c7', color: '#92400e' }; // Chờ xác nhận - vàng
      case 1: return { bg: '#d1fae5', color: '#166534' }; // Đã xác nhận - xanh lá
      case 2: return { bg: '#dbeafe', color: '#1e40af' }; // Chờ xử lý - xanh dương
      case 3: return { bg: '#fef3c7', color: '#92400e' }; // Đang xử lý - vàng
      case 4: return { bg: '#dcfce7', color: '#166534' }; // Hoàn thành - xanh lá
      case 5: return { bg: '#fef3c7', color: '#92400e' }; // Chờ kết quả - vàng
      case 6: return { bg: '#d1fae5', color: '#166534' }; // Đã trả kết quả - xanh lá
      case 7: return { bg: '#dcfce7', color: '#166534' }; // Hoàn thành - xanh lá
      case 8: return { bg: '#fee2e2', color: '#dc2626' }; // Đã hủy - đỏ
      default: return { bg: '#fef3c7', color: '#92400e' };
    }
  };

  // Cập nhật filteredAppointments khi appointments thay đổi
  useEffect(() => {
    filterByStatus(statusFilter);
  }, [appointments, statusFilter]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role;
      if (role !== 'Admin' && role !== 1) {
        window.location.href = '/login';
        return;
      }
    } catch (e) {
      window.location.href = '/login';
      return;
    }

    // Fetch API
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://api-gender2.purintech.id.vn/api/Appointment/get-all-advice-appointments', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*'
          }
        });
        const data = await res.json();
        console.log("API data:", data);
        console.log("API response structure:", typeof data, Array.isArray(data), data.obj ? Array.isArray(data.obj) : 'no obj property');

        // Mapping dữ liệu
        let newList = [];
        if (Array.isArray(data)) {
          newList = data;
          console.log("Using data directly as array, length:", newList.length);
        } else if (Array.isArray(data.obj)) {
          newList = data.obj;
          console.log("Using data.obj as array, length:", newList.length);
        } else {
          console.log("No valid array found in response");
        }

        console.log("Final appointments list:", newList);
        setAppointments(newList);
      } catch (error) {
        console.error("Lỗi fetch API:", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bạn cần đăng nhập để thao tác!');
      return;
    }

    try {
      const res = await fetch(`https://api-gender2.purintech.id.vn/api/Appointment/advice-result/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'accept': '*/*',
        },
        body: JSON.stringify({
          serviceStatus: newStatus
        })
      });

      if (!res.ok) {
        const data = await res.json();
        alert('Lỗi: ' + (data.message || JSON.stringify(data)));
        return;
      }

      alert('Cập nhật trạng thái thành công!');
      setAppointments(prev =>
        prev.map(a => a.id === id ? { ...a, serviceStatus: newStatus } : a)
      );
    } catch (error) {
      alert('Có lỗi xảy ra khi cập nhật trạng thái!');
      console.error(error);
    }
  };

  const canUpdateToStatus = (currentStatus, targetStatus) => {
    // Logic cho phép cập nhật trạng thái
    switch (currentStatus) {
      case 0: // Chờ xác nhận
        return targetStatus === 1; // Chỉ có thể chuyển sang "Đã xác nhận"
      case 1: // Đã xác nhận
        return targetStatus === 2; // Chỉ có thể chuyển sang "Chờ xử lý"
      case 2: // Chờ xử lý
        return targetStatus === 3; // Chỉ có thể chuyển sang "Đang xử lý"
      case 3: // Đang xử lý
        return targetStatus === 4; // Chỉ có thể chuyển sang "Hoàn thành"
      default:
        return false; // Các trạng thái khác không thể cập nhật
    }
  };

  const getAvailableStatuses = (currentStatus) => {
    switch (currentStatus) {
      case 0: return [{ value: 1, text: 'Đã xác nhận' }];
      case 1: return [{ value: 2, text: 'Chờ xử lý' }];
      case 2: return [{ value: 3, text: 'Đang xử lý' }];
      case 3: return [{ value: 4, text: 'Hoàn thành' }];
      default: return [];
    }
  };

  return (
    <AdminLayout>
      <div style={{ padding: '20px' }}>
        <div style={{ 
          background: '#ffffff', 
          borderRadius: '12px', 
          padding: '24px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: '700', 
            color: '#059669', 
            marginBottom: '12px',
            textAlign: 'center'
          }}>
            Cập nhật trạng thái lịch hẹn
          </h1>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '1.1rem', 
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            Quản lý trạng thái các lịch hẹn tư vấn
          </p>

          {/* Filter */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
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
              <option value="Chờ xử lý">Chờ xử lý</option>
              <option value="Đang xử lý">Đang xử lý</option>
              <option value="Hoàn thành">Hoàn thành</option>
            </select>
          </div>

          {/* Debug Section - Temporary */}
          <div style={{ 
            background: '#f3f4f6', 
            padding: '16px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            border: '1px solid #d1d5db'
          }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#374151' }}>Debug Info:</h3>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              <div>Loading: {loading ? 'Yes' : 'No'}</div>
              <div>Appointments count: {appointments.length}</div>
              <div>Filtered appointments count: {filteredAppointments.length}</div>
              <div>Status filter: {statusFilter}</div>
              {appointments.length > 0 && (
                <div style={{ marginTop: '8px' }}>
                  <strong>First appointment:</strong>
                  <pre style={{ 
                    background: '#fff', 
                    padding: '8px', 
                    borderRadius: '4px', 
                    fontSize: '12px',
                    overflow: 'auto',
                    maxHeight: '200px'
                  }}>
                    {JSON.stringify(appointments[0], null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '1.2rem', color: '#6b7280' }}>Đang tải dữ liệu...</div>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: '1.2rem', color: '#6b7280', marginBottom: '16px', fontWeight: 500 }}>
                Không có lịch hẹn nào
              </div>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'separate',
                borderSpacing: '0 8px',
                background: '#f9fafb',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 1px 6px rgba(0,0,0,0.04)'
              }}>
                <thead>
                  <tr style={{ background: '#10b981' }}>
                    <th style={{ padding: '12px 8px', textAlign: 'center', color: '#ffffff', fontWeight: '700' }}>Khách hàng</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', color: '#ffffff', fontWeight: '700' }}>Email</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', color: '#ffffff', fontWeight: '700' }}>SĐT</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', color: '#ffffff', fontWeight: '700' }}>Ngày hẹn</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', color: '#ffffff', fontWeight: '700' }}>Loại tư vấn</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', color: '#ffffff', fontWeight: '700' }}>Trạng thái</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', color: '#ffffff', fontWeight: '700' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment, idx) => {
                    const statusColor = getStatusColor(appointment.serviceStatus);
                    const availableStatuses = getAvailableStatuses(appointment.serviceStatus);
                    
                    return (
                      <tr key={appointment.id || idx} style={{ background: '#ffffff', borderRadius: '8px' }}>
                        <td style={{ padding: '12px 8px', textAlign: 'center', fontWeight: '600', color: '#059669' }}>
                          {appointment.fullName}
                        </td>
                        <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                          {appointment.email}
                        </td>
                        <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                          {appointment.phoneNumber}
                        </td>
                        <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                          {appointment.appointmentDate ? 
                            new Date(appointment.appointmentDate).toLocaleDateString('vi-VN') : '-'
                          }
                        </td>
                        <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                          {appointment.consultationType}
                        </td>
                        <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            backgroundColor: statusColor.bg,
                            color: statusColor.color
                          }}>
                            {getStatusText(appointment.serviceStatus)}
                          </span>
                        </td>
                        <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {availableStatuses.length > 0 ? (
                              availableStatuses.map((status) => (
                                <button
                                  key={status.value}
                                  onClick={() => handleUpdateStatus(appointment.id, status.value)}
                                  style={{
                                    fontSize: '0.85rem',
                                    padding: '6px 12px',
                                    backgroundColor: '#10b981',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s'
                                  }}
                                  onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
                                  onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
                                >
                                  {status.text}
                                </button>
                              ))
                            ) : (
                              <span style={{
                                fontSize: '0.85rem',
                                padding: '6px 12px',
                                backgroundColor: '#d1d5db',
                                color: '#6b7280',
                                borderRadius: '6px',
                                fontWeight: '600'
                              }}>
                                Không thể cập nhật
                              </span>
                            )}
                            
                            {appointment.serviceStatus === 2 && (
                              <button
                                onClick={() => window.location.href = '/admin/phan-cong'}
                                style={{
                                  fontSize: '0.85rem',
                                  padding: '6px 12px',
                                  backgroundColor: '#3b82f6',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '6px',
                                  fontWeight: '600',
                                  cursor: 'pointer',
                                  transition: 'background 0.2s'
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
                              >
                                Phân công
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCapNhatTrangThai; 