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
        queryParams.set('selectedItems', selectedIds.join(','));
        // Update the current page URL without reloading
        history.pushState(null, '', '?' + queryParams.toString());

        // Base URL for the link block
        const baseURL = 'https://humawave.webflow.io/session';
        // Append selected items as query parameters to the link block's URL
        const linkBlockURL = selectedIds.length > 0 ? `${baseURL}?selectedItems=${selectedIds.join(',')}` : baseURL;

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

        // Update the text of the "count" text block
        const countTextBlock = document.getElementById('count');
        const selectionCount = selectedIds.length;
        countTextBlock.textContent = selectionCount === 1 ? '1 Store Selected' : `${selectionCount} Stores Selected`;
    }

    // Attach change event listener to checkboxes
    document.querySelectorAll('.cms_list input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateURLToggleDivAndUpdateLinkAndUpdateCount);
    });
});
