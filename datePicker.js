document.addEventListener('DOMContentLoaded', function() {
    var enLocale = {
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'MM/dd/yyyy',
        timeFormat: 'hh:mm aa',
        firstDay: 1
    };

    var datePicker = new AirDatepicker('#calendar', {
        locale: enLocale,
        minDate: new Date(),
        timepicker: true, // Assuming time picker is enabled
        onSelect: function({date, formattedDate, datepicker}) {
            // Check if both date and time have been selected
            if (date && formattedDate) {
                var nextButton = document.getElementById('next-calendar');
                nextButton.style.opacity = 1;
                nextButton.style.pointerEvents = 'auto'; // Make it clickable
                
                // Update the hidden input's value with the selected date and time
                document.getElementById('selectedDateTime').value = formattedDate;

                // Optionally, if you want to immediately enable the "Next" button without additional user action, you can trigger the click listener here
                
                // nextButton.addEventListener('click', function() {
                //     document.getElementById('step-1').style.display = 'none'; // Hide the current step
                //     document.getElementById('step-2').style.display = 'block'; // Show the next step
                // }, { once: true }); // Add listener only once to prevent multiple bindings
            }
        },
        // Add any additional options you need for the datepicker here
    });
});
