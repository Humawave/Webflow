(function() {
    // Generates a UUID (Universally Unique Identifier)
    function generateUUID() {
        var d = new Date().getTime();
        var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    // Retrieve or generate the user's unique session identifier
    var userUUID = localStorage.getItem('userUUID');
    if (!userUUID) {
        userUUID = generateUUID();
        localStorage.setItem('userUUID', userUUID);
    }

    // Set the UUID to the hidden field in the form if the field exists
    var uuidField = document.getElementById('uuidField'); // Ensure you have <input type="hidden" id="uuidField" name="uuid"> in your form
    if (uuidField) {
        uuidField.value = userUUID;
    }

    // Assuming RudderStack's analytics.js is already loaded and `rudderanalytics` is available
    // Identify the user with the generated UUID
    rudderanalytics.identify(userUUID, {
        // Any additional user properties can go here
        // For example: name, email, etc. (if known/applicable)
    });

    // Optionally, include a page tracking call
    // rudderanalytics.page();
})();
