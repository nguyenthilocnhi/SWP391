import React, { useState, useEffect } from "react";
import ConsultantSidebar from "../components/ConsultantSidebar";
import ConsultantTopbar from "../components/ConsultantTopbar";

const ConsultantLichHen = () => {
  const [appointments, setAppointments] = useState([]);
  const consultantName = "Nguyễn Thị Huyền";
  const notificationCount = 3;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role;
      if (role !== 2 && role !== 'Consultant' && role !== 'Tư vấn viên') {
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
        const res = await fetch('https://api-gender2.purintech.id.vn/api/Appointment/advice-appointments', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*'
          }
        });
        const data = await res.json();
        console.log("API data:", data);

        // Mapping dữ liệu
        let newList = [];
        if (Array.isArray(data)) newList = data;
        else if (Array.isArray(data.obj)) newList = data.obj;
        else newList = [];
        setAppointments(newList);
      } catch (error) {
        console.error("Lỗi fetch API:", error);
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, []);

  const handleApprove = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bạn cần đăng nhập để thao tác!');
      return;
    }
    let consultantId = null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      consultantId = payload.nameid || payload.sub || null;
    } catch (e) {}
    try {
      const res = await fetch(`https://api-gender2.purintech.id.vn/api/Appointment/advice-result/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'accept': '*/*',
        },
        body: JSON.stringify({
          consultantId: consultantId,
          serviceStatus: 0,
          note: 'Duyệt lịch hẹn',
          suggestion: 'Lịch hẹn đã được duyệt'
        })
      });
      if (!res.ok) {
        const data = await res.json();
        alert('Lỗi: ' + (data.message || JSON.stringify(data)));
        return;
      }
      alert('Duyệt thành công!');
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: "Đã duyệt" } : a));
    } catch (error) {
      alert('Có lỗi xảy ra khi duyệt lịch hẹn!');
      console.error(error);
    }
  };

  const handleConfirm = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bạn cần đăng nhập để thao tác!');
      return;
    }
    let consultantId = null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      consultantId = payload.nameid || payload.sub || null;
    } catch (e) {}
    try {
      const res = await fetch(`https://api-gender2.purintech.id.vn/api/Appointment/advice-result/${id}/confirm`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'accept': '*/*',
        },
        body: JSON.stringify({
          consultantId: consultantId
        })
      });
      if (!res.ok) {
        const data = await res.json();
        alert('Lỗi: ' + (data.message || JSON.stringify(data)));
        return;
      }
      alert('Xác nhận hoàn thành!');
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: "Đã hoàn thành" } : a));
    } catch (error) {
      alert('Có lỗi xảy ra khi xác nhận hoàn thành!');
      console.error(error);
    }
  };

  return (
    <>
      <style>{`
        html, body {
   height: 100%;
   width: 100%;
   margin: 0;
   padding: 0;
   font-family: 'Inter', sans-serif;
   background-color: #f9fafb;
   color: #1f2937;
 }
 body {
   min-height: 100vh;
   min-width: 100vw;
   box-sizing: border-box;
 }
 #root {
   height: 100%;
 }
 .dashboard {
   display: flex;
   min-height: 100vh;
   min-width: 100vw;
   width: 100vw;
   background-color: #f9fafb;
 }
 .main {
   flex: 1;
   margin-left: 180px;
   padding: 40px 32px;
   background-color: #ffffff;
   overflow-x: hidden;
   min-height: 100vh;
 }
        .lh-main-card { width: 95%; margin: 0 auto 32px auto; background: #ecfdf5; border-radius: 18px; box-shadow: 0 2px 12px rgba(16,185,129,0.08); padding: 36px 40px 32px 40px; display: flex; flex-direction: column; align-items: center; }
        .lh-title { font-size: 2rem; font-weight: 700; color: #059669; margin-bottom: 12px; text-align: center; }
        .lh-desc { color: #166534; font-size: 1.1rem; margin-bottom: 32px; text-align: center; }
        .lh-table { width: 100%; border-collapse: separate; border-spacing: 0 8px; background: #ecfdf5; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 6px rgba(16,185,129,0.04); }
        .lh-table th, .lh-table td { text-align: center; padding: 12px 8px; font-size: 1.05rem; }
        .lh-table th { background: #a7f3d0; color: #166534; font-weight: 700; }
        .lh-table tr { background: #fff; border-radius: 8px; }
        .lh-table td { border-bottom: 1px solid #d1fae5; }
        .lh-btn-detail { background: #34d399; color: #fff; border: none; border-radius: 8px; padding: 6px 14px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
        .lh-btn-detail:hover { background: #059669; }
        .lh-empty { color: #6b7280; font-size: 1.1rem; margin-top: 32px; text-align: center; }
        @media (max-width: 900px) { .lh-main-card { padding: 12px 2px; } .lh-table th, .lh-table td { font-size: 0.95rem; padding: 8px 4px; } }
      `}</style>
      <div className="dashboard">
        <ConsultantSidebar consultantName={consultantName} />
        <main className="main">
          <ConsultantTopbar notificationCount={notificationCount} consultantName={consultantName} />
          <div className="lh-main-card">
            <div className="lh-title">Lịch hẹn tư vấn</div>
            <div className="lh-desc">Danh sách các lịch hẹn tư vấn của khách hàng.</div>
            {appointments.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: '1.2rem', color: '#6b7280', marginBottom: '16px', fontWeight: 500 }}>
                  Không có lịch hẹn nào
                </div>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="lh-table">
                  <thead>
                    <tr>
                      <th>Khách hàng</th>
                      <th>Email</th>
                      <th>SĐT</th>
                      <th>Ngày</th>
                      <th>Giờ</th>
                      <th>Hình thức</th>
                      <th>Loại tư vấn</th>
                      <th>Ghi chú</th>
                      <th>Link Meet</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((a, idx) => (
                      <tr key={a.id || idx}>
                        <td style={{ fontWeight: 600, color: '#059669' }}>{a.fullName}</td>
                        <td>{a.email}</td>
                        <td>{a.phone}</td>
                        <td>{a.appointmentDate ? new Date(a.appointmentDate).toLocaleDateString('vi-VN') : '-'}</td>
                        <td>{a.appointmentDate ? new Date(a.appointmentDate).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : '-'}</td>
                        <td>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            backgroundColor: a.contactType === 2 ? '#dbeafe' : '#fef3c7',
                            color: a.contactType === 2 ? '#1e40af' : '#92400e'
                          }}>
                            {a.contactType === 2 ? 'Online' : 'Trực tiếp'}
                          </span>
                        </td>
                        <td>{a.consultationType}</td>
                        <td style={{ maxWidth: '200px', wordBreak: 'break-word' }}>{a.note}</td>
                        <td>
                          {a.contactType === 2 && a.meetLink ? (
                            <a href={a.meetLink} target="_blank" rel="noopener noreferrer"
                              style={{ color: '#d97706', fontWeight: 'bold', textDecoration: 'none', wordBreak: 'break-all' }}>
                              Link Meet
                            </a>
                          ) : '-'}
                        </td>
                        <td>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            backgroundColor:
                              a.status === 'Đã duyệt' ? '#d1fae5' :
                                a.status === 'Đã hoàn thành' ? '#dbeafe' :
                                  a.status === 'Đã hủy' ? '#fee2e2' : '#fef3c7',
                            color:
                              a.status === 'Đã duyệt' ? '#065f46' :
                                a.status === 'Đã hoàn thành' ? '#1e40af' :
                                  a.status === 'Đã hủy' ? '#dc2626' : '#92400e'
                          }}>
                            {a.status}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                            {a.status === 'Chờ xử lý' && (
                              <button className="lh-btn-detail" onClick={() => handleApprove(a.id)}
                                style={{ fontSize: '0.85rem', padding: '4px 8px' }}>
                                Duyệt
                              </button>
                            )}
                            {a.status === 'Đã duyệt' && (
                              <button className="lh-btn-detail"
                                style={{ marginLeft: 0, background: '#f59e42', fontSize: '0.85rem', padding: '4px 8px' }}
                                onClick={() => handleConfirm(a.id)}>
                                Xác nhận
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default ConsultantLichHen;
