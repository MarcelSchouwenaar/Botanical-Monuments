class Marker{
  
  marker;
  icon;
  location;
  
  constructor(id, location, icon, callback){
    
    this.callback = callback;
    this.id = id;
    
    this.marker = document.createElement("div");
    this.marker.id = this.id;
    this.marker.className = "marker";
  
    this.location = location;
    
    this.icon = icon;

    this.marker.innerHTML = this.icon;

    new mapboxgl.Marker(this.marker)
      .setLngLat(location.geometry.coordinates)
      .addTo(map);
    
    const self = this;
    this.marker.addEventListener("click", (e) => self.callback(e));
  }
  getCenter(){
    return this.location.geometry.coordinates;
  }
  show(){
    this.marker.style.display = "block";
  }
  hide(){
    this.marker.style.display = "none";
  }
  activate(){
    this.marker.classList.add("marker_active");
  }
  deactivate(){
    this.marker.classList.remove("marker_active");
  }
  
  
  
}