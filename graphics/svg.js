var Element = require("/home/mjennings/pagebuilder/html.js")

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

function truncate(number, precision){
  number = number * Math.pow(10, precision)
  number = Math.round(number)
  return number / Math.pow(10, precision)
}
