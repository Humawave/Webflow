// Function to handle store selection
function selectStore(storeId) {
  let selectedStores = JSON.parse(localStorage.getItem('selectedStores')) || [];
  if (!selectedStores.includes(storeId)) {
    selectedStores.push(storeId);
    localStorage.setItem('selectedStores', JSON.stringify(selectedStores));
  }
}

// Add event listener to buttons with class 'button' and subclass 'is-shop-here'
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.button.is-shop-here').forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default link behavior
      selectStore(this.id);

      // Show continue section when at least one store is selected
      const continueSection = document.getElementById('section-continue');
      if (continueSection) {
        continueSection.style.display = 'flex';
      }
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
