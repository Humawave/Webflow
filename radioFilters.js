document.addEventListener('DOMContentLoaded', function() {
    let isFirstLoad = true; // Flag to check if it's the initial page load
    let loadClicked = false; // Track whether the "load more" button has been clicked
    const loadButton = document.getElementById('load'); // Get the "load" button
    const cmsItems = document.querySelectorAll('.cms_item'); // All CMS items
    const emptyListDiv = document.querySelector('.cms_list-empty'); // Get the "empty" div

    function smoothScrollToAnchor() {
        const anchorElement = document.getElementById('anchor');
        if (anchorElement) {
            anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function filterItemsByCategory(selectedCategory, isUserInitiated = false) {
        let anyVisible = false;
        let itemsShown = 0;

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
                if (selectedCategory === 'all-stores' && !loadClicked && itemsShown >= 8) {
                    item.style.display = 'none';
                } else {
                    item.style.display = '';
                    anyVisible = true;
                    itemsShown++;
                }
            } else {
                item.style.display = 'none';
            }
        });

        loadButton.style.display = (selectedCategory === 'all-stores' && !loadClicked && itemsShown > 8) ? '' : 'none';
        emptyListDiv.style.display = anyVisible ? 'none' : 'block';

        if (window.updateResultsCount) window.updateResultsCount();
        if (isUserInitiated) smoothScrollToAnchor();
    }

    loadButton.addEventListener('click', function() {
        loadClicked = true;
        cmsItems.forEach(item => item.style.display = ''); // Show all items
        this.style.display = 'none'; // Hide the "load" button
        if (window.updateResultsCount) window.updateResultsCount();
    });

    const allStoresButton = document.getElementById('all-stores');
    if (allStoresButton) {
        allStoresButton.checked = true;
        filterItemsByCategory('all-stores');
    }

    const categoryButtons = document.querySelectorAll('.radio_field input[type="radio"][name="category"]');
    categoryButtons.forEach(button => {
        button.addEventListener('change', () => {
            if (button.checked) {
                loadClicked = false; // Reset loadClicked flag when changing categories
                filterItemsByCategory(button.id, true);
            }
        });
    });

    isFirstLoad = false;
});
