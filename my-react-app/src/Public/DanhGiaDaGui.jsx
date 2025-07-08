import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Outer = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #e6f4ea 0%, #f4f9f7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  max-width: 500px;
  width: 100%;
  padding: 40px 32px 32px 32px;
  background-color: #fff;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(46,125,50,0.10);
  font-family: 'Inter', sans-serif;
  color: #1f2937;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;
const Heading = styled.h2`
  font-size: 2.1rem;
  font-weight: 800;
  text-align: center;
  color: #10b981;
  margin-bottom: 28px;
  letter-spacing: 1px;
`;
const ReviewList = styled.div`
  margin-top: 36px;
`;
const ReviewGroup = styled.div`
  margin-bottom: 20px;
`;
const ReviewItem = styled.div`
  background: #f9fafa;
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 10px;
  box-shadow: 0 1px 4px rgba(16,185,129,0.04);
`;
const ReviewTitle = styled.h3`
  margin-top: 36px;
  margin-bottom: 14px;
  color: #10b981;
  font-size: 1.25rem;
  font-weight: 700;
`;
const ReviewGroupTitle = styled.h4`
  margin: 0 0 7px 0;
  color: #388e3c;
  font-size: 1.08rem;
`;
const BackLink = styled.a`
  display: block;
  text-align: center;
  margin-top: 28px;
  text-decoration: none;
  color: #10b981;
  font-weight: 600;
  font-size: 1.05rem;
  &:hover {
    text-decoration: underline;
    color: #0e6c40;
  }
`;

const DanhGiaDaGui = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setReviews(JSON.parse(localStorage.getItem("danhGiaDichVu")) || []);
  }, []);

  // Group reviews by service
  const groupedReviews = reviews.reduce((acc, r) => {
    if (!acc[r.tenDichVu]) acc[r.tenDichVu] = [];
    acc[r.tenDichVu].push(r);
    return acc;
  }, {});

  return (
    <Outer>
      <Container>
        <Heading>Đánh Giá Đã Gửi</Heading>
        <ReviewList>
          {Object.keys(groupedReviews).length === 0 && (
            <p style={{ color: "#888", textAlign: "center" }}>Chưa có đánh giá nào.</p>
          )}
          {Object.entries(groupedReviews).map(([ten, group]) => (
            <ReviewGroup key={ten}>
              <ReviewGroupTitle>{ten}</ReviewGroupTitle>
              {group.map((r, idx) => (
                <ReviewItem key={idx}>
                  <p>
                    <strong>{r.soSao} ★</strong> - {r.thoiGian}
                  </p>
                  <p>{r.noiDung}</p>
                </ReviewItem>
              ))}
            </ReviewGroup>
          ))}
        </ReviewList>
        <BackLink href="/customer/lich-su-dich-vu-va-danh-gia">← Quay về lịch sử dịch vụ</BackLink>
      </Container>
    </Outer>
  );
};

export default DanhGiaDaGui; 