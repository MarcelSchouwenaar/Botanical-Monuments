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
  
  const addEventListeners = e => {
       
    propSettingsBtn.addEventListener("click",  e => { new PanelSettings(mapFrame) });
    propDataBtn.addEventListener("click",      e => { new PanelData(mapFrame) });
    propMapStyleBtn.addEventListener("click",  e => { new PanelMapStyle(mapFrame) });
    propStylingBtn.addEventListener("click",   e => { new PanelStyling(mapFrame) });
    propTagsBtn.addEventListener("click",      e => { new PanelTags(mapFrame) });

  }
    
  mapFrame.addEventListener("load", addEventListeners);
 
  

});

