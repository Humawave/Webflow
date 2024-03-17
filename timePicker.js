function updateTimeSlotsAvailability() {
  var now = new Date();
  var currentHour = now.getHours();
  var currentMinute = now.getMinutes();
  
  // Retrieve the selected date from the timeSlotsContainer's data attribute
  var selectedDate = document.getElementById('timeSlotsContainer').getAttribute('data-selected-date');
  var selectedDateObj = selectedDate ? new Date(selectedDate) : null;
  
  // Check if the selected date is today
  var isSelectedDateToday = selectedDateObj && selectedDateObj.toDateString() === now.toDateString();

  document.querySelectorAll('.time-slot').forEach(function(slot) {
    var slotHour = parseInt(slot.getAttribute('data-hour'));
    var slotMinute = parseInt(slot.getAttribute('data-minute') || '0');
    var slotTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), slotHour, slotMinute, 0);

    if (isSelectedDateToday && slotTime <= now) {
      // If it's today and the time slot is in the past or now, grey it out
      slot.style.opacity = '0.5';
      slot.style.pointerEvents = 'none';
    } else {
      // Otherwise, ensure the slot is clickable
      slot.style.opacity = '';
      slot.style.pointerEvents = '';
      slot.addEventListener('click', function() {
        document.querySelectorAll('.time-slot').forEach(function(slot) {
          slot.classList.remove('is-active-inputactive');
        });
        slot.classList.add('is-active-inputactive');
        enableNextButton();
      });
    }
  });
}

// Ensure this function is also called on DOMContentLoaded to set initial state
document.addEventListener("DOMContentLoaded", function() {
  updateTimeSlotsAvailability(); // This sets the initial state based on the current time
});
