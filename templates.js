
var Element = require('/home/mjennings/pagebuilder/html.js')
var styles = require('./styles.js')
var colors = require('./color.js')
var util = require('./util.js')
var xsvg = require('./x.js')

var pageWidth = "60%"
var pageMargin = "40px"
var pageStyle = {
  'width' : pageWidth,
  'margin' : pageMargin + ' auto',
  'font-size' : '1.3em',
  'text-align' : 'justify'}

module.exports.page = page
function page(title, body){
  return new Element('div').style(pageStyle)
  .content(
    util.flex("row", ["100%", ''])(
      util.divUnderline(title).div
      .style(styles.font("2.5em"))
    ),
    body.style('margin', pageMargin + ' 0'),
    util.flex("row")(util.divUnderline("Back to top", true, .5).div)
  )
}

module.exports.selectionPage = function(title, options){
  var selection = util.flex("row", ["100%", ''])
  for(var i = 0; i < options.length; i++){
    var displayUnderline = false
    //if this is in the middle
    if(i === options.length / 2 || i === (options.length-1) / 2)
      displayUnderline = true

    selection(
      util.divUnderline(options[i][0], displayUnderline).div.style({
        'width' : '0',
        'text-align' : 'center'
      }),
    1)

    if(i !== options.length - 1)
      selection(xsvg(17, 'px'))

  }
  selection().style(
    styles.font("1.25em")
  )

  var body = new Element('div').style('width', '100%')
  .content(
    selection(),
    options[0][1].style('margin', '20px 0')
  )

  return page(title, body)
}
