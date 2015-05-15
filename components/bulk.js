var Element = require('/home/mjennings/pagebuilder/html.js')
var color = require('../color.js')
var styles = require('../styles.js')
var util = require('../util.js')
var flex = util.flex

/*
  The main picture area at the top of the page

  height: height of the area, as a proportion of the viewport
  text: an array containing each row of text to be displayed over the image
  parallaxRatio: the amount the img will move as a ratio of the amount scrolled
  offset: the vertical offset, as a proportion of the image size, of the image

  if this function is called with no arguments, it will return the height of the
  images it has created so far. This info is needed for the client side code
*/

var imgs = []
var areaHeights = []
var maxHeight = 0

module.exports = function(height, text, parallaxRatio, offset){

  //the max height is needed for the client side code
  //if this function is called with no arguments, return
  //the maxHeight
  if(height === undefined)
    return maxHeight

  if(offset === undefined)
    offset = 0

  //make the img as tall as it needs to be for it to parallax without leaving a
  //visible part of the area's top or bottom with image

  //the amount of extra image, in percentage points, we need on both the top and bottom
  var buffer = .5 * (1 - height) * parallaxRatio

  var imgHeight = 1 + 2 * buffer / height
  imgHeight = imgHeight / (1 - 2 * Math.abs(offset))

  //we want all images to be the same dimensions
  //we need to check if this img is larger than all of the previous
  //if it is we need to set all the previous heights to this height
  //if not we need to set this height to the max previous height

  //remember that the image height is relative to the area height
  //so to get the absolute height, we need to times by the area height

  if(maxHeight > height * imgHeight){
    imgHeight = maxHeight / height
  } else {
    maxHeight = imgHeight * height
    for(var i = 0; i < imgs.length; i++){
      imgs[i].style({
        'min-height' : util.truncate(100 * maxHeight / areaHeights[i], 3) + "%",
        'height' : util.truncate(100 * maxHeight / areaHeights[i], 3) + "%",
      })
    }
  }

  var img = new Element('img', 'src', './clouds.jpg').style({
    'width' : 'auto',
    'min-height' : util.truncate(100 * imgHeight, 3) + '%',
    'height' : util.truncate(100 * imgHeight, 3) + "%",
  })

  imgs.push(img)
  areaHeights.push(height)

  /* TODO: if the image is not as wide as the container in the browser, we need to add
     client side js to set the width to 100% and the height to auto and negate the min-height*/

  var imgContainer = flex("column", ['100%', '100%'])(img)
      .style('position', 'absolute')
      .share(img)
  
  var textBox = flex("column", ['100%', '100%'])
  for(var i = 0; i < text.length; i++){
    textBox(new Element('span').content(text[i]))
  }
  textBox = textBox()
  .style(
    styles.font('7vmin', '900', "'Open Sans Condensed', sans serif"),
    { 'position' : 'absolute',
      'color' : 'rgb(255, 255, 235)' }
  )

  var border = '4px solid ' + color.pString

  var bulk = new Element('div')
  .content(imgContainer, textBox)
  .style(
    styles.dims('100%', util.truncate(100 * height, 3) + '%'),
    {'position' : 'relative',
     'border-top' : border,
     'border-bottom' : border,
     'box-sizing' : 'border-box',
     'overflow' : 'hidden'}
  )
  .share({'imageContainer' : imgContainer, 'containerHeight' : height, 'offset' : offset})

  return bulk

}
