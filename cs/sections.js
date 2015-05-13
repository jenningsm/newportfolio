
var keys = Object.keys(pbr.sections)

var sections = {}

for(var i = 0; i < keys.length; i++){
  sections[keys[i]] = pbr.sections[keys[i]]()
}

function pageMover(position){
  window.scrollTo(0, position)
}

function toSection(section){

  var body = document.body,
      html = document.documentElement;

  var documentHeight = Math.max( body.scrollHeight, body.offsetHeight, 
                         html.clientHeight, html.scrollHeight, html.offsetHeight );

  var bounds = sections[section].getBoundingClientRect()

  var viewportHeight = window.innerHeight 

  var mid = (bounds.top + bounds.bottom) / 2
  
  var start = document.body.scrollTop
  var target = mid - Math.max(viewportHeight, bounds.bottom - bounds.top) / 2
  target = Math.min(target, documentHeight - viewportHeight)

  new MoveGen(pageMover, Math.abs(target - start) / 500)
  .ends(start, target)
  .acceleration(3, 3, 1)
  .run()
}

