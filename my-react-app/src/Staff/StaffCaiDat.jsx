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
  margin: 0;
  padding: 10px 0;
  overflow-x: hidden;
`;
const ContentArea = styled.main`
  flex: 1;
  padding: 110px 3rem 2rem 3rem;
  background: transparent;
  overflow-y: auto;
  margin-left: 250px;
  min-height: 100vh;
  @media (max-width: 768px) {
    margin-left: 80px;
    padding: 90px 1rem 1rem 1rem;
  }
  @media (max-width: 480px) {
    padding: 70px 0.5rem 0.5rem 0.5rem;
  }
`;
const SettingsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
const SettingsSection = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 20px;
  font-family: Arial, sans-serif;
  flex: 1 1 400px;
  max-width: 100%;
`;
const SettingsTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #09a370;
`;
const FormGroup = styled.div`
  margin-bottom: 16px;
`;
const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 6px;
  color: #222;
`;
const Input = styled.input`
  width: 90%;
  // min-width: 180px;
  // max-width: 320px;
  padding: 8px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
  background: #f9f9f9;
  color: #333;
  transition: border-color 0.2s;
  &:focus {
    outline: none;
    border-color: #09a370;
    background: #fff;
  }
`;
const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  font-weight: 500;
  background: #09a370;
  color: #fff;
  &:hover {
    background: #0d8a5f;
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;
const SwitchLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const Switch = styled.span`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  margin-left: 12px;
`;
const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  &:checked + span {
    background-color: #09a370;
  }
  &:checked + span:before {
    transform: translateX(26px);
  }
`;
const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
`;

function StaffCaiDat() {
    // State cho profile và headerProfile
    const getInitialProfile = () => {
        try {
            const savedProfile = localStorage.getItem('staffProfile');
            if (savedProfile) {
                return JSON.parse(savedProfile);
            }
        } catch (error) {
            console.error('Lỗi khi load profile từ localStorage:', error);
        }
        return {
            name: 'Nguyễn Thị Hương',
            email: 'huong@angioi.com',
            phone: '0123456789',
            avatar: 'https://placehold.co/80x80',
        };
    };
    const getInitialHeaderProfile = () => {
        try {
            const savedHeaderProfile = localStorage.getItem('staffHeaderProfile');
            if (savedHeaderProfile) {
                return JSON.parse(savedHeaderProfile);
            }
        } catch (error) {
            console.error('Lỗi khi load header profile từ localStorage:', error);
        }
        return {
            name: 'Nguyễn Thị Hương',
            avatar: 'https://placehold.co/80x80',
        };
    };
    const [profile, setProfile] = useState(getInitialProfile);
    const [headerProfile, setHeaderProfile] = useState(getInitialHeaderProfile);

    const [notify, setNotify] = useState({
        appointment: true,
        question: true,
        email: false,
    });
    const [security, setSecurity] = useState({
        current: '',
        new: '',
        confirm: '',
    });
    // Avatar upload handler
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setProfile(p => ({ ...p, avatar: ev.target.result }));
            };
            reader.readAsDataURL(file);
        }
    };
    // Notification for update
    const [profileMsg, setProfileMsg] = useState("");
    const handleProfileUpdate = (e) => {
        e.preventDefault();
        try {
            // Cập nhật thông tin hiển thị trên header
            const newHeaderProfile = {
                name: profile.name,
                avatar: profile.avatar
            };
            setHeaderProfile(newHeaderProfile);
            localStorage.setItem('staffProfile', JSON.stringify(profile));
            localStorage.setItem('staffHeaderProfile', JSON.stringify(newHeaderProfile));
            window.dispatchEvent(new StorageEvent('storage', {
                key: 'staffProfile',
                newValue: JSON.stringify(profile)
            }));
            window.dispatchEvent(new StorageEvent('storage', {
                key: 'staffHeaderProfile',
                newValue: JSON.stringify(newHeaderProfile)
            }));
            setProfileMsg("Cập nhật thông tin thành công!");
            setTimeout(() => setProfileMsg(""), 2000);
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin:', error);
            setProfileMsg("Có lỗi xảy ra khi cập nhật thông tin!");
            setTimeout(() => setProfileMsg(""), 2000);
        }
    };
    // Đồng bộ khi localStorage thay đổi (giữa các tab)
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'staffProfile') {
                try {
                    const savedProfile = localStorage.getItem('staffProfile');
                    if (savedProfile) {
                        setProfile(JSON.parse(savedProfile));
                    }
                } catch {}
            }
            if (e.key === 'staffHeaderProfile') {
                try {
                    const savedHeaderProfile = localStorage.getItem('staffHeaderProfile');
                    if (savedHeaderProfile) {
                        setHeaderProfile(JSON.parse(savedHeaderProfile));
                    }
                } catch {}
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);


    return (
        <Container>
            <StaffSidebar />
            <ContentArea>
                <StaffHeader
                    userName={headerProfile.name}
                    userRole="Nhân viên"
                    avatar={headerProfile.avatar}
                    online={true}
                    welcome={`Chào mừng trở lại, ${headerProfile.name.split(' ').pop()}!`}
                />
                <SettingsContainer>
                    {/* Profile Settings */}
                    <SettingsSection>
                        <SettingsTitle>Thông tin cá nhân</SettingsTitle>
                        {/* Avatar upload */}
                        <form onSubmit={handleProfileUpdate} style={{width: '100%'}}>
                        <FormGroup style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <img src={profile.avatar} alt="Avatar" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e0e0e0', marginBottom: 8 }} />
                                <label htmlFor="avatar-upload" style={{ fontSize: 20, color: '#09a370', cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                                  <i className="fas fa-camera"></i>
                                </label>
                                <input id="avatar-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <Label>Họ và tên</Label>
                                <Input type="text" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
                                <Label>Email</Label>
                                <Input type="email" value={profile.email} disabled style={{ backgroundColor: '#f0f0f0', cursor: 'not-allowed' }} />
                                <Label>Số điện thoại</Label>
                                <Input type="tel" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} />
                            </div>
                        </FormGroup>
                        <Button type="submit">Cập nhật thông tin</Button>
                        {profileMsg && <div style={{color:'#09a370',marginTop:10,fontWeight:500}}>{profileMsg}</div>}
                        </form>
                    </SettingsSection>

                    {/* Notification Settings */}
                    <SettingsSection>
                        <SettingsTitle>Cài đặt thông báo</SettingsTitle>
                        <FormGroup>
                            <SwitchLabel>
                                <span>Thông báo lịch hẹn mới</span>
                                <Switch>
                                    <SwitchInput type="checkbox" checked={notify.appointment} onChange={e => setNotify(n => ({ ...n, appointment: e.target.checked }))} />
                                    <Slider />
                                </Switch>
                            </SwitchLabel>
                        </FormGroup>
                        <FormGroup>
                            <SwitchLabel>
                                <span>Thông báo câu hỏi mới</span>
                                <Switch>
                                    <SwitchInput type="checkbox" checked={notify.question} onChange={e => setNotify(n => ({ ...n, question: e.target.checked }))} />
                                    <Slider />
                                </Switch>
                            </SwitchLabel>
                        </FormGroup>
                        <FormGroup>
                            <SwitchLabel>
                                <span>Thông báo email</span>
                                <Switch>
                                    <SwitchInput type="checkbox" checked={notify.email} onChange={e => setNotify(n => ({ ...n, email: e.target.checked }))} />
                                    <Slider />
                                </Switch>
                            </SwitchLabel>
                        </FormGroup>
                    </SettingsSection>

                    {/* Security Settings */}
                    <SettingsSection>
                        <SettingsTitle>Bảo mật</SettingsTitle>
                        <FormGroup>
                            <Label>Mật khẩu hiện tại</Label>
                            <Input type="password" value={security.current} onChange={e => setSecurity(s => ({ ...s, current: e.target.value }))} placeholder="Nhập mật khẩu hiện tại" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Mật khẩu mới</Label>
                            <Input type="password" value={security.new} onChange={e => setSecurity(s => ({ ...s, new: e.target.value }))} placeholder="Nhập mật khẩu mới" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Xác nhận mật khẩu mới</Label>
                            <Input type="password" value={security.confirm} onChange={e => setSecurity(s => ({ ...s, confirm: e.target.value }))} placeholder="Nhập lại mật khẩu mới" />
                        </FormGroup>
                        <Button>Đổi mật khẩu</Button>
                    </SettingsSection>
                </SettingsContainer>
            </ContentArea>
        </Container>
    );
}
export default StaffCaiDat;