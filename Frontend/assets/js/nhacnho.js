const calendarGrid = document.querySelector(".calendar-grid");
const title = document.getElementById("calendarTitle");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");
const summaryBox = document.getElementById("summaryBox");

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

// Tạo key duy nhất cho từng tháng-năm
function getKey() {
  return `missedDays_${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}`;
}

// Lấy số ngày chưa uống từ localStorage
function getMissedDays() {
  return JSON.parse(localStorage.getItem(getKey())) || [];
}

// Lưu lại danh sách ngày chưa uống
function saveMissedDays(missed) {
  localStorage.setItem(getKey(), JSON.stringify(missed));
}

// Trả về số ngày trong tháng
function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

// Trả về thứ trong tuần (0: CN, ..., 6: T7)
function getWeekday(year, month, day) {
  return new Date(year, month, day).getDay();
}

// Vẽ lịch
function renderCalendar() {
  title.textContent = `${currentYear} - Tháng ${currentMonth + 1}`;
  calendarGrid.innerHTML = '';

  const missedDays = getMissedDays();
  const totalDays = daysInMonth(currentMonth, currentYear);
  const firstDayOffset = getWeekday(currentYear, currentMonth, 1);

  // Header ngày trong tuần
  const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  weekdays.forEach(day => {
    const header = document.createElement("div");
    header.className = "day-name";
    header.textContent = day;
    calendarGrid.appendChild(header);
  });

  // Ô trống đầu tuần nếu cần
  for (let i = 0; i < firstDayOffset; i++) {
    const empty = document.createElement("div");
    calendarGrid.appendChild(empty);
  }

  // Hiển thị từng ngày
  for (let day = 1; day <= totalDays; day++) {
    const div = document.createElement("div");
    div.className = "day";
    div.textContent = day;

    if (missedDays.includes(day)) {
      div.classList.add("x");
    } else if (missedDays.length > 0) {
      div.classList.add("check");
    }

    // Tô sáng ngày hôm nay
    const isToday = day === today.getDate()
      && currentMonth === today.getMonth()
      && currentYear === today.getFullYear();

    if (isToday) div.classList.add("today");

    // Khi bấm chọn ngày
    div.addEventListener("click", () => {
      const index = missedDays.indexOf(day);
      if (index !== -1) missedDays.splice(index, 1);
      else missedDays.push(day);
      saveMissedDays(missedDays);
      renderCalendar();
    });

    calendarGrid.appendChild(div);
  }

  // Cập nhật thống kê
  const drank = totalDays - missedDays.length;
  const missed = missedDays.length;
  summaryBox.innerHTML = `
    <p><strong>Đã uống:</strong> ${drank} ngày</p>
    <p><strong>Chưa uống:</strong> ${missed} ngày</p>
  `;
}

// Reset toàn bộ về trắng
function resetLich() {
  if (confirm("Bạn có chắc muốn đặt lại toàn bộ lịch không?")) {
    const totalDays = daysInMonth(currentMonth, currentYear);
    const allDaysMissed = Array.from({ length: totalDays }, (_, i) => i + 1); // [1, 2, ..., totalDays]
    saveMissedDays(allDaysMissed);
    renderCalendar();
  }
}

// Chuyển tháng trước
prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

// Chuyển tháng sau
nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

// Khởi động khi load trang
document.addEventListener("DOMContentLoaded", renderCalendar);
