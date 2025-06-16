const questions = JSON.parse(localStorage.getItem("questions") || "[]");


function loadQuestions(data) {
  const tbody = document.querySelector("#questionTable tbody");
  tbody.innerHTML = "";
  data.forEach((q, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${q.time}</td>
        <td>${q.sender}</td>
        <td>${q.topic}</td>
        <td>${q.text}</td>
        <td>${q.status}</td>
        <td>
          <button onclick="toggleStatus(${index})">
            Đổi trạng thái
          </button>
        </td>
      </tr>
    `;
  });
}

function toggleStatus(index) {
  questions[index].status = questions[index].status === "Chưa trả lời" ? "Đã trả lời" : "Chưa trả lời";
  filterQuestions(); // reload lại bảng
}

function filterQuestions() {
  const topic = document.getElementById("filterTopic").value;
  const filtered = topic === "all" ? questions : questions.filter(q => q.topic === topic);
  loadQuestions(filtered);
}
// Init
filterQuestions();
