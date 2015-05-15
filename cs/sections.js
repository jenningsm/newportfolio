
var keys = Object.keys(pbr.sections)

var sections = {}

for(var i = 0; i < keys.length; i++){
  sections[keys[i]] = pbr.sections[keys[i]].get()
}

function pageMover(position){
  window.scrollTo(0, position)
}

//this variable is for the sake of other code
//it must be true when we are scrolling automatically
//to a section and false otherwise
//once we are done scrolling, we must fire a 
//'doneTravelling' event
var travelling = false

function toSection(section){
 
  //where we are scrolling from
  var start = document.body.scrollTop
  //where we are going to scroll to
  var target

  //if a section has been specified, go to that section,
  //otherwise go to the top of the page
  if(section !== undefined){
 
    //get the height of the document and viewport
    var body = document.body,
        html = document.documentElement;
    var documentHeight = Math.max( body.scrollHeight, body.offsetHeight, 
                           html.clientHeight, html.scrollHeight, html.offsetHeight );
    var viewportHeight = window.innerHeight 
  
    //get the midpoint of the section we are going to
    var bounds = sections[section].getBoundingClientRect()
    var mid = (bounds.top + bounds.bottom) / 2
    
    target = mid - Math.max(viewportHeight, bounds.bottom - bounds.top) / 2
    target = Math.min(target, documentHeight - viewportHeight)
  } else {
    target = 0
  }


  travelling = true
  function doneTravelling(){
    travelling = false
    window.dispatchEvent(new Event('doneTravelling'))
  }

  //scroll
  new MoveGen(pageMover, 1)
  .ends(start, target)
  .acceleration(1, 1, .4)
  .callback(doneTravelling)
  .run()
}

