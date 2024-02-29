document.addEventListener('DOMContentLoaded', function() {
    function filterItemsByCategory(selectedCategory) {
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

        // Smooth scroll to the anchor after filtering
        smoothScrollToAnchor();
    }

    // Function to smooth scroll to the anchor
    function smoothScrollToAnchor() {
        const anchorElement = document.getElementById('anchor');
        if (anchorElement) {
            anchorElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Preselect the "all-stores" radio button and apply filter initially
    const allStoresButton = document.getElementById('all-stores');
    if (allStoresButton) {
        allStoresButton.checked = true;
        filterItemsByCategory('all-stores');
    }

    // Attach event listeners to category radio buttons
    const categoryButtons = document.querySelectorAll('.radio_field input[type="radio"][name="category"]');
    categoryButtons.forEach(function(button) {
        button.addEventListener('change', function() {
            if (this.checked) {
                filterItemsByCategory(this.id);
            }
        });
    });
});
