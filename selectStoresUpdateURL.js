document.addEventListener('DOMContentLoaded', function() {
    function updateURLToggleDivAndUpdateLinkAndUpdateCount() {
        const checkboxes = document.querySelectorAll('.cms_list input[type="checkbox"]');
        const selectedIds = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.getAttribute('id'));

        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('selectedStores', selectedIds.join(','));

        // Preserve other query parameters
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.forEach((value, key) => {
            if (key !== 'selectedStores') {
                queryParams.set(key, value);
            }
        });

        history.pushState(null, '', '?' + queryParams.toString());

        const baseURL = 'https://humawave.webflow.io/onboarding';
        const linkBlockURL = selectedIds.length > 0 ? `${baseURL}?${queryParams.toString()}` : baseURL;

        document.getElementById('section-continue').style.display = selectedIds.length > 0 ? 'block' : 'none';
        document.getElementById('link-continue').setAttribute('href', linkBlockURL);

        // Toggle visibility of the 'cms_list-empty' div
        document.querySelector('.cms_list-empty').style.display = checkboxes.length > 0 && selectedIds.length === 0 ? 'block' : 'none';
    }

    function attachEventListeners() {
        document.querySelectorAll('.cms_list input[type="checkbox"]').forEach(checkbox => {
            checkbox.removeEventListener('change', updateURLToggleDivAndUpdateLinkAndUpdateCount);
            checkbox.addEventListener('change', updateURLToggleDivAndUpdateLinkAndUpdateCount);
        });
    }

    // Initial attachment of event listeners
    attachEventListeners();

    // MutationObserver to reapply logic after content updates
    const observer = new MutationObserver(function(mutationsList, observer) {
        // Assuming content updates might change the structure under '.cms_list'
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                attachEventListeners(); // Reattach event listeners
                // Additional reinitialization logic can go here
            }
        }
    });

    // Configuration for the observer (which mutations to observe)
    const config = { childList: true, subtree: true };

    // Select the node that will be observed for mutations
    const targetNode = document.querySelector('.cms_list');

    // Start observing the target node for configured mutations
    if (targetNode) {
        observer.observe(targetNode, config);
    } else {
        console.error("The target node '.cms_list' was not found.");
    }
});
