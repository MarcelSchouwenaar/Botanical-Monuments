export class PanelSettings {
  title;
  description;
  about;
  loader;
  icon;

  GMapSettingsMap = {
    title: "GMAP_TITLE",
    description: "GMAP_DESCRIPTION",
    about: "GMAP_DESCRIPTION",
  };
  settingsMap = {
    title: "TITLE",
    description: "DESCRIPTION",
    about: "ABOUT",
    loader: "ENABLE_LOADER",
  };

  constructor(frame) {
    this.parent = document.getElementById("rightbar");

    this.frame = frame.contentWindow;
    this.loadValues();

    this.render();
  }
  render() {
    this.parent.innerHTML = this.template``;
    this.addEventListeners();
  }
  addEventListeners() {
    const self = this;

    const saveBtn = this.parent.querySelector("#save");
    const cancelBtn = this.parent.querySelector("#cancel");
    const getFromGMapBtns = this.parent.querySelectorAll(".copyFromMapBtn");
    const revertBtns = this.parent.querySelectorAll(".revertBtn");

    saveBtn.addEventListener("click", (e) => {
      self.saveSettings();
    });
    cancelBtn.addEventListener("click", (e) => {
      self.cancel();
    });
    getFromGMapBtns.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        self.loadValueFromGMap(e);
      })
    );
    revertBtns.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        self.revertValueToSaved(e);
      })
    );
  }
  saveSettings() {
    try {
      const _title = this.parent.querySelector("input[name=title]").value;
      const _description = this.parent.querySelector(
        "textarea[name=description]"
      ).value;
      const _about = this.parent.querySelector("textarea[name=about]").value;
      const _loader = this.parent.querySelector("input[name=loader]").checked;

      console.log("loader value", _loader);

      this.frame.settings.set("TITLE", _title);
      this.frame.settings.set("DESCRIPTION", _description);
      this.frame.settings.set("ABOUT", _about);
      this.frame.settings.set("ENABLE_LOADER", _loader);

      this.frame.decorator.setTitleAndDescription();
      this.frame.decorator.setAboutPage();
      this.frame.decorator.setManifest();

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

  loadValues() {
    this.title = this.frame.settings.get("TITLE");
    this.description = this.frame.settings.get("DESCRIPTION");
    this.about = this.frame.settings.get("ABOUT");
    this.loader = this.frame.settings.get("ENABLE_LOADER");
  }
  loadValueFromGMap(e) {
    const parentInputGroup = e.target.closest(".input-group");
    const inputField = parentInputGroup.querySelector("input") || parentInputGroup.querySelector("textarea");
    console.log("parent",parentInputGroup,"inputfield: ", inputField);    
    const field = inputField.name;
    const GMapKey = this.GMapSettingsMap[field];

    inputField.value = this.frame.settings.get(GMapKey);
  }
  revertValueToSaved(e) {
    const parentInputGroup = e.target.closest(".input-group");
    const inputField =
      parentInputGroup.querySelector("input") ||
      parentInputGroup.querySelector("textarea");
    const field = inputField.name;
    const settingsKey = this.settingsMap[field];

    this.frame.settings.reset(settingsKey);
    inputField.value = this.frame.settings.get(settingsKey);
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
    return `
      <h2>🚀 settings</h2>
      <div class="input-group">
        <label for="title">
          Title
          <span>
            <div title="get text from Google Map" class='copyFromMapBtn'></div>
            <div title="revert to published setting" class='revertBtn'></div>
          </span>
        </label>
        <input name="title" type="text" value="${this.title}">
        
      </div>
      
      <div class="input-group">
        <label for="description">
          Description
          <span>
            <div title="get text from Google Map" class='copyFromMapBtn'></div>
            <div title="revert to published setting" class='revertBtn'></div>
          </span>
        </label>
        <textarea name="description">${this.description}</textarea>
        
      </div>
      <div class="input-group">

        <label for="about">
          About
          <span>
            <div title="get text from Google Map" class='copyFromMapBtn'></div>
            <div title="revert to published setting" class='revertBtn'></div>
          </span>
        </label>
        <textarea name="about">${this.about}</textarea>
         
      </div>
       <div class="input-group">
        <label for="loader">display load screen<input name="loader" type="checkbox" ${
          this.loader ? "checked" : ""
        }></label>
      </div>
      <div class="input-group button-group">
        <button id="cancel" class="cancelBtn">Cancel</button>
        <button id="save" class="saveBtn">Save</button>
      </div>
     `;
  }
}
