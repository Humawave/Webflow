document.addEventListener('DOMContentLoaded', function() {
    function clearFiltersAndShowAll() {
        // Clear the search input field
        var searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = '';
        }

        // Select the "all-stores" radio button
        const allStoresButton = document.getElementById('all-stores');
        if (allStoresButton) {
            allStoresButton.checked = true;
        }

        // Assume filterItemsByCategory is globally accessible
        if (typeof filterItemsByCategory === 'function') {
            filterItemsByCategory('all-stores', true);
        } else {
            console.warn('filterItemsByCategory function is not available.');
        }

        // Optionally, trigger any global functions required to update the view
        if (window.updateResultsCount) {
            window.updateResultsCount();
        }
    }

    // Attach event listener to the "Clear Filters" link block
    const clearFiltersLink = document.getElementById('clear-filters');
    if (clearFiltersLink) {
        clearFiltersLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent any default link action
            clearFiltersAndShowAll();
        });
    }
});
