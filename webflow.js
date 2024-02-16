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

    function updateURLToggleDivAndUpdateLinkAndUpdateCount() {
        // Find all checkboxes in the CMS list
        const checkboxes = document.querySelectorAll('.cms_list input[type="checkbox"]');
        
        // Synchronize the checkbox state with persistentSelectedIds
        checkboxes.forEach(checkbox => {
            if (persistentSelectedIds.has(checkbox.getAttribute('id'))) {
                checkbox.checked = true;
            }
        });

        // Update the selectedIds array based on the current state of persistentSelectedIds
        const selectedIds = Array.from(persistentSelectedIds);

        // The rest of your original function remains unchanged
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('selectedStores', selectedIds.join(','));
        history.pushState(null, '', '?' + queryParams.toString());

        const baseURL = 'https://humawave.webflow.io/session';
        const linkBlockURL = selectedIds.length > 0 ? `${baseURL}?selectedStores=${selectedIds.join(',')}` : baseURL;

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

        const linkContinue = document.getElementById('link-continue');
        linkContinue.setAttribute('href', linkBlockURL);

        const countTextBlock = document.getElementById('count');
        const selectionCount = selectedIds.length;
        countTextBlock.textContent = selectionCount === 1 ? '1 Store Selected' : `${selectionCount} Stores Selected`;
    }

    // This function updates the persistent storage based on checkbox changes
    function checkboxChangeHandler() {
        const checkboxId = this.getAttribute('id');
        if (this.checked) {
            persistentSelectedIds.add(checkboxId);
        } else {
            persistentSelectedIds.delete(checkboxId);
        }
        updateURLToggleDivAndUpdateLinkAndUpdateCount();
    }

    // Attach change event listener to checkboxes and synchronize the initial state
    function attachEventListenersAndSyncState() {
        document.querySelectorAll('.cms_list input[type="checkbox"]').forEach(checkbox => {
            checkbox.removeEventListener('change', checkboxChangeHandler); // Cleanup to avoid duplicating listeners
            checkbox.addEventListener('change', checkboxChangeHandler);

            // Initial state synchronization
            if (checkbox.checked) {
                persistentSelectedIds.add(checkbox.getAttribute('id'));
            }
        });
        updateURLToggleDivAndUpdateLinkAndUpdateCount(); // Update UI based on the initial state
    }

    attachEventListenersAndSyncState();

    // Placeholder for re-initialization logic after search
    // You will need to call attachEventListenersAndSyncState() after the search functionality updates the DOM
    // For example, if Finsweet's CMS Attributes triggers a custom event after updating the DOM, you could do something like:
    // document.addEventListener('finsweetSearchComplete', attachEventListenersAndSyncState);
});

