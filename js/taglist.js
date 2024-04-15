let firstClick = true;

async function createTagList() {
  //first we get all Tags
  
  const filterEl = document.getElementById("filter");
  // let defaultTopLevelTags = ["garden", "public", "tuin", "gebouw","pad","❤️"];
  
  /*
    COMMUNITY ORGANIZING 
    HISTORICAL RELEVANCE 
    EDUCATION 
    BIODIVERSITY KEEPERS 
    FOOD REGENERATION
  */

  let defaultTopLevelTags = ["location", "community", "historical", "education","biodiversity","food"];


  defaultTopLevelTags.forEach(tag => {
    
    let tagEl = document.createElement("input");
    let tagLbl = document.createElement("label");
    let tagSpan = document.createElement("span");

    tagEl.type = "checkbox";
    tagEl.name = tag;
    tagEl.value = tag;
    tagEl.innerHTML = tag;
    tagEl.checked = true;

    tagLbl.for = tag;
    tagLbl.className = "tagLbl";

    tagSpan.className = "tag";
    
    let markerIcon = markerIcons[tag] || markerIconDefault;
    
    tagSpan.innerHTML = tag;
    
    tagEl.addEventListener("click", e => {
        
      if(firstClick){
        filterEl.querySelectorAll("input[type=checkbox]").forEach(tag => tag.checked = false);
        tagEl.checked = true;
        firstClick = false;
      }
      
      filterMarkers()
    });

    tagLbl.appendChild(tagEl);
    tagLbl.appendChild(tagSpan);

    filterEl.appendChild(tagLbl);
  });
  
  return locations;
}

