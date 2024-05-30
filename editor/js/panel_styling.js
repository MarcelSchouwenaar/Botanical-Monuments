const fonts = [
    {
     title: "system",
     css:   "-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif"
    },
    {
     title: "sans serif",
     css: `"Helvetica neue", helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif`
    },
    {
     title: "modernist",
     css: `"avenir next", avenir, sans-serif"`
    },
    {
     title: "serif",
     css: `"Times New Roman", Times, serif`
    },
    {
     title: "monospace",
     css: `"Lucida Console", "Courier New", monospace`
    }
  ];


export class PanelStyling{
  
  font;
  colorBg;
  colorFront;
  colorHighlight;
  
  settingsMap = {
    font: "FONT_FAMILY",
    colorBg:     "COLOR_BG",
    colorFront: "COLOR_FRONT",
    colorHighlight: "COLOR_HIGHLIGHT"
  };
    
  constructor(frame){
    this.parent = document.getElementById("rightbar");
    this.frame = frame.contentWindow;
    this.loadValues();

    this.render();
  }
  
  loadValues(){
    this.font = this.frame.settings.get("FONT_FAMILY");
    this.colorBg = this.frame.settings.get("COLOR_BG");
    this.colorFront = this.frame.settings.get("COLOR_FRONT");
    this.colorHighlight = this.frame.settings.get("COLOR_HIGHLIGHT");

  }
  addEventListeners(){
    const self = this;
    
    const colorPickers = this.parent.querySelectorAll(".colorPicker");
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
    this.selectCurrentFont();
    this.addEventListeners();
  }
  selectCurrentFont(){
    const currentFontFamily = this.frame.settings.get("FONT_FAMILY");
    const currentFont = fonts.find(font => font.css == currentFontFamily).title || fonts[0].title;

    const fontPicker = this.parent.querySelector("select[name=font]");
    fontPicker.value = currentFont;
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

      const _fontTitle = this.parent.querySelector("select[name=font]").value;
      const _colorBg = this.parent.querySelector("input[name=colorBg]").value;
      const _colorFront = this.parent.querySelector("input[name=colorFront]").value;
      const _colorHighlight = this.parent.querySelector("input[name=colorHighlight]").value;
      
      const _font = fonts.find(font => font.title == _fontTitle).css || fonts[0].css;
      
      this.frame.settings.set("FONT_FAMILY", _font);
      this.frame.settings.set("COLOR_BG", _colorBg);
      this.frame.settings.set("COLOR_FRONT", _colorFront);
      this.frame.settings.set("COLOR_HIGHLIGHT", _colorHighlight);
      
      this.frame.decorator.setColors();
      this.frame.decorator.setThemeColors();
      this.frame.decorator.setFonts();
   
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

    const fontOptionsArr = fonts.map(font => `<option value="${font.title}">${font.title}</option>`);
    const fontOptionsStr = fontOptionsArr.join("");
    
    return `
      <h2>🎨 styling</h2>
      <div class="input-group">
        <label for="font">
          Font 
        </label>
        <select name="font">
          ${fontOptionsStr}
        </select>
        
      </div>
      
      <div class="input-group">
        <label for="colorBg">
          Background Color
           <span>
            <div title="revert to published setting" class='revertBtn'></div>
          </span>
        </label>
        <input type="color" name="colorBg" class="colorPicker" value="${this.colorBg}" >
        
      </div>
      <div class="input-group">
        <label for="colorFront">
          Font Color
          <span>
            <div title="revert to published setting" class='revertBtn'></div>
          </span>
        </label>
        <input type="color" name="colorFront" class="colorPicker" value="${this.colorFront}" >
        
      </div>
      <div class="input-group">
        <label for="colorHighlight">
          Color Highlight
          <span>
            <div title="revert to published setting" class='revertBtn'></div>
          </span>
        </label>
        <input type="color" name="colorHighlight" class="colorPicker" value="${this.colorHighlight}">
      </div>
     
      <div class="input-group button-group">
        <button id="cancel" class="cancelBtn">Cancel</button>
        <button id="save" class="saveBtn">Save</button>
      </div>
     `;
  }
  
}