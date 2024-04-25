import { initializeManifest } from "./js/manifest.js";

mapboxgl.accessToken = MAPBOX_API_KEY;

const navigationUpdate = new Event("navigationUpdate");
const filterUpdate = new Event("filterUpdate");

let map = null;
let stateMachine = null;

let body = document.body;
let gallery = document.getElementById("list");
let infopanel = document.getElementById("info");
let filterEl = document.getElementById("filter");
let filterController = new Filter(filterEl);

/*************************************
Follywood Magic!
**************************************/
fetch(GMAP_URL)
//get the Google Maps KML
.then((response) => response.text())
//convert KML into JSON
.then(utils.createGeoJSON)
//initiate map
.then(drawMap)
//kick off the statemachine
.then(initStateMachine)
//convert every location in a place
.then(createPlaces)
//load all images
.then(utils.BackgroundLazyLoader)
//activate the filters
// .then()
//add the manifest
.then(initializeManifest())
.catch(showError);


async function drawMap(locations) {
  map = new mapboxgl.Map({
    container: "map",
    style: MAPBOX_STYLE,
    center: MAPBOX_CENTER,
    zoom: MAPBOX_DEFAULT_ZOOM,
  });

  map.setMaxPitch(0);
  map.setMinPitch(0);

  await new Promise((resolve, reject) => {
    map.on("load", () => {
      resolve(); // Resolve the Promise with the map object when it's loaded
    });
  });

  return locations;
}

async function createPlaces(locations) {
  locations.forEach((location) => {
    let place = new Place(location, map, gallery, infopanel, filterController, stateMachine);
  });
}

async function initStateMachine(locations){
  stateMachine = new StateMachine(map)
  await stateMachine.init();
  return locations;
}

function showError(e) {
  console.log(e);
}
/*************************************
End Follywood Magic
**************************************/

// let prevZoom = undefined;
// let prevCenter = undefined;

let panel = document.getElementById("panel");
let toggle = document.getElementById("toggle");
let close = document.getElementById("close");

let menuToggle = document.getElementById("menu-toggle");

toggle.addEventListener("click", togglePanel);

close.addEventListener("click", (e) => {
  stateMachine.navigateTo(STATES.LIST);
});

menuToggle.addEventListener("click", (e) => {
  stateMachine.navigateTo(STATES.MENU);
  togglePanel("up");
});

document.documentElement.style.setProperty("--color", COLOR_FRONT);
document.documentElement.style.setProperty("--bg-color", COLOR_BG);
document.documentElement.style.setProperty("--highlight-color", COLOR_HIGHLIGHT);
document.documentElement.style.setProperty("--default-font-family",FONT_FAMILY);

if(FONT_WEBFONT){

  let styleEl = document.createElement("style");
  styleEl.type = "text/css";
  styleEl.appendChild(document.createTextNode(FONT_WEBFONT));

  let head = document.head;
  head.appendChild(styleEl)
}

document
  .querySelector('meta[name="msapplication-TileColor"]')
  .setAttribute("content", COLOR_BG);
document
  .querySelector('meta[name="theme-color"]')
  .setAttribute("content", COLOR_BG);
document.querySelectorAll("path").forEach((el) => {
  el.setAttribute("style", "fill:" + COLOR_FRONT);
});

document.getElementById("title").innerHTML = TITLE;