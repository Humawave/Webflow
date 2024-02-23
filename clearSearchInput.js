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
