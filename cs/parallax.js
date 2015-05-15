
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
  
  for(var i = 0; i < pbr.parallax.bulks.length; i++){
    var bulk = pbr.parallax.bulks[i]
    var img = bulk.data.image.get()
    setupParallax(img, bulk.get(), bulk.data.offset)
  }
}

parallaxInit()
