function findCommonTags(arr1, arr2) {
  return arr1.some((item) => arr2.includes(item));
}

let markerIconDefault = "🌿";

let markerIcons = {
  garden: "🌿",
  favorite: "❣️",
  cemetery: "🪦",
};

let getRandomGardenIcon = function () {
  const gardenIcons = [
    "🌿",
    "🌴",
    "☘️",
    "🍀",
    "🪴",
    "🌵",
    "🎄",
    "🌲",
    "🌳",
    "🌱",
    "💐",
    "🌾",
    "🪷",
    "🍁",
    "🌹",
    "🌷",
    "🪨",
  ];
  return gardenIcons[Math.floor(Math.random() * gardenIcons.length)];
};

let newMarkerIcons = {
  // public
  uitkijktoren: {
    icon: "🗼",
    parent: "public",
  },
  uitkijkpunt: {
    icon: "⛰",
    parent: "public",
  },
  uitkijk: {
    icon: "🗼",
    parent: "public",
  },
  panorama: {
    icon: "⛰",
    parent: "public",
  },
  panorama: {
    icon: "⛰",
    parent: "public",
  },
  uitzichtpunt: {
    icon: "⛰",
    parent: "public",
  },
  // garden
  "land-art": {
    icon: "🗿",
    parent: "garden",
  },
  landart: {
    icon: "🗿",
    parent: "garden",
  },
  "abstracte-kunst": {
    icon: "📐",
    parent: "garden",
  },
  vos: {
    icon: "🦊",
    parent: "garden",
  },
  abstract: {
    icon: "📐",
    parent: "garden",
  },
  monument: {
    icon: "🗽",
    parent: "garden",
  },
  geschiedenis: {
    icon: "👴🏻",
    parent: "garden",
  },
  schilderij: {
    icon: "🖼️",
    parent: "garden",
  },
  kormeling: {
    icon: "🏠",
    parent: "garden",
  },
  walking: {
    icon: "🚶‍♀️",
    parent: "garden",
  },
  standing: {
    icon: "🧍🏼",
    parent: "garden",
  },
  walvis: {
    icon: "🐋",
    parent: "garden",
  },
  ballen: {
    icon: "🎱",
    parent: "garden",
  },

  // tuin
  park: {
    icon: "🌳",
    parent: "tuin",
  },
  begraafplaats: {
    icon: "🎚️",
    parent: "tuin",
  },
  speeltuin: {
    icon: "🍄",
    parent: "tuin",
  },
  pad: {
    icon: "🌲",
    parent: "tuin",
  },

  // pad
  bos: {
    icon: "🌲",
    //parent: "pad"
    parent: "tuin",
  },
  strand: {
    icon: "🏖",
    //parent: "pad"
    parent: "tuin",
  },
  fietspad: {
    icon: "🚲",
    //parent: "pad"
    parent: "tuin",
  },
  aligator: {
    icon: "🐊",
    //parent: "pad"
    parent: "tuin",
  },

  // gebouw
  kasteel: {
    icon: "🏰",
    parent: "gebouw",
  },
  kerk: {
    icon: "⛪",
    parent: "gebouw",
  },
  tempel: {
    icon: "🏛️",
    parent: "gebouw",
  },
  folly: {
    icon: "🎪",
    parent: "gebouw",
  },
  water: {
    icon: "⛲",
    parent: "gebouw",
  },
  fontein: {
    icon: "⛲",
    parent: "gebouw",
  },
  brug: {
    icon: "🧲",
    parent: "gebouw",
  },
  architectuur: {
    icon: "🏢",
    parent: "gebouw",
  },
  constructie: {
    icon: "🏗️",
    parent: "gebouw",
  },
  schwebebahn: {
    icon: "🚟",
    parent: "gebouw",
  },
  eurobrug: {
    icon: "💶",
    parent: "gebouw",
  },
  klokkentoren: {
    icon: "🔔",
    parent: "gebouw",
  },
};

function getIconAndTag(tags) {
  let newTags = tags;
  let markerIcon = markerIconDefault;

  // let _defaultTopLevelTags = ["garden", "public", "tuin", "gebouw", "pad"];

  let _defaultTopLevelTags = ["garden", "favorite", "cemetery"];

  if (!findCommonTags(tags, _defaultTopLevelTags)) {
    let missingTag = "garden";
    tags.reverse().forEach((tag) => {
      if (newMarkerIcons[tag] !== undefined) return newMarkerIcons[tag].parent;
    });
    newTags.push(missingTag);
  }

  tags.reverse().forEach((tag) => {
    if (markerIcons[tag]) markerIcon = markerIcons[tag];
    if (tag == "garden") markerIcon = getRandomGardenIcon();
  });

  tags.reverse().forEach((tag) => {
    if (newMarkerIcons[tag]) {
      if (tag == "garden") {
        console.log("garden icon!");
        markerIcon = getRandomGardenIcon();
      } else {
        markerIcon = newMarkerIcons[tag].icon;
      }
    }
  });

  return {
    tags: newTags,
    icon: markerIcon,
  };
}
