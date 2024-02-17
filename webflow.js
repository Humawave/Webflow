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
    searchInput.focus(); // Optional: Bring focus back to the input
  });
});

//

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

//

document.addEventListener('DOMContentLoaded', function () {
    let persistentSelectedIds = new Set(); // Persistent storage for selected checkbox IDs

    function updateURLToggleDivAndUpdateLinkAndUpdateCount() {
        const checkboxes = document.querySelectorAll('.cms_list input[type="checkbox"]');
        const selectedIds = Array.from(persistentSelectedIds);
        const queryParams = new URLSearchParams(window.location.search);

        // Clear URL when no checkboxes are selected
        if (selectedIds.length > 0) {
            queryParams.set('selectedStores', selectedIds.join(','));
            history.pushState(null, '', '?' + queryParams.toString());
        } else {
            // Removes any existing 'selectedStores' without leaving a blank parameter
            queryParams.delete('selectedStores');
            const newUrl = window.location.pathname + (queryParams.toString() ? '?' + queryParams.toString() : '');
            history.pushState(null, '', newUrl);
        }

        // Adjusted base URL handling
        const baseURL = 'https://humawave.webflow.io/session';
        const linkBlockURL = selectedIds.length > 0 ? `${baseURL}?selectedStores=${selectedIds.join(',')}` : baseURL;

        const sectionContinue = document.getElementById('section-continue');
        if (selectedIds.length > 0) {
            sectionContinue.style.display = 'block';
        } else {
            sectionContinue.style.opacity = 0;
            setTimeout(() => {
                sectionContinue.style.display = 'none';
            }, 100);
        }

        const linkContinue = document.getElementById('link-continue');
        linkContinue.setAttribute('href', linkBlockURL);

        const countTextBlock = document.getElementById('count');
        const selectionCount = selectedIds.length;
        countTextBlock.textContent = selectionCount === 1 ? '1 Store Selected' : `${selectionCount} Stores Selected`;
    }

    function checkboxChangeHandler() {
        const checkboxId = this.getAttribute('id');
        if (this.checked) {
            persistentSelectedIds.add(checkboxId);
        } else {
            persistentSelectedIds.delete(checkboxId);
        }
        updateURLToggleDivAndUpdateLinkAndUpdateCount();
    }

    function attachEventListenersAndSyncState() {
        document.querySelectorAll('.cms_list input[type="checkbox"]').forEach(checkbox => {
            checkbox.removeEventListener('change', checkboxChangeHandler);
            checkbox.addEventListener('change', checkboxChangeHandler);
            checkbox.checked = persistentSelectedIds.has(checkbox.getAttribute('id'));
        });
        updateURLToggleDivAndUpdateLinkAndUpdateCount();
    }

    document.addEventListener('fs:filter:updated', attachEventListenersAndSyncState);
    attachEventListenersAndSyncState();
});

//

document.addEventListener("DOMContentLoaded", function() {
    // Hard-coded array of store names
    const cmsItems = ['ZARA', 'Abercrombie & Fitch', 'Adidas', 'Lululemon'];

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
