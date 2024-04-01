document.addEventListener('DOMContentLoaded', function() {
  // Get both input fields
  var phoneInput = document.getElementById('phone');
  var refereePhoneInput = document.getElementById('referee-phone');

  // Define the function that formats the phone number
  var formatPhoneNumber = function(e) {
    var value = e.target.value.replace(/\D/g, ''); // Remove all non-numeric characters
    var numberLength = value.length;

    // Check if we need to modify the input value
    if (numberLength > 3 && numberLength <= 6) {
      value = value.replace(/^(\d{3})(\d{0,3})/, '($1) $2');
    } else if (numberLength > 6) {
      value = value.replace(/^(\d{3})(\d{3})(\d{0,4}).*/, '($1) $2-$3');
    }

    e.target.value = value; // Set the formatted value back to the input
  };

  // Apply the formatting function to both phone inputs
  if (phoneInput) {
    phoneInput.addEventListener('input', formatPhoneNumber);
  }
  
  if (refereePhoneInput) {
    refereePhoneInput.addEventListener('input', formatPhoneNumber);
  }
});
