document.addEventListener('DOMContentLoaded', function () {
  // Get the input field and link block elements
  var inputField = document.getElementById('account-referral-code'); // Replace with your input field ID
  var linkBlock = document.getElementById('account-copy-code'); // Replace with your link block ID

  // Add a click event listener to the link block
  linkBlock.addEventListener('click', function (event) {
    // Prevent the default action
    event.preventDefault();

    // Select the text in the input field
    inputField.select();
    inputField.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text to the clipboard
    document.execCommand('copy');

    // Optionally, you can give user feedback, e.g., alert or console log
    console.log('Text copied to clipboard: ' + inputField.value);
  });
});
