document.addEventListener('DOMContentLoaded', function() {
    let isFirstLoad = true;
    let loadClicked = false;
    const loadButton = document.getElementById('load');
    const cmsItems = document.querySelectorAll('.cms_item');
    const emptyListDiv = document.querySelector('.cms_list-empty');

    // Reset display limit and loadClicked flag when switching categories
    function resetDisplayLimitAndFlag() {
        loadClicked = false; // Reset whenever switching back to "all-stores"
        // Show initial number of items (e.g., 8) and "load" button if more items are available
        displayInitialItems();
    }

    function displayInitialItems() {
        let visibleItems = 0;
        cmsItems.forEach((item, index) => {
            item.style.display = index < 8 ? '' : 'none'; // Only display the first 8 items initially
            visibleItems += index < 8 ? 1 : 0;
        });
        // Show the "load" button if there are more than 8 items in total
        loadButton.style.display = cmsItems.length > 8 ? '' : 'none';
        if (!visibleItems) {
            emptyListDiv.style.display = 'block';
        } else {
            emptyListDiv.style.display = 'none';
        }
    }

    function smoothScrollToAnchor() {
        const anchorElement = document.getElementById('anchor');
        if (anchorElement) {
            anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function filterItemsByCategory(selectedCategory, isUserInitiated = false) {
        let anyVisible = false;
        cmsItems.forEach(item => {
            let belongsToCategory = false;
            for (let i = 1; i <= 5; i++) {
                const categoryDiv = item.querySelector(`.cms_categories .cms_title-category-${i}`);
                if (categoryDiv && categoryDiv.id === selectedCategory) {
                    belongsToCategory = true;
                    break;
                }
            }
            item.style.display = belongsToCategory || selectedCategory === 'all-stores' ? '' : 'none';
            anyVisible |= item.style.display !== 'none';
        });

        if (selectedCategory === 'all-stores') {
            // Call resetDisplayLimitAndFlag() only when switching back to "all-stores"
            resetDisplayLimitAndFlag();
        } else {
            loadButton.style.display = 'none'; // Always hide "load" button for specific categories
        }

        emptyListDiv.style.display = anyVisible ? 'none' : 'block';
        if (window.updateResultsCount) window.updateResultsCount();
        if (isUserInitiated) smoothScrollToAnchor();
    }

    loadButton.addEventListener('click', function() {
        cmsItems.forEach(item => item.style.display = '');
        this.style.display = 'none';
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
                filterItemsByCategory(button.id, true);
            }
        });
    });

    isFirstLoad = false;
});
