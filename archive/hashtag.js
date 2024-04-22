function getHashTags(inputText) {
  let regex = /\#([a-zA-Z\d]+)/gm;

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
 
  if(matches.length == 0) return [defaultAuthor];

  return matches;
}
function trimSpaces(inputText){
  return inputText.replace(/^(\s*<br( \/)?>)*|(<br( \/)?>\s*)*$/gm,"");
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
function getHash(input){
  var hash = 0, len = input.length;
  for (var i = 0; i < len; i++) {
    hash  = ((hash << 5) - hash) + input.charCodeAt(i);
    hash |= 0; // to 32bit integer
  }
  hash = Math.abs(hash);
  return hash;
}
const getID = getHash;
function cleanText(inputText){
  let txt = removeHashTags(inputText);
      txt = removeImages(txt);
      txt = removeAuthors(txt);
      txt = trimSpaces(txt);
  return txt;
}
