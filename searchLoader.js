document.addEventListener('DOMContentLoaded', function() {
    // Function to show the loader and hide the magnifier icon
    function showLoader() {
        document.getElementById('search-loader').style.display = 'block';
        document.getElementById('magnifier-icon').style.display = 'none';
    }

    // Function to hide the loader and show the magnifier icon
    function hideLoader() {
        document.getElementById('search-loader').style.display = 'none';
        document.getElementById('magnifier-icon').style.display = 'block';
    }

    // Get the search input element
    const searchInput = document.getElementById('search-stores');

    // Add event listener to show loader when user starts typing
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            // Show loader only if there's at least one character in the search field
            if (searchInput.value.length > 0) {
                showLoader();
            } else {
                hideLoader();
            }
        });

        // Use MutationObserver to detect changes in the CMS items
        const observer = new MutationObserver(() => {
            // Check if there are any visible items in the CMS list
            const cmsItems = document.querySelectorAll('.grid-store_item');
            let visibleItems = Array.from(cmsItems).some(item => item.style.display !== 'none');
            
            if (visibleItems) {
                hideLoader();
            }
        });

        // Observe the CMS list for changes
        const cmsList = document.querySelector('.grid-stores_list');
        if (cmsList) {
            observer.observe(cmsList, { childList: true, subtree: true, attributes: true });
        }

        // Ensure the loader is hidden initially
        hideLoader();
    } else {
        console.error('Search input element with ID "search-stores" not found.');
    }
});
