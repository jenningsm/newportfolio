
var Element = require('/home/mjennings/pagebuilder/html.js')
var styles = require('./styles.js')

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
