
/*
  sets up the parallax
*/
function parallaxInit(){
  //the ratio of the amount the image parallaxes to the
  //amount the page scrolls
  //i.e. if ratio is .5, the img will shift 1px for every
  //two pixels the page scrolls
  var ratio = pbr.parallax.ratio

  //sets func as a listener on the resize event and
  //also calls func 100 milliseconds after the last
  //resize event has fired
  function resizeListener(func){
    var after
    function onResize(){
      window.clearTimeout(after)
      after = window.setTimeout(func, 100)
      func()
    }
    window.addEventListener('resize', onResize)
  }

  /*
     sets up parallax for a specific vista.

     the vista container is the top element of the vista. It
     contains the text for the vista and also the image
     container

     the image container is beneath the vista container and
     contains the image. The purpose of the image container is
     center the image and also to provide a handle for transforming
     it.
     
     The image is larger than the vista container to allow for
     parallax.

     the offset is the amount, as a proportion of the
     total image size, the image will be offsetted vertically
  */

  function setupParallax(imgContainer, vistaContainer, offset){
    //a two element array containing the top and 
    //bottom of the vista container
    var bounds

    //gets the current bounds of the vista container
    function getBounds(){
      var bb = vistaContainer.getBoundingClientRect()
      var scrollTop = window.pageYOffset 
      bounds = [scrollTop + bb.top, scrollTop + bb.bottom]
    }

    //checks to see if the vista container is in the viewport, and
    //if so, does parallax 
    function parallax(){
      var position = window.pageYOffset 
    
      //if vista is within the viewport, parallax the image
      if(position < bounds[1] && position > bounds[0] - viewportHeight){
        var shift = (bounds[1] - bounds[0]) * offset
        shift += (position + (viewportHeight / 2) - ((bounds[0] + bounds[1]) / 2)) * ratio
        imgContainer.style.transform = "translate3d(0," + shift + "px,0)";
      }
    }
 
    //gets the bounds, then does parallax 
    function boundsAndParallax(){
      getBounds()
      parallax()
    }

    window.addEventListener('scroll', parallax)
    //body change comes whenever the body height changes due
    //to a choice section content change. see choiceSections.js
    window.addEventListener('bodyChange', boundsAndParallax)
    resizeListener(boundsAndParallax)

    //initialize the bounds
    getBounds()
    window.addEventListener('load', getBounds)
  }
  
  var images = []
  var vistaContainerHeights = []

  for(var i = 0; i < pbr.parallax.vistas.length; i++){
    var vista = pbr.parallax.vistas[i]
    var imgContainer = vista.data.imageContainer.get()
    var img = vista.data.image.get()
    //the height, as a proportion of the viewport, of the vista container
    var vistaContainerHeight = vista.data.vistaContainerHeight

    setupParallax(imgContainer, vista.get(), vista.data.offset)

    images.push(img)
    vistaContainerHeights.push(vistaContainerHeight)
  }

  /*
    The image starts out with the height set to a fixed percentage and 
    width set to auto. This is fine most of the time, but if the viewport
    gets really wide, the image won't be wide enough to fill the container.
  
    If this happens we need to set the width to a fixed '100%' and the height
    to auto. Then, if viewport gets narrow again, we need to set the height
    back to the percentage it was before and set the width back to auto

    Since each of the images is to have the same dimensions, the operation is
    the same for each image.
  */

  //the dimension that is currently fixed
  var fixed = 'height'

  //checks whether the dimensions need to be changed, and changes
  //them for each image if so
  function reorientation(){
    //pbr.parallax.aspectRatio is the width of the image divided by the height
    //of the image
    //pbr.parallax.height gives the height of the image as a proportion of the
    //viewport height

    //the height, in pixels, of the image
    var imageHeight = viewportHeight * pbr.parallax.height
    if(fixed === 'height'){
      //if the viewport is too wide, we need to switch to fixed width
      if(viewportWidth > pbr.parallax.aspectRatio * imageHeight){
        fixed = 'width'
        for(var i = 0; i < images.length; i++){
          images[i].style.height = 'auto'
          images[i].style.minHeight = 'auto'
          images[i].style.width = '100%' 
        }
      }
    } else if(fixed === 'width'){
      //if the viewport is too narrow, we need to switch to fixed height
      if(viewportWidth <= pbr.parallax.aspectRatio * imageHeight){
        fixed = 'height'
        for(var i = 0; i < images.length; i++){
          //the height of the image, as a percentage of the height of the vista
          //container. This will be greater than 100%, since the image is larger
          //than the vista container to allow for parallax
          var height = (100 * pbr.parallax.height / vistaContainerHeights[i]) + '%'
          images[i].style.height = height
          images[i].style.minHeight = height
          images[i].style.width = 'auto'
        }
      }
    }
  }

  window.addEventListener('resize', reorientation)
  window.addEventListener('load', reorientation)
}

parallaxInit()
