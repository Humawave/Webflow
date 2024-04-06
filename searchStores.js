document.addEventListener('DOMContentLoaded', function() {
    const cmsItems = document.querySelectorAll('.cms_item');
    const loadButton = document.getElementById('load');
    const searchInput = document.getElementById('searchInput');
    let visibleItemsCount = 8; // Set initial count of items to be shown

    // Function to initially display a limited number of CMS items
    function initialDisplay() {
        cmsItems.forEach((item, index) => {
            item.style.display = index < visibleItemsCount ? 'block' : 'none';
        });
        updateLoadButtonVisibility();
    }

    // Update the visibility of the load button
    function updateLoadButtonVisibility() {
        const isAnyHiddenItem = Array.from(cmsItems).some(item => item.style.display === 'none');
        loadButton.style.display = isAnyHiddenItem ? 'block' : 'none';
    }

    // Function to show all items and update UI accordingly
    function showAllItems() {
        cmsItems.forEach(item => item.style.display = 'block');
        loadButton.style.display = 'none'; // Hide load button
        if (window.updateResultsCount) window.updateResultsCount();
    }

    // Function to debounce to optimize search performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Handle the search functionality with debounce
    var handleSearch = debounce(function() {
        const searchTerm = searchInput.value.toLowerCase();
        let anyItemVisible = false;

        cmsItems.forEach(function(item, index) {
            const storeName = item.getAttribute('data-store-name').toLowerCase();

            if (storeName.startsWith(searchTerm)) {
                item.style.display = index < visibleItemsCount ? 'block' : 'none'; // Show items based on search and visibility count
                anyItemVisible = true;
            } else {
                item.style.display = 'none';
            }
        });

        // Update UI based on search results
        document.querySelector('.cms_list-empty').style.display = anyItemVisible ? 'none' : 'flex';
        updateLoadButtonVisibility();
        if (window.updateResultsCount) window.updateResultsCount();
    }, 100);

    searchInput.addEventListener('input', handleSearch);
    loadButton.addEventListener('click', showAllItems);

    // Initial setup
    initialDisplay();
    updateLoadButtonVisibility();
});
