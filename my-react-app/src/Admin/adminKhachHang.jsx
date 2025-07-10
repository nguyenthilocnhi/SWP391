import React, { useState } from 'react';
import AdminLayout from '../components/adminLayout';
import styled from 'styled-components';
import { FaArrowRight, FaPlus } from 'react-icons/fa';

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
const SearchBox = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  width: 220px;
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
  max-height: 420px;
  overflow-y: auto;
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
const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const ModalLabel = styled.label`
  font-size: 14px;
  color: #374151;
  margin-bottom: 2px;
  font-weight: 500;
`;
const FilterSelect = styled.select`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  background-color: #f9fafb;
  color: #374151;
  transition: border-color 0.3s, box-shadow 0.3s;
  &:focus {
    outline: none;
    border-color:rgb(11, 12, 12);
    box-shadow: 0 0 0 2pxrgba(69, 69, 72, 0.2);
    background: #fff;
  }
  /* Style dropdown list */
  &::-webkit-scrollbar {
    width: 8px;
    background: #f3f4f6;
  }
  & option {
    background: #fff;
    color: #374151;
    border-radius: 8px;
    padding: 8px 12px;
  }
`;

const initialCustomers = [
  { // Tư vấn
    name: 'Nguyễn Thị Minh',
    email: 'minh@example.com',
    phone: '0901234567',
    date: '2025-07-01',
    type: 'Tư vấn',
    status: 'confirmed',
    address: '123 Lê Lợi, Q.1, TP.HCM',
    note: 'Khách hàng VIP',
    serviceDetail: 'Tư vấn trước khi làm xét nghiệm STI',
    price: 150000,
    paymentStatus: 'Đã thanh toán',
  },
  { // Xét nghiệm
    name: 'Trần Văn Hải',
    email: 'hai.tran@example.com',
    phone: '0912345678',
    date: '2025-07-10',
    type: 'Xét nghiệm',
    status: 'pending',
    address: '456 Nguyễn Văn Cừ, Q.5, TP.HCM',
    note: 'Cần xác nhận lại thông tin',
    serviceDetail: 'HIV Ag/Ab combo (HIV test thế hệ 4)',
    price: 150000,
    paymentStatus: 'Chưa thanh toán',
  },
  {
    name: 'Lê Minh Đức',
    email: 'duc.le@example.com',
    phone: '0923456789',
    date: '2025-08-05',
    type: 'Khám tổng quát',
    status: 'new',
    address: '789 Điện Biên Phủ, Q.2, TP.HCM',
    note: 'Cần liên hệ lại',
    serviceDetail: 'Khám tổng quát',
    price: 350000,
    paymentStatus: 'Chưa thanh toán',
  },
  { // Tư vấn
    name: 'Phạm Thị Hoa',
    email: 'hoa.pham@example.com',
    phone: '0934567890',
    date: '2025-08-15',
    type: 'Tư vấn',
    status: 'confirmed',
    address: '101 Hai Bà Trưng, Q.1, TP.HCM',
    note: 'Đã thanh toán xong',
    serviceDetail: 'Tư vấn sau khi nhận kết quả xét nghiệm',
    price: 150000,
    paymentStatus: 'Đã thanh toán',
  },
  { // Xét nghiệm
    name: 'Ngô Văn An',
    email: 'an.ngo@example.com',
    phone: '0945678901',
    date: '2025-09-01',
    type: 'Xét nghiệm',
    status: 'pending',
    address: '202 Nguyễn Trãi, Q.1, TP.HCM',
    note: 'Cần xác nhận lại thông tin',
    serviceDetail: 'Xét nghiệm giang mai (RPR/TPHA)',
    price: 200000,
    paymentStatus: 'Chưa thanh toán',
  },
  {
    name: 'Đặng Thị Mai',
    email: 'mai.dang@example.com',
    phone: '0956789012',
    date: '2025-09-12',
    type: 'Khám tổng quát',
    status: 'confirmed',
    address: '303 Lê Duẩn, Q.1, TP.HCM',
    note: 'Đã thanh toán xong',
    serviceDetail: 'Khám tổng quát',
    price: 380000,
    paymentStatus: 'Đã thanh toán',
  },
  { // Tư vấn
    name: 'Vũ Quang Huy',
    email: 'huy.vu@example.com',
    phone: '0967890123',
    date: '2025-09-20',
    type: 'Tư vấn',
    status: 'new',
    address: '404 Nguyễn Văn Cừ, Q.5, TP.HCM',
    note: 'Cần liên hệ lại',
    serviceDetail: 'Tư vấn xét nghiệm định kỳ',
    price: 150000,
    paymentStatus: 'Chưa thanh toán',
  },
  { // Xét nghiệm
    name: 'Bùi Thị Lan',
    email: 'lan.bui@example.com',
    phone: '0978901234',
    date: '2025-10-01',
    type: 'Xét nghiệm',
    status: 'pending',
    address: '505 Lê Lợi, Q.1, TP.HCM',
    note: 'Cần xác nhận lại thông tin',
    serviceDetail: 'HBsAg, Anti-HBs',
    price: 150000,
    paymentStatus: 'Chưa thanh toán',
  },
  {
    name: 'Hoàng Văn Sơn',
    email: 'son.hoang@example.com',
    phone: '0989012345',
    date: '2025-10-10',
    type: 'Khám tổng quát',
    status: 'confirmed',
    address: '606 Hai Bà Trưng, Q.1, TP.HCM',
    note: 'Đã thanh toán xong',
    serviceDetail: 'Khám tổng quát',
    price: 390000,
    paymentStatus: 'Đã thanh toán',
  },
  { // Tư vấn
    name: 'Trịnh Thị Hạnh',
    email: 'hanh.trinh@example.com',
    phone: '0990123456',
    date: '2025-10-15',
    type: 'Tư vấn',
    status: 'pending',
    address: '707 Nguyễn Trãi, Q.1, TP.HCM',
    note: 'Cần xác nhận lại thông tin',
    serviceDetail: 'Tư vấn sức khỏe sinh sản',
    price: 200000,
    paymentStatus: 'Chưa thanh toán',
  },
  { // Xét nghiệm
    name: 'Lý Văn Bình',
    email: 'binh.ly@example.com',
    phone: '0902345678',
    date: '2025-10-20',
    type: 'Xét nghiệm',
    status: 'new',
    address: '808 Lê Duẩn, Q.1, TP.HCM',
    note: 'Cần liên hệ lại',
    serviceDetail: 'Chlamydia (PCR)',
    price: 650000,
    paymentStatus: 'Chưa thanh toán',
  },
];

// Thêm hàm formatDate
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
};

// Danh sách chi tiết dịch vụ tư vấn và xét nghiệm kèm giá (đồng nhất với FE_SAMPLE_DATA trong DichVu.jsx)
const tuVanDetails = [
  { ten: "Tư vấn trước khi làm xét nghiệm STI", gia: 150000 },
  { ten: "Tư vấn sau khi nhận kết quả xét nghiệm", gia: 150000 },
  { ten: "Tư vấn xét nghiệm định kỳ", gia: 150000 },
  { ten: "Tư vấn lựa chọn gói xét nghiệm phù hợp", gia: 100000 },
  { ten: "Tư vấn cho cặp đôi trước QHTD không bao", gia: 200000 },
  { ten: "Tư vấn sức khỏe sinh sản", gia: 200000 },
  { ten: "Tư vấn tình dục an toàn", gia: 200000 },
  { ten: "Tư vấn dậy thì và sức khỏe giới tính cho thanh thiếu niên", gia: 200000 }
];
const xetNghiemDetails = [
  { ten: "HIV Ag/Ab combo (HIV test thế hệ 4)", gia: 150000 },
  { ten: "Xét nghiệm giang mai (RPR/TPHA)", gia: 200000 },
  { ten: "Xét nghiệm lậu (PCR hoặc nhuộm soi)", gia: 800000 },
  { ten: "Chlamydia (PCR)", gia: 650000 },
  { ten: "HBsAg, Anti-HBs", gia: 150000 },
  { ten: "HCV Ab", gia: 150000 },
  { ten: "Xét nghiệm HSV 1 & 2 (Herpes Simplex Virus)", gia: 700000 },
  { ten: "Pap smear (Tế bào học cổ tử cung)", gia: 500000 },
  { ten: "Trichomonas vaginalis", gia: 70000 },
  { ten: "Sùi mào gà", gia: 1200000 },
  { ten: "Chancroid (Hạ cam mềm)", gia: 800000 },
  { ten: "Rận mu (Pubic lice)", gia: 100000 },
  { ten: "Virus Zika (PCR)", gia: 1200000 },
  { ten: "Mycoplasma genitalium", gia: 800000 },
  { ten: "Ureaplasma urealyticum", gia: 700000 }
];
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function getGiaTuChiTiet(serviceType, detail) {
  let arr = [];
  if (serviceType === 'Tư vấn') arr = tuVanDetails;
  else if (serviceType === 'Xét nghiệm') arr = xetNghiemDetails;
  const found = arr.find(d => d.ten === detail);
  return found ? found.gia : '';
}

// Hàm lấy tên chi tiết dịch vụ đồng bộ với FE_SAMPLE_DATA
function getServiceDetailDisplay(type, detail) {
  let arr = [];
  if (type === 'Tư vấn') arr = tuVanDetails.map(d => d.ten);
  else if (type === 'Xét nghiệm') arr = xetNghiemDetails.map(d => d.ten);
  if (!detail) return 'Chưa cập nhật';
  if (type === 'Tư vấn' || type === 'Xét nghiệm') {
    return arr.includes(detail) ? detail : 'Chưa cập nhật';
  }
  return detail || 'Chưa cập nhật';
}

const AdminKhachHang = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterFromDate, setFilterFromDate] = useState('');
  const [filterToDate, setFilterToDate] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', type: '', serviceDetail: '', price: '' });
  const [formError, setFormError] = useState('');
  const errorTimeoutRef = React.useRef();
  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [detailIndex, setDetailIndex] = useState(null);
  // State cho dropdown chi tiết dịch vụ
  const [serviceDetailOptions, setServiceDetailOptions] = useState([]);

  // Lọc nâng cao
  const filteredCustomers = customers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus ? c.status === filterStatus : true;
    const matchType = filterType ? c.type === filterType : true;
    const matchFromDate = filterFromDate ? c.date >= filterFromDate : true;
    const matchToDate = filterToDate ? c.date <= filterToDate : true;
    return matchSearch && matchStatus && matchType && matchFromDate && matchToDate;
  });

  // Phân trang
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const goToPage = (page) => setCurrentPage(page);

  const openAddModal = () => {
    setModalType('add');
    setForm({ name: '', email: '', phone: '', date: '', type: '', serviceDetail: '', price: '' });
    setEditIndex(null);
    setModalOpen(true);
  };
  const openEditModal = idx => {
    setModalType('edit');
    const customer = customers[idx];
    let serviceDetail = customer.serviceDetail;
    let price = customer.price;
    if (customer.type === 'Tư vấn') {
      const found = tuVanDetails.find(d => d.ten === serviceDetail);
      if (!found) {
        serviceDetail = tuVanDetails[0].ten;
        price = tuVanDetails[0].gia;
      } else {
        price = found.gia;
      }
    } else if (customer.type === 'Xét nghiệm') {
      const found = xetNghiemDetails.find(d => d.ten === serviceDetail);
      if (!found) {
        serviceDetail = xetNghiemDetails[0].ten;
        price = xetNghiemDetails[0].gia;
      } else {
        price = found.gia;
      }
    }
    setForm({ ...customer, serviceDetail, price });
    setEditIndex(idx);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  // Khi chọn dịch vụ hoặc chi tiết dịch vụ, cập nhật giá tiền tự động
  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'type') {
      let options = [];
      if (value === 'Tư vấn') options = tuVanDetails.map(d => d.ten);
      else if (value === 'Xét nghiệm') options = xetNghiemDetails.map(d => d.ten);
      setServiceDetailOptions(options);
      setForm(f => ({ ...f, [name]: value, serviceDetail: '', price: '' }));
    } else if (name === 'serviceDetail') {
      const price = getGiaTuChiTiet(form.type, value);
      setForm({ ...form, serviceDetail: value, price });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const handleSave = () => {
    if (!form.name || !form.email || !form.phone || !form.date || !form.type) {
      setFormError('Vui lòng nhập đầy đủ thông tin.');
      clearTimeout(errorTimeoutRef.current);
      errorTimeoutRef.current = setTimeout(() => setFormError(''), 5000);
      return;
    }
    // Kiểm tra ngày không được ở quá khứ
    const now = new Date();
    const selected = new Date(form.date);
    now.setHours(0,0,0,0);
    if (selected < now) {
      setFormError('Vui lòng chọn ngày hiện tại hoặc tương lai.');
      clearTimeout(errorTimeoutRef.current);
      errorTimeoutRef.current = setTimeout(() => setFormError(''), 5000);
      return;
    }
    setFormError('');
    // Tự động random serviceDetail nếu chưa nhập
    let detail = form.serviceDetail;
    let price = form.price;
    if (!detail) {
      if (form.type === 'Tư vấn') {
        const obj = getRandom(tuVanDetails);
        detail = obj.ten;
        price = obj.gia;
      } else if (form.type === 'Xét nghiệm') {
        const obj = getRandom(xetNghiemDetails);
        detail = obj.ten;
        price = obj.gia;
      }
    }
    if (!price && detail) price = getGiaTuChiTiet(form.type, detail);
    const newForm = { ...form, serviceDetail: detail, price };
    if (modalType === 'add') {
      setCustomers([...customers, { ...newForm, status: 'new' }]);
    } else if (modalType === 'edit' && editIndex !== null) {
      const updated = [...customers];
      updated[editIndex] = { ...newForm, status: customers[editIndex].status };
      setCustomers(updated);
    }
    closeModal();
  };
  const handleDelete = idx => {
    setDeleteIndex(idx);
  };
  const confirmDelete = () => {
    setCustomers(customers.filter((_, i) => i !== deleteIndex));
    setDeleteIndex(null);
  };
  const cancelDelete = () => setDeleteIndex(null);
  const openDetailModal = idx => setDetailIndex(idx);
  const closeDetailModal = () => setDetailIndex(null);

  return (
    <>
      <AdminLayout />
      <MainContent>
        <ContentWrapper>
          <Card>
            <CardHeader>
              <CardTitle>Danh sách khách hàng</CardTitle>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <SearchBox
                  type="text"
                  placeholder="Tìm theo tên hoặc SĐT"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                />
                <FilterSelect value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setCurrentPage(1); }}>
                  <option value="">Tất cả trạng thái</option>
                  <option value="confirmed">Đã xác nhận</option>
                  <option value="pending">Chờ xác nhận</option>
                  <option value="new">Mới</option>
                </FilterSelect>
                <FilterSelect value={filterType} onChange={e => { setFilterType(e.target.value); setCurrentPage(1); }}>
                  <option value="">Tất cả dịch vụ</option>
                  <option value="Tư vấn">Tư vấn</option>
                  <option value="Xét nghiệm">Xét nghiệm</option>
                </FilterSelect>
                <input type="date" value={filterFromDate} onChange={e => { setFilterFromDate(e.target.value); setCurrentPage(1); }} style={{ padding: 8, borderRadius: 8 }} />
                <span style={{ margin: '0 4px', color: '#888', display: 'flex', alignItems: 'center' }}>
                  <FaArrowRight style={{ marginRight: 4 }} />
                </span>
                <input type="date" value={filterToDate} onChange={e => { setFilterToDate(e.target.value); setCurrentPage(1); }} style={{ padding: 8, borderRadius: 8 }} />
                <Button color="#22c55e" textcolor="#fff" onClick={openAddModal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 12px' }}>
                  <FaPlus />
                </Button>
              </div>
            </CardHeader>
            <TableContainer>
              <StaffTable>
                <thead>
                  <tr>
                    <StaffTh>Họ tên</StaffTh>
                    <StaffTh>Email</StaffTh>
                    <StaffTh>Số điện thoại</StaffTh>
                    <StaffTh>Ngày đăng ký</StaffTh>
                    <StaffTh>Dịch vụ</StaffTh>
                    <StaffTh>Trạng thái</StaffTh>
                    <StaffTh>Thao tác</StaffTh>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCustomers.map((c, idx) => (
                    <tr key={idx}>
                      <StaffTd>{c.name}</StaffTd>
                      <StaffTd>{c.email}</StaffTd>
                      <StaffTd>{c.phone}</StaffTd>
                      <StaffTd>{formatDate(c.date)}</StaffTd>
                      <StaffTd>{c.type}</StaffTd>
                      <StaffTd><Badge status={c.status}>{c.status === 'confirmed' ? 'Đã xác nhận' : c.status === 'pending' ? 'Chờ xác nhận' : 'Mới'}</Badge></StaffTd>
                      <StaffTd>
                        <Button className="small" onClick={() => openDetailModal(customers.indexOf(c))} title="Xem chi tiết"><i className="fas fa-eye"></i></Button>
                        <Button className="small" onClick={() => openEditModal(customers.indexOf(c))}><i className="fas fa-edit"></i></Button>
                        <Button className="small" color="#ef4444" textcolor="#fff" onClick={() => handleDelete(customers.indexOf(c))}><i className="fas fa-trash"></i></Button>
                      </StaffTd>
                    </tr>
                  ))}
                  {paginatedCustomers.length === 0 && (
                    <tr><StaffTd colSpan={7} style={{ textAlign: 'center', color: '#888' }}>Không có khách hàng nào phù hợp.</StaffTd></tr>
                  )}
                </tbody>
              </StaffTable>
            </TableContainer>
            {/* Phân trang */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }}>
                <Button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Trước</Button>
                {[...Array(totalPages)].map((_, i) => (
                  <Button key={i} onClick={() => goToPage(i + 1)} active={currentPage === i + 1}>{i + 1}</Button>
                ))}
                <Button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Sau</Button>
              </div>
            )}
          </Card>
        </ContentWrapper>
        {modalOpen && (
          <ModalOverlay>
            <ModalContent>
              <ModalTitle>{modalType === 'add' ? 'Thêm khách hàng' : 'Chỉnh sửa khách hàng'}</ModalTitle>
              {formError && (
                <div style={{ color: '#ef4444', background: '#fef2f2', borderRadius: 8, padding: '8px 12px', marginBottom: 8, textAlign: 'center', fontSize: 15, fontWeight: 500 }}>
                  {formError}
                </div>
              )}
              <ModalForm onSubmit={e => { e.preventDefault(); handleSave(); }}>
                <ModalLabel>Họ tên:</ModalLabel>
                <ModalInput name="name" value={form.name} onChange={handleChange} />
                <ModalLabel>Email:</ModalLabel>
                <ModalInput name="email" value={form.email} onChange={handleChange} disabled={modalType === 'edit'} />
                <ModalLabel>Số điện thoại:</ModalLabel>
                <ModalInput name="phone" value={form.phone} onChange={handleChange} />
                <ModalLabel>Ngày đăng ký:</ModalLabel>
                <ModalInput name="date" type="date" value={form.date} onChange={handleChange} min={new Date().toISOString().slice(0,10)} />
                <ModalLabel>Dịch vụ:</ModalLabel>
                <ModalSelect name="type" value={form.type} onChange={handleChange}>
                  <option value="">-- Chọn dịch vụ --</option>
                  <option value="Tư vấn">Tư vấn</option>
                  <option value="Xét nghiệm">Xét nghiệm</option>
                </ModalSelect>
                {/* Dropdown chi tiết dịch vụ nếu là tư vấn hoặc xét nghiệm */}
                {form.type === 'Tư vấn' && (
                  <ModalSelect name="serviceDetail" value={form.serviceDetail} onChange={handleChange}>
                    <option value="">-- Chọn chi tiết tư vấn --</option>
                    {tuVanDetails.map((d, i) => (
                      <option key={i} value={d.ten}>{d.ten}</option>
                    ))}
                  </ModalSelect>
                )}
                {form.type === 'Xét nghiệm' && (
                  <ModalSelect name="serviceDetail" value={form.serviceDetail} onChange={handleChange}>
                    <option value="">-- Chọn chi tiết xét nghiệm --</option>
                    {xetNghiemDetails.map((d, i) => (
                      <option key={i} value={d.ten}>{d.ten}</option>
                    ))}
                  </ModalSelect>
                )}
                {/* Nếu là loại khác hoặc chưa chọn, cho nhập text tự do */}
                {form.type !== 'Tư vấn' && form.type !== 'Xét nghiệm' && (
                  <ModalInput name="serviceDetail" placeholder="Chi tiết dịch vụ" value={form.serviceDetail || ''} onChange={handleChange} />
                )}
                <ModalLabel>Giá tiền:</ModalLabel>
                <ModalInput name="price" value={form.price ? form.price.toLocaleString('vi-VN') : ''} disabled />
                <div style={{ display: 'flex', gap: 10, marginTop: 16, justifyContent: 'center' }}>
                  <Button color="#22c55e" textcolor="#fff" style={{ minWidth: 80, fontWeight: 600, boxShadow: '0 2px 8px rgba(79,70,229,0.08)' }} type="submit">Lưu</Button>
                  <Button color="#e5e7eb" textcolor="#1f2937" style={{ minWidth: 80, fontWeight: 500 }} onClick={closeModal} type="button">Hủy</Button>
                </div>
              </ModalForm>
            </ModalContent>
          </ModalOverlay>
        )}
        {deleteIndex !== null && (
          <ModalOverlay>
            <ModalContent>
              <ModalTitle>Xác nhận xóa khách hàng</ModalTitle>
              <div style={{ margin: '16px 0', color: '#374151', textAlign: 'center' }}>
                Bạn có chắc chắn muốn xóa khách hàng <b>{customers[deleteIndex]?.name}</b> không?
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 12 }}>
                <Button color="#ef4444" textcolor="#fff" style={{ minWidth: 80, fontWeight: 600 }} onClick={confirmDelete}>Xóa</Button>
                <Button color="#e5e7eb" textcolor="#1f2937" style={{ minWidth: 80, fontWeight: 500 }} onClick={cancelDelete}>Hủy</Button>
              </div>
            </ModalContent>
          </ModalOverlay>
        )}
        {detailIndex !== null && (
          <ModalOverlay>
            <ModalContent style={{ maxWidth: 480 }}>
              <ModalTitle>Chi tiết khách hàng</ModalTitle>
              <div style={{ padding: '8px 0', fontSize: 15 }}>
                <b>Họ tên:</b> {customers[detailIndex]?.name}<br/>
                <b>Email:</b> {customers[detailIndex]?.email}<br/>
                <b>Số điện thoại:</b> {customers[detailIndex]?.phone}<br/>
                <b>Địa chỉ:</b> {customers[detailIndex]?.address || 'Chưa cập nhật'}<br/>
                <b>Ngày đăng ký:</b> {formatDate(customers[detailIndex]?.date)}<br/>
                <b>Dịch vụ:</b> {customers[detailIndex]?.type}<br/>
                <b>Chi tiết dịch vụ:</b> {getServiceDetailDisplay(customers[detailIndex]?.type, customers[detailIndex]?.serviceDetail)}<br/>
                <b>Giá tiền:</b> {
                  (customers[detailIndex]?.type === 'Tư vấn' || customers[detailIndex]?.type === 'Xét nghiệm')
                    ? (
                        getGiaTuChiTiet(
                          customers[detailIndex]?.type,
                          customers[detailIndex]?.serviceDetail
                        )
                          ? Number(getGiaTuChiTiet(customers[detailIndex]?.type, customers[detailIndex]?.serviceDetail)).toLocaleString('vi-VN') + ' đ'
                          : 'Chưa cập nhật'
                      )
                    : (customers[detailIndex]?.price ? Number(customers[detailIndex].price).toLocaleString('vi-VN') + ' đ' : 'Chưa cập nhật')
                }<br/>
                <b>Trạng thái:</b> <Badge status={customers[detailIndex]?.status}>{customers[detailIndex]?.status === 'confirmed' ? 'Đã xác nhận' : customers[detailIndex]?.status === 'pending' ? 'Chờ xác nhận' : 'Mới'}</Badge><br/>
                <b>Trạng thái thanh toán:</b> {customers[detailIndex]?.paymentStatus || 'Chưa cập nhật'}<br/>
                <b>Ghi chú:</b> {customers[detailIndex]?.note || 'Không có'}
              </div>
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <Button color="#22c55e" textcolor="#fff" onClick={closeDetailModal}>Đóng</Button>
              </div>
            </ModalContent>
          </ModalOverlay>
        )}
      </MainContent>
    </>
  );
};

export default AdminKhachHang;
