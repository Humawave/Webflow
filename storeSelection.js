// Function to handle store selection
function toggleStoreSelection(storeId) {
  let selectedStores = JSON.parse(localStorage.getItem('selectedStores')) || [];
  
  if (selectedStores.includes(storeId)) {
    // Remove the store if it is already selected
    selectedStores = selectedStores.filter(id => id !== storeId);
  } else {
    // Add the store if it is not selected
    selectedStores.push(storeId);
  }

  localStorage.setItem('selectedStores', JSON.stringify(selectedStores));

  // Show or hide the continue section based on the selection
  const continueSection = document.getElementById('section-continue');
  if (continueSection) {
    continueSection.style.display = selectedStores.length > 0 ? 'flex' : 'none';
  }
}

// Add event listener to buttons with class 'button' and subclass 'is-shop-here'
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.button.is-shop-here').forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default link behavior
      toggleStoreSelection(this.id);
    });
  });

  // Handle continue button click
  const continueButton = document.getElementById('button-continue');
  if (continueButton) {
    continueButton.addEventListener('click', function() {
      const selectedStores = JSON.parse(localStorage.getItem('selectedStores')) || [];
      sessionStorage.setItem('selectedStores', JSON.stringify(selectedStores));
      window.location.href = '/book';
    });
  }
});
