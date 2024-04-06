document.addEventListener('DOMContentLoaded', function() {
    const cmsItems = document.querySelectorAll('.cms_item');
    const loadButton = document.getElementById('load');
    const searchInput = document.getElementById('searchInput');
    let visibleItemsCount = 8; // Initial count of items to be shown
    let searchTerm = ''; // Initialize search term as empty

    // Function to show items based on visibility count and search term
    function updateVisibleItems() {
        let visibleCount = 0;
        let totalMatchedItems = 0; // Count total items that match the search term

        cmsItems.forEach(item => {
            const storeName = item.getAttribute('data-store-name').toLowerCase();
            if (storeName.startsWith(searchTerm)) {
                totalMatchedItems++; // Increment total matched items if search term matches
                if (visibleCount < visibleItemsCount) {
                    item.style.display = 'block'; // Show item if within visible count limit
                    visibleCount++;
                } else {
                    item.style.display = 'none'; // Hide item if beyond visible count limit
                }
            } else {
                item.style.display = 'none'; // Hide item if not matching the search term
            }
        });

        // Adjust the load more button visibility based on total matched items and visible count
        loadButton.style.display = (totalMatchedItems > visibleItemsCount) ? 'block' : 'none';

        // Optionally update results count or other UI elements
        if (window.updateResultsCount) window.updateResultsCount();
    }

    // Function to show all items when "load more" is clicked
    function showAllItems() {
        visibleItemsCount = cmsItems.length; // Adjust visibleItemsCount to show all items
        updateVisibleItems(); // Update visible items based on the new count
    }

    // Debounce function to optimize search performance
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

    // Handle search functionality with debounce
    const handleSearch = debounce(function() {
        searchTerm = searchInput.value.toLowerCase();
        visibleItemsCount = 8; // Reset visible items count to initial value on search
        updateVisibleItems(); // Update visible items based on search term
    }, 200);

    searchInput.addEventListener('input', handleSearch); // Attach search handler
    loadButton.addEventListener('click', showAllItems); // Attach show all items handler

    // Initial setup
    updateVisibleItems(); // Initial display based on visibility count and search term
});
