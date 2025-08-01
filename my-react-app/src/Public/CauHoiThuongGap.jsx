import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HeaderGuest from '../components/HeaderGuest';
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
  margin-top: 20px;
`;

const FaqSection = styled.section`
  max-width: 1200px;
  margin: 120px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 28px;
    text-align: center;
    margin-bottom: 30px;
    margin-top: 30px;

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
    transition: all 0.3s ease;
  }

  summary {
    padding: 16px 0;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    list-style: none;
    color: #10b981;
    position: relative;

    &::marker {
      display: none;
    }

    &::after {
      content: "▾";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      transition: transform 0.3s ease;
      color: #10b981;
    }
  }

  details[open] summary::after {
    transform: translateY(-50%) rotate(180deg);
  }

  .faq-answer {
    padding: 0 0 16px;
    color: #555;
    font-size: 15px;
    line-height: 1.6;
  }
`;

const CauHoiThuongGap = () => {
  const [role, setRole] = useState('guest');

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (savedRole) setRole(savedRole.toLowerCase());
  }, []);

  return (
    <Container>
      {role === 'customer' ? <HeaderCustomer /> : <HeaderGuest />}

      <FaqSection>
        <h2>
          <span className="highlight">Câu Hỏi</span> Thường Gặp?
        </h2>

        <details>
          <summary>Có những dịch vụ nào tại An Giới</summary>
          <div className="faq-answer">
            Tại An Giới bạn có thể sử dụng dịch vụ xét nghiệm STIs và dịch vụ tư vấn sức khỏe giới tính.
          </div>
        </details>

        <details>
          <summary>An Giới có làm việc vào cuối tuần/ngày lễ</summary>
          <div className="faq-answer">
            Giờ hoạt động của An Giới là từ 7:00 sáng đến 17:00 chiều. Đối với ngày lễ An Giới sẽ có thông báo cụ thể.
          </div>
        </details>

        <details>
          <summary>Làm sao để xem được kết quả xét nghiệm</summary>
          <div className="faq-answer">
            KKết quả xét nghiệm sẽ tùy thuộc vào dịch vụ xét nghiệm của bạn, bạn có thể kiểm tra tại "Kết quả xét nghiệm" trên hệ thống.
          </div>
        </details>

        <details>
          <summary>Trung tâm xét nghiệm những bệnh lây qua đường tình dục nào?</summary>
          <div className="faq-answer">
            1. HIV<br />
            2. Giang mai (Syphilis)<br />
            3. Lậu (Gonorrhea)<br />
            4. Chlamydia<br />
            5. Viêm gan B và C<br />
            6. Herpes sinh dục (HSV-1, HSV-2)<br />
            7. HPV<br />
            8. Nấm Candida, Trùng roi Trichomonas, Vi khuẩn Gardnerella<br />
            9. Vi sinh đường sinh dục tổng quát
          </div>
        </details>

        <details>
          <summary>Tôi có cần mang theo giấy tờ gì khi đến xét nghiệm?</summary>
          <div className="faq-answer">
            Không cần. Bạn chỉ cần xác minh thông tin đặt lịch với nhân viên tại trung tâm.
          </div>
        </details>

        <details>
          <summary>Bao lâu sau quan hệ không an toàn thì nên đi xét nghiệm?</summary>
          <div className="faq-answer">
            Tùy từng loại bệnh, nhưng thường từ 2 tuần đến 3 tháng. Trung tâm sẽ tư vấn thời điểm xét nghiệm phù hợp nhất.
          </div>
        </details>

        <details>
          <summary>Tôi chưa đủ 18 tuổi, có được khám sức khỏe tình dục riêng không?</summary>
          <div className="faq-answer">
            Có. Trung tâm hỗ trợ tư vấn và khám riêng tư cho vị thành niên, theo đúng quy định pháp luật.
          </div>
        </details>

        <details>
          <summary>Chi phí khám và xét nghiệm tại trung tâm là bao nhiêu?</summary>
          <div className="faq-answer">
            Mức phí linh hoạt theo từng dịch vụ. Trung tâm có bảng giá rõ ràng tại mục "Dịch vụ".
          </div>
        </details>

        <details>
          <summary>Có thể hẹn tư vấn riêng mà không cần xét nghiệm không?</summary>
          <div className="faq-answer">
            Có. Bạn chỉ cần đặt lịch tư vấn tại "Đặt dịch vụ".
          </div>
        </details>

        <details>
          <summary>Trung tâm có giải thích rõ ý nghĩa kết quả xét nghiệm cho tôi không?</summary>
          <div className="faq-answer">
            Có. Kết quả sẽ được ghi rõ ràng kèm theo lời khuyên của bác sĩ thực hiện xét nghiệm.
          </div>
        </details>
      </FaqSection>

      <Footer />
    </Container>
  );
};

export default CauHoiThuongGap;
