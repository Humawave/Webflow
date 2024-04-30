document.addEventListener('DOMContentLoaded', function () {
  var wfForm = document.getElementById('onboarding-form');

  if (wfForm) {
    wfForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Start the countdown on form submission
      var countdownElement = document.getElementById('countdown');
      var timeLeft = 6; // seconds
      countdownElement.textContent = "Magic will happen in " + timeLeft + " seconds";

      var countdownTimer = setInterval(function() {
        timeLeft--;
        if (timeLeft > 0) {
          countdownElement.textContent = "Magic will happen in " + timeLeft + " seconds";
        } else if (timeLeft === 0) {
          countdownElement.textContent = "🎉";
          clearInterval(countdownTimer);
        }
      }, 1000);

      var formData = new FormData(wfForm);

      fetch('https://hook.us1.make.com/56u9440uri398z7rk34egbu1s3tyh9ra', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Adjust delay if necessary to sync with the countdown
        setTimeout(() => {
          window.location.href = `https://www.humawave.com/confirmation/${data.slug}`;
        }, 6000); // This delay should match the initial timeLeft * 1000
      })
      .catch(() => {
        window.location.href = '/error'; // Replace with your error page URL
      });
    });
  }
});
