var Element = require('/home/mjennings/pagebuilder/html.js')
var color = require('../color.js')
var styles = require('../styles.js')
var flex = require('../util.js').flex

/*
  The main picture area at the top of the page
*/

module.exports = function(headerHeight, parallaxRatio){

  var bulkHeight = 100 - 2 * headerHeight

  var imgHeight = 100 * (1 + 2 * (headerHeight * parallaxRatio) / bulkHeight) 

  var img = new Element('img', 'src', './clouds.jpg').style({
    'width' : 'auto',
    'min-height' : imgHeight + "%",
    'height' : imgHeight + "%",
  })

  /* TODO: if the image is not as wide as the container in the browser, we need to add
     client side js to set the width to 100% and the height to auto and negate the min-height*/

  var imgContainer = flex("column", ['100%', '100%'])(img).style('position', 'absolute')
  
  var text = flex("column", ['100%', '100%'])(
    new Element('span').content('FRONT-END DEVELOPER'), 0,
    new Element('span').content('READY FOR ACTION'), 0
  ).style(
    styles.font('7vmin', '900', "'Open Sans Condensed', sans serif"),
    { 'position' : 'absolute',
      'color' : 'rgb(255, 255, 235)' }
  )

  var border = '4px solid ' + color.pString

  var bulk = new Element('div')
  .content(imgContainer, text)
  .style(
    styles.dims('100%', bulkHeight + '%'),
    {'position' : 'relative',
     'border-top' : border,
     'border-bottom' : border,
     'box-sizing' : 'border-box',
     'overflow' : 'hidden'}
  )

  return {'img' : imgContainer, 'div' : bulk}

}
