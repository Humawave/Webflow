document.addEventListener('DOMContentLoaded', function () {
  var wfForm = document.getElementById('onboarding-form');

  if (wfForm) {
    wfForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var formData = new FormData(wfForm);
      var checkInterval = 1000; // Check every second
      var maxAttempts = 10;
      var attempts = 0;

      fetch('https://hook.us1.make.com/56u9440uri398z7rk34egbu1s3tyh9ra', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        var checkIfLive = setInterval(() => {
          attempts++;
          
          fetch(`https://www.humawave.com/session/${data.slug}`)
          .then(response => {
            if (response.ok) {
              clearInterval(checkIfLive);
              window.location.href = `https://www.humawave.com/session/${data.slug}`;
            } else if (attempts >= maxAttempts) {
              clearInterval(checkIfLive);
              window.location.href = '/error'; // Replace with your error page URL
            }
            // Else wait for the next interval
          })
          .catch(() => {
            // Handle fetch error (network issue or otherwise)
            if (attempts >= maxAttempts) {
              clearInterval(checkIfLive);
              window.location.href = '/error';
            }
          });
        }, checkInterval);
      })
      .catch(() => {
        window.location.href = '/error'; // Replace with your error page URL
      });
    });
  }
});
