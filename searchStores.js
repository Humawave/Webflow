document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('searchInput');

    // Debounce function to limit how often a function is executed
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

    var handleSearch = debounce(function(event) {
        var searchTerm = event.target.value.toLowerCase();

        // Getting all the CMS items by their correct class name 'cms_item'
        var cmsItems = document.querySelectorAll('.cms_item');

        cmsItems.forEach(function(item) {
            // Retrieving the store name from the custom data attribute
            var storeName = item.getAttribute('data-store-name').toLowerCase();

            // Show item if it matches exactly the search term, hide it otherwise
            if (storeName === searchTerm) {
                item.style.display = '';
                item.innerHTML = highlightMatch(storeName, searchTerm);
            } else {
                item.style.display = 'none';
            }
        });
    }, 250); // Adjust debounce time as needed

    searchInput.addEventListener('input', handleSearch);

    // Function to highlight matching letters
    function highlightMatch(fullString, termToMatch) {
        const startIndex = fullString.indexOf(termToMatch);
        if (startIndex === -1) return fullString; // No match found

        const endIndex = startIndex + termToMatch.length;
        return `${fullString.substring(0, startIndex)}<span class="highlight">${fullString.substring(startIndex, endIndex)}</span>${fullString.substring(endIndex)}`;
    }
});
