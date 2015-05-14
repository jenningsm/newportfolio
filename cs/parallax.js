
function parallaxInit(){
  var ratio = pbr.parallax.ratio

  function setupParallax(img, container){
    var bounds

    function getBounds(){
      var bb = container.getBoundingClientRect()
      var scrollTop = document.body.scrollTop
      bounds = [scrollTop + bb.top, scrollTop + bb.bottom]
    }
    getBounds()
 
    function transform(dist){
      return "translate3d(0," + dist + "px,0)"
    }
  
    function parallax(){
      var position = document.body.scrollTop
    
      if(position < bounds[1] && position > bounds[0] - viewportHeight){
        console.log(bounds, position)
        img.style.transform = transform((position + (viewportHeight / 2) - ((bounds[0] + bounds[1]) / 2)) * ratio)
      }
    }
  
    window.addEventListener('scroll', parallax)
    window.addEventListener('bodyChange', getBounds)
    window.addEventListener('bodyChange', parallax)
    window.addEventListener('resize', getBounds)
    window.addEventListener('resize', parallax)
  }
  
  for(var i = 0; i < pbr.parallax.bulks.length; i++){
    var bulk = pbr.parallax.bulks[i]
    setupParallax(bulk.image.get(), bulk.container.get())
  }
}

parallaxInit()
