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
    }

    // Preselect the "all-stores" radio button
    const allStoresButton = document.getElementById('all-stores'); // Ensure this matches the ID of your "all-stores" radio button
    if (allStoresButton) {
        allStoresButton.checked = true;
        filterItemsByCategory('all-stores'); // Apply filter to show all items initially
    }

    const categoryButtons = document.querySelectorAll('.radio_field input[type="radio"][name="category"]');
    
    categoryButtons.forEach(function(button) {
        button.addEventListener('change', function() {
            if (this.checked) {
                filterItemsByCategory(this.id);
            }
        });
    });
});
