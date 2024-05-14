document.addEventListener('DOMContentLoaded', function() {
    const cmsItems = [
        'Aldo', 'Abercrombie & Fitch', 'Adidas', 'Aesop', 'AllSaints', 'Alo Yoga', 'American Eagle Outfitters', 
        'Arc\'teryx', 'Aritzia', 'Athleta', 'Aveda', 'Banana Republic', 'Bath & Body Works', 'Best Buy', 
        'Boss Hugo Boss', 'Canada Goose', 'Canadian Tire', 'Champs Sports', 'Claire\'s', 'Club Monaco', 
        'Coach', 'Dollarama', 'ECCO', 'Ever New', 'Eataly', 'Foot Locker', 'FYE', 'GameStop', 'Geox', 'GNC', 'H&M', 
        'Harry Rosen', 'Herschel', 'Hoka', 'Hollister', 'HomeSense', 'Hot Topic', 'Hudson\'s Bay', 'IKEA', 
        'Indigo', 'Jack & Jones', 'Jo Malone London', 'Kate Spade', 'Kiehl\'s', 'Kiokii', 'Kit and Ace', 
        'L\'Occitane', 'Lacoste', 'Läderach', 'Levi\'s', 'Lids', 'Lindt', 'Loblaws', 'Lululemon', 'Lush', 
        'MAC Cosmetics', 'Mango', 'Mark\'s', 'Michael Kors', 'Nike', 'Sephora', 'UGG', 'Zara'
    ];
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('autocompleteResults');
    const clearButton = document.getElementById('clearSearch');

    clearButton.style.display = 'none'; // Initially hide the clear button

    searchInput.addEventListener('input', function() {
        const inputVal = this.value.toLowerCase();
        clearButton.style.display = inputVal.length > 0 ? 'block' : 'none';

        const filteredItems = cmsItems.filter(item => item.toLowerCase().startsWith(inputVal));

        resultsContainer.innerHTML = '';
        if (inputVal !== '' && filteredItems.length) {
            filteredItems.forEach(item => {
                const div = document.createElement('div');
                div.textContent = item;
                div.className = 'autocomplete-item';
                div.addEventListener('click', function() {
                    searchInput.value = item;
                    resultsContainer.style.display = 'none'; // Hide results container upon selection
                    clearButton.style.display = 'none'; // Optionally hide the clear button
                    searchInput.dispatchEvent(new Event('input', {bubbles: true})); // Update bindings
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
        searchInput.focus(); // Refocus on the search input
        searchInput.dispatchEvent(new Event('input', {bubbles: true, cancelable: true}));
    });

    document.addEventListener('click', function(event) {
        // Check if the clicked area is outside the searchInput and resultsContainer
        if (!searchInput.contains(event.target) && !resultsContainer.contains(event.target)) {
            resultsContainer.style.display = 'none'; // Hide results container
        }
    });
});
