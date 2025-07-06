import React, { useState, useEffect } from 'react';
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

const InputSection = styled.div`
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
  max-width: 800px;
  margin: 0 auto 1.5rem;
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

  /* Ngày kinh nguyệt - MÀU ĐỎ */
  &.menstruation {
    background-color: #ef4444 !important;
    color: #ffffff !important;
    border-color: #ef4444 !important;
  }

  /* Ngày rụng trứng - MÀU VÀNG */
  &.ovulation {
    background-color: #f59e0b !important;
    color: #ffffff !important;
    border-color: #f59e0b !important;
  }

  /* Ngày thụ thai - MÀU HỒNG */
  &.fertile {
    background-color: #ec4899 !important;
    color: #ffffff !important;
    border-color: #ec4899 !important;
  }

  /* Ngày an toàn - MÀU XANH LÁ */
  &.safe {
    background-color: #22c55e !important;
    color: #ffffff !important;
    border-color: #22c55e !important;
  }

  /* Ngày hôm nay - viền xanh nhạt */
  &.today {
    border-color: #93c5fd !important;
    border-width: 3px !important;
    font-weight: bold;
  }

  /* Tất cả ngày đều có thể click */
  cursor: pointer;

  /* Hover effect */
  &:hover {
    transform: scale(1.05);
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

  &.menstruation {
    background: #ef4444;
  }

  &.ovulation {
    background: #f59e0b;
  }

  &.fertile {
    background: #ec4899;
  }

  &.safe {
    background: #22c55e;
  }
`;

const PredictionInfo = styled.div`
  text-align: center;
  background: #fff;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 18px rgba(16, 185, 129, 0.08);
  border: 1.5px solid #e0e0e0;
  max-width: 600px;
  margin: 1.5rem auto;

  h3 {
    color: #10b981;
    margin-bottom: 1rem;
  }

  p {
    margin: 0.5rem 0;
    font-weight: 500;
    color: #374151;

    strong {
      color: #10b981;
    }
  }
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

const TheoDoiChuKy = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [lastPeriodDate, setLastPeriodDate] = useState(null);
  const [cycleLength, setCycleLength] = useState(28);
  const [showInput, setShowInput] = useState(false);
  const [actualMenstruationDay, setActualMenstruationDay] = useState(null);

  useEffect(() => {
    const savedLastPeriod = localStorage.getItem("lastPeriodDate");
    const savedCycleLength = localStorage.getItem("cycleLength");
    const savedActualDay = localStorage.getItem("actualMenstruationDay");
    
    if (savedLastPeriod) {
      setLastPeriodDate(new Date(savedLastPeriod));
    }
    if (savedCycleLength) {
      setCycleLength(parseInt(savedCycleLength));
    }
    if (savedActualDay) {
      setActualMenstruationDay(new Date(savedActualDay));
    }
  }, []);

  const saveCycleInfo = () => {
    // Function removed - no longer needed
  };

  const resetData = () => {
    if (confirm("Bạn có chắc muốn đặt lại toàn bộ dữ liệu không?")) {
      localStorage.removeItem("lastPeriodDate");
      localStorage.removeItem("cycleLength");
      localStorage.removeItem("actualMenstruationDay");
      setLastPeriodDate(null);
      setCycleLength(28);
      setActualMenstruationDay(null);
    }
  };

  const getCyclePredictions = () => {
    if (!lastPeriodDate) return { menstruation: [], ovulation: [], fertile: [], safe: [] };

    const predictions = {
      menstruation: [],
      ovulation: [],
      fertile: [],
      safe: []
    };

    // Tính toán cho 6 chu kỳ tiếp theo
    for (let cycle = 0; cycle < 6; cycle++) {
      const cycleStart = new Date(lastPeriodDate);
      cycleStart.setDate(lastPeriodDate.getDate() + (cycle * cycleLength));

      // Ngày kinh nguyệt (5 ngày)
      for (let day = 0; day < 5; day++) {
        const menstruationDate = new Date(cycleStart);
        menstruationDate.setDate(cycleStart.getDate() + day);
        predictions.menstruation.push(menstruationDate.toDateString());
      }

      // Ngày rụng trứng (1 ngày, thường là ngày thứ 14 của chu kỳ)
      const ovulationDate = new Date(cycleStart);
      ovulationDate.setDate(cycleStart.getDate() + 14);
      predictions.ovulation.push(ovulationDate.toDateString());

      // Ngày thụ thai (5 ngày xung quanh ngày rụng trứng)
      for (let day = -2; day <= 2; day++) {
        const fertileDate = new Date(ovulationDate);
        fertileDate.setDate(ovulationDate.getDate() + day);
        predictions.fertile.push(fertileDate.toDateString());
      }

      // Ngày an toàn (từ ngày 1-7 và từ ngày 21-28 của chu kỳ)
      for (let day = 0; day < 7; day++) {
        const safeDate1 = new Date(cycleStart);
        safeDate1.setDate(cycleStart.getDate() + day);
        predictions.safe.push(safeDate1.toDateString());
      }
      
      for (let day = 21; day < cycleLength; day++) {
        const safeDate2 = new Date(cycleStart);
        safeDate2.setDate(cycleStart.getDate() + day);
        predictions.safe.push(safeDate2.toDateString());
      }
    }

    return predictions;
  };

  const setMenstruationDay = (date) => {
    setActualMenstruationDay(date);
    localStorage.setItem("actualMenstruationDay", date.toISOString());
    
    // Cập nhật lastPeriodDate khi người dùng chọn ngày
    setLastPeriodDate(date);
    localStorage.setItem("lastPeriodDate", date.toISOString());
  };

  const getDayClass = (date) => {
    const dateString = date.toDateString();
    const predictions = getCyclePredictions();
    const isToday = date.toDateString() === today.toDateString();
    const isActualMenstruation = actualMenstruationDay && date.toDateString() === actualMenstruationDay.toDateString();

    let className = "day";

    if (isActualMenstruation) {
      className += " menstruation";
    } else if (lastPeriodDate && predictions.menstruation.includes(dateString)) {
      className += " menstruation";
    } else if (lastPeriodDate && predictions.ovulation.includes(dateString)) {
      className += " ovulation";
    } else if (lastPeriodDate && predictions.fertile.includes(dateString)) {
      className += " fertile";
    } else if (lastPeriodDate && predictions.safe.includes(dateString)) {
      className += " safe";
    }

    if (isToday) {
      className += " today";
    }

    return className;
  };

  const renderDays = () => {
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOffset = new Date(currentYear, currentMonth, 1).getDay();
    const days = [];

    // Thêm các ô trống cho ngày đầu tuần
    for (let i = 0; i < firstDayOffset; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const className = getDayClass(date);

      days.push(
        <Day 
          key={day} 
          className={className}
          onClick={() => {
            setMenstruationDay(date);
          }}
        >
          {day}
        </Day>
      );
    }

    return days;
  };

  const getNextPredictions = () => {
    if (!lastPeriodDate) return [];

    const predictions = [];
    const predictions_data = getCyclePredictions();

    // Tìm chu kỳ tiếp theo
    let nextCycleStart = new Date(lastPeriodDate);
    while (nextCycleStart <= today) {
      nextCycleStart.setDate(nextCycleStart.getDate() + cycleLength);
    }

    // Thêm thông tin chu kỳ tiếp theo
    const nextMenstruation = new Date(nextCycleStart);
    const nextOvulation = new Date(nextCycleStart);
    nextOvulation.setDate(nextCycleStart.getDate() + 14);

    predictions.push({
      type: "Kinh nguyệt",
      date: nextMenstruation,
      color: "#ef4444"
    });

    predictions.push({
      type: "Rụng trứng",
      date: nextOvulation,
      color: "#f59e0b"
    });

    return predictions;
  };

  return (
    <>
      <HeaderCustomer />
      <Container>
        <Title>THEO DÕI CHU KỲ KINH NGUYỆT</Title>

        {(
          <>
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
                <Circle className="menstruation" />
                Kinh nguyệt
              </p>
              <p>
                <Circle className="ovulation" />
                Rụng trứng
              </p>
              <p>
                <Circle className="fertile" />
                Thụ thai
              </p>
              <p>
                <Circle className="safe" />
                An toàn
              </p>
            </Legend>

            {lastPeriodDate && (
              <PredictionInfo>
                <h3>📅 Dự đoán chu kỳ tiếp theo</h3>
                {getNextPredictions().map((prediction, index) => (
                  <p key={index}>
                    <strong>{prediction.type}:</strong> {prediction.date.toLocaleDateString('vi-VN')}
                  </p>
                ))}
              </PredictionInfo>
            )}

            <ResetButton onClick={resetData}>
              🔁 Đặt lại dữ liệu
            </ResetButton>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default TheoDoiChuKy;
