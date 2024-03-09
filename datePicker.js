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
    timepicker: true,
    onSelect: function({date, formattedDate, datepicker}) {
      if (date && formattedDate) {
        var nextButton = document.getElementById('next-calendar');
        nextButton.style.opacity = 1;
        nextButton.style.pointerEvents = 'auto'; // Make it clickable
        
        nextButton.addEventListener('click', function() {
          document.getElementById('step-1').style.display = 'none';
          document.getElementById('step-2').style.display = 'block';
        }, { once: true });
      }
    },
  });
});
