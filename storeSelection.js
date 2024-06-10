window.addEventListener('load', () => {
    const buttons = document.querySelectorAll('.is-shop-here');
    const continueSection = document.getElementById('section-continue');
    const continueButton = document.getElementById('button-continue');
    const selectedButtons = new Set();

    // Store ID to store name mapping
    const storeMapping = {
        A1: 'Abercrombie & Fitch',
        A2: 'Adidas',
        A3: 'Aerie',
        A4: 'Aesop',
        A5: 'Aldo',
        A6: 'AllSaints',
        A7: 'Alo Yoga',
        A8: 'American Eagle Outfitters',
        A9: 'Apple',
        A10: 'Arc\'teryx',
        A11: 'Aritzia',
        A12: 'Athleta',
        A13: 'Aveda',
    };

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonId = button.id;

            if (buttonId) { // Ensure the button has a valid ID
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
                    updateContinueButtonURL(selectedButtons);
                } else {
                    continueSection.style.display = 'none';
                }

                // Update URL with selected buttons
                updateURL(selectedButtons);

                // Update hidden field with selected store names
                updateHiddenField(selectedButtons);

                // Debugging: Log section visibility status
                console.log('Continue Section Display:', continueSection.style.display);
            }
        });
    });

    function updateURL(selectedButtons) {
        const baseURL = window.location.origin;
        if (selectedButtons.size === 0) {
            window.history.replaceState(null, '', baseURL);
        } else {
            const params = Array.from(selectedButtons).join('&');
            const newURL = `?${params}`;
            window.history.replaceState(null, '', newURL);
        }
    }

    function updateContinueButtonURL(selectedButtons) {
        if (continueButton) {
            const params = Array.from(selectedButtons).join('&');
            const newURL = `/book/?${params}`;
            continueButton.href = newURL;

            // Debugging: Log new URL for continue button
            console.log('Continue Button URL:', continueButton.href);
        }
    }

    function updateHiddenField(selectedButtons) {
        const storeNames = Array.from(selectedButtons).map(id => storeMapping[id]).filter(Boolean);
        const hiddenField = document.getElementById('selected-stores');
        if (hiddenField) {
            hiddenField.value = storeNames.join(', ');

            // Debugging: Log the hidden field value
            console.log('Hidden Field Value:', hiddenField.value);
        }
    }

    // Initialize hidden field on page load if there are existing URL params
    const params = new URLSearchParams(window.location.search);
    const selectedIds = Array.from(params.keys());
    selectedIds.forEach(id => {
        if (storeMapping[id]) {
            selectedButtons.add(id);
        }
    });
    if (selectedButtons.size > 0) {
        updateHiddenField(selectedButtons);
        continueSection.style.display = 'flex';
        updateContinueButtonURL(selectedButtons);
    }
});
