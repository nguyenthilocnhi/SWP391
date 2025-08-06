import React, { useState, useEffect } from 'react';
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
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;
const ModalContent = styled.div`
  background: white;
  border-radius: 10px;
  padding: 30px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

function StaffTraKetQua() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterResult, setFilterResult] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [resultStatus, setResultStatus] = useState('');
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('https://api-gender2.purintech.id.vn/api/Appointment/test-appointments/all', {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: '*/*'
        }
      });
      const data = await res.json();
      if (data?.obj) {
        const result = data.obj.filter(item => item.serviceStatus === 3).map(item => ({
          id: item.id,
          name: item.fullName,
          test: item.testName,
          result: item.testResult || '',
          resultStatus: item.resultStatus || '',
        }));
        setAppointments(result);
      }
    };
    fetchData();
  }, []);

  const openModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedId(null);
    setResultStatus('');
    setSuggestion('');
  };

  const handleApprove = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`https://api-gender2.purintech.id.vn/api/Appointment/test-result/${selectedId}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          accept: '*/*'
        },
        body: JSON.stringify({
          note: resultStatus,
          suggestion: suggestion
        })
      });
      if (res.ok) {
        alert('Trả kết quả thành công');
        setAppointments(prev => prev.filter(item => item.id !== selectedId));
        closeModal();
      } else {
        alert('Lỗi khi trả kết quả');
      }
    } catch (err) {
      console.error(err);
      alert('Có lỗi xảy ra');
    }
  };

  const filteredData = appointments.filter(a => {
    const matchName = a.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTest = a.test.toLowerCase().includes(searchTerm.toLowerCase());
    const matchResult = filterResult === 'all' || a.resultStatus === filterResult;
    return (matchName || matchTest) && matchResult;
  });

  return (
    <Container>
      <StaffSidebar />
      <ContentArea>
        <StaffHeader />
        <Section>
          <SectionHeader>
            <SectionTitle>Trả kết quả xét nghiệm</SectionTitle>
            <div style={{ display: 'flex', gap: '14px' }}>
              <SearchInput placeholder="Tìm kiếm..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              <select
                value={filterResult}
                onChange={e => setFilterResult(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '5px',
                  border: '1px solid #ddd'
                }}
              >
                <option value="all">Tất cả kết quả</option>
                <option value="Positive">Dương tính</option>
                <option value="Negative">Âm tính</option>
              </select>
            </div>
          </SectionHeader>
          <Table>
            <Thead>
              <Tr>
                <Th>Khách hàng</Th>
                <Th>Dịch vụ</Th>
                <Th>Kết quả</Th>
                <Th>Tình trạng</Th>
                <Th>Hành động</Th>
              </Tr>
            </Thead>
            <tbody>
              {filteredData.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.name}</Td>
                  <Td>{item.test}</Td>
                  <Td>{item.result}</Td>
                  <Td>{item.resultStatus === 'Positive' ? 'Dương tính' : item.resultStatus === 'Negative' ? 'Âm tính' : '-'}</Td>
                  <Td>
                    <ActionBtn onClick={() => openModal(item.id)}>Kết quả</ActionBtn>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Section>
      </ContentArea>
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h3>Nhập kết quả xét nghiệm</h3>
            <select value={resultStatus} onChange={e => setResultStatus(e.target.value)}>
              <option value="">-- Chọn kết quả --</option>
              <option value="Positive">Dương tính</option>
              <option value="Negative">Âm tính</option>
            </select>
            <textarea
              rows="4"
              placeholder="Lời khuyên..."
              value={suggestion}
              onChange={e => setSuggestion(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <ActionBtn onClick={handleApprove}>Xác nhận</ActionBtn>
              <ActionBtn style={{ background: '#ccc', color: '#000' }} onClick={closeModal}>Hủy</ActionBtn>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}

export default StaffTraKetQua;