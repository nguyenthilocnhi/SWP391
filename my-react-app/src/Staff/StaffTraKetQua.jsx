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
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [resultStatus, setResultStatus] = useState('');
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      
      try {
        const res = await fetch('https://api-gender2.purintech.id.vn/api/Appointment/test-appointments/all', {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: '*/*'
          }
        });
        
        console.log('Response status:', res.status);
        const data = await res.json();
        console.log('API Response:', data);
        
        if (data?.obj) {
          console.log('Total appointments:', data.obj.length);
          
          // Lọc các đặt lịch có trạng thái 2 (đã xét nghiệm) hoặc đã có kết quả, nhưng chưa hoàn thành
          const filtered = data.obj.filter(item => {
            console.log('Item serviceStatus:', item.serviceStatus, 'Item:', item);
            return (item.serviceStatus === 2 || (item.testResult && item.resultStatus)) && item.serviceStatus !== 7;
          });
          
                     console.log('Filtered appointments (status 2 or has result, not completed):', filtered.length);
          
                                 const result = filtered.map(item => ({
              id: item.id,
              name: item.fullName,
              test: item.testName,
              result: item.testResult || 'Chưa có kết quả',
              resultStatus: item.resultStatus || 'Pending',
              serviceStatus: item.serviceStatus,
              appointmentDate: item.appointmentDate,
              phoneNumber: item.phoneNumber,
              hasResult: !!(item.testResult && item.resultStatus),
              canComplete: item.serviceStatus === 2 || (item.testResult && item.resultStatus)
            }));
          
          console.log('Final result:', result);
          setAppointments(result);
        } else {
          console.log('No data.obj found in response');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchData();
  }, []);

  const openModal = (id) => {
    const appointment = appointments.find(item => item.id === id);
    setSelectedId(id);
    setShowModal(true);
    // Nếu đã có kết quả, chỉ cho phép hoàn thành
    if (appointment?.hasResult) {
      setResultStatus('Completed');
    } else {
      setResultStatus('');
      setSuggestion('');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedId(null);
    setResultStatus('');
    setSuggestion('');
  };

  const handleApprove = async () => {
    const token = localStorage.getItem('token');
    const appointment = appointments.find(item => item.id === selectedId);
    
    // Kiểm tra nếu chưa chọn kết quả
    if (!appointment?.hasResult && !resultStatus) {
      alert('Vui lòng chọn kết quả xét nghiệm');
      return;
    }
    
    try {
      const res = await fetch(`https://api-gender2.purintech.id.vn/api/Appointment/test-result/${selectedId}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          accept: '*/*'
        },
        body: JSON.stringify({
          note: appointment?.hasResult ? 'Completed' : resultStatus,
          suggestion: appointment?.hasResult ? 'Hoàn thành quy trình' : suggestion
        })
      });
      if (res.ok) {
        if (appointment?.hasResult) {
          alert('Hoàn thành đặt lịch thành công');
          setAppointments(prev =>
            prev.map(item =>
              item.id === selectedId
                ? { ...item, serviceStatus: 7, canComplete: false } // Hoàn thành
                : item
            )
          );
        } else {
          alert('Trả kết quả thành công');
          setAppointments(prev =>
            prev.map(item =>
              item.id === selectedId
                ? { ...item, result: resultStatus === 'Positive' ? 'Dương tính' : 'Âm tính', resultStatus, suggestion, serviceStatus: 6, hasResult: true }
                : item
            )
          );
        }
        closeModal();
      } else {
        alert(appointment?.hasResult ? 'Lỗi khi hoàn thành' : 'Lỗi khi trả kết quả');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(appointment?.hasResult ? 'Lỗi khi hoàn thành' : 'Lỗi khi trả kết quả');
    }
  };

  const filteredData = appointments.filter(a => {
    const matchName = a.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTest = a.test.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPhone = (a.phoneNumber || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchName || matchTest || matchPhone;
  });

  return (
    <Container>
      <StaffSidebar />
      <ContentArea>
        <StaffHeader />
        <Section>
          <SectionHeader>
            <SectionTitle>Danh sách đặt lịch chờ kết quả</SectionTitle>
            <div style={{ display: 'flex', gap: '14px' }}>
              <SearchInput 
                placeholder="Tìm kiếm theo tên, dịch vụ, số điện thoại..." 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
              />
            </div>
          </SectionHeader>
          
          {filteredData.length > 0 ? (
            <Table>
              <Thead>
                <Tr>
                  <Th>Khách hàng</Th>
                  <Th>Số điện thoại</Th>
                  <Th>Dịch vụ</Th>
                  <Th>Ngày đặt lịch</Th>
                  <Th>Kết quả</Th>
                  <Th>Trạng thái</Th>
                  <Th>Hành động</Th>
                </Tr>
              </Thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.name}</Td>
                    <Td>{item.phoneNumber || 'N/A'}</Td>
                    <Td>{item.test}</Td>
                    <Td>{item.appointmentDate ? new Date(item.appointmentDate).toLocaleDateString('vi-VN') : 'N/A'}</Td>
                    <Td>{item.result}</Td>
                                         <Td>{item.hasResult ? 'Đã trả kết quả' : 'Chờ kết quả'}</Td>
                                         <Td>
                       {item.canComplete ? (
                         item.hasResult ? (
                           <ActionBtn onClick={() => openModal(item.id)}>Hoàn thành</ActionBtn>
                         ) : (
                           <ActionBtn onClick={() => openModal(item.id)}>Nhập kết quả</ActionBtn>
                         )
                       ) : (
                         <span style={{ color: '#999' }}>Đã hoàn thành</span>
                       )}
                     </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              color: '#666',
              fontSize: '16px'
            }}>
                             {appointments.length === 0 ? 
                 'Không có đặt lịch nào cần xử lý (chờ kết quả hoặc đã trả kết quả)' : 
                 'Không tìm thấy kết quả phù hợp với từ khóa tìm kiếm'
               }
              <br/>
              <small style={{ color: '#999' }}>
                Debug: appointments.length = {appointments.length}, filteredData.length = {filteredData.length}
              </small>
            </div>
          )}
        </Section>
      </ContentArea>
      
             {showModal && (
         <ModalOverlay>
           <ModalContent>
             <h3>
               {appointments.find(item => item.id === selectedId)?.hasResult 
                 ? 'Hoàn thành đặt lịch' 
                 : 'Nhập kết quả xét nghiệm'
               }
             </h3>
             {!appointments.find(item => item.id === selectedId)?.hasResult && (
               <>
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
               </>
             )}
             {appointments.find(item => item.id === selectedId)?.hasResult && (
               <p style={{ color: '#666', fontSize: '14px' }}>
                 Đặt lịch này đã được trả kết quả. Bạn có muốn hoàn thành quy trình không?
               </p>
             )}
             <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
               <ActionBtn onClick={handleApprove}>
                 {appointments.find(item => item.id === selectedId)?.hasResult ? 'Hoàn thành' : 'Xác nhận'}
               </ActionBtn>
               <ActionBtn style={{ background: '#ccc', color: '#000' }} onClick={closeModal}>Hủy</ActionBtn>
             </div>
           </ModalContent>
         </ModalOverlay>
       )}
    </Container>
  );
}

export default StaffTraKetQua;