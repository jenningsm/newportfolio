
/*
  When you scroll on mobile browsers, the address bar disappears sometimes
  and then reappears later. This causes the viewport size to change. Since
  several of the elements on the page have percentage based heights, those
  elements will be resized when this happens, and the height of the document
  will change. This causes a discontinuous jump,  where the whole page
  shifts a little bit at once. This is not a good thing.

  To stop this we need to calculate how much the size of the document before
  the current scroll position is going to change, and then scroll forward
  or backward that much.

  The server side passes pbr.percentageHeights, which is an array of elements
  that have percentage based heights, in the order they appear on the page.
  Each entry is of the form
 
    { 'element' : <the element>,
      'height' <the height, as a proportion of viewport height> }

  On every resize, we first figure out how much the viewport height has
  changed. Then we go through each of the percentage elements that is before our
  current scroll position, figure out how much the height of each of these
  has changed based on the change of viewport height, sum up those values,
  and scroll forward, or backward, that much. 

*/

//get all the percentage elements
for(var i = 0; i < pbr.percentageHeights.length; i++){
  pbr.percentageHeights[i].element = pbr.percentageHeights[i].element.get()
}

//used for figuring out change in viewport size
var oldViewportHeight = viewportHeight

function unjump(){

  var pos = window.pageYOffset
  var change = viewportHeight - oldViewportHeight

  var shift = 0
  //for each element before our current scroll position
  for(var i = 0; pbr.percentageHeights[i].element.getBoundingClientRect().top < 0; i++){
    shift += change * pbr.percentageHeights[i].height
  } 

  window.scrollTo(0, pos + shift)

  oldViewportHeight = viewportHeight
}

window.addEventListener('resize', unjump)
