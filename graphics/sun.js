
var Element = require('/home/mjennings/pagebuilder/html.js')
var color = require('../color.js').pString

/*
  Creates an svg sun.

  size: the size of the sun
  numPoints: the number of points the sun has
  skips: an array of integers. For each integer x in this array,
         for each point, that point will have a line between it
         and the point x spots over
*/
module.exports = function(size, numPoints, skips){

  var lineWidth = .04

  var lines = [];

  if(numPoints === undefined)
    numPoints = 9;
  if(skips === undefined)
    skips = [4, 6];
  var startAng = Math.random() * 2 * Math.PI

  for(var i = 0; i < numPoints; i++){
    var ang = startAng + i * 2 * Math.PI / numPoints
    var here = [.5 + .5 * Math.cos(ang), .5 + .5 * Math.sin(ang)]
    for(var j = 0; j < skips.length; j++){
      ang = startAng + (i + skips[j]) * (2 * Math.PI / numPoints)
      var there = [.5 + .5 * Math.cos(ang), .5 + .5 * Math.sin(ang)]
      var line = new Element('line/').attribute({
        'x1' : truncate(here[0], 2),
        'y1' : truncate(here[1], 2),
        'x2' : truncate(there[0], 2),
        'y2' : truncate(there[1], 2)
      }).style({
        'fill' : 'none',
        'stroke-width' : lineWidth,
      })
      lines.push(line)
    }
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
