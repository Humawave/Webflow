document.addEventListener('DOMContentLoaded', function() {
  // Instead of attaching to an input, attach the datepicker directly to a div
  new AirDatepicker('#calendar', {
    inline: true, // This option tells Air Datepicker to always show the calendar
    // You can add other options here as needed
  });
});
