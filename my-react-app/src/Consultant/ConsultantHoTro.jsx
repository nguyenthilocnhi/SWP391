import React, { useState, useEffect } from "react";
import ConsultantSidebar from "../components/ConsultantSidebar";
import ConsultantTopbar from "../components/ConsultantTopbar";
import { FaQuestionCircle, FaPhone, FaEnvelope, FaWhatsapp, FaClock, FaFileAlt, FaVideo, FaBook, FaHeadphones } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ConsultantHoTro = () => {
  const navigate = useNavigate();
  const [consultantName] = useState("Nguyễn Thị Huyền");
  const [notificationCount] = useState(3);
  const [activeTab, setActiveTab] = useState("faq");

  useEffect(() => {
    const role = Number(localStorage.getItem('role'));
    if (role !== 2) {
      navigate('/login');
    }
  }, [navigate]);

  const faqData = [
    {
      question: "Làm thế nào để cập nhật lịch làm việc?",
      answer: "Bạn có thể vào mục 'Lịch làm việc' trong sidebar, sau đó nhấn 'Chỉnh sửa' để cập nhật thời gian làm việc của mình. Hệ thống sẽ tự động đồng bộ với lịch hẹn của khách hàng."
    },
    {
      question: "Cách xử lý khi khách hàng không đến đúng giờ?",
      answer: "Khi khách hàng không đến đúng giờ, bạn có thể đánh dấu 'Vắng mặt' trong lịch hẹn. Hệ thống sẽ gửi thông báo cho khách hàng và cho phép đặt lại lịch hẹn."
    },
    {
      question: "Làm sao để trả lời câu hỏi từ khách hàng?",
      answer: "Vào mục 'Hỏi đáp' để xem danh sách câu hỏi. Nhấn vào câu hỏi để xem chi tiết và viết câu trả lời. Câu trả lời sẽ được gửi đến khách hàng ngay lập tức."
    },
    {
      question: "Cách xem đánh giá từ khách hàng?",
      answer: "Truy cập mục 'Đánh giá' để xem tất cả đánh giá từ khách hàng. Bạn có thể lọc theo thời gian, điểm số và phản hồi lại đánh giá nếu cần."
    },
    {
      question: "Làm thế nào để thay đổi thông tin cá nhân?",
      answer: "Vào mục 'Cài đặt' > 'Thông tin cá nhân' để cập nhật thông tin liên hệ, chuyên môn và các thông tin khác. Nhớ lưu lại sau khi thay đổi."
    },
    {
      question: "Cách sử dụng tính năng tư vấn trực tuyến?",
      answer: "Khi có cuộc gọi tư vấn, bạn sẽ nhận được thông báo. Nhấn 'Chấp nhận' để bắt đầu cuộc gọi. Đảm bảo microphone và camera hoạt động tốt trước khi bắt đầu."
    }
  ];

  const supportChannels = [
    {
      icon: <FaPhone />,
      title: "Đường dây nóng",
      contact: "1900 8484",
      description: "Hỗ trợ 24/7",
      color: "#10b981"
    },
    {
      icon: <FaEnvelope />,
      title: "Email hỗ trợ",
      contact: "support@healthcare.com",
      description: "Phản hồi trong 24h",
      color: "#3b82f6"
    },
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp",
      contact: "+84 123 456 789",
      description: "Chat trực tuyến",
      color: "#25d366"
    }
  ];

  const resources = [
    {
      icon: <FaFileAlt />,
      title: "Hướng dẫn sử dụng",
      description: "Tài liệu hướng dẫn chi tiết",
      link: "#"
    },
    {
      icon: <FaVideo />,
      title: "Video hướng dẫn",
      description: "Các video tutorial",
      link: "#"
    },
    {
      icon: <FaBook />,
      title: "Tài liệu y tế",
      description: "Cập nhật kiến thức y khoa",
      link: "#"
    }
  ];

  return (
    <>
      <style>{`
        html, body {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
          background-color: #f9fafb;
          color: #1f2937;
        }
        body {
          min-height: 100vh;
          min-width: 100vw;
          box-sizing: border-box;
        }
        #root {
          height: 100%;
        }
        .dashboard {
          display: flex;
          min-height: 100vh;
          min-width: 100vw;
          width: 100vw;
          background-color: #f9fafb;
        }
        .main {
          flex: 1;
          margin-left: 180px;
          padding: 40px 32px;
          background-color: #ffffff;
          overflow-x: hidden;
          min-height: 100vh;
        }
        .page-header {
          margin-bottom: 32px;
        }
        .page-title {
          font-size: 28px;
          font-weight: 700;
          color: #065f46;
          margin-bottom: 8px;
        }
        .page-subtitle {
          color: #6b7280;
          font-size: 16px;
        }
        .tab-container {
          margin-bottom: 32px;
        }
        .tab-buttons {
          display: flex;
          gap: 8px;
          border-bottom: 2px solid #e5e7eb;
          margin-bottom: 24px;
        }
        .tab-button {
          padding: 12px 24px;
          background: none;
          border: none;
          font-size: 16px;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
        }
        .tab-button.active {
          color: #065f46;
          border-bottom-color: #10b981;
        }
        .tab-button:hover {
          color: #065f46;
        }
        .tab-content {
          display: none;
        }
        .tab-content.active {
          display: block;
        }
        .faq-item {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          margin-bottom: 16px;
          overflow: hidden;
        }
        .faq-question {
          padding: 20px;
          background: #ffffff;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          color: #1f2937;
          transition: background-color 0.3s ease;
        }
        .faq-question:hover {
          background: #f3f4f6;
        }
        .faq-answer {
          padding: 0 20px;
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s ease;
          background: #f9fafb;
        }
        .faq-answer.active {
          padding: 20px;
          max-height: 200px;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }
        .contact-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .contact-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        .contact-icon {
          font-size: 32px;
          margin-bottom: 16px;
        }
        .contact-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #1f2937;
        }
        .contact-info {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .contact-description {
          color: #6b7280;
          font-size: 14px;
        }
        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        .resource-card {
          background: #f0fdf4;
          border: 1px solid #d1fae5;
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .resource-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .resource-icon {
          font-size: 24px;
          color: #10b981;
          margin-bottom: 12px;
        }
        .resource-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #065f46;
        }
        .resource-description {
          color: #6b7280;
          font-size: 14px;
        }
        .support-hours {
          background: #fef3c7;
          border: 1px solid #f59e0b;
          border-radius: 12px;
          padding: 20px;
          margin-top: 24px;
        }
        .support-hours h3 {
          color: #92400e;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .support-hours p {
          color: #92400e;
          margin: 4px 0;
        }
      `}</style>
      <div className="dashboard">
        {/* Sidebar */}
        <ConsultantSidebar consultantName={consultantName} />

        {/* Main content */}
        <main className="main">
          {/* Topbar */}
          <ConsultantTopbar notificationCount={notificationCount} consultantName={consultantName} />

          {/* Page Header */}
          <div className="page-header">
            <h1 className="page-title">Hỗ trợ & Trợ giúp</h1>
            <p className="page-subtitle">Tìm kiếm thông tin và liên hệ hỗ trợ khi cần thiết</p>
          </div>

          {/* Tab Navigation */}
          <div className="tab-container">
            <div className="tab-buttons">
              <button 
                className={`tab-button ${activeTab === 'faq' ? 'active' : ''}`}
                onClick={() => setActiveTab('faq')}
              >
                <FaQuestionCircle style={{ marginRight: '8px' }} />
                Câu hỏi thường gặp
              </button>
              <button 
                className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => setActiveTab('contact')}
              >
                <FaHeadphones style={{ marginRight: '8px' }} />
                Liên hệ hỗ trợ
              </button>
              <button 
                className={`tab-button ${activeTab === 'resources' ? 'active' : ''}`}
                onClick={() => setActiveTab('resources')}
              >
                <FaBook style={{ marginRight: '8px' }} />
                Tài liệu hướng dẫn
              </button>
            </div>

            {/* FAQ Tab */}
            <div className={`tab-content ${activeTab === 'faq' ? 'active' : ''}`}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#065f46' }}>
                  Câu hỏi thường gặp
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                  Tìm câu trả lời cho những câu hỏi phổ biến về việc sử dụng hệ thống
                </p>
              </div>
              
              {faqData.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>

            {/* Contact Tab */}
            <div className={`tab-content ${activeTab === 'contact' ? 'active' : ''}`}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#065f46' }}>
                  Liên hệ hỗ trợ
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                  Chọn kênh liên hệ phù hợp để được hỗ trợ nhanh chóng
                </p>
              </div>

              <div className="contact-grid">
                {supportChannels.map((channel, index) => (
                  <div key={index} className="contact-card">
                    <div className="contact-icon" style={{ color: channel.color }}>
                      {channel.icon}
                    </div>
                    <div className="contact-title">{channel.title}</div>
                    <div className="contact-info">{channel.contact}</div>
                    <div className="contact-description">{channel.description}</div>
                  </div>
                ))}
              </div>

              <div className="support-hours">
                <h3>
                  <FaClock />
                  Giờ làm việc hỗ trợ
                </h3>
                <p><strong>Thứ 2 - Thứ 6:</strong> 8:00 - 18:00</p>
                <p><strong>Thứ 7:</strong> 8:00 - 12:00</p>
                <p><strong>Chủ nhật:</strong> Nghỉ</p>
                <p><strong>Đường dây nóng:</strong> Hoạt động 24/7</p>
              </div>
            </div>

            {/* Resources Tab */}
            <div className={`tab-content ${activeTab === 'resources' ? 'active' : ''}`}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#065f46' }}>
                  Tài liệu hướng dẫn
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                  Truy cập các tài liệu hướng dẫn và video tutorial
                </p>
              </div>

              <div className="resources-grid">
                {resources.map((resource, index) => (
                  <div key={index} className="resource-card">
                    <div className="resource-icon">
                      {resource.icon}
                    </div>
                    <div className="resource-title">{resource.title}</div>
                    <div className="resource-description">{resource.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

// FAQ Item Component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        {question}
        <span style={{ fontSize: '18px', color: '#10b981' }}>
          {isOpen ? '−' : '+'}
        </span>
      </div>
      <div className={`faq-answer ${isOpen ? 'active' : ''}`}>
        {answer}
      </div>
    </div>
  );
};

export default ConsultantHoTro;
