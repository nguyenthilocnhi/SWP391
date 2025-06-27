const mainCalendar = document.getElementById('mainCalendar');
const mainMonthYear = document.getElementById('mainMonthYear');
const moodIcons = document.querySelectorAll(".mood-icon");
const selectedMood = document.getElementById("selected-mood");
const cycleWarning = document.getElementById('cycle-warning');
const reminderMessages = document.getElementById('reminderMessages');

let mainDate = new Date();
let periodData = JSON.parse(localStorage.getItem("periodData") || "[]");

// === HỖ TRỢ ĐỊNH DẠNG NGÀY ===
function formatDate(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function parseDate(str) {
    return new Date(str + "T00:00:00");
}

function getTodayStr() {
    return formatDate(new Date());
}

// === TÍNH TRUNG BÌNH CHU KỲ ===
function getAverageCycle() {
    if (periodData.length < 2) return 28;
    const sorted = periodData.map(d => parseDate(d)).sort((a, b) => a - b);
    let total = 0;
    for (let i = 1; i < sorted.length; i++) {
        total += (sorted[i] - sorted[i - 1]) / (1000 * 3600 * 24);
    }
    return Math.round(total / (sorted.length - 1));
}

// === HIỂN THỊ LỊCH CHÍNH ===
function getDayType(date) {
    const iso = formatDate(date);
    const cycleLength = parseInt(localStorage.getItem("customCycleLength")) || 28;
    const periodLength = parseInt(localStorage.getItem("customPeriodLength")) || 5;
    if (periodData.includes(iso)) return "period";
    
    // Chỉ dự đoán khi có dữ liệu kỳ kinh thực tế
    if (periodData.length === 0) return "";

    // Lấy ngày đầu kỳ kinh gần nhất
    const ranges = getPeriodRanges();
    if (ranges.length === 0) return "";
    
    const lastPeriodStart = ranges[ranges.length - 1].start;

    // Dự đoán 3 chu kỳ tiếp theo
    const nextPeriodStart1 = new Date(lastPeriodStart);
    nextPeriodStart1.setDate(nextPeriodStart1.getDate() + cycleLength);
    
    const nextPeriodStart2 = new Date(lastPeriodStart);
    nextPeriodStart2.setDate(nextPeriodStart2.getDate() + cycleLength * 2);
    
    const nextPeriodStart3 = new Date(lastPeriodStart);
    nextPeriodStart3.setDate(nextPeriodStart3.getDate() + cycleLength * 3);

    // Kiểm tra ngày hiện tại có thuộc 1 trong 3 chu kỳ dự đoán không
    let currentPeriodStart = null;
    
    if (date >= nextPeriodStart1 && date < new Date(nextPeriodStart1.getTime() + cycleLength * 24 * 60 * 60 * 1000)) {
        currentPeriodStart = nextPeriodStart1;
    } else if (date >= nextPeriodStart2 && date < new Date(nextPeriodStart2.getTime() + cycleLength * 24 * 60 * 60 * 1000)) {
        currentPeriodStart = nextPeriodStart2;
    } else if (date >= nextPeriodStart3 && date < new Date(nextPeriodStart3.getTime() + cycleLength * 24 * 60 * 60 * 1000)) {
        currentPeriodStart = nextPeriodStart3;
    }
    
    if (!currentPeriodStart) return "";

    // Ngày rụng trứng của chu kỳ hiện tại
    const ovulationDate = new Date(currentPeriodStart);
    ovulationDate.setDate(ovulationDate.getDate() - 14);

    // Giai đoạn dễ thụ thai: từ ovulationDate - 5 đến ovulationDate + 1
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(fertileStart.getDate() - 5);
    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(fertileEnd.getDate() + 1);

    // Kiểm tra các giai đoạn dự đoán
    const diff = Math.floor((date - currentPeriodStart) / (1000 * 60 * 60 * 24));
    if (diff >= 0 && diff < periodLength) return "period-predict";

    if (formatDate(date) === formatDate(ovulationDate)) return "ovulation-predict";
    if (date >= fertileStart && date <= fertileEnd) return "fertile-predict";

    // Giai đoạn an toàn: trong chu kỳ dự đoán, không thuộc các giai đoạn trên
    const diffFromCurrentStart = Math.floor((date - currentPeriodStart) / (1000 * 60 * 60 * 24));
    if (diffFromCurrentStart >= 0 && diffFromCurrentStart < cycleLength &&
        !(
            (diffFromCurrentStart >= 0 && diffFromCurrentStart < periodLength) ||
            (date >= fertileStart && date <= fertileEnd) ||
            formatDate(date) === formatDate(ovulationDate)
        )
    ) {
        return "safe-predict";
    }

    return "";
}

function renderCalendar(container, year, month) {
    container.innerHTML = "";
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Header: Thứ
    const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    dayNames.forEach((dn) => {
        const th = document.createElement('div');
        th.classList.add('day', 'readonly');
        th.textContent = dn;
        container.appendChild(th);
    });

    // Tạo ô trống đầu tháng
    const startWeekday = firstDay.getDay();
    for (let i = 0; i < startWeekday; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('day', 'readonly');
        container.appendChild(emptyDiv);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, month, d);
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.textContent = d;

        if (formatDate(date) === getTodayStr()) {
            dayDiv.classList.add('today');
            // Hiển thị icon tâm trạng nếu có
            const mood = localStorage.getItem(`mood-${getTodayStr()}`);
            if (mood) {
                let emoji = '';
                if (mood === 'Rất hạnh phúc') emoji = '😄';
                else if (mood === 'Hạnh phúc') emoji = '😊';
                else if (mood === 'Bình thường') emoji = '😐';
                else if (mood === 'Không vui') emoji = '😕';
                else if (mood === 'Phiền muộn') emoji = '😢';
                if (emoji) {
                    dayDiv.innerHTML = d + '<div style="font-size:1.2em;">' + emoji + '</div>';
                }
            }
        }

        // Phân loại ngày
        const dayType = getDayType(date);
        switch (dayType) {
            case "period": dayDiv.classList.add("period"); break;
            case "period-predict": dayDiv.classList.add("period-predict"); break;
            case "fertile-predict": dayDiv.classList.add("fertile-predict"); break;
            case "ovulation-predict": dayDiv.classList.add("ovulation-predict"); break;
            case "safe-predict": dayDiv.classList.add("safe-predict"); break;
        }

        // Cho phép click để chọn ngày hành kinh
        dayDiv.style.cursor = 'pointer';
        dayDiv.addEventListener('click', function () {
            const iso = formatDate(date);
            let data = JSON.parse(localStorage.getItem("periodData") || "[]");
            if (data.includes(iso)) {
                data = data.filter(d => d !== iso);
            } else {
                data.push(iso);
            }
            localStorage.setItem("periodData", JSON.stringify(data));
            periodData = data;
            renderMainCalendar();
            updateCycleStats();
        });

        container.appendChild(dayDiv);
    }
}

function renderMainCalendar() {
    const y = mainDate.getFullYear();
    const m = mainDate.getMonth();
    mainMonthYear.textContent = `${y} - Tháng ${m + 1}`;
    renderCalendar(mainCalendar, y, m);
}

function getPeriodRanges() {
    if (periodData.length === 0) return [];
    let sorted = periodData.map(d => parseDate(d)).sort((a, b) => a - b);
    let periods = [];
    let current = [];
    for (let i = 0; i < sorted.length; i++) {
        if (i === 0 || (sorted[i] - sorted[i - 1]) / (1000 * 60 * 60 * 24) === 1) {
            current.push(sorted[i]);
        } else {
            if (current.length > 0) periods.push(current);
            current = [sorted[i]];
        }
    }
    if (current.length > 0) periods.push(current);
    return periods.map(p => ({ start: p[0], end: p[p.length - 1] }));
}

function applySettings() {
    const periodLength = document.getElementById('period-length').value;
    const cycleLength = document.getElementById('cycle-length').value;
    
    localStorage.setItem("customPeriodLength", periodLength);
    localStorage.setItem("customCycleLength", cycleLength);
    
    renderMainCalendar();
    updateCycleStats();
    updateReminders();
}

// === TÂM TRẠNG ===
function saveMood(mood) {
    localStorage.setItem(`mood-${getTodayStr()}`, mood);
    selectedMood.textContent = mood;
    moodIcons.forEach(icon => {
        icon.classList.remove("selected");
        if (icon.dataset.mood === mood) icon.classList.add("selected");
    });
    renderMainCalendar();
}

function loadMood() {
    const mood = localStorage.getItem(`mood-${getTodayStr()}`);
    if (mood) {
        selectedMood.textContent = mood;
        moodIcons.forEach(icon => {
            icon.classList.remove("selected");
            if (icon.dataset.mood === mood) icon.classList.add("selected");
        });
    } else {
        selectedMood.textContent = "Chưa chọn";
        moodIcons.forEach(ic => ic.classList.remove("selected"));
    }
}

// Event listener cho mood icons
moodIcons.forEach(icon => {
    icon.addEventListener('click', function() {
        const mood = this.dataset.mood;
        if (selectedMood.textContent === mood) {
            localStorage.removeItem(`mood-${getTodayStr()}`);
            selectedMood.textContent = "Chưa chọn";
            moodIcons.forEach(ic => ic.classList.remove("selected"));
            renderMainCalendar();
            updateReminders();
        } else {
            saveMood(mood);
            updateReminders();
        }
    });
});

// === THỐNG KÊ CHU KỲ ===
const cycleChartCtx = document.getElementById('cycleChart').getContext('2d');
let cycleChart;

function updateCycleStats() {
    if (periodData.length < 2) {
        cycleWarning.textContent = "Dữ liệu chu kỳ chưa đủ để thống kê.";
        if (cycleChart) cycleChart.destroy();
        return;
    }

    cycleWarning.textContent = "";
    const sorted = periodData.map(d => parseDate(d)).sort((a, b) => a - b);
    const cycleLengths = [];
    for (let i = 1; i < sorted.length; i++) {
        cycleLengths.push(Math.round((sorted[i] - sorted[i - 1]) / (1000 * 60 * 60 * 24)));
    }

    const labels = sorted.slice(1).map(d => formatDate(d));
    if (cycleChart) cycleChart.destroy();
    cycleChart = new Chart(cycleChartCtx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Độ dài chu kỳ (ngày)',
                data: cycleLengths,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16,185,129,0.2)',
                fill: true,
                tension: 0.3,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    suggestedMin: 20,
                    suggestedMax: 45,
                    stepSize: 1,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}

// === NHẮC NHỞ CÁ NHÂN HÓA ===
function updateReminders() {
    reminderMessages.innerHTML = "";
    const today = getTodayStr();
    const cycleLength = parseInt(localStorage.getItem("customCycleLength")) || getAverageCycle();
    const periodLength = parseInt(localStorage.getItem("customPeriodLength")) || 5;

    if (!periodData.length) {
        reminderMessages.textContent = "Bạn chưa nhập dữ liệu kỳ kinh nào, vui lòng cập nhật để nhận nhắc nhở chính xác.";
        return;
    }
    
    const sortedPeriods = periodData.map(d => parseDate(d)).sort((a, b) => a - b);
    let lastPeriod = null;
    for (let i = sortedPeriods.length - 1; i >= 0; i--) {
        if (sortedPeriods[i] <= new Date()) {
            lastPeriod = sortedPeriods[i];
            break;
        }
    }
    if (!lastPeriod) {
        reminderMessages.textContent = "Không tìm thấy dữ liệu kỳ kinh phù hợp để nhắc nhở.";
        return;
    }

    const todayDate = new Date();
    const daysSinceLastPeriod = Math.floor((todayDate - lastPeriod) / (1000 * 60 * 60 * 24));

    let messages = [];

    // Nhắc ngày hành kinh
    if (daysSinceLastPeriod >= 0 && daysSinceLastPeriod < periodLength) {
        messages.push("Bạn đang trong kỳ hành kinh. Hãy chăm sóc sức khỏe và nghỉ ngơi hợp lý.");
    }
    // Nhắc ngày dễ thụ thai
    if (daysSinceLastPeriod >= 12 && daysSinceLastPeriod <= 16) {
        messages.push("Bạn đang trong giai đoạn dễ thụ thai. Hãy lưu ý nếu bạn có kế hoạch hoặc tránh thai.");
    }

    // Thông điệp theo tâm trạng
    const moodMessages = {
        "Rất hạnh phúc": "Bạn đang rất vui vẻ! Hãy lan tỏa năng lượng tích cực này đến mọi người xung quanh nhé.",
        "Hạnh phúc": "Một ngày tuyệt vời! Hãy tận hưởng và làm điều bạn yêu thích.",
        "Bình thường": "Nếu có điều gì khiến bạn chưa vui, hãy thử thư giãn hoặc chia sẻ với bạn bè.",
        "Không vui": "Bạn đang không vui. Hãy dành thời gian cho bản thân, nghỉ ngơi hoặc tâm sự với người thân.",
        "Phiền muộn": "Bạn đang cảm thấy phiền muộn. Đừng ngần ngại tìm kiếm sự hỗ trợ từ người thân hoặc chuyên gia."
    };
    const mood = localStorage.getItem(`mood-${today}`);
    if (mood && moodMessages[mood]) {
        messages.push(moodMessages[mood]);
    }

    if (messages.length === 0) {
        messages.push("Chúc bạn một ngày khỏe mạnh và vui vẻ!");
    }

    reminderMessages.innerHTML = messages.map(m => `<p>• ${m}</p>`).join("");
}

// === TỰ ĐỘNG REFRESH LỊCH KHI SANG NGÀY MỚI ===
let lastTodayStr = getTodayStr();
setInterval(() => {
    const nowTodayStr = getTodayStr();
    if (nowTodayStr !== lastTodayStr) {
        lastTodayStr = nowTodayStr;
        renderMainCalendar();
    }
}, 60 * 1000);

// === KHỞI ĐỘNG ===
document.addEventListener('DOMContentLoaded', () => {
    renderMainCalendar();

    // Cài đặt nút chuyển tháng
    document.getElementById('prevMainMonth').onclick = () => {
        mainDate.setMonth(mainDate.getMonth() - 1);
        renderMainCalendar();
    };
    document.getElementById('nextMainMonth').onclick = () => {
        mainDate.setMonth(mainDate.getMonth() + 1);
        renderMainCalendar();
    };

    // Cài đặt nút lưu cài đặt chu kỳ
    document.getElementById('apply-settings').onclick = applySettings;

    // Load tâm trạng hôm nay
    loadMood();

    // Cập nhật thống kê
    updateCycleStats();

    // Cập nhật nhắc nhở
    updateReminders();
});
