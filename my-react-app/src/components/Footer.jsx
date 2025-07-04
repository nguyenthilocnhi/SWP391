import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  margin-top: 4rem;
  padding: 2rem;
  background-color: #f3f4f6;
  color: #374151;
  font-family: 'Inter', sans-serif;
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const FooterLogo = styled.div`
  img {
    height: 70px;
    width: 142px;
  }
`;

const FooterHotline = styled.div`
  text-align: right;

  span {
    display: block;
  }

  strong {
    font-size: 1.25rem;
    color: #10b981;
  }
`;

const FooterInfo = styled.div`
  margin-top: 1rem;
  font-size: 0.875rem;

  p {
    margin-bottom: 0.5rem;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper className="custom-footer">
      <FooterTop className="footer-top">
        <FooterLogo className="footer-logo">
          <img
            src="https://i.postimg.cc/Y2F9c0k7/logo-footer.png"
            alt="Logo An Giới"
          />
        </FooterLogo>
        <FooterHotline className="footer-hotline">
          <span>HOTLINE</span>
          <strong>1900 8484</strong>
        </FooterHotline>
      </FooterTop>
      <hr />
      <FooterInfo className="footer-info">
        <p>
          <strong>Địa chỉ:</strong><br />
          Trung tâm Xét nghiệm và Chăm sóc sức khỏe giới tính – An Giới Gender
          Health<br />
          123 - 125 Đồng Văn Cống, Phường Thạnh Mỹ Lợi, Thành phố Thủ Đức,
          TP.HCM, Việt Nam
        </p>
        <p>
          &#169; 2025 Công Ty TNHH An Giới Health – ĐKKD 0315907012 do Sở KH&ĐT
          TP.HCM cấp ngày 23/05/2025
        </p>
      </FooterInfo>
    </FooterWrapper>
  );
};

export default Footer;
