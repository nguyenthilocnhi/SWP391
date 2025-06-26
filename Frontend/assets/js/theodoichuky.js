const mainCalendar = document.getElementById('mainCalendar');
const mainMonthYear = document.getElementById('mainMonthYear');
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
function getDayType(date) {
    const iso = formatDate(date);
    const cycleLength = parseInt(localStorage.getItem("customCycleLength")) || 28;
    const periodLength = parseInt(localStorage.getItem("customPeriodLength")) || 5;
    if (periodData.includes(iso)) return "period";
    if (periodData.length === 0) return "";

    // Lấy ngày đầu kỳ kinh gần nhất (chuỗi liên tiếp cuối cùng)
    function getLastPeriodStart() {
        const ranges = getPeriodRanges();
        if (ranges.length === 0) return null;
        return ranges[ranges.length - 1].start;
    }
    const lastPeriodStart = getLastPeriodStart();
    if (!lastPeriodStart) return "";

    // Dự đoán chu kỳ tiếp theo
    const nextPeriodStart = new Date(lastPeriodStart);
    nextPeriodStart.setDate(nextPeriodStart.getDate() + cycleLength);

    // Ngày rụng trứng của chu kỳ tiếp theo
    const ovulationDate = new Date(nextPeriodStart);
    ovulationDate.setDate(ovulationDate.getDate() - 14);

    // Giai đoạn dễ thụ thai: từ ovulationDate - 5 đến ovulationDate + 1
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(fertileStart.getDate() - 5);
    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(fertileEnd.getDate() + 1);

    // Kiểm tra các giai đoạn dự đoán
    const diff = Math.floor((date - nextPeriodStart) / (1000 * 60 * 60 * 24));
    if (diff >= 0 && diff < periodLength) return "period-predict";

    if (formatDate(date) === formatDate(ovulationDate)) return "ovulation-predict";
    if (date >= fertileStart && date <= fertileEnd) return "fertile-predict";

    // Giai đoạn an toàn: trong chu kỳ dự đoán, không thuộc các giai đoạn trên
    const diffFromNextStart = Math.floor((date - nextPeriodStart) / (1000 * 60 * 60 * 24));
    if (diffFromNextStart >= 0 && diffFromNextStart < cycleLength &&
        !(
            (diffFromNextStart >= 0 && diffFromNextStart < periodLength) ||
            (date >= fertileStart && date <= fertileEnd) ||
            formatDate(date) === formatDate(ovulationDate)
        )
    ) {
        return "safe-predict";
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
        const dayType = getDayType(date);
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
                updateCycleStats();
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
    renderMainCalendar();
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
            updateReminders();
            updateSuggestions();
        } else {
            saveMood(mood);
            updateReminders();
            updateSuggestions();
        }
    });
});

// === TRIỆU CHỨNG VÀ CẢNH BÁO ===
saveSymptomsBtn.addEventListener('click', () => {
    const checkedSymptoms = Array.from(symptomList.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => cb.value);

    // Cho phép không chọn triệu chứng nào
    if (checkedSymptoms.length === 0) {
        // Nếu không chọn triệu chứng nào, xóa dữ liệu triệu chứng ngày đó
        localStorage.removeItem(`symptoms-${getTodayStr()}`);
        healthAlert.style.display = "none";
        alertMessage.textContent = "";
        updateSymptomStats();
        updateReminders();
        updateSuggestions();
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

    // Đếm số ngày mỗi triệu chứng xuất hiện trong tháng (danh sách mới)
    const symptomCountMap = {
        // Nhóm 1: Thể chất
        "Đau bụng dưới": 0,
        "Đau lưng": 0,
        "Đau đầu hoặc đau nửa đầu": 0,
        "Mệt mỏi": 0,
        "Chóng mặt": 0,
        "Đau ngực hoặc ngực căng tức": 0,
        "Buồn nôn": 0,
        "Khó ngủ": 0,
        "Đau cơ nhẹ": 0,
        // Nhóm 3: Da & cơ thể
        "Mụn nổi nhiều": 0,
        "Căng ngực": 0,
        "Tăng cân nhẹ (do giữ nước)": 0,
        "Phù nhẹ (mặt, tay chân)": 0,
        // Nhóm 4: Tiêu hóa & ăn uống
        "Đầy bụng, chướng bụng": 0,
        "Táo bón": 0,
        "Tiêu chảy": 0,
        "Thèm ăn (đặc biệt đồ ngọt, mặn)": 0,
        "Chán ăn": 0,
        // Nhóm 5: Rụng trứng đặc trưng
        "Đau bụng nhẹ một bên": 0,
        "Tăng tiết dịch âm đạo": 0,
        "Cảm giác đầy bụng nhẹ": 0
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

// === GỢI Ý SẢN PHẨM & DINH DƯỠNG ===
function updateSuggestions() {
    suggestionsList.innerHTML = "";
    const today = getTodayStr();
    const mood = localStorage.getItem(`mood-${today}`);
    const symptoms = JSON.parse(localStorage.getItem(`symptoms-${today}`) || "[]");

    let suggestions = [];

    // Gợi ý theo triệu chứng
    if (symptoms.includes("Đau bụng dữ dội")) {
        suggestions.push("Sản phẩm gợi ý: Thuốc giảm đau, túi chườm ấm.");
        suggestions.push("Dinh dưỡng: Ăn nhẹ, uống nhiều nước, tránh đồ cay nóng.");
    }
    if (symptoms.includes("Sốt, mệt mỏi")) {
        suggestions.push("Sản phẩm gợi ý: Vitamin tổng hợp, nước điện giải.");
        suggestions.push("Dinh dưỡng: Ăn nhiều rau xanh, trái cây, nghỉ ngơi nhiều.");
    }
    if (symptoms.includes("Khí hư bất thường") || symptoms.includes("Ngứa vùng kín")) {
        suggestions.push("Sản phẩm gợi ý: Dung dịch vệ sinh dịu nhẹ, quần lót cotton.");
        suggestions.push("Dinh dưỡng: Uống nhiều nước, bổ sung probiotic.");
    }

    // Gợi ý theo mood
    if (mood === "Không vui" || mood === "Phiền muộn") {
        suggestions.push("Sản phẩm gợi ý: Trà thảo dược thư giãn, tinh dầu thơm.");
        suggestions.push("Dinh dưỡng: Sô-cô-la đen, các loại hạt, trái cây tươi.");
    }
    if (mood === "Rất hạnh phúc" || mood === "Hạnh phúc") {
        suggestions.push("Hãy duy trì chế độ ăn cân bằng và vận động nhẹ nhàng để giữ vững năng lượng tích cực!");
    }

    // Nếu không có triệu chứng/mood đặc biệt, gợi ý chung
    if (suggestions.length === 0) {
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

    // Load triệu chứng hôm nay
    loadTodaySymptoms();

    // Cập nhật thống kê
    updateCycleStats();
    updateSymptomStats();

    // Cập nhật nhắc nhở và gợi ý
    updateReminders();
    updateSuggestions();
});
