import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/adminLayout';
import styled, { css } from 'styled-components';
import { FaCamera } from 'react-icons/fa';

const MainContent = styled.main`
  padding: 110px 0 24px 210px;
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
  max-width: 1140px;
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
const FormGroup = styled.div`
  margin-bottom: 16px;
`;
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
  outline: none;
  &:hover {
    background-color: ${props => props.active ? '#059669' : '#e5e7eb'};
    color: ${props => props.active ? '#fff' : '#374151'};
    border: none;
  }
  &:focus {
    outline: none;
    border: none;
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
  z-index: 2;
  &:hover { background: #f3f4f6; }
`;
const defaultAvatar = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a66d16bd-5c13-4822-b69f-18a8346d9bd3.png';
const LOCAL_KEY = 'admin_profile';

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
  outline: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background: ${props => props.primary ? '#059669' : '#e5e7eb'};
  color: ${props => props.primary ? '#fff' : '#374151'};
  box-shadow: 0 1px 4px rgba(76,220,128,0.10);
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: ${props => props.primary ? '#047857' : '#d1d5db'};
    border: none;
    outline: none;
  }
  &:focus {
    border: none;
    outline: none;
  }
`;

const AdminCaiDat = () => {
  const [adminName, setAdminName] = useState('Nguyễn Thị Ngọc Quý');
  const [adminEmail, setAdminEmail] = useState('admin@trungtam.com');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.avatar || defaultAvatar;
      } catch {
        return defaultAvatar;
      }
    }
    return defaultAvatar;
  });
  const [phone, setPhone] = useState('0901234567');
  const [dob, setDob] = useState('1995-01-01');
  const [gender, setGender] = useState('female');
  const [address, setAddress] = useState('123 Đường ABC, Quận 1, TP.HCM');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setAvatar(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setPendingAction('save');
    setShowConfirmModal(true);
  };
  const handleChangePassword = () => {
    setPendingAction('password');
    setShowConfirmModal(true);
  };
  const handleConfirm = () => {
    if (pendingAction === 'save') {
      const profile = {
        avatar,
        info: {
          name: adminName,
          email: adminEmail,
          phone,
          dob,
          gender,
          address,
        }
      };
      localStorage.setItem(LOCAL_KEY, JSON.stringify(profile));
      setShowSuccessModal(true);
    } else if (pendingAction === 'password') {
      // Thực hiện logic cập nhật mật khẩu ở đây
      setShowSuccessModal(true);
    }
    setShowConfirmModal(false);
    setPendingAction(null);
  };
  const handleCancel = () => {
    setShowConfirmModal(false);
    setPendingAction(null);
  };
  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
  };

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAvatar(parsed.avatar || defaultAvatar);
        setAdminName(parsed.info?.name || '');
        setAdminEmail(parsed.info?.email || '');
        setPhone(parsed.info?.phone || '');
        setDob(parsed.info?.dob || '');
        setGender(parsed.info?.gender || '');
        setAddress(parsed.info?.address || '');
      } catch {}
    }
  }, []);

  return (
    <>
      <AdminLayout />
      <MainContent>
        <ContentWrapper>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1f2937', marginBottom: 24 }}>Cài đặt hệ thống</h2>

          {/* Thông tin tài khoản */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin tài khoản</CardTitle>
            </CardHeader>
            <AvatarWrapper>
              <AvatarImg src={avatar} alt="Avatar" />
              <CameraIcon htmlFor="avatar-upload">
                <FaCamera color="#059669" size={18} />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleAvatarChange}
                />
              </CameraIcon>
            </AvatarWrapper>
            <InfoGrid>
              <FormGroup>
                <Label htmlFor="adminName">Tên quản trị:</Label>
                <Input type="text" id="adminName" value={adminName} onChange={e => setAdminName(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="adminEmail">Email:</Label>
                <Input type="email" id="adminEmail" value={adminEmail} readOnly style={{ background: '#f3f4f6', color: '#6b7280', cursor: 'not-allowed' }} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="adminPhone">Số điện thoại:</Label>
                <Input type="tel" id="adminPhone" value={phone} onChange={e => setPhone(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="adminDob">Ngày sinh:</Label>
                <Input type="date" id="adminDob" value={dob} onChange={e => setDob(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="adminGender">Giới tính:</Label>
                <Select id="adminGender" value={gender} onChange={e => setGender(e.target.value)}>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="adminAddress">Địa chỉ:</Label>
                <Input type="text" id="adminAddress" value={address} onChange={e => setAddress(e.target.value)} />
              </FormGroup>
            </InfoGrid>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
              <Button active onClick={handleSave}>Lưu thay đổi</Button>
            </div>
          </Card>

          {/* Đổi mật khẩu */}
          <Card>
            <CardHeader>
              <CardTitle>Đổi mật khẩu</CardTitle>
            </CardHeader>
            <FormGroup>
              <Label htmlFor="oldPassword">Mật khẩu hiện tại:</Label>
              <Input type="password" id="oldPassword" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="newPassword">Mật khẩu mới:</Label>
              <Input type="password" id="newPassword" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu:</Label>
              <Input type="password" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </FormGroup>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
              <Button active onClick={handleChangePassword}>Cập nhật mật khẩu</Button>
            </div>
          </Card>
        </ContentWrapper>
      </MainContent>
      {/* Modal xác nhận */}
      {showConfirmModal && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.22)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{background:'#fff',borderRadius:18,padding:'36px 32px 28px 32px',minWidth:340,textAlign:'center',boxShadow:'0 4px 32px rgba(76,220,128,0.13)'}}>
            <div style={{fontSize:20,fontWeight:700,marginBottom:22,color:'#059669'}}>
              {pendingAction === 'save' ? 'Bạn có chắc muốn lưu thay đổi?' : 'Bạn có chắc muốn cập nhật mật khẩu?'}
            </div>
            <div style={{display:'flex',gap:18,justifyContent:'center'}}>
              <ModalButton primary onClick={handleConfirm}>Xác nhận</ModalButton>
              <ModalButton onClick={handleCancel}>Hủy</ModalButton>
            </div>
          </div>
        </div>
      )}
      {/* Modal thành công */}
      {showSuccessModal && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.22)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{background:'#fff',borderRadius:18,padding:'36px 32px 28px 32px',minWidth:340,textAlign:'center',boxShadow:'0 4px 32px rgba(76,220,128,0.13)'}}>
            <div style={{fontSize:20,fontWeight:700,marginBottom:22,color:'#059669'}}>Thao tác thành công!</div>
            <div style={{display:'flex',gap:18,justifyContent:'center'}}>
              <ModalButton primary onClick={handleCloseSuccess}>Đóng</ModalButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminCaiDat;