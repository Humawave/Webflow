document.addEventListener('DOMContentLoaded', function() {
    let isFirstLoad = true; // Flag to check if it's the initial page load
    let loadClicked = false; // Track whether the "load more" button has been clicked
    const loadButton = document.getElementById('load'); // Get the "load" button
    const cmsItems = document.querySelectorAll('.cms_item'); // All CMS items

    // Function to smoothly scroll to an anchor
    function smoothScrollToAnchor() {
        const anchorElement = document.getElementById('anchor');
        if (anchorElement) {
            anchorElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Function for filtering items by category and potentially scrolling
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
            if (item.style.display !== 'none') {
                anyVisible = true;
            }
        });

        // Adjust visibility of the load button when switching back to "all-stores"
        loadButton.style.display = selectedCategory === 'all-stores' && !loadClicked && cmsItems.length > 8 ? '' : 'none';

        const emptyListDiv = document.querySelector('.cms_list-empty');
        emptyListDiv.style.display = anyVisible ? 'none' : 'block';

        if (window.updateResultsCount) {
            window.updateResultsCount();
        }

        if (isUserInitiated) {
            smoothScrollToAnchor();
        }
    }

    // Function to show all items and remember that the load more button was clicked
    loadButton.addEventListener('click', function() {
        loadClicked = true; // Mark that load more has been clicked
        cmsItems.forEach(item => item.style.display = ''); // Show all items
        this.style.display = 'none'; // Hide the load more button
        if (window.updateResultsCount) {
            window.updateResultsCount();
        }
    });

    // Preselect the "all-stores" radio button but avoid scrolling on initial load
    const allStoresButton = document.getElementById('all-stores');
    if (allStoresButton) {
        allStoresButton.checked = true;
        filterItemsByCategory('all-stores', !isFirstLoad);
    }

    // Attach event listeners to category radio buttons and enable smooth scroll on interaction
    const categoryButtons = document.querySelectorAll('.radio_field input[type="radio"][name="category"]');
    categoryButtons.forEach(button => {
        button.addEventListener('change', () => {
            if (button.checked) {
                filterItemsByCategory(button.id, true);
            }
        });
    });

    isFirstLoad = false; // Indicate that initial load logic has completed
});
