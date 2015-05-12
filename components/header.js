
var Element = require('/home/mjennings/pagebuilder/html.js')
var styles = require('../styles.js')
var xsvg = require('../x.js')
var color = require('../color.js')
var flex = require('../util.js').flex


module.exports = function(items, height){
  var menus = []
  
  for(var i = 0; i < 2; i++){
    menus[i] = flex('row', ["33%", "100%"])
 
    for(var j = 0; j < items.length / 2; j++){
      var item = items[i * (items.length/2) + j]

      menus[i](new Element('span').content(item), 1)
      if(j !== (items.length / 2) - 1)
        menus[i](xsvg(17, 'px'), 1)
    }
  }
  
  function bar(){
    return new Element('div').style(
      styles.dims('0%', '12%'),
      { 'background' : color.pString ,
        'border-radius' : '1px'  }
    )
  }

  var initials = new Element('span').style(
    styles.font('7.5vmin', '400', "'Calligraffitti', cursive")
  ).content(
    'MJ'
  )

  var center = flex('row', ['18%', '100%'], 'space-between')
  center(bar(), 1)
  center(initials, .67)
  center(bar(), 1)


  var inside = flex('row', ['90%', '100%'], 'space-around')
  inside(menus[0]())
  inside(center())
  inside(menus[1]())

  var full = flex('row', ["100%", height + '%'])
  var whole = full(inside())

  whole.style(
    {'text-align' : 'center'},
    styles.font('3.75vmin', '400', "'Open Sans Condensed', sans serif")
  )
  return whole
} 
  
  
