document.addEventListener('DOMContentLoaded', function () {
  var wfForm = document.getElementById('onboarding-form');

  if (wfForm) {
    wfForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Display the initial message
      var countdownElement = document.getElementById('countdown');
      countdownElement.textContent = "Customizing your experience...";

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
        countdownElement.textContent = "All done 🎉";
        window.location.href = `https://www.humawave.com/confirmation/${data.slug}`;
      })
      .catch(() => {
        window.location.href = '/error'; // Replace with your error page URL
      });
    });
  }
});
