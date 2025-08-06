import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaiDat = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    notifications: false,
    avatar: 'https://i.postimg.cc/SKWH4csZ/Avatar-pnj.jpg'
  });
  const [statusMsg, setStatusMsg] = useState('');

  const cssVars = {
    green: '#22c55e',
    red: '#d32f2f',
    gray: '#e5e7eb'
  };

  const styles = {
    page: {
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ecfdf5',
      margin: 0,
      padding: 0,
    },
    container: {
      width: '100%',
      maxWidth: '900px',
      background: '#fff',
      borderRadius: '16px',
      border: '2px solid #bbf7d0',
      boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
      minHeight: '500px',
    },
    left: {
      flex: 1,
      background: 'linear-gradient(135deg, #bbf7d0 0%, #ecfdf5 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 16px',
      borderRight: '1px solid #bbf7d0',
    },
    right: {
      flex: 2,
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    logo: {
      height: '150px',
      marginBottom: '32px',
    },
    avatarWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '16px',
    },
    avatarClickable: {
      position: 'relative',
      cursor: 'pointer',
    },
    avatarImg: {
      width: '110px',
      height: '110px',
      objectFit: 'cover',
      borderRadius: '50%',
      border: `3px solid ${cssVars.green}`,
      background: '#fff',
    },
    avatarOverlay: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      background: cssVars.green,
      color: '#fff',
      padding: '6px 10px',
      fontSize: '16px',
      borderRadius: '50%',
      transform: 'translate(30%, 30%)',
      pointerEvents: 'none',
    },
    userName: {
      marginTop: '12px',
      fontWeight: 'bold',
      fontSize: '18px',
      color: '#065f46',
      textAlign: 'center',
    },
    title: {
      textAlign: 'center',
      color: '#065f46',
      marginBottom: '24px',
      fontSize: '2rem',
      fontWeight: 700,
    },
    label: {
      fontWeight: 600,
      display: 'block',
      marginTop: '12px',
      marginBottom: '4px',
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      borderRadius: '6px',
      border: `1px solid ${cssVars.gray}`,
      marginBottom: '8px',
      fontSize: '16px',
      boxSizing: 'border-box',
    },
    checkbox: {
      marginRight: '8px',
    },
    button: {
      marginTop: '18px',
      padding: '12px',
      width: '100%',
      background: cssVars.green,
      color: 'white',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    logoutBtn: {
      marginTop: '12px',
      padding: '12px',
      width: '100%',
      background: cssVars.red,
      color: 'white',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    statusMessage: {
      textAlign: 'center',
      color: cssVars.green,
      marginTop: '16px',
      fontWeight: 500,
    },
    changePasswordLink: {
      display: 'block',
      marginTop: '8px',
      textAlign: 'right',
      color: '#dc2626',
      fontSize: '14px',
      cursor: 'pointer',
    },
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://api-gender2.purintech.id.vn/api/Customer/get-user-info', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data && res.data.obj) {
          const user = res.data.obj;
          const savedSettings = JSON.parse(localStorage.getItem('userSettings')) || {};
          setSettings(prev => ({
            ...prev,
            ...savedSettings,
            name: user.fullName || '',
            email: user.email || '',
            phone: user.phoneNumber || ''
          }));
        }
      } catch (err) {
        console.error('Lỗi khi tải thông tin người dùng:', err);
      }
    };

    fetchUserInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSettings(prev => ({
          ...prev,
          avatar: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedSettings = {
      ...settings,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('userSettings', JSON.stringify(updatedSettings));
    setStatusMsg('Đã lưu cài đặt thành công!');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleNotificationsChange = (e) => {
    if (e.target.checked) {
      Notification.requestPermission().then(permission => {
        if (permission !== 'granted') {
          alert('❌ Bạn chưa cho phép nhận thông báo.');
          setSettings(prev => ({
            ...prev,
            notifications: false
          }));
        } else {
          setSettings(prev => ({
            ...prev,
            notifications: true
          }));
        }
      });
    } else {
      setSettings(prev => ({
        ...prev,
        notifications: false
      }));
    }
  };

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc muốn đăng xuất không?')) {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('sessionExpire');
      localStorage.removeItem('role');
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      navigate('/login');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.left}>
          <Link to="/customer">
            <img src="https://i.postimg.cc/prDrNWLF/Screenshot-2025-07-06-235802.png" alt="Logo" style={styles.logo} />
          </Link>
          <div style={styles.avatarWrapper}>
            <label htmlFor="avatarInput" style={styles.avatarClickable}>
              <img src={settings.avatar} alt="Avatar" style={styles.avatarImg} />
              <span style={styles.avatarOverlay}>🖋</span>
            </label>
            <input type="file" id="avatarInput" accept="image/*" hidden onChange={handleAvatarChange} />
          </div>
          <div style={styles.userName}>{settings.name || 'Người dùng'}</div>
        </div>

        <div style={styles.right}>
          <h2 style={styles.title}>Cài Đặt Tài Khoản</h2>
          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Họ tên:</label>
            <input type="text" name="name" disabled value={settings.name} style={styles.input} />

            <label style={styles.label}>Email:</label>
            <input type="email" name="email" disabled value={settings.email} style={styles.input} />

            <label style={styles.label}>Mật khẩu:</label>
            <input type="password" name="password" disabled value="********" style={styles.input} />
            <span
              style={styles.changePasswordLink}
              onClick={() => navigate('/customer/doi-mat-khau')}
            >
              Đổi mật khẩu?
            </span>

            <label style={styles.label}>Số điện thoại:</label>
            <input type="tel" name="phone" value={settings.phone} onChange={handleInputChange} style={styles.input} />

            <label style={styles.label}>
              <input type="checkbox" name="notifications" checked={settings.notifications} onChange={handleNotificationsChange} style={styles.checkbox} />
              Nhận thông báo
            </label>

            <button type="submit" style={styles.button}>Lưu Cài Đặt</button>
            <button type="button" onClick={handleLogout} style={styles.logoutBtn}>Đăng xuất</button>
          </form>
          <div style={styles.statusMessage}>{statusMsg}</div>
        </div>
      </div>
    </div>
  );
};

export default CaiDat;
