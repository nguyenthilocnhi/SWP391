import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderCustomer from '../components/HeaderCustomer';
import HeaderGuest from '../components/HeaderGuest';
import Footer from '../components/Footer';

const BlogChiTiet12 = ({ userType = 'guest' }) => {
    useEffect(() => {
        document.title = 'Chế độ ăn tốt cho sức khỏe sinh sản';
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
                    <h1 className="main-title">Chế độ ăn tốt cho sức khỏe sinh sản</h1>
                    <p className="date">Ngày đăng: 5 ngày trước</p>
                    <img
                        src="https://i.postimg.cc/3JGdYyyv/download-3.jpg"
                        alt="Ăn uống lành mạnh"
                        className="main-image"
                    />
                    <h2>Tại sao chế độ ăn quan trọng với sức khỏe sinh sản?</h2>
                    <p>Chế độ ăn cân đối giúp duy trì hormone, tăng khả năng thụ thai và phòng ngừa nhiều bệnh lý sinh sản.</p>
                    <h2>Nhóm thực phẩm tốt cho sức khỏe sinh sản</h2>
                    <ul>
                        <li>Rau xanh, trái cây tươi giàu vitamin và chất chống oxy hóa.</li>
                        <li>Thực phẩm giàu protein: cá, thịt nạc, trứng, đậu.</li>
                        <li>Ngũ cốc nguyên hạt, hạt dinh dưỡng.</li>
                        <li>Chất béo lành mạnh: dầu oliu, quả bơ, cá hồi.</li>
                        <li>Uống đủ nước mỗi ngày.</li>
                    </ul>
                    <div className="alert-box"><strong>Lưu ý:</strong> Hạn chế đồ ngọt, thức ăn nhanh, rượu bia, thuốc lá.</div>
                    <h2>Lời khuyên để tăng khả năng sinh sản</h2>
                    <ul>
                        <li>Duy trì cân nặng hợp lý.</li>
                        <li>Tập thể dục đều đặn.</li>
                        <li>Kiểm tra sức khỏe sinh sản định kỳ.</li>
                        <li>Giảm stress, ngủ đủ giấc.</li>
                    </ul>
                    <p className="final-call">🥗 <strong>Bạn muốn tư vấn về dinh dưỡng sinh sản?</strong> Hãy <Link to="/datlich">đặt lịch tư vấn</Link> với chuyên gia.</p>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default BlogChiTiet12; 