document.addEventListener("DOMContentLoaded", function() {
    // Keep track of the last navigated step before reaching Step 6
    let lastNavigatedFromStep = '';

    function showStep(stepId) {
        document.querySelectorAll('[id^="step-"]').forEach(step => step.style.display = 'none');
        document.getElementById(stepId).style.display = 'flex';

        // Remember the last navigated step before showing Step 6
        if (stepId === 'step-6') {
            lastNavigatedFromStep = document.getElementById('referral').checked ? 'step-5' : (document.getElementById('one-time').checked ? 'step-5' : 'step-4');
        }
    }

    function enableButton(buttonId) {
        let button = document.getElementById(buttonId);
        button.style.opacity = '1';
        button.style.pointerEvents = 'auto';
        button.style.cursor = 'pointer';
    }

    function disableButton(buttonId) {
        let button = document.getElementById(buttonId);
        button.style.opacity = '0.5';
        button.style.pointerEvents = 'none';
        button.style.cursor = 'default';
    }

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

    // Logic for Steps 3, 4, and 5 navigation and validation
    document.querySelectorAll('#step-3 input[type="radio"], #step-4 input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            let nextButtonId = this.closest('.step').getAttribute('id').replace('step', 'next');
            enableButton(nextButtonId);

            // Special handling for navigating from Step 3
            if (this.closest('.step').getAttribute('id') === 'step-3') {
                document.getElementById(nextButtonId).onclick = () => {
                    showStep(this.id === 'referral' ? 'step-4' : 'step-5');
                };
            }
        });
    });

    // Apply validation checks on Step 4 and Step 5 input fields
    ['#step-4', '#step-5'].forEach(stepId => {
        document.querySelectorAll(`${stepId} input`).forEach(input => {
            input.addEventListener('input', () => checkFieldsAndEnableButton(stepId, `${stepId.replace('#step-', 'next-')}`));
        });
    });

    // Event listeners for navigating between Step 4, 5, and 6
    document.getElementById('next-4').addEventListener('click', () => showStep('step-5'));
    document.getElementById('next-5').addEventListener('click', () => showStep('step-6'));
    document.getElementById('back-5').addEventListener('click', () => showStep(lastNavigatedFromStep));
    document.getElementById('back-4').addEventListener('click', () => showStep('step-3'));
    document.getElementById('back-3').addEventListener('click', () => showStep('step-2'));

    // Adjusting the back logic for Step 6 based on the previous selection
    document.getElementById('back-6').addEventListener('click', () => {
        showStep(lastNavigatedFromStep);
    });

    // Disable next buttons initially until conditions are met
    disableButton('next-3');
    disableButton('next-4');
    disableButton('next-5');

    // Time Picker Logic for Step 2
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.addEventListener('click', function() {
            document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('is-active-inputactive'));
            slot.classList.add('is-active-inputactive');
            enableButton('next-2');
        });
    });

    // Logic for additional steps or functionalities can be added here.
});
