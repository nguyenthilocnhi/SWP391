import React, { useEffect, useState } from "react";
import ConsultantSidebar from "../components/ConsultantSidebar";
import ConsultantTopbar from "../components/ConsultantTopbar";
import { Link } from "react-router-dom";

const ConsultantTrangChu = () => {
  const [consultantName] = useState("Nguyễn Thị Huyền");
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [ratingScore, setRatingScore] = useState(0);
  const [notificationCount] = useState(3);

  useEffect(() => {
    // Lấy lịch hẹn trong tháng
    const appointments = JSON.parse(localStorage.getItem("lichHenTuVan")) || [];
    // Giả sử mỗi lịch hẹn có trường 'ngay' dạng yyyy-mm-dd
    const currentMonth = new Date().getMonth() + 1;
    const countLichHen = appointments.filter(a => {
      const month = new Date(a.ngay).getMonth() + 1;
      return month === currentMonth;
    }).length;
    setAppointmentCount(countLichHen);

    // Lấy số câu hỏi mới
    const questions = JSON.parse(localStorage.getItem("cauHoiMoi")) || [];
    setQuestionCount(questions.length);

    // Lấy điểm đánh giá trung bình
    const reviews = JSON.parse(localStorage.getItem("danhGiaDichVu")) || [];
    if (reviews.length > 0) {
      const avg = reviews.reduce((sum, r) => sum + (r.soSao || 0), 0) / reviews.length;
      setRatingScore(avg.toFixed(1));
    } else {
      setRatingScore(0);
    }
  }, []);

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
.welcome {
  text-align: center;
  padding: 24px 16px;
  background-color: #ecfdf5;
  border: 1px solid #d1fae5;
  border-radius: 12px;
  margin-bottom: 32px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  max-width: 100%;
}
.welcome h2 {
  font-size: 20px;
  color: #065f46;
  margin-bottom: 16px;
  font-weight: 600;
}
.profile {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.circle-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #10b981;
  object-fit: cover;
}
.highlight {
  color: #047857;
  font-weight: 700;
  font-size: 18px;
}
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 100vw;
}
.card {
  background-color: #f0fdf4;
  border: 1px solid #d1fae5;
  border-left: 4px solid #34d399;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.04);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  min-width: 0;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 14px rgba(0,0,0,0.08);
}
.card p {
  font-size: 14px;
  color: #4b5563;
  margin: 0;
}
.card h2 {
  font-size: 30px;
  color: #065f46;
  margin: 8px 0 4px;
  font-weight: 700;
}
.card a {
  display: inline-block;
  margin-top: 6px;
  font-size: 14px;
  color: #059669;
  text-decoration: none;
  font-weight: 500;
}
.card a:hover {
  text-decoration: underline;
}
      `}</style>
      <div className="dashboard">
        {/* Sidebar */}
        <ConsultantSidebar consultantName={consultantName} />

        {/* Main content */}
        <main className="main">
          {/* Topbar */}
          <ConsultantTopbar notificationCount={notificationCount} consultantName={consultantName} />

          {/* Welcome section */}
          <section className="welcome">
            <h2>Xin chào, <span className="highlight">{consultantName}</span>!</h2>
            <div className="profile">
              <img className="circle-avatar" src="https://i.postimg.cc/rFsJ2wWR/tuvanvien.jpg" alt="Consultant" />
              <div>
                <div>Chào mừng bạn đến với trang quản lý tư vấn viên.</div>
                <div>Hãy kiểm tra các thông tin và cập nhật hoạt động của bạn.</div>
              </div>
            </div>
          </section>

          {/* Stat cards */}
          <section className="stats">
            <div className="card">
              <p>Lịch hẹn trong tháng</p>
              <h2>{appointmentCount}</h2>
              <Link
                to="/consultant/lich-hen"
                state={{ appointmentCount }}
              >
                Xem chi tiết
              </Link>
            </div>
            <div className="card">
              <p>Câu hỏi mới</p>
              <h2>{questionCount}</h2>
              <Link
                to="/consultant/hoi-dap"
                state={{ questionCount }}
              >
                Xem chi tiết
              </Link>
            </div>
            <div className="card">
              <p>Điểm đánh giá</p>
              <h2>{ratingScore}</h2>
              <Link
                to="/consultant/danh-gia"
                state={{ ratingScore }}
              >
                Xem chi tiết
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default ConsultantTrangChu;