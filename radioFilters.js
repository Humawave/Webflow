document.addEventListener('DOMContentLoaded', function() {
    let isFirstLoad = true; // Flag to check if it's the initial page load
    let loadClicked = false; // Track whether the "load more" button has been clicked
    const loadButton = document.getElementById('load'); // Get the "load" button
    const cmsItems = document.querySelectorAll('.cms_item'); // All CMS items

    function smoothScrollToAnchor() {
        const anchorElement = document.getElementById('anchor');
        if (anchorElement) {
            anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function filterItemsByCategory(selectedCategory, isUserInitiated = false) {
        let anyVisible = false;
        let visibleCount = 0;

        cmsItems.forEach(item => {
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
                anyVisible = true;
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        // Adjust visibility of the load button when switching back to "all-stores"
        if (selectedCategory === 'all-stores') {
            if (!loadClicked && visibleCount > 8) {
                // Show load button only if there are more than 8 items and it hasn't been clicked
                loadButton.style.display = 'block';
            } else {
                loadButton.style.display = 'none';
            }
        } else {
            // Hide load button for specific categories
            loadButton.style.display = 'none';
            loadClicked = false; // Reset loadClicked when switching categories
        }

        const emptyListDiv = document.querySelector('.cms_list-empty');
        emptyListDiv.style.display = anyVisible ? 'none' : 'block';

        if (window.updateResultsCount) window.updateResultsCount();
        if (isUserInitiated) smoothScrollToAnchor();
    }

    loadButton.addEventListener('click', function() {
        loadClicked = true; // Mark that the button has been clicked
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
                filterItemsByCategory(button.id, true);
            }
        });
    });

    isFirstLoad = false;
});
