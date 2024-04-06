document.addEventListener('DOMContentLoaded', function() {
    let isFirstLoad = true; // Indicates the initial page load
    let loadClicked = false; // Tracks if the "load more" button has been clicked
    const loadButton = document.getElementById('load'); // "Load more" button
    const cmsItems = document.querySelectorAll('.cms_item'); // CMS items

    // Smooth scroll to the anchor element
    function smoothScrollToAnchor() {
        const anchorElement = document.getElementById('anchor');
        if (anchorElement) {
            anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Filter items by category and handle scrolling
    function filterItemsByCategory(selectedCategory, isUserInitiated = false) {
        let anyVisible = false;
        let visibleCount = 0; // Reset visible count for each filter action

        // Determine visibility based on category
        cmsItems.forEach((item, index) => {
            const belongsToCategory = Array.from(item.classList).includes(selectedCategory) || selectedCategory === 'all-stores';
            if (belongsToCategory) {
                anyVisible = true;
                if (selectedCategory === 'all-stores' && !loadClicked && index < 8) {
                    item.style.display = ''; // Show first 8 items
                    visibleCount++;
                } else if (selectedCategory !== 'all-stores' || loadClicked) {
                    item.style.display = ''; // Show all items if another category is selected or load more was clicked
                } else {
                    item.style.display = 'none'; // Hide other items initially under "all-stores"
                }
            } else {
                item.style.display = 'none'; // Hide items not belonging to the selected category
            }
        });

        // Adjust the "load" button's visibility
        loadButton.style.display = (selectedCategory === 'all-stores' && !loadClicked && cmsItems.length > 8 && visibleCount < cmsItems.length) ? '' : 'none';

        // Show the "empty" message if no items are visible
        document.querySelector('.cms_list-empty').style.display = anyVisible ? 'none' : '';

        if (window.updateResultsCount) window.updateResultsCount();
        if (isUserInitiated) smoothScrollToAnchor();
    }

    // Show all items and update UI when "load more" is clicked
    loadButton.addEventListener('click', function() {
        loadClicked = true; // Mark that load more has been clicked
        cmsItems.forEach(item => item.style.display = ''); // Show all items
        this.style.display = 'none'; // Hide the load more button
        if (window.updateResultsCount) window.updateResultsCount();
    });

    // Initial setup for the "all-stores" category
    const allStoresButton = document.getElementById('all-stores');
    if (allStoresButton) {
        allStoresButton.checked = true;
        filterItemsByCategory('all-stores', !isFirstLoad);
    }

    // Handle category selection changes
    document.querySelectorAll('.radio_field input[type="radio"][name="category"]').forEach(button => {
        button.addEventListener('change', function() {
            loadClicked = false; // Reset loadClicked status on category change
            filterItemsByCategory(this.id, true);
        });
    });

    isFirstLoad = false;
});
