document.addEventListener('DOMContentLoaded', function() {
    let isFirstLoad = true; // Indicates the initial page load
    let loadClicked = false; // Tracks if the "load more" button has been clicked
    const loadButton = document.getElementById('load'); // "Load more" button
    const cmsItems = document.querySelectorAll('.cms_item'); // All CMS items
    const emptyListDiv = document.querySelector('.cms_list-empty'); // "Empty list" div

    function smoothScrollToAnchor() {
        const anchorElement = document.getElementById('anchor');
        if (anchorElement) {
            anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function filterItemsByCategory(selectedCategory, isUserInitiated = false) {
        let anyVisible = false;

        cmsItems.forEach((item, index) => {
            const belongsToCategory = Array.from(item.classList).includes(selectedCategory) || selectedCategory === 'all-stores';
            if (belongsToCategory) {
                if (selectedCategory === 'all-stores' && !loadClicked && index < 8) {
                    item.style.display = ''; // Show first 8 items
                    anyVisible = true;
                } else if (selectedCategory !== 'all-stores' || loadClicked) {
                    item.style.display = ''; // Show all items if another category is selected or load more was clicked
                    anyVisible = true;
                } else {
                    item.style.display = 'none'; // Hide other items initially under "all-stores"
                }
            } else {
                item.style.display = 'none'; // Hide items not belonging to the selected category
            }
        });

        // Adjust the "load" button's visibility
        loadButton.style.display = (selectedCategory === 'all-stores' && !loadClicked && cmsItems.length > 8) ? '' : 'none';

        // Show or hide the "empty" message based on anyVisible flag
        emptyListDiv.style.display = anyVisible ? 'none' : '';

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

    document.querySelectorAll('.radio_field input[type="radio"][name="category"]').forEach(button => {
        button.addEventListener('change', function() {
            loadClicked = false; // Reset loadClicked status on category change
            filterItemsByCategory(this.id, true);
        });
    });

    isFirstLoad = false;
});
