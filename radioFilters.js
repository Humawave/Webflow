document.addEventListener('DOMContentLoaded', function() {
    let isFirstLoad = true; // Flag to check if it's the initial page load
    const loadButton = document.getElementById('load'); // Get the "load" button

    // Function for filtering items by category and potentially scrolling
    function filterItemsByCategory(selectedCategory, isUserInitiated = false) {
        const cmsItems = document.querySelectorAll('.cms_item');
        let anyVisible = false;

        cmsItems.forEach(function(item) {
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

        // Show all items and hide "load" button for categories other than "all-stores"
        if (selectedCategory !== 'all-stores') {
            cmsItems.forEach(item => item.style.display = ''); // Remove any display limitations
            if (loadButton) loadButton.style.display = 'none'; // Hide load button
        } else {
            // Logic for "all-stores" category
            // Here you can define how many items you want to show by default and when to show the load button
            // This example assumes you want to revert to the initial behavior where the load button can be shown
            // Adjust according to your specific needs
            if (loadButton) loadButton.style.display = ''; // Show load button
        }

        const emptyListDiv = document.querySelector('.cms_list-empty');
        if (emptyListDiv) {
            emptyListDiv.style.display = anyVisible ? 'none' : 'block';
        }

        if (window.updateResultsCount) {
            window.updateResultsCount();
        }

        if (isUserInitiated) {
            smoothScrollToAnchor();
        }
    }

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

    // Preselect the "all-stores" radio button but avoid scrolling on initial load
    const allStoresButton = document.getElementById('all-stores');
    if (allStoresButton) {
        allStoresButton.checked = true;
        filterItemsByCategory('all-stores', !isFirstLoad);
    }

    // Attach event listeners to category radio buttons and enable smooth scroll on interaction
    const categoryButtons = document.querySelectorAll('.radio_field input[type="radio"][name="category"]');
    categoryButtons.forEach(function(button) {
        button.addEventListener('change', function() {
            if (this.checked) {
                filterItemsByCategory(this.id, true);
            }
        });
    });

    isFirstLoad = false;

    // Check and handle horizontal scrolling
    var scrollButton = document.getElementById('scroll-button');
    var scrollContainer = document.getElementById('scrollable-container');

    function checkScroll() {
        if (scrollContainer.scrollWidth - Math.abs(scrollContainer.scrollLeft) - scrollContainer.clientWidth < 1) {
            scrollButton.classList.add('hidden');
        } else {
            scrollButton.classList.remove('hidden');
        }
    }

    scrollButton.addEventListener('click', function() {
        var scrollValue = scrollContainer.offsetWidth;
        scrollContainer.scrollBy({ left: scrollValue, behavior: 'smooth' });
        setTimeout(checkScroll, 500); // Adjust time as necessary
    });

    scrollContainer.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check
});
