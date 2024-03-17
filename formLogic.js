document.addEventListener("DOMContentLoaded", function() {
  var lastStepBeforeStep4 = 'step-1'; // Default to 'step-1'

  // Function to show a specific step and hide others
  function showStep(stepId) {
    document.querySelectorAll('[id^="step-"]').forEach(function(step) {
      step.style.display = 'none'; // Hide all steps
    });
    document.getElementById(stepId).style.display = 'flex'; // Show the specified step
  }

  // Function to enable a specific button
  function enableButton(buttonId) {
    var button = document.getElementById(buttonId);
    button.style.opacity = '1';
    button.style.pointerEvents = 'auto';
    button.style.cursor = 'pointer';
  }

  // Function to handle radio button changes in Step 1
  function handleStep1Choice() {
    enableButton('next-1'); // Enable the "Next" button for Step 1
  }

  // Attach event listeners to the radio buttons in Step 1 for enabling the "Next" button
  document.getElementById('step-1-choice-1').addEventListener('change', handleStep1Choice);
  document.getElementById('step-1-choice-2').addEventListener('change', handleStep1Choice);

  // Event listener for the "Next" button in Step 1
  document.getElementById('next-1').addEventListener('click', function() {
    if (document.getElementById('step-1-choice-1').checked) {
      lastStepBeforeStep4 = 'step-1'; // Update last step
      showStep('step-4');
    } else if (document.getElementById('step-1-choice-2').checked) {
      showStep('step-2');
    }
  });

  // Attach event listener to the "back" buttons
  document.getElementById('back-2').addEventListener('click', function() {
    showStep('step-1');
  });
  document.getElementById('back-3').addEventListener('click', function() {
    showStep('step-2');
  });

  // Event listener for the "next" button in Step 2 to show Step 3
  document.getElementById('next-2').addEventListener('click', function() {
    showStep('step-3');
  });

  // Event listener for the "Next" button in Step 3 to show Step 4
  document.getElementById('next-3').addEventListener('click', function() {
    lastStepBeforeStep4 = 'step-3'; // Update last step
    showStep('step-4');
  });

  // Attach event listener for the "Back" button in Step 4
  document.getElementById('back-4').addEventListener('click', function() {
    showStep(lastStepBeforeStep4);
  });

  // Initialize the form by showing Step 1 and disabling "next" buttons
  showStep('step-1');
  document.querySelectorAll('[id^="next-"]').forEach(function(button) {
    button.style.opacity = '0.5';
    button.style.pointerEvents = 'none';
    button.style.cursor = 'default';
  });

  // Time Picker Logic
  document.querySelectorAll('.time-slot').forEach(function(slot) {
    slot.addEventListener('click', function() {
      document.querySelectorAll('.time-slot').forEach(function(slot) {
        slot.classList.remove('is-active-inputactive'); // Remove active class from all slots
      });
      slot.classList.add('is-active-inputactive'); // Add active class to the clicked slot
      enableButton('next-3'); // Enable the "Next" button when a time slot is selected
    });
  });

  // Your existing logic for the time slots availability based on the current or selected date
  // (Assuming you've implemented the updateTimeSlotsAvailability function as previously described)

  // You might need to call the updateTimeSlotsAvailability function here if it's necessary for initializing the time slots

  // Note: Since the date picker initialization was mentioned to be handled separately, it's not included here again
});
