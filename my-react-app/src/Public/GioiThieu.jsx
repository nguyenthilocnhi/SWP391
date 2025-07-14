import React, { useEffect } from "react";
import styled from "styled-components";
import HeaderGuest from '../components/HeaderGuest';
import HeaderCustomer from '../components/HeaderCustomer';
import Footer from '../components/Footer';

const Container = styled.main`
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
  width: 99vw;
  margin: 0;
  padding: 2rem 0;
  margin-top: 20px;
`;

const Section = styled.section`
  padding: 40px 0;
  text-align: center;
`;

const IntroTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
  color: #00796b;
`;

const Paragraph = styled.p`
  font-size: 18px;
  margin-bottom: 30px;
  max-width: 1200px;
  margin-inline: auto;
`;

const Image = styled.img`
  width: 100%;
  max-width: 700px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Values = styled.section`
  background-color: #e0f2f1;
  padding: 40px 20px;
  border-radius: 10px;
  margin: 30px 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: #004d40;
  margin-bottom: 20px;
`;

const ValueList = styled.ul`
  max-width: 800px;
  margin: auto;
  list-style: disc inside;
  font-size: 17px;
  text-align: left;
`;

const VisionSection = styled.section`
  padding: 40px 0;
`;

const InfoBoxes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`;

const Box = styled.div`
  flex: 1 1 calc(25% - 20px);
  background: white;
  border: 2px solid #00796b;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
`;

const BoxTitle = styled.h3`
  color: #1a7738;
  margin-bottom: 10px;
  font-size: 18px;
`;

const CertificateSection = styled.section`
  margin-bottom: 60px;
`;

const CertificateGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 20px;
  justify-content: center;
`;

const Certificate = styled.div`
  width: 300px;
  background: #fff;
  border: 2px solid #00796b;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }

  p {
    margin-top: 10px;
    font-size: 14px;
    color: #333;
  }
`;

function GioiThieu({ userType }) {
  useEffect(() => {
    document.title = "Giới thiệu - Trung tâm An Giới";
  }, []);

  return (
    <>
      {userType === 'customer' ? <HeaderCustomer /> : <HeaderGuest />}
      <Container>
        <Section className="intro">
          <IntroTitle>Về Trung Tâm An Giới</IntroTitle>
          <Paragraph>
            An Giới là cơ sở y tế chuyên sâu trong lĩnh vực chăm sóc sức khỏe giới tính và sức khỏe sinh sản,
            với sứ mệnh nâng cao nhận thức, bảo vệ quyền lợi và cải thiện chất lượng sống cho mọi cá nhân – không phân biệt giới tính,
            độ tuổi hay khuynh hướng tình dục.
          </Paragraph>
          <Paragraph>
            Chúng tôi tin rằng sức khỏe giới tính không chỉ là vấn đề cá nhân, mà còn là nền tảng để xây dựng một xã hội công bằng,
            văn minh và khỏe mạnh. Với đội ngũ tư vấn viên, bác sĩ, chuyên gia giàu kinh nghiệm và tận tâm, An Giới tự hào mang đến
            cho cộng đồng những dịch vụ an toàn, khoa học và dễ tiếp cận.
          </Paragraph>
          <Image src="https://i.postimg.cc/6p0TfYvj/An-gi-i.jpg" alt="Trung tâm Y tế" />
        </Section>

        <Values>
          <SectionTitle>Giá trị cốt lõi</SectionTitle>
          <ValueList>
            <li><strong>Tận tâm:</strong> Phục vụ với cả trái tim, đặt lợi ích người bệnh lên hàng đầu.</li>
            <li><strong>Chất lượng:</strong> Cung cấp dịch vụ y tế theo tiêu chuẩn cao.</li>
            <li><strong>Minh bạch:</strong> Cam kết rõ ràng, minh bạch trong chi phí và quy trình.</li>
            <li><strong>Tiếp cận dễ dàng:</strong> Dịch vụ thuận tiện, hỗ trợ đa kênh.</li>
          </ValueList>
        </Values>

        <VisionSection className="vision">
          <SectionTitle>TẦM NHÌN & SỨ MỆNH</SectionTitle>
          <InfoBoxes>
            <Box>
              <BoxTitle>Tầm nhìn</BoxTitle>
              <p>Nơi mọi cá nhân cảm thấy an toàn, được thấu hiểu và tôn trọng.</p>
            </Box>
            <Box>
              <BoxTitle>Sứ mệnh</BoxTitle>
              <p>Nâng cao chất lượng sống thông qua dịch vụ y tế toàn diện, bảo mật và không kỳ thị.</p>
            </Box>
            <Box>
              <BoxTitle>30+ Chuyên gia</BoxTitle>
              <p>Đội ngũ bác sĩ, tư vấn viên và chuyên gia giàu kinh nghiệm.</p>
            </Box>
            <Box>
              <BoxTitle>20+ Dịch vụ</BoxTitle>
              <p>Từ tư vấn tâm lý đến xét nghiệm STIs và sức khỏe sinh sản.</p>
            </Box>
          </InfoBoxes>
        </VisionSection>

        <CertificateSection className="certificates">
          <SectionTitle>GIẤY CHỨNG NHẬN CỦA TRUNG TÂM</SectionTitle>
          <CertificateGallery>
            <Certificate>
              <img src="https://i.postimg.cc/QCbYbxG4/ch-ng-nh-n-ho-t-ng.png" alt="Giấy chứng nhận 1" />
              <p>Giấy phép hoạt động y tế do Bộ Y tế cấp</p>
            </Certificate>
            <Certificate>
              <img src="https://i.postimg.cc/Wp5RLjHm/ki-m-nh-ch-t-l-ng.png" alt="Giấy chứng nhận 2" />
              <p>Chứng nhận kiểm định chất lượng dịch vụ</p>
            </Certificate>
            <Certificate>
              <img src="https://i.postimg.cc/dVp6GNST/ng-k-doanh-nghi-p.png" alt="Giấy chứng nhận 3" />
              <p>Giấy chứng nhận đăng ký doanh nghiệp</p>
            </Certificate>
          </CertificateGallery>
        </CertificateSection>
      </Container>
      <Footer />
    </>
  );
}

export default GioiThieu;
