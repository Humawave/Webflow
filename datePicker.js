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
    onSelect: function({date, formattedDate, datepicker}) {
      var nextButton = document.getElementById('next-2');
      nextButton.style.opacity = '1';
      nextButton.style.pointerEvents = 'auto';
      nextButton.style.cursor = 'pointer';

      // Store the selected date in a data attribute on the timeSlotsContainer
      document.getElementById('timeSlotsContainer').setAttribute('data-selected-date', formattedDate);
      
      // Update time slots according to the selected date
      updateTimeSlotsAvailability();
    }
  });
});
