document.addEventListener('DOMContentLoaded', function() {
    console.log("Script is running"); // Verify the script is executed after DOMContentLoaded

    // Function to filter CMS items based on the selected category
    function filterItemsByCategory(selectedCategory) {
        console.log("Selected category:", selectedCategory); // Log the selected category to verify the function call

        // Select all CMS items
        const cmsItems = document.querySelectorAll('.cms_item');
        console.log("CMS items found:", cmsItems.length); // Check how many CMS items were found

        cmsItems.forEach(function(item, index) {
            // Assume the item does not belong to the category initially
            let belongsToCategory = false;

            // Check each category div within the item for a match
            for (let i = 1; i <= 5; i++) {
                const categoryDiv = item.querySelector(`.cms_categories .cms_title-category-${i}`);
                console.log(`Item ${index + 1}, Checking ID for category-${i}:`, categoryDiv ? categoryDiv.id : "No div found"); // Log the IDs being checked

                if (categoryDiv && categoryDiv.id === selectedCategory) {
                    belongsToCategory = true;
                    console.log(`Match found for Item ${index + 1}, Category: ${categoryDiv.id}`); // Log when a match is found
                    break; // Stop checking further if a match is found
                }
            }

            // Show or hide the item based on whether it belongs to the selected category
            item.style.display = belongsToCategory || selectedCategory === 'all-stores' ? '' : 'none';
        });
    }

    // Attach event listeners to all category radio buttons within the .radio_field container
    const categoryButtons = document.querySelectorAll('.radio_field input[type="radio"][name="category"]');
    console.log("Radio buttons found:", categoryButtons.length); // Check how many buttons were found

    categoryButtons.forEach(function(button) {
        button.addEventListener('change', function() {
            console.log("Radio button clicked:", this.id); // Confirming click detection
            if (this.checked) {
                // Call the filter function with the ID of the selected category
                filterItemsByCategory(this.id);
            }
        });
    });
});
