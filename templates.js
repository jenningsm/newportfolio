
var Element = require('/home/mjennings/pagebuilder/html.js')
var Selector = require('/home/mjennings/pagebuilder/selector.js')
var styles = require('./styles.js')
var colors = require('./color.js')
var util = require('./util.js')
var xsvg = require('./graphics/x.js')


/*
  section takes a title (e.g. "ABOUT") and the main content for
  that section (called 'body') and returns an element for that page
*/


//the vertical margins at the top and bottom of the page
var sectionStyle = {
  'margin' : '0 auto',
  'text-align' : 'justify'}


module.exports.section = section
function section(title, body){
  return new Element('div')
  .content(
    util.flex("row", ["100%", ''])(
      util.divUnderline(title).div
      .style(
        styles.font("2.5em")
      )
    ),
    body.style('margin', '50px 0'),
    util.flex("row")(
      util.divUnderline("Back to top", true, .5).div
      .attribute("onclick", "toSection()")
      .style('cursor', 'pointer')
    )
  )
  .style(sectionStyle)
  .assign(util.mediaWidth(800, {'width' : '80%'}, {'width' : '60%'}), ['0'])
}

/*
*/

module.exports.selectionSection = function(name, title, options){
  var middle = Math.floor((options.length - 1) / 2)

  //menu bar
  var menu = util.flex("row", ["100%", ''])
  menu().style(
    styles.font("1.25em"),
    {'margin-bottom' : '35px',
     '-webkit-flex-wrap' : 'wrap',
     'flex-wrap' : 'wrap' }
  )

  var underlines = {}

  for(var i = 0; i < options.length; i++){
    var underlinedDiv = util.divUnderline(options[i].title, false, .75)
    underlines[options[i].name] = underlinedDiv.underline
    underlinedDiv.div.style({
      'cursor' : 'pointer',
      'text-align' : 'center'
    })
    .attribute("onclick", "choose('" + name + "','" + options[i].name + "')")
    
    //in order for the menu items to have a fixed horizontal alignment, their widths must be set to 0.
    //however, if their widths are set to 0, then the containing flex box won't wrap the menu items.
    //therefore, when the screen is small enough for the box to need to wrap the items, 
    //set the width to auto so that it will wrap, otherwise set the width to 0
    underlinedDiv.div.assign(util.mediaWidth(500, {'width' : 'auto'}, {'width' : '0'}), [0])

    menu(underlinedDiv.div, 1)

    if(i !== options.length - 1){
      menu(xsvg('17px').assign(util.mediaWidth(1000, {'display' : 'none'}, {'display' : 'block'}), [0]))
    }

  }

  var bodies = []
  var choices = {}
  for(var i = 0; i < options.length; i++){
    var body = new Element('div').content(options[i].content)
    if(i !== middle){
      body.style('display', 'none')
    } 

    body.style('overflow', 'hidden')
    body.style('width', '100%')
    choices[options[i].name] = {
      'container' : body,
      'underline' : underlines[options[i].name]
    }

    bodies.push(body)
  }

  var container = new Element('div').content(bodies).style('position', 'relative')

  return section(title,
    new Element('div').style('width', '100%')
    .content(
      menu(),
      container
    )
  )
  .share({
    'first' : options[middle].name,
    'choices' : choices,
    'container' : container
  })

}
