
function parallaxInit(){
  var ratio = pbr.parallax.ratio

  function setupParallax(img, container){
    var bounds


    function getScroll(){
      return window.pageYOffset
    }

    function getBounds(){
      var bb = container.getBoundingClientRect()
      var scrollTop = getScroll()
      bounds = [scrollTop + bb.top, scrollTop + bb.bottom]
    }
    getBounds()
 
    function transform(dist){
      return "translate3d(0," + dist + "px,0)"
    }
  
    function parallax(){
      var position = getScroll() 
    
      if(position < bounds[1] && position > bounds[0] - viewportHeight){
        img.style.transform = transform((position + (viewportHeight / 2) - ((bounds[0] + bounds[1]) / 2)) * ratio)
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

    window.addEventListener('scroll', parallax)
    window.addEventListener('bodyChange', getBounds)
    window.addEventListener('bodyChange', parallax)
    resizeListener(getBounds)
    resizeListener(parallax)
  }
  
  for(var i = 0; i < pbr.parallax.bulks.length; i++){
    var bulk = pbr.parallax.bulks[i]
    setupParallax(bulk.image.get(), bulk.container.get())
  }
}

parallaxInit()
