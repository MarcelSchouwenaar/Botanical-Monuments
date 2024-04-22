class Line {
  name;
  id;
  location;
  callback;

  constructor(name, id, location, callback) {
    this.name = name;
    this.id = id;
    this.location = location;
    this.callback = callback;

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
    map.on("click", "fill_" + this.id, (e) => self.callback(e));
  }

  getCenter() {
    let listX = this.location.geometry.coordinates.map((p) => p[0]);
    let centerX = (Math.max(...listX) + Math.min(...listX)) / 2;
    let listY = this.location.geometry.coordinates.map((p) => p[1]);
    let centerY = (Math.max(...listY) + Math.min(...listY)) / 2;
    return [centerX, centerY];
  }

  show() {
    map.setLayoutProperty("line_" + this.id, "visibility", "visible");
  }
  hide() {
    map.setLayoutProperty("line_" + this.id, "visibility", "none");
  }
  activate(){
    // console.log("activate line");
  }
  deactivate(){
    // console.log("deactivate line");
  }
}
