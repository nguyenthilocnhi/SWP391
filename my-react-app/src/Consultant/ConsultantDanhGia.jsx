import React, { useEffect, useState } from "react";
import ConsultantSidebar from "../components/ConsultantSidebar";
import ConsultantTopbar from "../components/ConsultantTopbar";

const styles = {
  page: {
    fontFamily: "'Segoe UI', sans-serif",
    background: "#e6f9ed",
    minHeight: "100vh",
    padding: 0,
  },
  dashboard: {
    display: "flex",
    minHeight: "100vh",
    minWidth: "100vw",
    width: "100vw",
    backgroundColor: "#f9fafb",
  },
  main: {
    flex: 1,
    marginLeft: 180,
    padding: "40px 32px",
    backgroundColor: "#ffffff",
    overflowX: "hidden",
    minHeight: "100vh",
  },
  container: {
    maxWidth: 900,
    margin: "0 auto",
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 6px 16px #bbf7d0",
    padding: 32,
  },
  h1: {
    color: "#047857",
    fontSize: 28,
    marginBottom: 24,
    textAlign: "center",
  },
  consultantCard: {
    background: "#f6fff9",
    borderRadius: 12,
    boxShadow: "0 2px 8px #bbf7d0",
    padding: 24,
    marginBottom: 28,
  },
  name: {
    fontWeight: 700,
    fontSize: 20,
    color: "#047857",
    marginBottom: 8,
  },
  avgStars: {
    fontSize: 22,
    color: "#facc15",
    marginBottom: 8,
    fontWeight: 600,
  },
  reviewList: {
    marginTop: 10,
  },
  reviewItem: {
    background: "#fff",
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    boxShadow: "0 1px 4px #bbf7d0",
  },
  reviewStars: {
    color: "#facc15",
    fontSize: 18,
    marginRight: 8,
  },
  reviewTime: {
    color: "#6b7280",
    fontSize: 13,
    marginLeft: 8,
  },
  reviewComment: {
    marginTop: 4,
    color: "#166534",
  }
};

function ConsultantDanhGia() {
  const [consultants, setConsultants] = useState([]);
  const [reviews, setReviews] = useState([]);
  const consultantName = "Nguyễn Thị Huyền";
  const notificationCount = 3;

  useEffect(() => {
    // Lấy danh sách tư vấn viên (có thể lấy từ localStorage hoặc API)
    const fakeConsultants = [
      { id: "tv1", name: "Nguyễn Thị Huyền" },
      { id: "tv2", name: "Trần Văn B" },
      { id: "tv3", name: "Lê Thị C" }
    ];
    setConsultants(fakeConsultants);

    // Lấy tất cả đánh giá từ localStorage
    const allReviews = JSON.parse(localStorage.getItem("consultantReviews")) || [];
    setReviews(allReviews);
  }, []);

  // Tính điểm trung bình cho từng tư vấn viên
  const getAvgStars = (consultantName) => {
    const filtered = reviews.filter(r => r.consultant === consultantName);
    if (filtered.length === 0) return 0;
    const sum = filtered.reduce((acc, r) => acc + r.stars, 0);
    return (sum / filtered.length).toFixed(1);
  };

  return (
    <div style={styles.page}>
      <div style={styles.dashboard}>
        <ConsultantSidebar consultantName={consultantName} />
        <main style={styles.main}>
          <ConsultantTopbar notificationCount={notificationCount} />
          <div style={styles.container}>
            <h1 style={styles.h1}>Đánh Giá Tư Vấn Viên</h1>
            {consultants.map(tv => {
              const tvReviews = reviews.filter(r => r.consultant === tv.name);
              return (
                <div key={tv.id} style={styles.consultantCard}>
                  <div style={styles.name}>{tv.name}</div>
                  <div style={styles.avgStars}>
                    ★ {getAvgStars(tv.name)} / 5 ({tvReviews.length} đánh giá)
                  </div>
                  <div style={styles.reviewList}>
                    {tvReviews.length === 0 ? (
                      <div style={{ color: "#aaa" }}>Chưa có đánh giá nào.</div>
                    ) : (
                      tvReviews.map(r => (
                        <div key={r.id} style={styles.reviewItem}>
                          <span style={styles.reviewStars}>
                            {"★".repeat(r.stars)}
                            {"☆".repeat(5 - r.stars)}
                          </span>
                          <span style={styles.reviewTime}>{r.time}</span>
                          {r.comment && (
                            <div style={styles.reviewComment}>{r.comment}</div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ConsultantDanhGia;
