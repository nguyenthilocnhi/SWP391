import React, { useState } from 'react';
import styled from 'styled-components';
import StaffSidebar from '../components/staffSidebar';
import StaffHeader from '../components/staffHeader';

const Container = styled.div`
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
  width: 99vw;
  height: 100vh;
  max-height: 100vh;
  margin: 0;
  padding: 4rem 0;
`;
const ContentArea = styled.main`
  flex: 1;
  padding: 2.5rem 3rem;
  background: transparent;
  overflow-y: auto;
  margin-left: 250px;
  min-height: 100vh;
  @media (max-width: 768px) {
    margin-left: 80px;
    padding: 1rem;
  }
  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;
const Section = styled.section`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  padding: 24px;
  margin-top: 16px;
`;
const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;
const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #09a370;
  margin-bottom: 0;
`;
const SearchInput = styled.input`
  padding: 8px 14px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
  background: #f9f9f9;
  color: #333;
  width: 220px;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
`;
const Thead = styled.thead``;
const Th = styled.th`
  background: #09a370;
  color: #fff;
  font-weight: 600;
  padding: 14px 10px;
  text-align: center;
`;
const Td = styled.td`
  padding: 12px 10px;
  text-align: center;
  vertical-align: middle;
  border-bottom: 1px solid #f0f0f0;
`;
const Tr = styled.tr``;
const ActionBtn = styled.button`
  background: #09a370;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 6px 12px;
  margin: 0 2px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #0d8a5f;
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;
const StatusSelect = styled.select`
  padding: 6px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
  background: #f9f9f9;
  color: #333;
`;
const ModalOverlay = styled.div`
  display: ${props => (props.open ? 'flex' : 'none')};
  position: fixed;
  z-index: 2000;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.3);
  justify-content: center;
  align-items: center;
`;
const ModalContent = styled.div`
  background: #fff;
  padding: 32px 28px 24px 28px;
  border-radius: 18px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 8px 32px rgba(32,201,151,0.18), 0 1.5px 8px rgba(0,0,0,0.08);
  position: relative;
  animation: modalFadeIn 0.25s;
  @keyframes modalFadeIn {
    from { opacity: 0; transform: translateY(-30px);}
    to { opacity: 1; transform: translateY(0);}
  }
`;
const CloseBtn = styled.span`
  position: absolute;
  top: 14px;
  right: 22px;
  font-size: 2rem;
  color: #bdbdbd;
  cursor: pointer;
  transition: color 0.2s;
  &:hover { color: #09a370; }
`;
const ModalTitle = styled.h3`
  margin-bottom: 22px;
  text-align: center;
  font-size: 1.25rem;
  color: #09a370;
  font-weight: 700;
  letter-spacing: 0.5px;
`;
const FormGroup = styled.div`
  margin-bottom: 18px;
`;
const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 6px;
  color: #222;
`;
const Input = styled.input`
  width: 95%;
  padding: 8px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
  background: #f9f9f9;
  color: #333;
`;
const ModalBtnRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 18px;
`;
const SaveBtn = styled(ActionBtn)`
  background: #09a370;
  color: #fff;
  font-weight: 600;
  min-width: 80px;
  &:hover, &:focus { background: #0d8a5f; outline: none; }
`;
const CancelBtn = styled(ActionBtn)`
  background: #e0e0e0;
  color: #333;
  font-weight: 500;
  &:hover, &:focus { background: #bdbdbd; color: #222; outline: none; }
`;

const statusOptions = [
  'Chờ xác nhận',
  'Đã xác nhận',
  'Đã lấy mẫu',
  'Chờ kết quả',
  'Đã trả kết quả'
];

const sampleData = [
  {
    customer: 'Nguyễn Văn A',
    service: 'HIV Ag/Ab Combo',
    date: '2025-07-01',
    status: 'Chờ xác nhận',
    note: ''
  },
  {
    customer: 'Trần Thị B',
    service: 'Viêm gan B',
    date: '2025-07-02',
    status: 'Đã xác nhận',
    note: ''
  },
  {
    customer: 'Lê Văn C',
    service: 'Giang mai TPHA',
    date: '2025-07-03',
    status: 'Đã lấy mẫu',
    note: ''
  }
];

function StaffQuanLyDatLich() {
  const [appointments, setAppointments] = useState(sampleData);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ customer: '', service: '', date: '', status: '', note: '' });

  // Lọc theo tên khách hoặc dịch vụ
  const filtered = appointments.filter(a =>
    a.customer.toLowerCase().includes(search.toLowerCase()) ||
    a.service.toLowerCase().includes(search.toLowerCase())
  );

  // Mở modal chỉnh sửa
  const openEditModal = (idx) => {
    setForm(appointments[idx]);
    setEditIndex(idx);
    setModalOpen(true);
  };
  // Đóng modal
  const closeModal = () => {
    setModalOpen(false);
    setEditIndex(null);
  };
  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setAppointments(arr => arr.map((a, i) => i === editIndex ? form : a));
    closeModal();
  };
  // Đổi trạng thái nhanh trên bảng
  const handleStatusChange = (idx, value) => {
    setAppointments(arr => arr.map((a, i) => i === idx ? { ...a, status: value } : a));
  };

  return (
    <Container>
      <StaffSidebar />
      <ContentArea>
        <StaffHeader />
        <Section>
          <SectionHeader>
            <SectionTitle>Quản lý đặt lịch xét nghiệm</SectionTitle>
            <SearchInput
              placeholder="Tìm kiếm khách hàng hoặc dịch vụ..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </SectionHeader>
          <Table>
            <Thead>
              <Tr>
                <Th>Khách hàng</Th>
                <Th>Dịch vụ</Th>
                <Th>Ngày</Th>
                <Th>Trạng thái</Th>
                <Th>Ghi chú</Th>
                <Th>Hành động</Th>
              </Tr>
            </Thead>
            <tbody>
              {filtered.map((row, idx) => (
                <Tr key={idx}>
                  <Td>{row.customer}</Td>
                  <Td>{row.service}</Td>
                  <Td>{row.date}</Td>
                  <Td>{row.status}</Td>
                  <Td>{row.note}</Td>
                  <Td>
                    <ActionBtn onClick={() => openEditModal(idx)}>Chỉnh sửa</ActionBtn>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Section>
        {/* Modal chỉnh sửa */}
        <ModalOverlay open={modalOpen}>
          <ModalContent>
            <CloseBtn onClick={closeModal}>&times;</CloseBtn>
            <ModalTitle>Chỉnh sửa lịch hẹn</ModalTitle>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Khách hàng</Label>
                <Input type="text" value={form.customer} onChange={e => setForm(f => ({ ...f, customer: e.target.value }))} required />
              </FormGroup>
              <FormGroup>
                <Label>Dịch vụ</Label>
                <Input type="text" value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} required />
              </FormGroup>
              <FormGroup>
                <Label>Ngày</Label>
                <Input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
              </FormGroup>
              <FormGroup>
                <Label>Trạng thái</Label>
                <StatusSelect value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} required>
                  {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </StatusSelect>
              </FormGroup>
              <FormGroup>
                <Label>Ghi chú</Label>
                <Input type="text" value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} />
              </FormGroup>
              <ModalBtnRow>
                <SaveBtn type="submit">Lưu</SaveBtn>
                <CancelBtn type="button" onClick={closeModal}>Đóng</CancelBtn>
              </ModalBtnRow>
            </form>
          </ModalContent>
        </ModalOverlay>
      </ContentArea>
    </Container>
  );
}
export default StaffQuanLyDatLich;