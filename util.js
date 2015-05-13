
var Element = require('/home/mjennings/pagebuilder/html.js')
var styles = require('./styles.js')
var colors = require('./color.js')

module.exports.flex = function(dir, dims, align){
  var f = new Element('div').style(
    styles.flex(dir, align)
  )
  if(dims !== undefined){
    f.style(styles.dims(dims[0], dims[1]))
  }
  
  return function(item, grow /*...*/){
    for(var i = 0; i < arguments.length; i+=2){
      if(arguments[i+1] !== undefined)
        arguments[i].style('flex-grow', arguments[i+1])
    
      f.content(arguments[i])
    }

    return f
  }
}


module.exports.divUnderline = function(text, active, thickness, color){
  var underlinePlace = 9
  if(color === undefined)
    color = colors.pString

  if(thickness === undefined)
    thickness = 1

  thickness = truncate(4 * thickness, 2)

  var underline =  new Element('div').style(
    styles.dims("100%", thickness + "px"),
    { 'position' : 'absolute',
      'top' : (100 - underlinePlace) + '%',
      'background' : color,
      'z-index' : -1 }
  )

  var div = new Element('div')
  .content(
    new Element('div').content(
      new Element('span').content(text),
      underline
    ).style({
      'position' : 'relative',
      'display' : 'inline-block'
    })
  )

  if(active === false)
    underline.style('display', 'none')

  return {'div' : div, "underline" : underline}
}

function truncate(number, precision){
  number = number * Math.pow(10, precision)
  number = Math.round(number)
  return number / Math.pow(10, precision)
}
