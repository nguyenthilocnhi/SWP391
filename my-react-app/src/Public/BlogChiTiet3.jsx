import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderCustomer from '../components/HeaderCustomer';
import HeaderGuest from '../components/HeaderGuest';
import Footer from '../components/Footer';

const BlogChiTiet3 = () => {
  useEffect(() => {
    document.title = 'Các bệnh tình dục nữ là gì? Dấu hiệu bệnh';
  }, []);

  // Lấy userType từ localStorage hoặc mặc định là 'guest'
  const savedRole = localStorage.getItem('role');
  const userType = savedRole ? savedRole.toLowerCase() : 'guest';

  return (
    <div>
      {userType === 'customer' ? <HeaderCustomer /> : <HeaderGuest />}
      <style>{`
        .main-content {
          margin-top: 110px;
          min-height: calc(100vh - 110px);
          display: block;
        }
        @media (max-width: 768px) {
          .main-content {
            margin-top: 80px;
            min-height: calc(100vh - 80px);
          }
        }
        main {
          width: 100%;
          padding: 40px 24px;
          background: none;
          border-radius: 0;
          box-shadow: none;
          margin: 0;
        }
        .breadcrumb {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 10px;
        }
        .main-title {
          font-size: 2rem;
          color: #111827;
          margin-bottom: 1.5rem;
          font-weight: bold;
        }
        .content h2 {
          margin-top: 2rem;
          color: #0f172a;
          font-size: 1.25rem;
          border-left: 4px solid #10b981;
          padding-left: 0.5rem;
        }
        ul {
          padding-left: 20px;
        }
        ul li {
          margin-bottom: 8px;
          list-style: none;
        }
        .alert-box {
          padding: 15px;
          background-color: #fff7ed;
          border-left: 5px solid #f97316;
          border-radius: 8px;
          color: #92400e;
          margin-top: 16px;
        }
        .final-call {
          font-size: 16px;
          padding: 16px;
          background: #f0f9ff;
          border-left: 5px solid #0a8e76;
          border-radius: 8px;
          margin-top: 40px;
          color: #0369a1;
        }
        .final-call a {
          color: #0a8e76;
          font-weight: 500;
          text-decoration: underline;
        }
        .main-image {
          width: 100%;
          max-width: 600px;
          display: block;
          margin: 24px auto;
          border-radius: 12px;
        }
        .date {
          color: #888;
          font-size: 14px;
          margin-bottom: 16px;
        }
      `}</style>
      <main className="main-content">
        <Link to="/blog">
          <div className="breadcrumb">Kiến thức y khoa & Xét nghiệm</div>
        </Link>
        <h1 className="main-title">Các bệnh tình dục nữ là gì? Dấu hiệu bệnh</h1>
        <p className="date">Ngày đăng: 2 tuần trước</p>
        <section className="content">
          <h2>Bệnh Tình Dục ở Nữ Giới: Dấu Hiệu, Nguy Cơ & Khi Nào Cần Khám</h2>
          <p><strong>Bệnh lây truyền qua đường tình dục (STIs)</strong> là nhóm bệnh nguy hiểm, chủ yếu lây qua quan hệ tình dục không an toàn. Phụ nữ có nguy cơ cao hơn do sinh lý, việc hiểu và phát hiện sớm giúp phòng ngừa biến chứng.</p>
          <h2>Những bệnh phổ biến ở nữ</h2>
          <ul>
            <li><strong>Chlamydia:</strong> Khí hư bất thường, tiểu buốt.</li>
            <li><strong>Lậu:</strong> Khí hư vàng, mùi hôi, đau rát.</li>
            <li><strong>HPV:</strong> Sùi mào gà, mụn cóc sinh dục.</li>
            <li><strong>Herpes:</strong> Mụn nước, loét, rát vùng kín.</li>
            <li><strong>Giang mai:</strong> Lở loét, phát ban.</li>
            <li><strong>Trichomonas:</strong> Khí hư có bọt, mùi tanh.</li>
          </ul>
          <img src="https://i.postimg.cc/YqB2XQhG/B-nh-n.png" alt="Bệnh ở nữ" className="main-image" />
          <h2>Dấu hiệu cần đi khám</h2>
          <ul>
            <li>Khí hư đổi màu, có mùi nặng.</li>
            <li>Ngứa, rát khi tiểu hoặc quan hệ.</li>
            <li>Mụn hoặc loét lạ ở vùng kín.</li>
            <li>Chảy máu bất thường.</li>
          </ul>
          <div className="alert-box">
            <strong>Lưu ý:</strong> Nhiều bệnh có thể không có triệu chứng. Nên khám định kỳ để phát hiện sớm.
          </div>
          <h2>Biến chứng nếu không điều trị</h2>
          <ul>
            <li>Viêm ống dẫn trứng, vô sinh.</li>
            <li>Ung thư cổ tử cung (HPV).</li>
            <li>Lây nhiễm sang thai nhi.</li>
            <li>Rối loạn nội tiết, sức khỏe giảm.</li>
          </ul>
          <h2>Phòng tránh như thế nào?</h2>
          <ul>
            <li>Quan hệ an toàn (dùng bao cao su).</li>
            <li>Tiêm ngừa HPV từ 9–26 tuổi.</li>
            <li>Tầm soát STI định kỳ.</li>
            <li>Giáo dục giới tính sớm.</li>
          </ul>
          <h2>Kết luận</h2>
          <p>Hiểu rõ về các bệnh tình dục và dấu hiệu cảnh báo giúp bạn chủ động bảo vệ sức khỏe sinh sản của mình.</p>
          <p className="final-call">
            🎯 <strong>Đang có dấu hiệu bất thường?</strong> Hãy{' '}
            <Link to="/login">đặt lịch khám</Link> để được các chuyên gia hướng dẫn cụ thể cho trường hợp của bạn.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogChiTiet3; 