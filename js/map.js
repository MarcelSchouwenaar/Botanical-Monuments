import * as settings     from "../settings.js";

export class Map{
  
  map;
  
  constructor(){
      mapboxgl.accessToken = settings.MAPBOX_API_KEY;
      this.map = new mapboxgl.Map({
        container: "map",
        style:   settings.MAPBOX_STYLE,
        center:  settings.MAPBOX_CENTER,
        zoom:    settings.MAPBOX_DEFAULT_ZOOM,
      });

      this.map.setMaxPitch(0);
      this.map.setMinPitch(0);
  }
  
  async init(){
    await new Promise((resolve, reject) => {
      this.map.on("load", () => {
        resolve();
      });
    });
    
    return this.map;
  }
  
}