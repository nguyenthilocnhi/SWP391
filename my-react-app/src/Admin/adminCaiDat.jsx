import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/adminLayout';
import styled from 'styled-components';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios';

// == Styled-components như bạn đã sử dụng (MainContent, ContentWrapper, Card, …)
// Ví dụ:
const MainContent = styled.main`
  padding: 110px 0 24px 210px;
  background: #f9fafb;
  min-height: 100vh;
  width: 134vw;
  max-width: 99vw;
  margin: 0;
  overflow-x: hidden;
  box-sizing: border-box;
  @media (max-width: 1200px) { padding-left: 0; }
  @media (max-width: 768px) { padding-top: 80px; padding-left: 0; }
`;
const ContentWrapper = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  padding: 0 8px;
  @media (max-width: 1200px) { max-width: 100vw; padding: 0 4px; }
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
const FormGroup = styled.div`margin-bottom: 16px;`;
const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 6px;
  color: #374151;
`;
const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: #fff;
  box-sizing: border-box;
`;
const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: #fff;
  box-sizing: border-box;
`;
const Button = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  background-color: ${props => props.active ? '#4ade80' : 'transparent'};
  color: ${props => props.active ? '#fff' : '#4b5563'};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  margin-right: 8px;
  &:hover {
    background-color: ${props => props.active ? '#059669' : '#e5e7eb'};
    color: ${props => props.active ? '#fff' : '#374151'};
  }
`;
const AvatarWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 18px;
`;
const AvatarImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #4ade80;
  background: #f3f4f6;
  box-shadow: 0 2px 12px rgba(76,220,128,0.10);
`;
const CameraIcon = styled.label`
  margin-top: 10px;
  background: #fff;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(76,220,128,0.13);
  transition: background 0.2s;
  &:hover { background: #f3f4f6; }
`;
const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px 32px;
  margin-bottom: 18px;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;
const ModalButton = styled.button`
  padding: 12px 28px;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background: ${props => props.primary ? '#059669' : '#e5e7eb'};
  color: ${props => props.primary ? '#fff' : '#374151'};
  box-shadow: 0 1px 4px rgba(76,220,128,0.10);
  &:hover {
    background: ${props => props.primary ? '#047857' : '#d1d5db'};
  }
`;

const defaultAvatar = 'https://storage.googleapis.com/.../default-avatar.png';

const AdminCaiDat = () => {
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/Admin/get-profile', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      const d = res.data.obj;
      setAdminName(d.name);
      setAdminEmail(d.email);
      setPhone(d.phone);
      setDob(d.dob);
      setGender(d.gender);
      setAddress(d.address);
      setAvatar(d.avatar || defaultAvatar);
    }).catch(console.error);
  }, []);

  const handleAvatarChange = e => {
    const f = e.target.files[0];
    if (f) {
      const r = new FileReader();
      r.onload = ev => setAvatar(ev.target.result);
      r.readAsDataURL(f);
    }
  };

  const handleSave = () => { setPendingAction('save'); setShowConfirmModal(true); };
  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) return alert('Mật khẩu xác nhận không khớp');
    setPendingAction('password'); setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    const token = localStorage.getItem('token');
    if (pendingAction === 'save') {
      axios.put('/api/Admin/update-profile', {
        name: adminName, phone, dob, gender, address, avatar
      }, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => setShowSuccessModal(true))
        .catch(console.error);
    }
    if (pendingAction === 'password') {
      axios.put('/api/Admin/change-password', {
        oldPassword, newPassword
      }, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => setShowSuccessModal(true))
        .catch(console.error);
    }
    setShowConfirmModal(false);
  };

  return (
    <>
      <AdminLayout />
      <MainContent>
        <ContentWrapper>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1f2937', marginBottom: 24 }}>
            Cài đặt hệ thống
          </h2>

          {/* Thông tin tài khoản */}
          <Card>
            <CardHeader><CardTitle>Thông tin tài khoản</CardTitle></CardHeader>
            <AvatarWrapper>
              <AvatarImg src={avatar} alt="Avatar" />
              <CameraIcon htmlFor="avatar-upload">
                <FaCamera color="#059669" size={18} />
                <input id="avatar-upload" type="file" accept="image/*" style={{ display: 'none' }}
                  onChange={handleAvatarChange} />
              </CameraIcon>
            </AvatarWrapper>
            <InfoGrid>
              {/* Các input fields */}
              <FormGroup><Label>Tên quản trị:</Label>
                <Input value={adminName} onChange={e => setAdminName(e.target.value)} /></FormGroup>

              <FormGroup><Label>Email:</Label>
                <Input type="email" value={adminEmail} readOnly style={{ background: '#f3f4f6' }} /></FormGroup>

              <FormGroup><Label>Số điện thoại:</Label>
                <Input type="tel" value={phone} onChange={e => setPhone(e.target.value)} /></FormGroup>

              <FormGroup><Label>Ngày sinh:</Label>
                <Input type="date" value={dob} onChange={e => setDob(e.target.value)} /></FormGroup>

              <FormGroup><Label>Giới tính:</Label>
                <Select value={gender} onChange={e => setGender(e.target.value)}>
                  <option value="">Chọn</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </Select></FormGroup>

              <FormGroup><Label>Địa chỉ:</Label>
                <Input value={address} onChange={e => setAddress(e.target.value)} /></FormGroup>
            </InfoGrid>
            <div style={{ textAlign: 'center' }}>
              <Button active onClick={handleSave}>Lưu thay đổi</Button>
            </div>
          </Card>

          {/* Đổi mật khẩu */}
          <Card>
            <CardHeader><CardTitle>Đổi mật khẩu</CardTitle></CardHeader>
            <FormGroup><Label>Mật khẩu hiện tại:</Label>
              <Input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} /></FormGroup>
            <FormGroup><Label>Mật khẩu mới:</Label>
              <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} /></FormGroup>
            <FormGroup><Label>Xác nhận mật khẩu:</Label>
              <Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} /></FormGroup>
            <div style={{ textAlign: 'center' }}>
              <Button active onClick={handleChangePassword}>Cập nhật mật khẩu</Button>
            </div>
          </Card>
        </ContentWrapper>
      </MainContent>

      {/* Modal Xác nhận */}
      {showConfirmModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.22)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', borderRadius: 18, padding: 32, minWidth: 340, textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 22, color: '#059669' }}>
              {pendingAction === 'save' ? 'Bạn có chắc muốn lưu thay đổi?' : 'Cập nhật mật khẩu?'}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 18 }}>
              <ModalButton primary onClick={handleConfirm}>Xác nhận</ModalButton>
              <ModalButton onClick={() => setShowConfirmModal(false)}>Hủy</ModalButton>
            </div>
          </div>
        </div>
      )}

      {/* Modal Thành công */}
      {showSuccessModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.22)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', borderRadius: 18, padding: 32, minWidth: 340, textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 22, color: '#059669' }}>Thao tác thành công!</div>
            <ModalButton primary onClick={() => setShowSuccessModal(false)}>Đóng</ModalButton>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminCaiDat;
