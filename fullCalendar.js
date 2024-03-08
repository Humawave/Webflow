document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: [ 'dayGrid' ], // If FullCalendar v5 or newer
        initialView: 'dayGridMonth',
        firstDay: 1, // Set Monday as the first day of the week
    });
    calendar.render();
});
