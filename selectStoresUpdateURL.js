document.addEventListener('DOMContentLoaded', function() {
    // Update the URL and visibility based on checkbox selections
    function updateURLToggleDivAndUpdateLinkAndUpdateCount() {
        const checkboxes = document.querySelectorAll('.cms_list input[type="checkbox"]');
        const selectedIds = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.getAttribute('id'));

        // Construct the query parameters
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('selectedStores', selectedIds.join(','));

        // Preserve other query parameters, except for pagination and selected stores
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.forEach((value, key) => {
            if (key !== 'selectedStores' && !key.includes('_page')) {
                queryParams.set(key, value);
            }
        });

        // Update the URL without reloading the page
        history.pushState(null, '', '?' + queryParams.toString());

        // Update visibility of sections based on selections
        const sectionContinue = document.getElementById('section-continue');
        sectionContinue.style.display = selectedIds.length > 0 ? 'block' : 'none';
        const linkContinue = document.getElementById('link-continue');
        const baseURL = 'https://humawave.webflow.io/onboarding';
        linkContinue.setAttribute('href', selectedIds.length > 0 ? `${baseURL}?${queryParams.toString()}` : baseURL);

        // Update pagination links to preserve the current state
        updatePaginationLinks();
    }

    // Attach event listeners to checkboxes for change events
    function attachChangeEventListeners() {
        document.querySelectorAll('.cms_list input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', updateURLToggleDivAndUpdateLinkAndUpdateCount);
        });
    }

    // Update pagination links to include the selected store IDs and current pagination state
    function updatePaginationLinks() {
        const selectedStores = new URLSearchParams(window.location.search).get('selectedStores');

        document.querySelectorAll('.w-pagination-wrap a').forEach(link => {
            let href = link.getAttribute('href');
            let url = new URL(href, window.location.origin);
            let searchParams = url.searchParams;

            // Update or add the selectedStores parameter
            if (selectedStores) {
                searchParams.set('selectedStores', selectedStores);
            }

            // Update the link's href attribute
            link.setAttribute('href', url.toString());
        });
    }

    // Initial setup: attach event listeners and update pagination links
    attachChangeEventListeners();
    updatePaginationLinks();
});
