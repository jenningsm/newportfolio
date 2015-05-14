
var keys = Object.keys(pbr.sections)
var choiceSections = {}
for(var i = 0; i < keys.length; i++){
  if(pbr.sections[keys[i]].data !== undefined){
    var section = pbr.sections[keys[i]].data
    section.container = section.container.get()
  
    var choiceKeys = Object.keys(section.choices)
    for(var j = 0; j < choiceKeys.length; j++){
      section.choices[choiceKeys[j]] = section.choices[choiceKeys[j]].get()
    }

    section.choice = section.first
    section.lock = false
    choiceSections[keys[i]] = section
  }
}

function choose(sectionName, choice){
  var section = choiceSections[sectionName]
  if(!section.lock && choice !== section.choice){
    section.lock = true

    var from = section.choices[section.choice]
    var fromHeight = from.clientHeight

    var to = section.choices[choice]
    to.style.position = 'absolute'
    to.style.opacity = 0 
    to.style.display = 'block'
    var toHeight = to.clientHeight
  
    section.container.style.height = fromHeight
  
    var resizeEvent = new Event('bodyChange')
    function sizer(pos){
      section.container.style.height = pos + "px"
      window.dispatchEvent(resizeEvent)
    }
    function fader(el){
      return function(pos){
        el.style.opacity = pos
      }
    }

    function finished(){
      section.choice = choice
      section.lock = false
      section.container.style.height = ""
    }
  
    function resize(callback){
      return function(){
        new MoveGen(sizer, .7)
        .ends(fromHeight, toHeight)
        .acceleration(1, 1, .8)
        .callback(callback)
        .run()
      }
    }

    function switchDisplay(){
      from.style.display = 'none'
      to.style.position = 'relative'
      to.style.display = 'block'
    }

    function changeText(callback){
      return function(){
        var time = .4 
        new MoveGen(fader(from), time)
        .acceleration(0, 0, 1)
        .ends(1, 0)
        .callback(
          function(){
            switchDisplay()
            new MoveGen(fader(to), time)
            .acceleration(0, 0, 1)
            .ends(0, 1)
            .callback(callback)
            .run()
          }
        )
        .run()
      }
    }
  
    var first, second
    if(toHeight > fromHeight){
      first = resize
      second = changeText
    } else {
      first = changeText
      second = resize
    }

    first(
      second(
        finished
      )
    )()

  }
}
