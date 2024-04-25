//META
const TITLE = "Botanical Monuments";
const DESCRIPTION = `Botanical Monuments — IABR 2024 - Nature of Hope`;
const MANIFEST_URL = 'https://' + location.host + location.pathname;

const CDN_PATH = "https://cdn.glitch.global/4c0493cc-1166-4590-9984-15c2b192cd62/"

const MANIFEST_ICONS = {
  icons512:  CDN_PATH+"Icon512.png?v=1713774498984",
  icons256:  CDN_PATH+"Icon256.png?v=1713774498984",
  icons192:  CDN_PATH+"Icon192.png?v=1713774498984",
  icons180:  CDN_PATH+"Icon180.png?v=1713774498984",
  icons32:   CDN_PATH+"Icon32.png?v=1713774498984",
  icons16:   CDN_PATH+"Icon16.png?v=1713774498984"
}

const GMAP_ID = "1iaBUt-YoQnTFQPocSNxlpKPP-9_RSVk"; //BOTANICAL MONUMENTS
// const GMAP_ID = "1r0SA7m0Eq5PWfQKur9Xd8MoaGCSjCzA"; //STUDENTEN JOOST
const GMAP_URL = "https://www.google.com/maps/d/kml?forcekml=1&mid=" + GMAP_ID;

//MAPBOX
const MAPBOX_STYLE    = "mapbox://styles/toonkoehorst/cklxkpcso4yo017s51mnhhn9j",
  MAPBOX_API_KEY      =   "pk.eyJ1IjoidG9vbmtvZWhvcnN0IiwiYSI6ImNqb2ZyYjhiZDAweWIzcXM2aWlhMmJxcGYifQ.OGRL7kejFrWD-MEazU8lTg",
  MAPBOX_CENTER       = [4.472671, 51.91934],
  MAPBOX_DEFAULT_ZOOM = 12,
  MAPBOX_DETAIL_ZOOM  = 16;
 
//DEFAULT SETTINGS 
 
const COLOR_BG        = "#a6a6a6",
  COLOR_FRONT         = "#e4e0e0",
  COLOR_HIGHLIGHT     = "#0000ff";

const FONT_FAMILY     = "IABR, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif",
      FONT_WEBFONT    = `
                        @font-face {
                            font-family: IABR;
                            src: url("${CDN_PATH}IABR-Regular.woff") format("woff");
                            font-style: normal;
                            font-weight:400
                        }`;
      
// STYLE
const MAP_AREA_FILL = "#00CC11",
  MAP_AREA_OUTLINE = COLOR_HIGHLIGHT,
  MAP_AREA_HOVER_OPACITY = 0.25,
  MAP_AREA_HOVER_OUTLINE = COLOR_HIGHLIGHT;


const PLACEHOLDER_IMAGE =
  CDN_PATH+"Placeholder.png?v=1712863059781";

const DEFAULT_AUTHOR = "",
  AUTHORS = [];

// TAGS

const DEFAULT_TAG = "location",
  DEFAULT_ICON = "📍";

const TAGS = [
  ["location"],
  ["community", "community_a", "community_b", "community_c"],
  ["history", "history_a", "history_b", "history_c"],
  ["education", "education_a", "education_b", "education_c"],
  ["biodiversity", "biodiversity_a", "biodiversity_b", "biodiversity_c"],
  ["food", "food_a", "food_b", "food_c"],
  ["regeneration", "regeneration_a", "regeneration_b", "regeneration_c"],
];

const ICONS = {
  location: "📍",
  
  community: "👪",
  community_a: "🏋️‍♀️",
  community_b: "👸",
  community_c: "🧜‍♂️",
  
  history: "🏰",
  history_a: "🏯",
  history_b: "🛖",
  history_c: "🗿",
  
  education: "📝",
  education_a: "✒️",
  education_b: "✏️",
  education_c: "🖍️",
  
  biodiversity: "🌲",
  biodiversity_a: "🎍",
  biodiversity_b: "🎋",
  biodiversity_c: "☘️",
 
  food: "🍇",
  food_a: "🫛",
  food_b: "🥦",
  food_c: "🥬",
 
  regeneration: "🌱",
  regeneration_a: "🍃",
  regeneration_b: "🍂",
  regeneration_c: "🍁",
};

let p1 = CDN_PATH+"p1.png";
let p2 = CDN_PATH+"p2.png";
let p3 = CDN_PATH+"p3.png";
let p4 = CDN_PATH+"p4.png";
let p5 = CDN_PATH+"p5.png";
let p6 = CDN_PATH+"p6.png";
let p7 = CDN_PATH+"p7.png";

const PATTERN_WIDTH = 24,
      PATTERN_HEIGHT = 24;

const PATTERNS = {
  location: p1,
  
  community:   p1,
  community_a: p1,
  community_b: p1,
  community_c: p1,
  
  history:   p2,
  history_a: p2,
  history_b: p2,
  history_c: p2,
  
  education:   p3,
  education_a: p3,
  education_b: p3,
  education_c: p3,
  
  biodiversity:   p4,
  biodiversity_a: p4,
  biodiversity_b: p4,
  biodiversity_c: p4,
 
  food:   p5,
  food_a: p5,
  food_b: p5,
  food_c: p5,
 
  regeneration:   p6,
  regeneration_a: p6,
  regeneration_b: p6,
  regeneration_c: p6,
};

