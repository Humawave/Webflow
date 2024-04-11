(function() {
  // Generates a UUID (Universally Unique Identifier)
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  var userSessionId = generateUUID();

  // Load RudderStack SDK and initialize analytics
  !function(){
    var sdkBaseUrl="https://cdn.rudderlabs.com/v3";
    var sdkName="rsa.min.js";
    var asyncScript=true;

    var analytics = window.rudderanalytics = window.rudderanalytics || [];
    if (!analytics.initialize) {
      if (analytics.invoked) {
        window.console && console.error && console.error("Rudder snippet included twice.");
      } else {
        analytics.invoked = true;
        analytics.methods = ["load", "page", "track", "identify", "alias", "group", "reset", "getAnonymousId", "setAnonymousId"];
        analytics.factory = function(method){
          return function(){
            var args = Array.prototype.slice.call(arguments);
            args.unshift(method);
            analytics.push(args);
            return analytics;
          };
        };
        for (var i = 0; i < analytics.methods.length; i++) {
          var key = analytics.methods[i];
          analytics[key] = analytics.factory(key);
        }

        // Load the SDK
        var e = document.createElement("script");
        e.src = sdkBaseUrl + "/" + sdkName;
        e.async = asyncScript;
        document.head.appendChild(e);

        analytics.load("2ekYwbGNs81riCmMq0mDILYaZdc", "https://humawaveawapkr.dataplane.rudderstack.com");
      }
    }

    // Identify the user with the generated UUID
    analytics.identify(userSessionId, { sessionId: userSessionId });

    // Automatically track page views
    analytics.page();
  }();

  // Additional tracking events can be added here
})();
