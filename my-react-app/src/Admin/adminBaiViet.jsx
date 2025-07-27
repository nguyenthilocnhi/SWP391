import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/adminLayout';
import styled from 'styled-components';

const MainContent = styled.main`
  padding: 120px 0 24px 250px;
  background: #f9fafb;
  min-height: 100vh;
  width: 134vw;
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
  max-width: 1200px;
  margin: 0 auto;
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
const TableContainer = styled.div`
  overflow-x: auto;
`;
const StaffTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const StaffTh = styled.th`
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  border-bottom: 1px solid #e5e7eb;
`;
const StaffTd = styled.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: top;
`;
const Badge = styled.span`
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 9999px;
  display: inline-block;
  white-space: nowrap;
  background: ${props => {
    switch(props.$status) {
      case 'published': return '#d1fae5';
      case 'pending': return '#fef3c7';
      case 'rejected': return '#fee2e2';
      case 'draft': return '#e5e7eb';
      default: return '#dbeafe';
    }
  }};
  color: ${props => {
    switch(props.$status) {
      case 'published': return '#065f46';
      case 'pending': return '#92400e';
      case 'rejected': return '#991b1b';
      case 'draft': return '#374151';
      default: return '#1e40af';
    }
  }};
`;
const Button = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  background-color: ${props => {
    if (props.$variant === 'approve') return '#10b981';
    if (props.$variant === 'reject') return '#ef4444';
    if (props.$variant === 'view') return '#3b82f6';
    if (props.$variant === 'edit') return '#f59e0b';
    if (props.$variant === 'delete') return '#6b7280';
    return props.active ? '#e0e7ff' : 'transparent';
  }};
  color: ${props => {
    if (['approve', 'reject', 'view', 'edit', 'delete'].includes(props.$variant)) return 'white';
    return props.active ? '#4338ca' : '#4b5563';
  }};
  cursor: pointer;
  transition: all 0.3s;
  margin-right: 8px;
  &:hover {
    background-color: ${props => {
      if (props.$variant === 'approve') return '#059669';
      if (props.$variant === 'reject') return '#dc2626';
      if (props.$variant === 'view') return '#2563eb';
      if (props.$variant === 'edit') return '#d97706';
      if (props.$variant === 'delete') return '#4b5563';
      return '#f3f4f6';
    }};
  }
`;
const FilterContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;
const FilterButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: ${props => props.$active ? '#10b981' : 'white'};
  color: ${props => props.$active ? 'white' : '#374151'};
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: ${props => props.$active ? '#059669' : '#f9fafb'};
  }
`;
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;
const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;
const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b7280;
  &:hover {
    color: #374151;
  }
`;
const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;

const AdminBaiViet = () => {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadArticles();
    const handleStorage = () => loadArticles();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const loadArticles = async () => {
    try {
      const res = await fetch('https://api-gender2.purintech.id.vn/api/Blog');
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      } else {
        setArticles([]);
      }
    } catch (err) {
      setArticles([]);
    }
  };

  const handleApprove = async (articleId) => {
    try {
      const res = await fetch(`https://api-gender2.purintech.id.vn/api/Blog/status/${articleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'published' })
      });
      if (res.ok) loadArticles();
    } catch (err) {}
  };

  const handleReject = async (articleId) => {
    try {
      const res = await fetch(`https://api-gender2.purintech.id.vn/api/Blog/status/${articleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' })
      });
      if (res.ok) loadArticles();
    } catch (err) {}
  };

  const handleDelete = async (articleId) => {
    const token = localStorage.getItem("token");
    if (!token || !token.startsWith("Bearer ")) {
      alert("Token không hợp lệ hoặc chưa đăng nhập!");
      return;
    }
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return;
    try {
      const res = await fetch(`https://api-gender2.purintech.id.vn/api/Blog/${articleId}`, {
        method: "DELETE",
        headers: {
          "Authorization": token,
          "accept": "*/*"
        }
      });
      if (res.status === 204) {
        alert("Xóa bài viết thành công!");
        loadArticles();
      } else {
        alert("Xóa bài viết thất bại!");
      }
    } catch (err) {
      alert("Lỗi kết nối server!\n" + err.message);
    }
  };

  const handleView = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleUpdateStatus = async (articleId, newStatus) => {
    const token = localStorage.getItem("token");
    if (!token || !token.startsWith("Bearer ")) {
      alert("Token không hợp lệ hoặc chưa đăng nhập!");
      return;
    }
    try {
      const res = await fetch(`https://api-gender2.purintech.id.vn/api/Blog/status/${articleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
          "accept": "*/*"
        },
        body: JSON.stringify(newStatus)
      });
      if (res.ok) {
        alert("Cập nhật trạng thái thành công!");
        loadArticles && loadArticles();
      } else {
        alert("Cập nhật trạng thái thất bại!");
      }
    } catch (err) {
      alert("Lỗi kết nối server!\n" + err.message);
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'published': return 'Đã đăng';
      case 'pending': return 'Chờ duyệt';
      case 'rejected': return 'Từ chối';
      case 'draft': return 'Nháp';
      default: return 'Không xác định';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const filteredArticles = articles.filter(article => {
    if (filter === 'all') return true;
    return article.status === filter;
  });

  return (
    <>
      <AdminLayout />
      <MainContent>
        <ContentWrapper>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1f2937', marginBottom: 24 }}>Quản lý bài viết</h2>
          
          <FilterContainer>
            <FilterButton 
              $active={filter === 'all'} 
              onClick={() => setFilter('all')}
            >
              Tất cả ({articles.length})
            </FilterButton>
            <FilterButton 
              $active={filter === 'pending'} 
              onClick={() => setFilter('pending')}
            >
              Chờ duyệt ({articles.filter(a => a.status === 'pending').length})
            </FilterButton>
            <FilterButton 
              $active={filter === 'published'} 
              onClick={() => setFilter('published')}
            >
              Đã đăng ({articles.filter(a => a.status === 'published').length})
            </FilterButton>
            <FilterButton 
              $active={filter === 'rejected'} 
              onClick={() => setFilter('rejected')}
            >
              Từ chối ({articles.filter(a => a.status === 'rejected').length})
            </FilterButton>
            <FilterButton 
              $active={filter === 'draft'} 
              onClick={() => setFilter('draft')}
            >
              Nháp ({articles.filter(a => a.status === 'draft').length})
            </FilterButton>
          </FilterContainer>

          <Card>
            <CardHeader>
              <CardTitle>Danh sách bài viết</CardTitle>
            </CardHeader>
            <TableContainer>
              <StaffTable>
                <thead>
                  <tr>
                    <StaffTh>Tiêu đề</StaffTh>
                    <StaffTh>Tác giả</StaffTh>
                    <StaffTh>Danh mục</StaffTh>
                    <StaffTh>Ngày tạo</StaffTh>
                    <StaffTh>Trạng thái</StaffTh>
                    <StaffTh>Thao tác</StaffTh>
                  </tr>
                </thead>
                <tbody>
                  {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                      <tr key={article.id}>
                        <StaffTd>
                          <div style={{ fontWeight: 500, marginBottom: 4 }}>
                            {article.title}
                          </div>
                          {article.summary && (
                            <div style={{ fontSize: 12, color: '#6b7280' }}>
                              {article.summary.substring(0, 100)}...
                            </div>
                          )}
                        </StaffTd>
                        <StaffTd>{article.author}</StaffTd>
                        <StaffTd>
                          {article.category === 'suc-khoe' && 'Sức khỏe'}
                          {article.category === 'dinh-duong' && 'Dinh dưỡng'}
                          {article.category === 'the-thao' && 'Thể thao'}
                          {article.category === 'tam-ly' && 'Tâm lý'}
                          {article.category === 'benh-ly' && 'Bệnh lý'}
                          {article.category === 'kham-benh' && 'Khám bệnh'}
                        </StaffTd>
                        <StaffTd>{formatDate(article.createdAt)}</StaffTd>
                        <StaffTd>
                          <Badge $status={article.status}>
                            {getStatusText(article.status)}
                          </Badge>
                        </StaffTd>
                        <StaffTd>
                          <Button $variant="view" onClick={() => handleView(article)}>
                            Xem
                          </Button>
                          {article.status === 'pending' && (
                            <>
                              <Button $variant="approve" onClick={() => handleUpdateStatus(article.id, { status: 'published' })}>
                                Duyệt
                              </Button>
                              <Button $variant="reject" onClick={() => handleUpdateStatus(article.id, { status: 'rejected' })}>
                                Từ chối
                              </Button>
                            </>
                          )}
                          {article.status === 'draft' && (
                            <Button $variant="edit">
                              Sửa
                            </Button>
                          )}
                          <Button $variant="delete" onClick={() => handleDelete(article.id)}>
                            Xóa
                          </Button>
                        </StaffTd>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <StaffTd colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>
                        Không có bài viết nào
                      </StaffTd>
                    </tr>
                  )}
                </tbody>
              </StaffTable>
            </TableContainer>
          </Card>
        </ContentWrapper>
      </MainContent>

      {/* Modal xem chi tiết bài viết */}
      {showModal && selectedArticle && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Chi tiết bài viết</ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>&times;</CloseButton>
            </ModalHeader>
            
            <div style={{ marginBottom: 16 }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1f2937' }}>Tiêu đề:</h4>
              <p style={{ margin: 0, fontSize: 16, fontWeight: 500 }}>{selectedArticle.title}</p>
            </div>

            {selectedArticle.summary && (
              <div style={{ marginBottom: 16 }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#1f2937' }}>Tóm tắt:</h4>
                <p style={{ margin: 0, color: '#6b7280' }}>{selectedArticle.summary}</p>
              </div>
            )}

            <div style={{ marginBottom: 16 }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1f2937' }}>Nội dung:</h4>
              <div style={{ 
                maxHeight: '300px', 
                overflowY: 'auto', 
                padding: '12px', 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px',
                backgroundColor: '#f9fafb',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.6
              }}>
                {selectedArticle.content}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <h4 style={{ margin: '0 0 8px 0', color: '#1f2937' }}>Tác giả:</h4>
                <p style={{ margin: 0 }}>{selectedArticle.author}</p>
              </div>
              <div>
                <h4 style={{ margin: '0 0 8px 0', color: '#1f2937' }}>Danh mục:</h4>
                <p style={{ margin: 0 }}>
                  {selectedArticle.category === 'suc-khoe' && 'Sức khỏe'}
                  {selectedArticle.category === 'dinh-duong' && 'Dinh dưỡng'}
                  {selectedArticle.category === 'the-thao' && 'Thể thao'}
                  {selectedArticle.category === 'tam-ly' && 'Tâm lý'}
                  {selectedArticle.category === 'benh-ly' && 'Bệnh lý'}
                  {selectedArticle.category === 'kham-benh' && 'Khám bệnh'}
                </p>
              </div>
            </div>

            {selectedArticle.tags && (
              <div style={{ marginBottom: 16 }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#1f2937' }}>Tags:</h4>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {selectedArticle.tags.split(',').map((tag, index) => (
                    <span key={index} style={{
                      padding: '4px 8px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <ModalActions>
              {selectedArticle.status === 'pending' && (
                <>
                  <Button variant="approve" onClick={() => {
                    handleUpdateStatus(selectedArticle.id, { status: 'published' });
                    setShowModal(false);
                  }}>
                    Duyệt bài viết
                  </Button>
                  <Button variant="reject" onClick={() => {
                    handleUpdateStatus(selectedArticle.id, { status: 'rejected' });
                    setShowModal(false);
                  }}>
                    Từ chối
                  </Button>
                </>
              )}
              <Button onClick={() => setShowModal(false)}>
                Đóng
              </Button>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default AdminBaiViet;