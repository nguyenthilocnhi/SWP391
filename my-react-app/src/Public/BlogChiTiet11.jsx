import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderCustomer from '../components/HeaderCustomer';
import HeaderGuest from '../components/HeaderGuest';
import Footer from '../components/Footer';

const BlogChiTiet11 = () => {
    useEffect(() => {
        document.title = 'Bổ sung sắt đúng cách cho phụ nữ';
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
                    <h1 className="main-title">Bổ sung sắt đúng cách cho phụ nữ</h1>
                    <p className="date">Ngày đăng: 1 tuần trước</p>
                    <img
                        src="https://i.postimg.cc/bYWs70vP/download-2.jpg"
                        alt="Bổ sung sắt"
                        className="main-image"
                    />
                    <h2>Tại sao phụ nữ cần bổ sung sắt?</h2>
                    <p>Sắt là khoáng chất quan trọng giúp tạo máu, đặc biệt cần thiết cho phụ nữ trong độ tuổi sinh sản, mang thai, cho con bú.</p>
                    <h2>Dấu hiệu thiếu sắt</h2>
                    <ul>
                        <li>Mệt mỏi, chóng mặt, da xanh xao.</li>
                        <li>Khó thở, tim đập nhanh.</li>
                        <li>Rụng tóc, móng tay dễ gãy.</li>
                    </ul>
                    <div className="alert-box"><strong>Lưu ý:</strong> Thiếu sắt kéo dài có thể gây thiếu máu nặng, ảnh hưởng sức khỏe.</div>
                    <h2>Bổ sung sắt đúng cách</h2>
                    <ul>
                        <li>Bổ sung qua thực phẩm: thịt đỏ, gan, rau xanh, đậu, hạt.</li>
                        <li>Dùng viên sắt theo chỉ định bác sĩ, không tự ý tăng liều.</li>
                        <li>Kết hợp vitamin C để tăng hấp thu sắt.</li>
                        <li>Tránh uống sắt cùng trà, cà phê.</li>
                    </ul>
                    <p className="final-call">💊 <strong>Bạn có dấu hiệu thiếu sắt?</strong> Hãy <Link to="/datlich">đặt lịch khám</Link> để được tư vấn và bổ sung đúng cách.</p>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default BlogChiTiet11; 