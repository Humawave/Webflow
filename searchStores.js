document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('searchInput');

    // Debounce function to limit how often a function is executed
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

    var handleSearch = debounce(function() {
        var searchTerm = searchInput.value.toLowerCase();

        // Getting all the CMS items by their correct class name 'cms_item'
        var cmsItems = document.querySelectorAll('.cms_item');

        cmsItems.forEach(function(item) {
            // Retrieving the store name from the custom data attribute
            var storeName = item.getAttribute('data-store-name').toLowerCase();

            // Checking if the store name includes the search term
            if (storeName.includes(searchTerm)) {
                item.style.display = ''; // Show the item if it matches
            } else {
                item.style.display = 'none'; // Hide the item if it doesn't match
            }
        });
    }, 250); // Adjust debounce time as needed

    searchInput.addEventListener('input', handleSearch);
});
