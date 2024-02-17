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
    // Function to update URL, toggle div, update link, and update count text
    function updateURLToggleDivAndUpdateLinkAndUpdateCount() {
        // Find all checkboxes in the CMS list
        const checkboxes = document.querySelectorAll('.cms_list input[type="checkbox"]');
        // Filter out the checked ones and map their ids
        const selectedIds = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.getAttribute('id'));

        // Create a new query parameter for the current page URL
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('selectedStores', selectedIds.join(','));
        // Update the current page URL without reloading
        history.pushState(null, '', '?' + queryParams.toString());

        // Base URL for the link block
        const baseURL = 'https://humawave.webflow.io/session';
        // Append selected items as query parameters to the link block's URL
        const linkBlockURL = selectedIds.length > 0 ? `${baseURL}?selectedStores=${selectedIds.join(',')}` : baseURL;

        // Toggle visibility of the div based on if any checkboxes are selected
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
            }, 100); // Wait for the animation to finish before hiding the div
        }

        // Update the href attribute of the link block
        const linkContinue = document.getElementById('link-continue');
        linkContinue.setAttribute('href', linkBlockURL);
    } // This closing brace ends the function definition

    // Attach change event listener to checkboxes
    document.querySelectorAll('.cms_list input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateURLToggleDivAndUpdateLinkAndUpdateCount);
    });
});





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
