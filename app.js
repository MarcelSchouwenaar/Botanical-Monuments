import * as settings     from "./settings.js";
import * as utils        from "./js/utils.js";

import { Map }           from "./js/map.js";
import { Filter }        from "./js/filter.js";
import { StateMachine }  from "./js/stateMachine.js";
import { Place }         from "./js/place.js";
import { toGeoJSON }     from "./js/togeojson.js";
import { Decorator }     from "./js/decorator.js";

/*************************************
Follywood Magic!
**************************************/

const init = async function(){
  try{
    
    //load map
    const mapObj          = new Map();
    const map             = await mapObj.init();
    
    //setup UI
    let stateMachine      = new StateMachine(map);    
    let filterController  = new Filter("filter");
    let decorator         = new Decorator(stateMachine);
    
    //load data
    const mapData         = await fetch(settings.GMAP_URL);

    //process data
    const mapDataText     = await mapData.text();
    const locations       = utils.createGeoJSON(mapDataText);
    
    locations.forEach((location) => {
       new Place(location, map, "list", "info", filterController, stateMachine);
    });
    
    //load images    
    utils.BackgroundLazyLoader();
    

  } catch (err) {
    console.error(err);
  }

}();


/*************************************
End Follywood Magic
**************************************/
