document.addEventListener("DOMContentLoaded", function() {
    
    // Function to show a specific step, hide others, and manage progress bar visibility
    function showStep(stepId) {
        // Hide all steps
        document.querySelectorAll('[id^="step-"]').forEach(function(step) {
            step.style.display = 'none';
        });
        // Show the specified step
        document.getElementById(stepId).style.display = 'flex';

        // Hide all progress bars
        document.querySelectorAll('[id^="progress-"]').forEach(function(progress) {
            progress.style.display = 'none';
        });

        // Show the progress bar corresponding to the current step
        var progressId = 'progress-' + stepId.split('-')[1]; // Constructs the progress ID based on the step ID
        document.getElementById(progressId).style.display = 'block';
    }

    // Function to enable a specific button
    function enableButton(buttonId) {
        var button = document.getElementById(buttonId);
        button.style.opacity = '1';
        button.style.pointerEvents = 'auto';
        button.style.cursor = 'pointer';
    }

    // Initialize the form by showing Step 1 and disabling "next" buttons
    showStep('step-1');
    document.querySelectorAll('[id^="next-"]').forEach(function(button) {
        button.style.opacity = '0.5';
        button.style.pointerEvents = 'none';
        button.style.cursor = 'default';
    });

    // Attach event listener to the "Next" button in Step 1 to show Step 2
    document.getElementById('next-1').addEventListener('click', function() {
        showStep('step-2');
    });

    // Attach event listener to the "Back" button in Step 2 to show Step 1
    document.getElementById('back-2').addEventListener('click', function() {
        showStep('step-1');
    });

    // Attach event listener to the "Next" button in Step 2 to show Step 3
    document.getElementById('next-2').addEventListener('click', function() {
        showStep('step-3');
    });

    // Attach event listener for the "Back" button in Step 3 to show Step 2
    document.getElementById('back-3').addEventListener('click', function() {
        showStep('step-2');
    });

    // Attach event listeners to radio buttons in Step 3 to enable the "Next" button
    document.getElementById('one-time').addEventListener('change', function() {
        enableButton('next-3');
    });
    document.getElementById('monthly').addEventListener('change', function() {
        enableButton('next-3');
    });

    // Attach event listener for the "Next" button in Step 3 to show Step 4
    document.getElementById('next-3').addEventListener('click', function() {
        showStep('step-4');
    });

    // Attach event listener for the "Back" button in Step 4
    document.getElementById('back-4').addEventListener('click', function() {
        // This will take the user back to Step 3 directly as per your flow
        showStep('step-3');
    });

    // Time Picker Logic for Step 2
    document.querySelectorAll('.time-slot').forEach(function(slot) {
        slot.addEventListener('click', function() {
            document.querySelectorAll('.time-slot').forEach(function(slot) {
                slot.classList.remove('is-active-inputactive'); // Remove active class from all slots
            });
            slot.classList.add('is-active-inputactive'); // Add active class to the clicked slot
            enableButton('next-2'); // Enable the "Next" button when a time slot is selected
        });
    });
});
