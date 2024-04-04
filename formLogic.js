document.addEventListener("DOMContentLoaded", function() {
    let lastStepBefore6 = '';

    function showStep(stepId) {
        document.querySelectorAll('[id^="step-"]').forEach(step => step.style.display = 'none');
        document.getElementById(stepId).style.display = 'flex';

        // Track the step navigated from when moving to step 6
        if (stepId === 'step-6') {
            lastStepBefore6 = (document.getElementById('referral').checked || lastStepBefore6 === 'step-5') ? 'step-5' : 'step-3';
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

    document.querySelectorAll('[id^="next-"]').forEach(button => disableButton(button.id));
    showStep('step-1');

    document.getElementById('next-1').addEventListener('click', () => showStep('step-2'));
    document.getElementById('back-2').addEventListener('click', () => showStep('step-1'));
    document.getElementById('next-2').addEventListener('click', () => showStep('step-3'));

    document.querySelectorAll('#step-3 input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', () => {
            enableButton('next-3');
            lastStepBefore6 = radio.id === 'referral' ? '' : 'step-5'; // Update path based on selection
        });
    });

    document.getElementById('next-3').addEventListener('click', () => {
        let referral = document.getElementById('referral').checked;
        showStep(referral ? 'step-4' : 'step-5');
    });

    document.querySelectorAll('#step-4 input').forEach(input => input.addEventListener('input', () => checkFieldsAndEnableButton('#step-4', 'next-4')));
    document.getElementById('next-4').addEventListener('click', () => showStep('step-5'));
    document.querySelectorAll('#step-5 input').forEach(input => input.addEventListener('input', () => checkFieldsAndEnableButton('#step-5', 'next-5')));
    document.getElementById('next-5').addEventListener('click', () => showStep('step-6'));

    document.getElementById('back-5').addEventListener('click', () => showStep('step-4'));
    document.getElementById('back-4').addEventListener('click', () => showStep('step-3'));
    document.getElementById('back-3').addEventListener('click', () => showStep('step-2'));

    document.getElementById('back-6').addEventListener('click', () => {
        showStep(lastStepBefore6); // Go back based on the tracked path
    });

    disableButton('next-3');
    disableButton('next-4');
    disableButton('next-5');

    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.addEventListener('click', () => {
            document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('is-active-inputactive'));
            slot.classList.add('is-active-inputactive');
            enableButton('next-2');
        });
    });
});
