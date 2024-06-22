document.addEventListener('DOMContentLoaded', () => {
    const calendarWrapper = document.querySelector('.book_calendar-wrapper');
    const textCurrentMonth = document.getElementById('text-current-month');
    const buttonMonthBack = document.getElementById('button-month-back');
    const buttonMonthNext = document.getElementById('button-month-next');
    const selectedDateInput = document.getElementById('selected-date');
    const calendar = document.getElementById('calendar');
    const timeSlotsContainer = document.getElementById('time-slots-container');
    const timeSlotTemplate = document.getElementById('time-slot-template');
    const loader = document.getElementById('book-loader');
    const buttonNextTime = document.getElementById('button-next-time');
    const selectedTimeInput = document.getElementById('selected-time');

    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let selectedDate = null;
    let availableDates = {};

    async function fetchAvailableDates(year, month) {
        try {
            showLoader();
            hideCalendar();
            const response = await fetch(`https://northamerica-northeast2-humawave.cloudfunctions.net/checkAvailability?year=${year}&month=${month + 1}`);
            if (!response.ok) {
                throw new Error('Failed to fetch available dates and times.');
            }
            availableDates = await response.json();
            loadCalendar(currentMonth, currentYear);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            hideLoader();
            showCalendar();
        }
    }

    async function fetchAvailableTimeSlots(dateString) {
        try {
            const response = await fetch(`https://northamerica-northeast2-humawave.cloudfunctions.net/checkAvailability?date=${dateString}`);
            if (!response.ok) {
                throw new Error('Failed to fetch available time slots.');
            }
            const timeSlots = await response.json();
            displayAvailableTimeSlots(timeSlots);
        } catch (error) {
            console.error('Error fetching time slots:', error);
        }
    }

    function showLoader() {
        loader.style.display = 'flex';
    }

    function hideLoader() {
        loader.style.display = 'none';
    }

    function hideCalendar() {
        calendar.style.display = 'none';
    }

    function showCalendar() {
        calendar.style.display = 'grid';
    }

    function formatDateString(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    }

    function formatTimeString(time) {
        const timeParts = time.match(/(\d+):(\d+)(AM|PM)/);
        if (!timeParts) {
            throw new Error('Invalid time format');
        }
        const hour = parseInt(timeParts[1], 10);
        const minute = parseInt(timeParts[2], 10);
        const period = timeParts[3];
        return `${hour}:${minute.toString().padStart(2, '0')}${period}`;
    }

    function loadCalendar(month, year) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        textCurrentMonth.textContent = firstDay.toLocaleDateString('default', { month: 'long', year: 'numeric' });

        calendarWrapper.innerHTML = '';

        const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

        for (let i = 0; i < startingDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-item';
            calendarWrapper.appendChild(emptyCell);
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-item book_calendar-item';

            const circle = document.createElement('div');
            circle.className = 'circle';
            circle.textContent = day;
            dayCell.appendChild(circle);

            const currentDate = new Date(year, month, day);
            const dateString = formatDateString(currentDate);

            if (currentDate < today || (currentDate.getDate() === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear())) {
                dayCell.classList.add('disabled');
            } else if (availableDates[dateString] && availableDates[dateString].length === 0) {
                dayCell.classList.add('disabled');
            } else {
                dayCell.classList.remove('disabled');
            }

            dayCell.addEventListener('click', () => {
                if (!dayCell.classList.contains('disabled')) {
                    document.querySelectorAll('.book_calendar-item').forEach(item => {
                        item.classList.remove('is-active-inputactive');
                    });
                    dayCell.classList.add('is-active-inputactive');
                    selectedDate = currentDate;
                    selectedDateInput.value = formatDateString(currentDate);
                    console.log("Selected Date: ", selectedDate);

                    fetchAvailableTimeSlots(formatDateString(currentDate));
                }
            });

            calendarWrapper.appendChild(dayCell);
        }

        buttonMonthBack.disabled = month === 5 && year === 2024;
    }

    function displayAvailableTimeSlots(timeSlots) {
        // Clear previous time slots
        timeSlotsContainer.innerHTML = '';

        timeSlots.forEach(time => {
            const timeSlot = timeSlotTemplate.cloneNode(true);
            timeSlot.style.display = 'flex';
            timeSlot.querySelector('#text-time-slot').textContent = time;
            timeSlot.addEventListener('click', () => {
                const formattedTime = formatTimeString(time);
                selectedTimeInput.value = formattedTime;
                console.log("Selected Time: ", formattedTime);
            });
            timeSlotsContainer.appendChild(timeSlot);
        });
    }

    buttonMonthBack.addEventListener('click', () => {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear -= 1;
        } else {
            currentMonth -= 1;
        }
        fetchAvailableDates(currentYear, currentMonth);
    });

    buttonMonthNext.addEventListener('click', () => {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear += 1;
        } else {
            currentMonth += 1;
        }
        fetchAvailableDates(currentYear, currentMonth);
    });

    fetchAvailableDates(currentYear, currentMonth);
});
