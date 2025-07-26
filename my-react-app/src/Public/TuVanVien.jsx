import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HeaderGuest from '../components/HeaderGuest';
import HeaderCustomer from '../components/HeaderCustomer';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const tuvanvien = [
  {
    id: 'K', name: 'GS. Trương Thanh K', image: 'https://i.postimg.cc/Y2QtdmMC/Tr-ng-Thanh.png',
    specialty: 'Trưởng khoa Sức khỏe sinh sản', experience: '12 năm', education: 'ĐH Y Dược TPHCM, 2005 – 2013'
  },
  {
    id: 'H', name: 'TS. Ngô Cẩm H', image: 'https://i.postimg.cc/SNQHcXK5/Ng-C-m.png',
    specialty: 'Tư vấn chuyên khoa sinh lý nữ', experience: '7 năm', education: 'ĐH Y khoa Phạm Ngọc Thạch, 2010 – 2018'
  },
  {
    id: 'N', name: 'ThS. Lý Ngọc N', image: 'https://i.postimg.cc/Dw6G1cmw/L-Ng-c.jpg',
    specialty: 'Tư vấn sức khỏe sinh sản', experience: '8 năm', education: 'ĐH Y Dược TPHCM, 2009 – 2017'
  },
  {
    id: 'T', name: 'CV. Nguyễn Thu T', image: 'https://i.postimg.cc/d3hrKmBp/Nguy-n-Thu.png',
    specialty: 'Tư vấn chuyên khoa sinh lý nữ', experience: '4 năm', education: 'ĐH Y Hà Nội, 2013 – 2021'
  },
  {
    id: 'F', name: 'TS. Trần Văn F', image: 'https://i.postimg.cc/KvmC0ZJv/Tr-n-V-n.jpg',
    specialty: 'Tư vấn sức khỏe sinh sản', experience: '5 năm', education: 'ĐH Y Dược Huế, 2012 – 2020'
  },
  {
    id: 'A', name: 'TS. Lý Minh A', image: 'https://i.postimg.cc/RZ5fjtnp/L-Minh.png',
    specialty: 'Tư vấn chuyên khoa sinh lý nam', experience: '8 năm', education: 'ĐH Y Dược TPHCM, 2009 – 2017'
  },
  {
    id: 'D', name: 'ThS. Nguyễn Minh D', image: 'https://i.postimg.cc/Kz4qs1Kw/Nguy-n-Minh.jpg',
    specialty: 'Tư vấn sinh lý vị thành niên', experience: '5 năm', education: 'ĐH Y Cần Thơ, 2012 – 2020'
  },
  {
    id: 'B', name: 'ThS. Lê Nhã B', image: 'https://i.postimg.cc/fWf637Mm/L-Nh.png',
    specialty: 'Tư vấn sinh lý nam', experience: '7 năm', education: 'ĐH Y Dược Huế, 2010 – 2018'
  },
  {
    id: 'M', name: 'ThS. Lâm Ánh M', image: 'https://i.postimg.cc/28zNTc00/L-m-nh.png',
    specialty: 'Tư vấn sinh lý nữ', experience: '5 năm', education: 'ĐH Y Dược TPHCM, 2012 – 2020'
  },
  {
    id: 'O', name: 'CV. Hoàng Phúc O', image: 'https://i.postimg.cc/7YcXbbJS/Ho-ng-Ph-c.png',
    specialty: 'Tư vấn sinh lý vị thành niên', experience: '7 năm', education: 'ĐH Y Phạm Ngọc Thạch, 2010 – 2018'
  },
  {
    id: 'V', name: 'CV. Đỗ Minh V', image: 'https://i.postimg.cc/XJJywcTq/Minh.png',
    specialty: 'Tư vấn sinh lý nữ', experience: '8 năm', education: 'ĐH Y Hà Nội, 2009 – 2017'
  },
  {
    id: 'L', name: 'TS. Võ Đăng L', image: 'https://i.postimg.cc/1Rvvhv9C/V-ng.png',
    specialty: 'Tư vấn chuyên khoa sinh lý nam', experience: '8 năm', education: 'ĐH Y Huế, 2009 – 2017'
  }
];

// Styled-components reused from TrangChu
const Container = styled.main`
  width: 99vw;
  margin: 0;
  padding: 2rem 0;
  margin-top: 100px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: #0f172a;
  margin-bottom: 1.5rem;
`;

const AdvisorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const AdvisorCard = styled.a`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  padding: 24px 18px 18px 18px;
  display: block;
  text-align: center;
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover {
    box-shadow: 0 8px 24px rgba(16,185,129,0.18);
    transform: translateY(-4px) scale(1.03);
  }
  img {
    width: 170px;
    height: 170px;
    object-fit: contain;
    object-position: center;
    background: #e6f9f1;
    border-radius: 12px;
    margin: 0 auto 16px auto;
    display: block;
  }
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 4px;
  }
  p {
    color: #555;
    font-size: 0.97rem;
    margin-bottom: 2px;
  }
`;

const SearchInput = styled.input`
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  padding: 10px 22px;
  width: 320px;
  font-size: 1rem;
  margin-bottom: 32px;
  outline: none;
  transition: border 0.2s;
  &:focus {
    border: 1.5px solid #10b981;
  }
`;

function getUserType() {
  const loggedIn = localStorage.getItem('loggedIn');
  const role = (localStorage.getItem('role') || '').toLowerCase();
  if (loggedIn === 'true' && role === 'customer') return 'customer';
  return 'guest';
}

function TuVanVien(props) {
  const [searchTerm, setSearchTerm] = useState('');

  // Xác định userType dựa trên token
  let userType = props?.userType;
  if (!userType) {
    const token = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');
    if (token) {
      if (savedRole && savedRole.toLowerCase() === 'customer') userType = 'customer';
      else userType = 'customer'; // Mặc định customer nếu có token
    } else {
      userType = 'guest';
    }
  }

  const filteredAdvisors = tuvanvien.filter(advisor =>
    advisor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper render header
  const renderHeader = () => {
    const token = localStorage.getItem('token');
    if (token) return <HeaderCustomer />;
    return <HeaderGuest />;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {renderHeader()}
      <Container>
        <SectionTitle>ĐỘI NGŨ TƯ VẤN VIÊN</SectionTitle>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SearchInput
            type="text"
            placeholder="Tìm kiếm theo tên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <AdvisorsGrid>
          {filteredAdvisors.map(advisor => (
            <AdvisorCard
              key={advisor.id}
              as={Link}
              to={`/tu-van-vien/${advisor.id}`}
            >
              <img
                src={advisor.image}
                alt={advisor.name}
              />
              <h3>{advisor.name}</h3>
              <p>{advisor.specialty}</p>
              <p><strong>Kinh nghiệm:</strong> {advisor.experience}</p>
              <p>{advisor.education}</p>
            </AdvisorCard>
          ))}
        </AdvisorsGrid>
      </Container>
      <Footer />
    </div>
  );
}

export default TuVanVien;
