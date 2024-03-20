function updateTimeSlotsAvailability() {
    var now = new Date();
    now = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());

    var selectedDateString = document.getElementById('selectedDate').value;
    // Convert the dd/MM/yyyy format to MM/dd/yyyy format for correct parsing
    var [day, month, year] = selectedDateString.split('/');
    var selectedDateObj = new Date(`${month}/${day}/${year}`);

    var isSelectedDateToday = selectedDateObj.toDateString() === now.toDateString();

    document.querySelectorAll('.time-slot').forEach(function(slot) {
        var slotHour = parseInt(slot.getAttribute('data-hour'), 10);
        var slotMinute = parseInt(slot.getAttribute('data-minute'), 10 || '0', 10);
        var slotTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), slotHour, slotMinute);

        if (isSelectedDateToday && slotTime <= now) {
            slot.style.opacity = '0.5';
            slot.style.pointerEvents = 'none';
        } else {
            slot.style.opacity = '';
            slot.style.pointerEvents = '';
            slot.addEventListener('click', function() {
                document.querySelectorAll('.time-slot').forEach(function(slot) {
                    slot.classList.remove('is-active-inputactive');
                });
                slot.classList.add('is-active-inputactive');
                // Assuming you have an 'enableButton' function that correctly enables the 'next-2' button
                enableButton('next-2');
            });
        }
    });
}

// Ensure this function is called when a date is selected
document.addEventListener('DOMContentLoaded', function() {
    updateTimeSlotsAvailability(); // This may need to be called directly after a date is picked, not just on DOMContentLoaded
});
