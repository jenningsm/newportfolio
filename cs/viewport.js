
//keeps track of the viewport dimensions

var viewportHeight
var viewportWidth

function updateDims(){
  viewportHeight = window.innerHeight
  viewportWidth = window.innerWidth
}

updateDims()

window.addEventListener('resize', updateDims)

console.log(pbr.fixedHeights)

for(var i = 0; i < pbr.fixedHeights.length; i++){
  pbr.fixedHeights[i].element = pbr.fixedHeights[i].element.get()
}

var oldViewportHeight = viewportHeight

function setHeights(){

  var change = viewportHeight / oldViewportHeight - 1

  var pos = window.pageYOffset

  var shift = 0
  for(var i = 0; pbr.fixedHeights[i].element.getBoundingClientRect().top < 0; i++){
    shift += (viewportHeight  - oldViewportHeight) * pbr.fixedHeights[i].height
  } 

  oldViewportHeight = viewportHeight
  console.log(shift)
  window.scrollTo(0, pos + shift)

  for(var i = 0; i < pbr.fixedHeights.length; i++){
    pbr.fixedHeights[i].element.style.height = (pbr.fixedHeights[i].height * viewportHeight) + "px"
  }
}

window.addEventListener('resize', setHeights)
