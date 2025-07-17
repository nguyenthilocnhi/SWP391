import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

const styles = {
  body: {
    backgroundColor: '#f0fff4',
    fontFamily: 'Segoe UI, sans-serif',
    textAlign: 'center',
    minHeight: '100vh',
    width: '100vw',
    padding: '100px 20px',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
  },
  heading: {
    color: '#2f855a',
    fontSize: 32,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    margin: '10px 6px',
    padding: '10px 20px',
    background: '#38a169',
    color: 'white',
    borderRadius: 6,
    textDecoration: 'none',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontSize: 16,
  },
  buttonHover: {
    backgroundColor: '#2f855a',
  },
  linkMeetMessage: {
    marginTop: 20,
    background: '#fefce8',
    border: '1px solid #facc15',
    padding: 20,
    borderRadius: 8,
    color: '#92400e',
    fontSize: 16,
    maxWidth: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
  btnWrapper: {
    marginTop: 12,
    textAlign: 'center',
  },
  homeLink: {
    margin: '10px 6px',
    padding: '10px 20px',
    background: '#38a169',
    color: 'white',
    borderRadius: 6,
    textDecoration: 'none',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontSize: 16,
    display: 'inline-block',
    textAlign: 'center',
  },
};

export default function ThanhCong() {
  const [meetLink, setMeetLink] = useState(null);
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  const meetLinkFromState = location.state?.meetLink;

  useEffect(() => {
    document.title = 'Thành Công';
    if (meetLinkFromState) {
      setMeetLink(meetLinkFromState);
    } else {
      // Lấy lịch đặt mới nhất từ localStorage nếu không có trong state
      const danhSach = JSON.parse(localStorage.getItem('lichDat')) || [];
      const lichMoiNhat = danhSach[danhSach.length - 1] || {};
      setMeetLink(lichMoiNhat.meetLink || null);
    }
  }, [meetLinkFromState]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert('❌ Không thể sao chép link.');
    }
  };

  return (
    <div style={styles.body}>
      <h2 style={styles.heading}>🎉 Đặt lịch thành công!</h2>
      <div style={styles.linkMeetMessage}>
        {meetLink ? (
          <>
            <div style={{ textAlign: 'center' }}>
              💻 Bạn đã chọn hình thức tư vấn <strong>Online</strong>.<br />
              Đây là link Google Meet của bạn:
            </div>
            <div style={{ margin: '8px 0', textAlign: 'center' }}>
              <a
                href={meetLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#d97706', fontWeight: 'bold', wordBreak: 'break-all' }}
              >
                {meetLink}
              </a>
            </div>
            <div style={styles.btnWrapper}>
              <button
                style={styles.button}
                onClick={() => copyToClipboard(meetLink)}
              >
                📋 Sao chép link
              </button>
              <button
                style={styles.button}
                onClick={() => window.open(meetLink, '_blank')}
              >
                🚀 Mở Meet ngay
              </button>
            </div>
            {copied && (
              <div style={{ color: '#38a169', marginTop: 8, fontWeight: 500, textAlign: 'center' }}>
                ✅ Link Meet đã được sao chép!
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            Cảm ơn bạn đã đặt lịch! Vui lòng đợi xác nhận.
          </div>
        )}
      </div>
      <a
        href="/customer"
        style={{ ...styles.homeLink, marginTop: 32 }}
      >
        Về trang chủ
      </a>
    </div>
  );
} 