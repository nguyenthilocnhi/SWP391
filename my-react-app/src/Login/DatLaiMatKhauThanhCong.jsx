import React from 'react';
import { Link } from 'react-router-dom';

const DatLaiMatKhauThanhCong = () => {
  const styles = {
    body: {
      fontFamily: "'Inter', sans-serif",
      background: 'linear-gradient(135deg, #e0f7fa, #ffffff)',
      minHeight: '100vh',
      minWidth: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    successBox: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '40px 30px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
      textAlign: 'center',
      width: '100%',
      maxWidth: '450px',
    },
    logo: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textDecoration: 'none',
      color: '#2e7d32',
      marginBottom: '20px',
    },
    logoImg: {
      width: '80px',
      marginBottom: '10px',
      borderRadius: '50%',
    },
    logoH1: {
      fontSize: '20px',
      fontWeight: '600',
      letterSpacing: '1px',
    },
    checkIcon: {
      fontSize: '48px',
      color: '#4caf50',
      marginBottom: '16px',
    },
    h2: {
      fontSize: '22px',
      color: '#333',
      marginBottom: '12px',
      fontWeight: 'bold',
    },
    p: {
      fontSize: '15px',
      color: '#666',
      marginBottom: '24px',
    },
    backBtn: {
      display: 'inline-block',
      padding: '12px 20px',
      backgroundColor: '#4caf50',
      color: '#fff',
      borderRadius: '10px',
      textDecoration: 'none',
      fontWeight: '600',
      transition: 'background-color 0.3s ease',
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.successBox}>
        <Link to="/" style={styles.logo}>
          <img
            src="https://i.postimg.cc/mZjYJ7wm/logo.jpg"
            alt="Logo An Giới"
            style={styles.logoImg}
          />
          <h1 style={styles.logoH1}>AN GIỚI</h1>
        </Link>
        <div style={styles.checkIcon}>✔</div>
        <h2 style={styles.h2}>Đặt lại mật khẩu thành công</h2>
        <p style={styles.p}>
          Bạn đã đặt lại mật khẩu thành công. Hãy đăng nhập lại với mật khẩu mới.
        </p>
        <Link to="/login" style={styles.backBtn}>
          Quay lại đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default DatLaiMatKhauThanhCong; 