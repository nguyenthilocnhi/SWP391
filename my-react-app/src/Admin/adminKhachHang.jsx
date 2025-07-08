import React, { useState } from 'react';
import AdminLayout from '../components/adminLayout';
import styled from 'styled-components';
import { FaArrowRight, FaPlus } from 'react-icons/fa';

const MainContent = styled.main`
  padding: 100px 0 24px 215px;
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
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  background-color: ${props => props.color || 'transparent'};
  color: ${props => props.textcolor || '#4b5563'};
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 8px;
  &:hover {
    background-color: #f3f4f6;
  }
  &.small {
    padding: 6px;
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
  {
    name: 'Nguyễn Thị Minh',
    email: 'minh@example.com',
    phone: '0901234567',
    date: '2025-07-01',
    type: 'Tư vấn',
    status: 'confirmed',
    address: '123 Lê Lợi, Q.1, TP.HCM',
    note: 'Khách hàng VIP',
    serviceDetail: 'Tư vấn sức khỏe tổng quát',
    price: 500000,
    paymentStatus: 'Đã thanh toán',
  },
  {
    name: 'Trần Văn Hải',
    email: 'hai.tran@example.com',
    phone: '0912345678',
    date: '2025-07-10',
    type: 'Xét nghiệm',
    status: 'pending',
    address: '456 Nguyễn Văn Cừ, Q.5, TP.HCM',
    note: 'Cần xác nhận lại thông tin',
    serviceDetail: 'Xét nghiệm máu',
    price: 200000,
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
  {
    name: 'Phạm Thị Hoa',
    email: 'hoa.pham@example.com',
    phone: '0934567890',
    date: '2025-08-15',
    type: 'Tư vấn',
    status: 'confirmed',
    address: '101 Hai Bà Trưng, Q.1, TP.HCM',
    note: 'Đã thanh toán xong',
    serviceDetail: 'Tư vấn sức khỏe tổng quát',
    price: 450000,
    paymentStatus: 'Đã thanh toán',
  },
  {
    name: 'Ngô Văn An',
    email: 'an.ngo@example.com',
    phone: '0945678901',
    date: '2025-09-01',
    type: 'Xét nghiệm',
    status: 'pending',
    address: '202 Nguyễn Trãi, Q.1, TP.HCM',
    note: 'Cần xác nhận lại thông tin',
    serviceDetail: 'Xét nghiệm máu',
    price: 250000,
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
  {
    name: 'Vũ Quang Huy',
    email: 'huy.vu@example.com',
    phone: '0967890123',
    date: '2025-09-20',
    type: 'Tư vấn',
    status: 'new',
    address: '404 Nguyễn Văn Cừ, Q.5, TP.HCM',
    note: 'Cần liên hệ lại',
    serviceDetail: 'Tư vấn sức khỏe tổng quát',
    price: 420000,
    paymentStatus: 'Chưa thanh toán',
  },
  {
    name: 'Bùi Thị Lan',
    email: 'lan.bui@example.com',
    phone: '0978901234',
    date: '2025-10-01',
    type: 'Xét nghiệm',
    status: 'pending',
    address: '505 Lê Lợi, Q.1, TP.HCM',
    note: 'Cần xác nhận lại thông tin',
    serviceDetail: 'Xét nghiệm máu',
    price: 280000,
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
  {
    name: 'Trịnh Thị Hạnh',
    email: 'hanh.trinh@example.com',
    phone: '0990123456',
    date: '2025-10-15',
    type: 'Tư vấn',
    status: 'pending',
    address: '707 Nguyễn Trãi, Q.1, TP.HCM',
    note: 'Cần xác nhận lại thông tin',
    serviceDetail: 'Tư vấn sức khỏe tổng quát',
    price: 410000,
    paymentStatus: 'Chưa thanh toán',
  },
  {
    name: 'Lý Văn Bình',
    email: 'binh.ly@example.com',
    phone: '0902345678',
    date: '2025-10-20',
    type: 'Xét nghiệm',
    status: 'new',
    address: '808 Lê Duẩn, Q.1, TP.HCM',
    note: 'Cần liên hệ lại',
    serviceDetail: 'Xét nghiệm máu',
    price: 290000,
    paymentStatus: 'Chưa thanh toán',
  },
];

// Thêm hàm formatDate
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
};

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
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', type: '' });
  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [detailIndex, setDetailIndex] = useState(null);

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
    setForm({ name: '', email: '', phone: '', date: '', type: '' });
    setEditIndex(null);
    setModalOpen(true);
  };
  const openEditModal = idx => {
    setModalType('edit');
    setForm({ ...customers[idx] });
    setEditIndex(idx);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    if (!form.name || !form.email || !form.phone || !form.date || !form.type) {
      alert('Vui lòng nhập đầy đủ thông tin.');
      return;
    }
    if (modalType === 'add') {
      setCustomers([...customers, { ...form, status: 'new' }]);
    } else if (modalType === 'edit' && editIndex !== null) {
      const updated = [...customers];
      updated[editIndex] = { ...form, status: customers[editIndex].status };
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
                  <option value="Khám tổng quát">Khám tổng quát</option>
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
                  <Button key={i} onClick={() => goToPage(i + 1)} color={currentPage === i + 1 ? '#4f46e5' : undefined} textcolor={currentPage === i + 1 ? '#fff' : undefined}>{i + 1}</Button>
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
              <ModalForm onSubmit={e => { e.preventDefault(); handleSave(); }}>
                <ModalLabel>Họ tên:</ModalLabel>
                <ModalInput name="name" value={form.name} onChange={handleChange} />
                <ModalLabel>Email:</ModalLabel>
                <ModalInput name="email" value={form.email} onChange={handleChange} disabled={modalType === 'edit'} />
                <ModalLabel>Số điện thoại:</ModalLabel>
                <ModalInput name="phone" value={form.phone} onChange={handleChange} />
                <ModalLabel>Ngày đăng ký:</ModalLabel>
                <ModalInput name="date" type="date" value={form.date} onChange={handleChange} />
                <ModalLabel>Dịch vụ:</ModalLabel>
                <ModalSelect name="type" value={form.type} onChange={handleChange}>
                  <option value="">-- Chọn dịch vụ --</option>
                  <option value="Tư vấn">Tư vấn</option>
                  <option value="Xét nghiệm">Xét nghiệm</option>
                  <option value="Khám tổng quát">Khám tổng quát</option>
                </ModalSelect>
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
                <b>Chi tiết dịch vụ:</b> {customers[detailIndex]?.serviceDetail || 'Chưa cập nhật'}<br/>
                <b>Giá tiền:</b> {customers[detailIndex]?.price ? customers[detailIndex].price.toLocaleString('vi-VN') + ' đ' : 'Chưa cập nhật'}<br/>
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
