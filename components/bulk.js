var Element = require('/home/mjennings/pagebuilder/html.js')
var color = require('../color.js')
var styles = require('../styles.js')
var flex = require('../util.js').flex

module.exports = function(height){

  var img = new Element('img', 'src', './clouds.jpg').style({
    'position' : 'absolute',
    'width' : 'auto',
    'height' : 'auto',
    'top' : '50%',
    'left' : '50%',
    'text-align' : 'center',
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
  bulk.content(img, text)
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
