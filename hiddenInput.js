document.addEventListener("DOMContentLoaded", function() {
  // Get all radio buttons for Step 1
  document.querySelectorAll('input[name="step-1-choice"]').forEach(function(radioButton) {
    radioButton.addEventListener('change', function() {
      // Update the hidden input field with the value of the selected radio button
      document.getElementById('step1Selection').value = this.value;
    });
  });
});
