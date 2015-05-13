
var Element = require('/home/mjennings/pagebuilder/html.js')
var styles = require('./styles.js')
var colors = require('./color.js')
var util = require('./util.js')
var xsvg = require('./x.js')

var pageWidth = "60%"
var pageMargin = "50px"
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

/*
  options is an array consisting of each of option a user can click on

  each element is an array whose first element is the title and the second
  element is the content
*/
module.exports.selectionPage = function(title, options){

  var middle = Math.floor((options.length - 1) / 2)

  var selection = util.flex("row", ["100%", ''])
  for(var i = 0; i < options.length; i++){
    var displayUnderline = false
    //if this is in the middle
    if(i === middle)
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
    styles.font("1.25em"),
    {'margin-bottom' : '35px'}
  )

  var descriptions = []
  for(var i = 0; i < options.length; i++){
    var description = new Element('div').content(options[i][1])
    if(i !== middle)
      description.style('display', 'none')

    descriptions.push(description)
  }

  var body = new Element('div').style('width', '100%')
  .content(
    selection(),
    descriptions 
  )

  return page(title, body)
}
