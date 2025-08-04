import React, { useState, useEffect } from "react";
import ConsultantSidebar from "../components/ConsultantSidebar";
import ConsultantTopbar from "../components/ConsultantTopbar";

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

const ConsultantLichHen = () => {
  const [showPopup, setShowPopup] = useState(false);
const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
const [suggestionText, setSuggestionText] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const consultantName = "Nguyễn Thị Huyền";
  const notificationCount = 3;

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
      case 2: return 'Đã tới';
      case 3: return 'Đang thực hiện';
      case 4: return 'Đã tư vấn';
      case 5: return 'Hoàn thành';
      case 6: return 'Không tới';
      default: return 'Chờ xác nhận';
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
        const res = await fetch('https://api-gender2.purintech.id.vn/api/Appointment/get-all-advice-appointments-by-consultant', {
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
        let onlineIndex = 0;
const appointmentsWithLinks = newList.map((a) => {
  if (a.contactType === 2 && onlineIndex < meetLinks.length) {
    return { ...a, meetLink: meetLinks[onlineIndex++] };
  }
  return a;
});
// Sắp xếp theo thời gian tạo lịch gần nhất lên đầu

setAppointments(appointmentsWithLinks);

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

  // Tìm lịch hẹn tương ứng
  const currentAppointment = appointments.find(a => a.id === id);
  if (!currentAppointment) {
    alert('Không tìm thấy lịch hẹn để duyệt!');
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
        serviceStatus: 1,
        note: currentAppointment.note || '',
        suggestion: ''
      })
    });

    if (!res.ok) {
      const data = await res.json();
      alert('Lỗi: ' + (data.message || JSON.stringify(data)));
      return;
    }

    alert('Xác nhận thành công!');
    setAppointments(prev =>
      prev.map(a => a.id === id ? { ...a, serviceStatus: 1 } : a)
    );
  } catch (error) {
    alert('Có lỗi xảy ra khi xác nhận lịch hẹn!');
    console.error(error);
  }
};

// Hàm cập nhật trạng thái chung
const updateStatus = async (id, newStatus) => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Bạn cần đăng nhập để thao tác!');
    return;
  }

  const currentAppointment = appointments.find(a => a.id === id);
  if (!currentAppointment) {
    alert('Không tìm thấy lịch hẹn!');
    return;
  }

  // Kiểm tra không cho phép quay lại trạng thái trước đó
  if (newStatus < currentAppointment.serviceStatus) {
    alert('Không thể quay lại trạng thái trước đó!');
    return;
  }

  // Kiểm tra không cho phép nhảy cóc trạng thái
  if (newStatus > currentAppointment.serviceStatus + 1) {
    alert('Không thể nhảy cóc trạng thái! Chỉ được chuyển đến trạng thái tiếp theo.');
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
        serviceStatus: newStatus,
        note: currentAppointment.note || '',
        suggestion: ''
      })
    });

    if (!res.ok) {
      const data = await res.json();
      alert('Lỗi: ' + (data.message || JSON.stringify(data)));
      return;
    }

    const statusText = getStatusText(newStatus);
    alert(`Cập nhật trạng thái thành công: ${statusText}`);
    setAppointments(prev =>
      prev.map(a => a.id === id ? { ...a, serviceStatus: newStatus } : a)
    );
  } catch (error) {
    alert('Có lỗi xảy ra khi cập nhật trạng thái!');
    console.error(error);
  }
};

const handleComplete = async (id) => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Bạn cần đăng nhập để thao tác!');
    return;
  }

  // Tìm lịch hẹn tương ứng
  const currentAppointment = appointments.find(a => a.id === id);
  if (!currentAppointment) {
    alert('Không tìm thấy lịch hẹn để hoàn thành!');
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
        serviceStatus: 5,
        note: currentAppointment.note || '',
        suggestion: suggestionText
      })
    });

    if (!res.ok) {
      const data = await res.json();
      alert('Lỗi: ' + (data.message || JSON.stringify(data)));
      return;
    }

    alert('Hoàn thành lịch hẹn thành công!');
    setAppointments(prev =>
      prev.map(a => a.id === id ? { ...a, serviceStatus: 5 } : a)
    );
    setShowPopup(false);
    setSuggestionText("");
    setSelectedAppointmentId(null);
  } catch (error) {
    alert('Có lỗi xảy ra khi hoàn thành lịch hẹn!');
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
                 <option value="Đã tới">Đã tới</option>
                 <option value="Đang thực hiện">Đang thực hiện</option>
                 <option value="Đã tư vấn">Đã tư vấn</option>
                 <option value="Hoàn thành">Hoàn thành</option>
                 <option value="Không tới">Không tới</option>
              </select>
            </div>
            {filteredAppointments.length === 0 ? (
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
                    {filteredAppointments.map((a, idx) => (
                      <tr key={a.id || idx}>
                        <td style={{ fontWeight: 600, color: '#059669' }}>{a.fullName}</td>
                        <td>{a.email}</td>
                        <td>{a.phoneNumber}</td>
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
     a.serviceStatus === 0 ? '#fef3c7' :       // vàng - chờ xác nhận
     a.serviceStatus === 1 ? '#dbeafe' :       // xanh dương - đã xác nhận
     a.serviceStatus === 2 ? '#d1fae5' :       // xanh lá - đã tới
     a.serviceStatus === 3 ? '#fef3c7' :       // vàng - đang thực hiện
     a.serviceStatus === 4 ? '#d1fae5' :       // xanh lá - đã tư vấn
     a.serviceStatus === 5 ? '#d1fae5' :       // xanh lá - hoàn thành
     a.serviceStatus === 6 ? '#fee2e2' : '#fef3c7'  // đỏ - không tới
 }}>
   {getStatusText(a.serviceStatus)}
 </span>
</td>
                        <td>
     <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
     {a.serviceStatus === 0 && (
       <button
         className="lh-btn-detail"
         onClick={() => updateStatus(a.id, 1)}
         style={{
           fontSize: '0.85rem',
           padding: '4px 8px',
         }}
       >
         Xác nhận
       </button>
     )}

     {a.serviceStatus === 1 && (
       <button
         className="lh-btn-detail"
         onClick={() => updateStatus(a.id, 2)}
         style={{
           fontSize: '0.85rem',
           padding: '4px 8px',
           backgroundColor: '#3b82f6',
           color: 'white',
         }}
       >
         Đã tới
       </button>
     )}

     {a.serviceStatus === 2 && (
       <button
         className="lh-btn-detail"
         onClick={() => updateStatus(a.id, 3)}
         style={{
           fontSize: '0.85rem',
           padding: '4px 8px',
           backgroundColor: '#f59e0b',
           color: 'white',
         }}
       >
         Bắt đầu
       </button>
     )}

     {a.serviceStatus === 3 && (
       <button
         className="lh-btn-detail"
         onClick={() => updateStatus(a.id, 4)}
         style={{
           fontSize: '0.85rem',
           padding: '4px 8px',
           backgroundColor: '#10b981',
           color: 'white',
         }}
       >
         Đã tư vấn
       </button>
     )}

     {a.serviceStatus === 4 && (
       <button
         className="lh-btn-detail"
         onClick={() => {
           setSelectedAppointmentId(a.id);
           setShowPopup(true);
         }}
         style={{
           fontSize: '0.85rem',
           padding: '4px 8px',
           backgroundColor: '#10b981',
           color: 'white',
         }}
       >
         Hoàn thành
       </button>
     )}

     {a.serviceStatus === 5 && (
       <button
         className="lh-btn-detail"
         style={{
           fontSize: '0.85rem',
           padding: '4px 8px',
           backgroundColor: '#d1d5db',
           color: '#6b7280',
           cursor: 'not-allowed',
         }}
         disabled
       >
         Đã hoàn thành
       </button>
     )}

     {/* Nút "Không tới" có thể được chọn từ bất kỳ trạng thái nào */}
     {a.serviceStatus !== 6 && (
       <button
         className="lh-btn-detail"
         onClick={() => updateStatus(a.id, 6)}
         style={{
           fontSize: '0.85rem',
           padding: '4px 8px',
           backgroundColor: '#ef4444',
           color: 'white',
         }}
       >
         Không tới
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
          {showPopup && (
  <div style={{
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
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
      <h2 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Nhập kết quả tư vấn</h2>
      <textarea
        value={suggestionText}
        onChange={(e) => setSuggestionText(e.target.value)}
        rows={5}
        style={{ width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}
        placeholder="Nhập nội dung kết quả..."
      />
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <button
          onClick={() => setShowPopup(false)}
          style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: '#e5e7eb', fontWeight: 600 }}
        >
          Hủy
        </button>
        <button
          onClick={() => {
            if (!suggestionText.trim()) {
              alert('Vui lòng nhập nội dung kết quả!');
              return;
            }
            handleComplete(selectedAppointmentId, suggestionText);
          }}
          style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: '#10b981', color: 'white', fontWeight: 600 }}
        >
          Gửi
        </button>
      </div>
    </div>
  </div>
)}
        </main>
      </div>
    </>
  );
};

export default ConsultantLichHen;
