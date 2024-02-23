document.addEventListener('DOMContentLoaded', function() {
    // Function to filter CMS items based on the selected category
    function filterItemsByCategory(selectedCategory) {
        // Select all CMS items
        const cmsItems = document.querySelectorAll('.cms_item');

        cmsItems.forEach(function(item) {
            // Assume the item does not belong to the category initially
            let belongsToCategory = false;

            // Check each category div within the item for a match
            for (let i = 1; i <= 5; i++) {
                const categoryDiv = item.querySelector(`.cms_categories .cms_title-category-${i}`);
                if (categoryDiv && categoryDiv.id === selectedCategory) {
                    belongsToCategory = true;
                    break; // Stop checking further if a match is found
                }
            }

            // Show or hide the item based on whether it belongs to the selected category
            item.style.display = belongsToCategory || selectedCategory === 'all-stores' ? '' : 'none';
        });
    }

    // Attach event listeners to all category radio buttons within the .radio_field container
    const categoryButtons = document.querySelectorAll('.radio_field input[type="radio"][name="category"]');
    categoryButtons.forEach(function(button) {
        button.addEventListener('change', function() {
            if (this.checked) {
                // Call the filter function with the ID of the selected category
                filterItemsByCategory(this.id);
            }
        });
    });
});
