import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CaiDat = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    notifications: false,
    twoFA: false,
    darkMode: false,
    language: 'vi',
    avatar: 'https://i.postimg.cc/vZVQXR5n/avatar-default.png'
  });
  const [statusMsg, setStatusMsg] = useState('');

  // CSS Variables
  const cssVars = {
    green: '#22c55e',
    greenDark: '#16a34a',
    red: '#d32f2f',
    redDark: '#b71c1c',
    gray: '#e5e7eb',
    darkBg: '#1e293b',
    darkBox: '#334155',
    darkInput: '#475569',
    darkBorder: '#64748b'
  };

  // Styles
  const styles = {
    page: {
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: settings.darkMode ? cssVars.darkBg : '#ecfdf5',
      boxSizing: 'border-box',
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
      padding: '32px 32px',
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
    deleteBtn: {
      marginTop: '12px',
      padding: '12px',
      width: '100%',
      background: '#facc15',
      color: '#1f2937',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    statusMessage: {
      textAlign: 'center',
      color: cssVars.greenDark,
      marginTop: '16px',
      fontWeight: 500,
    },
    changePasswordLink: {
      display: 'block',
      marginTop: '8px',
      textAlign: 'right',
      color: '#047857',
      fontSize: '14px',
      cursor: 'pointer',
    },
    select: {
      width: '100%',
      padding: '10px 12px',
      borderRadius: '6px',
      border: `1px solid ${cssVars.gray}`,
      backgroundColor: '#fff',
      fontFamily: "'Segoe UI', sans-serif",
      color: '#1f2937',
      fontSize: '16px',
      marginBottom: '8px',
    },
    // Responsive
    '@media (max-width: 900px)': {
      container: {
        flexDirection: 'column',
      },
      left: {
        borderRight: 'none',
        borderBottom: '1px solid #bbf7d0',
      },
      right: {
        padding: '24px 8px',
      },
    },
  };

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('userSettings')) || {};
    setSettings(prev => ({
      ...prev,
      ...savedSettings
    }));
    if (savedSettings.darkMode) {
      document.body.classList.add('dark');
    }
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
    if (settings.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
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
      navigate('/dangnhap');
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('⚠️ Bạn có chắc chắn muốn xóa tài khoản và toàn bộ dữ liệu không?')) {
      localStorage.removeItem('userSettings');
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('sessionExpire');
      localStorage.removeItem('role');
      alert('Tài khoản đã được xóa!');
      navigate('/dangnhap');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Left column */}
        <div style={styles.left}>
          <Link to="/customer">
            <img src="https://i.postimg.cc/prDrNWLF/Screenshot-2025-07-06-235802.png" alt="Logo" style={styles.logo} />
          </Link>
          <div style={styles.avatarWrapper}>
            <label htmlFor="avatarInput" style={styles.avatarClickable}>
              <img id="avatarPreview" src={settings.avatar} alt="Avatar" style={styles.avatarImg} />
              <span style={styles.avatarOverlay}>🖋</span>
            </label>
            <input type="file" id="avatarInput" accept="image/*" hidden onChange={handleAvatarChange} />
          </div>
          <div style={styles.userName}>{settings.name || 'Người dùng'}</div>
        </div>
        {/* Right column */}
        <div style={styles.right}>
          <h2 style={styles.title}>Cài Đặt Tài Khoản</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name" style={styles.label}>Họ tên:</label>
            <input type="text" id="name" name="name" placeholder="Nhập họ tên" disabled value={settings.name} style={styles.input} />

            <label htmlFor="email" style={styles.label}>Email:</label>
            <input type="email" id="email" name="email" placeholder="Nhập email" disabled value={settings.email} style={styles.input} />

            <label htmlFor="password" style={styles.label}>Mật khẩu:</label>
            <input type="password" id="password" name="password" placeholder="********" disabled value={settings.password} style={styles.input} />
            <span
              style={{ ...styles.changePasswordLink, color: "#dc2626" }}
              onClick={() => navigate('/customer/doi-mat-khau')}
            >
              Đổi mật khẩu?
            </span>

            <label htmlFor="phone" style={styles.label}>Số điện thoại:</label>
            <input type="tel" id="phone" name="phone" placeholder="Nhập số điện thoại" value={settings.phone} onChange={handleInputChange} style={styles.input} />

            <label style={styles.label}>
              <input type="checkbox" id="notifications" name="notifications" checked={settings.notifications} onChange={handleNotificationsChange} style={styles.checkbox} />
              Nhận thông báo
            </label>
            <label style={styles.label}>
              <input type="checkbox" id="twoFA" name="twoFA" checked={settings.twoFA} onChange={handleInputChange} style={styles.checkbox} />
              Bật xác thực hai lớp (2FA)
            </label>
            <label style={styles.label}>
              <input type="checkbox" id="darkMode" name="darkMode" checked={settings.darkMode} onChange={handleInputChange} style={styles.checkbox} />
              Chế độ tối
            </label>

            <label htmlFor="langSelect" style={styles.label}>🌐 Ngôn ngữ:</label>
            <select id="langSelect" name="language" value={settings.language} onChange={handleInputChange} style={styles.select}>
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>

            <button type="submit" style={styles.button}>Lưu Cài Đặt</button>
            <button type="button" onClick={handleLogout} style={styles.logoutBtn}>Đăng xuất</button>
            <button type="button" style={styles.deleteBtn} onClick={handleDeleteAccount}>🗑 Xóa tài khoản</button>
          </form>
          <div style={styles.statusMessage}>{statusMsg}</div>
        </div>
      </div>
    </div>
  );
};

export default CaiDat; 