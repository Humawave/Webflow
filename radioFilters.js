document.addEventListener('DOMContentLoaded', function() {
    function filterItemsByCategory(selectedCategory, isUserInitiated = false) {
        const cmsItems = document.querySelectorAll('.cms_item');
        let anyVisible = false; // Track if any items are visible

        cmsItems.forEach(function(item) {
            let belongsToCategory = false;

            // Check each category div within the item for a match
            for (let i = 1; i <= 5; i++) {
                const categoryDiv = item.querySelector(`.cms_categories .cms_title-category-${i}`);
                
                if (categoryDiv && categoryDiv.id === selectedCategory) {
                    belongsToCategory = true;
                    break; // Stop checking further if a match is found
                }
            }

            item.style.display = belongsToCategory || selectedCategory === 'all-stores' ? '' : 'none';
            if (item.style.display !== 'none') {
                anyVisible = true; // Mark that we have at least one item visible
            }
        });

        // After checking all items, display the 'cms_list-empty' div if no items are visible
        const emptyListDiv = document.querySelector('.cms_list-empty');
        if (emptyListDiv) {
            emptyListDiv.style.display = anyVisible ? 'none' : 'block';
        }

        // Update the results count if the function exists
        if (window.updateResultsCount) {
            window.updateResultsCount();
        }

        // Smooth scroll to the anchor after filtering, but only if it's a user-initiated action
        if (isUserInitiated) {
            smoothScrollToAnchor();
        }
    }

    function smoothScrollToAnchor() {
        const anchorElement = document.getElementById('anchor');
        if (anchorElement) {
            anchorElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

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
            filterItemsByCategory('all-stores', true);
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

    // Preselect the "all-stores" radio button and apply filter initially without triggering scroll
    const allStoresButton = document.getElementById('all-stores');
    if (allStoresButton) {
        allStoresButton.checked = true;
        filterItemsByCategory('all-stores', isFirstLoad);
    }

    // Attach event listeners to category radio buttons for user interaction
    const categoryButtons = document.querySelectorAll('.radio_field input[type="radio"][name="category"]');
    categoryButtons.forEach(function(button) {
        button.addEventListener('change', function() {
            if (this.checked) {
                filterItemsByCategory(this.id, true);
            }
        });
    });

    let isFirstLoad = false; // Mark that any further actions are user-initiated after initial setup
});
