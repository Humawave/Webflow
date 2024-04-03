document.addEventListener("DOMContentLoaded", function() {
    // Function to show a specific step and hide others
    function showStep(stepId) {
        document.querySelectorAll('[id^="step-"]').forEach(step => step.style.display = 'none');
        document.getElementById(stepId).style.display = 'flex';
    }

    // Function to enable a specific button
    function enableButton(buttonId) {
        let button = document.getElementById(buttonId);
        button.style.opacity = '1';
        button.style.pointerEvents = 'auto';
        button.style.cursor = 'pointer';
    }

    // Function to disable a specific button
    function disableButton(buttonId) {
        let button = document.getElementById(buttonId);
        button.style.opacity = '0.5';
        button.style.pointerEvents = 'none';
        button.style.cursor = 'default';
    }

    // Check if all fields in a step are filled
    function checkFieldsAndEnableButton(stepId, buttonId) {
        let fieldsFilled = Array.from(document.querySelectorAll(`${stepId} input`)).every(input => input.value.trim() !== '');
        fieldsFilled ? enableButton(buttonId) : disableButton(buttonId);
    }

    // Initialize the form by showing Step 1 and disabling "next" buttons
    showStep('step-1');
    document.querySelectorAll('[id^="next-"]').forEach(button => disableButton(button.id));

    // Attach event listeners for step navigation
    document.getElementById('next-1').addEventListener('click', () => showStep('step-2'));
    document.getElementById('back-2').addEventListener('click', () => showStep('step-1'));
    document.getElementById('next-2').addEventListener('click', () => showStep('step-3'));

    // Logic for Steps 3
    document.querySelectorAll('#step-3 input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            enableButton('next-3');
            if (this.id === "referral") {
                document.getElementById('next-3').onclick = () => showStep('step-4');
            } else if (this.id === "one-time") {
                document.getElementById('next-3').onclick = () => showStep('step-5');
            }
        });
    });

    // Event listeners for Step 4 fields to enable next button
    document.querySelectorAll('#step-4 input').forEach(input => {
        input.addEventListener('input', () => checkFieldsAndEnableButton('#step-4', 'next-4'));
    });

    // Logic for Step 5 navigation
    document.getElementById('next-4').addEventListener('click', () => showStep('step-5'));
    document.querySelectorAll('#step-5 input').forEach(input => input.addEventListener('input', () => checkFieldsAndEnableButton('#step-5', 'next-5')));

    document.getElementById('back-5').addEventListener('click', () => {
        let previousStep = document.getElementById('referral').checked ? 'step-4' : 'step-3';
        showStep(previousStep);
    });

    document.getElementById('back-4').addEventListener('click', () => showStep('step-3'));
    document.getElementById('back-3').addEventListener('click', () => showStep('step-2'));

    // Logic for Step 6 fields and navigation
    document.querySelectorAll('#step-6 input').forEach(input => {
        input.addEventListener('input', () => checkFieldsAndEnableButton('#step-6', 'next-6'));
    });

    document.getElementById('next-5').addEventListener('click', () => showStep('step-6'));
    document.getElementById('back-6').addEventListener('click', () => {
        let previousStep = document.getElementById('referral').checked ? 'step-5' : 'step-4';
        showStep(previousStep);
    });

    // Initial disable of next buttons until conditions are met
    disableButton('next-3');
    disableButton('next-4');
    disableButton('next-5');
    disableButton('next-6');

    // Time Picker Logic for Step 2
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.addEventListener('click', function() {
            document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('is-active-inputactive')); // Remove active class from all slots
            slot.classList.add('is-active-inputactive'); // Add active class to the clicked slot
            enableButton('next-2'); // Enable the "Next" button when a time slot is selected
        });
    });
});
