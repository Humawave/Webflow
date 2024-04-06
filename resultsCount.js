document.addEventListener('DOMContentLoaded', function() {
    // Function to check if the device is mobile
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Function to update the count of visible CMS items and adjust text based on device type
    function updateResultsCount() {
        const cmsItems = document.querySelectorAll('.cms_item');
        const resultsTextBlock = document.getElementById('cms-results');
        
        const visibleItemCount = Array.from(cmsItems).filter(item => item.style.display !== 'none').length;
        const actionWord = isMobileDevice() ? 'Tap' : 'Click'; // Adjust based on device type

        if (visibleItemCount > 1) {
            resultsTextBlock.textContent = `${actionWord} to choose stores`;
            resultsTextBlock.style.display = 'block'; // Ensure the text block is visible
        } else if (visibleItemCount === 1) {
            resultsTextBlock.textContent = `${actionWord} to choose a store`;
            resultsTextBlock.style.display = 'block'; // Ensure the text block is visible
        } else {
            resultsTextBlock.style.display = 'none'; // Hide the text block if no matches are found
        }
    }

    // Attach this function to run after any action that changes the visibility of CMS items
    window.updateResultsCount = updateResultsCount;

    // Initial update for the count based on the default visible items on page load
    updateResultsCount();
});
