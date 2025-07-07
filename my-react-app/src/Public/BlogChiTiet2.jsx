import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderCustomer from '../components/HeaderCustomer';
import HeaderGuest from '../components/HeaderGuest';
import Footer from '../components/Footer';

const BlogChiTiet2 = ({ userType = 'guest' }) => {
  useEffect(() => {
    document.title = 'Hướng dẫn đọc kết quả xét nghiệm HPV | Blog y tế An Giới';
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
          text-transform: uppercase;
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
        <h1 className="main-title">HƯỚNG DẪN ĐỌC KẾT QUẢ XÉT NGHIỆM HPV</h1>
        <p className="date">Ngày đăng: 1 tuần trước</p>
        <section className="content">
          <h2>HPV là gì?</h2>
          <p>
            HPV, viết tắt của Human Papillomavirus, là một loại virus lây truyền qua đường tình dục rất phổ biến. Có hơn 100
            chủng HPV, trong đó một số chủng nguy cơ cao có thể dẫn đến ung thư cổ tử cung, âm đạo, hậu môn, dương vật,
            miệng hoặc họng. Một số chủng khác ít nguy hiểm hơn có thể gây ra mụn cóc sinh dục.
          </p>
          <h2>Các loại xét nghiệm HPV phổ biến</h2>
          <p>
            Hiện nay, có hai xét nghiệm chính để kiểm tra HPV:
            <strong> Xét nghiệm HPV DNA:</strong> Dùng để phát hiện sự hiện diện của virus HPV, đặc biệt là các chủng nguy cơ cao.
            <strong> Xét nghiệm Pap smear:</strong> Kiểm tra các tế bào ở cổ tử cung để phát hiện các thay đổi bất thường.
          </p>
          <img src="https://i.postimg.cc/bJCVTgrB/H-nh-tin-t-c-8.jpg" alt="HPV Test" className="main-image" />
          <h2>Cách đọc kết quả xét nghiệm HPV</h2>
          <p>
            Khi nhận kết quả xét nghiệm, bạn thường thấy một trong hai dòng chính:
            <strong> "Dương tính"</strong> hoặc <strong> "Âm tính"</strong>.
          </p>
          <ul>
            <li><strong>Âm tính:</strong> Không phát hiện virus HPV nguy cơ cao – dấu hiệu tốt.</li>
            <li><strong>Dương tính:</strong> Có mặt HPV nguy cơ cao – không đồng nghĩa với ung thư nhưng cần theo dõi.</li>
          </ul>
          <h2>Hiểu thêm về chủng HPV</h2>
          <p>
            Hai chủng nguy hiểm nhất là HPV 16 và HPV 18 – gây phần lớn các ca ung thư cổ tử cung. Các chủng khác gồm 31,
            33, 45, 52, 58...
          </p>
          <h2>Nên làm gì nếu kết quả HPV dương tính?</h2>
          <ul>
            <li>Tuân thủ lịch tái khám, xét nghiệm định kỳ.</li>
            <li>Sống lành mạnh, tăng đề kháng.</li>
            <li>Quan hệ an toàn.</li>
            <li>Cân nhắc tiêm vaccine HPV nếu chưa tiêm.</li>
          </ul>
          <h2>Kết luận</h2>
          <p>
            Hiểu rõ kết quả xét nghiệm HPV giúp bạn chủ động chăm sóc sức khỏe sinh sản, phòng ngừa ung thư cổ tử cung, và
            bảo vệ bản thân tốt hơn.
          </p>
          <p className="final-call">
            🎯 <strong>Hành động sớm là bảo vệ sức khỏe lâu dài!</strong> Hãy{' '}
            <Link to="/login">đặt lịch khám</Link> để được các chuyên gia hướng dẫn cụ thể cho trường hợp của bạn.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogChiTiet2; 