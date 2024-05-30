document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.is-shop-here');
    const continueSection = document.getElementById('section-continue');
    const selectedButtons = new Set();

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonId = button.id;

            if (selectedButtons.has(buttonId)) {
                selectedButtons.delete(buttonId);
                button.classList.remove('selected'); // Optional: Add a class to indicate selection
            } else {
                selectedButtons.add(buttonId);
                button.classList.add('selected'); // Optional: Add a class to indicate selection
            }

            if (selectedButtons.size > 0) {
                continueSection.style.display = 'flex';
            } else {
                continueSection.style.display = 'none';
            }
        });
    });
});
