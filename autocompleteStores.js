document.addEventListener('DOMContentLoaded', function() {
    const cmsItems = [
        'Aldo', 'Abercrombie & Fitch', 'Adidas', 'Aesop', 'AllSaints', 'Alo Yoga', 'American Eagle Outfitters', 
        'Arc\'teryx', 'Aritzia', 'Athleta', 'Aveda', 'Banana Republic', 'Bath & Body Works', 'Best Buy', 
        'Boss Hugo Boss', 'Canada Goose', 'Canadian Tire', 'Champs Sports', 'Claire\'s', 'Club Monaco', 
        'Coach', 'Dollarama', 'ECCO', 'Ever New', 'Foot Locker', 'FYE', 'GameStop', 'Geox', 'GNC', 'H&M', 
        'Harry Rosen', 'Herschel', 'Hoka', 'Hollister', 'HomeSense', 'Hot Topic', 'Hudson\'s Bay', 'IKEA', 
        'Indigo', 'Jack & Jones', 'Jo Malone London', 'Kate Spade', 'Kiehl\'s', 'Kiokii and...', 'Kit and Ace', 
        'L\'Occitane', 'Lacoste', 'Läderach', 'Levi\'s', 'Lids', 'Lindt', 'Loblaws', 'Lululemon', 'Lush', 
        'MAC Cosmetics', 'Mango', 'Mark\'s', 'Michael Kors', 'Nike', 'Sephora', 'UGG', 'Zara'
    ];
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('autocompleteResults');
    const clearButton = document.getElementById('clearSearch');

    // Immediately hide the clear button on page load, then control its visibility through JS
    clearButton.style.display = 'none';

    searchInput.addEventListener('input', function() {
        const inputVal = this.value.toLowerCase();

        // Show or hide the clear button based on input field content
        clearButton.style.display = inputVal.length > 0 ? 'block' : 'none';

        // Filter CMS items based on input
        const filteredItems = cmsItems.filter(item => item.toLowerCase().startsWith(inputVal));

        // Clear previous results
        resultsContainer.innerHTML = '';
        if (inputVal !== '' && filteredItems.length) {
            // Display filtered items as a list in the results container
            filteredItems.forEach(item => {
                const div = document.createElement('div');
                div.textContent = item;
                div.className = 'autocomplete-item'; // Optional: Add a class for styling
                div.addEventListener('click', function() {
                    searchInput.value = item; // Populate input with selected item
                    resultsContainer.style.display = 'none'; // Ensure results container is hidden after selection
                    clearButton.style.display = 'none'; // Optionally hide the clear button

                    // Manually dispatch an input event to update clear button and potentially other bindings
                    searchInput.dispatchEvent(new Event('input', {bubbles: true}));
                });
                resultsContainer.appendChild(div);
            });
            resultsContainer.style.display = 'block';
        } else {
            resultsContainer.style.display = 'none';
        }
    });

    // Adds a 'click' event listener to the clear button
    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        clearButton.style.display = 'none';
        resultsContainer.style.display = 'none';
        searchInput.focus(); // Optionally refocus on the search input after clearing

        // Manually dispatch an input event to trigger any attached input event listeners
        searchInput.dispatchEvent(new Event('input', {bubbles: true, cancelable: true}));
    });

    // Optionally, hide autocomplete results when clicking outside
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && event.target !== searchInput && !event.target.matches('.autocomplete-item')) {
            resultsContainer.style.display = 'none';
        }
    });
});
