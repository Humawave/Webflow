document.addEventListener('DOMContentLoaded', function() {
    // Getting the search input element by its ID
    var searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', function() {
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
    });
});
