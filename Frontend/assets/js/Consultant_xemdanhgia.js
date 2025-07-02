document.addEventListener("DOMContentLoaded", () => {
  const consultantId = new URLSearchParams(location.search).get("id") || "default";
  const reviews = JSON.parse(localStorage.getItem(`reviews-${consultantId}`)) || [];

  const reviewList = document.getElementById("reviewList");
  const reviewStats = document.getElementById("reviewStats");
  const searchInput = document.getElementById("searchReview");
  const filterStar = document.getElementById("filterStar");
  const filterSort = document.getElementById("filterSort");
  const exportButton = document.getElementById("exportReviews");
  const pagination = document.getElementById("pagination");

  const perPage = 5;
  let currentPage = 1;

  function getFilteredReviews() {
    const search = searchInput.value.toLowerCase();
    const star = filterStar.value;
    const sort = filterSort.value;

    let filtered = [...reviews];

    if (star) filtered = filtered.filter(r => r.rating == star);
    if (search) filtered = filtered.filter(r => r.text.toLowerCase().includes(search));

    filtered.sort((a, b) => {
      const da = new Date(a.date || a.time || 0);
      const db = new Date(b.date || b.time || 0);
      return sort === "asc" ? da - db : db - da;
    });

    return filtered;
  }

  function renderReviews() {
    const filtered = getFilteredReviews();
    const totalPages = Math.ceil(filtered.length / perPage);
    currentPage = Math.min(currentPage, totalPages || 1);

    const start = (currentPage - 1) * perPage;
    const current = filtered.slice(start, start + perPage);

    reviewList.innerHTML = "";

    if (current.length === 0) {
      reviewList.innerHTML = "<p>Không có đánh giá phù hợp.</p>";
    } else {
      current.forEach(({ rating, text }) => {
        const div = document.createElement("div");
        div.className = "review";
        div.innerHTML = `
          <div class="stars">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</div>
          <div class="text">${text}</div>
        `;
        reviewList.appendChild(div);
      });
    }

    renderPagination(filtered.length);
    renderStats(filtered);
  }

  function renderStats(filtered) {
    if (filtered.length === 0) {
      reviewStats.innerHTML = "";
      return;
    }

    const avg = (
      filtered.reduce((sum, r) => sum + r.rating, 0) / filtered.length
    ).toFixed(1);

    reviewStats.innerHTML = `
      <div class="summary">
        <div>Tổng đánh giá: <strong>${filtered.length}</strong></div>
        <div class="average">⭐ Trung bình: ${avg} / 5</div>
      </div>
    `;
  }

  function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / perPage);
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      if (i === currentPage) btn.classList.add("active");
      btn.addEventListener("click", () => {
        currentPage = i;
        renderReviews();
      });
      pagination.appendChild(btn);
    }
  }

  searchInput.addEventListener("input", renderReviews);
  filterStar.addEventListener("change", renderReviews);
  filterSort.addEventListener("change", renderReviews);

  exportButton.addEventListener("click", () => {
    const data = getFilteredReviews();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `danh-gia-${consultantId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  renderReviews();
});
