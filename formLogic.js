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

    // Check if all fields in step-5 are filled
    function checkStep5Fields() {
        let fieldsFilled = Array.from(document.querySelectorAll('#step-5 input')).every(input => input.value.trim() !== '');
        fieldsFilled ? enableButton('next-5') : disableButton('next-5');
    }

    // Initialize the form by showing Step 1 and disabling "next" buttons
    showStep('step-1');
    document.querySelectorAll('[id^="next-"]').forEach(button => disableButton(button.id));

    // Attach event listener to the "Next" button in Step 1 to show Step 2
    document.getElementById('next-1').addEventListener('click', () => showStep('step-2'));

    // Attach event listener to the "Back" button in Step 2 to show Step 1
    document.getElementById('back-2').addEventListener('click', () => showStep('step-1'));

    // Logic for Steps 3 to 5
    document.querySelectorAll('#step-3 input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', () => enableButton('next-3'));
    });

    document.querySelectorAll('#step-4 input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', () => enableButton('next-4'));
    });

    document.getElementById('next-3').addEventListener('click', () => showStep('step-4'));

    document.getElementById('next-4').addEventListener('click', () => {
        let referralSelected = document.getElementById('referral').checked;
        showStep(referralSelected ? 'step-5' : 'step-6');
    });

    document.querySelectorAll('#step-5 input').forEach(input => {
        input.addEventListener('input', checkStep5Fields);
    });

    document.getElementById('next-5').addEventListener('click', () => showStep('step-6'));

    document.getElementById('back-5').addEventListener('click', () => showStep('step-4'));

    // Back button logic for Step 6
    document.getElementById('back-6').addEventListener('click', () => {
        let lastStepBeforeStep6 = document.getElementById('referral').checked ? 'step-5' : 'step-4';
        showStep(lastStepBeforeStep6);
    });

    // Initial disable of next buttons until conditions are met
    disableButton('next-3');
    disableButton('next-4');
    disableButton('next-5');

    // Event listeners for radio buttons in Step 3 to enable next button
    ['one-time', 'monthly', 'referral'].forEach(id => {
        document.getElementById(id).addEventListener('change', () => enableButton('next-3'));
    });

    // Event listeners for radio buttons in Step 4 to determine next step
    ['monthly', 'one-time'].forEach(id => {
        document.getElementById(id).addEventListener('change', () => {
            enableButton('next-4');
            document.getElementById('next-4').onclick = () => showStep('step-6');
        });
    });

    document.getElementById('referral').addEventListener('change', () => {
        enableButton('next-4');
        document.getElementById('next-4').onclick = () => showStep('step-5');
    });

    // Check fields in Step 5 for enabling the next button
    ['referee-fn', 'referee-ln', 'referee-email', 'referee-phone'].forEach(id => {
        document.getElementById(id).addEventListener('input', checkStep5Fields);
    });

});
