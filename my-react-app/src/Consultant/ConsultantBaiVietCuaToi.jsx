import React, { useState, useEffect } from "react";
import ConsultantSidebar from "../components/ConsultantSidebar";
import ConsultantTopbar from "../components/ConsultantTopbar";
import { FaEye, FaEdit, FaTrash, FaClock, FaCheck, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const ConsultantBaiVietCuaToi = () => {
  const navigate = useNavigate();
  const [consultantName] = useState("Nguyễn Thị Huyền");
  const [notificationCount] = useState(3);
  const [myArticles, setMyArticles] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const loadMyArticles = () => {
    const allArticles = JSON.parse(localStorage.getItem("blogs")) || [];
    const myArticles = allArticles.filter(article => article.author === consultantName);
    setMyArticles(myArticles);
  };

  useEffect(() => {
    let role = localStorage.getItem('role');
    if (role === 'Consultant' || role === 'Tư vấn viên') role = 2;
    else if (role === 'Admin') role = 4;
    else if (role === 'Staff' || role === 'Nhân viên') role = 3;
    else if (role === 'Customer' || role === 'Khách hàng') role = 1;
    else if (!isNaN(role)) role = Number(role);
    if (Number(role) !== 2) {
      navigate('/login');
    }
    loadMyArticles();
  }, [navigate]);

  const handleDelete = (articleId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      const allArticles = JSON.parse(localStorage.getItem("blogs")) || [];
      const updatedArticles = allArticles.filter(article => article.id !== articleId);
      localStorage.setItem("blogs", JSON.stringify(updatedArticles));
      loadMyArticles();
    }
  };

  const handleView = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'published': return 'Đã đăng';
      case 'pending': return 'Chờ duyệt';
      case 'rejected': return 'Từ chối';
      case 'draft': return 'Nháp';
      default: return 'Không xác định';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'published': return <FaCheck style={{color: '#10b981'}} />;
      case 'pending': return <FaClock style={{color: '#f59e0b'}} />;
      case 'rejected': return <FaTimes style={{color: '#ef4444'}} />;
      case 'draft': return <FaEdit style={{color: '#6b7280'}} />;
      default: return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const filteredArticles = myArticles.filter(article => {
    if (filter === 'all') return true;
    return article.status === filter;
  });

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
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding-bottom: 16px;
          border-bottom: 2px solid #e5e7eb;
        }
        .header h1 {
          font-size: 28px;
          color: #1f2937;
          margin: 0;
        }
        .filter-container {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .filter-btn {
          padding: 8px 16px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          background: white;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-btn.active {
          background: #10b981;
          color: white;
          border-color: #10b981;
        }
        .filter-btn:hover {
          background: #f9fafb;
        }
        .filter-btn.active:hover {
          background: #059669;
        }
        .card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          padding: 24px;
          margin-bottom: 16px;
        }
        .article-item {
          display: grid;
          grid-template-columns: 1fr auto auto auto;
          gap: 16px;
          align-items: center;
          padding: 16px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          margin-bottom: 12px;
          transition: all 0.2s;
        }
        .article-item:hover {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .article-info h3 {
          margin: 0 0 8px 0;
          font-size: 16px;
          color: #1f2937;
        }
        .article-info p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }
        .status-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }
        .status-published {
          background: #d1fae5;
          color: #065f46;
        }
        .status-pending {
          background: #fef3c7;
          color: #92400e;
        }
        .status-rejected {
          background: #fee2e2;
          color: #991b1b;
        }
        .status-draft {
          background: #e5e7eb;
          color: #374151;
        }
        .action-buttons {
          display: flex;
          gap: 8px;
        }
        .btn {
          padding: 6px 12px;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all 0.2s;
        }
        .btn-view {
          background: #3b82f6;
          color: white;
        }
        .btn-view:hover {
          background: #2563eb;
        }
        .btn-edit {
          background: #f59e0b;
          color: white;
        }
        .btn-edit:hover {
          background: #d97706;
        }
        .btn-delete {
          background: #ef4444;
          color: white;
        }
        .btn-delete:hover {
          background: #dc2626;
        }
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          border-radius: 12px;
          padding: 32px;
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .modal-title {
          font-size: 20px;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }
        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #6b7280;
        }
        .close-btn:hover {
          color: #374151;
        }
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #6b7280;
        }
        .empty-state h3 {
          margin-bottom: 16px;
          color: #374151;
        }
        @media (max-width: 768px) {
          .article-item {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .action-buttons {
            justify-content: flex-start;
          }
        }
      `}</style>
      <div className="dashboard">
        {/* Sidebar */}
        <ConsultantSidebar consultantName={consultantName} />

        {/* Main content */}
        <main className="main">
          {/* Topbar */}
          <ConsultantTopbar notificationCount={notificationCount} consultantName={consultantName} />

          <div className="container">
            {/* Header */}
            <div className="header">
              <h1>Bài viết của tôi</h1>
            </div>

            {/* Filter */}
            <div className="filter-container">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                Tất cả ({myArticles.length})
              </button>
              <button 
                className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                onClick={() => setFilter('pending')}
              >
                Chờ duyệt ({myArticles.filter(a => a.status === 'pending').length})
              </button>
              <button 
                className={`filter-btn ${filter === 'published' ? 'active' : ''}`}
                onClick={() => setFilter('published')}
              >
                Đã đăng ({myArticles.filter(a => a.status === 'published').length})
              </button>
              <button 
                className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
                onClick={() => setFilter('rejected')}
              >
                Từ chối ({myArticles.filter(a => a.status === 'rejected').length})
              </button>
              <button 
                className={`filter-btn ${filter === 'draft' ? 'active' : ''}`}
                onClick={() => setFilter('draft')}
              >
                Nháp ({myArticles.filter(a => a.status === 'draft').length})
              </button>
            </div>

            {/* Articles List */}
            <div className="card">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <div key={article.id} className="article-item">
                    <div className="article-info">
                      <h3>{article.title}</h3>
                      <p>
                        {article.summary && `${article.summary.substring(0, 100)}...`}
                        {!article.summary && article.content.substring(0, 100) + '...'}
                      </p>
                      <small style={{color: '#9ca3af'}}>
                        Tạo ngày: {formatDate(article.createdAt)}
                        {article.category && ` • ${article.category === 'suc-khoe' ? 'Sức khỏe' : 
                          article.category === 'dinh-duong' ? 'Dinh dưỡng' :
                          article.category === 'the-thao' ? 'Thể thao' :
                          article.category === 'tam-ly' ? 'Tâm lý' :
                          article.category === 'benh-ly' ? 'Bệnh lý' :
                          article.category === 'kham-benh' ? 'Khám bệnh' : article.category}`}
                      </small>
                    </div>
                    
                    <div className={`status-badge status-${article.status}`}>
                      {getStatusIcon(article.status)}
                      {getStatusText(article.status)}
                    </div>
                    
                    <div style={{textAlign: 'center', fontSize: '12px', color: '#6b7280'}}>
                      {article.content.length} ký tự
                    </div>
                    
                    <div className="action-buttons">
                      <button 
                        className="btn btn-view" 
                        onClick={() => handleView(article)}
                      >
                        <FaEye /> Xem
                      </button>
                      {article.status === 'draft' && (
                        <button className="btn btn-edit">
                          <FaEdit /> Sửa
                        </button>
                      )}
                      <button 
                        className="btn btn-delete" 
                        onClick={() => handleDelete(article.id)}
                      >
                        <FaTrash /> Xóa
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <h3>Chưa có bài viết nào</h3>
                  <p>Bạn chưa có bài viết nào trong danh mục này.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modal xem chi tiết bài viết */}
      {showModal && selectedArticle && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Chi tiết bài viết</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            
            <div style={{marginBottom: 16}}>
              <h4 style={{margin: '0 0 8px 0', color: '#1f2937'}}>Tiêu đề:</h4>
              <p style={{margin: 0, fontSize: 16, fontWeight: 500}}>{selectedArticle.title}</p>
            </div>

            {selectedArticle.summary && (
              <div style={{marginBottom: 16}}>
                <h4 style={{margin: '0 0 8px 0', color: '#1f2937'}}>Tóm tắt:</h4>
                <p style={{margin: 0, color: '#6b7280'}}>{selectedArticle.summary}</p>
              </div>
            )}

            <div style={{marginBottom: 16}}>
              <h4 style={{margin: '0 0 8px 0', color: '#1f2937'}}>Nội dung:</h4>
              <div style={{
                maxHeight: '300px',
                overflowY: 'auto',
                padding: '12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#f9fafb',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.6
              }}>
                {selectedArticle.content}
              </div>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16}}>
              <div>
                <h4 style={{margin: '0 0 8px 0', color: '#1f2937'}}>Trạng thái:</h4>
                <div className={`status-badge status-${selectedArticle.status}`}>
                  {getStatusIcon(selectedArticle.status)}
                  {getStatusText(selectedArticle.status)}
                </div>
              </div>
              <div>
                <h4 style={{margin: '0 0 8px 0', color: '#1f2937'}}>Danh mục:</h4>
                <p style={{margin: 0}}>
                  {selectedArticle.category === 'suc-khoe' && 'Sức khỏe'}
                  {selectedArticle.category === 'dinh-duong' && 'Dinh dưỡng'}
                  {selectedArticle.category === 'the-thao' && 'Thể thao'}
                  {selectedArticle.category === 'tam-ly' && 'Tâm lý'}
                  {selectedArticle.category === 'benh-ly' && 'Bệnh lý'}
                  {selectedArticle.category === 'kham-benh' && 'Khám bệnh'}
                </p>
              </div>
            </div>

            {selectedArticle.tags && (
              <div style={{marginBottom: 16}}>
                <h4 style={{margin: '0 0 8px 0', color: '#1f2937'}}>Tags:</h4>
                <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
                  {selectedArticle.tags.split(',').map((tag, index) => (
                    <span key={index} style={{
                      padding: '4px 8px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={{textAlign: 'right', marginTop: 24}}>
              <button 
                className="btn btn-view" 
                onClick={() => setShowModal(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConsultantBaiVietCuaToi; 