document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("questionTableBody");
  const pagination = document.getElementById("pagination");

  const questions = JSON.parse(localStorage.getItem("questions")) || [];

  const rowsPerPage = 5;
  let currentPage = 1;

  function renderTablePage(page) {
    tableBody.innerHTML = "";

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const currentRows = questions.slice(start, end);

    currentRows.forEach(q => {
      const row = document.createElement("tr");
     row.innerHTML = `
  <td>${q.customer}</td>
  <td>${q.content || q.question}</td>
  <td>${q.email}</td>
  <td>${q.time}</td>
  <td>
    <span class="status ${q.status === "answered" || q.status === "done" ? "answered" : "unanswered"}">
      ${q.status === "answered" || q.status === "done" ? "Đã trả lời" : "Chưa trả lời"}
    </span>
  </td>
  <td>
    <a href="Consultant_answer.html?id=${q.id}" class="action-link">
      ${q.status !== "answered" && q.status !== "done" ? "Xử lý" : "Xem lại"}
    </a>
  </td>
`;

      tableBody.appendChild(row);
    });

    renderPagination();
  }

  function renderPagination() {
    pagination.innerHTML = "";
    const pageCount = Math.ceil(questions.length / rowsPerPage);

    for (let i = 1; i <= pageCount; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className = i === currentPage ? "active" : "";
      btn.addEventListener("click", () => {
        currentPage = i;
        renderTablePage(currentPage);
      });
      pagination.appendChild(btn);
    }
  }

  renderTablePage(currentPage);
});
