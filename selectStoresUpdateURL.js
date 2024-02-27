document.addEventListener('DOMContentLoaded', function() {
    const itemsToShow = 20; // Number of items to show initially and upon each "Load More" click

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

    // Load More functionality
    const cmsItems = document.querySelectorAll('.cms_list .cms_item'); // Adjust the selector as needed
    const loadMoreLink = document.getElementById('loadMoreLink'); // Adjust this ID to match your link block's ID

    cmsItems.forEach((item, index) => {
        if (index >= itemsToShow) item.style.display = 'none';
    });

    function showMoreItems(event) {
        event.preventDefault(); // Prevent the link from navigating
        const hiddenItems = document.querySelectorAll('.cms_list .cms_item[style="display: none;"]');
        hiddenItems.forEach((item, index) => {
            if (index < itemsToShow) item.style.display = ''; // Adjust display style as needed
        });

        if (document.querySelectorAll('.cms_list .cms_item[style="display: none;"]').length === 0) {
            loadMoreLink.style.display = 'none';
        }
    }

    if (cmsItems.length > itemsToShow) {
        loadMoreLink.style.display = 'inline-block'; // Adjust if your link block should be displayed differently
        loadMoreLink.addEventListener('click', showMoreItems);
    }

    attachChangeEventListeners();
});
