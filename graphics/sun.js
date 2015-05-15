
var Element = require('/home/mjennings/pagebuilder/html.js')
var color = require('../color.js').pString
var svg = require('./svg.js')

/*
  Creates an svg sun.

  size: the size of the sun
  numPoints: the number of points the sun has
  skips: an array of integers. For each integer x in this array,
         for each point, that point will have a line between it
         and the point x spots over
*/
module.exports = function(size, numPoints, skips, lineWidth){

  if(lineWidth === undefined)
    lineWidth = .04

  var lines = [];

  if(numPoints === undefined)
    numPoints = 9;
  if(skips === undefined)
    skips = [4, 6];
  var startAng = Math.random() * 2 * Math.PI

  var sun = svg(size, size, color)

  for(var i = 0; i < numPoints; i++){
    var ang = startAng + i * 2 * Math.PI / numPoints
    var here = [.5 + .5 * Math.cos(ang), .5 + .5 * Math.sin(ang)]
    for(var j = 0; j < skips.length; j++){
      ang = startAng + (i + skips[j]) * (2 * Math.PI / numPoints)
      var there = [.5 + .5 * Math.cos(ang), .5 + .5 * Math.sin(ang)]

      sun(here, there, lineWidth)
    }
  }

  return sun().style('opacity', 0)
}

