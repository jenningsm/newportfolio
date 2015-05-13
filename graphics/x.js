var Element = require('/home/mjennings/pagebuilder/html.js')
var defaultColor = require('../color.js').pString

//creates an svg X image, with given size and color
module.exports = function(size, color){

  if(color === undefined)
    color = defaultColor

  var lineWidth = .25

  var lines = [];

  function positioning(i){
    return .5 + (i === 0 ? -1 : 1) * (.5 - lineWidth / 3)
  }

  for(var i = 0; i < 2; i++){
    var line = new Element('line/').attribute({
      'fill' : 'none',
      'stroke-width' : lineWidth,
      'x1' : truncate(positioning(i), 2),
      'y1' : truncate(positioning(0), 2),
      'x2' : truncate(positioning((i + 1) % 2), 2),
      'y2' : truncate(positioning(1), 2)
    })
    lines.push(line)
  }

  return new Element('svg').attribute({
    'viewBox' : '0 0 1 1',
    'xmlns' : 'http://www.w3.org/2000/svg',
    'version' : '1.1',
    'height' : size,
    'width' : size,
    'stroke' : color
  })
  .content(lines)

}

function truncate(number, precision){
  number = number * Math.pow(10, precision)
  number = Math.round(number)
  return number / Math.pow(10, precision)
}
