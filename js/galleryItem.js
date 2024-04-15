class GalleryItem{
  
  thumbnail;
  id;
  name;
  description;
  authors;
  images;
  tags;
  
  constructor(gallery, infopanel, id, name, description, images, authors, tags){
    
    this.gallery      = gallery;
    this.infopanel    = infopanel;
    
    this.id           = id;
    this.name         = name;
    this.description  = description;
    this.authors      = authors;
    this.images       = images;
    this.tags         = tags;
    
    this.createThumbnail();
        
  }
  #addEventListeners(){
    document.body.addEventListener("stateUpdate",e => console.log(e));
  }
  
  createThumbnail(){
     
      this.thumbnail = document.createElement('div');
      this.thumbnail.classList.add(...this.tags);
      this.thumbnail.innerHTML = `
              <div class="listItem" id="listItem_${this.id}">
                <div title='${ this.name }'  class="listItemImg" data-background-image-url="${ this.images[0] }"></div>
                <h3>${this.name}</h3>
              </div>
            `;
     
      this.thumbnail.addEventListener("click", e => this.createPage());
      this.gallery.appendChild(this.thumbnail);
      this.#addEventListeners();
  }

  
  createPage(){
    stateMachine.setState(STATES.INFO);
    this.infopanel.innerHTML = `
        <div class="header" id="header">
          <h1>${ this.name } </h1>
        
        ${ ( this.images.length > 1) ?
            this.images.map((img,i) => `<img title='${ this.name }' alt='${ this.name }' src='${img}''/><span>${i+1}/${this.images.length}</span>`).join(" ") :
            `<img title='${ this.name }' alt='${ this.name }' src='${this.images[0]}' />`
        }
        </div>
        <p class="description">
          ${ this.description }
        </p>
        <p class='tags'>
          ${this.tags.map(tag => `<span class=''>${tag}</span>`).join(", ")}
        </p> 
       
      `;
      this.infopanel.dataset.imagecarousel = "false";
      this.infopanel.dataset.image = 0;
      
      let _images = this.infopanel.querySelectorAll("img");
      if(_images.length <= 1) return;
    
      this.infopanel.dataset.imagecarousel = "true";
    
      let self = this;
      function nextImage() {
        let currentImage = parseInt(self.infopanel.dataset.image);
        let nextImage = currentImage + 1 < _images.length ? currentImage + 1 : 0;
        self.infopanel.dataset.image = nextImage;
      }

      _images.forEach((image) => image.addEventListener("click", nextImage));

  }
}
