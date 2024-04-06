document.addEventListener('DOMContentLoaded', function() {
    let isFirstLoad = true; // Flag to check if it's the initial page load
    let loadClicked = false; // Track whether the "load more" button has been clicked
    const loadButton = document.getElementById('load'); // Get the "load" button
    const cmsItems = document.querySelectorAll('.cms_item'); // All CMS items
    const visibleItemCountInitial = 8; // Number of items to show initially

    // Function for filtering items by category and potentially scrolling
    function filterItemsByCategory(selectedCategory, isUserInitiated = false) {
        let visibleCount = 0; // Counter for visible items

        cmsItems.forEach((item, index) => {
            let belongsToCategory = false;
            for (let i = 1; i <= 5; i++) {
                const categoryDiv = item.querySelector(`.cms_categories .cms_title-category-${i}`);
                if (categoryDiv && categoryDiv.id === selectedCategory) {
                    belongsToCategory = true;
                    break;
                }
            }
            
            if (belongsToCategory || selectedCategory === 'all-stores') {
                // For "all-stores" category, respect the loadClicked flag and visibleItemCountInitial limit
                if (selectedCategory === 'all-stores' && !loadClicked && index >= visibleItemCountInitial) {
                    item.style.display = 'none';
                } else {
                    item.style.display = '';
                    visibleCount++;
                }
            } else {
                item.style.display = 'none';
            }
        });

        // Show the "load" button only if "all-stores" is selected, not all items are visible, and the button has not been clicked
        loadButton.style.display = (selectedCategory === 'all-stores' && !loadClicked && visibleCount > visibleItemCountInitial) ? '' : 'none';

        // Check if any item is visible to manage the emptyListDiv visibility
        const emptyListDiv = document.querySelector('.cms_list-empty');
        emptyListDiv.style.display = visibleCount > 0 ? 'none' : 'block';

        if (window.updateResultsCount) window.updateResultsCount();
        if (isUserInitiated) smoothScrollToAnchor();
    }

    // Function to smoothly scroll to an anchor
    function smoothScrollToAnchor() {
        const anchorElement = document.getElementById('anchor');
        if (anchorElement) {
            anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Function to show all items when the "load more" button is clicked
    loadButton.addEventListener('click', function() {
        loadClicked = true; // Mark that the button has been clicked
        cmsItems.forEach(item => item.style.display = ''); // Show all items
        this.style.display = 'none'; // Hide the "load" button
        if (window.updateResultsCount) window.updateResultsCount();
    });

    // Preselect "all-stores" radio button and filter items accordingly without scrolling
    const allStoresButton = document.getElementById('all-stores');
    if (allStoresButton) {
        allStoresButton.checked = true;
        filterItemsByCategory('all-stores', !isFirstLoad);
    }

    // Attach event listeners to category radio buttons for filtering
    const categoryButtons = document.querySelectorAll('.radio_field input[type="radio"][name="category"]');
    categoryButtons.forEach(button => {
        button.addEventListener('change', () => {
            if (button.checked) {
                // Reset loadClicked flag when switching categories
                loadClicked = false;
                filterItemsByCategory(button.id, true);
            }
        });
    });

    isFirstLoad = false;
});
