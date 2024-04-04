document.addEventListener("DOMContentLoaded", function() {
    let lastNavigatedFromStep = 'step-4'; // Default to step-4 to prevent empty screen

    function showStep(stepId) {
        document.querySelectorAll('[id^="step-"]').forEach(step => step.style.display = 'none');
        document.getElementById(stepId).style.display = 'flex';
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

    showStep('step-1');
    document.querySelectorAll('[id^="next-"]').forEach(button => disableButton(button.id));

    // Step navigation
    document.getElementById('next-1').addEventListener('click', () => showStep('step-2'));
    document.getElementById('back-2').addEventListener('click', () => showStep('step-1'));
    document.getElementById('next-2').addEventListener('click', () => showStep('step-3'));

    document.querySelectorAll('#step-3 input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            enableButton('next-3');
        });
    });

    document.getElementById('next-3').addEventListener('click', () => {
        if (document.getElementById('referral').checked) {
            lastNavigatedFromStep = 'step-3';
            showStep('step-4');
        } else {
            lastNavigatedFromStep = 'step-3';
            showStep('step-5');
        }
    });

    document.querySelectorAll('#step-4 input').forEach(input => {
        input.addEventListener('input', () => checkFieldsAndEnableButton('#step-4', 'next-4'));
    });

    document.getElementById('next-4').addEventListener('click', () => {
        lastNavigatedFromStep = 'step-4';
        showStep('step-5');
    });

    document.querySelectorAll('#step-5 input').forEach(input => {
        input.addEventListener('input', () => checkFieldsAndEnableButton('#step-5', 'next-5'));
    });

    document.getElementById('next-5').addEventListener('click', () => showStep('step-6'));

    document.getElementById('back-5').addEventListener('click', () => showStep(lastNavigatedFromStep));
    document.getElementById('back-4').addEventListener('click', () => showStep('step-3'));
    document.getElementById('back-3').addEventListener('click', () => showStep('step-2'));

    document.getElementById('back-6').addEventListener('click', () => {
        if (!lastNavigatedFromStep) {
            // Fallback to step-4 if lastNavigatedFromStep is not set
            showStep('step-4');
        } else {
            showStep(lastNavigatedFromStep);
        }
    });

    // Initial step setup
    disableButton('next-3');
    disableButton('next-4');
    disableButton('next-5');

    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.addEventListener('click', function() {
            document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('is-active-inputactive'));
            slot.classList.add('is-active-inputactive');
            enableButton('next-2');
        });
    });
});
