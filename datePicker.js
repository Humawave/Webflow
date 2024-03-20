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
            
            // If you have an updateTimeSlotsAvailability function or other related logic,
            // you can call it here to update the time slots based on the selected date
            // Example:
            updateTimeSlotsAvailability();
        }
    });
});
