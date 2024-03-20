document.addEventListener("DOMContentLoaded", function() {
    var lastStepBeforeStep4 = 'step-1'; // Default starting step

    // Function to show a specific step and hide others
    function showStep(stepId) {
        document.querySelectorAll('[id^="step-"]').forEach(function(step) {
            step.style.display = 'none'; // Hide all steps
        });
        document.getElementById(stepId).style.display = 'flex'; // Show the specified step
    }

    // Function to enable a specific button
    function enableButton(buttonId) {
        var button = document.getElementById(buttonId);
        button.style.opacity = '1';
        button.style.pointerEvents = 'auto';
        button.style.cursor = 'pointer';
    }

    // Attach event listeners to buttons for navigating steps
    document.getElementById('next-1').addEventListener('click', function() {
        showStep('step-2'); // Navigate to Step 2 when the "Next" button in Step 1 is clicked
    });
    
    document.getElementById('back-2').addEventListener('click', function() {
        showStep('step-1'); // Navigate back to Step 1
    });

    document.getElementById('next-2').addEventListener('click', function() {
        showStep('step-3'); // Navigate to Step 3
    });

    document.getElementById('back-3').addEventListener('click', function() {
        showStep('step-2'); // Navigate back to Step 2
    });

    document.getElementById('next-3').addEventListener('click', function() {
        showStep('step-4'); // Navigate to Step 4
    });

    // Event listeners for the radio buttons in Step 3
    document.getElementById('one-time').addEventListener('change', function() {
        enableButton('next-3'); // Enable the "Next" button for Step 3
    });
    document.getElementById('monthly').addEventListener('change', function() {
        enableButton('next-3'); // Enable the "Next" button for Step 3
    });

    // Back button in Step 4 takes you to the last step viewed before Step 4
    document.getElementById('back-4').addEventListener('click', function() {
        showStep(lastStepBeforeStep4);
    });

    // Time Picker Logic and Date Picker Logic remain the same
    // Add your updateTimeSlotsAvailability and date picker code here
});
