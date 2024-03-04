document.addEventListener("DOMContentLoaded", function() {
  flatpickr("#inline_calendar", {
    inline: true, // This makes the calendar always visible
    enableTime: true, // Enable time selection if needed
    dateFormat: "Y-m-d H:i",
  });
});
