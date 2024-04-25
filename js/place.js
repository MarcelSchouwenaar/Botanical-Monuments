import * as settings    from "../settings.js";
import * as utils       from "./utils.js";

import { Area }         from "./area.js";
import { Marker }       from "./marker.js";
import { Line }         from "./line.js";
import { GalleryItem }  from "./galleryItem.js";

export class Place {
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
  filterController;
  stateMachine;

  constructor(
    location,
    map,
    gallery,
    infopanel,
    filterController,
    stateMachine
  ) {
    this.location = location;
    this.map = map;
    this.gallery = document.getElementById(gallery);
    this.infopanel = document.getElementById(infopanel);
    this.filterController = filterController;
    this.stateMachine = stateMachine;

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
      settings.DEFAULT_AUTHOR
    );
  }
  #getTags() {
    let allTags = utils.getHashTags(this.location.properties.description);
    let relevantTags = [];

    let mostSpecificTagIndex = 0;

    allTags.map((tag) => {
      settings.TAGS.map((tagList) => {
        let tagIndex = tagList.indexOf(tag);
        if (tagIndex >= 0) {
          relevantTags.push(tag);
          if (tagIndex > mostSpecificTagIndex) {
            mostSpecificTagIndex = tagIndex;
            relevantTags.unshift(tag);
          }
          if (relevantTags.indexOf(tagList[0]) < 0)
            relevantTags.push(tagList[0]);
        }
      });
    });
    if (relevantTags.length == 0) relevantTags.push(settings.DEFAULT_TAG);

    return relevantTags;
  }
  #getImages() {
    if (!this.location.properties.gx_media_links)
      return [settings.PLACEHOLDER_IMAGE];
    if (this.location.properties.gx_media_links.length < 1)
      return [settings.PLACEHOLDER_IMAGE];

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
    return settings.ICONS[this.tags[0]] || settings.DEFAULT_ICON;
  }
  #createID() {
    return utils.getID(this.name + this.description);
  }
  addEventListeners() {
    let self = this;
    document.body.addEventListener("filterUpdate", (e) => self.verifyFilter());
    document.body.addEventListener("navigationUpdate", (e) =>
      self.verifyState()
    );
  }
  verifyState() {
    console.log("verifying state...");
    if (this.stateMachine.activeId == this.id) {
      console.log("that's me!!", this.id);
      this.showLocation();
      this.galleryItem.createPage();
      this.place.activate();
      return;
    }
    this.place.deactivate();
  }
  verifyFilter() {
    let match = false;
    match = this.checkTagFilter() && this.checkBoundariesFilter();

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
        this.map,
        this.location,
        this.tags,
        this.setLocation,
        this.stateMachine
      );
    } else if (this.location.geometry.type == "Point") {
      this.place = this.marker = new Marker(
        this.id,
        this.map,
        this.location,
        this.icon,
        this.setLocation,
        this.stateMachine
      );
    } else if (this.location.geometry.type == "LineString") {
      this.place = new Line(
        this.name,
        this.id,
        this.map,
        this.location,
        this.setLocation,
        this.stateMachine
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
      this.center,
      this.stateMachine
    );
  }

  checkTagFilter() {
    let match = false;

    const self = this;

    this.filterController.currentFilter.map((tag) => {
      if (match) return;
      match = self.tags.indexOf(tag) >= 0;
    });

    return match;
  }

  checkBoundariesFilter() {
    //see if the location is within boundaries.
    let bounds = this.map.getBounds();
    let isInBounds = bounds.contains(this.center);
    return isInBounds;
  }

  setLocation(e) {
    console.log("CLICK: stateMachine", this.stateMachine, e, this.id);

    let actualId = this.id;
    let center = this.center;

    if (e.hasOwnProperty("originalEvent")) {
      //this is to catch an exception from Mapbox
      console.log("clicked area:", e, e.originalEvent.target);
      const el = e.originalEvent.target;
      if (el.classList.contains("marker")) actualId = el.id;
    }

    this.stateMachine.navigateTo(settings.STATES.INFO, actualId);
  }
  showLocation() {
    this.map.flyTo({
      center: this.center,
      zoom: settings.MAPBOX_DETAIL_ZOOM,
    });
  }
}
