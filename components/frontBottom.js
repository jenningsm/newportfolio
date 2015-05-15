
var Element = require('/home/mjennings/pagebuilder/html.js')
var flex = require('../util.js').flex
var xsvg = require('../graphics/x.js')
var styles = require('../styles.js')

//the bottom part of the viewport at the top of the page

module.exports = function(height){
  var fb = flex("row", ["100%", 100 * height + "%"])
  
  fb(xsvg('17px'))
  fb(
    new Element('span').content("SEE WHAT I CAN DO")
    .style('padding', '20px')
  )
  fb(xsvg('17px'))
  
  return  fb().style(
    styles.font("3.75vmin", "400", "'Open Sans Condensed'")
  )
}
