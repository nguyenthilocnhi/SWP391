import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderCustomer from '../components/HeaderCustomer';
import HeaderGuest from '../components/HeaderGuest';
import Footer from '../components/Footer';

const BlogChiTiet9 = () => {
    useEffect(() => {
        document.title = 'Cách phân biệt cảm cúm và cảm lạnh';
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
                    <h1 className="main-title">Cách phân biệt cảm cúm và cảm lạnh</h1>
                    <p className="date">Ngày đăng: 2 tuần trước</p>
                    <img
                        src="https://i.postimg.cc/Rh6q3hX2/images-4.jpg"
                        alt="Cảm cúm vs cảm lạnh"
                        className="main-image"
                    />
                    <h2>Cảm cúm và cảm lạnh là gì?</h2>
                    <p>Cảm cúm và cảm lạnh đều là bệnh nhiễm virus đường hô hấp, nhưng do các loại virus khác nhau gây ra.</p>
                    <h2>Phân biệt cảm cúm và cảm lạnh</h2>
                    <ul>
                        <li><strong>Cảm lạnh:</strong> Khởi phát từ từ, sốt nhẹ hoặc không sốt, đau họng, sổ mũi, ho nhẹ.</li>
                        <li><strong>Cảm cúm:</strong> Khởi phát đột ngột, sốt cao, đau nhức cơ thể, mệt mỏi nhiều, ho khan, đau đầu.</li>
                    </ul>
                    <div className="alert-box"><strong>Lưu ý:</strong> Cảm cúm có thể gây biến chứng nặng, đặc biệt ở người già, trẻ nhỏ, phụ nữ mang thai.</div>
                    <h2>Phòng ngừa cảm cúm và cảm lạnh</h2>
                    <ul>
                        <li>Rửa tay thường xuyên, che miệng khi ho/hắt hơi.</li>
                        <li>Tiêm vaccine cúm hàng năm.</li>
                        <li>Ăn uống đủ chất, nghỉ ngơi hợp lý.</li>
                        <li>Tránh tiếp xúc gần với người bệnh.</li>
                    </ul>
                    <p className="final-call">🦠 <strong>Bạn hoặc người thân có triệu chứng nặng?</strong> Hãy <Link to="/datlich">đặt lịch khám</Link> để được tư vấn kịp thời.</p>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default BlogChiTiet9; 