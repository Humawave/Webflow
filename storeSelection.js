// Function to handle store selection
function selectStore(storeId) {
  let selectedStores = JSON.parse(localStorage.getItem('selectedStores')) || [];
  if (!selectedStores.includes(storeId)) {
    selectedStores.push(storeId);
    localStorage.setItem('selectedStores', JSON.stringify(selectedStores));
  }
  console.log(`You have selected store ID: ${storeId}`);
}

// Add event listener to buttons with class 'button' and subclass 'is-shop-here'
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.button.is-shop-here').forEach(button => {
    button.addEventListener('click', function() {
      selectStore(this.id);
    });
  });

  // Show continue section when at least one checkbox is selected
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
      const continueSection = document.getElementById('section-continue');
      if (anyChecked) {
        continueSection.style.display = 'flex';
      } else {
        continueSection.style.display = 'none';
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
