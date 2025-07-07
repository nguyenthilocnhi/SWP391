import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderCustomer from '../components/HeaderCustomer';
import HeaderGuest from '../components/HeaderGuest';
import Footer from '../components/Footer';

const BlogChiTiet5 = ({ userType = 'guest' }) => {
  useEffect(() => {
    document.title = 'Bệnh Herpes lây qua đường nào?';
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
        <h1 className="main-title">Bệnh Herpes lây qua đường nào?</h1>
        <p className="date">Ngày đăng: 1 tuần trước</p>
        <section className="content">
          <h2>🔍 Bệnh Herpes Lây Qua Đường Nào? Những Con Đường Âm Thầm Gây Nguy Hiểm</h2>
          <p>
            <strong>Herpes sinh dục</strong> là một trong những bệnh lây truyền qua đường tình dục (STIs) phổ biến, do virus herpes simplex (HSV) gây ra.
            Có hai tuýp virus chính: <strong>HSV-1</strong> thường gây Herpes miệng và <strong>HSV-2</strong> thường liên quan đến Herpes sinh dục – tuy nhiên cả hai đều có thể lây nhiễm chéo nếu không phòng ngừa đúng cách.
          </p>
          <h2>Bệnh Herpes lây qua những đường nào?</h2>
          <ul>
            <li><strong>Quan hệ tình dục:</strong> Bao gồm cả đường âm đạo, hậu môn và đường miệng với người nhiễm HSV.</li>
            <li><strong>Tiếp xúc da – da:</strong> Virus lây lan qua vùng da, niêm mạc có vết loét, kể cả khi không quan hệ xâm nhập.</li>
            <li><strong>Hôn môi, quan hệ bằng miệng:</strong> Nếu người mang HSV có vết Herpes miệng (mụn nước, lở loét), virus có thể truyền sang cơ quan sinh dục và ngược lại.</li>
            <li><strong>Dùng chung đồ cá nhân:</strong> Như khăn tắm, dao cạo, son môi… nếu tiếp xúc với dịch mủ chứa virus (hiếm gặp nhưng vẫn có khả năng).</li>
            <li><strong>Lây từ mẹ sang con:</strong> Trong quá trình sinh thường nếu người mẹ có Herpes sinh dục đang hoạt động.</li>
          </ul>
          <h2>Herpes có lây khi không có triệu chứng không?</h2>
          <p>
            Có. Đây là điều khiến Herpes trở nên nguy hiểm – <strong>virus vẫn có thể lây lan ngay cả khi người mang mầm bệnh không có dấu hiệu rõ ràng</strong>.
            Điều này được gọi là "lây truyền không triệu chứng".
          </p>
          <img src="https://i.postimg.cc/SNjR5c4m/Herpes.png" alt="Herpes" className="main-image" />
          <div className="alert-box">
            <strong>Lưu ý từ tư vấn viên:</strong> Không cần có vết loét mới có thể lây bệnh. Ngay cả khi da trông bình thường, virus vẫn có thể hoạt động và lây truyền nếu tiếp xúc gần.
          </div>
          <h2>Làm sao để phòng ngừa Herpes hiệu quả?</h2>
          <ul>
            <li>Luôn sử dụng bao cao su khi quan hệ, kể cả quan hệ bằng miệng</li>
            <li>Tránh quan hệ khi bạn tình có dấu hiệu mụn nước, loét miệng hoặc vùng kín</li>
            <li>Không dùng chung đồ cá nhân với người nghi nhiễm</li>
            <li>Xét nghiệm định kỳ nếu có nhiều bạn tình</li>
            <li>Phụ nữ mang thai nên xét nghiệm HSV để phòng ngừa lây sang thai nhi</li>
          </ul>
          <h2>Khi nào nên đi khám?</h2>
          <ul>
            <li>Khi xuất hiện mụn nước, lở loét vùng miệng hoặc vùng kín</li>
            <li>Ngứa rát hoặc nóng ở vùng sinh dục trước khi mụn nước xuất hiện</li>
            <li>Bạn tình có tiền sử Herpes hoặc triệu chứng nghi ngờ</li>
          </ul>
          <h2>Kết luận</h2>
          <p>
            Herpes tuy không thể chữa khỏi hoàn toàn, nhưng có thể <strong>kiểm soát bằng thuốc kháng virus</strong> và phòng ngừa lây lan hiệu quả.
            Chủ động thăm khám và điều trị là cách bảo vệ sức khỏe bản thân và cộng đồng.
          </p>
          <div className="alert-box">
            <strong>Chuyên gia nhắc nhở:</strong> Bệnh Herpes không chỉ là vấn đề cá nhân – mà còn là trách nhiệm cộng đồng trong phòng tránh lây nhiễm.
          </div>
          <p className="final-call">
            🎯 <strong>Đang có dấu hiệu nghi ngờ Herpes?</strong> Hãy{' '}
            <Link to="/datlich">đặt lịch khám</Link> để được các chuyên gia hướng dẫn cụ thể cho trường hợp của bạn.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogChiTiet5; 