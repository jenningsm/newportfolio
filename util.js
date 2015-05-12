
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

var underlineDist = 17
module.exports.underline = underline
function underline(text, color, thickness){
  if(color === undefined)
    color = colors.pString
  if(thickness === undefined)
    thickness = 2

  var style = {'position':'relative', 'display':'inline-block'}
  return new Element('span')
  .style(
    {'top': '-' + underlineDist + '%',
     'border-bottom': thickness + 'px solid ' + color },
    style
  ).content(
    new Element('span').style('top', underlineDist + '%').content(
      text
    )
    .style(style)
  )
}
