
var Element = require('/home/mjennings/pagebuilder/html.js')
var styles = require('../styles.js')
var colors = require('../color.js')
var util = require('../util.js')

var pageWidth = "80%"
var pageMargin = "40px"
var pageStyle = {
  'width' : pageWidth,
  'margin' : pageMargin + ' auto',
  'font-size' : '1.3em',
  'text-align' : 'center'}

module.exports.page = function(title, body){
  return new Element('div').style(pageStyle)
  .content(
    util.flex("row", ["100%", ''])(
      util.divUnderline(title)
      .style(styles.font("2.5em"))
    ).style(
      {'margin-bottom' : pageMargin}
    ),
    body
  )
}
