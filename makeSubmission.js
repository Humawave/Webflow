document.addEventListener('DOMContentLoaded', function () {
  var wfForm = document.getElementById('onboarding-form');

  if (wfForm) {
    wfForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the form from submitting normally.

      var countdownElement = document.getElementById('countdown');
      countdownElement.textContent = "Working our magic 🪄"; // Display initial processing message.

      var formData = new FormData(wfForm); // Gather form data for submission.

      var attemptCount = 0;
      var maxAttempts = 5;

      function sendData() {
        fetch('https://hook.us1.make.com/56u9440uri398z7rk34egbu1s3tyh9ra', {
          method: 'POST',
          body: formData
        })
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok'); // Check if the HTTP response is OK.
          return response.json(); // Parse the JSON from the response.
        })
        .then(data => {
          console.log('Received data:', data); // Log the received data for debugging.
          if (data.status === 'complete') {
            countdownElement.textContent = "All done 🎉"; // Update the message to show completion.
            window.location.href = `https://www.humawave.com/confirmation/${data.slug}`; // Redirect immediately.
          } else if (attemptCount < maxAttempts) {
            attemptCount++; // Increment the attempt counter.
            console.log('Attempt:', attemptCount, 'Status:', data.status); // Log the attempt and status for debugging.
            setTimeout(sendData, 2000); // Retry the sendData function after 2 seconds.
          } else {
            throw new Error('Max attempts reached, process not complete'); // Throw an error if max attempts are reached.
          }
        })
        .catch(error => {
          console.error('Error:', error); // Log any errors to the console.
          countdownElement.textContent = "Error processing your request."; // Display an error message.
          setTimeout(() => window.location.href = '/error', 2000); // Redirect to error page after a delay.
        });
      }

      sendData(); // Start the send data process.
    });
  }
});
