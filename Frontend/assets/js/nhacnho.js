// nhacnho.js - Lịch uống tránh thai có lưu ngày bắt đầu & trạng thái uống

const calendarGrid = document.querySelector(".calendar-grid");
const title = document.getElementById("calendarTitle");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");
const summaryBox = document.getElementById("summaryBox");

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

// ==== Ngày bắt đầu uống ====
function getStartDate() {
  const dateStr = localStorage.getItem("startDate");
  return dateStr ? new Date(dateStr) : null;
}

function saveStartDate() {
  const input = document.getElementById("startDate").value;
  if (!input) return alert("Vui lòng chọn ngày bắt đầu!");
  localStorage.setItem("startDate", input);
  alert("Đã lưu ngày bắt đầu: " + input);
  document.getElementById("startDateWrapper").classList.add("hidden");
  renderCalendar();
}

// ==== Key localStorage theo tháng-năm ====
function getKey() {
  return `missedDays_${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}`;
}

function getMissedDays() {
  return JSON.parse(localStorage.getItem(getKey())) || [];
}

function saveMissedDays(missed) {
  localStorage.setItem(getKey(), JSON.stringify(missed));
}

function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function getWeekday(year, month, day) {
  return new Date(year, month, day).getDay();
}

// ==== Vẽ lịch ====
function renderCalendar() {
  title.textContent = `${currentYear} - Tháng ${currentMonth + 1}`;
  calendarGrid.innerHTML = '';

  const missedDays = getMissedDays();
  const totalDays = daysInMonth(currentMonth, currentYear);
  const firstDayOffset = getWeekday(currentYear, currentMonth, 1);
  const startDate = getStartDate();

  const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  weekdays.forEach(day => {
    const header = document.createElement("div");
    header.className = "day-name";
    header.textContent = day;
    calendarGrid.appendChild(header);
  });

  for (let i = 0; i < firstDayOffset; i++) {
    const empty = document.createElement("div");
    calendarGrid.appendChild(empty);
  }

  for (let day = 1; day <= totalDays; day++) {
    const div = document.createElement("div");
    div.className = "day";
    div.textContent = day;

    const dateObj = new Date(currentYear, currentMonth, day);
    const isToday = dateObj.toDateString() === today.toDateString();
    div.dataset.date = dateObj.toISOString().split('T')[0];

    if (startDate && dateObj >= startDate && dateObj <= today && !localStorage.getItem(getKey())) {
      div.classList.add("x");
      missedDays.push(day);
    } else {
      if (missedDays.includes(day)) {
        div.classList.add("x");
      } else if (missedDays.length > 0) {
        div.classList.add("check");
      }
    }

    if (isToday) div.classList.add("today");

    div.addEventListener("click", () => {
      const index = missedDays.indexOf(day);
      if (index !== -1) missedDays.splice(index, 1);
      else missedDays.push(day);
      saveMissedDays(missedDays);
      renderCalendar();
    });

    calendarGrid.appendChild(div);
  }

  const drank = totalDays - missedDays.length;
  const missed = missedDays.length;
  summaryBox.innerHTML = `
    <p><strong>\u0110\u00e3 uống:</strong> ${drank} ngày</p>
    <p><strong>Chưa uống:</strong> ${missed} ngày</p>
  `;

  if (!localStorage.getItem(getKey()) && missedDays.length > 0) {
    saveMissedDays(missedDays);
  }
}

// ==== Reset lịch ====
function resetLich() {
  if (confirm("Bạn có chắc muốn đặt lại toàn bộ lịch không?")) {
    const totalDays = daysInMonth(currentMonth, currentYear);
    const allDaysMissed = Array.from({ length: totalDays }, (_, i) => i + 1);
    saveMissedDays(allDaysMissed);
    renderCalendar();
  }
}

// ==== Điều hướng tháng ====
prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

// ==== Khi load trang ====
document.addEventListener("DOMContentLoaded", () => {
  const savedStart = localStorage.getItem("startDate");
  const startDateWrapper = document.getElementById("startDateWrapper");

  if (!savedStart && startDateWrapper) {
    startDateWrapper.classList.remove("hidden");
  }

  if (savedStart && document.getElementById("startDate")) {
    document.getElementById("startDate").value = savedStart;
  }

  renderCalendar();
  suggestNextPack();
});
function suggestNextPack() {
  const startDate = getStartDate();
  if (!startDate) return;

  const now = new Date();
  const diffInDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
  const currentCycle = Math.floor(diffInDays / 28) + 1;
  const nextPackStart = new Date(startDate);
  nextPackStart.setDate(startDate.getDate() + 28 * currentCycle);

  const message = `
    📦 Vỉ hiện tại: Vỉ số ${currentCycle} (từ ${formatDate(new Date(startDate.getTime() + 28 * (currentCycle - 1) * 24 * 60 * 60 * 1000))})
    <br>📅 Bạn nên bắt đầu vỉ mới vào: <strong>${formatDate(nextPackStart)}</strong>
  `;
  document.getElementById("packSuggestion").innerHTML = message;
}

// Định dạng ngày dd/mm/yyyy
function formatDate(date) {
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
    .toString().padStart(2, '0')}/${date.getFullYear()}`;
}
