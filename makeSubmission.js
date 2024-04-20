document.addEventListener('DOMContentLoaded', function () {
  var wfForm = document.getElementById('onboarding-form'); // Ensure this matches the form's ID

  if (wfForm) {
    console.log('Tag Name:', wfForm.tagName); // Should log 'FORM'

    wfForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission

      console.log('Form element before FormData creation:', wfForm);
      try {
        var formData = new FormData(wfForm); // Create FormData from the form element
      } catch (e) {
        console.error('Error creating FormData:', e);
        return; // Exit the function if FormData cannot be created
      }

      // Replace with your Make.com webhook URL
      fetch('https://hook.us1.make.com/aj3oy0sjjfpj4xz6ck47ch9n9njlbxbg', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (!response.ok) {
          console.error('Bad response from server:', response.status);
          throw new Error('Network response was not ok. Status: ' + response.status);
        }

        // Check the response header to determine if the response is JSON or plain text
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        } else {
          return response.text(); // If not JSON, parse it as plain text
        }
      })
      .then(data => {
        console.log('Success:', data);
        // Redirect to the specified URL upon success
        window.location.href = 'https://www.humawave.com/shopping';
      })
      .catch((error) => {
        // This will catch any error that occurs during the fetch process
        console.error('Error during fetch:', error);
      });
    });
  } else {
    console.error('Form element with ID "onboarding-form" not found');
  }
});
