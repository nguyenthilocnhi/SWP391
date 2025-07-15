import React, { useEffect, useState } from "react";
import ConsultantSidebar from "../components/ConsultantSidebar";
import ConsultantTopbar from "../components/ConsultantTopbar";
import { FaStar, FaRegStar, FaFilter, FaSort, FaSearch, FaCalendarAlt, FaUser } from "react-icons/fa";
import { useLocation } from "react-router-dom";


const ConsultantDanhGia = () => {
  const [consultantName] = useState("Nguyễn Thị Huyền");
  const [notificationCount] = useState(3);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [filterRating, setFilterRating] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  });

  const location = useLocation();
  const { appointmentCount, questionCount, ratingScore } = location.state || {};
  useEffect(() => {
    filterAndSortReviews();
  }, [reviews, filterRating, sortBy, searchTerm]);

  const loadReviews = () => {
    // Lấy đánh giá từ localStorage (kết nối với trang đánh giá dịch vụ)
    const serviceReviews = JSON.parse(localStorage.getItem("danhGiaDichVu")) || [];
    const consultantReviews = JSON.parse(localStorage.getItem("consultantReviews")) || [];
    
    // Kết hợp và lọc đánh giá cho tư vấn viên hiện tại
    const allReviews = [...serviceReviews, ...consultantReviews]
      .filter(review => {
        // Lọc đánh giá cho tư vấn viên hiện tại hoặc dịch vụ tư vấn
        return review.consultant === consultantName || 
               review.tenDichVu === "Tư Vấn" ||
               review.consultantName === consultantName;
      })
      .map((review, index) => ({
        id: index,
        customerName: review.customerName || "Khách hàng",
        rating: review.soSao || review.stars || 5,
        comment: review.noiDung || review.comment || "",
        date: review.thoiGian || review.time || new Date().toLocaleString(),
        service: review.tenDichVu || "Tư vấn",
        consultant: review.consultant || consultantName
      }));

    setReviews(allReviews);
    calculateStats(allReviews);
  };

  const calculateStats = (reviewList) => {
    const total = reviewList.length;
    const average = total > 0 ? (reviewList.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1) : 0;
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    
    reviewList.forEach(review => {
      distribution[review.rating]++;
    });

    setStats({
      totalReviews: total,
      averageRating: average,
      ratingDistribution: distribution
    });
  };

  const filterAndSortReviews = () => {
    let filtered = [...reviews];

    // Lọc theo rating
    if (filterRating !== "all") {
      filtered = filtered.filter(review => review.rating === parseInt(filterRating));
    }

    // Lọc theo search term
    if (searchTerm) {
      filtered = filtered.filter(review => 
        review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sắp xếp
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date) - new Date(a.date);
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "highest":
          return b.rating - a.rating;
        case "lowest":
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

    setFilteredReviews(filtered);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < rating ? "#facc15" : "#d1d5db" }}>
        {i < rating ? "★" : "☆"}
      </span>
    ));
  };

  const getRatingPercentage = (rating) => {
    if (stats.totalReviews === 0) return 0;
    return ((stats.ratingDistribution[rating] / stats.totalReviews) * 100).toFixed(1);
  };

  return (
    <>
      <style>{`
        html, body {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
          background-color: #f9fafb;
          color: #1f2937;
        }
        body {
          min-height: 100vh;
          min-width: 100vw;
          box-sizing: border-box;
        }
        #root {
          height: 100%;
        }
        .dashboard {
          display: flex;
          min-height: 100vh;
          min-width: 100vw;
          width: 100vw;
          background-color: #f9fafb;
        }
        .main {
          flex: 1;
          margin-left: 180px;
          padding: 40px 32px;
          background-color: #ffffff;
          overflow-x: hidden;
          min-height: 100vh;
        }
        .page-header {
          margin-bottom: 32px;
        }
        .page-title {
          font-size: 28px;
          font-weight: 700;
          color: #065f46;
          margin-bottom: 8px;
        }
        .page-subtitle {
          color: #6b7280;
          font-size: 16px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }
        .stat-card {
          background: #f0fdf4;
          border: 1px solid #d1fae5;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
        }
        .stat-number {
          font-size: 32px;
          font-weight: 700;
          color: #065f46;
          margin-bottom: 8px;
        }
        .stat-label {
          color: #6b7280;
          font-size: 14px;
        }
        .rating-breakdown {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 32px;
        }
        .rating-row {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }
        .rating-stars {
          width: 80px;
          font-size: 14px;
        }
        .rating-bar {
          flex: 1;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          margin: 0 12px;
          overflow: hidden;
        }
        .rating-fill {
          height: 100%;
          background: #facc15;
          transition: width 0.3s ease;
        }
        .rating-count {
          width: 60px;
          text-align: right;
          font-size: 14px;
          color: #6b7280;
        }
        .filters {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .filter-select {
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          background: #ffffff;
          font-size: 14px;
        }
        .search-input {
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          background: #ffffff;
          font-size: 14px;
          min-width: 200px;
        }
        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .review-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          transition: box-shadow 0.3s ease;
        }
        .review-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }
        .review-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .customer-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #10b981;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
        }
        .customer-details h4 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
        }
        .review-date {
          color: #6b7280;
          font-size: 14px;
        }
        .review-rating {
          font-size: 18px;
        }
        .review-content {
          color: #374151;
          line-height: 1.6;
          margin-bottom: 12px;
        }
        .review-service {
          display: inline-block;
          background: #f3f4f6;
          color: #6b7280;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
        }
        .no-reviews {
          text-align: center;
          padding: 48px;
          color: #6b7280;
        }
        .no-reviews h3 {
          margin-bottom: 8px;
          color: #374151;
        }
      `}</style>
      <div className="dashboard">
        {/* Sidebar */}
        <ConsultantSidebar consultantName={consultantName} />

        {/* Main content */}
        <main className="main">
          {/* Topbar */}
          <ConsultantTopbar notificationCount={notificationCount} consultantName={consultantName} />

          {/* Page Header */}
          <div className="page-header">
            <h1 className="page-title">Đánh giá từ khách hàng</h1>
            <p className="page-subtitle">Xem và quản lý đánh giá của khách hàng dành cho bạn</p>
          </div>

          {/* Statistics */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{stats.totalReviews}</div>
              <div className="stat-label">Tổng số đánh giá</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.averageRating}</div>
              <div className="stat-label">Điểm trung bình</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {stats.totalReviews > 0 ? renderStars(Math.round(stats.averageRating)) : "☆☆☆☆☆"}
              </div>
              <div className="stat-label">Đánh giá trung bình</div>
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="rating-breakdown">
            <h3 style={{ marginBottom: '20px', color: '#065f46', fontSize: '18px' }}>
              Phân bố đánh giá
            </h3>
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="rating-row">
                <div className="rating-stars">
                  {rating} <FaStar style={{ color: '#facc15' }} />
                </div>
                <div className="rating-bar">
                  <div 
                    className="rating-fill" 
                    style={{ width: `${getRatingPercentage(rating)}%` }}
                  ></div>
                </div>
                <div className="rating-count">
                  {stats.ratingDistribution[rating]} ({getRatingPercentage(rating)}%)
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="filters">
            <div className="filter-group">
              <FaFilter style={{ color: '#6b7280' }} />
              <select 
                className="filter-select"
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
              >
                <option value="all">Tất cả đánh giá</option>
                <option value="5">5 sao</option>
                <option value="4">4 sao</option>
                <option value="3">3 sao</option>
                <option value="2">2 sao</option>
                <option value="1">1 sao</option>
              </select>
            </div>
            <div className="filter-group">
              <FaSort style={{ color: '#6b7280' }} />
              <select 
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
                <option value="highest">Điểm cao nhất</option>
                <option value="lowest">Điểm thấp nhất</option>
              </select>
            </div>
            <div className="filter-group">
              <FaSearch style={{ color: '#6b7280' }} />
              <input
                type="text"
                className="search-input"
                placeholder="Tìm kiếm đánh giá..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Reviews List */}
          <div className="reviews-list">
            {filteredReviews.length === 0 ? (
              <div className="no-reviews">
                <h3>Chưa có đánh giá nào</h3>
                <p>Khách hàng sẽ đánh giá sau khi sử dụng dịch vụ tư vấn của bạn</p>
              </div>
            ) : (
              filteredReviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="review-info">
                      <div className="customer-avatar">
                        <FaUser />
                      </div>
                      <div className="customer-details">
                        <h4>{review.customerName}</h4>
                        <div className="review-date">
                          <FaCalendarAlt style={{ marginRight: '4px' }} />
                          {review.date}
                        </div>
                      </div>
                    </div>
                    <div className="review-rating">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  {review.comment && (
                    <div className="review-content">
                      "{review.comment}"
                    </div>
                  )}
                  <div className="review-service">
                    Dịch vụ: {review.service}
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default ConsultantDanhGia;
