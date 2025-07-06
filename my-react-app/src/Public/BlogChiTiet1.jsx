import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderCustomer from '../components/HeaderCustomer';
import HeaderGuest from '../components/HeaderGuest';
import Footer from '../components/Footer';

const BlogChiTiet1 = () => {
  useEffect(() => {
    document.title = 'Chu kỳ kinh nguyệt là gì?';
  }, []);

  // Lấy userType từ localStorage hoặc mặc định là 'guest'
  const savedRole = localStorage.getItem('role');
  const userType = savedRole ? savedRole.toLowerCase() : 'guest';

  return (
    <div>
      {userType === 'customer' ? <HeaderCustomer /> : <HeaderGuest />}
      <style>{`
        body {
          font-family: 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f9f9f9;
        }
        .main-content {
          margin-top: 110px;
          min-height: calc(100vh - 110px);
          display: block;
        }
        a {
          text-decoration: none;
        }
        a:hover {
          text-decoration: none;
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
        }
        .content h2 {
          margin-top: 2rem;
          color: #0f172a;
          font-size: 1.25rem;
          border-left: 4px solid #10b981;
          padding-left: 0.5rem;
        }
        .section {
          margin-bottom: 30px;
        }
        .section h2 {
          font-size: 24px;
          color: #111827;
          margin-bottom: 12px;
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
        <h1 className="main-title">
          Chu kỳ kinh nguyệt là gì? Chu kỳ kinh nguyệt bình thường là bao nhiêu ngày?
        </h1>
        <p className="date">Ngày đăng: 1 tháng trước</p>
        <section className="content">
          <h2>Chu kỳ kinh nguyệt là gì?</h2>
          <p>
            <strong>Chu kỳ kinh nguyệt</strong> là quá trình sinh lý tự nhiên của phụ nữ, điều khiển bởi hormone estrogen
            và progesterone. Mỗi chu kỳ, lớp nội mạc tử cung dày lên để chuẩn bị mang thai. Nếu không thụ tinh, lớp này sẽ
            bong ra dưới dạng máu kinh.
          </p>
          <h2>Chu kỳ kinh nguyệt được tính như thế nào?</h2>
          <p>
            Chu kỳ được tính từ <strong>ngày đầu tiên có kinh</strong> đến <strong>ngày trước kỳ kinh tiếp theo</strong>.
          </p>
          <p>
            Ví dụ: Bắt đầu ngày 1/6 và chu kỳ tiếp theo bắt đầu ngày 29/6 ⇒ Chu kỳ dài 28 ngày.
          </p>
          <img
            src="https://i.postimg.cc/VNWkMvYr/chu-k.png"
            alt="Chu Kì"
            className="main-image"
          />
          <h2>Chu kỳ bình thường kéo dài bao lâu?</h2>
          <p>
            Chu kỳ thường dài từ <strong>21 đến 35 ngày</strong>, phổ biến là 28 ngày. Quan trọng là tính đều đặn.
          </p>
          <div className="alert-box">
            <strong>Lưu ý:</strong> Nếu chu kỳ quá ngắn, quá dài, ra máu nhiều, đau dữ dội,... nên đi khám bác sĩ.
          </div>
          <h2>Vì sao cần theo dõi chu kỳ?</h2>
          <ul>
            <li>Xác định ngày rụng trứng (kế hoạch hóa gia đình)</li>
            <li>Phát hiện sớm rối loạn nội tiết, PCOS</li>
            <li>Chủ động công việc, sinh hoạt</li>
          </ul>
          <h2>Cách theo dõi hiệu quả</h2>
          <p>
            Dùng ứng dụng theo dõi chu kỳ như: <strong>Flo</strong>, <strong>Clue</strong>, <strong>Period Tracker</strong>.
          </p>
          <h2>Khi nào nên khám bác sĩ?</h2>
          <ul>
            <li>Mất kinh &gt; 3 tháng</li>
            <li>Chu kỳ &lt; 21 hoặc &gt; 35 ngày kéo dài</li>
            <li>Ra máu kéo dài hoặc giữa chu kỳ</li>
            <li>Đau dữ dội ảnh hưởng sinh hoạt</li>
          </ul>
          <div className="alert-box">
            <strong>Chuyên gia khuyên:</strong> Theo dõi chu kỳ là một cách chăm sóc sức khỏe sinh sản đơn giản nhưng rất quan trọng.
          </div>
          <h2>Kết luận</h2>
          <p>Hy vọng bài viết giúp bạn hiểu rõ hơn và chăm sóc bản thân tốt hơn mỗi ngày.</p>
          <p className="final-call">
            🎯 <strong>Đang có vấn đề về chu kỳ kinh nguyệt?</strong> Hãy{' '}
            <a href="/datlich">đặt lịch tư vấn</a> để được các chuyên gia hướng dẫn cụ thể cho
            trường hợp của bạn.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogChiTiet1; 