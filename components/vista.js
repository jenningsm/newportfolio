var Element = require('/home/mjennings/pagebuilder/html.js')
var color = require('../color.js')
var styles = require('../styles.js')
var util = require('../util.js')
var flex = util.flex

/*
  a vista is a large image area with text overlayed on top of it and an image
  ready to be parallaxed

  parallaxRatio: the amount the image will move as a ratio of the amount scrolled
                 i.e. if parallaxRatio is .5, the image while shift 1px for every
                 2 pixels the page scrolls

  height: height of the vista, as a proportion of the viewport
  text: an array containing each row of text to be displayed over the image
  offset: the vertical offset, as a proportion of the image size, of the image

  if this function is called with no arguments, it will return the height of the
  images it has created so far. This info is needed for the client side code
*/

var imgs = []
var areaHeights = []
var maxHeight = 0

module.exports = function(parallaxRatio){
  return function(height, text, offset){

    //the max height is needed for the client side code
    //if this function is called with no arguments, return
    //the maxHeight
    if(height === undefined)
      return maxHeight
  
    if(text === undefined)
      text = []
    if(offset === undefined)
      offset = 0
  
    //make the img as tall as it needs to be for it to parallax without leaving a
    //visible part of the area's top or bottom with image
  
    //the amount of extra image, in percentage points, we need on both the top and bottom
    var buffer = .5 * (1 - height) * parallaxRatio
  
    var imgHeight = 1 + 2 * buffer / height
    //if the image is offset, it must be bigger in order to fully cover the parallax area
    imgHeight *= 1 + 2 * Math.abs(offset)
  
    //we want all images to be the same dimensions
    //we need to check if this img is larger than all of the previous
    //if it is we need to set all the previous heights to this height
    //if not we need to set this height to the max previous height
  
    //remember that the image height is relative to the vista container height
    //so to get the absolute height, we need to times by the vista container  height
  
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
  
    var imgContainer = flex("column", ['100%', '100%'])(img)
        .style('position', 'absolute')
    
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
  
    var vista = new Element('div')
    .content(imgContainer, textBox)
    .style(
      styles.dims('100%', util.truncate(100 * height, 3) + '%'),
      {'position' : 'relative',
       'border-top' : border,
       'border-bottom' : border,
       'box-sizing' : 'border-box',
       'overflow' : 'hidden'}
    )
  
    return vista
    .share({
      'imageContainer' : imgContainer,
      'image' : img,
      'vistaContainerHeight' : height, 
      'offset' : offset
    })
  } 
}
