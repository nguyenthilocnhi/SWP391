import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StaffSidebar from '../components/staffSidebar';
import StaffHeader from '../components/staffHeader';

const Container = styled.div`
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
  width: 99vw;
  min-height: 100vh;
  margin: 0;
  padding: 4rem 0;
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
const Section = styled.section`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  padding: 24px;
  margin-top: 16px;
`;
const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;
const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #09a370;
  margin-bottom: 0;
`;
const SearchInput = styled.input`
  padding: 8px 14px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
  background: #f9f9f9;
  color: #333;
  width: 220px;
`;
const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
  background: #f9f9f9;
  color: #333;
  margin-left: 12px;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
`;
const Thead = styled.thead``;
const Th = styled.th`
  background: #09a370;
  color: #fff;
  font-weight: 600;
  padding: 14px 10px;
  text-align: center;
`;
const Td = styled.td`
  padding: 12px 10px;
  text-align: center;
  vertical-align: middle;
  border-bottom: 1px solid #f0f0f0;
  max-width: 200px;
  word-wrap: break-word;
`;
const Tr = styled.tr``;
const ActionBtn = styled.button`
  background: #09a370;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 6px 12px;
  margin: 0 2px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #0d8a5f;
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;
const StatusTag = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.98em;
  font-weight: 500;
  background: ${props => props.status === 'Đã xử lý' ? '#d1fae5' : '#fef3c7'};
  color: ${props => props.status === 'Đã xử lý' ? '#065f46' : '#92400e'};
`;
const RatingStars = styled.span`
  color: #f59e42;
  font-size: 1.1em;
`;
const SummaryBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #fff;
  border-radius: 14px;
  padding: 28px 32px 18px 32px;
  margin-bottom: 32px;
  box-shadow: 0 2px 12px rgba(16,185,129,0.10);
  min-width: 320px;
`;
const SummaryTop = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  margin-bottom: 18px;
  flex-wrap: wrap;
`;
const AvgRating = styled.div`
  font-size: 2.6rem;
  font-weight: bold;
  color: #f59e42;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const AvgStars = styled.span`
  font-size: 2.1rem;
  color: #f59e42;
`;
const TotalReviews = styled.div`
  font-size: 1.15rem;
  color: #065f46;
  font-weight: 500;
`;
const StarBreakdown = styled.div`
  width: 100%;
  margin-top: 8px;
`;
const StarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
`;
const StarLabel = styled.span`
  width: 38px;
  color: #f59e42;
  font-weight: 500;
  font-size: 1.1rem;
`;
const StarBarBg = styled.div`
  background: #e0e7ef;
  border-radius: 8px;
  width: 120px;
  height: 12px;
  position: relative;
`;
const StarBar = styled.div`
  background: #f59e42;
  border-radius: 8px;
  height: 12px;
  position: absolute;
  left: 0;
  top: 0;
`;
const StarCount = styled.span`
  min-width: 24px;
  text-align: right;
  color: #065f46;
  font-weight: 500;
  font-size: 1.05rem;
`;

const CheckBtn = styled.button`
  background: #22c55e;
  color: #fff;
  border: none;
  border-radius: 8px;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px rgba(34,197,94,0.10);
  cursor: pointer;
  transition: background 0.18s;
  &:hover, &:focus {
    background: #16a34a;
    outline: none;
  }
`;

const ModalOverlay = styled.div`
  display: ${props => (props.open ? 'flex' : 'none')};
  position: fixed;
  z-index: 2000;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.3);
  justify-content: center;
  align-items: center;
`;
const ModalContent = styled.div`
  background: #fff;
  padding: 32px 24px 24px 24px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  position: relative;
`;
const CloseBtn = styled.span`
  position: absolute;
  top: 12px;
  right: 18px;
  font-size: 1.5rem;
  color: #888;
  cursor: pointer;
  transition: color 0.2s;
  &:hover { color: #09a370; }
`;
const ModalLabel = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 6px;
  color: #222;
`;
const ModalTextarea = styled.textarea`
  width: 95%;
  min-height: 80px;
  padding: 8px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
  background: #f9f9f9;
  color: #333;
  margin-bottom: 16px;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: #09a370;
`;

const ErrorMessage = styled.div`
  background: #fee2e2;
  color: #dc2626;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  text-align: center;
`;

function StaffDanhGia() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIdx, setModalIdx] = useState(null);
  const [response, setResponse] = useState('');

  // Fetch feedback data from API
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://api-gender2.purintech.id.vn/api/Feedback');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.code === 200 && result.obj) {
          // Transform API data to match our component structure
          const transformedData = result.obj.map(feedback => ({
            id: feedback.id,
            customer: feedback.customerName || 'Khách hàng',
            service: 'Dịch vụ xét nghiệm', // Default service name
            rating: feedback.point || 5,
            comment: feedback.comment || 'Không có bình luận',
            date: feedback.createdAt ? new Date(feedback.createdAt).toLocaleDateString('vi-VN') : new Date().toLocaleDateString('vi-VN'),
            status: feedback.isProcessed ? 'Đã xử lý' : 'Chưa xử lý',
            staffResponse: null, // API doesn't provide staff response yet
            appointmentId: feedback.appointmentId
          }));
          
          setReviews(transformedData);
        } else {
          throw new Error(result.message || 'Không thể tải dữ liệu đánh giá');
        }
      } catch (err) {
        console.error('Error fetching feedback:', err);
        setError('Không thể tải dữ liệu đánh giá. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const filtered = reviews.filter(r =>
    (filter === 'all' || r.rating === Number(filter)) &&
    (r.customer.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase()) ||
      (r.appointmentId && r.appointmentId.toString().includes(search)))
  );

  // Summary calculations (use filtered data)
  const total = filtered.length;
  const avg = total ? (filtered.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1) : 0;
  const starCounts = [1,2,3,4,5].map(star => filtered.filter(r => r.rating === star).length);
  const maxStarCount = Math.max(...starCounts, 1);

  const handleMarkHandled = async (idx) => {
    const feedback = reviews[idx];
    try {
      // Here you would typically make an API call to mark the feedback as processed
      // For now, we'll just update the local state
      setReviews(arr => arr.map((r, i) => i === idx ? { ...r, status: 'Đã xử lý' } : r));
      
      // Example API call (uncomment when backend is ready):
      // const response = await fetch(`https://api-gender2.purintech.id.vn/api/Feedback/${feedback.id}/process`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ isProcessed: true })
      // });
      // if (!response.ok) throw new Error('Failed to update status');
      
    } catch (error) {
      console.error('Error marking feedback as handled:', error);
      // Revert the change if API call fails
      setReviews(arr => arr.map((r, i) => i === idx ? { ...r, status: 'Chưa xử lý' } : r));
    }
  };

  const handleOpenModal = idx => {
    setModalIdx(idx);
    setResponse(reviews[idx].staffResponse || '');
    setModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
    setModalIdx(null);
    setResponse('');
  };
  
  const handleSubmitResponse = async (e) => {
    e.preventDefault();
    if (response.length === 0 || response.length > 150) return;
    
    const feedback = reviews[modalIdx];
    try {
      // Here you would typically make an API call to save the staff response
      // For now, we'll just update the local state
      setReviews(arr => arr.map((r, i) => i === modalIdx ? { ...r, status: 'Đã xử lý', staffResponse: response } : r));
      
      // Example API call (uncomment when backend is ready):
      // const apiResponse = await fetch(`https://api-gender2.purintech.id.vn/api/Feedback/${feedback.id}/respond`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ 
      //     isProcessed: true,
      //     staffResponse: response 
      //   })
      // });
      // if (!apiResponse.ok) throw new Error('Failed to save response');
      
      handleCloseModal();
    } catch (error) {
      console.error('Error saving staff response:', error);
      // You might want to show an error message to the user here
    }
  };

  if (loading) {
    return (
      <Container>
        <StaffSidebar />
        <ContentArea>
          <StaffHeader />
          <Section>
            <LoadingSpinner>Đang tải dữ liệu đánh giá...</LoadingSpinner>
          </Section>
        </ContentArea>
      </Container>
    );
  }

  return (
    <Container>
      <StaffSidebar />
      <ContentArea>
        <StaffHeader />
        <Section>
          <SectionHeader>
            <SectionTitle>Đánh giá dịch vụ xét nghiệm</SectionTitle>
            <div style={{display:'flex',alignItems:'center'}}>
              <SearchInput
                placeholder="Tìm kiếm khách hàng, nội dung hoặc ID cuộc hẹn..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <FilterSelect value={filter} onChange={e => setFilter(e.target.value)}>
                <option value="all">Tất cả sao</option>
                <option value="5">5 ★</option>
                <option value="4">4 ★</option>
                <option value="3">3 ★</option>
                <option value="2">2 ★</option>
                <option value="1">1 ★</option>
              </FilterSelect>
            </div>
          </SectionHeader>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          {/* Redesigned Summary Box */}
          <SummaryBox>
            <SummaryTop>
              <AvgRating>
                {avg}
                <AvgStars>{'★'.repeat(Math.round(avg))}{'☆'.repeat(5-Math.round(avg))}</AvgStars>
              </AvgRating>
              <TotalReviews>Tổng số đánh giá: <b>{total}</b></TotalReviews>
            </SummaryTop>
            <StarBreakdown>
              {[5,4,3,2,1].map((star) => (
                <StarRow key={star}>
                  <StarLabel>{star}★</StarLabel>
                  <StarBarBg>
                    <StarBar style={{width: `${(starCounts[star-1]/maxStarCount)*100}%`}} />
                  </StarBarBg>
                  <StarCount>{starCounts[star-1]}</StarCount>
                </StarRow>
              ))}
            </StarBreakdown>
          </SummaryBox>
          
          {filtered.length === 0 ? (
            <div style={{textAlign: 'center', padding: '2rem', color: '#666'}}>
              {search || filter !== 'all' ? 'Không tìm thấy đánh giá nào phù hợp với bộ lọc.' : 'Chưa có đánh giá nào.'}
            </div>
          ) : (
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Khách hàng</Th>
                  <Th>Đánh giá</Th>
                  <Th>Bình luận</Th>
                  <Th>Ngày tạo</Th>
                  <Th>Trạng thái</Th>
                  <Th>Phản hồi NV</Th>
                  <Th>Hành động</Th>
                </Tr>
              </Thead>
              <tbody>
                {filtered.map((row, idx) => (
                  <Tr key={row.id || idx}>
                    <Td>#{row.appointmentId || row.id}</Td>
                    <Td>{row.customer}</Td>
                    <Td><RatingStars>{'★'.repeat(row.rating)}{'☆'.repeat(5-row.rating)}</RatingStars></Td>
                    <Td style={{maxWidth: '200px', wordWrap: 'break-word'}}>{row.comment}</Td>
                    <Td>{row.date}</Td>
                    <Td><StatusTag status={row.status}>{row.status}</StatusTag></Td>
                    <Td>{row.staffResponse || <span style={{color:'#aaa'}}>—</span>}</Td>
                    <Td>
                      {row.status !== 'Đã xử lý' && (
                        <>
                          <CheckBtn
                            title="Đánh dấu đã xử lý"
                            onClick={() => handleMarkHandled(idx)}
                          >
                            <i className="fas fa-check"></i>
                          </CheckBtn>
                          <ActionBtn onClick={() => handleOpenModal(idx)} style={{background:'#f59e42', color:'#fff', marginLeft: 8}}>Xử lý</ActionBtn>
                        </>
                      )}
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          )}
          
          {/* Modal for staff response */}
          <ModalOverlay open={modalOpen}>
            <ModalContent>
              <CloseBtn onClick={handleCloseModal}>&times;</CloseBtn>
              <h3 style={{marginBottom:18}}>Phản hồi khách hàng</h3>
              <form onSubmit={handleSubmitResponse}>
                <ModalLabel>Nhập phản hồi gửi khách hàng (nếu cần):</ModalLabel>
                <ModalTextarea
                  value={response}
                  onChange={e => {
                    if (e.target.value.length <= 150) setResponse(e.target.value);
                  }}
                  placeholder="Nhập nội dung phản hồi..."
                  maxLength={150}
                />
                <div style={{fontSize:'0.95em',color:'#888',marginBottom:8,textAlign:'right'}}>{response.length}/150 ký tự</div>
                <div style={{ textAlign: 'right', marginTop: 8 }}>
                  <ActionBtn type="submit" disabled={response.length === 0 || response.length > 150}>Gửi & Đánh dấu đã xử lý</ActionBtn>
                  <ActionBtn type="button" style={{background:'#ccc',color:'#333',marginLeft:8}} onClick={handleCloseModal}>Đóng</ActionBtn>
                </div>
              </form>
            </ModalContent>
          </ModalOverlay>
        </Section>
      </ContentArea>
    </Container>
  );
}

export default StaffDanhGia;
