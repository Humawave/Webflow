async function initMap() {
  const response = await fetch('https://northamerica-northeast2-humawave.cloudfunctions.net/getApiKey');
  const data = await response.json();
  const apiKey = data.apiKey;

  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=loadMap`;
  script.async = true;
  script.defer = true;
  script.setAttribute('loading', 'async');
  document.head.appendChild(script);
}

function loadMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8.5, // Use fractional zoom level
    center: { lat: 43.685059, lng: -79.38211 },
    fullscreenControl: false, // Remove the fullscreen control
    isFractionalZoomEnabled: true // Enable fractional zoom
  });

  fetch('https://storage.googleapis.com/humawave-public-resources/toronto.geojson')
    .then(response => response.json())
    .then(data => {
      map.data.addGeoJson(data);
      map.data.setStyle({
        strokeColor: '#143723', // Set stroke color
        strokeWeight: 1, // Set stroke weight to make it less thick
        fillColor: '#143723', // Set fill color
        fillOpacity: 0.5 // Set fill opacity
      });
    });
}

// Add passive event listeners to improve performance
window.addEventListener('touchstart', onTouchStart, { passive: true });
window.addEventListener('touchmove', onTouchMove, { passive: true });

function onTouchStart(e) {
  // Your touchstart event handler logic
}

function onTouchMove(e) {
  // Your touchmove event handler logic
}

window.onload = initMap;
