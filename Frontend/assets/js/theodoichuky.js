const mainCalendar = document.getElementById('mainCalendar');
const predictionCalendar = document.getElementById('predictionCalendar');
const mainMonthYear = document.getElementById('mainMonthYear');
const predictMonthYear = document.getElementById('predictMonthYear');
const moodIcons = document.querySelectorAll(".mood-icon");
const selectedMood = document.getElementById("selected-mood");
const predictionText = document.getElementById('predictionText');

let mainDate = new Date();
let predictOffset = 1; // 1: tháng kế tiếp, 2: kế tiếp nữa, etc.
let periodData = JSON.parse(localStorage.getItem("periodData") || "[]");

//Hôm nay tâm trạng thế nào
document.addEventListener("DOMContentLoaded", () => {

    moodIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            moodIcons.forEach(i => i.classList.remove("selected"));
            icon.classList.add("selected");
            selectedMood.textContent = icon.dataset.mood;
        });
    });
});

//Lịch Chu Kì
function formatDate(d) {
    return d.toISOString().split('T')[0];
}

function getAverageCycle() {
    if (periodData.length < 2) return 28;
    const sorted = periodData.map(d => new Date(d)).sort((a, b) => a - b);
    let total = 0;
    for (let i = 1; i < sorted.length; i++) {
        total += (sorted[i] - sorted[i - 1]) / (1000 * 3600 * 24);
    }
    return Math.round(total / (sorted.length - 1));
}

function predictNextPeriod(n = 1) {
    if (periodData.length === 0) return null;
    const last = new Date(periodData[periodData.length - 1]);
    const cycleLength = parseInt(localStorage.getItem("customCycleLength")) || getAverageCycle();
    last.setDate(last.getDate() + cycleLength * n);
    return last;
}

const nextPeriod = predictNextPeriod();
predictionText.innerText = nextPeriod
    ? `Dự đoán kỳ kinh tiếp theo: ${formatDate(nextPeriod)}`
    : "";

function changeMainMonth(offset) {
    mainDate.setMonth(mainDate.getMonth() + offset);
    renderMainCalendar();
}

function changePredictMonth(offset) {
    predictOffset += offset;
    if (predictOffset < 1) predictOffset = 1;
    renderPredictCalendar();
}
// Cho phép người dùng chọn từng ngày kinh
function getDayType(date, isPredict = false, offset = 1) {
    const iso = formatDate(date);

    if (!isPredict) {
        if (periodData.includes(iso)) return "period";
    } else {
        const start = predictNextPeriod(offset);
        const diff = Math.floor((date - start) / (1000 * 60 * 60 * 24));
        if (diff === 0) return "period-predict";
        if (diff === 14) return "ovulation-predict";
        if (diff >= 12 && diff <= 16) return "fertile-predict";
        if (diff > 16 && diff < 28) return "safe-predict";
    }

    return "";
}

//Lịch chu kì
function renderMainCalendar() {
    mainCalendar.innerHTML = "";
    const year = mainDate.getFullYear();
    const month = mainDate.getMonth();
    mainMonthYear.textContent = `Tháng ${month + 1} / ${year}`;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        mainCalendar.appendChild(document.createElement("div"));
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const iso = formatDate(date);
        const cell = document.createElement("div");
        cell.className = "day";

        //Hiện ngày hôm nay
        if (formatDate(date) === formatDate(new Date())) {
            cell.classList.add("today");
        }

        // Cho phép ngườu dùng cho từng ngày 1 
        cell.onclick = () => {
            if (!periodData.includes(iso)) {
                periodData.push(iso);
            } else {
                periodData = periodData.filter(d => d !== iso);
            }
            localStorage.setItem("periodData", JSON.stringify(periodData));
            renderMainCalendar();
            renderPredictCalendar();
        };

        cell.textContent = day;

        const type = getDayType(date, false);
        if (type) cell.classList.add(type);

        cell.onclick = () => {
            if (!periodData.includes(iso)) {
                periodData.push(iso);
            } else {
                periodData = periodData.filter(d => d !== iso);
            }
            localStorage.setItem("periodData", JSON.stringify(periodData));
            renderMainCalendar();
            renderPredictCalendar();
        };

        mainCalendar.appendChild(cell);
    }
}

// Lịch dự đoán
function renderPredictCalendar() {
    predictionCalendar.innerHTML = "";
    const start = predictNextPeriod(predictOffset);
    if (!start) {
        predictMonthYear.textContent = "Không có dự đoán";
        return;
    }

    const year = start.getFullYear();
    const month = start.getMonth();
    predictMonthYear.textContent = `Tháng ${month + 1} / ${year}`;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        predictionCalendar.appendChild(document.createElement("div"));
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const cell = document.createElement("div");
        cell.className = "day readonly";
        cell.textContent = day;

        const type = getDayType(date, true, predictOffset);
        if (type) cell.classList.add(type);

        predictionCalendar.appendChild(cell);
    }
}

// Cài đặt chu kỳ
document.getElementById("apply-settings").addEventListener("click", () => {
    const periodLength = parseInt(document.getElementById("period-length").value);
    const cycleLength = parseInt(document.getElementById("cycle-length").value);

    if (isNaN(periodLength) || isNaN(cycleLength) || periodLength <= 0 || cycleLength <= 0) {
        alert("Vui lòng nhập số hợp lệ cho độ dài chu kỳ và kỳ kinh.");
        return;
    }

    localStorage.setItem("customPeriodLength", periodLength);
    localStorage.setItem("customCycleLength", cycleLength);

    alert("Đã cập nhật cài đặt chu kỳ.");
    renderMainCalendar();
    renderPredictCalendar();
    renderCycleChart();
});


// Thống kê chu kì
function renderCycleChart() {
    const canvas = document.getElementById("cycleChart");
    if (!canvas) return;

    const rawDates = periodData.map(d => new Date(d)).sort((a, b) => a - b);
    if (rawDates.length < 2) return;

    const labels = [];
    const cycleLengths = [];

    for (let i = 1; i < rawDates.length; i++) {
        const days = Math.round((rawDates[i] - rawDates[i - 1]) / (1000 * 60 * 60 * 24));
        cycleLengths.push(days);
        labels.push(rawDates[i].toLocaleDateString("vi-VN"));
    }

    const avg = cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length;
    const deviations = cycleLengths.map(x => Math.abs(x - avg));
    const hasDeviation = deviations.some(d => d > 4);

    const warningBox = document.getElementById("cycle-warning");
    if (hasDeviation) {
        warningBox.innerText = `⚠️ Chu kỳ kinh nguyệt của bạn có sai lệch so với trung bình. Vui lòng theo dõi thêm.`;
    } else {
        warningBox.innerText = "";
    }

    new Chart(canvas.getContext("2d"), {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Độ dài chu kỳ (ngày)",
                data: cycleLengths,
                borderColor: "#e91e63",
                backgroundColor: "rgba(233, 30, 99, 0.1)",
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    suggestedMin: 20,
                    suggestedMax: 40,
                    title: {
                        display: true,
                        text: "Số ngày"
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: "Ngày bắt đầu kỳ"
                    }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

renderMainCalendar();
renderPredictCalendar();
renderCycleChart();


//Liên kết bạn đời
document.addEventListener("DOMContentLoaded", () => {
    const shareBtn = document.getElementById("share-partner");

    shareBtn.addEventListener("click", () => {
        const email = document.getElementById("partner-email").value.trim();

        if (!email || !validateEmail(email)) {
            alert("Vui lòng nhập đúng định dạng email của bạn đời!");
            return;
        }

        // Giả lập gửi lời mời
        alert(`Đã gửi lời mời liên kết tới ${email}. Bạn đời cần kiểm tra email và xác nhận.`);

        // Sau này bạn có thể thay đoạn dưới bằng lệnh gửi API thực tế
        /*
        fetch('/api/send-invite', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Đã gửi lời mời liên kết thành công!");
            } else {
                alert("Gửi lời mời thất bại. Vui lòng thử lại.");
            }
        })
        .catch(err => {
            alert("Lỗi kết nối máy chủ. Vui lòng thử lại sau.");
        });
        */
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});



