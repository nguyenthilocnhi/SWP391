document.addEventListener("DOMContentLoaded", () => {
  const timeSlots = ["06:00 - 11:00", "11:00 - 16:00", "16:00 - 21:00"];
  const days = ["2", "3", "4", "5", "6", "7", "CN"];
  const table = document.getElementById("scheduleTable");
  const weekSelect = document.getElementById("weekSelect");
  const clearButton = document.getElementById("clearWeek");
  const exportButton = document.getElementById("exportSchedule");
  const importInput = document.getElementById("importSchedule");

  // Mock dữ liệu lịch hẹn khách hàng
  const customerAppointments = {
    "2025-06-03": {
      "06:00 - 11:00": true,
      "16:00 - 21:00": true
    },
    "2025-06-04": {
      "06:00 - 11:00": true
    }
  };

  function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    return `${day}/${month}`;
  }

  function generateWeeks(count = 10) {
    const select = document.getElementById("weekSelect");
    select.innerHTML = ""; // Xóa các tuần cũ (nếu có)
    const today = new Date();
    const monday = new Date(today.setDate(today.getDate() - today.getDay() + 1));

    for (let i = 0; i < count; i++) {
      const start = new Date(monday);
      start.setDate(start.getDate() + i * 7);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);

      const value = start.toISOString().split("T")[0];
      const option = document.createElement("option");
      option.value = value;
      option.textContent = `${formatDate(start)} - ${formatDate(end)}`;
      select.appendChild(option);
    }
  }

  function getStorageKey(weekStart) {
    return `schedule-${weekStart}`;
  }

  function getDateString(weekStart, dayOffset) {
    const base = new Date(weekStart);
    base.setDate(base.getDate() + dayOffset);
    return base.toISOString().split("T")[0];
  }

  function isBusySlot(dateStr, timeSlot) {
    return customerAppointments[dateStr] && customerAppointments[dateStr][timeSlot];
  }

  function renderSchedule(weekStart) {
    table.innerHTML = "";
    const key = getStorageKey(weekStart);
    const data = JSON.parse(localStorage.getItem(key)) || {};

    timeSlots.forEach((slot, rowIndex) => {
      const row = document.createElement("tr");

      const timeCell = document.createElement("td");
      timeCell.innerHTML = `<div class="time-slot">${slot}</div>`;
      row.appendChild(timeCell);

      days.forEach((_, colIndex) => {
        const id = `${rowIndex}-${colIndex}`;
        const dateStr = getDateString(weekStart, colIndex);
        const busy = isBusySlot(dateStr, slot);
        let status = busy ? "busy" : data[id] ? "yes" : "no";

        const cell = document.createElement("td");
        const div = document.createElement("div");
        div.className = `block ${status}`;
        div.dataset.id = id;

        if (!busy) {
          div.addEventListener("click", () => {
            const updated = !div.classList.contains("yes");
            div.classList.toggle("yes", updated);
            div.classList.toggle("no", !updated);

            const updatedData = JSON.parse(localStorage.getItem(key)) || {};
            updatedData[id] = updated;
            localStorage.setItem(key, JSON.stringify(updatedData));
          });
        }

        cell.appendChild(div);
        row.appendChild(cell);
      });

      table.appendChild(row);
    });

    updateWeekRangeDisplay(weekStart);
  }

  function updateWeekRangeDisplay(weekStartStr) {
    const weekRange = document.getElementById("weekRange");
    const start = new Date(weekStartStr);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    const format = (d) =>
      d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
    if (weekRange) {
      weekRange.textContent = `${format(start)} - ${format(end)}`;
    }
  }

  // Sự kiện chọn tuần
  weekSelect.addEventListener("change", () => {
    renderSchedule(weekSelect.value);
  });

  // Xóa tất cả lịch trong tuần
  clearButton.addEventListener("click", () => {
    const week = weekSelect.value;
    localStorage.removeItem(getStorageKey(week));
    renderSchedule(week);
  });

  // Xuất lịch ra file JSON
  exportButton.addEventListener("click", () => {
    const week = weekSelect.value;
    const data = JSON.parse(localStorage.getItem(getStorageKey(week))) || {};

    const exportData = { week: week, schedule: data };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lich-lam-viec-${week}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // Nhập lịch từ file JSON
  importInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const imported = JSON.parse(e.target.result);
        if (imported.week && imported.schedule) {
          localStorage.setItem(getStorageKey(imported.week), JSON.stringify(imported.schedule));
          weekSelect.value = imported.week;
          renderSchedule(imported.week);
          alert("📥 Lịch làm việc đã được nhập thành công!");
        } else {
          alert("❌ File không đúng định dạng.");
        }
      } catch (err) {
        alert("❌ Lỗi đọc file JSON.");
      }
    };
    reader.readAsText(file);
  });

  // Khởi tạo trang
  generateWeeks();
  renderSchedule(weekSelect.value);
});
