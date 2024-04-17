document.addEventListener('DOMContentLoaded', function() {
    // List of items for the autocomplete
    const cmsItems = [
        'Aldo', 'Abercrombie & Fitch', 'Adidas', 'Aesop', 'AllSaints', 'Alo Yoga', 'American Eagle Outfitters', 
        'Arc\'teryx', 'Aritzia', 'Athleta', 'Aveda', 'Banana Republic', 'Bath & Body Works', 'Best Buy', 
        'Boss Hugo Boss', 'Canada Goose', 'Canadian Tire', 'Champs Sports', 'Claire\'s', 'Club Monaco', 
        'Coach', 'Dollarama', 'ECCO', 'Ever New', 'Foot Locker', 'FYE', 'GameStop', 'Geox', 'GNC', 'H&M', 
        'Harry Rosen', 'Herschel', 'Hoka', 'Hollister', 'HomeSense', 'Hot Topic', 'Hudson\'s Bay', 'IKEA', 
        'Indigo', 'Jack & Jones', 'Jo Malone London', 'Kate Spade', 'Kiehl\'s', 'Kiokii', 'Kit and Ace', 
        'L\'Occitane', 'Lacoste', 'Läderach', 'Levi\'s', 'Lids', 'Lindt', 'Loblaws', 'Lululemon', 'Lush', 
        'MAC Cosmetics', 'Mango', 'Mark\'s', 'Michael Kors', 'Nike', 'Sephora', 'UGG', 'Zara'
    ];

    // DOM elements
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('autocompleteResults');
    const clearButton = document.getElementById('clearSearch');
    const clearEmptyButton = document.getElementById('clearSearchEmpty'); // Reset button
    const emptyElement = document.getElementById('empty'); // Element to be hidden

    // Initially hide the clear button and the empty element
    clearButton.style.display = 'none';
    emptyElement.style.display = 'none'; // Assuming you want this hidden initially

    // Event listener for input on the search field
    searchInput.addEventListener('input', function() {
        const inputVal = this.value.toLowerCase();

        // Show or hide clear button based on input
        clearButton.style.display = inputVal.length > 0 ? 'block' : 'none';

        // Filtering the items based on the input
        const filteredItems = cmsItems.filter(item => item.toLowerCase().startsWith(inputVal));

        // Clear previous results and manage display based on input
        resultsContainer.innerHTML = '';
        if (inputVal !== '' && filteredItems.length) {
            filteredItems.forEach(item => {
                const div = document.createElement('div');
                div.textContent = item;
                div.className = 'autocomplete-item';
                div.addEventListener('click', function() {
                    searchInput.value = item;
                    resultsContainer.style.display = 'none';
                    clearButton.style.display = 'none';
                    searchInput.dispatchEvent(new Event('input', {bubbles: true}));
                });
                resultsContainer.appendChild(div);
            });
            resultsContainer.style.display = 'block';
        } else {
            resultsContainer.style.display = 'none';
        }
    });

    // Clear input and hide elements when the clear button is clicked
    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        clearButton.style.display = 'none';
        resultsContainer.style.display = 'none';
        searchInput.focus();
        searchInput.dispatchEvent(new Event('input', {bubbles: true, cancelable: true}));
    });

    // Functionality for the clearEmptyButton
    clearEmptyButton.addEventListener('click', function() {
        searchInput.value = '';
        resultsContainer.innerHTML = ''; // Clear current results
        cmsItems.forEach(item => { // Display all items again
            const div = document.createElement('div');
            div.textContent = item;
            div.className = 'autocomplete-item';
            resultsContainer.appendChild(div);
        });
        resultsContainer.style.display = 'block';
        clearButton.style.display = 'none';
        emptyElement.style.display = 'none'; // Hide the empty element
        searchInput.focus();
    });

    // Hide results container when clicking outside of the search input or results container
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && !resultsContainer.contains(event.target)) {
            resultsContainer.style.display = 'none';
        }
    });
});
