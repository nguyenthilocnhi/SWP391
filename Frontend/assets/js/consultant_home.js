document.addEventListener("DOMContentLoaded", () => {
  fetch("/Frontend/data/consultant_home.json")
    .then(res => res.json())
    .then(data => {
      // Load thông tin
      document.getElementById("consultantName").textContent = data.name;
      document.getElementById("greetingName").textContent = data.name.split(" ").slice(-2).join(" ");
      document.getElementById("consultantRole").textContent = data.role;
      document.getElementById("appointmentCount").textContent = data.appointments;
      document.getElementById("questionCount").textContent = data.questions;
      document.getElementById("ratingScore").textContent = data.rating.toFixed(1);

      // Ảnh đại diện
      document.getElementById("avatarSidebar").src = data.avatar;
      document.getElementById("avatarMain").src = data.avatar;

      // Lưu vào localStorage để profile.html có thể chỉnh sửa
      localStorage.setItem("consultantInfo", JSON.stringify(data));
    })
    .catch(error => {
      console.error("Lỗi khi tải dữ liệu tư vấn viên:", error);
    });
});
