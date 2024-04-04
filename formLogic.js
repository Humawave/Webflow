document.addEventListener("DOMContentLoaded", function() {
    let lastNavigatedFromStep = '';

    function showStep(stepId) {
        document.querySelectorAll('[id^="step-"]').forEach(step => step.style.display = 'none');
        document.getElementById(stepId).style.display = 'flex';

        if (['step-5', 'step-6'].includes(stepId)) {
            lastNavigatedFromStep = document.querySelector('input[name="step-3-radio"]:checked').id;
        }
    }

    function enableButton(buttonId) {
        let button = document.getElementById(buttonId);
        button.disabled = false;
        button.style.opacity = '1';
        button.style.pointerEvents = 'auto';
        button.style.cursor = 'pointer';
    }

    function disableButton(buttonId) {
        let button = document.getElementById(buttonId);
        button.disabled = true;
        button.style.opacity = '0.5';
        button.style.pointerEvents = 'none';
        button.style.cursor = 'default';
    }

    function checkFieldsAndEnableButton(stepId, buttonId) {
        let fieldsFilled = Array.from(document.querySelectorAll(`${stepId} input`)).every(input => input.value.trim() !== '');
        fieldsFilled ? enableButton(buttonId) : disableButton(buttonId);
    }

    // Initialize steps and disable next buttons
    showStep('step-1');
    document.querySelectorAll('[id^="next-"]').forEach(button => disableButton(button.id));

    // Navigation event listeners
    document.getElementById('next-1').addEventListener('click', () => showStep('step-2'));
    document.getElementById('back-2').addEventListener('click', () => showStep('step-1'));
    document.getElementById('next-2').addEventListener('click', () => showStep('step-3'));

    // Step 3 radio buttons logic
    document.querySelectorAll('#step-3 input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', () => {
            enableButton('next-3');
        });
    });

    // Step 3 to Step 4 or Step 5 navigation
    document.getElementById('next-3').addEventListener('click', () => {
        if (document.getElementById('referral').checked) {
            showStep('step-4');
        } else {
            showStep('step-5');
        }
    });

    // Step 4 input fields logic
    document.querySelectorAll('#step-4 input').forEach(input => {
        input.addEventListener('input', () => checkFieldsAndEnableButton('#step-4', 'next-4'));
    });

    // Step 4 to Step 5 navigation
    document.getElementById('next-4').addEventListener('click', () => showStep('step-5'));

    // Step 5 input fields logic
    document.querySelectorAll('#step-5 input').forEach(input => {
        input.addEventListener('input', () => checkFieldsAndEnableButton('#step-5', 'next-5'));
    });

    // Step 5 to Step 6 navigation
    document.getElementById('next-5').addEventListener('click', () => showStep('step-6'));

    // Back navigation logic
    document.getElementById('back-5').addEventListener('click', () => showStep(lastNavigatedFromStep));
    document.getElementById('back-4').addEventListener('click', () => showStep('step-3'));
    document.getElementById('back-3').addEventListener('click', () => showStep('step-2'));
    document.getElementById('back-6').addEventListener('click', () => showStep(lastNavigatedFromStep));

    // Time slots logic for Step 2
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.addEventListener('click', function() {
            document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('is-active-inputactive'));
            slot.classList.add('is-active-inputactive');
            enableButton('next-2');
        });
    });
});
