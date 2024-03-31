document.addEventListener('DOMContentLoaded', function() {
    // Function to update the count of visible CMS items
    function updateResultsCount() {
        const cmsItems = document.querySelectorAll('.cms_item');
        const resultsTextBlock = document.getElementById('cms-results');
        
        const visibleItemCount = Array.from(cmsItems).filter(item => item.style.display !== 'none').length;
        
        // Check the number of items and update the text accordingly
        if(visibleItemCount === 1) {
            resultsTextBlock.textContent = 'Found your store'; // If there's only one store
        } else if(visibleItemCount > 1) {
            resultsTextBlock.textContent = `Select any of ${visibleItemCount} stores`; // If there are multiple stores
        } else {
            resultsTextBlock.textContent = `${visibleItemCount} stores available`; // Default message
        }
    }

    // Attach this function to run after any action that changes the visibility of CMS items
    window.updateResultsCount = updateResultsCount;

    // Initial update for the count based on the default visible items on page load
    updateResultsCount();
});
