
var keys = Object.keys(pbr.sections)

var sections = {}

for(var i = 0; i < keys.length; i++){
  sections[keys[i]] = pbr.sections[keys[i]]()
}

function pageMover(position){
  window.scrollTo(0, position)
}

function toSection(section){

  var start = document.body.scrollTop
  var target

  if(section !== undefined){
    var body = document.body,
        html = document.documentElement;
  
    var documentHeight = Math.max( body.scrollHeight, body.offsetHeight, 
                           html.clientHeight, html.scrollHeight, html.offsetHeight );
    var viewportHeight = window.innerHeight 
  
    var bounds = sections[section].getBoundingClientRect()
    var mid = (bounds.top + bounds.bottom) / 2
    
    target = mid - Math.max(viewportHeight, bounds.bottom - bounds.top) / 2
    target = Math.min(target, documentHeight - viewportHeight)
  } else {
    target = 0
  }

  new MoveGen(pageMover, 1)
  .ends(start, target)
  .acceleration(1, 1, .5)
  .run()
}

