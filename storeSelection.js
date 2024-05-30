window.addEventListener('load', () => {
    const buttons = document.querySelectorAll('.is-shop-here');
    const continueSection = document.getElementById('section-continue');
    const selectedButtons = new Set();

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonId = button.id;

            // Toggle selection
            if (selectedButtons.has(buttonId)) {
                selectedButtons.delete(buttonId);
                button.classList.remove('selected'); // Optional: Add a class to indicate selection
            } else {
                selectedButtons.add(buttonId);
                button.classList.add('selected'); // Optional: Add a class to indicate selection
            }

            // Debugging: Log selected buttons
            console.log('Selected Buttons:', Array.from(selectedButtons));

            // Toggle section visibility
            if (selectedButtons.size > 0) {
                continueSection.style.display = 'flex';
            } else {
                continueSection.style.display = 'none';
            }

            // Debugging: Log section visibility status
            console.log('Continue Section Display:', continueSection.style.display);
        });
    });
});