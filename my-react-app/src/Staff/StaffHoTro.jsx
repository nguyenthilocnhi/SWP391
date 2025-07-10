import React, { useState } from 'react';
import StaffSidebar from '../components/staffSidebar';
import StaffHeader from '../components/staffHeader';
import styled from 'styled-components';
import { FaQuestionCircle, FaPhone, FaEnvelope, FaClock, FaFileAlt, FaVideo, FaBook, FaHeadphones } from 'react-icons/fa';

const Container = styled.div`
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
  width: 100vw;
  margin: 0;
  padding: 2rem 0;
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
  margin-bottom: 32px;
`;
const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #065f46;
  margin-bottom: 8px;
`;
const PageSubtitle = styled.p`
  color: #6b7280;
  font-size: 16px;
`;
const TabContainer = styled.div`
  margin-bottom: 32px;
`;
const TabButtons = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 2px solid #e5e7eb;
  margin-bottom: 24px;
`;
const TabButton = styled.button`
  padding: 12px 24px;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  &.active {
    color: #065f46;
    border-bottom-color: #10b981;
  }
  &:hover {
    color: #065f46;
  }
`;
const TabContent = styled.div`
  display: none;
  &.active {
    display: block;
  }
`;
const FaqItem = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;
`;
const FaqQuestion = styled.div`
  padding: 20px;
  background: #ffffff;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  color: #1f2937;
  transition: background-color 0.3s ease;
  &:hover {
    background: #f3f4f6;
  }
`;
const FaqAnswer = styled.div`
  padding: 0 20px;
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  background: #f9fafb;
  &.active {
    padding: 20px;
    max-height: 200px;
  }
`;
const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;
const ContactCard = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  }
`;
const ContactIcon = styled.div`
  font-size: 32px;
  margin-bottom: 16px;
`;
const ContactTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1f2937;
`;
const ContactInfo = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
`;
const ContactDescription = styled.div`
  color: #6b7280;
  font-size: 14px;
`;
const SupportHours = styled.div`
  background: #fef3c7;
  border: 1px solid #f59e0b;
  border-radius: 12px;
  padding: 20px;
  margin-top: 24px;
`;
const SupportHoursTitle = styled.h3`
  color: #92400e;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;
const SupportHoursText = styled.p`
  color: #92400e;
  margin: 4px 0;
`;
const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;
const ResourceCard = styled.div`
  background: #f0fdf4;
  border: 1px solid #d1fae5;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;
const ResourceIcon = styled.div`
  font-size: 24px;
  color: #10b981;
  margin-bottom: 12px;
`;
const ResourceTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #065f46;
`;
const ResourceDescription = styled.div`
  color: #6b7280;
  font-size: 14px;
`;

const StaffHoTro = () => {
  const [staffName] = useState('Nguyễn Thị Hương');
  const [activeTab, setActiveTab] = useState('faq');

  const faqData = [
    {
      question: 'Làm thế nào để đặt lịch hẹn cho khách hàng?',
      answer: "Bạn có thể đặt lịch hẹn cho khách hàng thông qua trang quản lý lịch hẹn. Vui lòng tham khảo hướng dẫn chi tiết tại mục 'Quản lý lịch hẹn'."
    },
    {
      question: 'Tôi nên làm gì nếu khách hàng không đến lịch hẹn?',
      answer: 'Nếu khách hàng không đến lịch hẹn, hãy liên hệ với họ qua điện thoại hoặc email để xác nhận lại. Bạn có thể tham khảo quy trình xử lý tại mục hướng dẫn.'
    },
    {
      question: 'Làm thế nào để cập nhật thông tin khách hàng?',
      answer: 'Vào mục Quản lý khách hàng, chọn khách hàng cần cập nhật và nhấn chỉnh sửa.'
    },
    {
      question: 'Cách xem kết quả xét nghiệm của khách hàng?',
      answer: 'Truy cập mục Quản lý xét nghiệm để xem và xuất kết quả cho khách hàng.'
    },
    {
      question: 'Làm sao để thay đổi thông tin cá nhân?',
      answer: 'Vào mục Cài đặt > Thông tin cá nhân để cập nhật thông tin của bạn.'
    }
  ];

  const supportChannels = [
    {
      icon: <FaPhone />, title: 'Đường dây nóng', contact: '1900 8888', description: 'Hỗ trợ 24/7', color: '#10b981'
    },
    {
      icon: <FaEnvelope />, title: 'Email hỗ trợ', contact: 'support@company.com', description: 'Phản hồi trong 24h', color: '#3b82f6'
    }
  ];

  const resources = [
    {
      icon: <FaFileAlt />, title: 'Hướng dẫn nghiệp vụ', description: 'Tài liệu hướng dẫn chi tiết', link: '#'
    },
    {
      icon: <FaVideo />, title: 'Video đào tạo', description: 'Các video hướng dẫn nghiệp vụ', link: '#'
    },
    {
      icon: <FaBook />, title: 'Tài liệu tham khảo', description: 'Kiến thức bổ trợ cho nhân viên', link: '#'
    }
  ];

  return (
    <Container className="container">
      <StaffSidebar />
      <ContentArea className="content-area">
        <StaffHeader
          userName={staffName}
          userRole="Nhân viên"
          avatar="https://placehold.co/40x40"
          online={true}
          welcome="Chào mừng đến với trang hỗ trợ!"
        />
        <PageHeader>
          <PageTitle>Hỗ trợ & Trợ giúp</PageTitle>
          <PageSubtitle>Tìm kiếm thông tin và liên hệ hỗ trợ khi cần thiết</PageSubtitle>
        </PageHeader>
        <TabContainer>
          <TabButtons>
            <TabButton className={activeTab === 'faq' ? 'active' : ''} onClick={() => setActiveTab('faq')}>
              <FaQuestionCircle style={{ marginRight: '8px' }} />
              Câu hỏi thường gặp
            </TabButton>
            <TabButton className={activeTab === 'contact' ? 'active' : ''} onClick={() => setActiveTab('contact')}>
              <FaHeadphones style={{ marginRight: '8px' }} />
              Liên hệ hỗ trợ
            </TabButton>
            <TabButton className={activeTab === 'resources' ? 'active' : ''} onClick={() => setActiveTab('resources')}>
              <FaBook style={{ marginRight: '8px' }} />
              Tài liệu hướng dẫn
            </TabButton>
          </TabButtons>
          <TabContent className={activeTab === 'faq' ? 'active' : ''}>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#065f46' }}>
                Câu hỏi thường gặp
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                Tìm câu trả lời cho những câu hỏi phổ biến về nghiệp vụ nhân viên
              </p>
            </div>
            {faqData.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </TabContent>
          <TabContent className={activeTab === 'contact' ? 'active' : ''}>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#065f46' }}>
                Liên hệ hỗ trợ
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                Chọn kênh liên hệ phù hợp để được hỗ trợ nhanh chóng
              </p>
            </div>
            <ContactGrid>
              {supportChannels.map((channel, index) => (
                <ContactCard key={index}>
                  <ContactIcon style={{ color: channel.color }}>
                    {channel.icon}
                  </ContactIcon>
                  <ContactTitle>{channel.title}</ContactTitle>
                  <ContactInfo>{channel.contact}</ContactInfo>
                  <ContactDescription>{channel.description}</ContactDescription>
                </ContactCard>
              ))}
            </ContactGrid>
            <SupportHours>
              <SupportHoursTitle>
                <FaClock />
                Giờ làm việc hỗ trợ
              </SupportHoursTitle>
              <SupportHoursText><strong>Thứ 2 - Thứ 6:</strong> 8:00 - 18:00</SupportHoursText>
              <SupportHoursText><strong>Thứ 7:</strong> 8:00 - 12:00</SupportHoursText>
              <SupportHoursText><strong>Chủ nhật:</strong> Nghỉ</SupportHoursText>
              <SupportHoursText><strong>Đường dây nóng:</strong> Hoạt động 24/7</SupportHoursText>
            </SupportHours>
          </TabContent>
          <TabContent className={activeTab === 'resources' ? 'active' : ''}>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#065f46' }}>
                Tài liệu hướng dẫn
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                Truy cập các tài liệu hướng dẫn và video đào tạo dành cho nhân viên
              </p>
            </div>
            <ResourcesGrid>
              {resources.map((resource, index) => (
                <ResourceCard key={index}>
                  <ResourceIcon>{resource.icon}</ResourceIcon>
                  <ResourceTitle>{resource.title}</ResourceTitle>
                  <ResourceDescription>{resource.description}</ResourceDescription>
                </ResourceCard>
              ))}
            </ResourcesGrid>
          </TabContent>
        </TabContainer>
      </ContentArea>
    </Container>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <FaqItem>
      <FaqQuestion onClick={() => setIsOpen(!isOpen)}>
        {question}
        <span style={{ fontSize: '18px', color: '#10b981' }}>
          {isOpen ? '−' : '+'}
        </span>
      </FaqQuestion>
      <FaqAnswer className={isOpen ? 'active' : ''}>{answer}</FaqAnswer>
    </FaqItem>
  );
};

export default StaffHoTro;
