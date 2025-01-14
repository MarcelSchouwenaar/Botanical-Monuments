let undoLog = [];

import { PanelData }        from "../editor/js/panel_data.js";
import { PanelMapStyle }    from "../editor/js/panel_mapstyle.js";
import { PanelSettings }    from "../editor/js/panel_settings.js";
import { PanelStyling }     from "../editor/js/panel_styling.js";
import { PanelTags }        from "../editor/js/panel_tags.js";


document.addEventListener("DOMContentLoaded", (event) => {
  
  const mapFrame = document.getElementById("mapFrame");

  const propSettingsBtn = document.getElementById("propSettings");
  const propDataBtn = document.getElementById("propData");
  const propMapStyleBtn = document.getElementById("propMapStyle");
  const propStylingBtn = document.getElementById("propStyling");
  const propTagsBtn = document.getElementById("propTags");
  
  const toggleMobileBtn = document.getElementById("toggleMobile");
  const refreshFrameBtn = document.getElementById("refreshFrame");
  
  const toggleActiveProp = e => {
    const allProps = document.querySelectorAll(".property");
          allProps.forEach(prop => prop.classList.remove("activeProp"));
    const activeProp = e.target.closest(".property");
          activeProp.classList.add("activeProp");
  }
  
  const toggleMobile = e => {
    const isMobile = mapFrame.classList.toggle("mapFrameMobile");
    e.target.innerHTML = isMobile ? "desktop" : "mobile";
  }
  const refreshFrame = e =>{
    const loc = mapFrame.getAttribute("src");
    mapFrame.src = loc;
  }
  
  const addEventListeners = e => {
  
    toggleMobileBtn.addEventListener("click", toggleMobile);
    refreshFrameBtn.addEventListener("click", refreshFrame);
       
    propSettingsBtn.addEventListener("click",  e => { toggleActiveProp(e); new PanelSettings(mapFrame); });
    propDataBtn.addEventListener("click",      e => { toggleActiveProp(e); new PanelData(mapFrame) });
    propMapStyleBtn.addEventListener("click",  e => { toggleActiveProp(e); new PanelMapStyle(mapFrame) });
    propStylingBtn.addEventListener("click",   e => { toggleActiveProp(e); new PanelStyling(mapFrame) });
    propTagsBtn.addEventListener("click",      e => { toggleActiveProp(e); new PanelTags(mapFrame) });

  }
    
  mapFrame.addEventListener("load", addEventListeners);
 
  

});

