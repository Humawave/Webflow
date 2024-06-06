document.addEventListener('DOMContentLoaded', () => {
    const calendarWrapper = document.querySelector('.onboarding1_calendar-list');
    const textCurrentMonth = document.getElementById('text-current-month');
    const buttonMonthBack = document.getElementById('button-month-back');
    const buttonMonthNext = document.getElementById('button-month-next');
    const selectedDateInput = document.getElementById('selected-date'); // Hidden input field

    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let selectedDate = null;

    function formatDateString(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    function loadCalendar(month, year) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        textCurrentMonth.textContent = firstDay.toLocaleDateString('default', { month: 'long', year: 'numeric' });

        calendarWrapper.innerHTML = '';

        const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Adjust for Sunday as the first day of the week

        for (let i = 0; i < startingDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-item';
            calendarWrapper.appendChild(emptyCell);
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-item onboarding1_calendar-item';
            
            const circle = document.createElement('div');
            circle.className = 'circle';
            circle.textContent = day;
            dayCell.appendChild(circle);

            const currentDate = new Date(year, month, day);
            if (currentDate < today && !(currentDate.getDate() === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear())) {
                dayCell.classList.add('disabled');
            }

            if (currentDate.getDate() === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear()) {
                dayCell.classList.add('today');
            }

            dayCell.addEventListener('click', () => {
                document.querySelectorAll('.onboarding1_calendar-item').forEach(item => {
                    item.classList.remove('is-active-inputactive');
                });
                dayCell.classList.add('is-active-inputactive');
                selectedDate = currentDate; // Save the selected date
                selectedDateInput.value = formatDateString(currentDate); // Update hidden input field with DD-MM-YYYY format
                console.log("Selected Date: ", selectedDate); // For debugging purposes
            });

            calendarWrapper.appendChild(dayCell);
        }

        buttonMonthBack.disabled = month === 5 && year === 2024;
    }

    buttonMonthBack.addEventListener('click', () => {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear -= 1;
        } else {
            currentMonth -= 1;
        }
        loadCalendar(currentMonth, currentYear);
    });

    buttonMonthNext.addEventListener('click', () => {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear += 1;
        } else {
            currentMonth += 1;
        }
        loadCalendar(currentMonth, currentYear);
    });

    loadCalendar(currentMonth, currentYear);
});
