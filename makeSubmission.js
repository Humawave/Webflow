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
        return response.json();
      })
      .then(data => {
        // Replace 'slugField' with the actual field name for the slug in the response
        window.location.href = `https://www.humawave.com/session/${data.slugField}`;
      })
      .catch(() => {
        window.location.href = '/error'; // Replace with your error page URL
      });
    });
  }
});
