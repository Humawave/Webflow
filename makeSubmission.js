document.addEventListener("DOMContentLoaded", function() {
    var wfForm = document.getElementById('onboarding'); // Replace 'yourFormId' with your form's ID
    wfForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission
      var formData = new FormData(wfForm);

      // Send the form data using Fetch API
      fetch(wfForm.action, {
        method: 'POST',
        body: formData,
      })
      .then(response => {
        if (response.ok) {
          window.location.href = 'https://www.humawave.com/shopping'; // Redirect URL
        } else {
          alert('Form submission failed!');
        }
      })
      .catch(error => console.error('Error:', error));
    });
  });
