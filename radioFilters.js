document.addEventListener('DOMContentLoaded', function() {
    let isFirstLoad = true;
    let loadClicked = false;
    const loadButton = document.getElementById('load');
    const cmsItems = document.querySelectorAll('.cms_item');
    const emptyListDiv = document.querySelector('.cms_list-empty');

    function updateVisibilityForAllStores() {
        let visibleCount = 0;
        cmsItems.forEach((item, index) => {
            item.style.display = (index < 8 && !loadClicked) ? '' : 'none'; // Show first 8 items by default or hide if beyond the limit and load hasn't been clicked
            if (item.style.display !== 'none') visibleCount++;
        });

        loadButton.style.display = (visibleCount < cmsItems.length && !loadClicked) ? '' : 'none'; // Show load button if more items are available and load hasn't been clicked
        emptyListDiv.style.display = 'none'; // There are always items in "all-stores", so never show the empty div here
    }

    function filterItemsByCategory(category) {
        let anyVisible = false;
        cmsItems.forEach(item => {
            const isVisible = item.dataset.category.split(',').includes(category); // Assuming each item has a data-category attribute listing all categories it belongs to
            item.style.display = isVisible ? '' : 'none';
            if (isVisible) anyVisible = true;
        });

        loadButton.style.display = 'none'; // Always hide load button when filtering by specific categories
        emptyListDiv.style.display = anyVisible ? 'none' : 'flex'; // Show or hide empty div based on if any items are visible

        if (window.updateResultsCount) window.updateResultsCount();
    }

    document.querySelectorAll('input[type="radio"][name="category"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.id === 'all-stores') {
                loadClicked = false; // Reset loadClicked when going back to all-stores
                updateVisibilityForAllStores();
            } else {
                filterItemsByCategory(this.id);
            }
        });
    });

    loadButton.addEventListener('click', () => {
        loadClicked = true;
        cmsItems.forEach(item => item.style.display = ''); // Show all items when load more is clicked
        loadButton.style.display = 'none'; // Hide load button after it's clicked
        if (window.updateResultsCount) window.updateResultsCount();
    });

    if (isFirstLoad) {
        const allStoresRadio = document.getElementById('all-stores');
        if (allStoresRadio) {
            allStoresRadio.checked = true;
            updateVisibilityForAllStores();
        }
        isFirstLoad = false;
    }
});
