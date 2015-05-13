var Element = require('/home/mjennings/pagebuilder/html.js')
var color = require('../color.js')
var styles = require('../styles.js')
var flex = require('../util.js').flex

/*
  The main picture area at the top of the page
*/

module.exports = function(height){

  var img = new Element('img', 'src', './clouds.jpg').style({
    'position' : 'absolute',
    'width' : 'auto',
    'height' : 'auto',
    'min-width' : '100%',
    'min-height' : '100%',
    'top' : '50%',
    'left' : '50%',
    'transform' : 'translate(-50%, -50%)'
  })
  
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
  .content(img, text)
  .style(
    styles.dims('100%', height + '%'),
    {'position' : 'relative',
     'border-top' : border,
     'border-bottom' : border,
     'box-sizing' : 'border-box',
     'overflow' : 'hidden'}
  )

  return bulk

}
