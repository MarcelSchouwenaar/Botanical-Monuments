import * as settings     from "../settings.js";
import { initializeManifest } from "./manifest.js";

export class Decorator{
  stateMachine;
  toggle;     
  close;    
  menuToggle;

  constructor(stateMachine){
    
    this.stateMachine = stateMachine;
    
    this.toggle           = document.getElementById("toggle");
    this.close            = document.getElementById("close");
    this.menuToggle = document.getElementById("menu-toggle");
    
    this.#setColors();
    this.#setThemeColors();
    this.#setFonts();
    this.#setTitle();
    initializeManifest();
    
    this.#addEventListeners();

  }

  #addEventListeners(){
    this.toggle.addEventListener("click", (e) => {this.stateMachine.togglePanel()});
    this.close.addEventListener("click", (e) => { this.stateMachine.navigateTo(settings.STATES.LIST); });
    this.menuToggle.addEventListener("click", (e) => { 
      this.stateMachine.navigateTo(settings.STATES.MENU);
      togglePanel("up");
     });
  }
  #setColors(){
    document.documentElement.style.setProperty("--color", settings.COLOR_FRONT);
    document.documentElement.style.setProperty("--bg-color", settings.COLOR_BG);
    document.documentElement.style.setProperty("--highlight-color", settings.COLOR_HIGHLIGHT);
    document.querySelectorAll("path").forEach((el) => { el.setAttribute("style", "fill:" + settings.COLOR_FRONT) });
  }
  #setThemeColors(){
    document.querySelector('meta[name="msapplication-TileColor"]').setAttribute("content", settings.COLOR_BG);
    document.querySelector('meta[name="theme-color"]').setAttribute("content", settings.COLOR_BG);
  }
  #setFonts(){
    document.documentElement.style.setProperty("--default-font-family",settings.FONT_FAMILY);
    if(settings.FONT_WEBFONT){
      let styleEl = document.createElement("style");
      styleEl.type = "text/css";
      styleEl.appendChild(document.createTextNode(settings.FONT_WEBFONT));
      let head = document.head;
      head.appendChild(styleEl)
    }
  }
  #setTitle(){
    document.getElementById("title").innerHTML = settings.TITLE;
  }

}
