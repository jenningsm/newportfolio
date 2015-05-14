
var Element = require('/home/mjennings/pagebuilder/html.js')
var styles = require('./styles.js')
var colors = require('./color.js')
var util = require('./util.js')
var xsvg = require('./graphics/x.js')


/*
  page takes a title (e.g. "ABOUT") and the main content for
  that page (called 'body') and returns an element for that page
*/

var pageWidth = "60%"

//the vertical margins at the top and bottom of the page
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
    util.flex("row")(util.divUnderline("Back to top", true, .5).div.attribute("onclick", "toSection()"))
  )
}

/*
  selection page is for a page that has options a user can click on for
  different content. Each option has a name, that will appear on the menu
  bar, and its content  

  the options argument is an array containing all the options. Each option
  is an array whose first member is the reference name of the option, whose
  second member is the display name if the option and whose third member is 
  the content for the option
*/

module.exports.selectionPage = function(title, options){
  var middle = Math.floor((options.length - 1) / 2)

  //menu bar
  var menu = util.flex("row", ["100%", ''])
  menu().style(
    styles.font("1.25em"),
    {'margin-bottom' : '35px'}
  )

  for(var i = 0; i < options.length; i++){
    var displayUnderline = false
    //if this is in the middle
    if(i === middle)
      displayUnderline = true

    menu(
      util.divUnderline(options[i][1], displayUnderline).div.style({
        'width' : '0',
        'text-align' : 'center'
      }).attribute("onclick", "choose('" + title[0] + "','" + options[i][0] + "')"),
    1)

    if(i !== options.length - 1)
      menu(xsvg('17px'))

  }

  var bodies = []
  var choices = {}
  for(var i = 0; i < options.length; i++){
    var body = new Element('div').content(options[i][2])
    if(i !== middle){
      body.style('display', 'none')
    } 

    body.style('overflow', 'hidden')
    choices[options[i][0]] = body

    bodies.push(body)
  }

  var container = new Element('div').content(bodies).style('position', 'relative')

  return page(title[1],
    new Element('div').style('width', '100%')
    .content(
      menu(),
      container
    )
  )
  .share({
    'first' : options[middle][0],
    'choices' : choices,
    'container' : container
  })

}
