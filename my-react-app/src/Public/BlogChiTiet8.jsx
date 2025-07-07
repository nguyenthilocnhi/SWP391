import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderCustomer from '../components/HeaderCustomer';
import HeaderGuest from '../components/HeaderGuest';
import Footer from '../components/Footer';

const BlogChiTiet8 = ({ userType = 'guest' }) => {
    useEffect(() => {
        document.title = 'U xơ tử cung có nguy hiểm không?';
    }, []);

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
          font-weight: bold;
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
                <Link to="/blog"><div className="breadcrumb">Kiến thức y khoa & Xét nghiệm</div></Link>
                <section className="content">
                    <h1 className="main-title">U xơ tử cung có nguy hiểm không?</h1>
                    <p className="date">Ngày đăng: 3 tuần trước</p>
                    <img
                        src="https://i.postimg.cc/nzLXJ07F/images-3.jpg"
                        alt="U xơ tử cung"
                        className="main-image"
                    />
                    <h2>U xơ tử cung là gì?</h2>
                    <p>U xơ tử cung là khối u lành tính phát triển trong thành tử cung, thường gặp ở phụ nữ trong độ tuổi sinh sản.</p>
                    <h2>Dấu hiệu nhận biết u xơ tử cung</h2>
                    <ul>
                        <li>Kinh nguyệt kéo dài, ra máu nhiều.</li>
                        <li>Đau bụng dưới, cảm giác nặng bụng.</li>
                        <li>Tiểu nhiều lần, táo bón.</li>
                        <li>Đau khi quan hệ tình dục.</li>
                        <li>Có thể không có triệu chứng rõ ràng.</li>
                    </ul>
                    <div className="alert-box"><strong>Lưu ý:</strong> Nếu có triệu chứng bất thường, nên đi khám phụ khoa để phát hiện sớm.</div>
                    <h2>U xơ tử cung có nguy hiểm không?</h2>
                    <p>Phần lớn u xơ là lành tính, nhưng nếu không điều trị có thể gây thiếu máu, vô sinh, ảnh hưởng thai kỳ hoặc biến chứng nguy hiểm.</p>
                    <h2>Điều trị và phòng ngừa</h2>
                    <ul>
                        <li>Khám phụ khoa định kỳ.</li>
                        <li>Điều trị nội khoa hoặc phẫu thuật nếu cần thiết.</li>
                        <li>Chế độ ăn uống lành mạnh, kiểm soát cân nặng.</li>
                    </ul>
                    <p className="final-call">💡 <strong>Bạn lo lắng về u xơ tử cung?</strong> Hãy <Link to="/datlich">đặt lịch tư vấn</Link> để được chuyên gia hỗ trợ.</p>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default BlogChiTiet8; 