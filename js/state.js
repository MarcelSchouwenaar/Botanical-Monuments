function togglePanel(_state) {
  let body = document.body;

  let panel = document.getElementById("panel");
  let state = body.dataset.panel;
 
  if (_state) {
    body.dataset.panel = _state;
  } else {
    body.dataset.panel = (state == "up") ? "down" : "up";
  }
  panel.scrollTop = 0;
}

function setState(state) {
    
  let body = document.body;
  let panel = document.getElementById("panel");
 


  body.dataset.state = state;
  panel.scrollTop = 0;

  if (state == "list"){
    
    document
      .querySelectorAll(".marker_active")
      .forEach(marker => marker.classList.remove("marker_active"));
    
    if(prevZoom && prevCenter) map.flyTo({center: prevCenter, zoom: prevZoom});
    prevZoom = undefined;
    prevCenter = undefined;
    
    const url = new URL(window.location.href.split('?')[0]);
    window.history.pushState({}, '', url);
  
  }
      
}
