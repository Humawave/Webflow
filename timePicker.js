document.addEventListener("DOMContentLoaded", function() {
  // Function to remove the active class from all slots
  function removeActiveClasses() {
    document.querySelectorAll('.time-slot').forEach(function(slot) {
      slot.classList.remove('is-active-inputactive');
    });
  }

  // Function to enable the "Next" button
  function enableNextButton() {
    var nextButton = document.getElementById('next-3');
    nextButton.style.opacity = '1';
    nextButton.style.pointerEvents = 'auto';
    nextButton.style.cursor = 'pointer';
  }

  // Get the current time
  var now = new Date();
  var currentHour = now.getHours();
  var currentMinute = now.getMinutes();

  // Get all time slot elements
  var timeSlots = document.querySelectorAll('.time-slot');

  timeSlots.forEach(function(slot) {
    // Get the hour and minute from the data attributes of the slot
    var slotHour = parseInt(slot.getAttribute('data-hour'));
    var slotMinute = parseInt(slot.getAttribute('data-minute') || '0');

    // Create a Date object for the slot's time on the current day
    var slotTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), slotHour, slotMinute, 0);

    // Compare the time slot with the current time
    if (slotTime <= now) {
      // If the time slot is in the past or now, style it as disabled (e.g., grayed out)
      slot.style.opacity = '0.5';
      slot.style.pointerEvents = 'none'; // Make it non-interactive
    } else {
      // If the time slot is in the future, make it clickable
      slot.addEventListener('click', function() {
        removeActiveClasses();
        slot.classList.add('is-active-inputactive');
        enableNextButton(); // Enable the "Next" button when a time slot is selected
      });
    }
  });
});
