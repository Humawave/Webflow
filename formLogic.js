document.addEventListener("DOMContentLoaded", function() {
    let navigationPath = ['step-1'];

    function showStep(stepId) {
        document.querySelectorAll('[id^="step-"]').forEach(step => step.style.display = 'none');
        document.getElementById(stepId).style.display = 'flex';

        // Track navigation path for back navigation
        if (!navigationPath.includes(stepId)) {
            navigationPath.push(stepId);
        }

        // Automatically enable the next button on steps 4 and 5
        if (stepId === 'step-4' || stepId === 'step-5') {
            enableButton(`next-${stepId.charAt(stepId.length - 1)}`);
        }
    }

    function navigateBack() {
        if (navigationPath.length > 1) {
            navigationPath.pop();
            const lastStep = navigationPath[navigationPath.length - 1];
            showStep(lastStep);
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

    // Initial setup
    showStep('step-1');
    document.querySelectorAll('[id^="next-"]').forEach(button => disableButton(button.id));

    // Setup next and back buttons
    document.getElementById('next-1').addEventListener('click', () => showStep('step-2'));
    document.getElementById('back-2').addEventListener('click', navigateBack);
    document.getElementById('next-2').addEventListener('click', () => showStep('step-3'));

    // Handling step 3 choices
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

    document.getElementById('next-4').addEventListener('click', () => showStep('step-5'));
    document.getElementById('next-5').addEventListener('click', () => showStep('step-6'));

    // Back navigation setup
    document.getElementById('back-5').addEventListener('click', navigateBack);
    document.getElementById('back-4').addEventListener('click', navigateBack);
    document.getElementById('back-3').addEventListener('click', navigateBack);
    document.getElementById('back-6').addEventListener('click', navigateBack);

    // Time slot selection for step 2
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.addEventListener('click', function() {
            document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('is-active-inputactive'));
            slot.classList.add('is-active-inputactive');
            enableButton('next-2');
        });
    });
});
