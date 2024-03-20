function updateTimeSlotsAvailability() {
    var now = new Date();
    // Important to ensure 'now' is rounded down to the nearest minute to avoid skipping slots due to seconds difference
    now = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), 0);

    var selectedDate = document.getElementById('timeSlotsContainer').getAttribute('data-selected-date');
    var selectedDateObj = selectedDate ? new Date(selectedDate + "T00:00:00") : null; // Ensure correct parsing

    var isSelectedDateToday = selectedDateObj && selectedDateObj.toDateString() === now.toDateString();

    document.querySelectorAll('.time-slot').forEach(function(slot) {
        var slotHour = parseInt(slot.getAttribute('data-hour'));
        var slotMinute = parseInt(slot.getAttribute('data-minute') || '0');
        var slotTime = new Date(selectedDateObj.getFullYear(), selectedDateObj.getMonth(), selectedDateObj.getDate(), slotHour, slotMinute, 0);

        if (isSelectedDateToday && slotTime <= now) {
            slot.style.opacity = '0.5';
            slot.style.pointerEvents = 'none';
        } else {
            slot.style.opacity = '';
            slot.style.pointerEvents = '';
            slot.removeEventListener('click'); // Remove previous event listeners to prevent duplicates
            slot.addEventListener('click', function() {
                document.querySelectorAll('.time-slot').forEach(function(slot) {
                    slot.classList.remove('is-active-inputactive');
                });
                slot.classList.add('is-active-inputactive');
                enableButton('next-2');
            });
        }
    });
}
