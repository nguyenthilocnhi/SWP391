import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderCustomer from '../components/HeaderCustomer';
import HeaderGuest from '../components/HeaderGuest';
import Footer from '../components/Footer';

const BlogChiTiet6 = ({ userType = 'guest' }) => {
  useEffect(() => {
    document.title = 'Nhiễm HPV có mang thai được không? HPV có lây từ mẹ sang con không?';
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
        <h1 className="main-title">Nhiễm HPV có mang thai được không? HPV có lây từ mẹ sang con không?</h1>
        <p className="date">Ngày đăng: 3 ngày trước</p>
        <section className="content">
          <h2>🤰 Nhiễm HPV Có Mang Thai Được Không? HPV Có Lây Từ Mẹ Sang Con?</h2>
          <p>
            Virus HPV (Human Papillomavirus) là một trong những tác nhân gây bệnh lây truyền qua đường tình dục phổ biến nhất hiện nay.
            Với hơn 100 chủng loại, trong đó một số có nguy cơ cao dẫn đến ung thư cổ tử cung. Nhiều phụ nữ thắc mắc:
            <strong>"Nếu nhiễm HPV, liệu có ảnh hưởng đến khả năng mang thai hay thai nhi không?"</strong> – đây là điều mà bạn nên hiểu rõ trước khi lập kế hoạch sinh con.
          </p>
          <h2>Nhiễm HPV có mang thai được không?</h2>
          <p>
            Câu trả lời là: <strong>CÓ</strong>. Phần lớn các trường hợp nhiễm HPV không ảnh hưởng trực tiếp đến khả năng thụ thai hay mang thai.
            Tuy nhiên, một số chủng HPV nguy cơ cao có thể dẫn đến <strong>tổn thương cổ tử cung</strong> (ví dụ như loạn sản, tiền ung thư) khiến việc mang thai hoặc duy trì thai kỳ trở nên phức tạp hơn nếu không được phát hiện và xử lý kịp thời.
          </p>
          <img src="https://i.postimg.cc/J4SNY6j3/Mang-Thai.png" alt="HPV có mang thai được không" className="main-image" />
          <div className="alert-box">
            <strong>Chuyên gia sản phụ khoa lưu ý:</strong> Nhiễm HPV không gây vô sinh, nhưng cần kiểm tra cổ tử cung định kỳ vì tổn thương tiền ung thư có thể ảnh hưởng đến tử cung và sức khỏe thai kỳ.
          </div>
          <h2>HPV có lây từ mẹ sang con không?</h2>
          <p>
            Có. Dù không phổ biến, nhưng trong một số trường hợp hiếm, <strong>HPV có thể lây truyền từ mẹ sang con trong quá trình sinh thường</strong>.
            Trẻ sơ sinh có thể bị nhiễm chủng HPV gây mụn cóc sinh dục hoặc một biến chứng hiếm gặp gọi là <strong>u nhú thanh quản tái phát (RRP)</strong>, ảnh hưởng đến đường thở.
          </p>
          <h2>Nguy cơ lây truyền và biện pháp phòng ngừa</h2>
          <ul>
            <li><strong>Nguy cơ lây truyền:</strong> Thường xảy ra nếu mẹ có sùi mào gà hoạt động tại thời điểm sinh.</li>
            <li><strong>Biện pháp phòng ngừa:</strong> Bác sĩ có thể đề nghị sinh mổ nếu có tổn thương lớn ở vùng sinh dục để giảm nguy cơ lây nhiễm.</li>
          </ul>
          <h2>Mang thai khi nhiễm HPV cần lưu ý gì?</h2>
          <ul>
            <li>Thăm khám sản phụ khoa thường xuyên và theo dõi sát cổ tử cung (Pap smear hoặc xét nghiệm HPV DNA).</li>
            <li>Thông báo cho bác sĩ nếu bạn từng có kết quả bất thường hoặc điều trị sùi mào gà.</li>
            <li>Không nên điều trị laser, đốt lạnh hoặc cắt bỏ tổn thương cổ tử cung trong thai kỳ trừ khi cần thiết.</li>
            <li>Sau sinh, tiếp tục tầm soát và điều trị theo chỉ định để ngăn ngừa ung thư cổ tử cung.</li>
          </ul>
          <h2>HPV có ảnh hưởng đến thai nhi không?</h2>
          <p>
            Đa số thai nhi sinh ra từ mẹ nhiễm HPV vẫn khỏe mạnh.
            Tuy nhiên, trong một số ít trường hợp, nếu thai phụ bị <strong>sùi mào gà nặng</strong>, tổn thương lớn có thể ảnh hưởng đến đường sinh và cần theo dõi sát.
            Không có bằng chứng rõ ràng rằng HPV gây dị tật thai nhi.
          </p>
          <h2>Lời khuyên từ bác sĩ</h2>
          <div className="alert-box">
            <strong>✅ Tiêm phòng HPV từ sớm (9–26 tuổi)</strong> là cách tốt nhất để phòng bệnh.
            Nếu bạn đã nhiễm HPV, vẫn có thể mang thai bình thường – chỉ cần <strong>theo dõi chặt chẽ và có kế hoạch sinh sản an toàn</strong>.
          </div>
          <h2>Kết luận</h2>
          <p>
            💬 Hãy tham khảo ý kiến bác sĩ sản phụ khoa nếu bạn đang lên kế hoạch mang thai và từng có kết quả HPV dương tính.
            <strong>Chăm sóc chủ động</strong> là chìa khóa để có một thai kỳ khỏe mạnh, ngay cả khi đang sống chung với HPV.
          </p>
          <p className="final-call">
            🎯 <strong>Đang lên kế hoạch mang thai?</strong> Hãy{' '}
            <Link to="/datlich">đặt lịch khám</Link> để được các chuyên gia hướng dẫn cụ thể cho trường hợp của bạn.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogChiTiet6; 