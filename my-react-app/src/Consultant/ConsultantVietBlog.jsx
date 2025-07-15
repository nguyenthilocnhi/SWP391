import React, { useState, useEffect } from "react";
import ConsultantSidebar from "../components/ConsultantSidebar";
import ConsultantTopbar from "../components/ConsultantTopbar";
import { FaSave, FaEye, FaUpload, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ConsultantVietBlog = () => {
  const navigate = useNavigate();
  const [consultantName] = useState("Nguyễn Thị Huyền");
  const [notificationCount] = useState(3);
  
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    summary: "",
    category: "suc-khoe",
    tags: "",
    image: null,
    imagePreview: null
  });

  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    const role = Number(localStorage.getItem('role'));
    if (role !== 2) {
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const removeImage = () => {
    setBlogData(prev => ({
      ...prev,
      image: null,
      imagePreview: null
    }));
  };

  const handleSave = () => {
    // Lưu blog vào localStorage
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const newBlog = {
      id: Date.now(),
      ...blogData,
      author: consultantName,
      createdAt: new Date().toISOString(),
      status: "draft"
    };
    blogs.push(newBlog);
    localStorage.setItem("blogs", JSON.stringify(blogs));
    alert("Đã lưu blog thành công!");
  };

  const handlePublish = () => {
    // Gửi bài viết để duyệt
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const newBlog = {
      id: Date.now(),
      ...blogData,
      author: consultantName,
      createdAt: new Date().toISOString(),
      status: "pending" // Trạng thái chờ duyệt
    };
    blogs.push(newBlog);
    localStorage.setItem("blogs", JSON.stringify(blogs));
    alert("Đã gửi bài viết để duyệt! Admin sẽ xem xét và phê duyệt bài viết của bạn.");
    
    // Reset form sau khi gửi
    setBlogData({
      title: "",
      content: "",
      summary: "",
      category: "suc-khoe",
      tags: "",
      image: null,
      imagePreview: null
    });
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
        .blog-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .blog-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding-bottom: 16px;
          border-bottom: 2px solid #e5e7eb;
        }
        .blog-header h1 {
          font-size: 28px;
          color: #1f2937;
          margin: 0;
        }
        .action-buttons {
          display: flex;
          gap: 12px;
        }
        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }
        .btn-primary {
          background-color: #10b981;
          color: white;
        }
        .btn-primary:hover {
          background-color: #059669;
        }
        .btn-secondary {
          background-color: #6b7280;
          color: white;
        }
        .btn-secondary:hover {
          background-color: #4b5563;
        }
        .btn-outline {
          background-color: transparent;
          color: #10b981;
          border: 1px solid #10b981;
        }
        .btn-outline:hover {
          background-color: #10b981;
          color: white;
        }
        .blog-form {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
        }
        .main-content {
          background-color: #ffffff;
          border-radius: 16px;
          padding: 32px 32px 24px 32px;
          box-shadow: 0 2px 12px rgba(34,197,94,0.07);
          overflow: hidden;
        }
        .sidebar-content {
          background-color: #ffffff;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          height: fit-content;
        }
        .form-group {
          margin-bottom: 24px;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #374151;
        }
        .form-control {
          width: 100%;
          box-sizing: border-box;
          padding: 16px 18px;
          border: 1.5px solid #e5e7eb;
          border-radius: 16px;
          font-size: 16px;
          background: #f6fff9;
          color: #22223b;
          box-shadow: 0 1px 6px rgba(34,197,94,0.06);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-control:focus {
          outline: none;
          border-color: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.12);
        }
        .form-control.textarea {
          min-height: 180px;
          resize: vertical;
        }
        .image-upload {
          border: 2px dashed #d1d5db;
          border-radius: 8px;
          padding: 32px;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .image-upload:hover {
          border-color: #10b981;
        }
        .image-upload input {
          display: none;
        }
        .image-preview {
          position: relative;
          margin-top: 16px;
        }
        .image-preview img {
          width: 100%;
          max-height: 200px;
          object-fit: cover;
          border-radius: 8px;
        }
        .remove-image {
          position: absolute;
          top: 8px;
          right: 8px;
          background-color: #ef4444;
          color: white;
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .preview-content {
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 24px;
          margin-top: 16px;
        }
        .preview-content h2 {
          color: #1f2937;
          margin-bottom: 16px;
        }
        .preview-content p {
          color: #6b7280;
          line-height: 1.6;
        }
        .category-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .category-option {
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          cursor: pointer;
          text-align: center;
          transition: all 0.2s;
        }
        .category-option:hover {
          border-color: #10b981;
          background-color: #f0fdf4;
        }
        .category-option.selected {
          border-color: #10b981;
          background-color: #10b981;
          color: white;
        }
        .word-count {
          font-size: 12px;
          color: #6b7280;
          text-align: right;
          margin-top: 4px;
        }
        @media (max-width: 1024px) {
          .blog-form {
            grid-template-columns: 1fr;
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

          <div className="blog-container">
            {/* Header */}
            <div className="blog-header">
              <h1>Bài Viết</h1>
              <div className="action-buttons">
                <button 
                  className="btn btn-outline" 
                  onClick={() => setIsPreview(!isPreview)}
                >
                  <FaEye /> {isPreview ? "Chỉnh sửa" : "Xem trước"}
                </button>
                <button className="btn btn-secondary" onClick={handleSave}>
                  <FaSave /> Lưu nháp
                </button>
                <button className="btn btn-primary" onClick={handlePublish}>
                  <FaUpload /> Gửi duyệt
                </button>
              </div>
            </div>

            {/* Blog Form */}
            <div className="blog-form">
              {/* Main Content */}
              <div className="main-content">
                <div className="form-group">
                  <label htmlFor="title">Tiêu đề bài viết *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    value={blogData.title}
                    onChange={handleInputChange}
                    placeholder="Nhập tiêu đề bài viết..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="summary">Tóm tắt</label>
                  <textarea
                    id="summary"
                    name="summary"
                    className="form-control"
                    rows="3"
                    value={blogData.summary}
                    onChange={handleInputChange}
                    placeholder="Tóm tắt ngắn gọn về nội dung bài viết..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="content">Nội dung bài viết *</label>
                  <textarea
                    id="content"
                    name="content"
                    className="form-control textarea"
                    value={blogData.content}
                    onChange={handleInputChange}
                    placeholder="Viết nội dung bài viết của bạn..."
                  />
                  <div className="word-count">
                    {blogData.content.length} ký tự
                  </div>
                </div>

                {isPreview && (
                  <div className="preview-content">
                    <h2>Xem trước</h2>
                    {blogData.imagePreview && (
                      <img 
                        src={blogData.imagePreview} 
                        alt="Preview" 
                        style={{width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px'}}
                      />
                    )}
                    <h3>{blogData.title || "Tiêu đề bài viết"}</h3>
                    {blogData.summary && <p style={{fontStyle: 'italic', color: '#6b7280'}}>{blogData.summary}</p>}
                    <div style={{whiteSpace: 'pre-wrap'}}>
                      {blogData.content || "Nội dung bài viết sẽ hiển thị ở đây..."}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="sidebar-content">
                <div className="form-group">
                  <label>Danh mục</label>
                  <div className="category-options">
                    {[
                      { value: "suc-khoe", label: "Sức khỏe" },
                      { value: "dinh-duong", label: "Dinh dưỡng" },
                      { value: "the-thao", label: "Thể thao" },
                      { value: "tam-ly", label: "Tâm lý" },
                      { value: "benh-ly", label: "Bệnh lý" },
                      { value: "kham-benh", label: "Khám bệnh" }
                    ].map(category => (
                      <div
                        key={category.value}
                        className={`category-option ${blogData.category === category.value ? 'selected' : ''}`}
                        onClick={() => setBlogData(prev => ({ ...prev, category: category.value }))}
                      >
                        {category.label}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="tags">Tags</label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    className="form-control"
                    value={blogData.tags}
                    onChange={handleInputChange}
                    placeholder="Nhập tags, phân cách bằng dấu phẩy..."
                  />
                </div>

                <div className="form-group">
                  <label>Hình ảnh đại diện</label>
                  <div className="image-upload" onClick={() => document.getElementById('image-input').click()}>
                    <input
                      id="image-input"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {blogData.imagePreview ? (
                      <div className="image-preview">
                        <img src={blogData.imagePreview} alt="Preview" />
                        <button className="remove-image" onClick={(e) => {e.stopPropagation(); removeImage();}}>
                          <FaTimes />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <FaUpload style={{fontSize: '32px', color: '#9ca3af', marginBottom: '16px'}} />
                        <p>Click để tải ảnh</p>
                        <p style={{fontSize: '12px', color: '#6b7280'}}>JPG, PNG, GIF (tối đa 5MB)</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <h4 style={{marginBottom: '16px', color: '#374151'}}>Thông tin bài viết</h4>
                  <div style={{fontSize: '14px', color: '#6b7280'}}>
                    <p><strong>Tiêu đề:</strong> {blogData.title.length > 0 ? `${blogData.title.length} ký tự` : 'Chưa có'}</p>
                    <p><strong>Nội dung:</strong> {blogData.content.length > 0 ? `${blogData.content.length} ký tự` : 'Chưa có'}</p>
                    <p><strong>Hình ảnh:</strong> {blogData.image ? 'Đã tải' : 'Chưa có'}</p>
                    <p><strong>Danh mục:</strong> {blogData.category}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ConsultantVietBlog; 