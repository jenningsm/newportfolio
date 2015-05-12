
var Element = require('/home/mjennings/pagebuilder/html.js')
var styles = require('../styles.js')
var colors = require('../color.js')
var util = require('../util.js')
var xsvg = require('../x.js')

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
    ).style(
      {'margin-bottom' : pageMargin}
    ),
    body
  )
}

module.exports.selectionPage = function(title, subtitle, options){
  var selection = util.flex("row", ["100%", ''])
  for(var i = 0; i < options.length; i++){
    var displayUnderline = false
    //if this is in the middle
    if(i === options.length / 2 || i === (options.length-1) / 2)
      displayUnderline = true

    selection(
      new Element('div').content(
        util.divUnderline(options[i][0], displayUnderline).div
        .style('display', 'inline-block')
      ).style({
        'width' : '0',
        'text-align' : 'center'
      }),
    1)

    if(i !== options.length - 1)
      selection(xsvg(17, 'px'))

  }
  selection().style(
    styles.font("1.25em"),
    {'border-bottom' : '1px solid rgba(210, 180, 100, 1)',
     'padding-bottom' : '7px'}
  )
  return page(title, selection())
}
