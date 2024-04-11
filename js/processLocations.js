function getHash(input){
  var hash = 0, len = input.length;
  for (var i = 0; i < len; i++) {
    hash  = ((hash << 5) - hash) + input.charCodeAt(i);
    hash |= 0; // to 32bit integer
  }
  hash = Math.abs(hash);
  return hash;
}
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function processLocations(_locations) {
  
  console.log("Number of locations",_locations.length);
  console.log("All locations",_locations);

  
  locations = {
    type: "geojson",
    data: _locations
  };
  let i = 0;
  let tagstat = {};



  let shuffledLocations = shuffle(locations.data);
  shuffledLocations.forEach(function(_location) {
    
    
    if (!_location.properties.description || _location.properties.description == "") {
      _location.properties.description   = "";
      _location.properties.tags          = _location.properties.tags;
      _location.properties.authors       = [""];
      i++
    } else {
     // _location.properties.tags        = getHashTags(_location.properties.description) || _location.properties.tags;

      _location.properties.tags        = _location.properties.tags;
      _location.properties.authors     = getAuthors(_location.properties.description, "");
        

    }
     if(!tagstat[_location.properties.tags[0]]) tagstat[_location.properties.tags[0]] = 0;
      tagstat[_location.properties.tags[0]]++;

    if (!_location.properties.gx_media_links){
      _location.properties.gx_media_links = ["https://cdn.glitch.global/4c0493cc-1166-4590-9984-15c2b192cd62/Placeholder.png?v=1712863059781"];
    } else {
      _location.properties.gx_media_links = _location.properties.gx_media_links.split(" ");
    }
   
    let locationIconAndTag             = getIconAndTag(_location.properties.tags);
    _location.properties.tags          = locationIconAndTag.tags;
    _location.properties.icon          = locationIconAndTag.icon;

    
    //produce hash
    const id = getHash([ _location.geometry.coordinates[0], _location.geometry.coordinates[1] ].join(", "));
    _location.properties.id = id;
    _location.properties.i = i;

   
    
    //clean up
    _location.properties.description = removeHashTags(_location.properties.description);
    _location.properties.description = removeAuthors(_location.properties.description);
    _location.properties.description = removeImages(_location.properties.description);
    _location.properties.description = trimSpaces(_location.properties.description);


  });
 
  console.log("Number of locations",_locations.length,"no-tag:",i);
  console.log("tag stat",tagstat)
  
  return;
}
