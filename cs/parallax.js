
function parallaxInit(){
  var ratio = pbr.parallax.ratio

  function setupParallax(img, container, offset){
    var bounds

    function getScroll(){
      return window.pageYOffset
    }

    function getBounds(){
      var bb = container.getBoundingClientRect()
      var scrollTop = getScroll()
      bounds = [scrollTop + bb.top, scrollTop + bb.bottom]
    }
 
    function transform(dist){
      return "translate3d(0," + dist + "px,0)"
    }
  
    function parallax(){
      var position = getScroll() 
    
      var lookAhead = 70
      if(position - lookAhead < bounds[1] && position + lookAhead > bounds[0] - viewportHeight){
        img.style.transform = transform((bounds[1] - bounds[0]) * offset + (position + (viewportHeight / 2) - ((bounds[0] + bounds[1]) / 2)) * ratio)
      }
    }
  
    function resizeListener(func){
      var after
      function onResize(){
        window.clearTimeout(after)
        after = window.setTimeout(func, 100)
        func()
      }
      window.addEventListener('resize', onResize)
    }

    function boundsAndParallax(){
      getBounds()
      parallax()
    }

    window.addEventListener('scroll', parallax)
    window.addEventListener('bodyChange', boundsAndParallax)
    resizeListener(boundsAndParallax)

    getBounds()
    window.onload = getBounds
  }
  
  for(var i = 0; i < pbr.parallax.bulks.length; i++){
    var bulk = pbr.parallax.bulks[i]
    setupParallax(bulk.data.image.get(), bulk.get(), bulk.data.offset)
  }
}

parallaxInit()
