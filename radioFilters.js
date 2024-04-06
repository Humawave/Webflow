document.addEventListener('DOMContentLoaded', function() {
    let isFirstLoad = true; // Flag to check if it's the initial page load
    const loadButton = document.getElementById('load'); // Get the "load" button
    const cmsItems = document.querySelectorAll('.cms_item'); // All CMS items

    // Set the initial number of items to show and adjust based on interaction
    let initialVisibleItemsCount = 8;

    function smoothScrollToAnchor() {
        const anchorElement = document.getElementById('anchor');
        if (anchorElement) {
            anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function filterItemsByCategory(selectedCategory, isUserInitiated = false) {
        let anyVisible = false;
        let visibleCount = 0;

        cmsItems.forEach((item, index) => {
            let belongsToCategory = false;
            for (let i = 1; i <= 5; i++) {
                const categoryDiv = item.querySelector(`.cms_categories .cms_title-category-${i}`);
                if (categoryDiv && categoryDiv.id === selectedCategory) {
                    belongsToCategory = true;
                    break;
                }
            }

            // Adjust display based on category and index for "all-stores"
            if ((belongsToCategory || selectedCategory === 'all-stores') && (selectedCategory === 'all-stores' ? index < initialVisibleItemsCount : true)) {
                item.style.display = '';
                anyVisible = true;
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        // Manage the load button for "all-stores"
        if (selectedCategory === 'all-stores') {
            loadButton.style.display = visibleCount > initialVisibleItemsCount ? 'block' : 'none';
        } else {
            loadButton.style.display = 'none'; // Hide load button for specific categories
        }

        const emptyListDiv = document.querySelector('.cms_list-empty');
        emptyListDiv.style.display = anyVisible ? 'none' : 'block';

        if (window.updateResultsCount) window.updateResultsCount();
        if (isUserInitiated) smoothScrollToAnchor();
    }

    loadButton.addEventListener('click', function() {
        cmsItems.forEach(item => item.style.display = ''); // Show all items
        this.style.display = 'none'; // Hide the "load" button
        if (window.updateResultsCount) window.updateResultsCount();
    });

    const allStoresButton = document.getElementById('all-stores');
    if (allStoresButton) {
        allStoresButton.checked = true;
        filterItemsByCategory('all-stores', !isFirstLoad);
    }

    const categoryButtons = document.querySelectorAll('.radio_field input[type="radio"][name="category"]');
    categoryButtons.forEach(button => {
        button.addEventListener('change', () => {
            if (button.checked) {
                // Reset initial visible count when switching categories
                initialVisibleItemsCount = 8;
                filterItemsByCategory(button.id, true);
            }
        });
    });

    isFirstLoad = false;
});
