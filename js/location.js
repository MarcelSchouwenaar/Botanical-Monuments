function createImagesCarousel(){
  
  const infowindow = document.getElementById("info");
  let images = infowindow.querySelectorAll("img");
  
  if(images.length <= 1) return;
  
  infowindow.dataset.imagecarousel = "true";
  infowindow.dataset.image = 0;

  
  function nextImage(){
    let currentImage = parseInt(infowindow.dataset.image);
    let nextImage = ((currentImage + 1) <  images.length) ? currentImage+1 : 0;
    infowindow.dataset.image = nextImage;
  }
  
  images.forEach(image => image.addEventListener("click", nextImage));

}


function showLocation(id,event){

      let newZoom = (map.getZoom() >= 11) ? map.getZoom() : 11; 
      prevZoom = map.getZoom();
      prevCenter = map.getCenter();
      
      if(event !== "pageLoad" || event !== "reRender"){
        const url = new URL(window.location);
        url.searchParams.set('id', id);
        window.history.pushState({}, '', url);
      }
      
      let location = locations.data.find(location => location.properties.id == id);
      
      if(!location) return;
  
      console.log(location.properties, [ location.geometry.coordinates[0], location.geometry.coordinates[1] ]);
  
      map.flyTo({
        center: [ location.geometry.coordinates[0], location.geometry.coordinates[1] ],
        zoom: newZoom
      });

      document.querySelectorAll('.marker_active').forEach(el => el.classList.remove('marker_active'))

      const infowindow = document.getElementById("info");

      infowindow.innerHTML = `
        <div class="header" id="header">
          <h1>${ location.properties.name } </h1>
          ${ (location.properties.gx_media_links.length > 1) ?
            location.properties.gx_media_links.map((img,i) => `<img title='${ location.properties.name }' alt='${ location.properties.name }' src='${img}''/><span>${i+1}/${location.properties.gx_media_links.length}</span>`).join(" ") :
            `<img title='${ location.properties.name }' alt='${ location.properties.name }' src='${location.properties.gx_media_links[0]}' />`
           }
          
        </div>
        <p class="description">
          ${ location.properties.description }
        </p>
        <p class='tags'>
          ${location.properties.tags.map(tag => `<span class=''>${tag}</span>`).join(", ")}
        </p>
        <p>
          <a target="_blank" href="https://www.google.com/maps/search/?api=1&query=${location.geometry.coordinates[1]},${location.geometry.coordinates[0]}" class="button">details op Google Maps</a>
        </p>
      `;
      
      infowindow.dataset.imagecarousel = "false";
      infowindow.dataset.image = 0;


      createImagesCarousel();
      
      
      setState("info");

      document.getElementById(id).classList.add("marker_active");

    }