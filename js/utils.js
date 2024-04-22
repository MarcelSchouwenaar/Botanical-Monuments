
function getHashTags(inputText) {
  let regex = /\#([a-zA-Z_\d]+)/gm;

  let matches = [];
  let match;

  while ((match = regex.exec(inputText))) {
    const strLowerCase = match[1].toLowerCase();
    matches.push(strLowerCase);
  }

  return matches;
}

function getAuthors(inputText, defaultAuthor) {
  let regex = /(?:^|\s)(?:@)([a-zA-Z\d]+)/gm;
  let matches = [];
  let match;

  while ((match = regex.exec(inputText))) {
    const strLowerCase = match[1].charAt(0).toUpperCase() + match[1].slice(1);
    matches.push(strLowerCase);
  }

  if (matches.length == 0) return [defaultAuthor];

  return matches;
}
function trimSpaces(inputText) {
  return inputText.replace(/^(\s*<br( \/)?>)*|(<br( \/)?>\s*)*$/gm, "");
}

function getImages(inputText) {
  let regex = /<img[^>]*>/g;
  let matches = [];
  let match;

  while ((match = regex.exec(inputText))) {
    matches.push(match[1]);
  }

  return matches;
}

function removeHashTags(inputText) {
  let regex = new RegExp("#([^\\s]*)", "g");
  return inputText.replace(regex, "");
}

function removeAuthors(inputText) {
  let regex = new RegExp("@([^\\s]*)", "g");
  return inputText.replace(regex, "");
}
function removeImages(inputText) {
  let regex = /<img[^>]*>/g;
  inputText = inputText.replace(regex, "");

  let regex2 = /src=[^>]*>/g;
  inputText = inputText.replace(regex2, "");

  return inputText;
}
function getID(input) {
  var hash = 0,
    len = input.length;
  for (var i = 0; i < len; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0; // to 32bit integer
  }
  hash = Math.abs(hash);
  return hash;
}
function cleanText(inputText) {
  let txt = removeHashTags(inputText);
  txt = removeImages(txt);
  txt = removeAuthors(txt);
  txt = trimSpaces(txt);
  return txt;
}

function BackgroundNode({ node, loadedClassName }) {
  let src = node.getAttribute("data-background-image-url");
  let show = (onComplete) => {
    requestAnimationFrame(() => {
      node.style.backgroundImage = `url(${src})`;
      node.classList.add(loadedClassName);
      onComplete();
    });
  };

  return {
    node,

    // onComplete is called after the image is done loading.
    load: (onComplete) => {
      let img = new Image();
      img.onload = show(onComplete);
      img.src = src;
    },
  };
}

let defaultOptions = {
  selector: "[data-background-image-url]",
  loadedClassName: "loaded",
};

function BackgroundLazyLoader({ selector, loadedClassName } = defaultOptions) {
  let nodes = [].slice
    .apply(document.querySelectorAll(selector))
    .map((node) => new BackgroundNode({ node, loadedClassName }));

  let callback = (entries, observer) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) {
        return;
      }

      let obj = nodes.find((it) => it.node.isSameNode(target));

      if (obj) {
        obj.load(() => {
          // Unobserve the node:
          observer.unobserve(target);
          // Remove this node from our list:
          nodes = nodes.filter((n) => !n.node.isSameNode(target));

          // If there are no remaining unloaded nodes,
          // disconnect the observer since we don't need it anymore.
          if (!nodes.length) {
            observer.disconnect();
          }
        });
      }
    });
  };

  let observer = new IntersectionObserver(callback);
  nodes.forEach((node) => observer.observe(node.node));
}

async function createGeoJSON(kml) {
  const folder2tag = {
    Locations: "LocationLayer",
    Areas: "AreaLayer",
  };

  let doc = new DOMParser().parseFromString(kml, "text/xml");
  // utils.setDescription(doc.getElementsByTagName("description")[0]);
  let doc_folders = doc.getElementsByTagName("Folder");
  let _locations = [];
  for (i = 0; i < doc_folders.length; i++) {
    let tag =
      folder2tag[doc_folders[i].getElementsByTagName("name")[0].innerHTML];
    let _locs = toGeoJSON.kml(doc_folders[i], tag).features;
    _locations = _locations.concat(_locs);
    console.log(tag, " total: ", _locs.length);
  }

  return _locations;
}
function setDescription(_description){
  
//   const cdataRegex = /<!\[CDATA\[(.*?)\]\]>/;
//   const tmpBody = cdataRegex.exec(_description.innerHTML);
  
//   let tmpEl = document.createElement("pre");
//   tmpEl.innerHTML = tmpBody[1];
  
//   console.log(html);

//   document.getElementById("about").innerHTML = html;
}


let utils = {
  getHashTags: getHashTags,
  getAuthors: getAuthors,
  trimSpaces: trimSpaces,
  getImages: getImages,
  removeHashTags: removeHashTags,
  removeAuthors: removeAuthors,
  removeImages: removeImages,
  getID: getID,
  cleanText: cleanText,
  BackgroundLazyLoader: BackgroundLazyLoader,
  createGeoJSON: createGeoJSON,
  setDescription: setDescription
};
