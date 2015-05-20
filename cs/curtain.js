
var curtain = pbr.curtain.get()

window.addEventListener('load', function(){
  new MoveGen(function(pos) { curtain.style.opacity = pos}, 1)
  .ends(1, 0)
  .acceleration(0, 0)
  .callback(function(){curtain.style.display = 'none'})
  .run()
})
