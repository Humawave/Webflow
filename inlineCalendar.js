document.addEventListener("DOMContentLoaded", function() {
    flatpickr("#inlineCalendar", {
        inline: true, // Display the calendar inline
        enableTime: true, // Enable time picker
        dateFormat: "Y-m-d H:i", // Set the desired date format
        weekNumbers: true, // Enable week numbers
        locale: {
            firstDayOfWeek: 1 // Set Monday as the first day of the week
        }
    });
});
