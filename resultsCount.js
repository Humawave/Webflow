document.addEventListener('DOMContentLoaded', function() {
    // Function to update the count of visible CMS items
    function updateResultsCount() {
        const cmsItems = document.querySelectorAll('.cms_item');
        const resultsTextBlock = document.getElementById('cms-results');
        
        const visibleItemCount = Array.from(cmsItems).filter(item => item.style.display !== 'none').length;
        
        resultsTextBlock.textContent = `${visibleItemCount} store${visibleItemCount === 1 ? '' : 's'} found`;
    }

    // Attach this function to run after any action that changes the visibility of CMS items
    window.updateResultsCount = updateResultsCount;

    // Initial update for the count based on the default visible items on page load
    updateResultsCount();
});
