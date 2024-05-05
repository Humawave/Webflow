document.addEventListener('DOMContentLoaded', function () {
  var wfForm = document.getElementById('onboarding-form');

  if (wfForm) {
    wfForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Display the initial message indicating the start of the process
      var countdownElement = document.getElementById('countdown');
      countdownElement.textContent = "Working our magic 🪄";

      // Prepare the form data to be sent to Make.com webhook
      var formData = new FormData(wfForm);

      // Send the form data to Make.com webhook and handle the response
      fetch('https://hook.us1.make.com/56u9440uri398z7rk34egbu1s3tyh9ra', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok'); // Throw an error if response is not OK
        }
        return response.json(); // Parse JSON data from response
      })
      .then(data => {
        // Check if the status from Make.com indicates completion
        if (data.status === 'complete') {
          countdownElement.textContent = "All done 🎉"; // Update message to indicate completion
          window.location.href = `https://www.humawave.com/confirmation/${data.slug}`; // Redirect to confirmation page
        } else {
          // Handle cases where the process is not reported as complete
          throw new Error('Process not complete');
        }
      })
      .catch(error => {
        console.error('Error:', error); // Log errors to console
        window.location.href = '/error'; // Redirect to error page on failure
      });
    });
  }
});
