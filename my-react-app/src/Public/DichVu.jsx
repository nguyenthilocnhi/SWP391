import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HeaderGuest from '../components/HeaderGuest';
import HeaderCustomer from '../components/HeaderCustomer';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Container = styled.main`
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
  width: 99vw;
  margin: 0;
  padding: 2rem 0;
  margin-top: 100px;
`;

const SectionTitle = styled.h1`
  color:rgb(0, 166, 89);
  margin-bottom: 20px;
  text-align: center;
  font-size: 2rem;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.07);
  padding: 1rem;
`;

const FilterBar = styled.div`
  margin-bottom: 30px;
  padding: 24px 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 18px rgba(16, 185, 129, 0.08);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 18px 32px;
  border: 1.5px solid #e0e0e0;

  label {
    font-weight: 600;
    color: #10b981;
    font-size: 15px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  select, input[type="text"] {
    padding: 12px 18px;
    border-radius: 10px;
    border: 2px solid #e0e0e0;
    background-color: #f8f9fa;
    font-size: 15px;
    font-weight: 500;
    color: #222;
    min-width: 180px;
    box-shadow: 0 2px 6px rgba(16, 185, 129, 0.04);
    transition: border 0.2s, box-shadow 0.2s;
    outline: none;
  }

  select:focus, input[type="text"]:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 2px #10b98133;
  }

  select:hover, input[type="text"]:hover {
    border-color: #10b981;
  }

  input[type="text"]::placeholder {
    color: #aaa;
    font-style: italic;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
    padding: 16px 8px;
    select, input[type="text"] {
      min-width: 100px;
      width: 100%;
    }
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.07);
  margin-bottom: 1.5rem;

  th, td {
    border: 1px solid #e0e0e0;
    text-align: center;
    padding: 14px 10px;
    font-size: 15px;
    vertical-align: middle;
  }

  th {
    background: #10b981;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    border-bottom: 2px solid #10b981;
  }

  tbody tr:hover {
    background-color:rgb(217, 250, 239);
    cursor: pointer;
    transition: background 0.2s;
  }

  a.detail-link {
    color:rgb(0, 0, 0);
    font-weight: 600;
    text-decoration: none;
    border-radius: 6px;
    padding: 6px 12px;
    background:rgb(1, 227, 170);
    transition: background 0.2s, color 0.2s;
    display: inline-block;
  }
  a.detail-link:hover {
    background: #10b981;
    color: #fff;
  }

  @media (max-width: 900px) {
    th, td {
      font-size: 13px;
      padding: 10px 4px;
    }
  }
  @media (max-width: 600px) {
    th, td {
      font-size: 11px;
      padding: 6px 2px;
    }
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 10px;
  flex-wrap: wrap;
`;

const PaginationButton = styled.button`
  min-width: 40px;
  height: 40px;
  padding: 0;
  border: 2.5px solid #10b981;
  background: #fff;
  color: #10b981;
  border-radius: 10px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(16,185,129,0.10);
  transition: background 0.22s, color 0.22s, box-shadow 0.22s, border 0.22s, transform 0.18s;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover:not(:disabled) {
    background: #10b981;
    color: #fff;
    transform: translateY(-3px) scale(1.08);
    box-shadow: 0 6px 18px rgba(16,185,129,0.22);
    border-color: #fff;
    z-index: 2;
  }
  &:disabled {
    background: #10b981;
    color: #fff;
    cursor: default;
    transform: none;
    box-shadow: 0 2px 8px rgba(16,185,129,0.18);
    border-color: #fff;
    z-index: 3;
  }
  &.active {
    background: #10b981;
    color: #fff;
    border-color: #fff;
    box-shadow: 0 6px 18px rgba(16,185,129,0.22);
    z-index: 4;
  }
  @media (max-width: 600px) {
    min-width: 28px;
    height: 28px;
    font-size: 12px;
    border-radius: 7px;
  }
`;

// Spinner loading styled
const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 120px;
`;

const Spinner = () => (
  <SpinnerWrapper>
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="20" stroke="#10b981" strokeWidth="6" opacity="0.2" />
      <path d="M44 24c0-11.046-8.954-20-20-20" stroke="#10b981" strokeWidth="6" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0 24 24" to="360 24 24" dur="0.8s" repeatCount="indefinite" />
      </path>
    </svg>
  </SpinnerWrapper>
);

const DichVu = (props) => {
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterLoai, setFilterLoai] = useState('');
  const [loading, setLoading] = useState(false);

  const rowsPerPage = 10;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Không có token. Hãy đăng nhập lại.");
      // Trang này yêu cầu token để fetch dữ liệu
      return;
    }

    setLoading(true);

    const fetchWithToken = async (url) => {
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Lỗi ${res.status}: ${text}`);
      }
      return res.json();
    };

    Promise.all([
      fetchWithToken('https://api-gender2.purintech.id.vn/api/Service/test-services'),
      fetchWithToken('https://api-gender2.purintech.id.vn/api/Service/advise-services')
    ])
      .then(([testResponse, adviseResponse]) => {
        // Lấy mảng obj từ response, thêm loại dịch vụ
        const testServices = (testResponse?.obj || []).map(item => ({ ...item, type: 'Xét nghiệm' }));
        const adviseServices = (adviseResponse?.obj || []).map(item => ({ ...item, type: 'Tư vấn' }));

        // Map dữ liệu về format hiển thị
        const all = [...testServices, ...adviseServices].map(item => ({
          ma: item.id,
          ten: item.testName || item.consultationType || 'Không có tên',
          loai: item.type,
          mucdich: item.description,
          thoigian: item.duration,
          chiphi: item.price != null ? item.price.toLocaleString('vi-VN') + ' VNĐ' : 'N/A',
          tinhtrang: item.isAvailable ? 'Có' : 'Không có',
          an: !item.isAvailable,
          _raw: item
        }));

        setAllData(all);
        setLoading(false);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách dịch vụ:', error.message);
        setAllData([]);
        setLoading(false);
      });
  }, []);


  const getDetailUrl = (item) => {
    // Xác định role từ props hoặc localStorage
    let userType = props?.userType;
    if (!userType) {
        const savedRole = localStorage.getItem('role');
        userType = savedRole ? savedRole.toLowerCase() : 'guest';
    }

    const path = userType === 'customer' 
        ? `/customer/service/${item.ma}` 
        : `/service/${item.ma}`;
    
    return <Link className="detail-link" to={path} state={{ id: item._raw.id, loai: item.loai }}>Chi tiết</Link>;
  };

  // Nếu dữ liệu có trường an, chỉ hiển thị dịch vụ an: false
  const filteredData = allData.filter((item) => {
    if (typeof item.an !== 'undefined' && item.an) return false;
    const keyword = searchKeyword.toLowerCase();
    const matchesLoai = !filterLoai || item.loai.toLowerCase() === filterLoai.toLowerCase();
    const matchesKeyword =
      item.ten.toLowerCase().includes(keyword) ||
      item.mucdich.toLowerCase().includes(keyword) ||
      item.ma.toLowerCase().includes(keyword);
    return matchesLoai && matchesKeyword;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = filteredData.slice(start, end);

  const handlePageClick = (pageNum) => setCurrentPage(pageNum);

  const renderPagination = () => {
    const buttons = [];

    if (totalPages > 1) {
      buttons.push(
        <PaginationButton
          key="prev"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          title="Trang trước"
        >
          &laquo;
        </PaginationButton>
      );

      const maxVisiblePages = 5;
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      if (startPage > 1) {
        buttons.push(
          <PaginationButton key={1} onClick={() => handlePageClick(1)}>{1}</PaginationButton>
        );
        if (startPage > 2) {
          buttons.push(<span key="startEllipsis">...</span>);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <PaginationButton
            key={i}
            onClick={() => handlePageClick(i)}
            disabled={i === currentPage}
          >
            {i}
          </PaginationButton>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          buttons.push(<span key="endEllipsis">...</span>);
        }
        buttons.push(
          <PaginationButton key={totalPages} onClick={() => handlePageClick(totalPages)}>
            {totalPages}
          </PaginationButton>
        );
      }

      buttons.push(
        <PaginationButton
          key="next"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          title="Trang sau"
        >
          &raquo;
        </PaginationButton>
      );
    }

    return (
      <PaginationContainer>
        {buttons}
        {totalPages > 0 && (
          <div style={{ marginTop: '10px', textAlign: 'center', color: '#666', fontSize: '14px' }}>
            Trang {currentPage} của {totalPages} ({filteredData.length} dịch vụ)
          </div>
        )}
      </PaginationContainer>
    );
  };

  // Xác định role từ prop hoặc localStorage
  let userType = props?.userType;
  if (!userType) {
    const savedRole = localStorage.getItem('role');
    userType = savedRole ? savedRole.toLowerCase() : 'guest';
  }

  return (
    <>
      {userType === 'customer' ? <HeaderCustomer /> : <HeaderGuest />}
      <Container>
        <SectionTitle>Dịch vụ tại trung tâm An Giới</SectionTitle>
        <FilterBar>
          <label htmlFor="filterLoai">Lọc loại dịch vụ:</label>
          <select
            id="filterLoai"
            value={filterLoai}
            onChange={(e) => {
              setFilterLoai(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Tất cả</option>
            <option value="Tư vấn">Tư vấn</option>
            <option value="Xét nghiệm">Xét nghiệm</option>
          </select>
          <input
            type="text"
            id="searchInput"
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Tìm kiếm theo tên, mục đích hoặc mã dịch vụ..."
          />
        </FilterBar>
        <TableContainer>
          {loading ? (
            <Spinner />
          ) : (
            <StyledTable id="serviceTable">
              <thead>
                <tr>
                  <th>Mã dịch vụ</th>
                  <th>Loại</th>
                  <th>Tên dịch vụ</th>
                  <th>Mục đích</th>
                  <th>Thời gian</th>
                  <th>Chi phí</th>
                  <th>Tình trạng</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {pageData.map((item, index) => (
                  <tr key={item.ma}>
                    <td>{item.ma}</td>
                    <td>{item.loai}</td>
                    <td>{item.ten}</td>
                    <td>{item.mucdich}</td>
                    <td>{item.thoigian}</td>
                    <td>{item.chiphi}</td>
                    <td>{item.tinhtrang}</td>
                    <td>
                      {getDetailUrl(item)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          )}
        </TableContainer>
        {renderPagination()}
      </Container>
      <Footer />
    </>
  );
};

export default DichVu;
