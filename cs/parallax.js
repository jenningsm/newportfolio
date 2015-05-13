
function setupParallax(){

  var img = pbr.img()
  var ratio = pbr.parallax.ratio
  var headerHeight = pbr.parallax.headerHeight
  var imgHeight = pbr.parallax.imgHeight
  
  function transform(dist){
    return "translate3d(0," + dist + "px,0)"
  }

  function onScroll(){
    var position = document.body.scrollTop
  
    if(position < viewportHeight * (headerHeight + imgHeight) / 100){
      img.style.transform = transform(position * ratio)
    }
  }

  window.addEventListener('scroll', onScroll)
  
}

setupParallax()
