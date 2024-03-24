document.addEventListener('DOMContentLoaded', function() {
    const cmsItems = ['Aldo', 'Abercrombie & Fitch', 'Adidas', 'Aesop', 'AllSaints', 'Alo Yoga', 'American Eagle Outfitters', 'Arcteryx', 'Aritzia', 'Athleta', 'Aveda', 'Banana Republic', 'Bath & Body Works', 'Best Buy', 'Boss Hugo Boss', 'Canada Goose', 'Canadian Tire', 'Champs Sports', 'Claires', 'Club Monaco', 'Coach', 'Dollarama', 'ECCO', 'Ever New', 'Foot Locker', 'FYE', 'GameStop', 'Geox', 'Loblaws', 'Lululemon', 'Sephora', 'UGG', 'Zara'];
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('autocompleteResults');
    const clearButton = document.getElementById('clearSearch');
    const resultsTextBlock = document.getElementById('cms-results');

    function updateResultsCount(filteredItems) {
        // If filteredItems is passed, use its length; otherwise, count all visible cmsItems
        const count = filteredItems ? filteredItems.length : Array.from(document.querySelectorAll('.cms_item')).filter(item => item.style.display !== 'none').length;
        resultsTextBlock.textContent = `${count} store${count === 1 ? '' : 's'} found`;
    }

    searchInput.addEventListener('input', function() {
        const inputVal = this.value.toLowerCase();

        // Show or hide the clear button based on input field content
        clearButton.style.display = inputVal.length > 0 ? 'block' : 'none';

        // Filter CMS items based on input
        const filteredItems = cmsItems.filter(item => item.toLowerCase().startsWith(inputVal));

        // Clear previous results and update results count
        resultsContainer.innerHTML = '';
        updateResultsCount(filteredItems);

        if (inputVal !== '' && filteredItems.length) {
            // Display filtered items as a list in the results container
            filteredItems.forEach(item => {
                const div = document.createElement('div');
                div.textContent = item;
                div.addEventListener('click', function() {
                    searchInput.value = item;
                    resultsContainer.style.display = 'none';
                    const event = new Event('input', { bubbles: true });
                    searchInput.dispatchEvent(event);
                });
                resultsContainer.appendChild(div);
            });
            resultsContainer.style.display = 'block';
        } else {
            resultsContainer.style.display = 'none';
        }
    });

    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        clearButton.style.display = 'none';
        resultsContainer.style.display = 'none';
        searchInput.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    });

    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && event.target !== searchInput) {
            resultsContainer.style.display = 'none';
        }
    });

    // Initial update for the count based on the default visible items on page load
    updateResultsCount();
});
