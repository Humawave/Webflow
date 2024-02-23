document.addEventListener('DOMContentLoaded', function() {
    // Function to filter CMS items based on the selected category
    function filterItemsByCategory(category) {
        // Select all CMS items
        const cmsItems = document.querySelectorAll('.cms_item');

        cmsItems.forEach(function(item) {
            // Determine if the item belongs to the selected category
            // Each item has divs with IDs for their categories
            const belongsToCategory = item.querySelectorAll(`div[id="${category}"]`).length > 0;

            // Show or hide the item based on the selected category
            item.style.display = belongsToCategory || category === 'all-stores' ? '' : 'none';
        });
    }

    // Attach event listeners to all category radio buttons
    const categoryButtons = document.querySelectorAll('input[type="radio"][name="category"]'); // Assuming the name attribute is 'category' for all radio buttons
    categoryButtons.forEach(function(button) {
        button.addEventListener('change', function() {
            if (this.checked) {
                // Call the filter function with the ID of the selected category
                filterItemsByCategory(this.id);
            }
        });
    });
});
