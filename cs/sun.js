
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
  and fade in for a certain amount of time
*/

function setupSuns(){

  //when called, makes a sun spin and fade in
  function spinIn(sun){

    function spinner(pos){ applyTransform(sun, 'rotate(' + pos + "turn)") }
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


      //if the sun is within the viewport
      if(pos > scroll && pos < scroll + viewportHeight){
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

    //check if the sun should spin in on scroll
    stops.push(lazyListener(window, 'scroll', onScroll, 70))

    //get the initial position
    updatePosition()
    window.addEventListener('load', updatePosition)
  }

  for(var i = 0; i < pbr.suns.length; i++){
    setupSun(pbr.suns[i].data.get())
  }
}

setupSuns()
