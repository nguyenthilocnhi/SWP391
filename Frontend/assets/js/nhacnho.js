const calendarGrid = document.querySelector(".calendar-grid");
const title = document.getElementById("calendarTitle");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");
const summaryBox = document.getElementById("summaryBox");

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function getStartDate() {
  const dateStr = localStorage.getItem("startDate");
  return dateStr ? new Date(dateStr) : null;
}

function getPillCycle() {
  return parseInt(localStorage.getItem("pillCycle") || "28");
}

function saveStartDate() {
  const input = document.getElementById("startDate").value;
  const cycle = document.getElementById("pillCycle").value;
  if (!input) return alert("Vui lòng chọn ngày bắt đầu!");
  localStorage.setItem("startDate", input);
  localStorage.setItem("pillCycle", cycle);
  alert(`Đã lưu ngày bắt đầu và chu kỳ ${cycle} ngày.`);
  document.getElementById("startDateWrapper").classList.add("hidden");
  renderCalendar();
}

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

function renderCalendar() {
  title.textContent = `${currentYear} - Tháng ${currentMonth + 1}`;
  calendarGrid.innerHTML = '';

  const missedDays = getMissedDays();
  const totalDays = daysInMonth(currentMonth, currentYear);
  const firstDayOffset = getWeekday(currentYear, currentMonth, 1);
  const startDate = getStartDate();
  const cycleLength = getPillCycle();

  const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  weekdays.forEach(day => {
    const header = document.createElement("div");
    header.className = "day-name";
    header.textContent = day;
    calendarGrid.appendChild(header);
  });

  for (let i = 0; i < firstDayOffset; i++) {
    calendarGrid.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= totalDays; day++) {
    const div = document.createElement("div");
    div.className = "day";
    div.textContent = day;

    const dateObj = new Date(currentYear, currentMonth, day);
    const isToday = dateObj.toDateString() === today.toDateString();
    div.dataset.date = dateObj.toISOString().split('T')[0];

    let isInCycle = false;
    if (startDate && dateObj >= startDate) {
      const diffDays = Math.floor((dateObj - startDate) / (1000 * 60 * 60 * 24));
      isInCycle = (diffDays % cycleLength) < cycleLength;
    }

    if (isInCycle) {
      if (
        currentYear > today.getFullYear() ||
        (currentYear === today.getFullYear() && currentMonth > today.getMonth())
      ) {
        // Tháng sau → mặc định là chưa uống
        if (!missedDays.includes(day)) missedDays.push(day);
        div.classList.add("x");
      } else {
        if (missedDays.includes(day)) {
          div.classList.add("x");
        } else {
          div.classList.add("check");
        }

        div.addEventListener("click", () => {
          const index = missedDays.indexOf(day);
          if (index !== -1) missedDays.splice(index, 1);
          else missedDays.push(day);
          saveMissedDays(missedDays);
          renderCalendar();
        });
      }

      if (isToday) div.classList.add("today");
    } else {
      div.style.opacity = "0.2";
      div.style.pointerEvents = "none";
    }

    calendarGrid.appendChild(div);
  }

  saveMissedDays(missedDays);

  const drank = totalDays - missedDays.length;
  const missed = missedDays.length;
  summaryBox.innerHTML = `
    <p><strong>Đã uống:</strong> ${drank} ngày</p>
    <p><strong>Chưa uống:</strong> ${missed} ngày</p>
  `;
}

function suggestNextPack() {
  const startDate = getStartDate();
  if (!startDate) return;
  const cycleLength = getPillCycle();

  const now = new Date();
  const diffInDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
  const currentCycle = Math.floor(diffInDays / cycleLength) + 1;

  const currentPackStart = new Date(startDate);
  currentPackStart.setDate(startDate.getDate() + (currentCycle - 1) * cycleLength);

  const nextPackStart = new Date(currentPackStart);
  nextPackStart.setDate(currentPackStart.getDate() + cycleLength);

  const message = `
    📦 Vỉ hiện tại: Vỉ số ${currentCycle} (từ ${formatDate(currentPackStart)})
    <br>📅 Bạn nên bắt đầu vỉ mới vào: <strong>${formatDate(nextPackStart)}</strong>
  `;
  document.getElementById("packSuggestion").innerHTML = message;
}

function resetLich() {
  if (confirm("Bạn có chắc muốn đặt lại toàn bộ lịch không?")) {
    const totalDays = daysInMonth(currentMonth, currentYear);
    const allDaysMissed = Array.from({ length: totalDays }, (_, i) => i + 1);
    saveMissedDays(allDaysMissed);
    renderCalendar();
  }
}

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

document.addEventListener("DOMContentLoaded", () => {
  const savedStart = localStorage.getItem("startDate");
  const savedCycle = localStorage.getItem("pillCycle");
  const startDateWrapper = document.getElementById("startDateWrapper");

  if (!savedStart && startDateWrapper) {
    startDateWrapper.classList.remove("hidden");
  }

  if (savedStart && document.getElementById("startDate")) {
    document.getElementById("startDate").value = savedStart;
  }

  if (savedCycle && document.getElementById("pillCycle")) {
    document.getElementById("pillCycle").value = savedCycle;
  }

  renderCalendar();
  suggestNextPack();
});

function formatDate(date) {
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
    .toString().padStart(2, '0')}/${date.getFullYear()}`;
}
