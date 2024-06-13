document.addEventListener('DOMContentLoaded', () => {
    const calendarWrapper = document.querySelector('.onboarding1_calendar-list');
    const textCurrentMonth = document.getElementById('text-current-month');
    const buttonMonthBack = document.getElementById('button-month-back');
    const buttonMonthNext = document.getElementById('button-month-next');
    const selectedDateInput = document.getElementById('selected-date'); // Hidden input field
    const timeSlotsContainer = document.getElementById('time-slots'); // Time slots container
    const loader = document.getElementById('time-loader'); // Loader animation container
    const dayLoader = document.getElementById('day-loader'); // Day loader animation container
    const calendar = document.getElementById('calendar'); // Calendar container
    const radioTemplate = document.getElementById('radio-template');
    const submitButton = document.querySelector('[data-form="submit-btn"]');

    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let selectedDate = null;

    const getAvailableSlotsForMonthUrl = 'https://us-central1-humawave.cloudfunctions.net/getAvailableSlotsForMonth';
    const getAvailableSlotsUrl = 'https://us-central1-humawave.cloudfunctions.net/getAvailableSlots';
    const bookSlotUrl = 'https://us-central1-humawave.cloudfunctions.net/bookSlot';

    function formatDateString(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`; // Change format to DD-MM-YYYY for consistency with Google Sheets
    }

    async function fetchAvailableSlotsForMonth(year, month) {
        try {
            // Show day loader and hide calendar
            dayLoader.style.display = 'flex';
            calendar.style.display = 'none';

            const response = await fetch(`${getAvailableSlotsForMonthUrl}?year=${year}&month=${month + 1}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch available slots for the month');
            }
            const data = await response.json();

            // Hide day loader and show calendar
            dayLoader.style.display = 'none';
            calendar.style.display = 'grid';

            return data.monthData;
        } catch (error) {
            console.error('Error fetching available slots for the month:', error);

            // Hide day loader and show calendar in case of error
            dayLoader.style.display = 'none';
            calendar.style.display = 'grid';

            return {};
        }
    }

    async function fetchAvailableSlots(date) {
        try {
            const response = await fetch(`${getAvailableSlotsUrl}?date=${formatDateString(date)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch available slots');
            }
            const data = await response.json();
            return data.availableSlots;
        } catch (error) {
            console.error('Error fetching available slots:', error);
            return [];
        }
    }

    async function updateAvailableSlots(date) {
        // Show loader and hide time slots
        loader.style.display = 'flex';
        timeSlotsContainer.style.display = 'none';

        const availableSlots = await fetchAvailableSlots(date);

        // Clear any existing time slots
        timeSlotsContainer.innerHTML = '';

        // Populate with new available slots
        availableSlots.forEach(slot => {
            const newRadio = radioTemplate.cloneNode(true);
            newRadio.querySelector('.onboarding1_radio-label').textContent = slot;
            newRadio.querySelector('input').value = slot;
            timeSlotsContainer.appendChild(newRadio);
        });

        // Hide loader and show time slots
        loader.style.display = 'none';
        timeSlotsContainer.style.display = 'grid';
    }

    async function bookSlot(date, time) {
        try {
            console.log('Booking slot with date:', date, 'and time:', time); // Debugging log
            const response = await fetch(bookSlotUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date: formatDateString(date), time })
            });

            if (!response.ok) {
                throw new Error('Failed to book slot');
            }

            // Handle the response without showing an alert
            const data = await response.json();
            console.log('Slot booked:', data);
        } catch (error) {
            console.error('Error booking slot:', error);
        }
    }

    submitButton.addEventListener('click', async (event) => {
        const selectedTimeButton = document.querySelector('input[name="radio-time"]:checked');
        if (selectedDate && selectedTimeButton) {
            const time = selectedTimeButton.value;
            await bookSlot(selectedDate, time);
        } else {
            console.error('Selected date or time slot is missing.');
        }
    });

    async function loadCalendar(month, year) {
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

        const monthData = await fetchAvailableSlotsForMonth(year, month);

        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-item onboarding1_calendar-item';

            const circle = document.createElement('div');
            circle.className = 'circle';
            circle.textContent = day;
            dayCell.appendChild(circle);

            const currentDate = new Date(year, month, day);
            const dateString = formatDateString(currentDate);

            if (currentDate < today && !(currentDate.getDate() === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear())) {
                dayCell.classList.add('disabled');
            } else if (!monthData[dateString]) {
                dayCell.classList.add('disabled');
            }

            if (currentDate.getDate() === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear()) {
                dayCell.classList.add('today');
            }

            dayCell.addEventListener('click', async () => {
                if (!dayCell.classList.contains('disabled')) {
                    document.querySelectorAll('.onboarding1_calendar-item').forEach(item => {
                        item.classList.remove('is-active-inputactive');
                    });
                    dayCell.classList.add('is-active-inputactive');
                    selectedDate = currentDate; // Save the selected date
                    selectedDateInput.value = formatDateString(currentDate); // Update hidden input field with DD-MM-YYYY format
                    console.log("Selected Date: ", selectedDate); // For debugging purposes

                    await updateAvailableSlots(selectedDate); // Update available slots
                }
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
