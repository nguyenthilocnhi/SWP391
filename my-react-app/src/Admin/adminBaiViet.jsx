import React from 'react';
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
  background: ${props => props.status === 'done' ? '#d1fae5' : '#dbeafe'};
  color: ${props => props.status === 'done' ? '#065f46' : '#1e40af'};
`;
const Button = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  background-color: ${props => props.active ? '#e0e7ff' : 'transparent'};
  color: ${props => props.active ? '#4338ca' : '#4b5563'};
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 8px;
  &:hover {
    background-color: #f3f4f6;
  }
`;

const articles = [
  {
    title: 'Tầm quan trọng của kiểm tra sức khỏe định kỳ',
    author: 'BS. Trần Huy',
    date: '01/07/2025',
    status: 'done',
    statusText: 'Đã đăng',
  },
  {
    title: 'Lời khuyên cho phụ nữ mang thai 3 tháng đầu',
    author: 'CN. Thanh Hương',
    date: '28/06/2025',
    status: 'processing',
    statusText: 'Nháp',
  },
];

const AdminBaiViet = () => {
  return (
    <>
      <AdminLayout />
      <MainContent>
        <ContentWrapper>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1f2937', marginBottom: 24 }}>Bài viết sức khỏe</h2>
          <Card>
            <CardHeader>
              <CardTitle>Danh sách bài viết</CardTitle>
              <Button active>+ Thêm bài viết</Button>
            </CardHeader>
            <TableContainer>
              <StaffTable>
                <thead>
                  <tr>
                    <StaffTh>Tiêu đề</StaffTh>
                    <StaffTh>Tác giả</StaffTh>
                    <StaffTh>Ngày đăng</StaffTh>
                    <StaffTh>Trạng thái</StaffTh>
                    <StaffTh>Thao tác</StaffTh>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((a, idx) => (
                    <tr key={idx}>
                      <StaffTd>{a.title}</StaffTd>
                      <StaffTd>{a.author}</StaffTd>
                      <StaffTd>{a.date}</StaffTd>
                      <StaffTd><Badge status={a.status}>{a.statusText}</Badge></StaffTd>
                      <StaffTd>
                        <Button>Xem</Button>
                        <Button>Sửa</Button>
                        <Button>Xóa</Button>
                      </StaffTd>
                    </tr>
                  ))}
                </tbody>
              </StaffTable>
            </TableContainer>
          </Card>
        </ContentWrapper>
      </MainContent>
    </>
  );
};

export default AdminBaiViet;