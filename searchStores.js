document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('searchInput');

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    var handleSearch = debounce(function() {
        var searchTerm = searchInput.value.toLowerCase();
        const cmsItems = document.querySelectorAll('.cms_item');
        let anyItemVisible = false;

        cmsItems.forEach(function(item) {
            var storeName = item.getAttribute('data-store-name').toLowerCase();

            if (storeName.startsWith(searchTerm)) {
                item.style.display = '';
                anyItemVisible = true; // At least one item is visible
            } else {
                item.style.display = 'none';
            }
        });

        // Show or hide the 'cms_list-empty' div based on anyItemVisible flag
        document.querySelector('.cms_list-empty').style.display = anyItemVisible ? 'none' : 'block';

        // Update the results count after search filter is applied
        if (window.updateResultsCount) {
            window.updateResultsCount();
        }
    }, 100);

    searchInput.addEventListener('input', handleSearch);

    // Event listener for the focus event to scroll to the div with ID 'anchor'
    searchInput.addEventListener('focus', function() {
        var anchorDiv = document.getElementById('anchor');
        if (anchorDiv) {
            anchorDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
