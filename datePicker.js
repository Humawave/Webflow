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
            var nextButton = document.getElementById('next-1');
            nextButton.style.opacity = '1';
            nextButton.style.pointerEvents = 'auto';
            nextButton.style.cursor = 'pointer';

            document.getElementById('selectedDate').value = formattedDate;
            
            updateTimeSlotsAvailability(formattedDate);
        }
    });

    function updateTimeSlotsAvailability(selectedDateString) {
        // Create a new date object for the current moment
        var now = new Date();

        // Parse the selected date from the picker
        var [day, month, year] = selectedDateString.split('/');
        var selectedDate = new Date(year, month - 1, day, now.getHours(), now.getMinutes(), now.getSeconds());

        // Determine if the selected date is today
        var isSelectedDateToday = selectedDate.toDateString() === now.toDateString();

        document.querySelectorAll('.time-slot').forEach(function(slot) {
            var slotHour = parseInt(slot.getAttribute('data-hour'), 10);
            var slotMinute = parseInt(slot.getAttribute('data-minute'), 10 || 0);
            var slotDateTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), slotHour, slotMinute);

            // Clear any previously added event listeners by cloning the slot node
            var slotClone = slot.cloneNode(true);
            slot.parentNode.replaceChild(slotClone, slot);

            if (isSelectedDateToday && slotDateTime < now) {
                // If it's today and time is past, disable the slot
                slotClone.style.opacity = '0.5';
                slotClone.style.pointerEvents = 'none';
            } else {
                // Otherwise, make sure the slot is enabled
                slotClone.style.opacity = '';
                slotClone.style.pointerEvents = '';
                slotClone.addEventListener('click', function() {
                    document.querySelectorAll('.time-slot').forEach(function(innerSlot) {
                        innerSlot.classList.remove('is-active-inputactive');
                    });
                    slotClone.classList.add('is-active-inputactive');
                    enableButton('next-2');
                });
            }
        });
    }

    function enableButton(buttonId) {
        var button = document.getElementById(buttonId);
        button.style.opacity = '1';
        button.style.pointerEvents = 'auto';
        button.style.cursor = 'pointer';
    }
});
