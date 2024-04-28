document.addEventListener('DOMContentLoaded', function () {
  var wfForm = document.getElementById('onboarding-form');

  if (wfForm) {
    wfForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var formData = new FormData(wfForm);

      fetch('https://hook.us1.make.com/56u9440uri398z7rk34egbu1s3tyh9ra', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then(() => {
        window.location.href = 'https://www.humawave.com/shopping';
      })
      .catch(() => {
        // Redirect or handle error quietly
        window.location.href = '/error'; // Replace '/error' with your error page URL
      });
    });
  }
});
