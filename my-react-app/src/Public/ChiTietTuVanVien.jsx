import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import HeaderGuest from '../components/HeaderGuest';
import HeaderCustomer from '../components/HeaderCustomer';
import Footer from '../components/Footer';

const tuvanvien = [
  { id: 'K', name: 'GS. Trương Thanh K', image: 'https://i.postimg.cc/Y2QtdmMC/Tr-ng-Thanh.png', specialty: 'Trưởng khoa Sức khỏe sinh sản', experience: '12 năm', education: 'ĐH Y Dược TPHCM, 2005 – 2013' },
  { id: 'H', name: 'TS. Ngô Cẩm H', image: 'https://i.postimg.cc/SNQHcXK5/Ng-C-m.png', specialty: 'Tư vấn chuyên khoa sinh lý nữ', experience: '7 năm', education: 'ĐH Y khoa Phạm Ngọc Thạch, 2010 – 2018' },
  { id: 'N', name: 'ThS. Lý Ngọc N', image: 'https://i.postimg.cc/Dw6G1cmw/L-Ng-c.jpg', specialty: 'Tư vấn sức khỏe sinh sản', experience: '8 năm', education: 'ĐH Y Dược TPHCM, 2009 – 2017' },
  { id: 'T', name: 'CV. Nguyễn Thu T', image: 'https://i.postimg.cc/d3hrKmBp/Nguy-n-Thu.png', specialty: 'Tư vấn chuyên khoa sinh lý nữ', experience: '4 năm', education: 'ĐH Y Hà Nội, 2013 – 2021' },
  { id: 'F', name: 'TS. Trần Văn F', image: 'https://i.postimg.cc/KvmC0ZJv/Tr-n-V-n.jpg', specialty: 'Tư vấn sức khỏe sinh sản', experience: '5 năm', education: 'ĐH Y Dược Huế, 2012 – 2020' },
  { id: 'A', name: 'TS. Lý Minh A', image: 'https://i.postimg.cc/RZ5fjtnp/L-Minh.png', specialty: 'Tư vấn chuyên khoa sinh lý nam', experience: '8 năm', education: 'ĐH Y Dược TPHCM, 2009 – 2017' },
  { id: 'D', name: 'ThS. Nguyễn Minh D', image: 'https://i.postimg.cc/Kz4qs1Kw/Nguy-n-Minh.jpg', specialty: 'Tư vấn sinh lý vị thành niên', experience: '5 năm', education: 'ĐH Y Cần Thơ, 2012 – 2020' },
  { id: 'B', name: 'ThS. Lê Nhã B', image: 'https://i.postimg.cc/fWf637Mm/L-Nh.png', specialty: 'Tư vấn sinh lý nam', experience: '7 năm', education: 'ĐH Y Dược Huế, 2010 – 2018' },
  { id: 'M', name: 'ThS. Lâm Ánh M', image: 'https://i.postimg.cc/28zNTc00/L-m-nh.png', specialty: 'Tư vấn sinh lý nữ', experience: '5 năm', education: 'ĐH Y Dược TPHCM, 2012 – 2020' },
  { id: 'O', name: 'CV. Hoàng Phúc O', image: 'https://i.postimg.cc/7YcXbbJS/Ho-ng-Ph-c.png', specialty: 'Tư vấn sinh lý vị thành niên', experience: '7 năm', education: 'ĐH Y Phạm Ngọc Thạch, 2010 – 2018' },
  { id: 'V', name: 'CV. Đỗ Minh V', image: 'https://i.postimg.cc/XJJywcTq/Minh.png', specialty: 'Tư vấn sinh lý nữ', experience: '8 năm', education: 'ĐH Y Hà Nội, 2009 – 2017' },
  { id: 'L', name: 'TS. Võ Đăng L', image: 'https://i.postimg.cc/1Rvvhv9C/V-ng.png', specialty: 'Tư vấn chuyên khoa sinh lý nam', experience: '8 năm', education: 'ĐH Y Huế, 2009 – 2017' }
];

const Main = styled.main`
  max-width: 500px;
  margin: 120px auto 40px auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  padding: 32px 24px 24px 24px;
`;
const Avatar = styled.img`
  width: 180px;
  height: 180px;
  object-fit: contain;
  object-position: center;
  background: #e6f9f1;
  border-radius: 12px;
  margin: 0 auto 24px auto;
  display: block;
`;
const Name = styled.h2`
  text-align: center;
  color: #0f172a;
  font-size: 2rem;
  margin-bottom: 8px;
`;
const Info = styled.p`
  text-align: center;
  color: #374151;
  font-size: 1.1rem;
  margin-bottom: 8px;
`;
const BackLink = styled(RouterLink)`
  display: inline-block;
  color: #10b981;
  text-decoration: none;
  font-weight: 600;
  padding: 10px 20px;
  border: 2px solid #10b981;
  border-radius: 6px;
  margin: 24px auto 0 auto;
  transition: all 0.3s ease;
  &:hover {
    background-color: #10b981;
    color: white;
    text-decoration: none;
  }
`;
const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  background: #f9f9f9;
  border-radius: 10px;
  margin: 20px 0;
  h2 {
    color: #d32f2f;
    margin-bottom: 15px;
  }
  p {
    color: #666;
    margin-bottom: 20px;
  }
`;

const ChiTietTuVanVien = () => {
  const { id } = useParams();
  const [isCustomer, setIsCustomer] = useState(false);
  const advisor = tuvanvien.find(tv => tv.id === id);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    const role = localStorage.getItem('role');
    if (loggedIn !== 'true') {
      setIsCustomer(false);
    } else {
      setIsCustomer(role === 'customer');
    }
  }, []);

  if (!advisor) {
    return (
      <>
        {isCustomer ? <HeaderCustomer /> : <HeaderGuest />}
        <Main>
          <ErrorMessage>
            <h2>Không tìm thấy tư vấn viên</h2>
            <p>ID không hợp lệ hoặc chưa có thông tin chi tiết.</p>
            <BackLink to="/tu-van-vien">← Quay lại danh sách tư vấn viên</BackLink>
          </ErrorMessage>
        </Main>
        <Footer />
      </>
    );
  }

  return (
    <>
      {isCustomer ? <HeaderCustomer /> : <HeaderGuest />}
      <Main>
        <Avatar src={advisor.image} alt={advisor.name} />
        <Name>{advisor.name}</Name>
        <Info><strong>Chuyên môn:</strong> {advisor.specialty}</Info>
        <Info><strong>Kinh nghiệm:</strong> {advisor.experience}</Info>
        <Info><strong>Học vấn:</strong> {advisor.education}</Info>
        <BackLink to="/tu-van-vien">← Quay lại danh sách tư vấn viên</BackLink>
      </Main>
      <Footer />
    </>
  );
};

export default ChiTietTuVanVien; 