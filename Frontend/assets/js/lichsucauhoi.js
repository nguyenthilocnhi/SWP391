// Bản đồ chuyên khoa
const specialtyMap = {
  phukhoa: "Phụ khoa",
  sanphukhoa: "Sản phụ khoa",
  noitiet: "Nội tiết",
  tamly: "Tâm lý",
  dinhduong: "Dinh dưỡng",
  namkhoa: "Nam khoa",
  khac: "Khác"
};

let allQuestions = [];

function renderQuestions(filter = 'all') {
  const container = document.getElementById("questionList");
  container.innerHTML = "";
  const filtered = allQuestions.filter(q => filter === "all" || q.status === filter);

  filtered.forEach((q, index) => {
    const card = document.createElement("div");
    card.className = "question-card";
    card.innerHTML = `
      <div class="question-info">
        <h2>${q.subject}</h2>
        <p><strong>Trạng thái:</strong> ${q.status}</p>
        <p><strong>Chuyên khoa:</strong> ${specialtyMap[q.specialty] || q.specialty}</p>
        <p><strong>Ngày gửi:</strong> ${q.date}</p>
      </div>
      <button class="view-btn" onclick="showPopup(${index})">Xem chi tiết</button>
    `;
    container.appendChild(card);
  });
}

function showPopup(index) {
  const q = allQuestions[index];
  document.getElementById("popupName").textContent = q.name || "Ẩn danh";
  document.getElementById("popupEmail").textContent = q.email || "(Không có email)";
  document.getElementById("popupSubject").textContent = q.subject;
  document.getElementById("popupSpecialty").textContent = specialtyMap[q.specialty] || q.specialty;
  document.getElementById("popupStatus").textContent = q.status;
  document.getElementById("popupDate").textContent = q.date;
  document.getElementById("popupMessage").textContent = q.message || "(Không có nội dung chi tiết)";
  document.getElementById("popupDetail").style.display = "flex";
}

function closePopup() {
  document.getElementById("popupDetail").style.display = "none";
}

function filterQuestions() {
  const value = document.getElementById("status").value;
  renderQuestions(value);
}

document.addEventListener("DOMContentLoaded", () => {
  allQuestions = JSON.parse(localStorage.getItem("questionHistory")) || [];
  renderQuestions();
});
