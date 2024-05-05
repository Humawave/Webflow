document.addEventListener('DOMContentLoaded', function () {
  var wfForm = document.getElementById('onboarding-form');

  if (wfForm) {
    wfForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var countdownElement = document.getElementById('countdown');
      countdownElement.textContent = "Working our magic 🪄";

      var formData = new FormData(wfForm);

      var attemptCount = 0;
      var maxAttempts = 5;

      function sendData() {
        fetch('https://hook.us1.make.com/56u9440uri398z7rk34egbu1s3tyh9ra', {
          method: 'POST',
          body: formData
        })
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        })
        .then(data => {
          console.log('Received data:', data); // Log the received data for debugging
          if (data.status === 'complete') {
            countdownElement.textContent = "All done 🎉";
            setTimeout(function() { // Delay the redirection by 1 second
              window.location.href = `https://www.humawave.com/confirmation/${data.slug}`;
            }, 1000); // 1000 milliseconds = 1 second
          } else if (attemptCount < maxAttempts) {
            attemptCount++;
            console.log('Attempt:', attemptCount, 'Status:', data.status);
            setTimeout(sendData, 2000); // Retry after 2 seconds
          } else {
            throw new Error('Max attempts reached, process not complete');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          countdownElement.textContent = "Error processing your request.";
          setTimeout(() => window.location.href = '/error', 2000); // Delay redirect to error page
        });
      }

      sendData(); // Start the send data process
    });
  }
});
