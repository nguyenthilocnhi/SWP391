
const services = JSON.parse(localStorage.getItem("lichSuDichVu")) || [];
const reviews = JSON.parse(localStorage.getItem("danhGiaDichVu")) || [];

const dichVuSelect = document.getElementById("dichVuSelect");
const ratingStars = document.getElementById("ratingStars");
const reviewText = document.getElementById("reviewText");

let selectedRating = 0;

function populateServiceDropdown() {
  const completed = services.filter(s => s.trangThai === "Hoàn_tất");
  completed.forEach(s => {
    const option = document.createElement("option");
    option.value = s.ten;
    option.textContent = s.ten;
    dichVuSelect.appendChild(option);
  });
}

function generateStars() {
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.textContent = "★";
    star.dataset.value = i;
    star.classList.add("star");
    star.onclick = () => {
      selectedRating = i;
      highlightStars(i);
    };
    ratingStars.appendChild(star);
  }
}

function highlightStars(n) {
  document.querySelectorAll(".star").forEach(star => {
    star.classList.toggle("selected", star.dataset.value <= n);
  });
}

function submitReview() {
  const ten = dichVuSelect.value;
  const noiDung = reviewText.value.trim();

  if (!ten || !noiDung || selectedRating === 0) {
    alert("Vui lòng chọn dịch vụ, chấm sao và nhập nội dung!");
    return;
  }

  const review = {
    tenDichVu: ten,
    noiDung,
    soSao: selectedRating,
    thoiGian: new Date().toLocaleString()
  };

  reviews.push(review);
  localStorage.setItem("danhGiaDichVu", JSON.stringify(reviews));
  reviewText.value = "";
  selectedRating = 0;
  highlightStars(0);
  alert("Đánh giá của bạn đã được gửi!");
}

populateServiceDropdown();
generateStars();
