class Place {
  id;
  description;
  map;
  images = [];
  tags = [];
  authors = [];
  marker;
  center;
  location;
  gallery;
  galleryItem;
  infopanel;

  constructor(location, map, gallery, infopanel) {
        
    this.location = location;
    this.map = map;
    this.gallery = gallery;
    this.infopanel = infopanel;

    this.tags = this.#getTags();
    this.images = this.#getImages();
    this.autors = this.#getAuthors();
    this.description = this.#getDescription();

    this.name = this.location.properties.name;
    this.icon = this.#getIcon();
    this.id = this.#createID();
    
    this.center = this.#getCenter();
    console.log(this.center);
    
    this.addEventListeners();
    this.addGalleryItem();
  }

  #getAuthors() {
    return utils.getAuthors(
      this.location.properties.description,
      DEFAULT_AUTHOR
    );
  }
  #getTags() {
    return utils.getHashTags(this.location.properties.description);
  }
  #getImages() { 
    if(!this.location.properties.gx_media_links) return [PLACEHOLDER_IMAGE];
    if(this.location.properties.gx_media_links.length < 1) return [PLACEHOLDER_IMAGE];
   
    let _images = this.location.properties.gx_media_links;
    if(_images.indexOf(" ") > 0){
      return this.location.properties.gx_media_links.split(" ");
    } else {
      return [this.location.properties.gx_media_links];
    }
  }
  #getDescription() {
    return utils.cleanText(this.location.properties.description);
  }
  #getIcon() {
    /*
      Need to figure this out!
    */
    
    let firstTag = this.tags[0] || undefined;
    if (!firstTag) return DEFAULT_ICON;
    return DEFAULT_ICON;
  }
  #getCenter(){
    if(this.location.geometry.type == "Point"){
      return this.location.geometry.coordinates;
    } else if(this.location.geometry.type == "Polygon") {
      let listX = this.location.geometry.coordinates[0].map(p => p[0]);
      let centerX = (Math.max(...listX) + Math.min(...listX))/2;
      let listY = this.location.geometry.coordinates[0].map(p => p[1]);
      let centerY = (Math.max(...listY) + Math.min(...listY))/2;
      return [centerX, centerY];
    } else if(this.location.geometry.type == "LineString") {
      let listX = this.location.geometry.coordinates.map(p => p[0]);
      let centerX = (Math.max(...listX) + Math.min(...listX))/2;
      let listY = this.location.geometry.coordinates.map(p => p[1]);
      let centerY = (Math.max(...listY) + Math.min(...listY))/2;
      return [centerX, centerY];
    } else {
      console.log("Could not find center for ",location.name, " of type ", this.location.geometry.type);
    }
      
  }
  #createID() {
    return utils.getID(this.name + this.description);
  }
  addEventListeners() {
    map.on("load", () => this.addPlace());
    document.body.addEventListener("stateUpdate",e => console.log(e));
  }
  addPlace() {
    if (this.location.geometry.type == "Polygon") {
      this.addArea();
    } else if(this.location.geometry.type == "Point") {
      this.addMarker();
    } else if(this.location.geometry.type == "LineString") {
      this.addLine();
    } else {
      console.log("Could not add feature for ",location.name, " of type ", this.location.geometry.type);
    }
  }
  addMarker() {
    this.marker = document.createElement("div");
    this.marker.className = "marker";

    this.marker.id = this.id;
    this.marker.innerHTML = this.icon;

    new mapboxgl.Marker(this.marker)
      .setLngLat(this.location.geometry.coordinates)
      .addTo(map);

    this.marker.addEventListener("click", () => this.showLocation());
  }
  addArea() {
    map.addSource(this.name, {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: this.location.geometry,
      },
    });

    map.addLayer({
      id: "fill_" + this.id,
      type: "fill",
      source: this.name,
      layout: {},
      paint: {
        "fill-color": MAP_AREA_FILL, 
        "fill-opacity": MAP_AREA_OPACITY,
      },
    });

    map.addLayer({
      id: "outline_" + this.id,
      type: "line",
      source: this.name,
      layout: {},
      paint: {
        "line-color": MAP_AREA_OUTLINE,
        "line-width": 1,
      },
    });
    const self = this;
    map.on('click', "fill_" + this.id, e => {
        self.showLocation()
    })

  }
  addLine() {
    map.addSource(this.name, {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: this.location.geometry,
      },
    });

    map.addLayer({
      id: "line_" + this.id,
      type: "line",
      source: this.name,
      layout: {},
      paint: {
        "line-color": MAP_AREA_OUTLINE,
        "line-width": 3,
      },
    });
    const self = this;
    map.on('click', "line_" + this.id, e => {
      self.showLocation()
    })
  }
  addGalleryItem(){
    this.galleryItem = new GalleryItem(this.gallery, this.infopanel, this.id, this.name, this.description, this.images, this.authors, this.tags);
  }

  checkTagFilter() {}

  checkBoundariesFilter() {}
  
  showLocation() {
      let newZoom = (this.map.getZoom() >= MAPBOX_DETAIL_ZOOM) ? this.map.getZoom() : MAPBOX_DETAIL_ZOOM; 

      this.map.flyTo({
        center: this.center,
        zoom: MAPBOX_DETAIL_ZOOM
      });

  }
  
}
