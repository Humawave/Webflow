document.addEventListener('DOMContentLoaded', function() {
  // Element selection after the DOM is fully loaded
  var searchInput = document.getElementById('searchInput');
  var clearButton = document.getElementById('clearSearch');

  // Adds an 'input' event listener to the search input
  searchInput.addEventListener('input', function() {
    // Shows the clear button if there's text in the input field, hides it otherwise
    if (searchInput.value.length > 0) {
      clearButton.style.display = 'block';
    } else {
      clearButton.style.display = 'none';
    }
  });

  // Adds a 'click' event listener to the clear button
  clearButton.addEventListener('click', function() {
    // Clears the input field and hides the clear button when clicked
    searchInput.value = '';
    clearButton.style.display = 'none';

    // Manually dispatch an input event to trigger any attached input event listeners
    searchInput.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
  });
});
