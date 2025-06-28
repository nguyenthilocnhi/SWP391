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
let deletedQuestion = null;
let undoTimeout = null;

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
      <div class="question-actions">
        <button class="view-btn" onclick="showPopup(${index})">Xem chi tiết</button>
        <button class="delete-btn" onclick="deleteQuestion(${index})">🗑 Xóa</button>
      </div>
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

function deleteQuestion(index) {
  if (!confirm("Bạn có chắc muốn xóa câu hỏi này?")) return;

  deletedQuestion = {
    data: allQuestions[index],
    index: index
  };

  allQuestions.splice(index, 1);
  localStorage.setItem("questionHistory", JSON.stringify(allQuestions));
  renderQuestions(document.getElementById("status").value);

  showUndoAlert("❌ Câu hỏi đã bị xóa.");

  clearTimeout(undoTimeout);
  undoTimeout = setTimeout(() => {
    deletedQuestion = null;
  }, 10000);
}

function undoDelete() {
  if (deletedQuestion) {
    allQuestions.splice(deletedQuestion.index, 0, deletedQuestion.data);
    localStorage.setItem("questionHistory", JSON.stringify(allQuestions));
    renderQuestions(document.getElementById("status").value);
    deletedQuestion = null;
    showAlert("✅ Đã khôi phục câu hỏi.");
  }
}

function filterQuestions() {
  const value = document.getElementById("status").value;
  renderQuestions(value);
}

function showAlert(message) {
  const alertBox = document.getElementById('alert-box');
  const alertMessage = document.getElementById('alert-message');
  const alertClose = document.getElementById('alert-close');
  const undoBtn = document.getElementById('undo-btn');

  alertMessage.textContent = message;
  undoBtn.classList.add('hidden');
  alertBox.classList.remove('hidden');

  alertClose.onclick = () => {
    alertBox.classList.add('hidden');
  };

  setTimeout(() => {
    alertBox.classList.add('hidden');
  }, 5000);
}

function showUndoAlert(message) {
  const alertBox = document.getElementById('alert-box');
  const alertMessage = document.getElementById('alert-message');
  const undoBtn = document.getElementById('undo-btn');
  const alertClose = document.getElementById('alert-close');

  alertMessage.textContent = message;
  undoBtn.classList.remove('hidden');
  alertBox.classList.remove('hidden');

  undoBtn.onclick = () => {
    undoDelete();
    alertBox.classList.add('hidden');
    undoBtn.classList.add('hidden');
  };

  alertClose.onclick = () => {
    alertBox.classList.add('hidden');
    undoBtn.classList.add('hidden');
  };

  setTimeout(() => {
    alertBox.classList.add('hidden');
    undoBtn.classList.add('hidden');
    deletedQuestion = null;
  }, 10000);
}

document.addEventListener("DOMContentLoaded", () => {
  allQuestions = JSON.parse(localStorage.getItem("questionHistory")) || [];
  renderQuestions();
});
