import React, { useState, useEffect, useRef } from 'react';
import StaffSidebar from '../components/staffSidebar';
import StaffHeader from '../components/staffHeader';
import styled, { keyframes } from 'styled-components';

// Styled Components
const Container = styled.div`
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
  width: 99vw;
  margin: 0;
  padding: 4rem 0;
  overflow-x: hidden;
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
const PageHeader = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 24px;
`;
const Title = styled.h1`
  font-size: 1.5rem;
  color: #018866;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 20px;
`;
const Toolbar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 18px;
    margin-left: 20px;
`;
const Btn = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover, &:focus {
    outline: none;
  }
`;
const BtnPrimary = styled(Btn)`
  background: #20c997;
  color: white;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(5, 225, 156, 0.4);
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;
const BtnSecondary = styled(Btn)`
  background: #f8f9fa;
  color: #0a5444;
  border: 2px solid #e9ecef;
  &:hover {
    background: #e9ecef;
    border-color: #dee2e6;
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;
const WeekRange = styled.div`
  background: #17b880;
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
`;
const ScheduleContainer = styled.main`
  background: white;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow-x: auto;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto 30px auto;
`;
const ScheduleGrid = styled.div`
  display: grid;
  grid-template-columns: 100px repeat(7, 1fr);
  gap: 1px;
  background: #e9ecef;
  border-radius: 12px;
  overflow: hidden;
  max-width: 100%;
  width: 100%;
  min-width: 700px;
`;
const ScheduleCell = styled.div`
  background: white;
  padding: 10px;
  min-height: 70px;
  position: relative;
  transition: all 0.3s ease;
  &:hover { background: #f8f9fa; }
  &.today {
    background: #c7f7e8 !important;
    border: 2px solid #068351;
  }
`;
const HeaderCell = styled.div`
  background: #20c997;
  color: white;
  font-weight: 700;
  text-align: center;
  padding: 15px 10px;
  font-size: 13px;
`;
const ShiftCell = styled.div`
  background: #f8f9fa;
  font-weight: 600;
  color: #2c5043;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  padding: 8px 5px;
`;
const ScheduleItem = styled.div`
  background: white;
  border-radius: 6px;
  padding: 6px 8px;
  margin: 2px 0;
  font-size: 11px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-left: 3px solid #34dbba;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;
const ScheduleActions = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 6px;
`;
const ActionBtn = styled.button`
  padding: 4px 8px;
  border: none;
  border-radius: 6px;
  font-size: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover, &:focus {
    outline: none;
  }
`;
const EditBtn = styled(ActionBtn)`
  background: #17b8a0;
  color: white;
  &:hover { background: #13967a; outline: none; }
  &:focus { outline: none; }
`;
const DeleteBtn = styled(ActionBtn)`
  background: #dc3545;
  color: white;
  &:hover { background: #c82333; outline: none; }
  &:focus { outline: none; }
`;
const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #6c757d;
  font-style: italic;
`;
const FormSection = styled.section`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow-x: hidden;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;
const FormTitle = styled.h2`
  color: #2c5048;
  margin-bottom: 25px;
  font-size: 1.8rem;
  font-weight: 700;
`;
const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 25px;
`;
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;
const FormLabel = styled.label`
  font-weight: 600;
  color: #2c5049;
  margin-bottom: 8px;
  font-size: 14px;
`;
const FormInput = styled.input`
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: white;
  &:focus {
    outline: none;
    border-color: #34dbac;
    box-shadow: 0 0 0 3px rgba(52, 219, 166, 0.1);
  }
`;
const FormSelect = styled.select`
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    border-color: #34d8db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
`;
const SaveBtn = styled.button`
  background: #17b88a;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(40, 167, 123, 0.4);
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;
const NotificationAnim = keyframes`
  from { transform: translateX(400px); }
  to { transform: translateX(0); }
`;
const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  z-index: 1000;
  background: ${props => props.type === 'error' ? '#dc3545' : '#20c997'};
  animation: ${NotificationAnim} 0.3s ease;
  box-shadow: 0 4px 16px rgba(32,201,151,0.15);
`;
const Loading = styled.div`
  text-align: center;
  padding: 20px;
`;
const Spinner = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Helper functions
function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}
function formatDate(date) {
  return date.toISOString().split('T')[0];
}
function formatDisplayDate(dateStr) {
  const date = new Date(dateStr);
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
}

const dayNames = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

const StaffLichLamViec = () => {
  // State
  const [schedules, setSchedules] = useState(() => {
    const local = localStorage.getItem('schedules');
    return local ? JSON.parse(local) : [];
  });
  const [currentMonday, setCurrentMonday] = useState(getMonday(new Date()));
  const [viewMode, setViewMode] = useState('week');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [form, setForm] = useState({ date: formatDate(new Date()), shift: 'sang', note: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const formRef = useRef();

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('schedules', JSON.stringify(schedules));
  }, [schedules]);

  // Notification auto-hide
  useEffect(() => {
    if (notification.show) {
      const t = setTimeout(() => setNotification(n => ({ ...n, show: false })), 3000);
      return () => clearTimeout(t);
    }
  }, [notification]);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
  };

  const changeWeek = (offset) => {
    setCurrentMonday(prev => {
      const d = new Date(prev);
      if (viewMode === 'week') d.setDate(d.getDate() + offset * 7);
      else d.setMonth(d.getMonth() + offset);
      return getMonday(d);
    });
  };

  const toggleView = () => {
    setViewMode(v => v === 'week' ? 'month' : 'week');
  };

  const clearForm = () => {
    setForm({ date: formatDate(new Date()), shift: 'sang', note: '' });
    setEditingIndex(null);
  };

  const handleFormChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSave = e => {
    e.preventDefault();
    const { date, shift, note } = form;
    if (!date || !shift) {
      showNotification('Vui lòng nhập đủ thông tin!', 'error');
      return;
    }
    let newSchedules = [...schedules];
    if (editingIndex !== null) {
      // Edit
      newSchedules.splice(editingIndex, 1);
      if (shift === 'cangay') {
        newSchedules = newSchedules.filter(s => s.date !== date);
        newSchedules.push({ date, shift: 'sang', note });
        newSchedules.push({ date, shift: 'chieu', note });
        showNotification('Cập nhật ca làm cả ngày thành công!');
      } else {
        newSchedules = newSchedules.filter(s => !(s.date === date && s.shift === shift));
        newSchedules.push({ date, shift, note });
        showNotification('Cập nhật ca làm thành công!');
      }
    } else {
      // Add
      if (shift === 'cangay') {
        const existing = newSchedules.filter(s => s.date === date);
        if (existing.length > 0) {
          if (!window.confirm(`Ngày ${date} đã có ${existing.length} ca làm việc. Bạn có muốn thay thế bằng ca làm cả ngày không?`)) return;
          newSchedules = newSchedules.filter(s => s.date !== date);
        }
        newSchedules.push({ date, shift: 'sang', note });
        newSchedules.push({ date, shift: 'chieu', note });
        showNotification('Thêm ca làm cả ngày thành công!');
      } else {
        const conflict = newSchedules.find(s => s.date === date && s.shift === shift);
        if (conflict) {
          if (!window.confirm(`Đã có ca ${shift === 'sang' ? 'sáng' : 'chiều'} cho ngày ${date}. Bạn có muốn thay thế không?`)) return;
          newSchedules = newSchedules.filter(s => !(s.date === date && s.shift === shift));
        }
        newSchedules.push({ date, shift, note });
        showNotification('Thêm ca làm thành công!');
      }
    }
    setSchedules(newSchedules);
    clearForm();
  };

  const handleEdit = idx => {
    const s = schedules[idx];
    setForm({ date: s.date, shift: s.shift, note: s.note || '' });
    setEditingIndex(idx);
    setTimeout(() => {
      if (formRef.current) formRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDelete = idx => {
    if (window.confirm('Bạn có chắc muốn xóa ca này?')) {
      const newSchedules = [...schedules];
      newSchedules.splice(idx, 1);
      setSchedules(newSchedules);
      showNotification('Xóa ca làm thành công!');
    }
  };

  // Render schedule grid (week view)
  const renderWeekView = () => {
    const grid = [];
    // Header row
    grid.push(<HeaderCell key="header-shift">Ca/Ngày</HeaderCell>);
    for (let i = 0; i < 7; i++) {
      const day = new Date(currentMonday);
      day.setDate(currentMonday.getDate() + i);
      grid.push(
        <HeaderCell key={`header-${i}`}>{dayNames[i]}<br />({formatDisplayDate(formatDate(day))})</HeaderCell>
      );
    }
    // 2 shift rows
    ['sang', 'chieu'].forEach(shift => {
      grid.push(
        <ShiftCell key={`shift-${shift}`}>{shift === 'sang' ? '08:00 - 12:00' : '13:00 - 17:00'}</ShiftCell>
      );
      for (let i = 0; i < 7; i++) {
        const day = new Date(currentMonday);
        day.setDate(currentMonday.getDate() + i);
        const dateStr = formatDate(day);
        const isToday = formatDate(new Date()) === dateStr;
        const daySchedules = schedules.filter(s => s.date === dateStr && s.shift === shift);
        grid.push(
          <ScheduleCell key={`${shift}-${i}`} className={isToday ? 'today' : ''}>
            {daySchedules.length === 0 ? (
              <EmptyState style={{ padding: 0, color: '#bbb', fontSize: 12 }}>Trống</EmptyState>
            ) : daySchedules.map((s, idx) => (
              <ScheduleItem key={idx}>
                <div><strong>Có ca làm</strong></div>
                {s.note && <div style={{ fontSize: 11, color: '#666', marginTop: 4 }}>{s.note}</div>}
                <ScheduleActions>
                  <EditBtn onClick={() => handleEdit(schedules.indexOf(s))}><i className="fas fa-edit"></i></EditBtn>
                  <DeleteBtn onClick={() => handleDelete(schedules.indexOf(s))}><i className="fas fa-trash"></i></DeleteBtn>
                </ScheduleActions>
              </ScheduleItem>
            ))}
          </ScheduleCell>
        );
      }
    });
    return grid;
  };

  // Render schedule grid (month view)
  const renderMonthView = () => {
    const grid = [];
    const now = new Date(currentMonday);
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    // Adjust firstDayOfMonth to match Vietnamese calendar (Monday = 0, Sunday = 6)
    let adjustedFirstDay = firstDayOfMonth;
    if (adjustedFirstDay === 0) adjustedFirstDay = 6; else adjustedFirstDay = adjustedFirstDay - 1;
    // Day headers
    for (let i = 0; i < 7; i++) {
      grid.push(<HeaderCell key={`mheader-${i}`}>{dayNames[i]}</HeaderCell>);
    }
    // Empty cells before first day
    for (let i = 0; i < adjustedFirstDay; i++) {
      grid.push(<ScheduleCell key={`empty-${i}`} style={{ background: '#f8f9fa', minHeight: 100 }} />);
    }
    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(new Date(year, month, day));
      const isToday = formatDate(new Date()) === dateStr;
      const daySchedules = schedules.filter(s => s.date === dateStr);
      grid.push(
        <ScheduleCell key={`mcell-${day}`} className={isToday ? 'today' : ''} style={{ minHeight: 100, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 8, left: 8, fontWeight: 600, fontSize: 14, color: isToday ? '#f59e0b' : '#2c3e50' }}>{day}</div>
          <div style={{ marginTop: 35, padding: '0 4px' }}>
            {daySchedules.length === 0 ? (
              <div style={{ fontSize: 11, color: '#bbb', padding: '20px 8px' }}>Trống</div>
            ) : (
              ['sang', 'chieu'].map(shift => {
                const s = daySchedules.find(x => x.shift === shift);
                return s ? (
                  <div key={shift} style={{ marginBottom: 4 }}>
                    <ScheduleItem>
                      <div style={{ fontWeight: 600 }}>Có ca làm</div>
                      {s.note && <div style={{ fontSize: 9, color: '#666', marginTop: 2 }}>{s.note}</div>}
                      <ScheduleActions>
                        <EditBtn onClick={() => handleEdit(schedules.indexOf(s))} style={{ padding: '2px 4px', fontSize: 8 }}><i className="fas fa-edit"></i></EditBtn>
                        <DeleteBtn onClick={() => handleDelete(schedules.indexOf(s))} style={{ padding: '2px 4px', fontSize: 8 }}><i className="fas fa-trash"></i></DeleteBtn>
                      </ScheduleActions>
                    </ScheduleItem>
                  </div>
                ) : null;
              })
            )}
          </div>
        </ScheduleCell>
      );
    }
    // Fill empty cells to complete grid
    const totalCells = 7 * Math.ceil((adjustedFirstDay + daysInMonth) / 7);
    const remainingCells = totalCells - (adjustedFirstDay + daysInMonth);
    for (let i = 0; i < remainingCells; i++) {
      grid.push(<ScheduleCell key={`mempty-${i}`} style={{ background: '#f8f9fa', minHeight: 100 }} />);
    }
    return grid;
  };

  // Week/month range text
  const getRangeText = () => {
    if (viewMode === 'week') {
      const start = formatDate(currentMonday);
      const end = formatDate(new Date(currentMonday.getTime() + 6 * 86400000));
      return `${start} - ${end}`;
    } else {
      const now = new Date(currentMonday);
      const year = now.getFullYear();
      const month = now.getMonth();
      const monthNames = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
      return `${monthNames[month]} ${year}`;
    }
  };

  // Loading effect for schedule
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [currentMonday, viewMode, schedules]);



  return (
    <Container className="container">
      <StaffSidebar />
      <ContentArea className="content-area">
        <StaffHeader />
        <PageHeader className="page-header">
          <Title><i className="fas fa-calendar-alt"></i> Lịch Làm Việc Nhân Viên</Title>
          <Toolbar className="toolbar">
            <BtnSecondary type="button" onClick={() => changeWeek(-1)}>
              <i className="fas fa-chevron-left"></i> <span>{viewMode === 'week' ? 'Tuần trước' : 'Tháng trước'}</span>
            </BtnSecondary>
            <WeekRange className="week-range">{getRangeText()}</WeekRange>
            <BtnSecondary type="button" onClick={() => changeWeek(1)}>
              <span>{viewMode === 'week' ? 'Tuần sau' : 'Tháng sau'}</span> <i className="fas fa-chevron-right"></i>
            </BtnSecondary>
            <BtnPrimary type="button" onClick={toggleView}>
              <i className="fas fa-calendar-week"></i>
              <span>{viewMode === 'week' ? 'Chế độ tuần' : 'Chế độ tháng'}</span>
            </BtnPrimary>
          </Toolbar>
        </PageHeader>
        <ScheduleContainer className="schedule-container">
          {loading ? (
            <Loading><Spinner /><p>Đang tải...</p></Loading>
          ) : (
            <ScheduleGrid className="schedule-grid" style={viewMode === 'week' ? { gridTemplateColumns: '100px repeat(7, 1fr)' } : { gridTemplateColumns: 'repeat(7, 1fr)' }}>
              {viewMode === 'week' ? renderWeekView() : renderMonthView()}
            </ScheduleGrid>
          )}
        </ScheduleContainer>
        <FormSection className="form-section" ref={formRef}>
          <FormTitle><i className="fas fa-plus-circle"></i> Thêm / Chỉnh Sửa Ca Làm</FormTitle>
          <form onSubmit={handleSave}>
            <FormGrid className="form-grid">
              <FormGroup className="form-group">
                <FormLabel htmlFor="dateInput"><i className="fas fa-calendar"></i> Ngày</FormLabel>
                <FormInput type="date" id="dateInput" name="date" value={form.date} onChange={handleFormChange} />
              </FormGroup>
              <FormGroup className="form-group">
                <FormLabel htmlFor="shiftInput"><i className="fas fa-clock"></i> Ca làm</FormLabel>
                <FormSelect id="shiftInput" name="shift" value={form.shift} onChange={handleFormChange}>
                  <option value="sang">Ca sáng (08:00 - 12:00)</option>
                  <option value="chieu">Ca chiều (13:00 - 17:00)</option>
                  <option value="cangay">Cả ngày (08:00 - 17:00)</option>
                </FormSelect>
              </FormGroup>
              <FormGroup className="form-group">
                <FormLabel htmlFor="noteInput"><i className="fas fa-sticky-note"></i> Ghi chú</FormLabel>
                <FormInput type="text" id="noteInput" name="note" value={form.note} onChange={handleFormChange} placeholder="VIP, ca gấp, đặc biệt..." />
              </FormGroup>
            </FormGrid>
            <SaveBtn type="submit"><i className="fas fa-save"></i> Lưu Ca Làm</SaveBtn>
          </form>
        </FormSection>
        {notification.show && (
          <Notification type={notification.type}>{notification.message}</Notification>
        )}
      </ContentArea>
    </Container>
  );
};

export default StaffLichLamViec;
