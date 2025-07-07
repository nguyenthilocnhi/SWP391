import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderCustomer from '../components/HeaderCustomer';
import HeaderGuest from '../components/HeaderGuest';
import Footer from '../components/Footer';

const BlogChiTiet10 = ({ userType = 'guest' }) => {
    useEffect(() => {
        document.title = 'Phòng tránh bệnh lây qua đường máu';
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
                    <h1 className="main-title">Phòng tránh bệnh lây qua đường máu</h1>
                    <p className="date">Ngày đăng: 2 tuần trước</p>
                    <img
                        src="https://i.postimg.cc/fyGyYsPy/images-5.jpg"
                        alt="Bệnh truyền nhiễm"
                        className="main-image"
                    />
                    <h2>Bệnh lây qua đường máu là gì?</h2>
                    <p>Là các bệnh truyền nhiễm do virus, vi khuẩn lây từ người này sang người khác qua máu (HIV, viêm gan B, C, giang mai...)</p>
                    <h2>Các con đường lây truyền</h2>
                    <ul>
                        <li>Truyền máu, dùng chung kim tiêm.</li>
                        <li>Quan hệ tình dục không an toàn.</li>
                        <li>Từ mẹ sang con khi mang thai, sinh nở.</li>
                        <li>Dùng chung vật dụng cá nhân có dính máu.</li>
                    </ul>
                    <div className="alert-box"><strong>Lưu ý:</strong> Không dùng chung kim tiêm, kiểm tra máu trước truyền, quan hệ an toàn.</div>
                    <h2>Phòng tránh bệnh lây qua đường máu</h2>
                    <ul>
                        <li>Không dùng chung kim tiêm, vật dụng cá nhân.</li>
                        <li>Tiêm vaccine phòng viêm gan B.</li>
                        <li>Kiểm tra sức khỏe định kỳ.</li>
                        <li>Quan hệ tình dục an toàn.</li>
                    </ul>
                    <p className="final-call">🩸 <strong>Bạn cần tư vấn về bệnh lây qua đường máu?</strong> Hãy <Link to="/datlich">đặt lịch khám</Link> để được chuyên gia hỗ trợ.</p>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default BlogChiTiet10; 