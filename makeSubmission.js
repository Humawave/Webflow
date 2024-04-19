document.addEventListener('DOMContentLoaded', function () {
  var wfForm = document.getElementById('onboarding-form');
  if (wfForm) {
    wfForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission

      var formData = new FormData(wfForm); // Assuming wfForm is the form element

      // Replace 'yourWebflowWebhookURL' with the actual URL you're posting to
      fetch('https://hook.us1.make.com/aj3oy0sjjfpj4xz6ck47ch9n9njlbxbg', { 
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // or response.text() if the server doesn't send JSON
      })
      .then(data => {
        console.log('Success:', data);
        // Replace with your desired redirect URL
        window.location.href = 'https://www.humawave.com/shopping'; 
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred!');
      });
    });
  } else {
    console.error('Form element with ID "onboarding-form" not found');
  }
});
