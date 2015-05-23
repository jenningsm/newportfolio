var Element = require("/home/mjennings/pagebuilder/html.js")

/*
  Used to create an svg element.

    width: the width of the element, as a string
    height: the height of the element, as a string
    color: the color of the lines within the element

  Returns a function that draws lines to the element and returns
  the element. The function takes the following arguments:

    start: a two element array containing the x and y coordinates
           for starting point of the line to be drawn. Each
           coordinate is a value between 0 and 1, and is intepreted
           as a proportion of the total width/height of the svg.
    end  : same as start, but for the end point instead
    lineWidth: the width of the line to be drawn, as a style string

  if this function is called with no arguments, it returns the svg
  element without doing anything
*/
module.exports = function(width, height, color){

  var svg = new Element('svg').attribute({
    'viewBox' : '0 0 1 1',
    'xmlns' : 'http://www.w3.org/2000/svg',
    'version' : '1.1'
  })
  .style({
    'height' : height,
    'width' : width,
    'stroke' : color
  })

  return function(start, end, lineWidth){
    if(start !== undefined){
      var line = new Element('line/').attribute({
        'x1' : truncate(start[0], 2),
        'y1' : truncate(start[1], 2),
        'x2' : truncate(end[0], 2),
        'y2' : truncate(end[1], 2)
      }).style({
        'fill' : 'none',
        'stroke-width' : lineWidth,
      })
      svg.content(line)
    }
    return svg
  }
}

//truncated a number down to precision number of digits
//past the decimal point
function truncate(number, precision){
  number = number * Math.pow(10, precision)
  number = Math.round(number)
  return number / Math.pow(10, precision)
}
