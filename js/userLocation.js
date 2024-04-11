let userLocationMarker = null;
let watchId = null;

function showUserLocationMarker(lngLat) {
  
  let _userLocationMarkerEl = document.createElement("div");

  _userLocationMarkerEl.id = "userLocationMarker";
  _userLocationMarkerEl.innerHTML = "🔵";

  // make a marker for each feature and add to the map
  userLocationMarker = new mapboxgl.Marker(_userLocationMarkerEl)
    .setLngLat(lngLat)
    .addTo(map);
  
   map.flyTo({
      center: lngLat,
      zoom: 7
    });

}
function removeUserLocationMarker(){
  if(!userLocationMarker) return;
  userLocationMarker.remove();
  userLocationMarker = null;
}

function moveUserLocationMarker(lngLat){
  if(!userLocationMarker) return;
  userLocationMarker.setLngLat(lngLat);
}

function showUserLocation() {
  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
    removeUserLocationMarker();
    watchId = null;
    showUserLocationEl.innerHTML = "Locatie tonen gestopt";
    setTimeout(_ => {showUserLocationEl.innerHTML = "Laat mijn locatie zien"}, 1000);
    return;
  }
  if (navigator.geolocation) {
    showUserLocationEl.innerHTML = "Locatie wordt getoond";
    setTimeout(_ => {showUserLocationEl.innerHTML = "Stop met locatie tonen"}, 1000);

    watchId = navigator.geolocation.watchPosition(
      showPosition,
      showPositionError
    );
  } else {
    showUserLocationEl.innerHTML = "Je locatie kan niet bepaald worden";
  }
}

function showPosition(position) {
    
  let lngLat = new mapboxgl.LngLat(position.coords.longitude, position.coords.latitude);

  
  console.log(lngLat);
  
  if(!userLocationMarker) showUserLocationMarker(lngLat);
  
  moveUserLocationMarker(lngLat);



}

function showPositionError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}
