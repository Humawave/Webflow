(function() {
  // Generates a UUID (Universally Unique Identifier)
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // User's unique session identifier
  var userSessionId = generateUUID();

  // Initialize RudderStack
  !function(){var analytics=window.rudderanalytics=window.rudderanalytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Rudder snippet included twice.");else{analytics.invoked=!0;analytics.methods=["load","page","track","identify","alias","group","reset","getAnonymousId","setAnonymousId"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.rudderlabs.com/v1/rudder-analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="1.0";
    analytics.load("2ekYwbGNs81riCmMq0mDILYaZdc", "https://humawaveawapkr.dataplane.rudderstack.com");
    // Identify the user with the generated UUID
    analytics.identify(userSessionId, {
      sessionId: userSessionId
    });
    // Automatically track page views
    analytics.page();
  }})();

  // Additional tracking events can be added here, for example:
  // rudderanalytics.track('Event Name', { property1: 'value1', property2: 'value2' });
})();
