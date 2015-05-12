
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

module.exports.dims = function(width, height){
  var d = {}
  if(width !== '')
    d.width = width
  if(height !== '')
    d.height = height
  return d
}

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

module.exports.boxing = function(padding, margin){
  if(padding === undefined)
    padding = '0'
  if(margin === undefined)
    margin = '0'

  return { 'margin' : margin, 'padding' : padding }
}
