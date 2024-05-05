document.addEventListener('DOMContentLoaded', function () {
  var wfForm = document.getElementById('onboarding-form');

  if (wfForm) {
    wfForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var countdownElement = document.getElementById('countdown');
      countdownElement.textContent = "Working our magic 🪄";

      var formData = new FormData(wfForm);

      fetch('https://hook.us1.make.com/56u9440uri398z7rk34egbu1s3tyh9ra', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        if (data.status === 'complete') {
          countdownElement.textContent = "All done 🎉";
          // Redirect immediately upon getting the completion status
          window.location.href = `https://www.humawave.com/confirmation/${data.slug}`;
        } else {
          // Handle any other status appropriately
          countdownElement.textContent = "Something went wrong, please try again.";
          setTimeout(() => window.location.href = '/error', 2000);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        countdownElement.textContent = "Error processing your request.";
        setTimeout(() => window.location.href = '/error', 2000);
      });
    });
  }
});
