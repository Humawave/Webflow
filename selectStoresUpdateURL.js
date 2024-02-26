document.addEventListener('DOMContentLoaded', function() {
    // Function to update URL, toggle div, update link, and update count based on selected checkboxes
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

        const sectionContinue = document.getElementById('section-continue');
        sectionContinue.style.display = selectedIds.length > 0 ? 'block' : 'none';
        sectionContinue.style.opacity = selectedIds.length > 0 ? 1 : 0;
        sectionContinue.style.transition = 'opacity 100ms ease-in-out';

        const linkContinue = document.getElementById('link-continue');
        linkContinue.setAttribute('href', linkBlockURL);
    }

    // Function to attach or reattach event listeners to checkboxes
    function attachChangeEventListeners() {
        document.querySelectorAll('.cms_list input[type="checkbox"]').forEach(checkbox => {
            checkbox.removeEventListener('change', updateURLToggleDivAndUpdateLinkAndUpdateCount); // Prevent multiple bindings
            checkbox.addEventListener('change', updateURLToggleDivAndUpdateLinkAndUpdateCount);
        });
    }

    // Initial attachment of event listeners
    attachChangeEventListeners();

    // MutationObserver to detect when new content is loaded via pagination and reapply logic
    const observer = new MutationObserver(function(mutationsList, observer) {
        // Assuming content updates might change the structure under '.cms_list'
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                attachChangeEventListeners(); // Reattach event listeners
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
