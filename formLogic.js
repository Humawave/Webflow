document.addEventListener("DOMContentLoaded", function() {
    function showStep(stepId) {
        document.querySelectorAll('[id^="step-"]').forEach(step => step.style.display = 'none');
        document.getElementById(stepId).style.display = 'flex';
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

    showStep('step-1');
    document.querySelectorAll('[id^="next-"]').forEach(button => disableButton(button.id));

    document.getElementById('next-1').addEventListener('click', () => showStep('step-2'));
    document.getElementById('back-2').addEventListener('click', () => showStep('step-1'));
    document.getElementById('next-2').addEventListener('click', () => showStep('step-3'));

    document.querySelectorAll('#step-3 input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            enableButton('next-3');
        });
    });

    document.getElementById('next-3').addEventListener('click', () => {
        let referral = document.getElementById('referral').checked;
        let oneTime = document.getElementById('one-time').checked;
        if (referral) {
            showStep('step-4');
        } else if (oneTime) {
            showStep('step-5');
        }
    });

    document.querySelectorAll('#step-4 input').forEach(input => {
        input.addEventListener('input', () => checkFieldsAndEnableButton('#step-4', 'next-4'));
    });

    document.getElementById('next-4').addEventListener('click', () => showStep('step-5'));

    document.querySelectorAll('#step-5 input').forEach(input => {
        input.addEventListener('input', () => checkFieldsAndEnableButton('#step-5', 'next-5'));
    });

    document.getElementById('next-5').addEventListener('click', () => showStep('step-6'));
    document.getElementById('back-5').addEventListener('click', () => showStep('step-4'));
    document.getElementById('back-4').addEventListener('click', () => showStep('step-3'));
    document.getElementById('back-3').addEventListener('click', () => showStep('step-2'));

    document.getElementById('back-6').addEventListener('click', () => {
        showStep('step-5'); // Always returns to step-5 based on your scenarios
    });

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
