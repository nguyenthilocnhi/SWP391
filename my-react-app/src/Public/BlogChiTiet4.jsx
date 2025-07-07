import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderCustomer from '../components/HeaderCustomer';
import HeaderGuest from '../components/HeaderGuest';
import Footer from '../components/Footer';

const BlogChiTiet4 = ({ userType = 'guest' }) => {
  useEffect(() => {
    document.title = 'Các bệnh tình dục nam là gì? Dấu hiệu bệnh';
  }, []);

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
        <h1 className="main-title">Các bệnh tình dục nam là gì? Dấu hiệu bệnh</h1>
        <p className="date">Ngày đăng: 2 tuần trước</p>
        <section className="content">
          <h2>Bệnh tình dục ở Nam Giới: Nguy Cơ & Dấu Hiệu Nhận Biết</h2>
          <p><strong>Bệnh lây truyền qua đường tình dục (STIs)</strong> có thể ảnh hưởng nghiêm trọng đến sức khỏe sinh sản nếu không được phát hiện sớm. Nhiều bệnh diễn tiến thầm lặng không triệu chứng.</p>
          <h2>Những bệnh tình dục phổ biến ở nam giới</h2>
          <ul>
            <li><strong>Chlamydia:</strong> Tiết dịch dương vật, đau khi tiểu, đau tinh hoàn.</li>
            <li><strong>Lậu:</strong> Chảy mủ, tiểu buốt, sưng bìu.</li>
            <li><strong>Herpes:</strong> Mụn nước, loét, đau rát vùng kín.</li>
            <li><strong>HPV:</strong> Sùi mào gà, nguy cơ ung thư.</li>
            <li><strong>Giang mai:</strong> Loét cứng, phát ban toàn thân.</li>
            <li><strong>HIV:</strong> Mệt mỏi, sốt, sụt cân.</li>
          </ul>
          <img src="https://i.postimg.cc/WznywRd7/B-nh-nam.png" alt="Bệnh ở nam" className="main-image" />
          <h2>Dấu hiệu cảnh báo sớm</h2>
          <ul>
            <li>Chảy mủ, dịch lạ dương vật</li>
            <li>Tiểu buốt, ngứa rát</li>
            <li>Sưng đau tinh hoàn</li>
            <li>Mụn nước hoặc loét quanh dương vật</li>
          </ul>
          <div className="alert-box">
            <strong>Bác sĩ cảnh báo:</strong> STIs ở nam giới thường diễn ra thầm lặng. Khám định kỳ là rất cần thiết.
          </div>
          <h2>Biến chứng nguy hiểm</h2>
          <ul>
            <li>Viêm tinh hoàn, viêm tuyến tiền liệt</li>
            <li>Nguy cơ vô sinh, suy giảm tinh trùng</li>
            <li>Lây cho bạn tình hoặc thai nhi</li>
            <li>Ảnh hưởng tâm lý, tình dục</li>
          </ul>
          <h2>Phòng ngừa hiệu quả</h2>
          <ul>
            <li>Dùng bao cao su khi quan hệ</li>
            <li>Tiêm ngừa HPV</li>
            <li>Không dùng chung đồ vật cá nhân</li>
            <li>Tầm soát STI định kỳ</li>
          </ul>
          <h2>Khi nào nên đi khám nam khoa?</h2>
          <ul>
            <li>Có triệu chứng nghi ngờ</li>
            <li>Sau quan hệ không an toàn</li>
            <li>Nhiều bạn tình hoặc thay bạn tình mới</li>
            <li>Trước khi sinh con, lập gia đình</li>
          </ul>
          <div className="alert-box">
            <strong>Chuyên gia khuyên:</strong> Nam giới cần chủ động với sức khỏe sinh sản của mình. Khám sớm giúp bảo vệ sức khỏe và người thương.
          </div>
          <h2>Kết luận</h2>
          <p>Hiểu rõ về các bệnh tình dục và dấu hiệu cảnh báo giúp nam giới chủ động bảo vệ sức khỏe sinh sản của mình.</p>
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

export default BlogChiTiet4; 