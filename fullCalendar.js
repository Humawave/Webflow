document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: [ FullCalendar.DayGridPlugin ],
        initialView: 'dayGridMonth',
        firstDay: 1, // Monday is the first day of the week
        // other options here
    });
    calendar.render();
});
