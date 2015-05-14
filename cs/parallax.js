
function setupParallax(){

  var img = pbr.parallax.img.get()
  var ratio = pbr.parallax.ratio
  var bottom = pbr.parallax.bottom
  
  function transform(dist){
    return "translate3d(0," + dist + "px,0)"
  }

  function onScroll(){
    var position = document.body.scrollTop
  
    if(position < viewportHeight * bottom / 100){
      img.style.transform = transform(position * ratio)
    }
  }

  window.addEventListener('scroll', onScroll)
  
}

setupParallax()
