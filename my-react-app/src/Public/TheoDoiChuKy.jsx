import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HeaderCustomer from '../components/HeaderCustomer';
import Footer from '../components/Footer';

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background:rgb(242, 252, 249);
  overflow-x: hidden;
`;
const Banner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0 0 0;
  margin-top: 100px;
  img {
    width: 120px;
    height: 120px;
    margin-right: 32px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 4px 16px rgba(16,185,129,0.08);
  }
  @media (max-width: 600px) {
    flex-direction: column;
    img { margin: 0 0 16px 0; }
  }
`;

const SaveButton = styled.button`
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 32px;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 12px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
  transition: background 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: #047857;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0px);
    box-shadow: 0 2px 6px rgba(16, 185, 129, 0.2);
  }
`;
const BannerTitle = styled.h1`
  font-size: 2.2rem;
  color: #047857;
  font-weight: 800;
  margin: 0;
  letter-spacing: 1px;
`;
const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 8px 32px 8px;
`;
const SectionTitle = styled.h2`
  color:rgb(15, 42, 35);
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 18px;
  text-align: center;
`;


const ReminderCard = styled.div`
  background: #f0fdfa;
  border-left: 5px solid #10b981;
  border-radius: 12px;
  padding: 12px 16px;
  color: #047857;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const ChartWrapper = styled.div`
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
`;
const AddPeriodBtn = styled.button`
  margin-top: 18px;
  background: #10b981;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(16,185,129,0.08);
  transition: background 0.2s;
  &:hover { background: #047857; }
`;
const Container = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 0 16px;
`;
const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-top: 16px;
`;
const CalendarCell = styled.div`
  background: ${({ color }) => color || '#fff'};
  color: ${({ color }) => (color ? '#fff' : '#222')};
  border-radius: 8px;
  min-height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid #e5e7eb;
  transition: background 0.2s, color 0.2s;
  &:hover {
    filter: brightness(0.95);
    box-shadow: 0 2px 8px rgba(16,185,129,0.08);
  }
`;
const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
`;
const CalendarNavBtn = styled.button`
  background: #10b981;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  &:hover { background: #047857; }
`;
const LegendRow = styled.div`
  display: flex;
  gap: 18px;
  margin: 18px 0 0 0;
  align-items: center;
`;
const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.98rem;
`;
const LegendColor = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background: ${({ color }) => color};
  border: 1px solid #e5e7eb;
`;
const Section = styled.section`
  margin: 24px 0 0 0;
`;
const SettingsRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
`;
const Input = styled.input`
  width: ${({ width }) => width || '100%'};
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

// Helper: Lấy số ngày trong tháng
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
// Helper: Lấy thứ của ngày đầu tháng (0=CN, 1=T2...)
function getFirstDayOfWeek(year, month) {
  return new Date(year, month, 1).getDay();
}
// Helper: format yyyy-MM-dd
function formatDayJS(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}



const TheoDoiChuKy = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [mainDate, setMainDate] = useState(new Date());
  const [periodData, setPeriodData] = useState([]);
  const [reminderMessages, setReminderMessages] = useState([]);
  const [periodLength, setPeriodLength] = useState(5);
  const [cycleLength, setCycleLength] = useState(28);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState({
    year: today.getFullYear(),
    month: today.getMonth()
  });
  const [selectedDays, setSelectedDays] = useState(() => {
    const stored = localStorage.getItem('periodDays');
    return stored ? JSON.parse(stored) : [];
  });
  

const fetchUserMenstrualInfo = async () => {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch('https://api-gender2.purintech.id.vn/api/Customer/get-user-menstrual-info', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': '*/*'
      }
    });
    const data = await res.json();
    if (data.code === 200) {
      setPeriodLength(data.obj.menstrualLength);
      setCycleLength(data.obj.cycleLength);
    }
  } catch (err) {
    console.error("Lỗi lấy thông tin chu kỳ:", err);
  }
};

const getColorFromApiType = (type) => {
  switch (type) {
    case "ngày trắng": return '#e0e0e0ff'; 
    case "ngày hành kinh thực tế": return '#fb6060';
    case "ngày rụng trứng": return '#41b5f7';
    case "ngày dễ thụ thai": return '#f9ec7a';
    case "ngày an toàn tuyệt đối": return '#5ce089';
    case "ngày an toàn tương đối": return '#5ce089';
    case "ngày hành kinh dự đoán": return '#fca5a5';
    default: return '#fff';
  }
};
const fetchCalendarData = async (month, year) => {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch('https://api-gender2.purintech.id.vn/api/MenstrualCycle/load-menstrual-calendar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': '*/*'
      },
      body: JSON.stringify({ month: month + 1, year }) // chú ý +1 vì JS month = 0-11
    });
    const data = await res.json();
    if (data.code === 200) {
      setCalendarData(data.obj);
    } else {
      console.error("Lỗi khi tải lịch:", data.message);
    }
  } catch (err) {
    console.error("Lỗi fetchCalendarData:", err);
  }
};

  useEffect(() => {
  fetchUserMenstrualInfo();
}, []);


useEffect(() => {
  fetchCalendarData(currentMonth.month, currentMonth.year);
}, [currentMonth]);
  useEffect(() => {
    updateCycleStats();
  }, [periodData]);

  const updateReminders = () => {
    const todayStr = formatDayJS(new Date());
    const periodLength = parseInt(localStorage.getItem("customPeriodLength")) || 5;
    let messages = [];
    if (periodData.length) {
      const sorted = periodData.map(d => new Date(d)).sort((a, b) => a - b);
      const lastPeriod = sorted.findLast(d => d <= new Date());
      if (lastPeriod) {
        const daysSince = Math.floor((new Date() - lastPeriod) / (1000 * 60 * 60 * 24));
        if (daysSince < periodLength) {
          messages.push({ text: `Bạn đang trong kỳ hành kinh (bắt đầu từ ${formatDayJS(lastPeriod)}).` });
        }
        if (daysSince >= 12 && daysSince <= 16) {
          const ovulationDate = new Date(lastPeriod);
          ovulationDate.setDate(ovulationDate.getDate() + 14);
          messages.push({ text: `Giai đoạn dễ thụ thai (rụng trứng dự kiến ${formatDayJS(ovulationDate)}).` });
        }
      }
    }
    if (messages.length === 0) messages.push({ icon: '💝', text: `Chúc bạn một ngày khỏe mạnh! (${formatDayJS(new Date())})` });
    setReminderMessages(messages);
  };
  const updateCycleStats = () => {
    if (chartInstance.current) chartInstance.current.destroy();
    if (periodData.length < 2) return;
    const sorted = periodData.map(d => new Date(d)).sort((a, b) => a - b);
    const cycleLengths = sorted.slice(1).map((d, i) =>
      Math.round((d - sorted[i]) / (1000 * 60 * 60 * 24))
    );
    const labels = sorted.slice(1).map(formatDayJS);
    chartInstance.current = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Độ dài chu kỳ (ngày)',
          data: cycleLengths,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16,185,129,0.2)',
          fill: true,
          tension: 0.3,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            suggestedMin: 20,
            suggestedMax: 45,
            ticks: { precision: 0 }
          }
        }
      }
    });
  };
  // Thêm kỳ kinh mới (demo, bạn có thể mở rộng lưu vào localStorage)
  const handleAddPeriod = () => {
    const todayStr = formatDayJS(new Date());
    if (!periodData.includes(todayStr)) {
      const newData = [...periodData, todayStr];
      setPeriodData(newData);
      localStorage.setItem('periodData', JSON.stringify(newData));
      updateReminders();
    }
  };

  const handleSaveCycleSettings = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  try {
    const res = await fetch('https://api-gender2.purintech.id.vn/api/MenstrualCycle/update-user-menstrual-length-and-cycle-length', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': '*/*'
      },
      body: JSON.stringify({
        menstrualLength: periodLength,
        cycleLength: cycleLength
      })
    });

    const result = await res.json();
    if (result.code === 200) {
      alert("Đã lưu cài đặt chu kỳ!");
      // Gọi lại API để làm mới dữ liệu chu kỳ
      await fetchUserMenstrualInfo();
    } else {
      alert("Lỗi khi lưu: " + result.message);
    }
  } catch (err) {
    console.error("Lỗi khi gọi API cập nhật:", err);
    alert("Không thể lưu cài đặt!");
  }
};

  // Click chọn ngày hành kinh
  const handleDayClick = async (dateObj) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const clickedDate = new Date(dateObj);
  clickedDate.setHours(0, 0, 0, 0);

  if (clickedDate > today) {
    alert("Không thể chọn ngày trong tương lai.");
    return;
  }

  const token = localStorage.getItem('token');
  const day = clickedDate.getDate();
  const month = clickedDate.getMonth() + 1; // JS month: 0-11
  const year = clickedDate.getFullYear();

  try {
    const res = await fetch('https://api-gender2.purintech.id.vn/api/MenstrualCycle/toggle-menstrual-date', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': '*/*'
      },
      body: JSON.stringify({ day, month, year })
    });

    const result = await res.json();
    if (result.code === 200) {
      await fetchCalendarData(currentMonth.month, currentMonth.year); // Reload calendar
    } else {
      alert("Lỗi khi cập nhật ngày: " + result.message);
    }
  } catch (err) {
    console.error("Lỗi gọi API toggle:", err);
    alert("Không thể cập nhật ngày hành kinh.");
  }
};


  // Tính toán các ngày đặc biệt dựa vào các ngày hành kinh đã chọn
  const getDayType = (dateObj) => {
    const dayStr = formatDayJS(dateObj);
    if (selectedDays.includes(dayStr)) return 'period';
    // Tìm ngày bắt đầu kỳ kinh gần nhất trước hoặc bằng ngày này
    const sorted = selectedDays.map(d => new Date(d)).sort((a, b) => a - b);
    let lastPeriod = null;
    for (let i = sorted.length - 1; i >= 0; i--) {
      if (sorted[i] <= dateObj) {
        lastPeriod = sorted[i];
        break;
      }
    }
    if (!lastPeriod) return 'safe';
    const diff = Math.floor((dateObj - lastPeriod) / (1000 * 60 * 60 * 24));
    if (diff === 14) return 'ovulation';
    if (diff >= 12 && diff <= 16) return 'fertile';
    return 'safe';
  };

  // Màu cho từng loại ngày
  const getDayColor = (type, isPredicted) => {
    if (isPredicted) return '#fca5a5'; // Dự đoán kỳ kinh tiếp theo (đỏ nhạt vừa phải)
    switch (type) {
      case 'period': return '#fb6060'; 
      case 'ovulation': return '#41b5f7'; 
      case 'fertile': return '#f9ec7a'; 
      case 'safe': return '#5ce089'; 
      default: return '#fff';
    }
  };

  // Thêm hàm kiểm tra ngày có nằm trong dải dự đoán kỳ kinh tiếp theo không
  function isDateInRange(date, start, end) {
    return date >= start && date <= end;
  }

  // Tìm dải ngày dự đoán kỳ kinh tiếp theo
  const predictedNextPeriodRange = (() => {
    if (!selectedDays.length) return null;
    const sorted = selectedDays.map(d => new Date(d)).sort((a, b) => a - b);
    const last = sorted[sorted.length - 1];
    if (!last || isNaN(cycleLength) || isNaN(periodLength)) return null;
    const start = new Date(last);
    start.setDate(start.getDate() + cycleLength);
    const end = new Date(start);
    end.setDate(start.getDate() + periodLength - 1);
    // Đảm bảo dải ngày dự đoán luôn có đúng periodLength ngày
    return { start, end, days: Array.from({length: periodLength}, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    }) };
  })();

  // Render calendar grid (JS thuần)
  const renderCalendar = () => {
  const { year, month } = currentMonth;
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = getFirstDayOfWeek(year, month);
  let offset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  let dayNum = 1;
  const grid = [];

  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      let cell = null;
      if (row === 0 && col < offset || dayNum > daysInMonth) {
        cell = <CalendarCell key={`empty-${row}-${col}`} color="#f3f4f6" style={{ opacity: 0.4 }} />;
      } else {
        const dayStr = String(dayNum).padStart(2, '0');
        const found = calendarData.find(d => d.date === dayStr);
        const color = found ? getColorFromApiType(found.type) : '#fff';
        const tooltip = found?.type || "Không có dữ liệu";
        const dateObj = new Date(year, month, dayNum);
        cell = (
          <CalendarCell
            key={formatDayJS(dateObj)}
            color={color}
            onClick={() => handleDayClick(dateObj)}
            title={tooltip}
          >
            {dayNum}
          </CalendarCell>
        );
        dayNum++;
      }
      grid.push(cell);
    }
  }
  return grid;
};

  return (
    <PageWrapper>
      <HeaderCustomer />
      <Banner>
        <BannerTitle>Theo dõi chu kỳ kinh nguyệt</BannerTitle>
      </Banner>
      <Main>
        <Container>
          <section style={{ margin: '24px 0 0 0' }}>
            <SectionTitle>Lịch chu kỳ của bạn</SectionTitle>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 12, gap: 16 }}>
              <button
                onClick={() => setCurrentMonth(prev => {
                  let m = prev.month - 1;
                  let y = prev.year;
                  if (m < 0) { m = 11; y--; }
                  return { year: y, month: m };
                })}
                style={{
                  background: '#10b981',
                  border: 'none',
                  borderRadius: 8,
                  width: 40,
                  height: 40,
                  fontSize: 22,
                  color: '#fff',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px 0 rgba(34,197,94,0.10)',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseOver={e => { e.currentTarget.style.background = '#4bb091'; }}
                onMouseOut={e => { e.currentTarget.style.background = '#10b981'; }}
              >
                &laquo;
              </button>
              <span style={{ fontWeight: 600, fontSize: 18 }}>{`Tháng ${currentMonth.month + 1}, ${currentMonth.year}`}</span>
              <button
                onClick={() => setCurrentMonth(prev => {
                  let m = prev.month + 1;
                  let y = prev.year;
                  if (m > 11) { m = 0; y++; }
                  return { year: y, month: m };
                })}
                style={{
                  background: '#10b981',
                  border: 'none',
                  borderRadius: 8,
                  width: 40,
                  height: 40,
                  fontSize: 22,
                  color: '#fff',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px 0 rgba(34,197,94,0.10)',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseOver={e => { e.currentTarget.style.background = '#059669'; }}
                onMouseOut={e => { e.currentTarget.style.background = '#10b981'; }}
              >
                &raquo;
              </button>
            </div>
            <CalendarGrid>
              {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map(d => (
                <div key={d} style={{ textAlign: 'center', fontWeight: 700, color: '#64748b', fontSize: 15 }}>{d}</div>
              ))}
              {renderCalendar()}
            </CalendarGrid>
            <LegendRow>
              <LegendItem><LegendColor color="#fb6060" /> Hành kinh</LegendItem>
              <LegendItem><LegendColor color="#41b5f7" /> Rụng trứng</LegendItem>
              <LegendItem><LegendColor color="#f9ec7a" /> Thụ thai</LegendItem>
              <LegendItem><LegendColor color="#5ce089" /> An toàn</LegendItem>
              <LegendItem><LegendColor color="#fca5a5" /> Dự đoán kỳ kinh tiếp theo</LegendItem>
            </LegendRow>
            {predictedNextPeriodRange && (
              <div style={{ marginTop: 12, color: '#fb6060', fontWeight: 600, fontSize: 16 }}>
                Dự đoán kỳ kinh tiếp theo: từ {predictedNextPeriodRange.start.getDate()}/{predictedNextPeriodRange.start.getMonth() + 1}/{predictedNextPeriodRange.start.getFullYear()} đến {predictedNextPeriodRange.end.getDate()}/{predictedNextPeriodRange.end.getMonth() + 1}/{predictedNextPeriodRange.end.getFullYear()} (Tổng số ngày: {predictedNextPeriodRange.days.length})
              </div>
            )}
          </section>
          <Section>
            <SectionTitle style={{ textAlign: 'center' }}>Cài đặt chu kỳ</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <SettingsRow style={{ justifyContent: 'center' }}>
                <label style={{ minWidth: 140, textAlign: 'right', marginRight: 8 }}>Độ dài kỳ kinh (ngày):</label>
                <select
                  value={periodLength}
                  onChange={e => setPeriodLength(Number(e.target.value))}
                  style={{ width: 80, textAlign: 'center', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
                >
                  {[3,4,5,6,7].map(n => (
                    <option key={n} value={n}>{n} ngày</option>
                  ))}
                </select>
              </SettingsRow>
              <SettingsRow style={{ justifyContent: 'center' }}>
                <label style={{ minWidth: 140, textAlign: 'right', marginRight: 8 }}>Độ dài chu kỳ (ngày):</label>
                <select
                  value={cycleLength}
                  onChange={e => setCycleLength(Number(e.target.value))}
                  style={{ width: 80, textAlign: 'center', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
                >
                  {Array.from({length: 26}, (_, i) => 20 + i).map(n => (
                    <option key={n} value={n}>{n} ngày</option>
                  ))}
                </select>
              </SettingsRow>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
    <SaveButton onClick={handleSaveCycleSettings}>💾 Lưu cài đặt</SaveButton>
  </div>
          </Section>
        </Container>
      </Main>
      <Footer />
    </PageWrapper>
  );
};

export default TheoDoiChuKy;