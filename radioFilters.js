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

            if (belongsToCategory || selectedCategory === 'all-stores') {
                item.style.display = '';
                anyVisible = true; // Mark that we have at least one item visible
            } else {
                item.style.display = 'none';
            }
        });

        // After checking all items, display the 'cms_list-empty' div if no items are visible
        const emptyListDiv = document.querySelector('.cms_list-empty');
        if (emptyListDiv) {
            emptyListDiv.style.display = anyVisible ? 'none' : 'block';
        }
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
