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
  function getUniqueVisitorId() {
    let visitorId = localStorage.getItem('uniqueVisitorId');
    if (!visitorId) {
      visitorId = generateUUID();
      localStorage.setItem('uniqueVisitorId', visitorId);
    }
    return visitorId;
  }

  // Get or create a unique visitor ID
  const visitorId = getUniqueVisitorId();

  // Identify the visitor with RudderStack
  rudderanalytics.identify(visitorId);

  // Track the page view
  rudderanalytics.page();

  // Function to track store selection
  window.trackStoreSelection = function(storeName) {
    rudderanalytics.track('Store Selected', {
      store: storeName
    });
  };
});
