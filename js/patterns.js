import * as settings from "../settings.js";

const loadImage = path => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous' // to avoid CORS if used with Canvas
    img.src = path
    img.onload = () => {
      resolve(img)
    }
    img.onerror = e => {
      reject(e)
    }
  })
}

export const PatternMaker = async function(tags){
  
  let images = tags.map(tag => settings.PATTERNS[tag]);
  if(images.length == 0) images = [settings.PATTERNS[0]];
  
  const canvas = document.createElement("canvas");
  const cw = canvas.width = settings.PATTERN_WIDTH;
  const ch = canvas.height = settings.PATTERN_HEIGHT;
  
  const ctx = canvas.getContext('2d');
  
  let height, width;

  for (let i = 0; i < images.length; i++) { 
    let img = await loadImage(images[i]);
    ctx.drawImage(img,0,0, cw, ch)
  }

  return canvas.toDataURL();
  
}

