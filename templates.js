
var Element = require('/home/mjennings/pagebuilder/html.js')
var Selector = require('/home/mjennings/pagebuilder/selector.js')
var styles = require('./styles.js')
var colors = require('./color.js')
var util = require('./util.js')
var xsvg = require('./graphics/x.js')


/*
  section takes a title (e.g. "ABOUT") and the main content for
  that section (called 'body') as an element and returns an 
  element for that page

    title: the title to display for the section
    body: the content of the section, as an element
*/

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
  .style({
    'margin' : '0 auto',
    'text-align' : 'justify'
  })
}

/*

  A selectionSection is a section which has multiple content items
  and a menu that the user can use to switch between the content items.
  The projects and experience sections are selectionSections

    name: the reference name of the section to produce
    title: the title to display for the section
    options: an array containing each of the content items. Each of the
             the content items is itself an object literal with the 
             following format:

               {'name' : the reference name of the item,
                'title' : the title to display for the item,
                'content' : the content of the item, as an element}

  returns an element for the section

*/

module.exports.selectionSection = function(name, title, options){
  //the index of the middle content item
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

  //add the titles to the menu
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

    //add the 'x' svgs between menu items
    if(i !== options.length - 1){
      menu(xsvg('17px').assign(util.mediaWidth(1000, {'display' : 'none'}, {'display' : 'block'}), [0]))
    }

  }

  /*
     The client-side needs to know, for each option, where that
     option's content is and where the underline for that option's
     menu title is, so that when an option is selected, it can show
     it's content and underline and hide those of whatever option
     was previously showing

     choices is to contain that information. It maps the reference
     name of each option to an object literal of the following form:

       {'container' : the container for that option's content,
        'underline' : the underline for that option}
  */
  var choices = {}
  //an array to insert the content for each item into
  var bodies = []
  //add the content for each item
  for(var i = 0; i < options.length; i++){
    var body = new Element('div').content(options[i].content)
    //the middle options should be displayed at first
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

  var container = new Element('div')
                  .content(bodies)
                  .style('position', 'relative')

  return section(title,
    new Element('div').style('width', '100%')
    .content(
      menu(),
      container
    )
  )
  .share({
    //first is the reference name of the option that is initial
    //displayed
    'first' : options[middle].name,
    //as described above
    'choices' : choices,
    //the container that contains the content for all the options
    'container' : container
  })

}
