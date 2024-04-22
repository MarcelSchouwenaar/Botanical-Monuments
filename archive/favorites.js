const FAVORITES_STORE = "favorites_store";
const STATUS_NEW = "status_new";
const STATUS_DONE = "status_done";

let favorites = {
  setObject: function(value){
     window.localStorage.setItem(FAVORITES_STORE, JSON.stringify(value));
  },
  getObject: function(){
    try{  
      let store = (window.localStorage.getItem(FAVORITES_STORE) === "undefined") ? "[]" : window.localStorage.getItem(FAVORITES_STORE);
      return JSON.parse(store);
    } 
    catch(err){ alert(err) };
  },
  locations: function(){
    // if(!this.getObject()) return [];
    let _locations = this.getObject();
    
    if(!_locations) return [];
    if(_locations.length == 0) return [];
    
    return _locations.map(loc => {
          loc.id = Math.abs(loc.id);
          return loc;
        })
        .filter(loc => {
          if(loc.hasOwnProperty("id")) return (loc.id > 1);
          return false;
        });

  },
  save: function(_locations){
    this.setObject(_locations);
  },
  check: function(id){
    let _id = Math.abs(id);
     let _locations = this.locations();
     if(_locations.find(_loc => _loc.id == _id)) return true;
    return false;
  },
  get: function(){
    return this.locations();    
  },
  add: function(event, id){
    
    let _id = Math.abs(id);
    if(!_id || isNaN(_id)) return;

    let _locations = this.locations();
    
    if(_locations.find(_loc => _loc.id == _id)) return;
    
    _locations.push({
      id: _id,
      status: STATUS_NEW
    });
    
    this.save(_locations);
    this.render();
  },
  remove: function(e, id){
    let _id = Math.abs(id);

    e.stopPropagation();
    
    let _locations = this.locations();
    
    _locations = _locations.filter(_loc => _loc.id !== _id);
  
    this.save(_locations);
    this.render();
  },
  toggleStatus: function(id){
    let _id = Math.abs(id);

    let _locations = this.locations();
    let _location = _locations.find(loc => loc.id == _id);
    _location.status = (_location.status == STATUS_NEW) ? STATUS_DONE : STATUS_NEW;
   
    this.save(_locations);
    this.render();
  },
  paintMarkers: function(){
      
    let favorite_markers = document.querySelectorAll(".marker_favorite");
    favorite_markers.forEach(m => m.classList.remove("marker_favorite"));
    
    let _locations = this.locations();
    _locations.forEach(loc => {
      let _id = Math.abs(loc.id);
      let markerEl = document.getElementById(_id);
      if(markerEl) markerEl.classList.add("marker_favorite");
    });

  },
  render: function(){
    
    let _locations = this.locations();

    const el = document.getElementById("favorites");
    
    this.paintMarkers();
    
    if(_locations.length == 0){
      return el.innerHTML = `<p>Nog geen favorieten</p>`;
    }
    el.innerHTML = `
      <ul>
        ${_locations.map(_loc => { 
            let _id = Math.abs(_loc.id);
            let loc = locations.data.features.find(loc => loc.properties.id == _id );
            if(!loc) return ``;
            return `
              <li onclick="showLocation(${ _id })">${ loc.properties.name }
                <span class="remove-favorite" onclick="favorites.remove(event, ${ _id })">⨉</span>
              </li>`
        }).join("")}
      </ul>`;
     

  }
  
}

