document.addEventListener('DOMContentLoaded', function() {
    // Update URL and visibility based on checkbox selections
    function updateURLToggleDivAndUpdateLinkAndUpdateCount() {
        const checkboxes = document.querySelectorAll('.cms_list input[type="checkbox"]');
        const selectedIds = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.getAttribute('id'));

        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('selectedStores', selectedIds.join(','));

        // Preserve other query parameters, excluding pagination parameters
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.forEach((value, key) => {
            if (key !== 'selectedStores' && !key.includes('_page')) {
                queryParams.set(key, value);
            }
        });

        history.pushState(null, '', '?' + queryParams.toString());

        const sectionContinue = document.getElementById('section-continue');
        sectionContinue.style.display = selectedIds.length > 0 ? 'block' : 'none';

        const linkContinue = document.getElementById('link-continue');
        const baseURL = 'https://humawave.com/onboarding';
        linkContinue.setAttribute('href', `${baseURL}?${queryParams.toString()}`);
        
        // Update the quantity text
        const quantityText = document.getElementById('quantity');
        quantityText.textContent = `(${selectedIds.length})`; // Sets the count in the button
    }

    // Attach event listeners to checkboxes
    function attachChangeEventListeners() {
        document.querySelectorAll('.cms_list input[type="checkbox"]').forEach(checkbox => {
            checkbox.removeEventListener('change', updateURLToggleDivAndUpdateLinkAndUpdateCount); // Prevent duplicate listeners
            checkbox.addEventListener('change', updateURLToggleDivAndUpdateLinkAndUpdateCount);
        });
    }

    attachChangeEventListeners();
});
