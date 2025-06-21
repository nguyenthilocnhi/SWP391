// File: /Frontend/assets/js/header_customer.js

function initHeader() {
  // Toggle menu người dùng
  const userBtn = document.querySelector("#user-menu-btn");
  const dropdown = document.querySelector("#user-dropdown");

  if (userBtn && dropdown) {
    userBtn.addEventListener("click", () => {
      dropdown.classList.toggle("show");
    });
  }

  // Dropdown sổ xuống
  const dropdownToggle = document.querySelector('.user-dropdown');
  const userMenu = document.querySelector('.user-menu');

  if (dropdownToggle && userMenu) {
    dropdownToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      userMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', function (e) {
      if (!userMenu.contains(e.target) && !dropdownToggle.contains(e.target)) {
        userMenu.classList.add('hidden');
      }
    });
  }

  // Hiển thị thời gian thông báo
  const notifications = document.querySelectorAll('.notify-content');

  notifications.forEach(content => {
    const timeString = content.getAttribute('data-time');
    const timeSpan = content.querySelector('.notify-time');

    if (timeString && timeSpan) {
      timeSpan.textContent = timeAgo(timeString);
    }
  });

  // Gọi thông báo khi click chuông
  const notificationIcon = document.querySelector('.notification');
  const notificationBox = document.querySelector('.notification-box');
  const badge = document.querySelector('.badge');

  if (notificationIcon && notificationBox) {
    notificationIcon.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      notificationBox.classList.toggle('hidden');
      badge.innerText = '0';
    });

    document.addEventListener('click', function (e) {
      const clickedOutside = !notificationBox.contains(e.target) && !notificationIcon.contains(e.target);
      if (clickedOutside) {
        notificationBox.classList.add('hidden');
      }
    });
  }
}

// Hàm xử lý định dạng thời gian
function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);

  const intervals = [
    { label: 'năm', seconds: 31536000 },
    { label: 'tháng', seconds: 2592000 },
    { label: 'ngày', seconds: 86400 },
    { label: 'giờ', seconds: 3600 },
    { label: 'phút', seconds: 60 },
    { label: 'giây', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label} trước`;
    }
  }
  return 'Vừa xong';
}
