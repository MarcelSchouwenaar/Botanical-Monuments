import { toGeoJSON } from "./togeojson.js";
import * as settings     from "../settings.js";

export function getHashTags(inputText) {
  let regex = /\#([a-zA-Z_\d]+)/gm;

  let matches = [];
  let match;

  while ((match = regex.exec(inputText))) {
    const strLowerCase = match[1].toLowerCase();
    matches.push(strLowerCase);
  }

  return matches;
}

export function getAuthors(inputText, defaultAuthor) {
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
export function trimSpaces(inputText) {
  return inputText.replace(/^(\s*<br( \/)?>)*|(<br( \/)?>\s*)*$/gm, "");
}

export function getImages(inputText) {
  let regex = /<img[^>]*>/g;
  let matches = [];
  let match;

  while ((match = regex.exec(inputText))) {
    matches.push(match[1]);
  }

  return matches;
}

export function removeHashTags(inputText) {
  let regex = new RegExp("#([^\\s]*)", "g");
  return inputText.replace(regex, "");
}

export function removeAuthors(inputText) {
  let regex = new RegExp("@([^\\s]*)", "g");
  return inputText.replace(regex, "");
}
export function removeImages(inputText) {
  let regex = /<img[^>]*>/g;
  inputText = inputText.replace(regex, "");

  let regex2 = /src=[^>]*>/g;
  inputText = inputText.replace(regex2, "");

  return inputText;
}
export function getID(input) {
  var hash = 0,
    len = input.length;
  for (var i = 0; i < len; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0; // to 32bit integer
  }
  hash = Math.abs(hash);
  return hash;
}
export function cleanText(inputText) {
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

export function BackgroundLazyLoader() {
  let selector = "[data-background-image-url]";
  let loadedClassName = "loaded";

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

  return true;
}

export function createGeoJSON(kml) {
  let _locations = [];
  let title = "";
  let description = "";

  const folder2tag = {
    Locations: "LocationLayer",
    Areas: "AreaLayer",
  };

  let doc = new DOMParser().parseFromString(kml, "text/xml");

  // console.log(doc,doc.getElementsByTagName("description")[0],doc.getElementsByTagName("name")[0].childNodes[0].nodeValue);

  let descriptionNode =
    doc.getElementsByTagName("description")[0].childNodes[0];
  if (descriptionNode) {
    description = descriptionNode.nodeValue;
  }

  let titleNode = doc.getElementsByTagName("name")[0].childNodes[0];
  if (titleNode) {
    title = titleNode.nodeValue;
  }

  let doc_folders = doc.getElementsByTagName("Folder");

  for (let i = 0; i < doc_folders.length; i++) {
    let tag =
      folder2tag[doc_folders[i].getElementsByTagName("name")[0].innerHTML];
    let _locs = toGeoJSON.kml(doc_folders[i], tag).features;
    _locations = _locations.concat(_locs);
  }

  return {
    locations: _locations,
    title: title,
    description: description,
  };
}
export function setDescription(_description) {
  return _description;
}
export async function fetchUserContent(_sheetId) {
  let sheetId = _sheetId;
  const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
  const sheetName = "Form responses 1";
  const query = encodeURIComponent("Select *");
  const url = `${base}&sheet=${sheetName}&tq=${query}`;

  let userContent = [];
  const userContentKeys = [
    "timestamp",
    "title_nl",
    "title_en",
    "description_nl",
    "description_en",
    "photos",
    "category",
    "locationURL",
    "approved",
  ];

  try {
    const resp = await fetch(url);
    const respText = await resp.text();
    const jsonData = JSON.parse(respText.substring(47).slice(0, -2));
    userContent = jsonData.table.rows.map((row) => {
      let userContentItem = {};
      for (let i = 0; i < userContentKeys.length; i++) {
        userContentItem[userContentKeys[i]] = row.c[i].v;
      }
      return userContentItem;
    });
    return userContent;
  } catch (err) {
    console.log(err);
  }
}
export function getCoordinatesFromURL(url) {
  const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
  const match = url.match(regex);

  if (match) {
    const latitude = match[1];
    const longitude = match[2];
    return [longitude, latitude];
  } else {
    console.log("Coordinates not found in the URL.");
    return [0, 0];
  }
}
export function createPublicGoogleImageURLs(images) {
  let imageArr = images.indexOf(", ") >= 0 ? images.split(", ") : [images];
  let gx_media_links = "";

  let publicImagesArr = imageArr.map((image) => {
    let url = new URL(image);
    let id = url.searchParams.get("id");
    return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
  });

  return publicImagesArr.join(" ");
}

export function wrapLanguageTags(text) {
    
  const regex = /\[([^\]]+)\]/g;
  let langs = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match[1].indexOf("/") < 0) langs.push(match[1]);
  }

  langs.map(function (lang) {
    text = text.replace(`[${lang}]`, `<span lang="${lang}">`);
    text = text.replace(`[/${lang}]`, `</span>`);
  });

  return text;
}
export function stripHTML(html) {
  let tmp = document.createElement("div");
  tmp.innerHTML = html;
  let stripped = tmp.textContent || tmp.innerText || "";
  return stripped;
}

export function getImage(imageURL){
  if(!window.allImages) window.allImages = [];
  window.allImages.push(imageURL);

  if(!settings.get("PROXY")) return imageURL;
  if(settings.get("PROXY").length == 0) return imageURL;
    
  const encodedSafeImageURL  = encodeURIComponent(imageURL);
  
  // console.log("invoking proxy for: ",`${settings.get("PROXY")}?url=${encodedSafeImageURL}`);

  return `${settings.get("PROXY")}?url=${encodedSafeImageURL}`;
}
