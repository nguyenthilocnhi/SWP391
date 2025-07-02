document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("consultantProfile");
  const inputs = form.querySelectorAll("input");
  const avatarInput = document.getElementById("avatarInput");
  const avatarPreview = document.getElementById("avatarPreview");
  const avatarSidebar = document.querySelector(".sidebar .avatar");
  const consultantName = document.getElementById("consultantName");

  // Chuyển yyyy-mm-dd → dd/mm/yyyy (lưu trữ)
  function formatDateDisplay(isoDate) {
    if (!isoDate) return "";
    const [y, m, d] = isoDate.split("-");
    return `${d}/${m}/${y}`;
  }

  // Chuyển dd/mm/yyyy → yyyy-mm-dd (hiển thị trên input date)
  function formatDateInput(displayDate) {
    if (!displayDate) return "";
    const [d, m, y] = displayDate.split("/");
    return `${y}-${m}-${d}`;
  }

  // === TẢI DỮ LIỆU ===
  function loadProfile() {
    try {
      const saved = JSON.parse(localStorage.getItem("consultantProfile"));
      if (!saved) return;

      inputs.forEach(input => {
        if (input.id === "birthdate" && saved.birthdate) {
          input.value = formatDateInput(saved.birthdate); // hiển thị yyyy-mm-dd
        } else if (saved[input.id]) {
          input.value = saved[input.id];
        }
      });

      if (saved.avatarDataUrl) {
        avatarPreview.src = saved.avatarDataUrl;
        if (avatarSidebar) avatarSidebar.src = saved.avatarDataUrl;
      }

      if (saved.name && consultantName) {
        consultantName.textContent = saved.name;
      }
    } catch (error) {
      console.warn("Lỗi khi tải dữ liệu tư vấn viên:", error);
    }
  }

  // === LƯU DỮ LIỆU ===
  function saveProfile() {
    const data = {};
    inputs.forEach(input => {
      if (input.id === "birthdate" && input.value) {
        data[input.id] = formatDateDisplay(input.value); // lưu dạng dd/mm/yyyy
      } else {
        data[input.id] = input.value;
      }
    });

    const existing = JSON.parse(localStorage.getItem("consultantProfile")) || {};
    if (existing.avatarDataUrl) {
      data.avatarDataUrl = existing.avatarDataUrl;
    }

    localStorage.setItem("consultantProfile", JSON.stringify(data));

    if (data.name && consultantName) {
      consultantName.textContent = data.name;
    }

    alert("✅ Thông tin đã được lưu!");
  }

  // === ĐỔI ẢNH ĐẠI DIỆN ===
  avatarInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const dataUrl = e.target.result;
      avatarPreview.src = dataUrl;
      if (avatarSidebar) avatarSidebar.src = dataUrl;

      const profile = JSON.parse(localStorage.getItem("consultantProfile")) || {};
      profile.avatarDataUrl = dataUrl;
      localStorage.setItem("consultantProfile", JSON.stringify(profile));
    };
    reader.readAsDataURL(file);
  });

  // === GỬI FORM ===
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    saveProfile();
  });

  loadProfile();
});
