
/*
  flex box styling

  dir: the direction, either 'column' or 'row'
  justify: the value for justify-content
  align: the value for align-items
*/
module.exports.flex = function(dir, justify, align){
  if(dir === undefined)
    dir = 'column'
  if(align === undefined)
    align = 'center'
  if(justify === undefined)
    justify = 'center'

  return {
    'display' : 'flex',
    'flex-direction' : dir,
    'align-items' : align,
    'justify-content' : justify
  }
}

//returns styling for the width and height of an element
module.exports.dims = function(width, height){
  var d = {}
  if(width !== '')
    d.width = width
  if(height !== undefined && height !== '')
    d.height = height
  return d
}

//returns styling for font size, weight, and family
module.exports.font = function(size, weight, family){
  var ret = {
    'font-size' : size,
  }
  if(weight !== undefined)
    ret['font-weight'] = weight
  if(family !== undefined)
    ret['font-family'] = family

  return ret
}
