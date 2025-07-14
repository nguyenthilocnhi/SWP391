import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/adminLayout';
import styled from 'styled-components';
import { FaSearch, FaTrash, FaEye } from 'react-icons/fa';

const MainContent = styled.main`
  padding: 120px 0 24px 215px;
  background: #f9fafb;
  min-height: 100vh;
  width: 144vw;
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
  max-width: 1230px;
  margin: 0 54px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 8px;
  @media (max-width: 1200px) {
    max-width: 100vw;
    padding: 0 4px;
  }
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
const SearchBox = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  width: 220px;
`;
const FilterSelect = styled.select`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  background-color: #f9fafb;
  color: #374151;
  margin-left: 12px;
`;
const TableContainer = styled.div`
  overflow-x: auto;
`;
const ReviewTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const ReviewTh = styled.th`
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  border-bottom: 1px solid #e5e7eb;
`;
const ReviewTd = styled.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: top;
`;
const Button = styled.button`
  padding: 8px 14px;
  font-size: 15px;
  border-radius: 8px;
  border: none;
  background-color: #4ade80;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  margin-right: 8px;
  margin-bottom: 4px;
  transition: background 0.2s, color 0.2s;
  outline: none;
  &:hover {
    background-color: #059669;
    color: #fff;
  }
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 16px;
`;
const ModalContent = styled.div`
  background: #ffffff;
  padding: 32px 28px;
  border-radius: 18px;
  width: 100%;
  max-width: 420px;
  max-height: 520px;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(79,70,229,0.18), 0 1.5px 6px rgba(0,0,0,0.08);
`;
const ModalTitle = styled.h3`
  margin-top: 0;
  font-size: 18px;
  margin-bottom: 16px;
  color: #111827;
  text-align: center;
`;
const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
`;
const ErrorMsg = styled.div`
  color: #ef4444;
  font-size: 15px;
  margin-bottom: 12px;
  text-align: center;
  font-weight: 500;
`;
const Star = styled.span`
  color: #fbbf24;
  font-size: 18px;
  margin-right: 2px;
`;

const TABS = [
  // { key: 'dichvu', label: 'Đánh giá dịch vụ', storage: 'danhGiaDichVu' },
  { key: 'nhanvien', label: 'Đánh giá nhân viên', storage: 'danhGiaNhanVien' },
  { key: 'tuvanvien', label: 'Đánh giá tư vấn viên', storage: 'danhGiaTuVanVien' },
];

// Dữ liệu mẫu cho nhân viên và tư vấn viên
const SAMPLE_NHANVIEN = [
  { tenNhanVien: 'Nguyễn Văn A', soSao: 5, noiDung: 'Rất nhiệt tình, chuyên nghiệp.', thoiGian: '2024-05-30 14:22:00' },
  { tenNhanVien: 'Trần Thị B', soSao: 4, noiDung: 'Phục vụ tốt, thân thiện.', thoiGian: '2024-05-29 10:10:00' },
];
const SAMPLE_TUVANVIEN = [
  { tenTuVanVien: 'BS. Lê Thị C', soSao: 5, noiDung: 'Tư vấn tận tâm, dễ hiểu.', thoiGian: '2024-05-28 09:00:00' },
  { tenTuVanVien: 'BS. Phạm Văn D', soSao: 3, noiDung: 'Cần cải thiện thái độ.', thoiGian: '2024-05-27 16:30:00' },
];

const ROWS_PER_PAGE = 10;

const AdminDanhGia = () => {
  const [tab, setTab] = useState('nhanvien'); // Default to nhanvien
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStar, setFilterStar] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalReview, setModalReview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Load dữ liệu theo tab
  useEffect(() => {
    let data = [];
    // if (tab === 'dichvu') {
    //   data = JSON.parse(localStorage.getItem('danhGiaDichVu')) || [];
    // } else 
    if (tab === 'nhanvien') {
      data = JSON.parse(localStorage.getItem('danhGiaNhanVien'));
      if (!data) {
        data = SAMPLE_NHANVIEN;
        localStorage.setItem('danhGiaNhanVien', JSON.stringify(data));
      }
    } else if (tab === 'tuvanvien') {
      data = JSON.parse(localStorage.getItem('danhGiaTuVanVien'));
      if (!data) {
        data = SAMPLE_TUVANVIEN;
        localStorage.setItem('danhGiaTuVanVien', JSON.stringify(data));
      }
    }
    setReviews(data);
    setCurrentPage(1);
    setSearch('');
    setFilterStar('');
  }, [tab]);

  // Lọc đánh giá
  const filteredReviews = reviews.filter(r => {
    let matchSearch = true;
    // if (tab === 'dichvu') {
    //   matchSearch = r.tenDichVu?.toLowerCase().includes(search.toLowerCase()) || r.noiDung?.toLowerCase().includes(search.toLowerCase());
    // } else 
    if (tab === 'nhanvien') {
      matchSearch = r.tenNhanVien?.toLowerCase().includes(search.toLowerCase()) || r.noiDung?.toLowerCase().includes(search.toLowerCase());
    } else if (tab === 'tuvanvien') {
      matchSearch = r.tenTuVanVien?.toLowerCase().includes(search.toLowerCase()) || r.noiDung?.toLowerCase().includes(search.toLowerCase());
    }
    const matchStar = filterStar ? r.soSao === Number(filterStar) : true;
    return matchSearch && matchStar;
  });

  // Phân trang
  const totalPages = Math.ceil(filteredReviews.length / ROWS_PER_PAGE);
  const pageData = filteredReviews.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);

  const handleDelete = idx => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) return;
    const updated = [...reviews];
    const realIdx = reviews.indexOf(pageData[idx]);
    updated.splice(realIdx, 1);
    setReviews(updated);
    // Lưu lại vào localStorage đúng key
    const tabObj = TABS.find(t => t.key === tab);
    if (tabObj) localStorage.setItem(tabObj.storage, JSON.stringify(updated));
  };

  const handleView = idx => {
    setModalReview(pageData[idx]);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalReview(null);
  };
  const renderStars = n => Array.from({ length: n }, (_, i) => <Star key={i}>★</Star>);

  return (
    <>
      <AdminLayout />
      <MainContent>
        <ContentWrapper>
          <Card>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
              {TABS.map(t => (
                <Button
                  key={t.key}
                  style={{ background: tab === t.key ? '#4ade80' : '#e5e7eb', color: tab === t.key ? '#fff' : '#374151', minWidth: 160 }}
                  onClick={() => setTab(t.key)}
                >{t.label}</Button>
              ))}
            </div>
            <CardHeader>
              <CardTitle>
                {/* {tab === 'dichvu' && 'Quản lý đánh giá dịch vụ'} */}
                {tab === 'nhanvien' && 'Quản lý đánh giá nhân viên'}
                {tab === 'tuvanvien' && 'Quản lý đánh giá tư vấn viên'}
              </CardTitle>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <SearchBox
                  type="text"
                  placeholder={tab === 'nhanvien' ? 'Tìm theo tên nhân viên, nội dung...' : 'Tìm theo tên tư vấn viên, nội dung...'}
                  value={search}
                  onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                />
                <FilterSelect value={filterStar} onChange={e => { setFilterStar(e.target.value); setCurrentPage(1); }}>
                  <option value="">Tất cả sao</option>
                  <option value="5">5 sao</option>
                  <option value="4">4 sao</option>
                  <option value="3">3 sao</option>
                  <option value="2">2 sao</option>
                  <option value="1">1 sao</option>
                </FilterSelect>
              </div>
            </CardHeader>
            <TableContainer>
              <ReviewTable>
                <thead>
                  <tr>
                    <ReviewTh>STT</ReviewTh>
                    {/* <ReviewTh>
                      {tab === 'dichvu' && 'Tên dịch vụ'}
                    </ReviewTh> */}
                    <ReviewTh>
                      {tab === 'nhanvien' && 'Tên nhân viên'}
                      {tab === 'tuvanvien' && 'Tên tư vấn viên'}
                    </ReviewTh>
                    <ReviewTh>Số sao</ReviewTh>
                    <ReviewTh>Nội dung</ReviewTh>
                    <ReviewTh>Thời gian</ReviewTh>
                    <ReviewTh>Thao tác</ReviewTh>
                  </tr>
                </thead>
                <tbody>
                  {pageData.length === 0 ? (
                    <tr><ReviewTd colSpan={6} style={{ textAlign: 'center' }}>Không có đánh giá phù hợp.</ReviewTd></tr>
                  ) : (
                    pageData.map((item, idx) => (
                      <tr key={idx}>
                        <ReviewTd>{(currentPage - 1) * ROWS_PER_PAGE + idx + 1}</ReviewTd>
                        {/* <ReviewTd>
                          {tab === 'dichvu' && item.tenDichVu}
                        </ReviewTd> */}
                        <ReviewTd>
                          {tab === 'nhanvien' && item.tenNhanVien}
                          {tab === 'tuvanvien' && item.tenTuVanVien}
                        </ReviewTd>
                        <ReviewTd>{renderStars(item.soSao)}</ReviewTd>
                        <ReviewTd style={{ maxWidth: 220, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.noiDung}</ReviewTd>
                        <ReviewTd>{item.thoiGian}</ReviewTd>
                        <ReviewTd>
                          <Button style={{ background: '#3b82f6', color: '#fff', marginRight: 6 }} onClick={() => handleView(idx)} title="Xem chi tiết"><FaEye /></Button>
                          <Button style={{ background: '#ef4444', color: '#fff' }} onClick={() => handleDelete(idx)} title="Xóa"><FaTrash /></Button>
                        </ReviewTd>
                      </tr>
                    ))
                  )}
                </tbody>
              </ReviewTable>
            </TableContainer>
            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18, gap: 6 }}>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    style={{ background: currentPage === i + 1 ? '#4ade80' : '#e5e7eb', color: currentPage === i + 1 ? '#fff' : '#374151', minWidth: 36, padding: '8px 0' }}
                    onClick={() => setCurrentPage(i + 1)}
                  >{i + 1}</Button>
                ))}
              </div>
            )}
          </Card>
        </ContentWrapper>
      </MainContent>
      {/* Modal xem chi tiết đánh giá */}
      {modalOpen && modalReview && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Chi tiết đánh giá</ModalTitle>
            <div style={{ marginBottom: 18 }}>
              {/* {tab === 'dichvu' && (<><b>Dịch vụ:</b> {modalReview.tenDichVu}<br /></>)} */}
              {tab === 'nhanvien' && (<><b>Nhân viên:</b> {modalReview.tenNhanVien}<br /></>)}
              {tab === 'tuvanvien' && (<><b>Tư vấn viên:</b> {modalReview.tenTuVanVien}<br /></>)}
              <b>Số sao:</b> {renderStars(modalReview.soSao)}<br />
              <b>Thời gian:</b> {modalReview.thoiGian}<br />
              <b>Nội dung:</b>
              <div style={{ marginTop: 8, color: '#374151', whiteSpace: 'pre-line' }}>{modalReview.noiDung}</div>
            </div>
            <ModalActions>
              <Button type="button" style={{ background: '#e5e7eb', color: '#374151' }} onClick={closeModal}>Đóng</Button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default AdminDanhGia;
