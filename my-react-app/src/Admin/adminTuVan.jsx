import React from 'react';
import AdminLayout from '../components/adminLayout';
import styled from 'styled-components';
import { useState } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';

const MainContent = styled.main`
  padding-top: 100px;
  padding-left: 260px;
  padding-right: 0;
  padding-bottom: 24px;
  background: #f9fafb;
  min-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  margin: 0;
  overflow-x: hidden;
  box-sizing: border-box;
  @media (max-width: 1200px) {
    padding-left: 0;
  }
  @media (max-width: 768px) {
    padding-top: 80px;
    padding-left: 0;
  }
`;
const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  padding: 0 8px;
  @media (max-width: 1200px) {
    max-width: 100vw;
    padding: 0 4px;
  }
`;
const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.05);
  padding: 32px 28px;
  margin-bottom: 24px;
  width: 100%;
  box-sizing: border-box;
`;
const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
`;
const TableContainer = styled.div`
  overflow-x: auto;
`;
const StaffTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const StaffTh = styled.th`
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  border-bottom: 1px solid #e5e7eb;
`;
const StaffTd = styled.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: top;
`;
const Badge = styled.span`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 9999px;
  font-weight: 500;
  white-space: nowrap;
  background: ${props => props.status === 'processing' ? '#dbeafe' : '#d1fae5'};
  color: ${props => props.status === 'processing' ? '#1e40af' : '#065f46'};
`;
const Button = styled.button`
  padding: 8px 18px;
  font-size: 15px;
  border-radius: 8px;
  border: none;
  background-color: ${props => props.active ? '#4ade80' : '#f3f4f6'};
  color: ${props => props.active ? '#fff' : '#059669'};
  cursor: pointer;
  font-weight: 600;
  margin-right: 8px;
  margin-bottom: 4px;
  transition: background 0.2s, color 0.2s;
  outline: none;
  &:hover {
    background-color: ${props => props.active ? '#059669' : '#e5e7eb'};
    color: ${props => props.active ? '#fff' : '#047857'};
    border: none;
    outline: none;
  }
  &:focus {
    border: none;
    outline: none;
  }
`;

const allSessions = [
  {
    name: 'Nguyễn Thị Mai',
    consultant: 'Bác sĩ Lan',
    time: '2025-07-04T10:00',
    status: 'processing',
    statusText: 'Đang chờ',
    actions: ['Chi tiết', 'Hủy'],
  },
  {
    name: 'Trần Văn Bình',
    consultant: 'Chuyên viên Tâm lý Hạnh',
    time: '2025-07-03T15:30',
    status: 'done',
    statusText: 'Hoàn thành',
    actions: ['Chi tiết'],
  },
  {
    name: 'Lê Thị Hồng',
    consultant: 'Bác sĩ Lan',
    time: '2025-07-02T09:00',
    status: 'processing',
    statusText: 'Đang chờ',
    actions: ['Chi tiết', 'Hủy'],
  },
  {
    name: 'Phạm Văn An',
    consultant: 'Chuyên viên Tâm lý Hạnh',
    time: '2025-07-01T14:00',
    status: 'done',
    statusText: 'Hoàn thành',
    actions: ['Chi tiết'],
  },
  {
    name: 'Ngô Thị Thu',
    consultant: 'Bác sĩ Lan',
    time: '2025-06-30T11:30',
    status: 'processing',
    statusText: 'Đang chờ',
    actions: ['Chi tiết', 'Hủy'],
  },
  {
    name: 'Đặng Minh Quân',
    consultant: 'Chuyên viên Tâm lý Hạnh',
    time: '2025-06-29T16:00',
    status: 'done',
    statusText: 'Hoàn thành',
    actions: ['Chi tiết'],
  },
  {
    name: 'Vũ Thị Hoa',
    consultant: 'Bác sĩ Lan',
    time: '2025-06-28T10:30',
    status: 'processing',
    statusText: 'Đang chờ',
    actions: ['Chi tiết', 'Hủy'],
  },
  {
    name: 'Trịnh Văn Cường',
    consultant: 'Chuyên viên Tâm lý Hạnh',
    time: '2025-06-27T13:00',
    status: 'done',
    statusText: 'Hoàn thành',
    actions: ['Chi tiết'],
  },
  {
    name: 'Bùi Thị Lan',
    consultant: 'Bác sĩ Lan',
    time: '2025-06-26T09:30',
    status: 'processing',
    statusText: 'Đang chờ',
    actions: ['Chi tiết', 'Hủy'],
  },
  {
    name: 'Nguyễn Văn Hùng',
    consultant: 'Chuyên viên Tâm lý Hạnh',
    time: '2025-06-25T15:00',
    status: 'done',
    statusText: 'Hoàn thành',
    actions: ['Chi tiết'],
  },
];

const PAGE_SIZE = 5;

const AdminTuVan = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [page, setPage] = useState(1);
  const [sessions, setSessions] = useState(allSessions);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingCancelIdx, setPendingCancelIdx] = useState(null);
  const [toast, setToast] = useState(null);
  const [detailSession, setDetailSession] = useState(null);

  // Lọc dữ liệu
  const filtered = sessions.filter(s => {
    const matchName = s.name.toLowerCase().includes(search.toLowerCase()) || s.consultant.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || s.status === filterStatus;
    const matchDate = !filterDate || s.time.startsWith(filterDate);
    return matchName && matchStatus && matchDate;
  });
  // Phân trang
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  // Xử lý hủy phiên
  const handleCancel = idx => {
    setPendingCancelIdx(idx);
    setShowConfirm(true);
  };
  const confirmCancel = () => {
    if (pendingCancelIdx !== null) {
      const name = paged[pendingCancelIdx].name;
      setSessions(prev => prev.filter((_, i) => filtered.indexOf(paged[i]) !== filtered.indexOf(paged[pendingCancelIdx])));
      setToast({ type: 'success', msg: `Đã hủy phiên tư vấn của ${name}` });
      setTimeout(() => setToast(null), 2000);
    }
    setShowConfirm(false);
    setPendingCancelIdx(null);
  };
  const cancelCancel = () => {
    setShowConfirm(false);
    setPendingCancelIdx(null);
  };
  // Thông báo thao tác khác
  const handleAction = (action, name) => {
    if (action === 'Chi tiết') {
      const session = filtered.find(s => s.name === name);
      setDetailSession(session);
    }
    if (action === 'Xem' || action === 'Chi tiết') {
      setToast({ type: 'success', msg: `Đã mở chi tiết phiên của ${name}` });
      setTimeout(() => setToast(null), 2000);
    }
  };

  return (
    <>
      <AdminLayout />
      <MainContent>
        <ContentWrapper>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1f2937', marginBottom: 24 }}>Tư vấn trực tuyến</h2>
          {/* Bộ lọc & tìm kiếm */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 18, flexWrap: 'wrap' }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm kiếm tên khách hàng hoặc chuyên viên..." style={{ padding: 8, borderRadius: 8, border: '1px solid #d1d5db', minWidth: 220 }} />
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ padding: 8, borderRadius: 8, border: '1px solid #d1d5db' }}>
              <option value="all">Tất cả trạng thái</option>
              <option value="processing">Đang chờ</option>
              <option value="done">Hoàn thành</option>
            </select>
            <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} style={{ padding: 8, borderRadius: 8, border: '1px solid #d1d5db' }} />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Danh sách phiên tư vấn</CardTitle>
              <Button active>Bắt đầu tư vấn mới</Button>
            </CardHeader>
            <TableContainer>
              <StaffTable>
                <thead>
                  <tr>
                    <StaffTh>Họ tên</StaffTh>
                    <StaffTh>Chuyên viên</StaffTh>
                    <StaffTh>Thời gian</StaffTh>
                    <StaffTh>Trạng thái</StaffTh>
                    <StaffTh>Thao tác</StaffTh>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((s, idx) => (
                    <tr key={idx}>
                      <StaffTd>{s.name}</StaffTd>
                      <StaffTd>{s.consultant}</StaffTd>
                      <StaffTd>{new Date(s.time).toLocaleString('vi-VN')}</StaffTd>
                      <StaffTd><Badge status={s.status}>{s.statusText}</Badge></StaffTd>
                      <StaffTd>
                        <Button className="small" onClick={() => handleAction('Chi tiết', s.name)} title="Xem chi tiết"><FaEye /></Button>
                        {s.actions.includes('Hủy') && (
                          <Button className="small" color="#ef4444" onClick={() => handleCancel(idx)} title="Hủy"><FaTrash /></Button>
                        )}
                      </StaffTd>
                    </tr>
                  ))}
                </tbody>
              </StaffTable>
            </TableContainer>
            {/* Phân trang */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 18 }}>
              <Button onClick={() => setPage(page-1)} disabled={page === 1} style={{minWidth:60,opacity:page===1?0.5:1}}>Trước</Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button key={i} active={page === i+1} onClick={() => setPage(i+1)}>{i+1}</Button>
              ))}
              <Button onClick={() => setPage(page+1)} disabled={page === totalPages} style={{minWidth:60,opacity:page===totalPages?0.5:1}}>Sau</Button>
            </div>
          </Card>
        </ContentWrapper>
      </MainContent>
      {/* Modal xác nhận hủy */}
      {showConfirm && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.22)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{background:'#fff',borderRadius:18,padding:'36px 32px 28px 32px',minWidth:340,textAlign:'center',boxShadow:'0 4px 32px rgba(76,220,128,0.13)'}}>
            <div style={{fontSize:20,fontWeight:700,marginBottom:22,color:'#059669'}}>Bạn có chắc muốn hủy phiên tư vấn này?</div>
            <div style={{display:'flex',gap:18,justifyContent:'center'}}>
              <button onClick={confirmCancel} style={{padding:'12px 28px',borderRadius:10,border:'none',fontSize:16,fontWeight:600,cursor:'pointer',background:'#059669',color:'#fff',boxShadow:'0 1px 4px rgba(76,220,128,0.10)',transition:'background 0.2s',outline:'none'}}>Xác nhận</button>
              <button onClick={cancelCancel} style={{padding:'12px 28px',borderRadius:10,border:'none',fontSize:16,fontWeight:600,cursor:'pointer',background:'#e5e7eb',color:'#374151',boxShadow:'0 1px 4px rgba(76,220,128,0.10)',transition:'background 0.2s',outline:'none'}}>Hủy</button>
            </div>
          </div>
        </div>
      )}
      {/* Modal xem chi tiết */}
      {detailSession && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.22)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{background:'#fff',borderRadius:18,padding:'36px 32px 28px 32px',minWidth:340,maxWidth:500,textAlign:'left',boxShadow:'0 4px 32px rgba(76,220,128,0.13)'}}>
            <div style={{fontSize:20,fontWeight:700,marginBottom:18,color:'#059669',textAlign:'center'}}>Chi tiết phiên tư vấn</div>
            <div style={{marginBottom:12}}><b>Khách hàng:</b> {detailSession.name}</div>
            <div style={{marginBottom:12}}><b>Chuyên viên:</b> {detailSession.consultant}</div>
            <div style={{marginBottom:12}}><b>Thời gian:</b> {new Date(detailSession.time).toLocaleString('vi-VN')}</div>
            <div style={{marginBottom:12}}><b>Trạng thái:</b> <Badge status={detailSession.status}>{detailSession.statusText}</Badge></div>
            {/* Có thể bổ sung thêm thông tin chi tiết ở đây */}
            <div style={{display:'flex',justifyContent:'center',marginTop:18}}>
              <button onClick={() => setDetailSession(null)} style={{padding:'12px 28px',borderRadius:10,border:'none',fontSize:16,fontWeight:600,cursor:'pointer',background:'#059669',color:'#fff',boxShadow:'0 1px 4px rgba(76,220,128,0.10)',transition:'background 0.2s',outline:'none'}}>Đóng</button>
            </div>
          </div>
        </div>
      )}
      {/* Toast thông báo */}
      {toast && (
        <div style={{position:'fixed',top:30,right:30,zIndex:2000,background:toast.type==='success'?'#d1fae5':'#fee2e2',color:toast.type==='success'?'#059669':'#b91c1c',padding:'14px 28px',borderRadius:10,boxShadow:'0 2px 12px rgba(0,0,0,0.13)',fontWeight:600}}>
          {toast.msg}
        </div>
      )}
    </>
  );
};

export default AdminTuVan;