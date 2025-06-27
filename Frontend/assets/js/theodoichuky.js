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

function formatDateVN(d) {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
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
    
    // Kiểm tra ngày hành kinh thực tế
    if (periodData.includes(iso)) return "period";
    
    // Chỉ dự đoán khi có dữ liệu kỳ kinh thực tế
    if (periodData.length === 0) return "";

    // Lấy các chu kỳ kinh nguyệt
    const ranges = getPeriodRanges();
    if (ranges.length === 0) return "";

    const today = new Date();
    const lastPeriodStart = ranges[ranges.length - 1].start;
    
    // Tìm chu kỳ mà ngày này thuộc về
    let targetPeriodStart = null;
    let isCurrentCycle = false;
    
    // Kiểm tra xem có thuộc chu kỳ hiện tại không
    const currentCycleEnd = new Date(lastPeriodStart);
    currentCycleEnd.setDate(currentCycleEnd.getDate() + cycleLength);
    
    if (date >= lastPeriodStart && date < currentCycleEnd) {
        targetPeriodStart = lastPeriodStart;
        isCurrentCycle = true;
    } else {
        // Tìm trong các chu kỳ tiếp theo
        for (let i = 1; i <= 6; i++) {
            const nextPeriodStart = new Date(lastPeriodStart);
            nextPeriodStart.setDate(nextPeriodStart.getDate() + cycleLength * i);
            
            const nextCycleEnd = new Date(nextPeriodStart);
            nextCycleEnd.setDate(nextCycleEnd.getDate() + cycleLength);
            
            if (date >= nextPeriodStart && date < nextCycleEnd) {
                targetPeriodStart = nextPeriodStart;
                break;
            }
        }
    }
    
    if (!targetPeriodStart) return "";

    // Tính toán các ngày quan trọng trong chu kỳ
    const ovulationDate = new Date(targetPeriodStart);
    ovulationDate.setDate(ovulationDate.getDate() + 14);

    // Giai đoạn dễ thụ thai: từ ovulationDate - 5 đến ovulationDate + 1 (6 ngày)
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(fertileStart.getDate() - 5);
    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(fertileEnd.getDate() + 1);

    // Kiểm tra các giai đoạn dự đoán
    const diff = Math.floor((date - targetPeriodStart) / (1000 * 60 * 60 * 24));
    
    // Ngày hành kinh dự đoán - CHỈ cho chu kỳ tiếp theo, không phải chu kỳ hiện tại
    if (!isCurrentCycle && diff >= 0 && diff < periodLength) {
        return "period-predict";
    }
    
    // Ngày rụng trứng dự đoán
    if (formatDate(date) === formatDate(ovulationDate)) {
        return "ovulation-predict";
    }
    
    // Giai đoạn dễ thụ thai
    if (date >= fertileStart && date <= fertileEnd) {
        return "fertile-predict";
    }

    // Giai đoạn an toàn: trong chu kỳ dự đoán, không thuộc các giai đoạn trên
    if (diff >= 0 && diff < cycleLength &&
        !(
            (!isCurrentCycle && diff >= 0 && diff < periodLength) ||
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
    const monthNames = [
        'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
        'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ];
    mainMonthYear.textContent = `${monthNames[m]} năm ${y}`;
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
    updateReminders();
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

    const labels = sorted.slice(1).map(d => formatDateVN(d));
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

    let messages = [];

    // Kiểm tra dữ liệu kỳ kinh
    if (periodData.length) {
        const sortedPeriods = periodData.map(d => parseDate(d)).sort((a, b) => a - b);
        let lastPeriod = null;
        for (let i = sortedPeriods.length - 1; i >= 0; i--) {
            if (sortedPeriods[i] <= new Date()) {
                lastPeriod = sortedPeriods[i];
                break;
            }
        }
        
        if (lastPeriod) {
            const todayDate = new Date();
            const daysSinceLastPeriod = Math.floor((todayDate - lastPeriod) / (1000 * 60 * 60 * 24));

            // Nhắc ngày hành kinh
            if (daysSinceLastPeriod >= 0 && daysSinceLastPeriod < periodLength) {
                const periodStartDate = formatDateVN(lastPeriod);
                messages.push(`🩸 Bạn đang trong kỳ hành kinh (bắt đầu từ ${periodStartDate}). Hãy chăm sóc sức khỏe và nghỉ ngơi hợp lý.`);
            }
            // Nhắc ngày dễ thụ thai
            if (daysSinceLastPeriod >= 12 && daysSinceLastPeriod <= 16) {
                const ovulationDate = new Date(lastPeriod);
                ovulationDate.setDate(ovulationDate.getDate() + 14);
                const ovulationDateVN = formatDateVN(ovulationDate);
                messages.push(`🌱 Bạn đang trong giai đoạn dễ thụ thai (rụng trứng dự kiến ${ovulationDateVN}). Hãy lưu ý nếu bạn có kế hoạch hoặc tránh thai.`);
            }
        }
    }

    // Thông điệp theo tâm trạng - LUÔN hiển thị nếu có
    const moodMessages = {
        "Rất hạnh phúc": "😄 Bạn đang rất vui vẻ! Hãy lan tỏa năng lượng tích cực này đến mọi người xung quanh nhé.",
        "Hạnh phúc": "😊 Một ngày tuyệt vời! Hãy tận hưởng và làm điều bạn yêu thích.",
        "Bình thường": "😐 Nếu có điều gì khiến bạn chưa vui, hãy thử thư giãn hoặc chia sẻ với bạn bè.",
        "Không vui": "😕 Bạn đang không vui. Hãy dành thời gian cho bản thân, nghỉ ngơi hoặc tâm sự với người thân.",
        "Phiền muộn": "😢 Bạn đang cảm thấy phiền muộn. Đừng ngần ngại tìm kiếm sự hỗ trợ từ người thân hoặc chuyên gia."
    };
    const mood = localStorage.getItem(`mood-${today}`);
    if (mood && moodMessages[mood]) {
        messages.push(moodMessages[mood]);
    }

    // Thông điệp mặc định nếu không có thông điệp nào khác
    if (messages.length === 0) {
        const todayVN = formatDateVN(new Date());
        messages.push(`💝 Chúc bạn một ngày khỏe mạnh và vui vẻ! (${todayVN})`);
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

    // Hiển thị ngày hiện tại theo định dạng Việt Nam
    const todayDateElement = document.getElementById('today-date');
    if (todayDateElement) {
        todayDateElement.textContent = formatDateVN(new Date());
    }

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
