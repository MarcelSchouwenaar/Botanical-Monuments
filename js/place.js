class Place {
  id;
  description;
  map;
  images = [];
  tags = [];
  authors = [];
  place;
  center;
  location;
  gallery;
  galleryItem;
  infopanel;

  constructor(location, map, gallery, infopanel) {
    this.location = location;
    this.map = map;
    this.gallery = gallery;
    this.infopanel = infopanel;

    this.name = this.location.properties.name;
    this.description = this.#getDescription();
    this.id = this.#createID();

    this.tags = this.#getTags();
    this.images = this.#getImages();
    this.autors = this.#getAuthors();

    this.icon = this.#getIcon();
    
    this.addPlace();

    this.addEventListeners();
    this.addGalleryItem();
  }

  #getAuthors() {
    return utils.getAuthors(
      this.location.properties.description,
      DEFAULT_AUTHOR
    );
  }
  #getTags() {
    let allTags = utils.getHashTags(this.location.properties.description);
    let relevantTags = [];

    let mostSpecificTagIndex = 0;

    allTags.map((tag) => {
      TAGS.map((tagList) => {
        let tagIndex = tagList.indexOf(tag);
        if (tagIndex >= 0) {
          relevantTags.push(tag);
          if (tagIndex > mostSpecificTagIndex) {
            mostSpecificTagIndex = tagIndex;
            relevantTags.unshift(tag);
          }
          if (relevantTags.indexOf(tagList[0]) < 0) relevantTags.push(tagList[0]);

        }
      });
    });
    if (relevantTags.length == 0) relevantTags.push(DEFAULT_TAG);

    return relevantTags;
  }
  #getImages() {
    if (!this.location.properties.gx_media_links) return [PLACEHOLDER_IMAGE];
    if (this.location.properties.gx_media_links.length < 1)
      return [PLACEHOLDER_IMAGE];

    let _images = this.location.properties.gx_media_links;
    if (_images.indexOf(" ") > 0) {
      return this.location.properties.gx_media_links.split(" ");
    } else {
      return [this.location.properties.gx_media_links];
    }
  }
  #getDescription() {
    return utils.cleanText(this.location.properties.description);
  }
  #getIcon() {
    return ICONS[this.tags[0]] || DEFAULT_ICON;
  }
  #createID() {
    return utils.getID(this.name + this.description);
  }
  addEventListeners() {
    let self = this;
    document.body.addEventListener("filterUpdate", (e) => self.verifyFilter());
    document.body.addEventListener("navigationUpdate", (e) => self.verifyState());
  }
  verifyState() {

    if (stateMachine.activeId == this.id) {
      this.showLocation();
      this.galleryItem.createPage();
      this.place.activate();
      return;
    }
    this.place.deactivate(); 
  }
  verifyFilter(){
    
    let match = false;
    match = (this.checkTagFilter() && this.checkBoundariesFilter());

    if (match) {
      this.place.show();
      this.galleryItem.show();
    } else {
      this.place.hide();
      this.galleryItem.hide();
    }
    
  }

  addPlace() {
    if (this.location.geometry.type == "Polygon") {
      this.place = new Area(
        this.name,
        this.id,
        this.location,
        this.tags,
        this.setLocation
      );
    } else if (this.location.geometry.type == "Point") {
      this.place = this.marker = new Marker(
        this.id,
        this.location,
        this.icon,
        this.setLocation
      );
    } else if (this.location.geometry.type == "LineString") {
      this.place = new Line(
        this.name,
        this.id,
        this.location,
        this.setLocation
      );
    }
    this.center = this.place.getCenter();
  }

  addGalleryItem() {
    this.galleryItem = new GalleryItem(
      this.gallery,
      this.infopanel,
      this.id,
      this.name,
      this.description,
      this.images,
      this.authors,
      this.tags,
      this.center
    );
  }

  checkTagFilter() {
    let match = false;

    const self = this;
    
    filterController.currentFilter.map((tag) => {
      if (match) return;
      match = self.tags.indexOf(tag) >= 0;
    });

    return match;
  }

  checkBoundariesFilter() {
    
    //see if the location is within boundaries.
    let bounds = map.getBounds();
    let isInBounds = bounds.contains(this.center);
    return isInBounds;
    
  }

  setLocation(e) {
    let actualId = this.id;
    let center = this.center;

    if (e.hasOwnProperty("originalEvent")) {
      //this is to catch an exception from Mapbox
      console.log('clicked area:',e, e.originalEvent.target);
      const el = e.originalEvent.target;
      if(el.classList.contains("marker")) actualId = el.id;
    }

    stateMachine.navigateTo(STATES.INFO, actualId);
  }
  showLocation() {
    this.map.flyTo({
      center: this.center,
      zoom: MAPBOX_DETAIL_ZOOM,
    });
  }
}
