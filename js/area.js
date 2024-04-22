class Area {
  name;
  id;
  location;
  callback;

  constructor(name, id, location, tags, callback) {
    this.name = name;
    this.id = id;
    this.location = location;
    this.callback = callback;
    this.tags = tags
    this.addArea();
  }
  async addArea() {
    const self = this;
    const pattern = await PatternMaker(this.tags);

    let img = new Image();
    img.src = pattern;
    // gallery.appendChild(img);

    map.addSource(this.name, {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: this.location.geometry,
      },
    });
    map.loadImage(pattern, (err, image) => {
      if (err) throw err;
      map.addImage("pattern_" + this.id, image);
    });
    map.addLayer({
      id: "fill_" + this.id,
      type: "fill",
      source: this.name,
      layout: {},
      paint: {
        "fill-pattern": "pattern_" + this.id,
        // "fill-color": MAP_AREA_FILL,
        // "fill-opacity": MAP_AREA_OPACITY,
      },
    });

    map.on("click", "fill_" + this.id, (e) => self.callback(e));
  }
  getCenter() {
    let listX = this.location.geometry.coordinates[0].map((p) => p[0]);
    let centerX = (Math.max(...listX) + Math.min(...listX)) / 2;
    let listY = this.location.geometry.coordinates[0].map((p) => p[1]);
    let centerY = (Math.max(...listY) + Math.min(...listY)) / 2;
    return [centerX, centerY];
  }

  show() {
    // map.setLayoutProperty("fill_" + this.id, "visibility", "visible");
  }

  hide() {
    // map.setLayoutProperty("fill_" + this.id, "visibility", "none");
  }
  activate(){
    // console.log("activate area");
  }
  deactivate(){
    // console.log("deactivate area");
  }
}
