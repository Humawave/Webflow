document.addEventListener('DOMContentLoaded', function() {
  var searchInput = document.getElementById('searchInput');
  var clearButton = document.getElementById('clearSearch');

  // Show the 'X' button when there's at least one character in the input
  searchInput.addEventListener('input', function() {
    if (searchInput.value.length > 0) {
      clearButton.style.display = 'block';
    } else {
      clearButton.style.display = 'none';
    }
  });

// Clear the search input when the 'X' button is clicked
  clearButton.addEventListener('click', function() {
    searchInput.value = '';
    clearButton.style.display = 'none';
  });
});




document.addEventListener("DOMContentLoaded", function() {
    // Hard-coded array of store names
    const cmsItems = ['ZARA', 'Abercrombie & Fitch', 'Adidas', 'Lululemon','GEOX','La Senza','Loblaws','Sephora'];

    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('autocompleteResults');

    searchInput.addEventListener('input', function() {
        const inputVal = this.value.toLowerCase();
        // Filter CMS items based on input
        const filteredItems = cmsItems.filter(item => item.toLowerCase().startsWith(inputVal));

        // Clear previous results
        resultsContainer.innerHTML = '';
        if (inputVal !== '' && filteredItems.length) {
            // Display filtered items as a list in the results container
            filteredItems.forEach(item => {
                const div = document.createElement('div');
                div.textContent = item;
                div.addEventListener('click', function() {
                    searchInput.value = item; // Populate input with selected item
                    resultsContainer.style.display = 'none'; // Hide results container
                    
                    // Manually dispatch an input event to trigger the filter
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

    // Optionally, hide autocomplete results when clicking outside
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target)) {
            resultsContainer.style.display = 'none';
        }
    });
});






document.addEventListener("DOMContentLoaded", function() {
    var scrollButton = document.getElementById('scroll-button');
    var scrollContainer = document.getElementById('scrollable-container');

    function checkScroll() {
      if (scrollContainer.scrollWidth - Math.abs(scrollContainer.scrollLeft) - scrollContainer.clientWidth < 1) {
        // Use class to control opacity for hiding
        scrollButton.classList.add('hidden');
      } else {
        // Use class to control opacity for showing
        scrollButton.classList.remove('hidden');
      }
    }

    scrollButton.addEventListener('click', function() {
      var scrollValue = scrollContainer.offsetWidth;
      scrollContainer.scrollBy({ left: scrollValue, behavior: 'smooth' });

      setTimeout(checkScroll, 500); // Adjust time as necessary for the scroll to potentially finish
    });

    scrollContainer.addEventListener('scroll', checkScroll);
  });





document.addEventListener('DOMContentLoaded', function() {
    let persistentSelectedIds = new Set(); // Persistent storage for selected checkbox IDs

    // Function to update URL, toggle div, update link, and update count text based on selected checkboxes
    function updateURLToggleDivAndUpdateLinkAndUpdateCount() {
        const checkboxes = document.querySelectorAll('.cms_list input[type="checkbox"]');
        
        // Update the selectedIds array based on the current state of checkboxes
        const selectedIds = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.getAttribute('id'));

        // Synchronize the persistentSelectedIds with the current selection
        persistentSelectedIds = new Set(selectedIds);

        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('selectedStores', Array.from(persistentSelectedIds).join(','));
        history.pushState(null, '', '?' + queryParams.toString());

        const baseURL = 'https://humawave.webflow.io/onboarding';
        const linkBlockURL = persistentSelectedIds.size > 0 ? `${baseURL}?selectedStores=${Array.from(persistentSelectedIds).join(',')}` : baseURL;

        const sectionContinue = document.getElementById('section-continue');
        if (persistentSelectedIds.size > 0) {
            sectionContinue.style.display = 'block';
            sectionContinue.style.opacity = 1;
            sectionContinue.style.transition = 'opacity 100ms ease-in';
        } else {
            sectionContinue.style.opacity = 0;
            sectionContinue.style.transition = 'opacity 100ms ease-out';
            setTimeout(() => {
                sectionContinue.style.display = 'none';
            }, 100);
        }

        const linkContinue = document.getElementById('link-continue');
        linkContinue.setAttribute('href', linkBlockURL);
    }

    // Event handler for checkbox state changes
    function checkboxChangeHandler() {
        const checkboxId = this.getAttribute('id');
        if (this.checked) {
            persistentSelectedIds.add(checkboxId);
        } else {
            persistentSelectedIds.delete(checkboxId);
        }
        updateURLToggleDivAndUpdateLinkAndUpdateCount();
    }

    // Attach event listeners to checkboxes and synchronize the UI state based on persistent selection
    document.querySelectorAll('.cms_list input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', checkboxChangeHandler);
        // Initialize checkbox state from persistentSelectedIds
        checkbox.checked = persistentSelectedIds.has(checkbox.getAttribute('id'));
    });

    // Initial update to synchronize UI components based on URL parameters or persistent selections
    const queryParams = new URLSearchParams(window.location.search);
    const selectedStores = queryParams.get('selectedStores');
    if (selectedStores) {
        selectedStores.split(',').forEach(id => persistentSelectedIds.add(id));
    }
    updateURLToggleDivAndUpdateLinkAndUpdateCount();

    // Listen to Finsweet CMS filter updates to reattach event listeners and synchronize state
    document.addEventListener('fs:filter:updated', () => {
        document.querySelectorAll('.cms_list input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', checkboxChangeHandler);
            checkbox.checked = persistentSelectedIds.has(checkbox.getAttribute('id'));
        });
        updateURLToggleDivAndUpdateLinkAndUpdateCount();
    });
});





document.addEventListener('DOMContentLoaded', function() {
    // Mapping of store IDs to names
    const storeNames = {
        '1': 'Abercrombie & Fitch',
        '2': 'Adidas',
        '47': 'Geox',
        '70': 'La Senza',
        '81': 'Loblaws',
        '82': 'Lululemon',
        '107': 'Sephora',
        '133': 'ZARA'
    };

    // Function to format the selected store names text
    function formatSelectedStoresText(selectedIds) {
        const names = selectedIds.map(id => storeNames[id]).filter(name => name !== undefined);
        
        if (names.length > 1) {
            const last = names.pop();
            return `${names.join(', ')} and ${last}`;
        } else {
            return names.join('');
        }
    }

    // Get 'selectedStores' from URL
    const queryParams = new URLSearchParams(window.location.search);
    const selectedStores = queryParams.get('selectedStores');
    
    if (selectedStores) {
        const selectedIds = selectedStores.split(',');
        const selectedText = formatSelectedStoresText(selectedIds);
        
        // Assuming you have a div with an ID of 'selections-text' for displaying the selections
        const selectionsDiv = document.getElementById('selections-text');
        if (selectionsDiv) {
            selectionsDiv.textContent = selectedText;
        }
    }
});
