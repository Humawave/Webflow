document.addEventListener('DOMContentLoaded', function() {
    // Function to update the count of visible CMS items
    function updateResultsCount() {
        const cmsItems = document.querySelectorAll('.cms_item');
        const resultsTextBlock = document.getElementById('cms-results');
        
        const visibleItemCount = Array.from(cmsItems).filter(item => item.style.display !== 'none').length;
        
        if(visibleItemCount > 1) {
            // If there are multiple stores, show the number of stores available
            resultsTextBlock.textContent = `${visibleItemCount} stores available`;
            resultsTextBlock.style.display = 'block'; // Ensure the text block is visible
        } else if(visibleItemCount === 1) {
            // If there's only one store, adjust the text accordingly
            resultsTextBlock.textContent = '1 store available';
            resultsTextBlock.style.display = 'block'; // Ensure the text block is visible
        } else {
            // If no matches are found, hide the text block
            resultsTextBlock.style.display = 'none';
        }
    }

    // Attach this function to run after any action that changes the visibility of CMS items
    window.updateResultsCount = updateResultsCount;

    // Initial update for the count based on the default visible items on page load
    updateResultsCount();
});
