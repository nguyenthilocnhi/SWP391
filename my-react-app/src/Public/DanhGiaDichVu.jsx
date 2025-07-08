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
const Label = styled.label`
  display: block;
  margin-top: 18px;
  margin-bottom: 7px;
  font-weight: 600;
  color: #37474f;
`;
const Select = styled.select`
  width: 100%;
  padding: 13px 15px;
  font-size: 16px;
  border-radius: 12px;
  border: 1.5px solid #b7e4c7;
  background-color: #f9fafa;
  transition: all 0.3s ease;
  margin-bottom: 10px;
  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px #e6f4ea;
  }
`;
const Textarea = styled.textarea`
  width: 100%;
  padding: 13px 15px;
  font-size: 16px;
  border-radius: 12px;
  border: 1.5px solid #b7e4c7;
  background-color: #f9fafa;
  transition: all 0.3s ease;
  margin-bottom: 10px;
  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px #e6f4ea;
  }
`;
const Stars = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;
const Star = styled.span`
  font-size: 30px;
  cursor: pointer;
  color: ${props => (props.selected ? "#ffb300" : "#cfd8dc")};
  transition: color 0.3s ease;
`;
const SubmitBtn = styled.button`
  margin-top: 22px;
  padding: 14px 0;
  font-size: 17px;
  background: linear-gradient(90deg, #10b981 60%, #22c55e 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s;
  width: 100%;
  font-weight: 700;
  box-shadow: 0 2px 12px rgba(16,185,129,0.10);
  letter-spacing: 0.5px;
  &:hover {
    background: linear-gradient(90deg, #0e6c40 60%, #16a34a 100%);
  }
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

const DanhGiaDichVu = () => {
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    const serviceList = JSON.parse(localStorage.getItem("lichSuDichVu")) || [];
    const completed = serviceList.filter(s => s.trangThai === "Hoàn_tất");
    setServices(completed);
    setReviews(JSON.parse(localStorage.getItem("danhGiaDichVu")) || []);
  }, []);

  const handleStarClick = (i) => {
    setSelectedRating(i);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedService || !reviewText.trim() || selectedRating === 0) {
      alert("Vui lòng chọn dịch vụ, chấm sao và nhập nội dung!");
      return;
    }
    const newReview = {
      tenDichVu: selectedService,
      noiDung: reviewText,
      soSao: selectedRating,
      thoiGian: new Date().toLocaleString()
    };
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem("danhGiaDichVu", JSON.stringify(updatedReviews));
    setReviewText("");
    setSelectedRating(0);
    setSelectedService("");
  };

  return (
    <Outer>
      <Container>
        <Heading>Đánh Giá Dịch Vụ</Heading>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Label htmlFor="dichVuSelect">Chọn Dịch Vụ:</Label>
          <Select
            id="dichVuSelect"
            value={selectedService}
            onChange={e => setSelectedService(e.target.value)}
          >
            <option value="">-- Chọn dịch vụ --</option>
            <option value="Tư Vấn">Tư Vấn</option>
            <option value="Xét Nghiệm">Xét Nghiệm</option>
            {services.map((s, idx) => (
              <option key={idx} value={s.ten}>{s.ten}</option>
            ))}
          </Select>

          <Label>Chấm sao:</Label>
          <Stars>
            {[1,2,3,4,5].map(i => (
              <Star
                key={i}
                selected={i <= selectedRating}
                onClick={() => handleStarClick(i)}
              >★</Star>
            ))}
          </Stars>

          <Label htmlFor="reviewText">Nội dung đánh giá:</Label>
          <Textarea
            id="reviewText"
            rows={4}
            placeholder="Nhập đánh giá của bạn..."
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
          />

          <SubmitBtn type="submit">Gửi đánh giá</SubmitBtn>
        </form>

        <BackLink href="/customer/lich-su-dich-vu-va-danh-gia">← Quay về lịch sử dịch vụ</BackLink>
      </Container>
    </Outer>
  );
};

export default DanhGiaDichVu;
