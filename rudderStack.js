document.addEventListener('DOMContentLoaded', (event) => {
  // Generate a UUID
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // Generate a unique ID for each visitor if it doesn't already exist
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
    rudderanalytics.track('store_selected', {
      store: storeName
    });
  };

  // Send a sample eCommerce event to check if it appears in GA4
  rudderanalytics.track('Product Viewed', {
    product_id: '12345',
    name: 'Sample Product',
    category: 'Category',
    brand: 'Brand',
    price: 100,
    currency: 'USD'
  });

  // Optional: You can log a message to the console to confirm the event has been sent
  console.log('Sample Product Viewed event sent to RudderStack');
});
