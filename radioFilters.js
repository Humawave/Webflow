document.addEventListener('DOMContentLoaded', function() {
    function filterItemsByCategory(selectedCategory) {
        const cmsItems = document.querySelectorAll('.cms_item');
        let anyItemVisible = false; // Flag to track if any item remains visible

        cmsItems.forEach(function(item) {
            let belongsToCategory = false;

            for (let i = 1; i <= 5; i++) {
                const categoryDiv = item.querySelector(`.cms_categories .cms_title-category-${i}`);
                
                if (categoryDiv && categoryDiv.id === selectedCategory) {
                    belongsToCategory = true;
                    break;
                }
            }

            if (belongsToCategory || selectedCategory === 'all-stores') {
                item.style.display = '';
                anyItemVisible = true; // At least one item is visible
            } else {
                item.style.display = 'none';
            }
        });

        // Show or hide the 'cms_list-empty' div based on anyItemVisible flag
        document.querySelector('.cms_list-empty').style.display = anyItemVisible ? 'none' : 'block';
    }

    const categoryButtons = document.querySelectorAll('.radio_field input[type="radio"][name="category']");
    
    categoryButtons.forEach(function(button) {
        button.addEventListener('change', function() {
            if (this.checked) {
                filterItemsByCategory(this.id);
            }
        });
    });
});
