
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

function setupSuns(){

  function spinner(sun){
    return function(pos){
      sun.style.transform = 'rotate(' + pos + "turn)"
    }
  }
  function fader(sun){
    return function(pos){
      sun.style.opacity = pos
    }
  }
  function spinIn(sun){
    var time = .8
    new MoveGen(spinner(sun), time)
    .ends(0, .7)
    .acceleration(0, 1)
    .run()
    new MoveGen(fader(sun), time)
    .ends(0, 1)
    .acceleration(0, 1)
    .run()
  }

  function getPosition(element){
    var bb = element.getBoundingClientRect()
    var scrollTop = window.pageYOffset 
    return scrollTop + (bb.top + bb.bottom) / 2
  }

  function setupSun(sun){
    var pos

    function updatePosition(){
      pos = getPosition(sun)
    }

    var stops = []
    
    function onScroll(){
      var scroll = window.pageYOffset

      if(!travelling && pos > scroll && pos < scroll + viewportHeight){
        spinIn(sun)
        for(var i = 0; i < stops.length; i++){
          stops[i]()
        } 
      }
    }

    stops.push(lazyListener(window, 'resize', updatePosition, 200))
    stops.push(lazyListener(window, 'bodyChange', updatePosition, 200))

    window.addEventListener('scroll', onScroll)
    window.addEventListener('doneTravelling', onScroll)
    stops.push(function(){
      window.removeEventListener('scroll', onScroll)
    }) 
    stops.push(function(){
      window.removeEventListener('doneTravelling', onScroll)
    }) 

    updatePosition()
    window.addEventListener('load', updatePosition)
  }

  for(var i = 0; i < pbr.suns.length; i++){
    setupSun(pbr.suns[i].data.get())
  }
}

setupSuns()
