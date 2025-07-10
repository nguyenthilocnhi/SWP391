import React, { useState } from 'react';
import AdminLayout from '../components/adminLayout';
import styled from 'styled-components';

const MainContent = styled.main`
  padding: 120px 0 24px 215px;
  background: #f9fafb;
  min-height: 100vh;
  width: 144vw;
  max-width: 99vw;
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
  max-width: 1230px;
  margin: 0 54px;
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
  background: ${props => props.status === 'confirmed' ? '#d1fae5' : props.status === 'pending' ? '#fef3c7' : '#dbeafe'};
  color: ${props => props.status === 'confirmed' ? '#065f46' : props.status === 'pending' ? '#92400e' : '#1e40af'};
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
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 16px;
`;
const ModalContent = styled.div`
  background: #ffffff;
  padding: 32px 28px;
  border-radius: 18px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 8px 32px rgba(79,70,229,0.18), 0 1.5px 6px rgba(0,0,0,0.08);
`;
const ModalTitle = styled.h3`
  margin-top: 0;
  font-size: 18px;
  margin-bottom: 16px;
  color: #111827;
  text-align: center;
`;
const ModalInput = styled.input`
  width: 93%;
  padding: 10px 12px;
  margin-bottom: 14px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  background-color: #f9fafb;
  transition: border-color 0.3s;
  &:focus {
    outline: none;
    border-color: #6366f1;
    background-color: #fff;
  }
`;
const ModalSelect = styled.select`
  width: 93%;
  padding: 10px 12px;
  margin-bottom: 14px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  background-color: #f9fafb;
  transition: border-color 0.3s;
  &:focus {
    outline: none;
    border-color: #6366f1;
    background-color: #fff;
  }
`;

const tuVanDetails = [
  "Tư vấn trước khi làm xét nghiệm STI",
  "Tư vấn sau khi nhận kết quả xét nghiệm",
  "Tư vấn xét nghiệm định kỳ",
  "Tư vấn lựa chọn gói xét nghiệm phù hợp",
  "Tư vấn cho cặp đôi trước QHTD không bao",
  "Tư vấn sức khỏe sinh sản",
  "Tư vấn tình dục an toàn",
  "Tư vấn dậy thì và sức khỏe giới tính cho thanh thiếu niên"
];
const xetNghiemDetails = [
  "HIV Ag/Ab combo (HIV test thế hệ 4)",
  "Xét nghiệm giang mai (RPR/TPHA)",
  "Xét nghiệm lậu (PCR hoặc nhuộm soi)",
  "Chlamydia (PCR)",
  "HBsAg, Anti-HBs",
  "HCV Ab",
  "Xét nghiệm HSV 1 & 2 (Herpes Simplex Virus)",
  "Pap smear (Tế bào học cổ tử cung)",
  "Trichomonas vaginalis",
  "Sùi mào gà",
  "Chancroid (Hạ cam mềm)",
  "Rận mu (Pubic lice)",
  "Virus Zika (PCR)",
  "Mycoplasma genitalium",
  "Ureaplasma urealyticum"
];
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
const initialAppointments = [
  {
    name: 'Nguyễn Thị Minh',
    service: 'Tư vấn',
    time: '2025-07-04T14:30',
    status: 'confirmed',
    serviceDetail: getRandom(tuVanDetails),
    customerFeedback: 'Dịch vụ tốt, nhân viên nhiệt tình.',
    consultantNote: 'Khách hàng quan tâm sức khỏe tổng quát.',
  },
  {
    name: 'Trần Văn Hải',
    service: 'Xét nghiệm',
    time: '2025-07-05T09:00',
    status: 'pending',
    serviceDetail: getRandom(xetNghiemDetails),
    customerFeedback: '',
    consultantNote: '',
  },
  {
    name: 'Lê Minh Đức',
    service: 'Khám tổng quát',
    time: '2025-07-06T10:15',
    status: 'new',
    serviceDetail: '',
    customerFeedback: '',
    consultantNote: '',
  },
  {
    name: 'Phạm Thị Hoa',
    service: 'Tư vấn',
    time: '2025-07-07T15:45',
    status: 'confirmed',
    serviceDetail: getRandom(tuVanDetails),
    customerFeedback: 'Dịch vụ tốt, nhân viên nhiệt tình.',
    consultantNote: 'Khách hàng quan tâm sức khỏe tổng quát.',
  },
  {
    name: 'Ngô Văn An',
    service: 'Xét nghiệm',
    time: '2025-07-08T08:30',
    status: 'pending',
    serviceDetail: getRandom(xetNghiemDetails),
    customerFeedback: '',
    consultantNote: '',
  },
  {
    name: 'Đặng Thị Mai',
    service: 'Khám tổng quát',
    time: '2025-07-09T11:00',
    status: 'confirmed',
    serviceDetail: '',
    customerFeedback: 'Dịch vụ tốt, nhân viên nhiệt tình.',
    consultantNote: 'Khách hàng quan tâm sức khỏe tổng quát.',
  },
  {
    name: 'Vũ Quang Huy',
    service: 'Tư vấn',
    time: '2025-07-10T13:30',
    status: 'new',
    serviceDetail: getRandom(tuVanDetails),
    customerFeedback: '',
    consultantNote: '',
  },
  {
    name: 'Bùi Thị Lan',
    service: 'Xét nghiệm',
    time: '2025-07-11T16:00',
    status: 'pending',
    serviceDetail: getRandom(xetNghiemDetails),
    customerFeedback: '',
    consultantNote: '',
  },
  {
    name: 'Hoàng Văn Sơn',
    service: 'Khám tổng quát',
    time: '2025-07-12T09:45',
    status: 'confirmed',
    serviceDetail: '',
    customerFeedback: 'Dịch vụ tốt, nhân viên nhiệt tình.',
    consultantNote: 'Khách hàng quan tâm sức khỏe tổng quát.',
  },
  {
    name: 'Trịnh Thị Hạnh',
    service: 'Tư vấn',
    time: '2025-07-13T14:00',
    status: 'pending',
    serviceDetail: getRandom(tuVanDetails),
    customerFeedback: '',
    consultantNote: '',
  },
  {
    name: 'Lý Văn Bình',
    service: 'Xét nghiệm',
    time: '2025-07-14T10:30',
    status: 'new',
    serviceDetail: getRandom(xetNghiemDetails),
    customerFeedback: '',
    consultantNote: '',
  },
  {
    name: 'Nguyễn Văn B',
    service: 'Khám tổng quát',
    time: '2025-07-15T15:15',
    status: 'confirmed',
    serviceDetail: '',
    customerFeedback: 'Dịch vụ tốt, nhân viên nhiệt tình.',
    consultantNote: 'Khách hàng quan tâm sức khỏe tổng quát.',
  },
  {
    name: 'Trần Thị C',
    service: 'Tư vấn',
    time: '2025-07-16T08:45',
    status: 'pending',
    serviceDetail: getRandom(tuVanDetails),
    customerFeedback: '',
    consultantNote: '',
  },
  {
    name: 'Lê Văn D',
    service: 'Xét nghiệm',
    time: '2025-07-17T11:30',
    status: 'confirmed',
    serviceDetail: getRandom(xetNghiemDetails),
    customerFeedback: 'Dịch vụ tốt, nhân viên nhiệt tình.',
    consultantNote: 'Khách hàng quan tâm sức khỏe tổng quát.',
  },
  {
    name: 'Phạm Thị E',
    service: 'Khám tổng quát',
    time: '2025-07-18T13:00',
    status: 'new',
    serviceDetail: '',
    customerFeedback: '',
    consultantNote: '',
  },
  {
    name: 'Ngô Văn F',
    service: 'Tư vấn',
    time: '2025-07-19T09:20',
    status: 'pending',
    serviceDetail: getRandom(tuVanDetails),
    customerFeedback: '',
    consultantNote: '',
  },
  {
    name: 'Đặng Thị G',
    service: 'Xét nghiệm',
    time: '2025-07-20T14:40',
    status: 'confirmed',
    serviceDetail: getRandom(xetNghiemDetails),
    customerFeedback: 'Dịch vụ tốt, nhân viên nhiệt tình.',
    consultantNote: 'Khách hàng quan tâm sức khỏe tổng quát.',
  },
  {
    name: 'Vũ Quang H',
    service: 'Khám tổng quát',
    time: '2025-07-21T10:10',
    status: 'pending',
    serviceDetail: '',
    customerFeedback: '',
    consultantNote: '',
  },
  {
    name: 'Bùi Thị I',
    service: 'Tư vấn',
    time: '2025-07-22T15:50',
    status: 'confirmed',
    serviceDetail: getRandom(tuVanDetails),
    customerFeedback: 'Dịch vụ tốt, nhân viên nhiệt tình.',
    consultantNote: 'Khách hàng quan tâm sức khỏe tổng quát.',
  },
  {
    name: 'Hoàng Văn K',
    service: 'Xét nghiệm',
    time: '2025-07-23T08:00',
    status: 'new',
    serviceDetail: getRandom(xetNghiemDetails),
    customerFeedback: '',
    consultantNote: '',
  },
];

const formatDateTime = (dateTimeStr) => {
  if (!dateTimeStr) return '';
  const d = new Date(dateTimeStr);
  return d.toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });
};

// Hàm lấy tên chi tiết dịch vụ đồng bộ với FE_SAMPLE_DATA
function getServiceDetailDisplay(service, detail) {
  let arr = [];
  if (service === 'Tư vấn') arr = tuVanDetails;
  else if (service === 'Xét nghiệm') arr = xetNghiemDetails;
  if (!detail) return 'Chưa cập nhật';
  const found = arr.find(d => d === detail);
  return found ? found : 'Chưa cập nhật';
}

const AdminLichHen = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ name: '', service: '', time: '', status: 'confirmed', serviceDetail: '' });
  const [toast, setToast] = useState('');
  // State cho filter
  const [search, setSearch] = useState('');
  const [filterService, setFilterService] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [deleteIndex, setDeleteIndex] = useState(null);
  // State cho dropdown chi tiết dịch vụ
  const [serviceDetailOptions, setServiceDetailOptions] = useState([]);
  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // Lọc danh sách lịch hẹn
  const filteredAppointments = appointments.filter(a => {
    const matchName = a.name.toLowerCase().includes(search.toLowerCase());
    const matchService = filterService ? a.service === filterService : true;
    const matchStatus = filterStatus ? a.status === filterStatus : true;
    return matchName && matchService && matchStatus;
  });

  // Phân trang trên filteredAppointments
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const goToPage = (page) => setCurrentPage(page);
  React.useEffect(() => { setCurrentPage(1); }, [search, filterService, filterStatus, appointments]);

  // Validate error state
  const [formError, setFormError] = useState('');
  const errorTimeoutRef = React.useRef();

  const openAddModal = () => {
    setModalType('add');
    setForm({ name: '', service: '', time: '', status: 'confirmed', serviceDetail: '' });
    setEditIndex(null);
    setModalOpen(true);
  };
  const openEditModal = idx => {
    setModalType('edit');
    setForm({ ...appointments[idx] });
    setEditIndex(idx);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  // Khi chọn dịch vụ, cập nhật danh sách chi tiết dịch vụ
  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'service') {
      let options = [];
      if (value === 'Tư vấn') options = tuVanDetails;
      else if (value === 'Xét nghiệm') options = xetNghiemDetails;
      setServiceDetailOptions(options);
      setForm(f => ({ ...f, [name]: value, serviceDetail: '' })); // reset serviceDetail khi đổi loại dịch vụ
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Chuẩn hóa thời gian về 'YYYY-MM-DDTHH:mm'
  const normalizeTime = (timeStr) => {
    if (!timeStr) return '';
    const d = new Date(timeStr);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  };

  const handleSave = () => {
    if (!form.name || !form.service || !form.time || !form.status) {
      setFormError('Vui lòng nhập đầy đủ thông tin và chọn dịch vụ.');
      clearTimeout(errorTimeoutRef.current);
      errorTimeoutRef.current = setTimeout(() => setFormError(''), 5000);
      return;
    }
    // Kiểm tra ngày giờ không được ở quá khứ
    const now = new Date();
    const selected = new Date(form.time);
    if (selected < now.setSeconds(0,0)) {
      setFormError('Vui lòng chọn thời gian hiện tại hoặc tương lai.');
      clearTimeout(errorTimeoutRef.current);
      errorTimeoutRef.current = setTimeout(() => setFormError(''), 5000);
      return;
    }
    setFormError('');
    // Kiểm tra trùng lịch (cùng tên, thời gian, dịch vụ, chuẩn hóa)
    const normalizedName = form.name.trim().toLowerCase();
    const normalizedTime = normalizeTime(form.time);
    const normalizedService = form.service.trim().toLowerCase();
    const isDuplicate = appointments.some((a, idx) =>
      a.name.trim().toLowerCase() === normalizedName &&
      normalizeTime(a.time) === normalizedTime &&
      a.service.trim().toLowerCase() === normalizedService &&
      (modalType === 'add' || idx !== editIndex)
    );
    if (isDuplicate) {
      setToast('Lịch hẹn này đã tồn tại!');
      setTimeout(() => setToast(''), 2000);
      return;
    }
    // Tự động random serviceDetail nếu chưa nhập
    let detail = form.serviceDetail;
    if (!detail) {
      if (form.service === 'Tư vấn') {
        detail = getRandom(tuVanDetails);
      } else if (form.service === 'Xét nghiệm') {
        detail = getRandom(xetNghiemDetails);
      }
    }
    const newForm = { ...form, serviceDetail: detail };
    if (modalType === 'add') {
      setAppointments([...appointments, { ...newForm }]);
    } else if (modalType === 'edit' && editIndex !== null) {
      const updated = [...appointments];
      updated[editIndex] = { ...newForm };
      setAppointments(updated);
    }
    setToast('Lưu thành công!');
    setTimeout(() => setToast(''), 2000);
    closeModal();
  };
  const handleDelete = idx => {
    setDeleteIndex(idx);
  };
  const confirmDelete = () => {
    setAppointments(appointments.filter((_, i) => i !== deleteIndex));
    setDeleteIndex(null);
  };
  const cancelDelete = () => setDeleteIndex(null);

  const [detailIndex, setDetailIndex] = useState(null);

  return (
    <>
      <AdminLayout />
      <MainContent>
        <ContentWrapper>
          {toast && (
            <div style={{ position: 'fixed', top: 90, right: 40, zIndex: 2000, background: toast === 'Lưu thành công!' ? '#22c55e' : '#ef4444', color: '#fff', padding: '12px 28px', borderRadius: 8, fontWeight: 600, boxShadow: '0 2px 8px rgba(79,70,229,0.13)' }}>
              {toast}
            </div>
          )}
          <Card>
            {/* Bộ lọc */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '0 8px', margin: '0 0 16px 0', flexWrap: 'wrap' }}>
              <CardTitle style={{ margin: 0, fontSize: 20 }}>Danh sách lịch hẹn</CardTitle>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <ModalInput
                  style={{ width: 180, marginBottom: 0 }}
                  placeholder="Tìm theo tên"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <ModalSelect style={{ width: 200, marginBottom: 0 }} value={filterService} onChange={e => setFilterService(e.target.value)}>
                  <option value="">Tất cả dịch vụ</option>
                  <option value="Tư vấn">Tư vấn</option>
                  <option value="Xét nghiệm">Xét nghiệm</option>
                </ModalSelect>
                <ModalSelect style={{ width: 200, marginBottom: 0 }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                  <option value="">Tất cả trạng thái</option>
                  <option value="confirmed">Đã xác nhận</option>
                  <option value="pending">Chờ xác nhận</option>
                  <option value="new">Mới</option>
                </ModalSelect>
                <Button color="#22c55e" textcolor="#fff" onClick={openAddModal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 12px', minWidth: 44, height: 40, fontSize: 20, borderRadius: 8 }}>
                  <i className="fas fa-plus"></i>
                </Button>
              </div>
            </div>
            <TableContainer>
              <StaffTable>
                <thead>
                  <tr>
                    <StaffTh>Họ tên</StaffTh>
                    <StaffTh>Dịch vụ</StaffTh>
                    <StaffTh>Thời gian</StaffTh>
                    <StaffTh>Trạng thái</StaffTh>
                    <StaffTh>Thao tác</StaffTh>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAppointments.map((a, idx) => (
                    <tr key={idx}>
                      <StaffTd>{a.name}</StaffTd>
                      <StaffTd>{a.service}</StaffTd>
                      <StaffTd>{formatDateTime(a.time)}</StaffTd>
                      <StaffTd><Badge status={a.status}>{a.status === 'confirmed' ? 'Đã xác nhận' : a.status === 'pending' ? 'Chờ xác nhận' : 'Mới'}</Badge></StaffTd>
                      <StaffTd>
                        <Button className="small" onClick={() => setDetailIndex(filteredAppointments.indexOf(a))} title="Xem chi tiết"><i className="fas fa-eye"></i></Button>
                        <Button className="small" onClick={() => openEditModal(filteredAppointments.indexOf(a))} title="Chỉnh sửa"><i className="fas fa-edit"></i></Button>
                        <Button className="small" color="#ef4444" textcolor="#fff" onClick={() => handleDelete(filteredAppointments.indexOf(a))} title="Xóa"><i className="fas fa-trash"></i></Button>
                      </StaffTd>
                    </tr>
                  ))}
                  {paginatedAppointments.length === 0 && (
                    <tr><StaffTd colSpan={5} style={{ textAlign: 'center', color: '#888' }}>Không có lịch hẹn nào.</StaffTd></tr>
                  )}
                </tbody>
              </StaffTable>
            </TableContainer>
            {/* Phân trang */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }}>
                <Button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Trước</Button>
                {[...Array(totalPages)].map((_, i) => (
                  <Button key={i} active={currentPage === i + 1} onClick={() => goToPage(i + 1)}>{i + 1}</Button>
                ))}
                <Button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Sau</Button>
              </div>
            )}
          </Card>
        </ContentWrapper>
        {modalOpen && (
          <ModalOverlay>
            <ModalContent>
              <ModalTitle>{modalType === 'add' ? 'Thêm lịch hẹn' : 'Chỉnh sửa lịch hẹn'}</ModalTitle>
              {formError && (
                <div style={{ color: '#ef4444', background: '#fef2f2', borderRadius: 8, padding: '8px 12px', marginBottom: 8, textAlign: 'center', fontSize: 15, fontWeight: 500 }}>
                  {formError}
                </div>
              )}
              <form onSubmit={e => { e.preventDefault(); handleSave(); }}>
                <ModalInput name="name" placeholder="Họ tên" value={form.name} onChange={handleChange} />
                <ModalSelect name="service" value={form.service} onChange={handleChange} style={{ width: '100%' }}>
                  <option value="">-- Chọn dịch vụ --</option>
                  <option value="Tư vấn">Tư vấn</option>
                  <option value="Xét nghiệm">Xét nghiệm</option>
                </ModalSelect>
                {/* Dropdown chi tiết dịch vụ nếu là tư vấn hoặc xét nghiệm */}
                {form.service === 'Tư vấn' && (
                  <ModalSelect name="serviceDetail" value={form.serviceDetail} onChange={handleChange} style={{ width: '100%' }}>
                    <option value="">-- Chọn chi tiết tư vấn --</option>
                    {tuVanDetails.map((d, i) => (
                      <option key={i} value={d}>{d}</option>
                    ))}
                  </ModalSelect>
                )}
                {form.service === 'Xét nghiệm' && (
                  <ModalSelect name="serviceDetail" value={form.serviceDetail} onChange={handleChange} style={{ width: '100%' }}>
                    <option value="">-- Chọn chi tiết xét nghiệm --</option>
                    {xetNghiemDetails.map((d, i) => (
                      <option key={i} value={d}>{d}</option>
                    ))}
                  </ModalSelect>
                )}
                {/* Nếu là loại khác hoặc chưa chọn, cho nhập text tự do */}
                {form.service !== 'Tư vấn' && form.service !== 'Xét nghiệm' && (
                  <ModalInput name="serviceDetail" placeholder="Chi tiết dịch vụ" value={form.serviceDetail} onChange={handleChange} />
                )}
                <ModalInput name="time" type="datetime-local" value={form.time} onChange={handleChange} min={new Date().toISOString().slice(0,16)} />
                <ModalSelect name="status" value={form.status} onChange={handleChange} style={{ width: '100%' }}>
                  <option value="confirmed">Đã xác nhận</option>
                  <option value="pending">Chờ xác nhận</option>
                  <option value="new">Mới</option>
                </ModalSelect>
                <div style={{ display: 'flex', gap: 10, marginTop: 16, justifyContent: 'center' }}>
                  <Button color="#22c55e" textcolor="#fff" style={{ minWidth: 80, fontWeight: 600, boxShadow: '0 2px 8px rgba(79,70,229,0.08)' }} type="submit">Lưu</Button>
                  <Button color="#e5e7eb" textcolor="#1f2937" style={{ minWidth: 80, fontWeight: 500 }} onClick={closeModal} type="button">Hủy</Button>
                </div>
              </form>
            </ModalContent>
          </ModalOverlay>
        )}
        {detailIndex !== null && (
          <ModalOverlay>
            <ModalContent style={{ maxWidth: 480 }}>
              <ModalTitle>Chi tiết lịch hẹn</ModalTitle>
              <div style={{ padding: '8px 0', fontSize: 15 }}>
                <b>Họ tên:</b> {appointments[detailIndex]?.name}<br/>
                <b>Dịch vụ:</b> {appointments[detailIndex]?.service}<br/>
                <b>Thời gian:</b> {formatDateTime(appointments[detailIndex]?.time)}<br/>
                <b>Trạng thái:</b> <Badge status={appointments[detailIndex]?.status}>{appointments[detailIndex]?.status === 'confirmed' ? 'Đã xác nhận' : appointments[detailIndex]?.status === 'pending' ? 'Chờ xác nhận' : 'Mới'}</Badge><br/>
                <b>Chi tiết dịch vụ:</b> {getServiceDetailDisplay(appointments[detailIndex]?.service, appointments[detailIndex]?.serviceDetail)}<br/>
                <b>Phản hồi của khách hàng:</b> {appointments[detailIndex]?.customerFeedback || 'Chưa có'}<br/>
                <b>Chú thích của tư vấn viên:</b> {appointments[detailIndex]?.consultantNote || 'Chưa có'}
              </div>
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <Button color="#22c55e" textcolor="#fff" onClick={() => setDetailIndex(null)}>Đóng</Button>
              </div>
            </ModalContent>
          </ModalOverlay>
        )}
        {deleteIndex !== null && (
          <ModalOverlay>
            <ModalContent>
              <ModalTitle>Xác nhận xóa lịch hẹn</ModalTitle>
              <div style={{ margin: '16px 0', color: '#374151', textAlign: 'center' }}>
                Bạn có chắc chắn muốn xóa lịch hẹn của <b>{appointments[deleteIndex]?.name}</b> không?
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 12 }}>
                <Button color="#ef4444" textcolor="#fff" style={{ minWidth: 80, fontWeight: 600 }} onClick={confirmDelete}>Xóa</Button>
                <Button color="#e5e7eb" textcolor="#1f2937" style={{ minWidth: 80, fontWeight: 500 }} onClick={cancelDelete}>Hủy</Button>
              </div>
            </ModalContent>
          </ModalOverlay>
        )}
      </MainContent>
    </>
  );
};

export default AdminLichHen;
