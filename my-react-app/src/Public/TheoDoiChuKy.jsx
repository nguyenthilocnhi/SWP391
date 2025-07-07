import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HeaderCustomer from '../components/HeaderCustomer';
import Footer from '../components/Footer';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0fdfa 0%, #f9fafb 100%);
  display: flex;
  flex-direction: column;
`;
const Banner = styled.div`
  width: 100%;
  background: linear-gradient(90deg, #bbf7d0 0%, #f0fdfa 100%);
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
  color: #0f172a;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 18px;
  text-align: center;
`;
const MoodRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 28px;
  font-size: 2.5rem;
  margin-bottom: 8px;
`;
const MoodLabel = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #475569;
`;
const ReminderList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const TheoDoiChuKy = () => {
  const [mainDate, setMainDate] = useState(new Date());
  const [periodData, setPeriodData] = useState([]);
  const [selectedMood, setSelectedMood] = useState('Chưa chọn');
  const [reminderMessages, setReminderMessages] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const formatDate = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const formatDateVN = (d) => {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const getTodayStr = () => formatDate(new Date());

  useEffect(() => {
    const stored = localStorage.getItem("periodData");
    if (stored) setPeriodData(JSON.parse(stored));
    loadMood();
    updateReminders();
  }, []);

  useEffect(() => {
    updateCycleStats();
  }, [periodData]);

  const saveMood = (mood) => {
    localStorage.setItem(`mood-${getTodayStr()}`, mood);
    setSelectedMood(mood);
    updateReminders();
  };
  const loadMood = () => {
    const mood = localStorage.getItem(`mood-${getTodayStr()}`);
    if (mood) setSelectedMood(mood);
  };
  const updateReminders = () => {
    const today = getTodayStr();
    const periodLength = parseInt(localStorage.getItem("customPeriodLength")) || 5;
    let messages = [];
    if (periodData.length) {
      const sorted = periodData.map(d => new Date(d)).sort((a, b) => a - b);
      const lastPeriod = sorted.findLast(d => d <= new Date());
      if (lastPeriod) {
        const daysSince = Math.floor((new Date() - lastPeriod) / (1000 * 60 * 60 * 24));
        if (daysSince < periodLength) {
          messages.push({ icon: '🩸', text: `Bạn đang trong kỳ hành kinh (bắt đầu từ ${formatDateVN(lastPeriod)}).` });
        }
        if (daysSince >= 12 && daysSince <= 16) {
          const ovulationDate = new Date(lastPeriod);
          ovulationDate.setDate(ovulationDate.getDate() + 14);
          messages.push({ icon: '🌱', text: `Giai đoạn dễ thụ thai (rụng trứng dự kiến ${formatDateVN(ovulationDate)}).` });
        }
      }
    }
    const mood = localStorage.getItem(`mood-${today}`);
    const moodMap = {
      "😄": "Bạn đang rất vui vẻ!",
      "😊": "Một ngày tuyệt vời!",
      "😐": "Nếu có điều gì khiến bạn chưa vui...",
      "😕": "Bạn đang không vui...",
      "😢": "Bạn đang cảm thấy phiền muộn."
    };
    if (mood && moodMap[mood]) messages.push({ icon: mood, text: moodMap[mood] });
    if (messages.length === 0) messages.push({ icon: '💝', text: `Chúc bạn một ngày khỏe mạnh! (${formatDateVN(new Date())})` });
    setReminderMessages(messages);
  };
  const updateCycleStats = () => {
    if (chartInstance.current) chartInstance.current.destroy();
    if (periodData.length < 2) return;
    const sorted = periodData.map(d => new Date(d)).sort((a, b) => a - b);
    const cycleLengths = sorted.slice(1).map((d, i) =>
      Math.round((d - sorted[i]) / (1000 * 60 * 60 * 24))
    );
    const labels = sorted.slice(1).map(formatDateVN);
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
    const today = getTodayStr();
    if (!periodData.includes(today)) {
      const newData = [...periodData, today];
      setPeriodData(newData);
      localStorage.setItem('periodData', JSON.stringify(newData));
      updateReminders();
    }
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
            <SectionTitle>Tâm trạng hôm nay ({formatDateVN(new Date())})</SectionTitle>
            <MoodRow>
              {['😄', '😊', '😐', '😕', '😢'].map((icon, idx) => (
                <span
                  key={idx}
                  style={{ cursor: 'pointer', filter: selectedMood === icon ? 'drop-shadow(0 0 8px #10b981)' : 'none', fontSize: selectedMood === icon ? '2.8rem' : '2.5rem', transition: 'all 0.2s' }}
                  onClick={() => saveMood(icon)}
                >
                  {icon}
                </span>
              ))}
            </MoodRow>
            <MoodLabel>Tâm trạng bạn chọn: <b>{selectedMood}</b></MoodLabel>
          </section>
          <section style={{ margin: '24px 0 0 0' }}>
            <SectionTitle>Nhắc nhở cá nhân hóa</SectionTitle>
            <ReminderList>
              {reminderMessages.map((msg, idx) => (
                <ReminderCard key={idx}>
                  <span style={{ fontSize: 22 }}>{msg.icon}</span> {msg.text}
                </ReminderCard>
              ))}
            </ReminderList>
          </section>
        </Container>
      </Main>
      <Footer />
    </PageWrapper>
  );
};

export default TheoDoiChuKy;