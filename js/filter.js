function findCommonTags(arr1, arr2) { 
    return arr1.some(item => arr2.includes(item)) 
} 

function getCurrentFilter() {
  const filterEl = document.getElementById("filter");

  let selectedTags = filterEl.querySelectorAll("input:checked");
  let currentFilter = [];

  selectedTags.forEach(tagEl => {
    currentFilter.push(tagEl.value);
  });

  return currentFilter;
}


function filterMarkers() {
  
  const currentFilter = getCurrentFilter();
  let i = 0;
  let allMarkers = document.querySelectorAll(".marker");

  allMarkers.forEach(marker => {
    const tags = marker.dataset.tags.split(" ");
    marker.style.visibility = "hidden";
    
    if(findCommonTags(tags, currentFilter)){
      marker.style.visibility = "visible";
      i++;
    }

  });
}

function filterGallery(){
    
  var bounds = map.getBounds();
  const currentFilter = getCurrentFilter();
  console.log("filter:",currentFilter);

  let visibleLocations = locations.data.filter(function(location) {
    
    var ll;
    
    if(location.geometry.type == "Polygon"){
      ll = new mapboxgl.LngLat(location.geometry.coordinates[0][0][0], location.geometry.coordinates[0][0][1]);
    } else {
      ll = new mapboxgl.LngLat(location.geometry.coordinates[0],location.geometry.coordinates[1]);
    }
    
    let isInBounds = bounds.contains(ll);
    let isInFilter = findCommonTags(location.properties.tags, currentFilter);

    console.log("for location ",location.properties.name,": ",ll, isInBounds, isInFilter);

    
    return isInBounds && isInFilter;
  });

  const listItems = document.querySelectorAll(".listItem");
  listItems.forEach(listItem => listItem.style.display = "none");
    
  visibleLocations.forEach(location => {
    let listItem = document.getElementById("listItem_"+location.properties.id);
    if(listItem)  listItem.style.display = "inline-block";
  })
   
}
function filter(){
   
  filterMarkers();
  filterGallery();
  
  
}