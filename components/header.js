
var Element = require('/home/mjennings/pagebuilder/html.js')
var Selector = require('/home/mjennings/pagebuilder/selector.js')
var styles = require('../styles.js')
var xsvg = require('../graphics/x.js')
var color = require('../color.js')
var util = require('../util.js')
var flex = util.flex
var divUnderline = util.divUnderline

/*
  The very top of the page

  items: the menu items
  height: height of the header as a proportion of the viewport

  the header is a flex box which itself contains three flex boxes.
  the first and last of these are the two halves of the menu, and the
  middle flex box contains the cursive initials and golden bars
*/

module.exports = function(sectionsInfo, height){
  var items = [];
  for(var i = 0; i < sectionsInfo.length; i++){
    if(sectionsInfo[i].menuTitle !== undefined)
      items.push(sectionsInfo[i])
  }

  //create the two menus, the one on the left and the one on the right
  var menus = []
  for(var i = 0; i < 2; i++){
    menus[i] = flex('row', ["33%", ""], 'space-around')
 
    for(var j = 0; j < items.length / 2; j++){
      var item = items[i * (items.length/2) + j]

      menus[i](
        util.divUnderline(item.menuTitle, false, .75).div
        .attribute('onclick', 'toSection(&quot;' + item.name + '&quot;)')
        .style('cursor', 'pointer')
      )

      if(j !== (items.length / 2) - 1){
        menus[i](xsvg('17px').assign(util.mediaWidth(800, {'display' : 'none'}, {'display' : 'block'}), [0]))
      }
    }
  }

  //generates the golden bars on each side of the cursive initials  
  function bar(){
    return new Element('div').style(
      styles.dims('0%', '20px'),
      { 'background' : color.pString ,
        'border-radius' : '1px'  }
    )
    .assign(util.mediaWidth(600, {'display' : 'none'}, {'display' : 'block'}), [0])
  }

  //the cursive initials
  var initials = new Element('span').style(
    styles.font('7.4vh', '400', "'Calligraffitti', cursive"),
    styles.userSelect('none')
  ).content(
    'MJ'
  )

  //the initials along with the golden bars
  var center = flex('row', ['18%', '100%'], 'space-between')
  center(bar(), 1)
  center(initials, .67)
  center(bar(), 1)

  //menus, golden bars, and initials
  var inside = flex('row', ['', '100%'], 'space-around')
  inside(menus[0]())
  inside(center())
  inside(menus[1]())
  inside().assign(util.mediaWidth(600, {'width' : '100%'}, {'width' : '90%'}), [0])

  //the whole thing centered inside a flex box
  return flex('row', ["100%", 100 * height + '%'])(
    inside()
  )
  .style(
    {'text-align' : 'center'},
    styles.font('3.75vmin', '400', "'Open Sans Condensed', sans serif")
  )
} 
  
  
