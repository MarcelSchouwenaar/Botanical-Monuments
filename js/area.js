import {PatternMaker} from "./patterns.js";
import * as settings from "../settings.js";


export class Area {
  name;
  id;
  location;
  map;
  stateMachine;
  tags;

  constructor(name, id, map, location, tags, stateMachine) {
    this.name = name;
    this.id = id;
    this.map = map;
    this.location = location;
    this.stateMachine = stateMachine;
    this.tags = tags
    this.addArea();
  }
  async addArea() {
    const self = this;
    const pattern = await PatternMaker(this.tags);

    let img = new Image();
    img.src = pattern;
    // gallery.appendChild(img);

    this.map.addSource(this.name + "-"+ this.id, {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: this.location.geometry,
      },
    });
    this.map.loadImage(pattern, (err, image) => {
      if (err) throw err;
      this.map.addImage("pattern_" + this.id, image);
    });
    
    this.map.addLayer({
      id: "fill_" + this.id,
      type: "fill",
      source: this.name + "-"+ this.id,
      layout: {},
      paint: {
        "fill-pattern": "pattern_" + this.id,
        // "fill-color": settings.MAP_AREA_FILL,
        // "fill-opacity": settings.MAP_AREA_OPACITY,
      },
    });
     this.map.addLayer({
      id: "line_" + this.id,
      type: "line",
      source:  this.name + "-"+ this.id,
      layout: {},
      paint: {
        "line-color": settings.get("MAP_AREA_HOVER_OUTLINE"),
        "line-width": 3,
        "line-opacity" : 0
      },
    });

    this.map.on("click", "fill_" + this.id, (e) => this.setLocation(e));
    this.map.on('mousemove', "fill_" + this.id, (e) => self.onMouseMove(e));
    this.map.on('mouseleave', "fill_" + this.id, (e) => self.onMouseLeave(e));
  }
  
  getCenter() {
    let listX = this.location.geometry.coordinates[0].map((p) => p[0]);
    let centerX = (Math.max(...listX) + Math.min(...listX)) / 2;
    let listY = this.location.geometry.coordinates[0].map((p) => p[1]);
    let centerY = (Math.max(...listY) + Math.min(...listY)) / 2;
    return [centerX, centerY];
  }

  show() {
    // this.map.setLayoutProperty("fill_" + this.id, "visibility", "visible");
  }

  hide() {
    // this.map.setLayoutProperty("fill_" + this.id, "visibility", "none");
  }
  activate(){
    // console.log("activate area");
  }
  deactivate(){
    // console.log("deactivate area");
  }
  onMouseMove(){
    this.map.setPaintProperty("line_" + this.id,"line-opacity",1);
    this.map.setPaintProperty("fill_" + this.id,"fill-opacity",settings.get("MAP_AREA_HOVER_OPACITY"));
    
  }
  onMouseLeave(){
    this.map.setPaintProperty("line_" + this.id,"line-opacity",0);
    this.map.setPaintProperty("fill_" + this.id,"fill-opacity",1);
  }
  setLocation(e){
    let actualId = this.id;

    if (e.hasOwnProperty("originalEvent")) {
      //this is to catch an exception from Mapbox
      const el = e.originalEvent.target;
      if(el.classList.contains("marker")) actualId = el.id;
    }
    
    console.log("clicked area", e, actualId);

   
    this.stateMachine.navigateTo(settings.get("STATES").INFO, actualId);
  }
  
}
