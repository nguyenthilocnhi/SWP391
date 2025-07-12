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
const ResultSection = styled.section`
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
const AddBtn = styled.button`
  background: #09a370;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.2s, transform 0.2s;
  &:hover, &:focus {
    background: #0d8a5f;
    transform: scale(1.08);
    outline: none;
  }
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
  padding: 32px 24px 24px 24px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  position: relative;
  animation: modalFadeIn 0.2s;
  @keyframes modalFadeIn {
    from { opacity: 0; transform: translateY(-30px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
const CloseBtn = styled.span`
  position: absolute;
  top: 12px;
  right: 18px;
  font-size: 1.5rem;
  color: #888;
  cursor: pointer;
  transition: color 0.2s;
  &:hover { color: #09a370; }
`;
const FormGroup = styled.div`
  margin-bottom: 16px;
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
const Select = styled.select`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
  background: #f9f9f9;
  color: #333;
`;

const testNameOptions = [
    'HIV Ag/Ab Combo',
    'Viêm gan B',
    'Viêm gan C',
    'Giang mai TPHA',
    'Chlamydia',
    'Lậu cầu',
    'HPV',
    'Sốt xuất huyết',
    'Khác...'
];

function StaffTraKetQua() {
    const [results, setResults] = useState([
        {
            customer: 'Trần Thị B',
            testName: 'HIV Ag/Ab Combo',
            date: '2025-07-01',
            result: 'Âm tính',
            note: ''
        }
    ]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [form, setForm] = useState({
        customer: '',
        testName: '',
        date: '',
        result: '',
        note: ''
    });
    // Mở modal thêm mới
    const openAddModal = () => {
        setForm({ customer: '', testName: '', date: '', result: '', note: '' });
        setEditIndex(null);
        setModalOpen(true);
    };
    // Mở modal chỉnh sửa
    const openEditModal = (idx) => {
        setForm(results[idx]);
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
        if (editIndex !== null) {
            // Cập nhật
            setResults(rs => rs.map((r, i) => i === editIndex ? form : r));
        } else {
            // Thêm mới
            setResults(rs => [...rs, form]);
        }
        closeModal();
    };
    return (
        <Container>
            <StaffSidebar />
            <ContentArea>
                <StaffHeader />
                <ResultSection>
                    <SectionHeader>
                        <SectionTitle>Trả kết quả xét nghiệm cho khách hàng</SectionTitle>
                        <AddBtn title="Thêm kết quả mới" onClick={openAddModal}><i className="fas fa-plus"></i></AddBtn>
                    </SectionHeader>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Khách hàng</Th>
                                <Th>Tên xét nghiệm</Th>
                                <Th>Ngày thực hiện</Th>
                                <Th>Kết quả</Th>
                                <Th>Ghi chú</Th>
                                <Th>Hành động</Th>
                            </Tr>
                        </Thead>
                        <tbody>
                            {results.map((row, idx) => (
                                <Tr key={idx}>
                                    <Td>{row.customer}</Td>
                                    <Td>{row.testName}</Td>
                                    <Td>{row.date}</Td>
                                    <Td>{row.result}</Td>
                                    <Td>{row.note}</Td>
                                    <Td>
                                        <ActionBtn onClick={() => openEditModal(idx)}>Chỉnh sửa</ActionBtn>
                                    </Td>
                                </Tr>
                            ))}
                        </tbody>
                    </Table>
                </ResultSection>
                {/* Modal */}
                <ModalOverlay open={modalOpen}>
                    <ModalContent>
                        <CloseBtn onClick={closeModal}>&times;</CloseBtn>
                        <h3 style={{ marginBottom: 18 }}>{editIndex !== null ? 'Chỉnh sửa kết quả xét nghiệm' : 'Thêm kết quả xét nghiệm'}</h3>
                        <form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label>Khách hàng</Label>
                                <Input type="text" name="customer" value={form.customer} onChange={e => setForm(f => ({ ...f, customer: e.target.value }))} required />
                            </FormGroup>
                            <FormGroup>
                                <Label>Tên xét nghiệm</Label>
                                <Select name="testName" value={form.testName} onChange={e => setForm(f => ({ ...f, testName: e.target.value }))} required>
                                    <option value="">--Chọn dịch vụ--</option>
                                    {testNameOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </Select>
                            </FormGroup>
                            <FormGroup>
                                <Label>Ngày thực hiện</Label>
                                <Input type="date" name="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
                            </FormGroup>
                            <FormGroup>
                                <Label>Kết quả</Label>
                                <Select name="result" value={form.result} onChange={e => setForm(f => ({ ...f, result: e.target.value }))} required>
                                    <option value="">--Chọn--</option>
                                    <option value="Âm tính">Âm tính</option>
                                    <option value="Dương tính">Dương tính</option>
                                    <option value="Không xác định">Không xác định</option>
                                </Select>
                            </FormGroup>
                            <FormGroup>
                                <Label>Ghi chú</Label>
                                <Input type="text" name="note" value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} />
                            </FormGroup>
                            <div style={{ textAlign: 'right', marginTop: 16 }}>
                                <ActionBtn type="submit">{editIndex !== null ? 'Cập nhật' : 'Gửi kết quả'}</ActionBtn>
                                <ActionBtn type="button" style={{ background: '#ccc', color: '#333' }} onClick={closeModal}>Đóng</ActionBtn>
                            </div>
                        </form>
                    </ModalContent>
                </ModalOverlay>
            </ContentArea>
        </Container>
    );
}
export default StaffTraKetQua;