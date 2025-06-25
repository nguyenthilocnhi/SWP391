const reviewList = document.getElementById("reviewList");
const searchInput = document.getElementById("searchInput");
const pagination = document.getElementById("pagination");

let reviews = JSON.parse(localStorage.getItem("danhGiaDichVu")) || [];
let currentPage = 1;
const reviewsPerPage = 5;

function renderReviews() {
  const keyword = searchInput.value.toLowerCase().trim();

  const filtered = reviews.filter(r =>
    r.tenDichVu.toLowerCase().includes(keyword) ||
    r.noiDung.toLowerCase().includes(keyword)
  );

  const totalPages = Math.ceil(filtered.length / reviewsPerPage);
  if (currentPage > totalPages) currentPage = totalPages || 1;

  const start = (currentPage - 1) * reviewsPerPage;
  const end = start + reviewsPerPage;
  const paginated = filtered.slice(start, end);

  reviewList.innerHTML = "";

  if (paginated.length === 0) {
    reviewList.innerHTML = "<p style='text-align:center; color:#6b7280'>Không tìm thấy đánh giá nào.</p>";
    pagination.innerHTML = "";
    return;
  }

  paginated.forEach((r, i) => {
    const actualIndex = reviews.findIndex(
      rev => rev.tenDichVu === r.tenDichVu &&
             rev.noiDung === r.noiDung &&
             rev.soSao === r.soSao &&
             rev.thoiGian === r.thoiGian
    );

    const item = document.createElement("div");
    item.className = "review-item";
    item.innerHTML = `
      <div class="review-header">
        <strong>${r.tenDichVu}</strong> - <span class="stars">${r.soSao} ★</span>
        <span class="time">${r.thoiGian}</span>
      </div>
      <p>${r.noiDung}</p>
      <button class="delete-btn" onclick="deleteReview(${actualIndex})">🗑 Xóa</button>
    `;
    reviewList.appendChild(item);
  });

  renderPagination(filtered.length);
}

function renderPagination(total) {
  const totalPages = Math.ceil(total / reviewsPerPage);
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = i === currentPage ? "active" : "";
    btn.onclick = () => {
      currentPage = i;
      renderReviews();
    };
    pagination.appendChild(btn);
  }
}

function deleteReview(index) {
  if (!confirm("Bạn có chắc muốn xóa đánh giá này?")) return;

  reviews.splice(index, 1);
  localStorage.setItem("danhGiaDichVu", JSON.stringify(reviews));
  renderReviews();
}

searchInput.addEventListener("input", () => {
  currentPage = 1;
  renderReviews();
});

renderReviews();
