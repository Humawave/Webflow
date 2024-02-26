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
        const baseURL = 'https://humawave.webflow.io/onboarding';
        linkContinue.setAttribute('href', `${baseURL}?${queryParams.toString()}`);
    }

    // Attach event listeners to checkboxes
    function attachChangeEventListeners() {
        document.querySelectorAll('.cms_list input[type="checkbox"]').forEach(checkbox => {
            checkbox.removeEventListener('change', updateURLToggleDivAndUpdateLinkAndUpdateCount); // Prevent duplicate listeners
            checkbox.addEventListener('change', updateURLToggleDivAndUpdateLinkAndUpdateCount);
        });
    }

    // Handle pagination link clicks to preserve selectedStores parameter
    function handlePaginationClicks() {
        document.querySelectorAll('.w-pagination-wrap a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default link behavior
                
                const selectedStores = new URLSearchParams(window.location.search).get('selectedStores');
                const targetPageHref = this.getAttribute('href');
                const baseUrl = window.location.href.split('?')[0];
                const pageParam = new URL(targetPageHref, baseUrl).searchParams.get('4bedf26e_page');
                
                const queryParams = new URLSearchParams(window.location.search);
                if (selectedStores) {
                    queryParams.set('selectedStores', selectedStores);
                }
                if (pageParam) {
                    queryParams.set('4bedf26e_page', pageParam);
                }

                window.location.href = `${baseUrl}?${queryParams.toString()}`;
            });
        });
    }

    attachChangeEventListeners();
    handlePaginationClicks();
});
