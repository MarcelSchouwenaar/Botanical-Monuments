class Filter {
  
  parent;
  tagList;
  firstClick;
  currentFilter;

  constructor(parent) {
    this.parent = parent;
    this.addFilterTags();
    this.setFilter();  
    this.firstClick = true;
    
  }
  getFilterTag(tag, i) {
    let el = document.createElement("label");
    el.className = "tagLbl";
    el.innerHTML = `<input type="checkbox" name="${tag}" value="${tag}" checked><span class="tag noselect ${ (i == 0) ? "tag-mobile" : "tag-desktop"}">${tag}</span>`;
    return el;
  }
  addFilterTags() {
    const self = this;
    TAGS.map((tagList) => {
      tagList.map((tag, i) => {
        let el = self.getFilterTag(tag, i);
        el.querySelector("input").addEventListener("change",e => self.changed(e))
        self.parent.appendChild(el);
      });
    });
    let resetEl = document.createElement("div")
    resetEl.innerHTML = "reset";
    resetEl.classList.add("tag","tagReset");
    resetEl.addEventListener("click",e => self.resetFilter(e));
    self.parent.appendChild(resetEl);
  }
  changed(e){
    
    if(this.firstClick){
      let allTags = this.parent.querySelectorAll("input");
      allTags.forEach(tag => tag.checked = false);
      e.target.checked = true;
      this.firstClick = false;
    }
    
    this.setFilter();
    
    
  }
  setFilter(){
    let selectedTags = this.parent.querySelectorAll("input:checked");
    let _currentFilter = [];

    selectedTags.forEach(tagEl => {
      _currentFilter.push(tagEl.value);
    });
    
    this.currentFilter = _currentFilter;
   
    console.log("\n\n\n\ SET FILTER ",this.currentFilter);
    document.body.dispatchEvent(filterUpdate);
    
  }

  resetFilter(){
    let allTags = this.parent.querySelectorAll("input");
    allTags.forEach(tag => tag.checked = true);
    
    this.setFilter();
  }

}


