import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderCustomer from '../components/HeaderCustomer';
import HeaderGuest from '../components/HeaderGuest';
import Footer from '../components/Footer';

const BlogChiTiet7 = () => {
    useEffect(() => {
        document.title = 'Sinh lý nữ giới tuổi mãn kinh thay đổi thế nào?';
    }, []);

    // Xác định userType dựa vào localStorage
    const isCustomer = localStorage.getItem('loggedIn') === 'true' && localStorage.getItem('role') === 'customer';

    return (
        <div>
            {isCustomer ? <HeaderCustomer /> : <HeaderGuest />}
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
                    <h1 className="main-title">Sinh lý nữ giới tuổi mãn kinh thay đổi thế nào?</h1>
                    <p className="date">Ngày đăng: 1 tháng trước</p>
                    <img
                        src="https://i.postimg.cc/cLwjSfkv/H-nh-tin-t-c-7.jpg"
                        alt="Mãn kinh"
                        className="main-image"
                    />
                    <h2>Mãn kinh là gì?</h2>
                    <p>Mãn kinh là giai đoạn tự nhiên trong cuộc đời người phụ nữ, đánh dấu sự kết thúc của chu kỳ kinh nguyệt và khả năng sinh sản. Thường xảy ra ở độ tuổi 45-55.</p>
                    <h2>Những thay đổi sinh lý ở tuổi mãn kinh</h2>
                    <ul>
                        <li>Rối loạn kinh nguyệt, kinh nguyệt thưa dần rồi dừng hẳn.</li>
                        <li>Bốc hỏa, đổ mồ hôi đêm, mất ngủ.</li>
                        <li>Thay đổi tâm trạng, dễ cáu gắt, lo âu.</li>
                        <li>Khô âm đạo, giảm ham muốn tình dục.</li>
                        <li>Loãng xương, tăng nguy cơ bệnh tim mạch.</li>
                    </ul>
                    <div className="alert-box"><strong>Lưu ý:</strong> Nếu triệu chứng ảnh hưởng nhiều đến chất lượng sống, nên đi khám bác sĩ để được tư vấn.</div>
                    <h2>Làm gì để vượt qua giai đoạn mãn kinh khỏe mạnh?</h2>
                    <ul>
                        <li>Duy trì chế độ ăn giàu canxi, vitamin D, nhiều rau xanh.</li>
                        <li>Tập thể dục đều đặn, kiểm soát cân nặng.</li>
                        <li>Giữ tinh thần lạc quan, chia sẻ với người thân.</li>
                        <li>Thăm khám sức khỏe định kỳ.</li>
                    </ul>
                    <p className="final-call">🌸 <strong>Đang gặp khó khăn ở tuổi mãn kinh?</strong> Hãy <Link to="/datlich">đặt lịch tư vấn</Link> để được chuyên gia hỗ trợ.</p>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default BlogChiTiet7; 