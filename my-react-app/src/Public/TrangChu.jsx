import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HeaderGuest from '../components/HeaderGuest';
import HeaderCustomer from '../components/HeaderCustomer';
import Footer from '../components/Footer';
import DangKy from "../Login/DangKy";

const Hero = styled.section`
  margin-top: 120px;
  width: 100vw;
  display: flex;
  justify-content: center;
  background: #fff;
  img {
    width: 100vw;
    height: auto;
    object-fit: cover;
    display: block;
    margin: 0 auto;
  }
`;

const Container = styled.main`
  width: 100vw;
  margin: 0;
  padding: 2rem 0;
`;

const StatisticSection = styled.section`
  padding: 40px 20px;
  display: flex;
  justify-content: center;
`;

const StatisticBox = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const StatItem = styled.div`
  background-color: #ffffff;
  padding: 20px 30px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
  }

  h3 {
    margin: 0;
    font-size: 22px;
    font-weight: bold;
    color: #1f2937;
  }

  p {
    margin: 4px 0 0;
    color: #555;
    font-size: 15px;
  }
`;

const Services = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  padding: 40px 20px;
  align-items: center;
  justify-content: space-between;
`;

const ServiceContent = styled.div`
  max-width: 400px;

  h2 {
    font-size: 28px;
    margin-bottom: 25px;
    color: #000;
  }

  .service-item {
    display: flex;
    margin-bottom: 20px;
    align-items: flex-start;

    img {
      width: 40px;
      height: 40px;
      margin-right: 15px;
    }

    h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #18c379;
    }

    p {
      margin: 4px 0 0;
      color: #333;
    }
  }
`;

const ServiceImage = styled.div`
  img {
    max-width: 480px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: #0f172a;
  margin-bottom: 1.5rem;
`;

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AccordionItem = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);

  &.active .accordion-content {
    max-height: 400px;
    padding-top: 12px;
  }
`;

const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  h4 {
    margin: 0;
    font-size: 1rem;
    color: #059669;
    flex: 1;
  }
`;

const ToggleButton = styled.button`
  background-color: #10b981;
  border: none;
  color: #fff;
  padding: 8px 14px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0f766e;
  }
`;

const AccordionContent = styled.div`
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding-top 0.3s ease;
  padding-left: 4px;

  ul {
    margin: 0;
    padding-left: 1.2rem;
  }
`;

const Testimonials = styled.section`
  text-align: center;
  margin: 3rem 0;

  blockquote {
    margin: 1rem auto;
    max-width: 800px;
    font-style: italic;
    color: #374151;
    border-left: 4px solid #10b981;
    padding-left: 1rem;
  }
`;

const FaqContainer = styled.section`
  max-width: 700px;
  margin: 60px auto;
  padding: 40px 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 28px;
    text-align: center;
    margin-bottom: 30px;

    .highlight {
      color: #10b981;
      font-weight: bold;
    }
  }

  details {
    margin-bottom: 20px;
    border-radius: 10px;
    padding: 0 20px;
    background-color: #fafafa;
    border: 1px solid #e0e0e0;
  }

  summary {
    padding: 16px 0;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    color: #10b981;
  }

  .faq-answer {
    padding: 0 0 16px;
    color: #555;
    font-size: 15px;
  }

  .more-question {
    font-size: 14px;
    color: #777;
    text-align: center;
    margin-top: 30px;

    a {
      color: #10b981;
      text-decoration: none;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default function TrangChu({ userType = 'guest' }) {
    // State cho accordion
    const [openIndexes, setOpenIndexes] = useState([]);
    const handleToggle = (idx) => {
        setOpenIndexes((prev) =>
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        );
    };

    return (
        <>
            {userType === 'customer' ? <HeaderCustomer /> : <HeaderGuest />}
            <Hero>
                <img src="https://i.postimg.cc/x1V5ncWS/nh-n-n.png" alt="Ảnh nền" />
            </Hero>

            <Container>
                <StatisticSection>
                    <StatisticBox>
                        <StatItem>
                            <img src="https://i.postimg.cc/vZkwh7jd/labs-100dp-1-F1-F1-F-FILL0-wght400-GRAD0-opsz48.png" alt="" />
                            <h3>5.000+</h3>
                            <p>Lượt xét nghiệm</p>
                        </StatItem>

                        <StatItem>
                            <img src="https://i.postimg.cc/8zFq7JCX/sentiment-satisfied-100dp-1-F1-F1-F-FILL0-wght400-GRAD0-opsz48.png" alt="" />
                            <h3>99.8%</h3>
                            <p>Mức độ hài lòng</p>
                        </StatItem>

                        <StatItem>
                            <img src="https://i.postimg.cc/8CvQ0JQf/support-agent-100dp-1-F1-F1-F-FILL0-wght400-GRAD0-opsz48.png" alt="" />
                            <h3>4.000+</h3>
                            <p>Lượt tư vấn</p>
                        </StatItem>

                        <StatItem>
                            <img src="https://i.postimg.cc/QtkLj2MX/groups-100dp-1-F1-F1-F-FILL0-wght400-GRAD0-opsz48.png" alt="" />
                            <h3>10.000+</h3>
                            <p>Số lượng khách hàng/năm</p>
                        </StatItem>
                    </StatisticBox>
                </StatisticSection>

                <Services>
                    <ServiceContent>
                        <h2>Dịch vụ y tế của AN GIỚI</h2>
                        <div className="service-item">
                            <img src="https://i.postimg.cc/vZkwh7jd/labs-100dp-1-F1-F1-F-FILL0-wght400-GRAD0-opsz48.png" alt="" />
                            <div>
                                <h3>Xét nghiệm</h3>
                                <p>Đa dạng danh mục xét nghiệm đảm bảo kết quả chính xác và nhanh chóng</p>
                            </div>
                        </div>
                        <div className="service-item">
                            <img src="https://i.postimg.cc/8CvQ0JQf/support-agent-100dp-1-F1-F1-F-FILL0-wght400-GRAD0-opsz48.png" alt="" />
                            <div>
                                <h3>Tư vấn</h3>
                                <p>Tư vấn cá nhân hóa đảm bảo sự riêng tư cho khách hàng</p>
                            </div>
                        </div>
                    </ServiceContent>
                    <ServiceImage>
                        <img src="https://i.postimg.cc/4yrDJXTF/Screenshot-2025-06-17-013039.png" alt="" />
                    </ServiceImage>
                </Services>

                <section className="offer-section">
                    <SectionTitle>Ưu đãi đặc biệt</SectionTitle>
                    <AccordionContainer>
                        {[
                            {
                                title: '🔥 Giảm 20% cho khách hàng đặt dịch vụ lần đầu',
                                content: (
                                    <ul>
                                        <li><strong>Thời gian:</strong> Khi có thay đổi khác</li>
                                        <li><strong>Đối tượng:</strong> Tất cả khách hàng lần đầu đặt dịch vụ</li>
                                        <li><strong>Áp dụng:</strong> Mọi dịch vụ đặt lần đầu qua hệ thống</li>
                                    </ul>
                                )
                            },
                            {
                                title: '🎁 Giảm 10% - Đặt lịch xét nghiệm Giang Mai',
                                content: (
                                    <ul>
                                        <li><strong>Thời gian:</strong> 01/07/2025 - 31/08/2025</li>
                                        <li><strong>Đối tượng:</strong> Tất cả khách hàng đặt lịch xét nghiệm Giang Mai</li>
                                        <li><strong>Dịch vụ:</strong> Xét nghiệm Giang Mai</li>
                                    </ul>
                                )
                            },
                            {
                                title: '💰 Giảm 100.000VND - Đặt lịch tư vấn',
                                content: (
                                    <ul>
                                        <li><strong>Thời gian:</strong> 01/07/2025 - 31/08/2025</li>
                                        <li><strong>Đối tượng:</strong> Tất cả khách hàng đặt lịch tư vấn</li>
                                        <li><strong>Dịch vụ:</strong> Tư vấn</li>
                                    </ul>
                                )
                            }
                        ].map((item, i) => (
                            <AccordionItem key={i} className={`accordion-item${openIndexes.includes(i) ? ' active' : ''}`}>
                                <AccordionHeader>
                                    <h4>{item.title}</h4>
                                    <ToggleButton
                                        className="toggle-btn"
                                        onClick={() => handleToggle(i)}
                                    >
                                        {openIndexes.includes(i) ? 'Thu gọn' : 'Xem ưu đãi'}
                                    </ToggleButton>
                                </AccordionHeader>
                                <AccordionContent className="accordion-content" style={{
                                  maxHeight: openIndexes.includes(i) ? '400px' : '0',
                                  paddingTop: openIndexes.includes(i) ? '12px' : '0',
                                  transition: 'max-height 0.4s ease, padding-top 0.3s ease',
                                  overflow: 'hidden'
                                }}>
                                  {item.content}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </AccordionContainer>
                </section>

                <Testimonials className="section testimonials">
                    <SectionTitle>Cảm nhận từ khách hàng</SectionTitle>
                    <blockquote>“Tôi rất hài lòng với dịch vụ và sự nhiệt tình của đội ngũ An Giới...” – Chị Phương</blockquote>
                    <blockquote>“Tư vấn cụ thể, khoa học. Tôi sẽ tiếp tục sử dụng.” – Anh Minh</blockquote>
                    <blockquote>“Đặt lịch nhanh chóng, nhân viên tư vấn tận tâm, tôi cảm thấy rất an tâm.” – Bạn Hồng Ngọc</blockquote>
                    <blockquote>“Không gian sạch sẽ, bảo mật thông tin tốt, tôi sẽ giới thiệu cho bạn bè.” – Anh Tuấn</blockquote>
                    <blockquote>“Ưu đãi hấp dẫn, dịch vụ chuyên nghiệp, tôi rất hài lòng.” – Chị Lan”</blockquote>
                </Testimonials>
            </Container>

            <FaqContainer>
                <h2><span className="highlight">Câu Hỏi</span> Thường Gặp?</h2>
                <details>
                    <summary>Dịch vụ tại An Giới?</summary>
                    <div className="faq-answer">Xét nghiệm STIs, tư vấn giới tính.</div>
                </details>
                <details>
                    <summary>An Giới có làm việc cuối tuần không?</summary>
                    <div className="faq-answer">7h-17h. Lễ nghỉ theo thông báo.</div>
                </details>
                <details>
                    <summary>Xem kết quả xét nghiệm ở đâu?</summary>
                    <div className="faq-answer">Vào mục "Kết quả xét nghiệm" trong hệ thống.</div>
                </details>
                <p className="more-question">
                    Xem thêm <Link to="/customer/cau-hoi-thuong-gap">tại đây</Link>
                </p>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <Link to="/admin/trangchu">
                    <button style={{
                      background: '#10b981',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px 28px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}>
                      Gửi câu hỏi mới
                    </button>
                  </Link>
                </div>
            </FaqContainer>

            <Footer />
        </>
    );
}
