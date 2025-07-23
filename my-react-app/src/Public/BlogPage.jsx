import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import HeaderGuest from '../components/HeaderGuest';
import HeaderCustomer from '../components/HeaderCustomer';
import Footer from '../components/Footer';


const POSTS_PER_PAGE = 8;



// Dữ liệu blog gắn trực tiếp
const blogData = [
  {
    "id": 1,
    "title": "Chu kỳ kinh nguyệt là gì?",
    "date": "1 tháng trước",
    "image": "https://i.postimg.cc/90x2yyHm/H-nh-tin-t-c-1.png",
    "alt": "Chu kì kinh nguyệt",
    "link": "/blog/1",
    "tags": ["sinh lý", "nữ"]
  },
  {
    "id": 2,
    "title": "Hướng dẫn đọc kết quả xét nghiệm HPV",
    "date": "1 tháng trước",
    "image": "https://i.postimg.cc/RVF44pwN/H-nh-tin-t-c-2.jpg",
    "alt": "HPV",
    "link": "/blog/2",
    "tags": ["xét nghiệm", "HPV"]
  },
  {
    "id": 3,
    "title": "Các bệnh tình dục nữ là gì? Dấu hiệu bệnh",
    "date": "1 tháng trước",
    "image": "https://i.postimg.cc/SNvqsLGV/H-nh-tin-t-c-3.jpg",
    "alt": "Bệnh phụ nữ",
    "link": "/blog/3",
    "tags": ["bệnh lý", "nữ"]
  },
  {
    "id": 4,
    "title": "Các bệnh tình dục nam là gì? Dấu hiệu bệnh",
    "date": "1 tháng trước",
    "image": "https://i.postimg.cc/tTkGHFT3/H-nh-tin-t-c-4.jpg",
    "alt": "Bệnh nam giới",
    "link": "/blog/4",
    "tags": ["bệnh lý", "nam"]
  },
  {
    "id": 5,
    "title": "Bệnh Herpes lây qua đường nào?",
    "date": "1 tháng trước",
    "image": "https://i.postimg.cc/YSB5GdLN/H-nh-tin-t-c-5.jpg",
    "alt": "Herpes",
    "link": "/blog/5",
    "tags": ["bệnh lây", "herpes"]
  },
  {
    "id": 6,
    "title": "Nhiễm HPV có mang thai được không?",
    "date": "1 tháng trước",
    "image": "https://i.postimg.cc/nc65g328/H-nh-tin-t-c-6.jpg",
    "alt": "HPV và thai sản",
    "link": "/blog/6",
    "tags": ["HPV", "thai sản"]
  },
  {
    "id": 7,
    "title": "Sinh lý nữ giới tuổi mãn kinh thay đổi thế nào?",
    "date": "1 tháng trước",
    "image": "https://i.postimg.cc/cLwjSfkv/H-nh-tin-t-c-7.jpg",
    "alt": "Mãn kinh",
    "link": "/blog/7",
    "tags": ["mãn kinh", "nữ"]
  },
  {
    "id": 8,
    "title": "U xơ tử cung có nguy hiểm không?",
    "date": "3 tuần trước",
    "image": "https://i.postimg.cc/nzLXJ07F/images-3.jpg",
    "alt": "U xơ tử cung",
    "link": "/blog/8",
    "tags": ["phụ khoa", "u xơ"]
  },
  {
    "id": 9,
    "title": "Cách phân biệt cảm cúm và cảm lạnh",
    "date": "2 tuần trước",
    "image": "https://i.postimg.cc/Rh6q3hX2/images-4.jpg",
    "alt": "Cảm cúm vs cảm lạnh",
    "link": "/blog/9",
    "tags": ["miễn dịch", "hô hấp"]
  },
  {
    "id": 10,
    "title": "Phòng tránh bệnh lây qua đường máu",
    "date": "2 tuần trước",
    "image": "https://i.postimg.cc/fyGyYsPy/images-5.jpg",
    "alt": "Bệnh truyền nhiễm",
    "link": "/blog/10",
    "tags": ["lây nhiễm", "máu"]
  },
  {
    "id": 11,
    "title": "Bổ sung sắt đúng cách cho phụ nữ",
    "date": "1 tuần trước",
    "image": "https://i.postimg.cc/bYWs70vP/download-2.jpg",
    "alt": "Bổ sung sắt",
    "link": "/blog/11",
    "tags": ["dinh dưỡng", "phụ nữ"]
  },
  {
    "id": 12,
    "title": "Chế độ ăn tốt cho sức khỏe sinh sản",
    "date": "5 ngày trước",
    "image": "https://i.postimg.cc/3JGdYyyv/download-3.jpg",
    "alt": "Ăn uống lành mạnh",
    "link": "/blog/12",
    "tags": ["dinh dưỡng", "sinh sản"]
  }
];

function convertToDays(dateStr) {
  if (!dateStr) return Infinity;
  const lower = dateStr.toLowerCase();
  if (lower.includes("ngày")) return parseInt(lower) || Infinity;
  if (lower.includes("tuần")) return (parseInt(lower) || Infinity) * 7;
  if (lower.includes("tháng")) return (parseInt(lower) || Infinity) * 30;
  return Infinity;
}

function getPublishedBlogsFromLocalStorage() {
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  return blogs.filter(blog => blog.status === "published");
}

function formatDateVN(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (isNaN(d)) return '';
  return d.toLocaleDateString('vi-VN');
}

const BlogPage = ({ userType = 'guest' }) => {
  const [blogs, setBlogs] = useState([]);
  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const emailRef = useRef();
  const blogGridRef = useRef();

  // Lấy bài viết đã duyệt từ server
  const loadPublishedBlogs = async () => {
    try {
      const res = await fetch('https://api-gender2.purintech.id.vn/api/Blog');
      if (res.ok) {
        const data = await res.json();
        const published = data.filter(blog => blog.status === 'published');
        // Gộp blogData với bài viết từ API, ưu tiên bài từ API lên đầu
        const allBlogs = [...published, ...blogData];
        setBlogs(allBlogs);
        setDisplayedBlogs(allBlogs);
      } else {
        setBlogs(blogData);
        setDisplayedBlogs(blogData);
      }
    } catch (err) {
      setBlogs(blogData);
      setDisplayedBlogs(blogData);
    }
  };

  useEffect(() => {
    loadPublishedBlogs();
  }, []);

  // Tìm kiếm
  useEffect(() => {
    const keyword = search.toLowerCase();
    const filtered = blogs.filter(blog =>
      (blog.title && blog.title.toLowerCase().includes(keyword)) ||
      (blog.tags && (Array.isArray(blog.tags)
        ? blog.tags.some(tag => tag.toLowerCase().includes(keyword))
        : blog.tags.toLowerCase().includes(keyword)))
    );
    setDisplayedBlogs(filtered);
    setCurrentPage(1);
  }, [search, blogs]);

  const paginatedBlogs = displayedBlogs.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleSubscribe = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);
  const handleSubmitEmail = () => {
    const email = emailRef.current.value.trim();
    if (email) {
      alert('Cảm ơn bạn đã theo dõi blog!');
      setShowPopup(false);
      emailRef.current.value = '';
    } else {
      alert('Vui lòng nhập email hợp lệ.');
    }
  };

  const scrollToPosts = (e) => {
    e.preventDefault();
    blogGridRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const totalPages = Math.ceil(displayedBlogs.length / POSTS_PER_PAGE);

  useEffect(() => {
    document.title = 'Blog Sức Khỏe - An Giới';
  }, []);

  return (
    <div className="blog-root">
      {userType === 'customer' ? <HeaderCustomer /> : <HeaderGuest />}
      <style>{`
        html, body, #root {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
        }

        .blog-root {
          min-height: 100vh;
          width: 99vw;
          background-color: #f9f9f9;
          box-sizing: border-box;
          overflow-x: hidden;
        }

        body {
          font-family: 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f9f9f9;
        }
        .statistic-section {
          padding: 40px 20px;
          display: flex;
          justify-content: center;
        }
        .statistic-box {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .stat-item {
          background-color: #ffffff;
          padding: 20px 30px;
          border-radius: 16px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
          min-width: 180px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .stat-item img {
          width: 40px;
          height: 40px;
          margin-bottom: 10px;
        }
        .stat-item h3 {
          margin: 0;
          font-size: 22px;
          font-weight: bold;
          color: #1f2937;
        }
        .stat-item p {
          margin: 4px 0 0;
          color: #555;
          font-size: 15px;
        }
        .intro-banner {
          position: relative;
          background: linear-gradient(135deg, #1fc8db, #2cb5a0);
          padding: 60px 16px;
          border-radius: 20px 20px 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin-top: 110px;
          margin-bottom: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          min-height: 220px;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }
        .intro-banner::before {
          content: "📚";
          font-size: 120px;
          color: rgba(255, 255, 255, 0.08);
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-20deg);
          pointer-events: none;
        }
        .intro-banner .overlay {
          position: relative;
          z-index: 1;
          max-width: 960px;
          text-align: center;
          color: white;
          padding: 0 10px;
        }
        .intro-content h1 {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          animation: fadeInUp 0.6s ease forwards;
        }
        .intro-content p {
          font-size: 16px;
          line-height: 1.5;
          color: rgba(229, 236, 233, 0.95);
          animation: fadeInUp 0.8s ease forwards;
        }
        .intro-content .emoji {
          font-size: 34px;
        }
        @media (max-width: 600px) {
          .intro-content h1 {
            font-size: 20px;
          }
          .intro-content p {
            font-size: 14px;
          }
          .intro-content .emoji {
            font-size: 26px;
          }
          .intro-banner {
            padding: 40px 12px;
            min-height: 180px;
            margin-top: 80px;
          }
          .intro-banner::before {
            font-size: 80px;
          }
        }
        .cta-buttons {
          margin-top: 20px;
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-primary,
        .btn-outline {
          padding: 12px 24px;
          font-size: 16px;
          border-radius: 30px;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .btn-primary {
          background-color: #ffffff;
          color: #10b981;
          font-weight: 600;
          border: none;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .btn-primary:hover {
          background-color: #f0fdf4;
          color: #059669;
        }
        .btn-outline {
          border: 2px solid #ffffff;
          color: #10b981;
          font-weight: 600;
          background: #fff;
        }
        .btn-outline:hover {
          background-color: #e8f5e9;
          border-color: #10b981;
          color: #059669;
        }
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(15, 23, 42, 0.6);
          display: none;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 16px;
        }
        .popup-overlay[style*="display: flex"] {
          display: flex !important;
        }
        .popup {
          background: #ffffff;
          padding: 24px;
          border-radius: 16px;
          width: 100%;
          max-width: 360px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          text-align: center;
          font-family: 'Inter', sans-serif;
        }
        .popup h2 {
          font-size: 18px;
          margin-bottom: 16px;
          color: #1e293b;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 600;
        }
        .popup h2 .emoji {
          font-size: 20px;
        }
        .popup input {
          display: block;
          margin: 0 auto 20px auto;
          width: 80%;
          max-width: 260px;
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 12px;
          font-size: 15px;
          outline: none;
          transition: 0.2s ease;
          box-sizing: border-box;
        }
        .popup input:focus {
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
        }
        .popup-actions {
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        .popup-actions button {
          padding: 10px 20px;
          font-size: 14px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          background: #10b981;
          color: white;
          font-weight: 500;
          transition: background 0.3s ease;
        }
        .popup-actions button:hover {
          background-color: #059669;
        }
        .search-bar {
          max-width: 600px;
          margin: 30px auto;
          text-align: center;
        }
        .search-bar input {
          width: 90%;
          padding: 12px 18px;
          border: 1px solid #d1d5db;
          border-radius: 30px;
          font-size: 16px;
          outline: none;
        }
        .search-bar input:focus {
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
        }
        .blog-container {
          padding: 40px 20px;
          max-width: 1200px;
          margin: 5px auto;
        }
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
          justify-items: center;
        }
        .blog-card {
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          width: 100%;
          max-width: 350px;
        }
        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        }
        .blog-card a {
          color: inherit;
          text-decoration: none;
          display: block;
        }
        .blog-card img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          display: block;
        }
        .blog-card .content {
          padding: 16px;
        }
        .blog-card .content h2 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #1f2937;
        }
        .blog-card .content .date {
          font-size: 14px;
          color: #6b7280;
        }
        @media (max-width: 480px) {
          .intro-banner h1 {
            font-size: 20px;
          }
          .blog-card .content h2 {
            font-size: 16px;
          }
          .blog-card img {
            height: 160px;
          }
        }
        .pagination {
          text-align: center;
          margin-top: 30px;
        }
        .pagination button {
          background: #fff;
          border: 1px solid #ccc;
          color: #333;
          padding: 8px 12px;
          margin: 0 4px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .pagination button:hover {
          background-color: #10b981;
          color: #fff;
          border-color: #10b981;
        }
        .pagination button.active {
          background-color: #10b981;
          color: white;
          font-weight: bold;
        }
        .pagination button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
      {/* Banner */}
      <section className="intro-banner">
        <div className="overlay">
          <div className="intro-content">
            <h1><span className="emoji">📚</span> KIẾN THỨC Y KHOA & CHIA SẺ KINH NGHIỆM</h1>
            <p>Cập nhật thông tin sức khỏe từ các chuyên gia An Giới</p>
            <div className="cta-buttons">
              <a href="#blogGrid" className="btn-primary scroll-to-posts" onClick={scrollToPosts}>Xem bài viết mới</a>
              <button className="btn-outline" onClick={handleSubscribe}>Theo dõi blog</button>
            </div>
            {/* POPUP */}
            {showPopup && (
              <div className="popup-overlay" style={{display: 'flex'}}>
                <div className="popup">
                  <h2><span className="emoji">📩</span> Nhập email để theo dõi blog</h2>
                  <input type="email" placeholder="Nhập email của bạn..." ref={emailRef} />
                  <div className="popup-actions">
                    <button onClick={handleSubmitEmail}>Gửi</button>
                    <button onClick={handleClosePopup}>Đóng</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Search */}
      <div className="search-bar">
        <input
          type="text"
          placeholder=" Tìm kiếm bài viết..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Blog grid */}
      <section className="blog-grid" id="blogGrid" ref={blogGridRef}>
        {paginatedBlogs.length === 0 ? (
          <p style={{textAlign: 'center'}}>Không tìm thấy bài viết phù hợp.</p>
        ) : (
          paginatedBlogs.map((blog, idx) => {
            // Ưu tiên ảnh preview, sau đó đến image, sau đó đến ảnh mẫu
            const imgSrc = blog.imagePreview || blog.image || blog.imageUrl || blog.image_link || blog.image_link_url || blog.image_link_src || '';
            // Ngày: nếu có date thì dùng, nếu có createdAt thì format lại, nếu không thì để trống
            let dateStr = blog.date;
            if (!dateStr && blog.createdAt) dateStr = formatDateVN(blog.createdAt);
            return (
              <article className="blog-card" key={blog.id || idx}>
                <Link to={userType === 'customer' ? `/customer${blog.link || `/blog/${blog.id}`}` : (blog.link || `/blog/${blog.id}`)}>
                  {imgSrc && <img src={imgSrc} alt={blog.alt || blog.title || 'Blog image'} loading="lazy" />}
                  <div className="content">
                    <h2>{blog.title}</h2>
                    <p className="date">{dateStr}</p>
                  </div>
                </Link>
              </article>
            );
          })
        )}
      </section>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>←</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>→</button>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage; 