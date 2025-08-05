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
  
  &:disabled {
    background-color: #f5f5f5;
    color: #666;
    cursor: not-allowed;
    border-color: #ddd;
  }
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
  'Đã tới',
  'Đang thực hiện',
  'Đã lấy mẫu',
  'Chờ kết quả',
  'Đã trả kết quả',
  'Hoàn thành',
  'Không tới'
];




function StaffQuanLyDatLich() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ customerName: '', serviceName: '', ngay: '', status: '', note: '' });

  // Hàm lọc theo trạng thái
  const filterByStatus = (statusType) => {
    setStatusFilter(statusType);
    let filtered = appointments;
    if (statusType !== 'all') {
      filtered = filtered.filter(item => item.status === statusType);
    }
    if (search) {
      filtered = filtered.filter(a =>
        (a.customerName && a.customerName.toLowerCase().includes(search.toLowerCase())) ||
        (a.serviceName && a.serviceName.toLowerCase().includes(search.toLowerCase()))
      );
    }
    setFilteredAppointments(filtered);
  };

  // Cập nhật filteredAppointments khi appointments hoặc search thay đổi
  useEffect(() => {
    let filtered = appointments;
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    if (search) {
      filtered = filtered.filter(a =>
        (a.customerName && a.customerName.toLowerCase().includes(search.toLowerCase())) ||
        (a.serviceName && a.serviceName.toLowerCase().includes(search.toLowerCase()))
      );
    }
    setFilteredAppointments(filtered);
  }, [appointments, search, statusFilter]);

  // Gọi API lấy danh sách lịch xét nghiệm khi load trang
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('https://api-gender2.purintech.id.vn/api/Appointment/test-appointments/all', {
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await res.json();
        if (data && data.obj) {
          const mapped = data.obj.map(item => ({
            id: item.id,
            customerName: item.fullName || '',
            serviceName: item.testName || '',
            ngay: item.appointmentDate ? item.appointmentDate.split('T')[0] : '',
            status: convertStatus(item.serviceStatus),
            note: item.note || '',
            createdAt: item.createdDate || item.appointmentDate // vẫn giữ phòng trường hợp backend sửa
          }));
          // Sắp xếp theo thời gian tạo lịch gần nhất lên đầu
          mapped.sort((a, b) => new Date(b.createdAt || b.ngay) - new Date(a.createdAt || a.ngay));
          setAppointments(mapped);
        } else {
          setAppointments([]);
        }
      } catch (err) {
        console.error('Lỗi khi lấy danh sách lịch:', err);
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, []);

  const convertStatus = (code) => {
    switch (code) {
      case 0: return 'Chờ xác nhận';
      case 1: return 'Đã xác nhận';
      case 2: return 'Đã tới';
      case 3: return 'Đang thực hiện';
      case 4: return 'Đã lấy mẫu';
      case 5: return 'Chờ kết quả';
      case 6: return 'Đã trả kết quả';
      case 7: return 'Hoàn thành';
      case 8: return 'Không tới';
      default: return 'Không rõ';
    }
  };


  const getStatusCode = (statusText) => {
    switch (statusText) {
      case 'Chờ xác nhận': return 0;
      case 'Đã xác nhận': return 1;
      case 'Đã tới': return 2;
      case 'Đang thực hiện': return 3;
      case 'Đã lấy mẫu': return 4;
      case 'Chờ kết quả': return 5;
      case 'Đã trả kết quả': return 6;
      case 'Hoàn thành': return 7;
      case 'Không tới': return 8;
      default: return 0;
    }
  };






  // Mở modal chỉnh sửa
  const openEditModal = (idx) => {
    setForm(filteredAppointments[idx]);
    setEditIndex(idx);
    setModalOpen(true);
  };
  // Đóng modal
  const closeModal = () => {
    setModalOpen(false);
    setEditIndex(null);
  };
  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const appointment = appointments[editIndex];
      const appointmentId = appointment.id;
      const token = localStorage.getItem('token');

      const currentCode = getStatusCode(appointment.status);
      const newCode = getStatusCode(form.status);

      // Kiểm tra nếu cố gắng quay lại trạng thái trước đó
      if (newCode < currentCode) {
        alert('Không thể quay lại trạng thái trước đó!');
        return;
      }

      // Kiểm tra không cho phép nhảy cóc trạng thái (chỉ được chuyển đến trạng thái tiếp theo)
      // Ngoại lệ: "Không tới" có thể được chọn từ bất kỳ trạng thái nào
      if (newCode > currentCode + 1 && newCode !== 8) {
        alert('Không thể nhảy cóc trạng thái! Chỉ được chuyển đến trạng thái tiếp theo.');
        return;
      }

      // Gọi API cập nhật
      const response = await fetch(`https://api-gender2.purintech.id.vn/api/Appointment/test-result/${appointmentId}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'accept': '*/*'
        },
        body: JSON.stringify({
          serviceStatus: newCode,
          note: appointment.note || '',
          suggestion: ''
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Cập nhật thất bại');
      }

      // Cập nhật UI
      setAppointments(arr =>
        arr.map((a, i) => i === editIndex ? { ...a, status: form.status } : a)
      );
      alert('Cập nhật trạng thái thành công!');
      closeModal();
    } catch (error) {
      console.error('Lỗi khi cập nhật:', error);
      alert('Lỗi khi cập nhật: ' + error.message);
    }
  };

  // Đổi trạng thái nhanh trên bảng
  const handleStatusChange = async (idx, newStatus) => {
    const appointment = filteredAppointments[idx];
    const appointmentId = appointment.id;

    try {
      const currentCode = getStatusCode(appointment.status);
      const newCode = getStatusCode(newStatus);

      // Kiểm tra nếu cố gắng quay lại trạng thái trước đó
      if (newCode < currentCode) {
        alert('Không thể quay lại trạng thái trước đó!');
        return;
      }

      // Kiểm tra không cho phép nhảy cóc trạng thái (chỉ được chuyển đến trạng thái tiếp theo)
      // Ngoại lệ: "Không tới" có thể được chọn từ bất kỳ trạng thái nào
      if (newCode > currentCode + 1 && newCode !== 8) {
        alert('Không thể nhảy cóc trạng thái! Chỉ được chuyển đến trạng thái tiếp theo.');
        return;
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`https://api-gender2.purintech.id.vn/api/Appointment/test-result/${appointmentId}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'accept': '*/*'
        },
        body: JSON.stringify({
          serviceStatus: getStatusCode(newStatus),
          note: appointment.note || '',
          suggestion: ''
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Xác nhận trạng thái thất bại');
      }

      // Cập nhật trạng thái trong giao diện
      setAppointments(prev => prev.map((a, i) => {
        if (a.id === appointmentId) {
          return { ...a, status: newStatus };
        }
        return a;
      }));
      alert('Cập nhật trạng thái thành công!');
    } catch (error) {
      console.error('Lỗi khi gọi API xác nhận:', error);
      alert('Lỗi khi xác nhận trạng thái: ' + error.message);
    }
  };


  return (
    <Container>
      <StaffSidebar />
      <ContentArea>
        <StaffHeader />
        <Section>
          <SectionHeader>
            <SectionTitle>Quản lý đặt lịch xét nghiệm</SectionTitle>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <SearchInput
                placeholder="Tìm kiếm khách hàng hoặc dịch vụ..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <select
                value={statusFilter}
                onChange={(e) => filterByStatus(e.target.value)}
                style={{
                  padding: '8px 14px',
                  border: '1px solid #e0e0e0',
                  borderRadius: 5,
                  fontSize: '1rem',
                  background: '#f9f9f9',
                  color: '#333',
                  minWidth: '150px',
                  cursor: 'pointer',
                }}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="Chờ xác nhận">Chờ xác nhận</option>
                <option value="Đã xác nhận">Đã xác nhận</option>
                <option value="Đã tới">Đã tới</option>
                <option value="Đang thực hiện">Đang thực hiện</option>
                <option value="Đã lấy mẫu">Đã lấy mẫu</option>
                <option value="Chờ kết quả">Chờ kết quả</option>
                <option value="Đã trả kết quả">Đã trả kết quả</option>
                <option value="Hoàn thành">Hoàn thành</option>
                <option value="Không tới">Không tới</option>
              </select>
            </div>
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
              {filteredAppointments.map((row, idx) => (
                <Tr key={idx}>
                  <Td>{row.customerName || ''}</Td>
                  <Td>{row.serviceName || ''}</Td>
                  <Td>{row.ngay || ''}</Td>
                  <Td>{row.status || 'Chờ xác nhận'}</Td>
                  <Td>{row.note || ''}</Td>
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
            <ModalTitle>Chỉnh sửa trạng thái lịch hẹn</ModalTitle>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '20px', textAlign: 'center' }}>
              Chỉ có thể thay đổi trạng thái, các thông tin khác được cố định
            </p>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Khách hàng</Label>
                <Input type="text" value={form.customerName} disabled />
              </FormGroup>
              <FormGroup>
                <Label>Dịch vụ</Label>
                <Input type="text" value={form.serviceName} disabled />
              </FormGroup>
              <FormGroup>
                <Label>Ngày</Label>
                <Input type="date" value={form.ngay} disabled />
              </FormGroup>
              <FormGroup>
                <Label>Trạng thái</Label>
                <StatusSelect
                  value={form.status}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                  required
                >
                                     {statusOptions.map(opt => {
                     const currentCode = getStatusCode(form.status);
                     const optCode = getStatusCode(opt);
                    // Trường hợp đặc biệt: Chờ kết quả không cho lên "Đã trả kết quả"
                    const blockFromChoKetQuaToDaTra = currentCode === 5 && optCode === 6;
                     // Chỉ cho phép chọn trạng thái hiện tại hoặc trạng thái tiếp theo
                     // Ngoại lệ: "Không tới" có thể được chọn từ bất kỳ trạng thái nào
                     const isDisabled = optCode < currentCode || (optCode > currentCode + 1 && optCode !== 8)
                     ||blockFromChoKetQuaToDaTra;
                     return (
                       <option key={opt} value={opt} disabled={isDisabled}>
                         {opt}
                       </option>
                     );
                   })}
                </StatusSelect>

              </FormGroup>
              <FormGroup>
                <Label>Ghi chú</Label>
                <Input type="text" value={form.note} disabled />
              </FormGroup>
              <ModalBtnRow>
                <SaveBtn type="submit">Cập nhật trạng thái</SaveBtn>
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