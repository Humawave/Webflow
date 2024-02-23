document.addEventListener('DOMContentLoaded', function() {
    // Function to filter CMS items based on the selected category
    function filterItemsByCategory(category) {
        // Select all CMS items
        const cmsItems = document.querySelectorAll('.cms_item');

        cmsItems.forEach(function(item) {
            // Find the .cms_categories container within the item
            const categoriesContainer = item.querySelector('.cms_categories');
            
            // Determine if the item belongs to the selected category
            const belongsToCategory = categoriesContainer && categoriesContainer.querySelector(`div[id="${category}"]`);

            // Show or hide the item based on whether it belongs to the selected category
            item.style.display = belongsToCategory || category === 'all-stores' ? '' : 'none';
        });
    }

    // Attach event listeners to all category radio buttons within the .radio_field container
    const categoryButtons = document.querySelector('.radio_field').querySelectorAll('input[type="radio"][name="category"]'); // Adjust if the name attribute differs
    categoryButtons.forEach(function(button) {
        button.addEventListener('change', function() {
            if (this.checked) {
                // Call the filter function with the ID of the selected category
                filterItemsByCategory(this.id);
            }
        });
    });
});
