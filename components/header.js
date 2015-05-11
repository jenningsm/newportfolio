
var Element = require('/home/mjennings/pagebuilder/html.js')
var styles = require('../styles.js')
var xsvg = require('../x.js')

module.exports = function(items, height){
  var bars = []
  
  for(var i = 0; i < 2; i++){
    var flex = new Element('div').style(styles.flex('row'))
    for(var j = 0; j < items.length / 2; j++){
      flex.content(
        new Element('span')
        .style('flex-grow', 3)
        .content(items[(items.length/2)+j])
      )
      if(j !== (items.length / 2) - 1)
        flex.content(
          xsvg(30, 'px')
          .style('flex-grow', 1)
        )
    }
    bars.push(flex)
  }
  
  return new Element('div').style(
    styles.flex('row'),
    styles.dims('100%', height + '%')
  ).content(
    bars[0],
    new Element('span').style(
     styles.font('7.5vmin', '400', "'Calligraffitti', cursive")
    ).content(
      'MJ'
    ),
    bars[1]
  )
} 
  
  
