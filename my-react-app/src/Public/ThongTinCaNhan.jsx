import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderCustomer from '../components/HeaderCustomer';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

const Container = styled.main`
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
  width: 100vw;
  margin: 0;
  padding: 2rem 0;
  margin-top: 20px;
`;

const ThongTinCaNhan = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    gender: '',
    fullname: '',
    dob: '',
    phone: '',
    address: '',
    insurance: '',
    email: '',
    note: ''
  });

  useEffect(() => {
    // Load saved data from localStorage
    const savedData = JSON.parse(localStorage.getItem("userInfo")) || {};
    setFormData(prevData => ({ ...prevData, ...savedData }));
  }, []);

  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userInfo", JSON.stringify(formData));
    showAlertMessage("✅ Thông tin đã được lưu!");
  };

  return (
    <div>
      <Helmet>
        <title>THÔNG TIN CÁ NHÂN</title>
      </Helmet>
      <HeaderCustomer />
      
      {/* Alert Box */}
      {showAlert && (
        <div className="alert-box">
          <p>{alertMessage}</p>
          <span onClick={() => setShowAlert(false)}>&times;</span>
        </div>
      )}

      {/* Main Content */}
      <Container>
        <div className="intro-2">THÔNG TIN CÁ NHÂN</div>

        <div className="profile-section">
          {/* Profile Photo */}
          <div className="profile-photo">
            <img 
              src="https://i.postimg.cc/SKWH4csZ/Avatar-pnj.jpg" 
              alt="Ảnh đại diện"
            />
            <p>Ảnh đại diện</p>
          </div>

          {/* Information Form */}
          <form className="info-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Mã ID</label>
              <input 
                type="text" 
                name="id" 
                value={formData.id}
                onChange={handleInputChange}
                readOnly 
              />
            </div>
            
            <div className="form-group">
              <label>Giới tính</label>
              <select 
                name="gender" 
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Họ và tên</label>
              <input 
                type="text" 
                name="fullname" 
                value={formData.fullname}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Ngày sinh</label>
              <input 
                type="date" 
                name="dob" 
                value={formData.dob}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Số điện thoại</label>
              <input 
                type="text" 
                name="phone" 
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Địa chỉ</label>
              <input 
                type="text" 
                name="address" 
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Mã bảo hiểm</label>
              <input 
                type="text" 
                name="insurance" 
                value={formData.insurance}
                onChange={handleInputChange}
                readOnly 
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label>Ghi chú</label>
              <textarea 
                name="note" 
                value={formData.note}
                onChange={handleInputChange}
              ></textarea>
            </div>
            
            <div className="form-group right-align">
              <button className="edit-button" type="submit">
                CHỈNH SỬA
              </button>
            </div>
          </form>
        </div>
      </Container>

      <style jsx>{`
        /* Alert Box */
        .alert-box {
          position: fixed;
          top: 95px;
          right: 20px;
          background-color: #10b981;
          color: white;
          padding: 3px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 1000;
          animation: slideIn 0.3s ease;
        }

        .alert-box p {
          margin: 0;
        }

        .alert-box span {
          font-weight: bold;
          cursor: pointer;
          font-size: 18px;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Main Content */
        .personal-info-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: #f9f9f9;
          padding-top: 110px;
        }

        .intro-2 {
          font-size: 24px;
          font-weight: 600;
          text-align: center;
          margin-bottom: 2rem;
          color: #111827;
        }

        .profile-section {
          display: grid;
          grid-template-columns: 1fr 3fr;
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.04);
          padding: 40px 32px;
        }

        .profile-photo {
          text-align: center;
        }

        .profile-photo img {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 0.5rem;
        }

        .profile-photo p {
          font-size: 14px;
          color: #6b7280;
        }

        .info-form {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem 2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-size: 14px;
          color: #374151;
          margin-bottom: 0.25rem;
          font-weight: 500;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .form-group.right-align {
          grid-column: span 2;
          text-align: right;
        }

        .edit-button {
          background-color: #0e6c40;
          color: black;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .edit-button:hover {
          background-color: #1e40af;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .profile-section {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .info-form {
            grid-template-columns: 1fr;
          }
          
          .form-group.right-align {
            grid-column: span 1;
          }
        }
      `}</style>
      <Footer />
    </div>
  );
};

export default ThongTinCaNhan;
