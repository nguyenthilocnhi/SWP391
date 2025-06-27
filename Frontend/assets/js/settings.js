
const form = document.getElementById("settingsForm");
const statusMsg = document.getElementById("statusMsg");
const avatarInput = document.getElementById("avatarInput");
const avatarPreview = document.getElementById("avatarPreview");

window.onload = function () {
  const settings = JSON.parse(localStorage.getItem("userSettings")) || {};
  document.getElementById("name").value = settings.name || "";
  document.getElementById("email").value = settings.email || "";
  document.getElementById("password").value = settings.password || "";
  document.getElementById("phone").value = settings.phone || "";
  document.getElementById("notifications").checked = settings.notifications || false;
  document.getElementById("twoFA").checked = settings.twoFA || false;
  document.getElementById("darkMode").checked = settings.darkMode || false;
  document.getElementById("langSelect").value = settings.language || "vi";
  avatarPreview.src = settings.avatar || avatarPreview.src;

  if (settings.darkMode) document.body.classList.add("dark");
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const settings = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    notifications: document.getElementById("notifications").checked,
    twoFA: document.getElementById("twoFA").checked,
    darkMode: document.getElementById("darkMode").checked,
    language: document.getElementById("langSelect").value,
    avatar: avatarPreview.src,
    updatedAt: new Date().toISOString()
  };

  localStorage.setItem("userSettings", JSON.stringify(settings));
  statusMsg.textContent = "Đã lưu cài đặt thành công!";
  if (settings.darkMode) document.body.classList.add("dark");
  else document.body.classList.remove("dark");

  setTimeout(() => statusMsg.textContent = "", 3000);
});

avatarInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      avatarPreview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById("notifications").addEventListener("change", function () {
  if (this.checked) {
    Notification.requestPermission().then(permission => {
      if (permission !== "granted") {
        alert("❌ Bạn chưa cho phép nhận thông báo.");
        this.checked = false;
      }
    });
  }
});

function logout() {
  if (confirm("Bạn có chắc muốn đăng xuất không?")) {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("sessionExpire");
    window.location.href = "/Frontend/Public/Login/Trangdangnhap.html";
  }
}

function deleteAccount() {
  if (confirm("⚠️ Bạn có chắc chắn muốn xóa tài khoản và toàn bộ dữ liệu không?")) {
    localStorage.removeItem("userSettings");
    localStorage.removeItem("loggedIn");
    alert("Tài khoản đã được xóa!");
    window.location.href = "/Frontend/Public/Login/Trangdangnhap.html";
  }
}
