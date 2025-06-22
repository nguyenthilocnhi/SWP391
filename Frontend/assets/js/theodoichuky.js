let currentDate = new Date();
let cycleStart = new Date(2025, 3, 1); // Ngày bắt đầu giả định: 1/4/2025

// Dữ liệu lưu trạng thái thủ công từng ngày: { "YYYY-MM-DD": "period" | "fertile" | "safe" }
let dayStates = {};
const storageKey = "cycle-tracker";

// Định dạng ngày YYYY-MM-DD
function formatDate(date) {
    return date.toISOString().split("T")[0];
}

function getSetting(name, defaultValue) {
    const input = document.getElementById(name);
    return input ? parseInt(input.value) || defaultValue : defaultValue;
}

function renderCalendar() {
    const grid = document.getElementById("calendar-grid");
    const monthLabel = document.getElementById("month-label");
    grid.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    monthLabel.textContent = `Tháng ${month + 1} ${year}`;

    const periodLength = getSetting("period-length", 5);
    const cycleLength = getSetting("cycle-length", 28);

    // Thêm khoảng trắng đầu tháng
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyDiv = document.createElement("div");
        grid.appendChild(emptyDiv);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const cellDate = new Date(year, month, day);
        const dateStr = formatDate(cellDate);
        const diffDays = Math.floor((cellDate - cycleStart) / (1000 * 60 * 60 * 24));
        const cyclePos = ((diffDays % cycleLength) + cycleLength) % cycleLength;

        const div = document.createElement("div");
        div.classList.add("day");
        div.textContent = `${day}`;

        const icon = document.createElement("span");
        icon.classList.add("icon");

        // Xác định trạng thái mặc định nếu không có trạng thái thủ công
        let state = dayStates[dateStr];
        if (!state) {
            if (cyclePos < periodLength) state = "period";
            else if (cyclePos >= 10 && cyclePos <= 15) state = "fertile";
            else state = "safe";
        }

        icon.classList.add(`icon-${state}`);
        div.appendChild(icon);

        // Lưu trạng thái hiện tại cho ngày đó
        dayStates[dateStr] = state;

        // Click để chuyển trạng thái: period → fertile → safe → period
        div.addEventListener("click", () => {
            // Toggle giữa có kinh (period) và không (xóa)
            if (dayStates[dateStr] === "period") {
                delete dayStates[dateStr]; // xóa nếu đã có
            } else {
                dayStates[dateStr] = "period"; // gán là có kinh
            }

            localStorage.setItem(storageKey, JSON.stringify(dayStates));
            renderCalendar(); // vẽ lại
        });
    }
}

function renderAdvice(isPeriod, mood, discharge) {
    let text = "";

    if (isPeriod) text += "Bạn đang trong kỳ kinh. Nghỉ ngơi, uống nước ấm, ăn nhẹ.\n";

    if (mood === "Nổi giận") {
        text += "Bạn có thể đang cáu gắt. Hãy thư giãn và tránh tranh cãi.\n";
    } else if (mood === "Tâm trạng thất thường") {
        text += "Cảm xúc thất thường. Nên vận động nhẹ và nghỉ ngơi.\n";
    }

    if (discharge === "Ẩm") {
        text += "Có thể đang đến thời kỳ rụng trứng. Giữ vệ sinh vùng kín.\n";
    } else if (discharge === "Nhiều") {
        text += "Khí hư nhiều. Đây là thời kỳ dễ thụ thai.\n";
    }

    if (!text) {
        text = "Hôm nay bạn ổn định. Duy trì chế độ sống lành mạnh!";
    }

    document.getElementById("health-advice").textContent = text;
}

// === SỰ KIỆN ===
document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem(storageKey);
    if (saved) dayStates = JSON.parse(saved);

    document.getElementById("prev-month").onclick = () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    };

    document.getElementById("next-month").onclick = () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    };

    document.getElementById("apply-settings").onclick = () => {
        renderCalendar();
    };

    document.getElementById("save-today").onclick = () => {
        const isPeriod = document.getElementById("today-period").checked;
        const mood = document.getElementById("mood").value;
        const discharge = document.getElementById("discharge").value;
        renderAdvice(isPeriod, mood, discharge);
    };

    renderCalendar();
});
