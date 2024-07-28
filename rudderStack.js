document.addEventListener('DOMContentLoaded', (event) => {
  // Function to generate a UUID
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // Function to generate or retrieve a unique visitor ID
  function getUserId() {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = generateUUID();
      localStorage.setItem('userId', userId);
    }
    return userId;
  }

  // Get or create a unique user ID
  const userId = getUserId();

  // Identify the visitor with RudderStack
  if (typeof rudderanalytics !== 'undefined') {
    rudderanalytics.identify(userId);

    // Track the page view
    rudderanalytics.page();
  } else {
    console.error('RudderStack is not defined');
  }
});
