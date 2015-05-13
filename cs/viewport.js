var viewportHeight
var viewportWidth

function updateDims(){
  viewportHeight = window.innerHeight
  viewportWidth = window.innerWidth
}

updateDims()

window.addEventListener('resize', updateDims)

