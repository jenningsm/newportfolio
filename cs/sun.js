
/*
  Executes the function func after timeGap milliseconds have passed
  since the last event evt has fired on target

  returns a function that removes the listener
*/
function lazyListener(target, evt, func, timeGap){
  var after
  function listen(){
    window.clearTimeout(after)
    after = window.setTimeout(func, timeGap)
  }
  target.addEventListener(evt, listen)
  return function(){
    target.removeEventListener(evt, listen)
  }
}

/*
  Sets up the suns.

  The suns should have the following behavior:

  When a sun first enters the viewport, it should spin
  and fade in for a certain amount of time, unless we are
  currently scrolling to a section automatically, due to a
  user having clicked a menu item. If are automatically
  scrolling, we should wait until it is done travelling,
  at which point a 'doneTravelling' event will be fired,
  and then spin in whatever suns are in the viewport.
*/

function setupSuns(){

  //when called, makes a sun spin and fade in
  function spinIn(sun){

    function spinner(pos){ sun.style.transform = 'rotate(' + pos + "turn)" }
    function fader(pos){ sun.style.opacity = pos }

    var time = .8
    new MoveGen(spinner, time)
    .ends(0, .7)
    .acceleration(0, 1)
    .run()
    new MoveGen(fader, time)
    .ends(0, 1)
    .acceleration(0, 1)
    .run()
  }

  //sets up a sun to spin in when it is within the viewport
  function setupSun(sun){
    //the vertical position of the sun
    var pos

    //update pos
    function updatePosition(){
      var bb = sun.getBoundingClientRect()
      var scrollTop = window.pageYOffset 
      pos = scrollTop + (bb.top + bb.bottom) / 2
    }

    //an array of functions that will remove all the sun's
    //event listeners when called
    var stops = []
    
    function onScroll(){
      var scroll = window.pageYOffset

      /*travelling is a variable from sections.js. When it is true, the page
      is scrolling automatically to a section, due to a menu item having been
      clicked by the user. When travelling is true, we want to wait until the 
      page has stopped moving before we spin in any suns. When the page has 
      finished scrolling, a 'doneTravelling' event will be fired*/

      //if not travelling and the sun is within the viewport
      if(!travelling && pos > scroll && pos < scroll + viewportHeight){
        spinIn(sun)
        //remove all the sun's event listeners
        for(var i = 0; i < stops.length; i++){
          stops[i]()
        } 
      }
    }

    //keep track of the position of the sun
    stops.push(lazyListener(window, 'resize', updatePosition, 200))
    stops.push(lazyListener(window, 'bodyChange', updatePosition, 200))

    //check if the sun should spin in
    //'doneTravelling' is fired after we have just finished automatically 
    //scrolling to a section
    window.addEventListener('scroll', onScroll)
    window.addEventListener('doneTravelling', onScroll)
    stops.push(function(){
      window.removeEventListener('scroll', onScroll)
    }) 
    stops.push(function(){
      window.removeEventListener('doneTravelling', onScroll)
    }) 

    //get the initial position
    updatePosition()
    window.addEventListener('load', updatePosition)
  }

  for(var i = 0; i < pbr.suns.length; i++){
    setupSun(pbr.suns[i].data.get())
  }
}

setupSuns()
