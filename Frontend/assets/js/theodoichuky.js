document.addEventListener("DOMContentLoaded", () => {
    const moodIcons = document.querySelectorAll(".mood-icon");
    const selectedMood = document.getElementById("selected-mood");
    const calendarGrid = document.getElementById("calendar-grid");
    const monthLabel = document.getElementById("month-label");
    const periodLengthInput = document.getElementById("period-length");
    const cycleLengthInput = document.getElementById("cycle-length");

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let settings = {
        periodLength: 5,
        cycleLength: 28
    };
    let periodStartDate = new Date();

    renderCalendar();

    moodIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            moodIcons.forEach(i => i.classList.remove("selected"));
            icon.classList.add("selected");
            selectedMood.textContent = icon.dataset.mood;
        });
    });

    document.getElementById("save-today").addEventListener("click", () => {
        alert("Trạng thái hôm nay đã được lưu!");
    });

    document.getElementById("apply-settings").addEventListener("click", () => {
        settings.periodLength = parseInt(periodLengthInput.value);
        settings.cycleLength = parseInt(cycleLengthInput.value);
        renderCalendar();
    });

    document.getElementById("prev-month").addEventListener("click", () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    document.getElementById("next-month").addEventListener("click", () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    const calendar = document.getElementById('calendar');
    const monthYear = document.getElementById('monthYear');
    const prevMonth = document.getElementById('prevMonth');
    const nextMonth = document.getElementById('nextMonth');

    let currentDate = new Date();
    let periodDates = JSON.parse(localStorage.getItem('periodDates')) || [];

    function renderCalendar(date) {
        calendar.innerHTML = '';
        const year = date.getFullYear();
        const month = date.getMonth();
        monthYear.textContent = `${month + 1}/${year}`;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            calendar.appendChild(document.createElement('div'));
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            dayDiv.textContent = day;

            const thisDate = new Date(year, month, day);
            const isoDate = thisDate.toISOString().split('T')[0];

            if (periodDates.includes(isoDate)) {
                dayDiv.classList.add('period');
                markFertileDays(thisDate, dayDiv);
            } else {
                const prediction = predictDayType(thisDate);
                if (prediction) dayDiv.classList.add(prediction);
            }

            dayDiv.addEventListener('click', () => {
                if (!periodDates.includes(isoDate)) {
                    periodDates.push(isoDate);
                } else {
                    periodDates = periodDates.filter(d => d !== isoDate);
                }
                localStorage.setItem('periodDates', JSON.stringify(periodDates));
                renderCalendar(currentDate);
            });

            calendar.appendChild(dayDiv);
        }
    }

    function markFertileDays(startDate, div) {
        // Rụng trứng khoảng ngày thứ 14, dễ thụ thai ngày 12-16
        const ovulationDate = new Date(startDate);
        ovulationDate.setDate(ovulationDate.getDate() + 14);
        const fertileWindow = [
            new Date(startDate.getTime() + 12 * 86400000),
            new Date(startDate.getTime() + 16 * 86400000),
        ];
    }

    function predictDayType(date) {
        for (let d of periodDates) {
            const pd = new Date(d);
            const diff = Math.floor((date - pd) / (1000 * 3600 * 24));
            if (diff >= 0 && diff <= 4) return 'period';
            if (diff === 14) return 'ovulation';
            if (diff >= 12 && diff <= 16) return 'fertile';
            if (diff > 16 && diff < 28) return 'safe';
        }
        return '';
    }

    prevMonth.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonth.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);


    function isSameDate(d1, d2) {
        return d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear();
    }
});
