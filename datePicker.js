document.addEventListener('DOMContentLoaded', function() {
    var enLocale = {
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        daysMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'dd/MM/yyyy',
        timeFormat: 'hh:mm aa',
        firstDay: 1
    };

    var datePicker = new AirDatepicker('#calendar', {
        locale: enLocale,
        minDate: new Date(),
        onSelect: function({date, formattedDate, datepicker}) {
            // Enable the "Next" button when a date is selected
            var nextButton = document.getElementById('next-1');
            nextButton.style.opacity = '1';
            nextButton.style.pointerEvents = 'auto';
            nextButton.style.cursor = 'pointer';

            // Update the hidden input field with the selected date
            document.getElementById('selectedDate').value = formattedDate;
            
            // Update the availability of time slots based on the selected date
            updateTimeSlotsAvailability(formattedDate); // Pass the selected date directly
        }
    });

    function updateTimeSlotsAvailability(selectedDateString) {
        var now = new Date();
        now = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());

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
                slot.removeEventListener('click'); // First, remove any previous click listener to avoid duplicates
                slot.addEventListener('click', function() {
                    document.querySelectorAll('.time-slot').forEach(function(slot) {
                        slot.classList.remove('is-active-inputactive');
                    });
                    slot.classList.add('is-active-inputactive');
                    enableButton('next-2'); // Ensure this function correctly enables the 'next-2' button
                });
            }
        });
    }
});
