async function addMarkers(){
  let i = 0;
  locations.data.forEach(function(marker) {

    // create a HTML element for each feature
    let markerEl = document.createElement('div');
    

    markerEl.className = 'marker';
    markerEl.id = marker.properties.id;
            
    
    markerEl.innerHTML = marker.properties.icon || markerIconDefault;
    
    markerEl.dataset.tags = marker.properties.tags.join(" ");
    markerEl.dataset.authors = marker.properties.authors.join(" ");

    markerEl.addEventListener("click",() => showLocation(marker.properties.id));

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(markerEl)
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);
    i++;

  })
  console.log("markers added",i);
}