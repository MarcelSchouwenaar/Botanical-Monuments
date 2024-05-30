export class PanelMapStyle{
  
  mapStyleMap = {
    mapUrl: "MAPBOX_STYLE",
    pk: "MAPBOX_API_KEY"
  }

  mapStyles = [
    {
      title: "Follywood by Koehorst in 't Veld",
      mapUrl: "mapbox://styles/toonkoehorst/cklxkpcso4yo017s51mnhhn9j",
      pk: "pk.eyJ1IjoidG9vbmtvZWhvcnN0IiwiYSI6ImNqb2ZyYjhiZDAweWIzcXM2aWlhMmJxcGYifQ.OGRL7kejFrWD-MEazU8lTg",
      thumbnail: "https://cdn.glitch.global/4c0493cc-1166-4590-9984-15c2b192cd62/follywood.png?v=1717014987588"
    },
//     {
//       title: "Unicorn by Taya Lavrinenko",
//       mapUrl: "mapbox://styles/marcelsch/clwrz5lr000lv01pog30x8ka9",
//       pk: "pk.eyJ1IjoidG9vbmtvZWhvcnN0IiwiYSI6ImNqb2ZyYjhiZDAweWIzcXM2aWlhMmJxcGYifQ.OGRL7kejFrWD-MEazU8lTg",
//       thumbnail: "https://cdn.glitch.global/4c0493cc-1166-4590-9984-15c2b192cd62/unicorn.png?v=1717015058276"
//     },
//     {
//       title: "Bubble by Mapbox",
//       mapUrl: "mapbox://styles/marcelsch/clwsa48bz011m01qxf8nu0kba",
//       pk: "pk.eyJ1IjoidG9vbmtvZWhvcnN0IiwiYSI6ImNqb2ZyYjhiZDAweWIzcXM2aWlhMmJxcGYifQ.OGRL7kejFrWD-MEazU8lTg",
//       thumbnail: "https://cdn.glitch.global/4c0493cc-1166-4590-9984-15c2b192cd62/bubble.png?v=1717014804931"
//     },
//     {
  
//       title: "Blueprint by Amy Lee Walton",
//       mapUrl: "mapbox://styles/marcelsch/clwsa7n9t015w01pn4r967dmf",
//       pk: "pk.eyJ1IjoidG9vbmtvZWhvcnN0IiwiYSI6ImNqb2ZyYjhiZDAweWIzcXM2aWlhMmJxcGYifQ.OGRL7kejFrWD-MEazU8lTg",
//       thumbnail: "https://cdn.glitch.global/4c0493cc-1166-4590-9984-15c2b192cd62/blueprint.png?v=1717014807268"
//     },
//     {
//       title: "Pencil by Madison Draper",
//       mapUrl: "mapbox://styles/marcelsch/clwsa8gex015x01pn8fvr7ago",
//       pk: "pk.eyJ1IjoidG9vbmtvZWhvcnN0IiwiYSI6ImNqb2ZyYjhiZDAweWIzcXM2aWlhMmJxcGYifQ.OGRL7kejFrWD-MEazU8lTg",
//       thumbnail: "https://cdn.glitch.global/4c0493cc-1166-4590-9984-15c2b192cd62/pencil.png"
//     },
    
    {
      title: "Mapbox Streets",
      mapUrl: "mapbox://styles/mapbox/streets-v12",
      pk: "",
      thumbnail: "https://cdn.glitch.global/4c0493cc-1166-4590-9984-15c2b192cd62/streets.png?v=1717014821083"
    },
    {
      title: "Mapbox Outdoor",
      mapUrl: "mapbox://styles/mapbox/outdoors-v12",
      pk: "",
      thumbnail: "https://cdn.glitch.global/4c0493cc-1166-4590-9984-15c2b192cd62/outdoors.png?v=1717014818610"
    },
    
    {
      title: "Mapbox Light",
      mapUrl: "mapbox://styles/mapbox/light-v11",
      pk: "",
      thumbnail: "https://cdn.glitch.global/4c0493cc-1166-4590-9984-15c2b192cd62/light.png?v=1717014816329"
    },
    {
      title: "Mapbox Dark",
      mapUrl: "mapbox://styles/mapbox/dark-v11",
      pk: "",
      thumbnail: "https://cdn.glitch.global/4c0493cc-1166-4590-9984-15c2b192cd62/dark.png?v=1717014814012"
    },
    {
      title: "Mapbox Satellite",
      mapUrl: "mapbox://styles/mapbox/satellite-v9",
      pk: "",
      thumbnail: "https://cdn.glitch.global/4c0493cc-1166-4590-9984-15c2b192cd62/satellite.png?v=1717014811349"
    },
    // {
    //   title: "Mapbox Satellite Streets",
    //   mapUrl: "mapbox://styles/mapbox/satellite-streets-v12",
    //   pk: "",
    //   thumbnail: "https://cdn.glitch.global/4c0493cc-1166-4590-9984-15c2b192cd62/satellitestreets.png?v=1717014808988"
    // }   
    
    
  ]
  
  constructor(frame){
    this.parent = document.getElementById("rightbar");
    this.frame = frame.contentWindow;
    this.loadValues();


    this.render();
  }
  
  loadValues(){
    this.mapStyle = this.frame.settings.get("MAPBOX_STYLE");
    this.pk = this.frame.settings.get("MAPBOX_API_KEY");
  }
  addEventListeners(){
    const self = this;
    
    const revertBtns = this.parent.querySelectorAll(".revertBtn");
    const saveBtn = this.parent.querySelector("#save");
    const cancelBtn = this.parent.querySelector("#cancel");

    revertBtns.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        self.revertValueToSaved(e);
      })
    );
   
    saveBtn.addEventListener("click", (e) => {
      self.saveSettings();
    });
    cancelBtn.addEventListener("click", (e) => {
      self.cancel();
    });
    
  }
  render(){
    this.parent.innerHTML = this.template``;
    this.addEventListeners();
  }

  revertValueToSaved(e) {
    const parentInputGroup = e.target.closest(".input-group");
    const inputField = parentInputGroup.querySelector("input") || parentInputGroup.querySelector("textarea");
    const field = inputField.name;
    const settingsKey = this.settingsMap[field];

    this.frame.settings.reset(settingsKey);
    inputField.value = this.frame.settings.get(settingsKey);
  }
  
  saveSettings() {
    try {

      const _mapUrl = this.parent.querySelector("input[name=mapUrl]:checked").value;
      const _pk = this.parent.querySelector("input[name=mapUrl]:checked").dataset.pk;
            
      this.frame.settings.set("MAPBOX_STYLE", _mapUrl);
      this.frame.settings.set("MAPBOX_API_KEY",_pk);

      this.frame.map.setAccessToken();
      this.frame.map.setStyle();
   
      this.showNotification();
    } catch (err) {
      console.log(err);
      this.showNotification(err);
    }
  }
  cancel() {
    this.parent.innerHTML = "";
    delete this;
  }
  showNotification(err) {
    let el = document.createElement("div");
    let msg = err ? "Something went wrong..." : "Succesfully saved";

    el.className = "notification";
    if (err) el.classList.add("notification-error");

    el.innerHTML = msg;

    this.parent.appendChild(el);

    setTimeout((_) => {
      el.remove();
    }, 2000);
  }
  
  
  template() {

    const mapStylesArr = this.mapStyles.map(mapStyle => {
      const checked = (mapStyle.mapUrl == this.mapStyle) ? "checked" : "";                               
      return `
      <label class="mapStyleLabel">
        <input type="radio" name="mapUrl" value="${mapStyle.mapUrl}" data-pk="${mapStyle.pk}" ${checked}>
        <div title="${mapStyle.title}" style="background-image:url(${mapStyle.thumbnail});" class="mapStyleIcon"></div>
      </label>`});
    const mapStylesStr = mapStylesArr.join("");
    
    return `
      <h2>🏞️ Map Style</h2>
      <div class="mapStyleLabelList">${mapStylesStr}</div>
           
      <div class="input-group button-group">
        <button id="cancel" class="cancelBtn">Cancel</button>
        <button id="save" class="saveBtn">Save</button>
      </div>
     `;
  }
}