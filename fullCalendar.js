document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: [ FullCalendar.dayGridPlugin ], // Use the plugin
        initialView: 'dayGridMonth',
        firstDay: 1, // Monday as the first day
    });
    calendar.render();
});
