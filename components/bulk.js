var Element = require('/home/mjennings/pagebuilder/html.js')
var color = require('../color.js')
var styles = require('../styles.js')

module.exports = function(height){

  var img = new Element('img', 'src', './clouds.jpg').style(
    { 'position' : 'absolute' },
    styles.dims('100%', '100%')
  )
  
  var text = new Element('div').style(
    styles.dims('100%', '100%'),
    styles.flex(),
    styles.font('7vmin', '900', "'Open Sans Condensed', sans serif"),
    {
      'position' : 'absolute',
      'color' : 'rgb(255, 255, 235)',
    }
  ).content(
    new Element('div').content(
      new Element('span').content('FRONT-END DEVELOPER'),
      new Element('span').content('READY FOR ACTION')
    ).style(
      styles.flex('column')
    )
  )

  var border = '4px solid ' + color.pString

  var bulk = new Element('div')
  bulk.content(img, text)
  .style({
    'position' : 'relative',
    'width' : '100%',
    'height' : height + '%',
    'border-top' : border,
    'border-bottom' : border
  })

  return bulk

}
