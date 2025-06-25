// === BIẾN CHUNG ===
const mainCalendar = document.getElementById('mainCalendar');
const predictionCalendar = document.getElementById('predictionCalendar');
const mainMonthYear = document.getElementById('mainMonthYear');
const predictMonthYear = document.getElementById('predictMonthYear');
const predictionText = document.getElementById('predictionText');
const moodIcons = document.querySelectorAll(".mood-icon");
const selectedMood = document.getElementById("selected-mood");
const symptomList = document.getElementById('symptom-list');
const saveSymptomsBtn = document.getElementById('saveSymptomsBtn');
const healthAlert = document.getElementById('healthAlert');
const alertMessage = document.getElementById('alertMessage');
const cycleWarning = document.getElementById('cycle-warning');
const reminderMessages = document.getElementById('reminderMessages');
const suggestionsList = document.getElementById('suggestionsList');
const symptomChartCanvas = document.getElementById('symptomChart');

let mainDate = new Date();
let predictOffset = 1;
let periodData = JSON.parse(localStorage.getItem("periodData") || "[]");
let firstPredictionDate = localStorage.getItem("firstPeriodDateForPrediction") || null;

// === HỖ TRỢ ĐỊNH DẠNG NGÀY ===
function formatDate(d) {
    // Trả về yyyy-mm-dd theo local time
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

// === DỰ ĐOÁN KỲ KINH ===
function predictNextPeriod(n = 1) {
    if (!firstPredictionDate) return null;
    const baseDate = parseDate(firstPredictionDate);
    const cycleLength = parseInt(localStorage.getItem("customCycleLength")) || getAverageCycle();
    baseDate.setDate(baseDate.getDate() + cycleLength * (n - 1));
    return baseDate;
}

// === HIỂN THỊ LỊCH CHÍNH ===
function getDayType(date, isPredict = false, offset = 1) {
    const iso = formatDate(date);
    const cycleLength = parseInt(localStorage.getItem("customCycleLength")) || getAverageCycle();
    const periodLength = parseInt(localStorage.getItem("customPeriodLength")) || 5;

    if (!isPredict) {
        if (periodData.includes(iso)) return "period";

        if (periodData.length === 0) return "";
        const sortedPeriods = periodData.map(d => parseDate(d)).sort((a, b) => a - b);
        let lastPeriod = null;
        for (let i = sortedPeriods.length - 1; i >= 0; i--) {
            if (sortedPeriods[i] <= date) {
                lastPeriod = sortedPeriods[i];
                break;
            }
        }
        if (!lastPeriod) return "";
        const diff = Math.floor((date - lastPeriod) / (1000 * 60 * 60 * 24));
        if (diff === 14) return "ovulation";
        if (diff >= 12 && diff <= 16) return "fertile";
        if (diff > 16 && diff < cycleLength) return "safe";
    } else {
        if (!firstPredictionDate) return "";
        const baseDate = parseDate(firstPredictionDate);
        const nextPeriodStart = new Date(baseDate);
        nextPeriodStart.setDate(baseDate.getDate() + cycleLength * (offset - 1));
        const diff = Math.floor((date - nextPeriodStart) / (1000 * 60 * 60 * 24));
        if (diff >= 0 && diff < periodLength) return "period-predict";
        if (diff === 14) return "ovulation-predict";
        if (diff >= 12 && diff <= 16) return "fertile-predict";
        if (diff > 16 && diff < cycleLength) return "safe-predict";
    }
    return "";
}

function renderCalendar(container, year, month, isPredict = false, offset = 1) {
    container.innerHTML = "";
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Header: Thứ
    const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    dayNames.forEach((dn, idx) => {
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

        // Thêm class cho thứ Bảy và Chủ Nhật
        if (date.getDay() === 6) dayDiv.classList.add('saturday');
        if (date.getDay() === 0) dayDiv.classList.add('sunday');

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

        // Phân loại ngày thực tế
        const dayType = getDayType(date, isPredict, offset);
        switch (dayType) {
            case "period": dayDiv.classList.add("period"); break;
            case "fertile": dayDiv.classList.add("fertile"); break;
            case "ovulation": dayDiv.classList.add("ovulation"); break;
            case "safe": dayDiv.classList.add("safe"); break;
            case "period-predict": dayDiv.classList.add("period-predict"); break;
            case "fertile-predict": dayDiv.classList.add("fertile-predict"); break;
            case "ovulation-predict": dayDiv.classList.add("ovulation-predict"); break;
            case "safe-predict": dayDiv.classList.add("safe-predict"); break;
        }

        // Nếu là lịch chính, cho phép click để chọn ngày hành kinh
        if (!isPredict) {
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
                // Cập nhật ngày đầu tiên cho dự đoán nếu có dữ liệu
                if (periodData.length > 0) {
                    const sorted = periodData.slice().sort();
                    firstPredictionDate = sorted[0];
                    localStorage.setItem("firstPeriodDateForPrediction", firstPredictionDate);
                } else {
                    firstPredictionDate = null;
                    localStorage.removeItem("firstPeriodDateForPrediction");
                }
                renderMainCalendar();
                renderPredictionCalendar(predictOffset);
            });
        }

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
    // Trả về mảng các kỳ: [{start: Date, end: Date}]
    return periods.map(p => ({ start: p[0], end: p[p.length - 1] }));
}

function getAveragePeriodLength() {
    const ranges = getPeriodRanges();
    if (ranges.length === 0) return 5;
    const lengths = ranges.map(r => Math.round((r.end - r.start) / (1000 * 60 * 60 * 24)) + 1);
    return Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length);
}

function getAverageCycleLength() {
    const ranges = getPeriodRanges();
    if (ranges.length < 2) return 28;
    let cycles = [];
    for (let i = 1; i < ranges.length; i++) {
        cycles.push((ranges[i].start - ranges[i - 1].start) / (1000 * 60 * 60 * 24));
    }
    return Math.round(cycles.reduce((a, b) => a + b, 0) / cycles.length);
}

function getFirstPeriodStart() {
    const ranges = getPeriodRanges();
    if (ranges.length === 0) return null;
    return formatDate(ranges[0].start);
}

function renderPredictionCalendar(offset = 1) {
    const ranges = getPeriodRanges();
    const firstPeriodStart = getFirstPeriodStart();
    if (!firstPeriodStart) {
        predictionText.textContent = "Chưa có dữ liệu chu kỳ để dự đoán. Vui lòng nhập kỳ kinh đầu tiên.";
        predictionCalendar.innerHTML = "";
        predictMonthYear.textContent = "";
        return;
    }
    // Tính trung bình chu kỳ và kỳ kinh
    const avgCycle = getAverageCycleLength();
    const avgPeriod = getAveragePeriodLength();
    // Xác định tháng đang xem dựa trên offset (offset là số tháng chênh lệch so với tháng đầu tiên)
    let baseDate = parseDate(firstPeriodStart);
    baseDate.setMonth(baseDate.getMonth() + (offset - 1));
    const y = baseDate.getFullYear();
    const m = baseDate.getMonth();
    predictMonthYear.textContent = `${y} - Tháng ${m + 1}`;

    // Tìm ngày bắt đầu kỳ kinh dự đoán gần nhất trước hoặc trong tháng này
    let lastRealPeriod = ranges[ranges.length - 1];
    let firstPredict = new Date(lastRealPeriod.start);
    while (firstPredict.getFullYear() < y || (firstPredict.getFullYear() === y && firstPredict.getMonth() < m)) {
        firstPredict.setDate(firstPredict.getDate() + avgCycle);
    }
    if (firstPredict.getFullYear() > y || (firstPredict.getFullYear() === y && firstPredict.getMonth() > m)) {
        firstPredict.setDate(firstPredict.getDate() - avgCycle);
    }
    // Dự đoán các kỳ kinh trong tháng này
    let predictDates = {};
    let predictStart = new Date(firstPredict);
    while (predictStart.getFullYear() === y && predictStart.getMonth() === m) {
        // Ngày hành kinh (dự đoán)
        for (let i = 0; i < avgPeriod; i++) {
            const d = new Date(predictStart);
            d.setDate(predictStart.getDate() + i);
            if (d.getMonth() === m && d.getFullYear() === y) {
                const iso = formatDate(d);
                if (!periodData.includes(iso)) {
                    predictDates[iso] = 'period-predict';
                }
            }
        }
        // Ngày rụng trứng
        const ovulationDay = new Date(predictStart);
        ovulationDay.setDate(predictStart.getDate() - (avgCycle - 14));
        if (ovulationDay.getMonth() === m && ovulationDay.getFullYear() === y)
            predictDates[formatDate(ovulationDay)] = 'ovulation-predict';
        // Ngày dễ thụ thai
        const fertileStart = new Date(ovulationDay);
        fertileStart.setDate(ovulationDay.getDate() - 5);
        const fertileEnd = new Date(ovulationDay);
        fertileEnd.setDate(ovulationDay.getDate() + 1);
        for (let d = new Date(fertileStart); d <= fertileEnd; d.setDate(d.getDate() + 1)) {
            if (d.getMonth() === m && d.getFullYear() === y)
                predictDates[formatDate(new Date(d))] = 'fertile-predict';
        }
        // Ngày an toàn
        for (let i = 1; i < avgCycle; i++) {
            const d = new Date(predictStart);
            d.setDate(predictStart.getDate() + i);
            const f = formatDate(d);
            if ((d.getMonth() === m && d.getFullYear() === y) && !predictDates[f]) predictDates[f] = 'safe-predict';
        }
        // Sang kỳ tiếp theo
        predictStart.setDate(predictStart.getDate() + avgCycle);
    }
    // Render lịch dự đoán
    predictionCalendar.innerHTML = "";
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);
    const daysInMonth = lastDay.getDate();
    // Header: Thứ
    const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    dayNames.forEach((dn, idx) => {
        const th = document.createElement('div');
        th.classList.add('day', 'readonly');
        th.textContent = dn;
        predictionCalendar.appendChild(th);
    });
    // Tạo ô trống đầu tháng
    const startWeekday = firstDay.getDay();
    for (let i = 0; i < startWeekday; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('day', 'readonly');
        predictionCalendar.appendChild(emptyDiv);
    }
    for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(y, m, d);
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.textContent = d;
        const dayType = predictDates[formatDate(date)];
        if (dayType) dayDiv.classList.add(dayType);
        predictionCalendar.appendChild(dayDiv);
    }
    // Hiển thị text dự đoán
    let nextPredict = new Date(lastRealPeriod.start);
    while (nextPredict.getFullYear() < y || (nextPredict.getFullYear() === y && nextPredict.getMonth() < m)) {
        nextPredict.setDate(nextPredict.getDate() + avgCycle);
    }
    if (nextPredict.getFullYear() === y && nextPredict.getMonth() === m) {
        predictionText.textContent = `Dự đoán kỳ kinh bắt đầu vào ngày ${formatDate(nextPredict)}`;
    } else {
        predictionText.textContent = '';
    }
}

// === CẬP NHẬT DỮ LIỆU VÀ SETTINGS ===
function applySettings() {
    const periodLengthInput = document.getElementById("period-length");
    const cycleLengthInput = document.getElementById("cycle-length");
    const periodLength = parseInt(periodLengthInput.value);
    const cycleLength = parseInt(cycleLengthInput.value);

    if (periodLength < 1 || periodLength > 15) {
        alert("Độ dài kỳ kinh phải từ 1 đến 15 ngày");
        return;
    }
    if (cycleLength < 20 || cycleLength > 45) {
        alert("Độ dài chu kỳ phải từ 20 đến 45 ngày");
        return;
    }

    localStorage.setItem("customPeriodLength", periodLength);
    localStorage.setItem("customCycleLength", cycleLength);
    alert("Cài đặt đã được cập nhật!");

    // Cập nhật lại lịch dự đoán
    renderPredictionCalendar(predictOffset);
}

// === LƯU VÀ HIỂN THỊ TÂM TRẠNG ===
function saveMood(mood) {
    const today = getTodayStr();
    localStorage.setItem(`mood-${today}`, mood);
    selectedMood.textContent = mood;
    moodIcons.forEach(icon => icon.classList.remove("selected"));
    // đánh dấu lại icon
    moodIcons.forEach(icon => {
        if (icon.dataset.mood === mood) icon.classList.add("selected");
    });
    renderMainCalendar(); // cập nhật lại lịch để hiển thị icon tâm trạng
}

function loadMood() {
    const today = getTodayStr();
    const savedMood = localStorage.getItem(`mood-${today}`) || "Chưa chọn";
    selectedMood.textContent = savedMood;
    moodIcons.forEach(icon => {
        icon.classList.remove("selected");
        if (icon.dataset.mood === savedMood) icon.classList.add("selected");
    });
}

moodIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        const mood = icon.dataset.mood;
        const today = getTodayStr();
        const currentMood = localStorage.getItem(`mood-${today}`);
        if (currentMood === mood) {
            // Nếu đã chọn rồi thì bỏ chọn
            localStorage.removeItem(`mood-${today}`);
            selectedMood.textContent = "Chưa chọn";
            moodIcons.forEach(ic => ic.classList.remove("selected"));
            renderMainCalendar();
        } else {
            saveMood(mood);
        }
    });
});

// === TRIỆU CHỨNG VÀ CẢNH BÁO ===
saveSymptomsBtn.addEventListener('click', () => {
    const checkedSymptoms = Array.from(symptomList.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => cb.value);

    if (checkedSymptoms.length === 0) {
        alert("Bạn chưa chọn triệu chứng nào.");
        return;
    }

    localStorage.setItem(`symptoms-${getTodayStr()}`, JSON.stringify(checkedSymptoms));
    checkHealthAlert(checkedSymptoms);
    updateSymptomStats();
    updateReminders();
    updateSuggestions();
});

// Cảnh báo triệu chứng nghiêm trọng
function checkHealthAlert(symptoms) {
    const dangerSymptoms = [
        "Đau bụng dữ dội",
        "Chảy máu bất thường",
        "Sốt, mệt mỏi"
    ];

    const foundDanger = symptoms.some(s => dangerSymptoms.includes(s));

    if (foundDanger) {
        alertMessage.textContent = "⚠️ Bạn có triệu chứng cảnh báo sức khỏe phụ khoa nghiêm trọng. Vui lòng liên hệ bác sĩ hoặc đến cơ sở y tế để kiểm tra ngay!";
        healthAlert.style.display = "block";
    } else {
        alertMessage.textContent = "";
        healthAlert.style.display = "none";
    }
}

// Khi tải trang, load triệu chứng hôm nay nếu có
function loadTodaySymptoms() {
    const savedSymptoms = JSON.parse(localStorage.getItem(`symptoms-${getTodayStr()}`) || "[]");
    if (savedSymptoms.length > 0) {
        checkHealthAlert(savedSymptoms);
        symptomList.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.checked = savedSymptoms.includes(cb.value);
        });
    }
}

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

// === THỐNG KÊ TRIỆU CHỨNG ===
let symptomChart;

function updateSymptomStats() {
    // Lấy dữ liệu triệu chứng theo tháng hiện tại
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Đếm số ngày mỗi triệu chứng xuất hiện trong tháng
    const symptomCountMap = {
        "Đau bụng dữ dội": 0,
        "Khí hư bất thường": 0,
        "Ngứa vùng kín": 0,
        "Chảy máu bất thường": 0,
        "Sốt, mệt mỏi": 0
    };

    // Duyệt từng ngày trong tháng
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
        const dayStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const symptoms = JSON.parse(localStorage.getItem(`symptoms-${dayStr}`) || "[]");
        symptoms.forEach(s => {
            if (symptomCountMap[s] !== undefined) symptomCountMap[s]++;
        });
    }

    const labels = Object.keys(symptomCountMap);
    const data = Object.values(symptomCountMap);

    const ctx = symptomChartCanvas.getContext('2d');
    if (symptomChart) symptomChart.destroy();

    symptomChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Số ngày triệu chứng xuất hiện trong tháng',
                data,
                backgroundColor: '#10b981',
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    stepSize: 1,
                    ticks: { precision: 0 }
                }
            },
            responsive: true,
        }
    });
}

// === NHẮC NHỞ CÁ NHÂN HÓA ===
function updateReminders() {
    reminderMessages.innerHTML = "";
    const today = getTodayStr();
    const cycleLength = parseInt(localStorage.getItem("customCycleLength")) || getAverageCycle();
    const periodLength = parseInt(localStorage.getItem("customPeriodLength")) || 5;

    // Tính ngày từ kỳ kinh gần nhất
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
    // Nhắc về triệu chứng nguy hiểm
    const symptomsToday = JSON.parse(localStorage.getItem(`symptoms-${today}`) || "[]");
    const dangerSymptoms = ["Đau bụng dữ dội", "Chảy máu bất thường", "Sốt, mệt mỏi"];
    const hasDangerSymptom = symptomsToday.some(s => dangerSymptoms.includes(s));
    if (hasDangerSymptom) {
        messages.push("⚠️ Bạn có triệu chứng cần được chú ý. Vui lòng liên hệ bác sĩ khi cần.");
    }

    if (messages.length === 0) {
        messages.push("Chúc bạn một ngày khỏe mạnh và vui vẻ!");
    }

    reminderMessages.innerHTML = messages.map(m => `<p>• ${m}</p>`).join("");
}

// === GỢI Ý SẢN PHẨM & DINH DƯỠNG ===
function updateSuggestions() {
    suggestionsList.innerHTML = "";
    const cycleLength = parseInt(localStorage.getItem("customCycleLength")) || getAverageCycle();
    const periodLength = parseInt(localStorage.getItem("customPeriodLength")) || 5;

    const today = new Date();
    const sortedPeriods = periodData.map(d => parseDate(d)).sort((a, b) => a - b);
    let lastPeriod = null;
    for (let i = sortedPeriods.length - 1; i >= 0; i--) {
        if (sortedPeriods[i] <= today) {
            lastPeriod = sortedPeriods[i];
            break;
        }
    }
    if (!lastPeriod) {
        suggestionsList.innerHTML = "<li>Vui lòng nhập dữ liệu kỳ kinh để nhận gợi ý phù hợp.</li>";
        return;
    }
    const daysSinceLastPeriod = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24));

    let suggestions = [];

    if (daysSinceLastPeriod >= 0 && daysSinceLastPeriod < periodLength) {
        suggestions.push("Sản phẩm gợi ý: Băng vệ sinh, thuốc giảm đau, trà thảo dược hỗ trợ.");
        suggestions.push("Dinh dưỡng nên ưu tiên: Thực phẩm giàu sắt, nước lọc, rau xanh.");
    } else if (daysSinceLastPeriod >= 12 && daysSinceLastPeriod <= 16) {
        suggestions.push("Sản phẩm gợi ý: Thực phẩm bổ sung vitamin E, các loại hạt.");
        suggestions.push("Dinh dưỡng nên ưu tiên: Trái cây tươi, các loại hạt, cá giàu omega-3.");
    } else {
        suggestions.push("Sản phẩm gợi ý: Thực phẩm bổ sung cân bằng dinh dưỡng.");
        suggestions.push("Dinh dưỡng nên ưu tiên: Chế độ ăn đa dạng, nhiều rau củ quả.");
    }

    suggestionsList.innerHTML = suggestions.map(s => `<li>${s}</li>`).join("");
}

// === GHI NHẬN & QUẢN LÝ KỲ KINH NGUYỆT ===
const periodForm = document.getElementById('periodForm');
const periodStartInput = document.getElementById('periodStart');
const periodEndInput = document.getElementById('periodEnd');
const historyBody = document.getElementById('historyBody');

function loadPeriodHistory() {
    const periods = JSON.parse(localStorage.getItem('periodHistory') || '[]');
    historyBody.innerHTML = '';
    periods.forEach(period => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${period.start}</td><td>${period.end}</td><td>${period.days}</td>`;
        historyBody.appendChild(tr);
    });
}

if (periodForm) {
    periodForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const start = periodStartInput.value;
        const end = periodEndInput.value;
        if (!start || !end) {
            alert('Vui lòng nhập đầy đủ ngày bắt đầu và kết thúc!');
            return;
        }
        if (end < start) {
            alert('Ngày kết thúc phải sau hoặc bằng ngày bắt đầu!');
            return;
        }
        const days = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24) + 1;
        const periods = JSON.parse(localStorage.getItem('periodHistory') || '[]');
        periods.push({ start, end, days });
        localStorage.setItem('periodHistory', JSON.stringify(periods));
        loadPeriodHistory();
        periodForm.reset();
    });
    loadPeriodHistory();
}

// === TỰ ĐỘNG REFRESH LỊCH KHI SANG NGÀY MỚI ===
let lastTodayStr = getTodayStr();
setInterval(() => {
    const nowTodayStr = getTodayStr();
    if (nowTodayStr !== lastTodayStr) {
        lastTodayStr = nowTodayStr;
        renderMainCalendar();
        renderPredictionCalendar(predictOffset);
    }
}, 60 * 1000); // kiểm tra mỗi phút

// === KHỞI ĐỘNG ===
document.addEventListener('DOMContentLoaded', () => {
    // Khởi tạo dữ liệu chu kỳ (demo)
    if (!firstPredictionDate && periodData.length) {
        localStorage.setItem("firstPeriodDateForPrediction", periodData[0]);
        firstPredictionDate = periodData[0];
    }

    renderMainCalendar();
    renderPredictionCalendar(predictOffset);

    // Cài đặt nút chuyển tháng
    document.getElementById('prevMainMonth').onclick = () => {
        mainDate.setMonth(mainDate.getMonth() - 1);
        renderMainCalendar();
    };
    document.getElementById('nextMainMonth').onclick = () => {
        mainDate.setMonth(mainDate.getMonth() + 1);
        renderMainCalendar();
    };
    document.getElementById('prevPredictMonth').onclick = () => {
        if (predictOffset > 1) predictOffset--;
        renderPredictionCalendar(predictOffset);
    };
    document.getElementById('nextPredictMonth').onclick = () => {
        predictOffset++;
        renderPredictionCalendar(predictOffset);
    };

    // Cài đặt nút lưu cài đặt chu kỳ
    document.getElementById('apply-settings').onclick = applySettings;

    // Load tâm trạng hôm nay
    loadMood();

    // Load triệu chứng hôm nay
    loadTodaySymptoms();

    // Cập nhật thống kê
    updateCycleStats();
    updateSymptomStats();

    // Cập nhật nhắc nhở và gợi ý
    updateReminders();
    updateSuggestions();
});
