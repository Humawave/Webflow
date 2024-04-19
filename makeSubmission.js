document.addEventListener("DOMContentLoaded", function() {
    var wfForm = document.getElementById('onboarding'); // Replace 'yourFormId' with your actual form ID
    wfForm.addEventListener('submit', function(event) {
        event.preventDefault(); // This prevents the default form submission handled by Webflow

        // Serialize the form data.
        var formData = new FormData(wfForm);

        // Using Fetch API to submit the form data to Webflow (replace 'yourWebflowWebhookURL' with your actual Webflow webhook URL from Make.com)
        fetch('yourWebflowWebhookURL', { 
            method: 'POST',
            body: formData
        })
        .then(response => response.json()) // assuming server responds with JSON
        .then(data => {
            console.log('Success:', data);
            window.location.href = 'https://www.humawave.com/shopping'; // Redirect to the desired URL on success
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred!');
        });
    });
});
