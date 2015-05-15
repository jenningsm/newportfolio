
var Element = require('/home/mjennings/pagebuilder/html.js')
var styles = require('./styles.js')
var colors = require('./color.js')


/*
  Used to generate a flexbox. It takes the following arguments:

  dir    : the dir of the flexbox, 'row' or 'column'
  dims   : a two element array containing the width and
           height of the flexbox as strings
  justify: the value for 'justify-content' style

  and then returns a function. This function takes as arguments
  first an item to insert into the flexbox, and then, optionally,
  the flex-grow value for that item. The function then returns the
  flexbox. If the function is called without arguments it will return
  the flexbox without doing anything.
*/
module.exports.flex = function(dir, dims, justify){
  var f = new Element('div').style(
    styles.flex(dir, justify)
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

//the amount, in percentage, the underline is moved up from the bottom
//of the element
var underlinePlace = 9

//standard underline thickness
var thicknessStandard = 4

/*
  Creates a span containing the string text

  text: a string to underline
  thickness: the thickness of the underline as a proportion of thicknessStandard
  color: the color of the underline
*/
module.exports.spanUnderline = function(text, thickness, color){
  if(color === undefined)
    color = colors.pString

  if(thickness === undefined)
    thickness = 1

  thickness = truncate(thicknessStandard * thickness, 2)

  var displacement = truncate(underlinePlace * 2 / 100, 2) + 'em'

  return new Element('span')
  .style({
    'top' : '-' + displacement,
    'position' : 'relative',
    'display' : 'inline-block',
    'border-bottom' : thickness + 'px solid ' + color
   })
  .content(
    new Element('span').style({
      'top' : displacement,
      'display' : 'inline-block',
      'position' : 'relative'
    })
    .content(text)
  )

}

/*
  Similar to spanUnderline, but a div instead of a span. It's a little cleaner
  than spanUnderline, but it can't be put inside paragraph tags

  if the parameter active is false, then the underline will be hidden

  returns an object containing the div (as 'div') and the underline element
  (as 'underline') so that the underline can be hidden and unhidden.
*/
module.exports.divUnderline = function(text, active, thickness, color){
  if(color === undefined)
    color = colors.pString

  if(thickness === undefined)
    thickness = 1

  thickness = truncate(thicknessStandard * thickness, 2)

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
  .style('display', 'inline-block')

  if(active === false)
    underline.style('display', 'none')

  return {'div' : div, "underline" : underline}
}

//truncates a number so it has at most precision number
//of digits after the decimal point
module.exports.truncate = truncate
function truncate(number, precision){
  number = number * Math.pow(10, precision)
  number = Math.round(number)
  return number / Math.pow(10, precision)
}
