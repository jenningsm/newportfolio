
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

  function setupParallax(img, container, offset){
    //a two element array containing the top and 
    //bottom of the image container
    var bounds

    //gets the current bounds of the image container
    function getBounds(){
      var bb = container.getBoundingClientRect()
      var scrollTop = window.pageYOffset 
      bounds = [scrollTop + bb.top, scrollTop + bb.bottom]
    }

    //checks to see if the image container is in the viewport, and
    //if so, does parallax 
    function parallax(){
      var position = window.pageYOffset 
    
      //if image is within the viewport, parallax the image
      if(position < bounds[1] && position > bounds[0] - viewportHeight){
        var shift = (bounds[1] - bounds[0]) * offset
        shift += (position + (viewportHeight / 2) - ((bounds[0] + bounds[1]) / 2)) * ratio
        img.style.transform = "translate3d(0," + shift + "px,0)";
      }
    }
 
    //gets the bounds, then does parallax 
    function boundsAndParallax(){
      getBounds()
      parallax()
    }

    window.addEventListener('scroll', parallax)
    //body change comes whenever the body height changes due
    //to a choice section switch. see choiceSections.js
    window.addEventListener('bodyChange', boundsAndParallax)
    resizeListener(boundsAndParallax)

    //initialize the bounds
    getBounds()
    window.addEventListener('load', getBounds)
  }
  
  var images = []
  var containerHeights = []

  for(var i = 0; i < pbr.parallax.bulks.length; i++){
    var bulk = pbr.parallax.bulks[i]
    var imgContainer = bulk.data.imageContainer
    images.push(imgContainer.data.get())
    containerHeights.push(bulk.data.containerHeight)
    setupParallax(imgContainer.get(), bulk.get(), bulk.data.offset)
  }

  var fixed = 'height'
  function reorientation(){
    var imageHeight = viewportHeight * pbr.parallax.height
    if(fixed === 'height'){
      if(viewportWidth > pbr.parallax.aspectRatio * imageHeight){
        fixed = 'width'
        for(var i = 0; i < images.length; i++){
          images[i].style.height = 'auto'
          images[i].style.minHeight = 'auto'
          images[i].style.width = '100%' 
        }
      }
    } else if(fixed === 'width'){
      if(viewportWidth <= pbr.parallax.aspectRatio * imageHeight){
        fixed = 'height'
        for(var i = 0; i < images.length; i++){
          var height = (100 * pbr.parallax.height / containerHeights[i]) + '%'
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
