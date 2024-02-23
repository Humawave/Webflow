document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('searchInput');

    // Debounce function as previously defined
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
        var cmsItems = document.querySelectorAll('.cms_item');

        cmsItems.forEach(function(item) {
            var storeName = item.getAttribute('data-store-name').toLowerCase();

            // Use classList to control visibility and allow CSS transitions
            if (storeName.includes(searchTerm) && searchTerm !== '') {
                item.classList.add('show');
            } else {
                item.classList.remove('show');
            }

            // Additional handling to ensure smooth transition when clearing search
            if (searchTerm === '') {
                item.style.display = 'none';
                requestAnimationFrame(() => {
                    item.classList.remove('show');
                    // Use setTimeout to ensure display:none is applied after opacity transition
                    setTimeout(() => item.style.display = 'none', 300); // Match transition duration
                });
            } else {
                // Ensure items are displayed for opacity transition to be visible
                item.style.display = '';
            }
        });
    }, 250);

    searchInput.addEventListener('input', handleSearch);
});
