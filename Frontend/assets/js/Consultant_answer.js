document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(location.search);
  const questionId = urlParams.get("id");

  const questionList = JSON.parse(localStorage.getItem("questions")) || [];
  const index = questionList.findIndex(q => q.id === questionId);
  const questionData = questionList[index];

  const questionDetail = document.getElementById("questionDetail");
  const answerText = document.getElementById("answerText");
  const submitAnswer = document.getElementById("submitAnswer");

  if (!questionData) {
    questionDetail.innerHTML = "<p>Không tìm thấy câu hỏi.</p>";
    submitAnswer.disabled = true;
    return;
  }

  // Hiển thị câu hỏi
  questionDetail.innerHTML = `
    <div class="question"><strong>Câu hỏi:</strong> ${questionData.question}</div>
    <div><strong>Khách hàng:</strong> ${questionData.customer || "Ẩn danh"}</div>
    <div><strong>Ngày gửi:</strong> ${questionData.date}</div>
    ${questionData.answer ? `<div class="answer"><strong>Đã trả lời:</strong><p>${questionData.answer}</p></div>` : ""}
  `;

  // Gửi câu trả lời
  submitAnswer.addEventListener("click", () => {
    const ans = answerText.value.trim();
    if (!ans) {
      alert("Vui lòng nhập câu trả lời.");
      return;
    }

    questionList[index].answer = ans;
    questionList[index].status = "answered";
    localStorage.setItem("questions", JSON.stringify(questionList));
    alert("Đã lưu câu trả lời!");
    location.href = "Hoidap.html";
  });
});
