import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 600px;
  min-height: 80vh;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  padding: 40px 28px 32px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  position: relative;
  top: 0; left: 0; right: 0; bottom: 0;
  @media (max-width: 600px) {
    min-height: 100vh;
    padding: 24px 6px 18px 6px;
  }
`;
const Title = styled.h2`
  text-align: center;
  color: #059669;
  margin-bottom: 28px;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
`;
const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 28px;
`;
const AvatarImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #4ade80;
  margin-bottom: 14px;
  box-shadow: 0 2px 12px rgba(76,220,128,0.15);
  background: #f3f4f6;
`;
const UploadLabel = styled.label`
  background: linear-gradient(90deg, #4ade80 60%, #059669 100%);
  color: #fff;
  padding: 7px 22px;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  margin-bottom: 10px;
  font-weight: 500;
  box-shadow: 0 1px 4px rgba(76,220,128,0.10);
  transition: background 0.2s;
  &:hover { background: #059669; }
`;
const Input = styled.input`
  width: 91%;
  padding: 12px 16px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  margin-bottom: 22px;
  font-size: 17px;
  background: ${props => props.readOnly ? '#f3f4f6' : '#fff'};
  color: ${props => props.readOnly ? '#6b7280' : '#111827'};
  cursor: ${props => props.readOnly ? 'not-allowed' : 'text'};
  font-weight: 500;
  transition: border 0.2s;
  &:focus { border-color: #4ade80; outline: none; }
`;
const Label = styled.label`
  font-weight: 600;
  color: #059669;
  margin-bottom: 7px;
  display: block;
  font-size: 15px;
  letter-spacing: 0.2px;
`;
const SaveBtn = styled.button`
  width: 100%;
  background: linear-gradient(90deg, #059669 60%, #4ade80 100%);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 14px;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 0 2px 8px rgba(76,220,128,0.10);
  transition: background 0.2s, box-shadow 0.2s;
  &:hover { background: #059669; box-shadow: 0 4px 16px rgba(76,220,128,0.13); }
`;
const ErrorMsg = styled.div`
  color: #ef4444;
  font-size: 15px;
  margin-bottom: 12px;
  text-align: center;
  font-weight: 500;
`;
const PopupOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
const PopupBox = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 32px rgba(76,220,128,0.13);
  padding: 36px 32px 28px 32px;
  min-width: 340px;
  text-align: center;
`;
const PopupTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 22px;
  color: #059669;
`;
const PopupBtnRow = styled.div`
  display: flex;
  gap: 18px;
  justify-content: center;
`;
const PopupBtn = styled.button`
  padding: 12px 28px;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background: #059669;
  color: #fff;
  transition: background 0.2s;
  box-shadow: 0 1px 4px rgba(76,220,128,0.10);
  &:hover { background: #047857; }
  &:last-child {
    background: #e5e7eb;
    color: #374151;
    &:hover { background: #d1d5db; }
  }
`;
const CenterWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f6fefb;
  overflow: auto;
`;


const defaultAvatar = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a66d16bd-5c13-4822-b69f-18a8346d9bd3.png';

const initialInfo = {
  name: ' Nguyễn Văn A',
  email: 'admin@angiotest.com',
  phone: '0901234567',
};

const LOCAL_KEY = 'admin_profile';

export default function AdminHoSo() {
  // Lấy dữ liệu từ localStorage nếu có
  const stored = localStorage.getItem(LOCAL_KEY);
  const parsed = stored ? JSON.parse(stored) : null;
  const [avatar, setAvatar] = useState(parsed?.avatar || defaultAvatar);
  const [avatarFile, setAvatarFile] = useState(null);
  const [info, setInfo] = useState(parsed?.info || initialInfo);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef();
  const [showPopup, setShowPopup] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAvatar(parsed.avatar || defaultAvatar);
        setInfo(parsed.info || initialInfo);
      } catch {}
    }
  }, []);

  const handleInputChange = e => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = ev => setAvatar(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const errs = {};
    if (!info.name.trim()) errs.name = 'Tên không được để trống';
    if (!info.phone.trim() || !/^0\d{9,10}$/.test(info.phone)) errs.phone = 'Số điện thoại không hợp lệ';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    setShowPopup(true);
  };

  const handleConfirmSave = () => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify({ avatar, info }));
    setShowPopup(false);
    setShowSuccess(true);
  };
  const handleCancelSave = () => {
    setShowPopup(false);
  };

  const handleBackToAdmin = () => {
    navigate('/admin/trangchu');
  };

  return (
    <CenterWrapper>
      <Container>
        <Title>Hồ sơ Quản trị viên</Title>
        <form onSubmit={handleSubmit}>
          <AvatarWrapper>
            <AvatarImg src={avatar} alt="Avatar" />
            <UploadLabel htmlFor="avatar-upload">Chọn ảnh mới</UploadLabel>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleAvatarChange}
            />
          </AvatarWrapper>
          {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
          <Label htmlFor="name">Tên</Label>
          <Input
            id="name"
            name="name"
            value={info.name}
            onChange={handleInputChange}
            placeholder="Nhập tên quản trị viên"
          />
          {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            value={info.email}
            readOnly
            style={{ background: '#f3f4f6', color: '#6b7280', cursor: 'not-allowed' }}
          />
          {errors.phone && <ErrorMsg>{errors.phone}</ErrorMsg>}
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input
            id="phone"
            name="phone"
            value={info.phone}
            onChange={handleInputChange}
            placeholder="Nhập số điện thoại"
          />
          <SaveBtn type="submit">Lưu thay đổi</SaveBtn>
        </form>
        {showPopup && (
          <PopupOverlay onClick={e => {
            if (e.target === e.currentTarget) setShowPopup(false);
          }}>
            <PopupBox>
              <PopupTitle>Bạn có chắc muốn lưu thay đổi?</PopupTitle>
              <PopupBtnRow>
                <PopupBtn onClick={handleConfirmSave} type="button">Xác nhận</PopupBtn>
                <PopupBtn onClick={handleCancelSave} type="button">Hủy</PopupBtn>
              </PopupBtnRow>
            </PopupBox>
          </PopupOverlay>
        )}
        {showSuccess && (
          <PopupOverlay onClick={e => {
            if (e.target === e.currentTarget) setShowSuccess(false);
          }}>
            <PopupBox>
              <PopupTitle style={{color:'#059669'}}>Đã lưu thành công!</PopupTitle>
              <PopupBtnRow>
                <PopupBtn onClick={handleBackToAdmin} type="button">Quay lại trang chủ admin</PopupBtn>
              </PopupBtnRow>
            </PopupBox>
          </PopupOverlay>
        )}
      </Container>
    </CenterWrapper>
  );
}
