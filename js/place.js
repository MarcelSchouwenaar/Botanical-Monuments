class Place {
  id;
  description;
  map;
  images = [];
  tags = [];
  authors = [];
  marker;
  location;

  constructor(location, map) {
    this.location = location;
    this.map = map;

    this.tags = this.#getTags();
    this.images = this.#getImages();
    this.autors = this.#getAuthors();
    this.description = this.#getDescription();

    this.name = this.location.properties.name;
    this.icon = this.#getIcon();
    this.id = this.#createID();

    this.addEventListeners();
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
    return utils.getImages(this.location.properties.description);
  }
  #getDescription() {
    return utils.cleanText(this.location.properties.description);
  }
  #getIcon() {
    let firstTag = this.tags[0] || undefined;
    if (!firstTag) return DEFAULT_ICON;
    return DEFAULT_ICON;
  }
  #createID() {
    return utils.getID(this.name + this.description);
  }
  addEventListeners() {
    map.on("load", () => this.addPlace());
  }
  showLocation() {
    alert(this.name);
  }
  addPlace() {
    if (this.location.geometry.type == "Polygon") {
      this.addArea();
    } else {
      this.addMarker();
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
    console.log("area:", this.location);

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
      source: this.name, // reference the data source
      layout: {},
      paint: {
        "fill-color": "#0080ff", // blue color fill
        "fill-opacity": 0.5,
      },
    });

    map.addLayer({
      id: "outline_" + this.id,
      type: "line",
      source: this.name,
      layout: {},
      paint: {
        "line-color": "#0080ff",
        "line-width": 1,
      },
    });
    
    map.on('click', "fill_" + this.id, e => {
      alert(this.name);
    })

  }

  checkTagFilter() {}

  checkBoundariesFilter() {}
}
