document.addEventListener('DOMContentLoaded', function () {
  var wfForm = document.getElementById('onboarding');

  // Log the element and its tag name to ensure it's the correct form element
  console.log('Element:', wfForm);
  if (wfForm) console.log('Tag Name:', wfForm.tagName);

  if (wfForm && wfForm.tagName === 'FORM') {
    wfForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission
      
      // Additional logging to check the form before creating FormData
      console.log('Form element before FormData creation:', wfForm);

      try {
        var formData = new FormData(wfForm); // Assuming wfForm is the form element
      } catch (e) {
        console.error('Error creating FormData:', e);
        return; // Exit the function if FormData cannot be created
      }

      // Fetch call to send the FormData to the Make.com webhook URL
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
        // Redirect to the desired URL
        window.location.href = 'https://www.yourredirecturl.com'; 
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred!');
      });

    });
  } else {
    console.error('Form element with ID "onboarding" not found or is not a form');
  }
});
