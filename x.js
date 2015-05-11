var Element = require('/home/mjennings/pagebuilder/html.js')
var defaultColor = require('./color.js').pString

module.exports = function(size, unit, color){

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
      'x1' : positioning(i),
      'y1' : positioning(0),
      'x2' : positioning((i + 1) % 2),
      'y2' : positioning(1)
    })
    lines.push(line)
  }

  return new Element('svg').attribute({
    'viewBox' : '0 0 1 1',
    'xmlns' : 'http://www.w3.org/2000/svg',
    'version' : '1.1',
    'height' : size + unit,
    'width' : size + unit,
    'stroke' : color
  })
  .content(lines)

}

function truncate(number, precision){
  number = number * Math.pow(10, precision)
  number = Math.round(number)
  return number / Math.pow(10, precision)
}
