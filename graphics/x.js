var Element = require('/home/mjennings/pagebuilder/html.js')
var defaultColor = require('../color.js').pString
var svg = require('./svg.js')

//return an svg X image, with given size and color
module.exports = function(size, color){

  if(color === undefined)
    color = defaultColor

  var lineWidth = .25


  function positioning(i){
    return .5 + (i === 0 ? -1 : 1) * (.5 - lineWidth / 3)
  }

  var x = svg(size, size, color)

  for(var i = 0; i < 2; i++){
    x([positioning(i), positioning(0)],
      [positioning((i + 1) % 2), positioning(1)],
      lineWidth)
  }

  return x()
}

