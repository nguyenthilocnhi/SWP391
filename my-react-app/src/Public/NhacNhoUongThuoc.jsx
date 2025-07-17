import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HeaderCustomer from '../components/HeaderCustomer';
import Footer from '../components/Footer';

const Container = styled.main`
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
  width: 100vw;
  margin: 0;
  padding: 2rem 0;
  margin-top: 100px;
`;

const Title = styled.h1`
  text-align: center;
  color: #10b981;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const StartDateSection = styled.div`
  max-width: 600px;
  margin: 0 auto 2rem;
  padding: 1.5rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 18px rgba(16, 185, 129, 0.08);
  border: 1.5px solid #e0e0e0;

  label {
    font-weight: 600;
    color: #10b981;
    font-size: 15px;
    margin-right: 10px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  input, select {
    padding: 12px 18px;
    border-radius: 10px;
    border: 2px solid #e0e0e0;
    background-color: #f8f9fa;
    font-size: 15px;
    font-weight: 500;
    color: #222;
    margin: 0 10px;
    box-shadow: 0 2px 6px rgba(16, 185, 129, 0.04);
    transition: border 0.2s, box-shadow 0.2s;
    outline: none;

    &:focus {
      border-color: #10b981;
      box-shadow: 0 0 0 2px #10b98133;
    }

    &:hover {
      border-color: #10b981;
    }
  }

  button {
    background: #10b981;
    color: #fff;
    padding: 12px 24px;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
    margin-left: 10px;

    &:hover {
      background: #0f766e;
      transform: translateY(-2px);
    }
  }
`;

const CalendarContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 18px rgba(16, 185, 129, 0.08);
  border: 1.5px solid #e0e0e0;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
  }
`;

const NavButton = styled.button`
  background: #10b981;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: #0f766e;
    transform: translateY(-2px);
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  max-width: 800px;
  margin: 0 auto;
`;

const DayName = styled.div`
  text-align: center;
  font-weight: 600;
  background: #10b981;
  color: #fff;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
`;

const Day = styled.div`
  text-align: center;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;

  /* Hiệu ứng click */
  &:active {
    transform: scale(0.95);
  }

  /* Trạng thái đã uống - MÀU XANH */
  &.check {
    background-color: #22c55e !important;
    color: #ffffff !important;
    border-color: #22c55e !important;
  }

  /* Trạng thái chưa uống - MÀU XANH DƯƠNG */
  &.x {
    background-color: #447defff !important;
    color: #ffffff !important;
    border-color: #447defff !important;
  }

  /* Ngày hôm nay - đã uống - MÀU XANH */
  &.today.check {
    background-color: #fcc327ff !important;
    color: #ffffff !important;
    border-color: #ffa237ff !important;
    border-width: 3px !important;
    font-weight: bold;
  }

  /* Ngày hôm nay - chưa uống - MÀU XANH DƯƠNG */
  &.today.x {
    background-color: #447defff !important;
    color: #ffffff !important;
    border-color: #93c5fd !important;
    border-width: 3px !important;
    font-weight: bold;
  }

  /* Ngày hôm nay - mặc định - MÀU VÀNG */
  &.today {
    background-color: #f59e0b !important;
    color: #ffffff !important;
    border-color: #93c5fd !important;
    border-width: 3px !important;
    font-weight: bold;
  }

  /* Ngày tương lai - MÀU XÁM */
  &.future {
    background-color: #f3f4f6 !important;
    color: #9ca3af !important;
    cursor: not-allowed;
    pointer-events: none;
  }



  /* Tháng đã qua */
  &.past-month {
    opacity: 0.6;
    cursor: default;
    pointer-events: none;
  }

  /* Ngày trước ngày bắt đầu - để trắng */
  &.before-start {
    background-color: #ffffff !important;
    color: #9ca3af !important;
    border-color: #e5e7eb !important;
    cursor: default;
    pointer-events: none;
  }

  /* Hover effect */
  &:hover:not(.future):not(.past-month) {
    transform: scale(1.05);
  }

  /* Hiệu ứng ripple khi click */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s;
  }

  &:active::before {
    width: 100px;
    height: 100px;
  }
`;

const Legend = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;

  p {
    display: flex;
    align-items: center;
    font-weight: 500;
    color: #374151;
  }
`;

const Circle = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 8px;

  &.check {
    background: #22c55e;
  }

  &.x {
    background: #447defff;
  }

  &.today {
    background: #f59e0b;
  }
`;

const Summary = styled.div`
  text-align: center;
  background: #fff;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 18px rgba(16, 185, 129, 0.08);
  border: 1.5px solid #e0e0e0;
  max-width: 600px;
  margin: 1.5rem auto;

  p {
    margin: 0.5rem 0;
    font-weight: 500;
    color: #374151;

    strong {
      color: #10b981;
    }
  }
`;

const NextPackInfo = styled.div`
  text-align: center;
  color: #10b981;
  font-size: 14px;
  margin: 1rem 0;
  background: #f0fdf4;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #bbf7d0;
  max-width: 600px;
  margin: 1rem auto;
`;

const ResetButton = styled.button`
  background: #ef4444;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  margin: 1rem auto;
  display: block;

  &:hover {
    background: #dc2626;
    transform: translateY(-2px);
  }
`;




const NhacNhoUongThuoc = () => {
    const today = new Date();
    const [ongoingPack, setOngoingPack] = useState(null);
    const [pillCalendar, setPillCalendar] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [startDate, setStartDate] = useState(null);
    const [pillCycle, setPillCycle] = useState(28);
    const [missedDays, setMissedDays] = useState([]);
    const [showStartDateInput, setShowStartDateInput] = useState(false);
    const checkOngoingPack = async () => {
    try {
        const response = await fetch('https://api-gender2.purintech.id.vn/api/PillIntakeCycle/get-ongoing-pill-pack', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const result = await response.json();

        if (response.ok && result.code === 200 && result.obj !== null) {
            const { startDate, packSize } = result.obj;

            // Lưu xuống localStorage để dùng lại (tùy chọn)
            localStorage.setItem("startDate", startDate);
            localStorage.setItem("pillCycle", packSize);
            localStorage.setItem("hasUsedBefore", "true");

            // Cập nhật state
            setStartDate(new Date(startDate));
            setPillCycle(packSize);
            setOngoingPack(result.obj);
            setShowStartDateInput(false);
        } else {
            // Không có pack hiện tại → cho phép hiển thị form chọn ngày
            setShowStartDateInput(true);
            setOngoingPack(null);
        }
    } catch (error) {
        console.error("Lỗi check ongoing pack:", error);
        setShowStartDateInput(true);
        setOngoingPack(null); // fallback để không chặn UI
    }
};
    const fetchCalendarFromAPI = async (month, year) => {
    try {
        const response = await fetch('https://api-gender2.purintech.id.vn/api/PillIntakeCycle/load-pill-pack-calendar', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                month: month + 1, // API dùng tháng 1–12
                year: year,
            }),
        });

        const result = await response.json();

        if (response.ok) {
            setPillCalendar(result.obj || []);
        } else {
            alert(`Lỗi API: ${result?.message || 'Không xác định'}`);
        }
    } catch (err) {
        console.error("Lỗi fetch calendar:", err);
    }
};
    useEffect(() => {
        const savedStart = localStorage.getItem("startDate");
        const savedCycle = localStorage.getItem("pillCycle");
        const hasUsedBefore = localStorage.getItem("hasUsedBefore");
        
        if (savedStart) {
            setStartDate(new Date(savedStart));
            setShowStartDateInput(false);
        } else {
            setShowStartDateInput(true);
        }
        if (savedCycle) setPillCycle(parseInt(savedCycle));
        
        // Đánh dấu rằng người dùng đã từng sử dụng hệ thống
        if (savedStart && !hasUsedBefore) {
            localStorage.setItem("hasUsedBefore", "true");
        }
    }, []);
useEffect(() => {
    checkOngoingPack(); // Gọi API để kiểm tra pack hiện tại
}, []);
    useEffect(() => {
    fetchCalendarFromAPI(currentMonth, currentYear);
}, [currentMonth, currentYear]);

    useEffect(() => {
        if (!startDate) return;
        
        const key = getKey();
        const saved = JSON.parse(localStorage.getItem(key)) || [];
        setMissedDays(saved);
    }, [currentMonth, currentYear, startDate, pillCycle]);

    // Khởi tạo dữ liệu ban đầu cho tháng hiện tại nếu chưa có
    useEffect(() => {
        if (!startDate) return; // Chỉ khởi tạo khi đã có startDate
        
        const key = getKey();
        const saved = localStorage.getItem(key);
        const hasUsedBefore = localStorage.getItem("hasUsedBefore");
        
        // Nếu chưa có dữ liệu cho tháng này và người dùng đã từng sử dụng hệ thống
        if (!saved && hasUsedBefore) {
            const totalDays = daysInMonth(currentMonth, currentYear);
            const monthStart = new Date(currentYear, currentMonth, 1);
            const monthEnd = new Date(currentYear, currentMonth, totalDays);
            
            // Chỉ khởi tạo nếu tháng này có ngày sau start date
            if (monthEnd >= startDate) {
                const defaultMissedDays = [];
                localStorage.setItem(key, JSON.stringify(defaultMissedDays));
                setMissedDays(defaultMissedDays);
            }
        }
    }, [currentMonth, currentYear, startDate]);

    const getKey = () => `missedDays_${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;

    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

    const getWeekday = (year, month, day) => new Date(year, month, day).getDay();

    const saveStartDate = async () => {
    const input = document.getElementById("startDate").value;
    const cycle = document.getElementById("pillCycle").value;

    if (!input) return alert("Vui lòng chọn ngày bắt đầu!");

    try {
        // Gọi API để lưu pack mới
        const response = await fetch('https://api-gender2.purintech.id.vn/api/PillIntakeCycle/add-pill-pack', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Dùng token lưu ở localStorage
            },
            body: JSON.stringify({
                startDate: input,
                packSize: parseInt(cycle)
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Lưu vào localStorage nếu API thành công
            localStorage.setItem("startDate", input);
            localStorage.setItem("pillCycle", cycle);
            localStorage.setItem("hasUsedBefore", "true");
            setStartDate(new Date(input));
            setPillCycle(parseInt(cycle));
            setShowStartDateInput(false);
            alert("Đã lưu thành công!");
            await fetchCalendarFromAPI(currentMonth, currentYear);
            await checkOngoingPack();
        } else {
            console.error("API response error:", data);
            alert(`Lỗi API: ${data?.message || "Không xác định"}`);
        }
    } catch (error) {
        console.error("API request failed:", error);
        alert("Gọi API thất bại. Vui lòng kiểm tra kết nối hoặc token.");
    }
};

    const toggleDay = (day) => {
        const key = getKey();
        let updated = [...missedDays];
        const index = updated.indexOf(day);
        
        // Thêm hiệu ứng visual feedback
        const dayElement = document.querySelector(`[data-day="${day}"]`);
        if (dayElement) {
            dayElement.style.transform = 'scale(0.9)';
            setTimeout(() => {
                dayElement.style.transform = 'scale(1)';
            }, 150);
        }
        
        if (index !== -1) {
            updated.splice(index, 1);
        } else {
            updated.push(day);
        }
        localStorage.setItem(key, JSON.stringify(updated));
        setMissedDays(updated);
    };

    const resetLich = async () => {
    if (!ongoingPack) {
        alert("Không tìm thấy vỉ thuốc hiện tại để xoá.");
        return;
    }

    const confirmReset = confirm("Bạn có chắc muốn đặt lại toàn bộ lịch không?");
    if (!confirmReset) return;

    try {
        const response = await fetch(`https://api-gender2.purintech.id.vn/api/PillIntakeCycle/delete-pack?packId=${ongoingPack.id}`, {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        const data = await response.json();

        if (response.ok && data.code === 200) {
            alert("Đã đặt lại lịch thành công!");

            // Xóa dữ liệu localStorage
            localStorage.removeItem("startDate");
            localStorage.removeItem("pillCycle");
            localStorage.removeItem("hasUsedBefore");
            localStorage.removeItem(getKey());

            // Reset state
            setStartDate(null);
            setPillCycle(28);
            setMissedDays([]);
            setShowStartDateInput(true);
            setOngoingPack(null);
            setPillCalendar([]);
            await checkOngoingPack();
            await fetchCalendarFromAPI(currentMonth, currentYear);
        } else {
            console.error("Xoá pack thất bại:", data);
            alert(`Lỗi khi xoá lịch: ${data?.message || "Không xác định"}`);
        }
    } catch (err) {
        console.error("Lỗi API khi xoá pack:", err);
        alert("Không thể kết nối đến máy chủ.");
    }
};

    const formatDate = (date) => `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;

    const suggestNextPack = () => {
        if (!startDate) return "";
        const diff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
        const currentCycle = Math.floor(diff / pillCycle) + 1;
        const currentPackStart = new Date(startDate);
        currentPackStart.setDate(startDate.getDate() + (currentCycle - 1) * pillCycle);
        const nextPackStart = new Date(currentPackStart);
        nextPackStart.setDate(currentPackStart.getDate() + pillCycle);
        return `📦 Vỉ hiện tại: từ ${formatDate(currentPackStart)}\n📅 Bắt đầu vỉ mới: ${formatDate(nextPackStart)}`;
    };

    const renderDays = () => {
        const totalDays = daysInMonth(currentMonth, currentYear);
        const firstDayOffset = getWeekday(currentYear, currentMonth, 1);
        const days = [];

        // Thêm các ô trống cho ngày đầu tuần
        for (let i = 0; i < firstDayOffset; i++) {
            days.push(<div key={`empty-${i}`} />);
        }

        for (let day = 1; day <= totalDays; day++) {
    const dateObj = new Date(currentYear, currentMonth, day);
    const isToday = dateObj.toDateString() === today.toDateString();
    const isPastOrToday = dateObj <= today;

    let className = "day";
    const pillData = pillCalendar.find(item => parseInt(item.date) === day);

    if (pillData) {
        if (pillData.type.includes("đã uống")) {
            className += " check";
        } else if (pillData.type.includes("chưa uống")) {
            className += " x";
        }
    }

    

    

    days.push(
        <Day
            key={day}
            className={className}
            data-day={day}
        >
            {day}
        </Day>
    );
}


        return days;
    };

    return (
        <>
            <HeaderCustomer />
            <Container>
                <Title>LỊCH UỐNG TRÁNH THAI</Title>

            {showStartDateInput && (
                    <StartDateSection>
                    <label>📅 Ngày bắt đầu:</label>
                        <input 
                            id="startDate" 
                            type="date" 
                            max={new Date().toISOString().split('T')[0]}
                            min={new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                        />
                    <label>💊 Chu kỳ:</label>
                        <select id="pillCycle">
                        <option value="21">21 viên</option>
                            <option value="28" selected>28 viên</option>
                    </select>
                        <button onClick={saveStartDate}>
                        Lưu
                    </button>
                    </StartDateSection>
            )}

                <CalendarContainer>
                    <CalendarHeader>
                        <NavButton
                    onClick={() => {
                        setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
                        if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
                    }}
                >
                    &larr; Tháng trước
                        </NavButton>
                        <h2>{`${currentYear} - Tháng ${currentMonth + 1}`}</h2>
                        <NavButton
                    onClick={() => {
                        setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
                        if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
                    }}
                >
                    Tháng sau &rarr;
                        </NavButton>
                    </CalendarHeader>

                    <CalendarGrid>
                {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day, idx) => (
                            <DayName key={idx}>
                        {day}
                            </DayName>
                ))}
                {renderDays()}
                    </CalendarGrid>
                </CalendarContainer>

                <Legend>
                <p>
                        <Circle className="check" />
                    Đã uống
                </p>
                <p>
                        <Circle className="x" />
                    Chưa uống
                </p>
                </Legend>
                
                {ongoingPack && (
  <>
    <NextPackInfo
      dangerouslySetInnerHTML={{
        __html: suggestNextPack().replace(/\n/g, '<br>'),
      }}
    />
    <ResetButton onClick={resetLich}>🔁 Đặt lại lịch</ResetButton>
  </>
)}
            </Container>
            <Footer />
        </>
    );
};

export default NhacNhoUongThuoc;
