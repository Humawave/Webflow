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



document.addEventListener('DOMContentLoaded', function () {
    let persistentSelectedIds = new Set(); // Persistent storage for selected checkbox IDs

    // Function to update URL, toggle div, update link, and update count text based on selected checkboxes
    function updateURLToggleDivAndUpdateLinkAndUpdateCount() {
        // Retrieve all checkboxes in the CMS list
        const checkboxes = document.querySelectorAll('.cms_list input[type="checkbox"]');
        
        // Update the selectedIds array based on the current state of persistentSelectedIds
        const selectedIds = Array.from(persistentSelectedIds);

        // Create a new query parameter for the current page URL with selected stores
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('selectedStores', selectedIds.join(','));
        history.pushState(null, '', '?' + queryParams.toString());

        // Define the base URL for the link block and append selected items as query parameters
        const baseURL = 'https://humawave.webflow.io/session';
        const linkBlockURL = selectedIds.length > 0 ? `${baseURL}?selectedStores=${selectedIds.join(',')}` : baseURL;

        // Toggle visibility of the continue section based on if any checkboxes are selected
        const sectionContinue = document.getElementById('section-continue');
        if (selectedIds.length > 0) {
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

        // Update the href attribute of the continue link
        const linkContinue = document.getElementById('link-continue');
        linkContinue.setAttribute('href', linkBlockURL);

        // Update the text of the count text block based on the number of selected stores
        const countTextBlock = document.getElementById('count');
        const selectionCount = selectedIds.length;
        countTextBlock.textContent = selectionCount === 1 ? '1 Store Selected' : `${selectionCount} Stores Selected`;
    }

    function checkboxChangeHandler() {
    const checkboxId = this.getAttribute('id');
    if (this.checked) {
        persistentSelectedIds.add(checkboxId);
        // Attempt to hide the keyboard on mobile devices
        if (document.activeElement) {
            document.activeElement.blur();
        }
    } else {
        persistentSelectedIds.delete(checkboxId);
    }
    updateURLToggleDivAndUpdateLinkAndUpdateCount();
}


    // Attach event listeners to checkboxes and synchronize the UI state
    function attachEventListenersAndSyncState() {
        document.querySelectorAll('.cms_list input[type="checkbox"]').forEach(checkbox => {
            checkbox.removeEventListener('change', checkboxChangeHandler); // Prevent duplicating listeners
            checkbox.addEventListener('change', checkboxChangeHandler);

            // Sync checkbox state from persistentSelectedIds
            checkbox.checked = persistentSelectedIds.has(checkbox.getAttribute('id'));
        });
        updateURLToggleDivAndUpdateLinkAndUpdateCount(); // Update the UI based on the current state
    }

    // Re-initialize event listeners and UI state after Finsweet filtering updates
    document.addEventListener('fs:filter:updated', attachEventListenersAndSyncState);

    // Initial setup
    attachEventListenersAndSyncState();
});

