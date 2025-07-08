import React, { useRef, useEffect, useState } from 'react';
import AdminLayout from '../components/adminLayout';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import styled from 'styled-components';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const MainContent = styled.main`
  padding: 100px 0 24px 210px;
  background: #f9fafb;
  min-height: 100vh;
  width: 134vw;
  max-width: 99vw;
  margin: 0;
  overflow-x: hidden;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    padding-left: 0;
  }
  @media (max-width: 768px) {
    padding-top: 80px;
    padding-left: 0;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  padding: 0 8px;
  @media (max-width: 1200px) {
    max-width: 100vw;
    padding: 0 4px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 24px;
  width: 100%;
  box-sizing: border-box;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
const StatsCard = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.05);
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StatsLeft = styled.div`
  display: flex;
  flex-direction: column;
`;
const StatsLabel = styled.p`
  font-size: 14px;
  color: #6b7280;
`;
const StatsNumber = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin: 4px 0;
`;
const StatsChange = styled.p`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
`;
const StatsIconWrapper = styled.div`
  padding: 12px;
  border-radius: 9999px;
  background: ${props => props.bg || '#eef2ff'};
  color: ${props => props.color || '#4f46e5'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
`;
const ChartsRow = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 24px;
  width: 100%;
  box-sizing: border-box;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 16px;
  }
`;
const ChartBox = styled.div`
  flex: 1 1 0;
  min-width: 360px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.05);
  padding: 32px 28px;
  width: 100%;
`;
const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
const ChartTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
`;
const ChartButtons = styled.div`
  display: flex;
  gap: 8px;
`;
const ChartBtn = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  background: ${props => props.active ? '#e0e7ff' : 'transparent'};
  color: ${props => props.active ? '#4338ca' : '#4b5563'};
  cursor: pointer;
  transition: background 0.3s;
  &:hover { background: #f3f4f6; }
`;

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.05);
  padding: 32px 28px;
  margin-bottom: 24px;
  width: 100%;
  box-sizing: border-box;
`;
const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
`;
const ViewAll = styled.a`
  font-size: 14px;
  color: #4f46e5;
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const AppointmentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const AppointmentItem = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 16px;
  &:last-child { border-bottom: none; padding-bottom: 0; }
`;
const AppointmentImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  object-fit: cover;
  margin-right: 12px;
`;
const AppointmentInfo = styled.div`
  flex: 1;
`;
const AppointmentName = styled.h4`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
`;
const AppointmentDesc = styled.p`
  font-size: 14px;
  color: #6b7280;
`;
const AppointmentTime = styled.p`
  font-size: 12px;
  color: #9ca3af;
  margin-top: 4px;
`;
const Badge = styled.span`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 9999px;
  font-weight: 500;
  white-space: nowrap;
  background: ${props => props.bg};
  color: ${props => props.color};
`;

const TopicList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const TopicItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding-top: ${props => props.borderTop ? '16px' : '0'};
  border-top: ${props => props.borderTop ? '1px solid #e5e7eb' : 'none'};
`;
const TopicInfo = styled.div`
  flex: 1;
`;
const TopicImg = styled.img`
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
`;
const TopicTags = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;
const Tag = styled.span`
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 9999px;
  font-weight: 500;
  background: ${props => props.bg};
  color: ${props => props.color};
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;
const StaffTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const StaffTh = styled.th`
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  border-bottom: 1px solid #e5e7eb;
`;
const StaffTd = styled.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: top;
`;
const StaffInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const StaffImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  object-fit: cover;
`;
const StaffName = styled.div`
  font-weight: 500;
  color: #111827;
`;
const StaffRole = styled.div`
  font-size: 14px;
  color: #6b7280;
`;
const ActivityTitle = styled.div`
  color: #111827;
`;
const ActivityDesc = styled.div`
  color: #6b7280;
  font-size: 14px;
`;

// DATA
const stats = [
  {
    label: 'Tổng khách hàng',
    value: '1,245',
    change: '+12.5%',
    changeType: 'up',
    desc: 'so với tháng trước',
    icon: 'fas fa-users',
    color: '#4f46e5',
    bg: '#eef2ff',
  },
  {
    label: 'Cuộc tư vấn hôm nay',
    value: '42',
    change: '+3.2%',
    changeType: 'up',
    desc: 'so với hôm qua',
    icon: 'fas fa-comments',
    color: '#2563eb',
    bg: '#dbeafe',
  },
  {
    label: 'Xét nghiệm STI',
    value: '87',
    change: '-5.7%',
    changeType: 'down',
    desc: 'so với tuần trước',
    icon: 'fas fa-vials',
    color: '#ef4444',
    bg: '#fee2e2',
  },
  {
    label: 'Lịch hẹn mới',
    value: '18',
    change: '+8.9%',
    changeType: 'up',
    desc: 'so với hôm qua',
    icon: 'fas fa-calendar-check',
    color: '#22c55e',
    bg: '#dcfce7',
  },
];

const chartDataSet = {
  Tháng: {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
    consultation: [120, 135, 150, 165, 180, 195],
    online: [80, 95, 110, 125, 140, 155],
    sti: [60, 75, 90, 110, 130, 145],
    blood: [40, 55, 70, 85, 100, 120],
  },
  Quý: {
    labels: ['Quý 1', 'Quý 2'],
    consultation: [405, 540],
    online: [285, 420],
    sti: [225, 385],
    blood: [165, 305],
  },
  Năm: {
    labels: ['2023', '2024'],
    consultation: [1050, 1250],
    online: [840, 990],
    sti: [670, 820],
    blood: [540, 700],
  },
};

const appointments = [
  {
    name: 'Nguyễn Thị Minh',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ba546be5-d13c-483b-870b-7b9498e29187.png',
    desc: 'Tư vấn kế hoạch hóa gia đình',
    time: 'Hôm nay, 14:30',
    status: 'confirmed',
    statusText: 'Đã xác nhận',
  },
  {
    name: 'Trần Văn Hải',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/eab0256e-502b-4300-b141-641843ca6be3.png',
    desc: 'Kiểm tra STI',
    time: 'Ngày mai, 09:15',
    status: 'pending',
    statusText: 'Chờ xác nhận',
  },
  {
    name: 'Lê Minh Đức',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/34e3f385-2fc9-4958-85d9-68ef24031f46.png',
    desc: 'Tư vấn quan hệ vợ chồng',
    time: 'Ngày mai, 16:45',
    status: 'new',
    statusText: 'Mới',
  },
];

const topics = [
  {
    title: 'Phòng tránh thai an toàn',
    views: '1,245',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ecd5437c-2453-4cd0-8472-727d00255ea8.png',
    tags: [
      { name: 'KHHGĐ', bg: '#e0e7ff', color: '#3730a3' },
      { name: 'Sức khỏe', bg: '#e0e7ff', color: '#3730a3' },
    ],
  },
  {
    title: 'Dấu hiệu nhiễm HIV sớm',
    views: '987',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3920ea9a-c219-4942-97bf-64528a80d5bf.png',
    tags: [
      { name: 'STI', bg: '#fee2e2', color: '#991b1b' },
      { name: 'Sức khỏe', bg: '#fee2e2', color: '#991b1b' },
    ],
  },
  {
    title: 'Thay đổi tâm sinh lý tuổi dậy thì',
    views: '754',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7b083548-8757-491a-9941-c7cba2b2f420.png',
    tags: [
      { name: 'Tuổi teen', bg: '#ede9fe', color: '#6b21a8' },
      { name: 'Giáo dục', bg: '#ede9fe', color: '#6b21a8' },
    ],
  },
];

const staffActivities = [
  {
    staff: {
      name: 'Bs. Nguyễn Thị Mai',
      role: 'Chuyên gia KHHGĐ',
      avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5afe0068-357f-49e8-841b-1836a2d4af1d.png',
    },
    activity: {
      title: 'Hoàn thành tư vấn BN-1125',
      desc: 'Kế hoạch hóa gia đình',
    },
    time: '10 phút trước',
    status: 'done',
    statusText: 'Hoàn thành',
  },
  {
    staff: {
      name: 'Bs. Trần Minh Tuấn',
      role: 'Chuyên gia STI',
      avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/869e94c1-8d30-4cc1-9552-e6f54e3f53b1.png',
    },
    activity: {
      title: 'Gửi kết quả xét nghiệm',
      desc: 'BN-1109',
    },
    time: '25 phút trước',
    status: 'processing',
    statusText: 'Đang xử lý',
  },
  {
    staff: {
      name: 'ĐD. Lê Thị Hồng',
      role: 'Điều dưỡng trưởng',
      avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0dc893aa-c582-4609-bc9f-244bed85844b.png',
    },
    activity: {
      title: 'Đặt lịch xét nghiệm',
      desc: '5 bệnh nhân mới',
    },
    time: '1 giờ trước',
    status: 'done',
    statusText: 'Hoàn thành',
  },
];

const badgeColors = {
  confirmed: { bg: '#d1fae5', color: '#065f46' },
  pending: { bg: '#fef3c7', color: '#92400e' },
  new: { bg: '#dbeafe', color: '#1e40af' },
  done: { bg: '#d1fae5', color: '#065f46' },
  processing: { bg: '#dbeafe', color: '#1e40af' },
};

function getConsultationChartData(period) {
  const data = chartDataSet[period];
  return {
    labels: data.labels,
    datasets: [
      {
        label: 'Tư vấn trực tiếp',
        data: data.consultation,
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Tư vấn trực tuyến',
        data: data.online,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.3,
      },
    ],
  };
}
function getTestChartData(period) {
  const data = chartDataSet[period];
  return {
    labels: data.labels,
    datasets: [
      {
        label: 'Xét nghiệm STI',
        data: data.sti,
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Xét nghiệm máu',
        data: data.blood,
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
        tension: 0.3,
      },
    ],
  };
}
const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    tooltip: { mode: 'index', intersect: false },
  },
  scales: {
    y: { beginAtZero: true },
  },
};

const periods = ['Tháng', 'Quý', 'Năm'];

const AdminTrangChu = () => {
  const [consultationPeriod, setConsultationPeriod] = useState('Tháng');
  const [testPeriod, setTestPeriod] = useState('Tháng');

  return (
    <>
      <AdminLayout />
      <MainContent>
        <ContentWrapper>
          <StatsGrid>
            {stats.map((stat, idx) => (
              <StatsCard key={idx}>
                <StatsLeft>
                  <StatsLabel>{stat.label}</StatsLabel>
                  <StatsNumber style={{ color: stat.color }}>{stat.value}</StatsNumber>
                  <StatsChange style={{ color: stat.changeType === 'up' ? '#22c55e' : '#ef4444' }}>
                    <i className={`fas fa-arrow-${stat.changeType}`}></i> {stat.change} {stat.desc}
                  </StatsChange>
                </StatsLeft>
                <StatsIconWrapper bg={stat.bg} color={stat.color}>
                  <i className={stat.icon}></i>
                </StatsIconWrapper>
              </StatsCard>
            ))}
          </StatsGrid>
          <GridLayout>
            <div>
              <ChartsRow>
                <ChartBox>
                  <ChartHeader>
                    <ChartTitle>Thống kê tư vấn theo {consultationPeriod.toLowerCase()}</ChartTitle>
                    <ChartButtons>
                      {periods.map(p => (
                        <ChartBtn key={p} active={consultationPeriod === p} onClick={() => setConsultationPeriod(p)}>{p}</ChartBtn>
                      ))}
                    </ChartButtons>
                  </ChartHeader>
                  <Line data={getConsultationChartData(consultationPeriod)} options={chartOptions} height={250} />
                </ChartBox>
                <ChartBox>
                  <ChartHeader>
                    <ChartTitle>Thống kê xét nghiệm theo {testPeriod.toLowerCase()}</ChartTitle>
                    <ChartButtons>
                      {periods.map(p => (
                        <ChartBtn key={p} active={testPeriod === p} onClick={() => setTestPeriod(p)}>{p}</ChartBtn>
                      ))}
                    </ChartButtons>
                  </ChartHeader>
                  <Line data={getTestChartData(testPeriod)} options={chartOptions} height={250} />
                </ChartBox>
              </ChartsRow>
              <Card>
                <CardHeader>
                  <CardTitle>Lịch hẹn gần đây</CardTitle>
                  <ViewAll href="#">Xem tất cả</ViewAll>
                </CardHeader>
                <AppointmentsList>
                  {appointments.map((a, idx) => (
                    <AppointmentItem key={idx}>
                      <AppointmentImg src={a.avatar} alt={a.name} />
                      <AppointmentInfo>
                        <AppointmentName>{a.name}</AppointmentName>
                        <AppointmentDesc>{a.desc}</AppointmentDesc>
                        <AppointmentTime>{a.time}</AppointmentTime>
                      </AppointmentInfo>
                      <Badge bg={badgeColors[a.status].bg} color={badgeColors[a.status].color}>{a.statusText}</Badge>
                    </AppointmentItem>
                  ))}
                </AppointmentsList>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Chủ đề được quan tâm</CardTitle>
                  <ViewAll href="#">Xem tất cả</ViewAll>
                </CardHeader>
                <TopicList>
                  {topics.map((t, idx) => (
                    <TopicItem key={idx} borderTop={idx > 0}>
                      <TopicInfo>
                        <AppointmentName>{t.title}</AppointmentName>
                        <AppointmentDesc>{t.views} lượt xem</AppointmentDesc>
                        <TopicTags>
                          {t.tags.map((tag, i) => (
                            <Tag key={i} bg={tag.bg} color={tag.color}>{tag.name}</Tag>
                          ))}
                        </TopicTags>
                      </TopicInfo>
                      <TopicImg src={t.image} alt={t.title} />
                    </TopicItem>
                  ))}
                </TopicList>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Hoạt động nhân viên gần đây</CardTitle>
                </CardHeader>
                <TableContainer>
                  <StaffTable>
                    <thead>
                      <tr>
                        <StaffTh>Nhân viên</StaffTh>
                        <StaffTh>Hoạt động</StaffTh>
                        <StaffTh>Thời gian</StaffTh>
                        <StaffTh>Trạng thái</StaffTh>
                      </tr>
                    </thead>
                    <tbody>
                      {staffActivities.map((s, idx) => (
                        <tr key={idx}>
                          <StaffTd>
                            <StaffInfo>
                              <StaffImg src={s.staff.avatar} alt={s.staff.name} />
                              <div>
                                <StaffName>{s.staff.name}</StaffName>
                                <StaffRole>{s.staff.role}</StaffRole>
                              </div>
                            </StaffInfo>
                          </StaffTd>
                          <StaffTd>
                            <ActivityTitle>{s.activity.title}</ActivityTitle>
                            <ActivityDesc>{s.activity.desc}</ActivityDesc>
                          </StaffTd>
                          <StaffTd>{s.time}</StaffTd>
                          <StaffTd>
                            <Badge bg={badgeColors[s.status].bg} color={badgeColors[s.status].color}>{s.statusText}</Badge>
                          </StaffTd>
                        </tr>
                      ))}
                    </tbody>
                  </StaffTable>
                </TableContainer>
              </Card>
            </div>
          </GridLayout>
        </ContentWrapper>
      </MainContent>
    </>
  );
};

export default AdminTrangChu;