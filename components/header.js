
var Element = require('/home/mjennings/pagebuilder/html.js')
var styles = require('../styles.js')
var xsvg = require('../x.js')
var color = require('../color.js')

module.exports = function(items, height){
  var menus = []
  
  for(var i = 0; i < 2; i++){
    var flex = new Element('div')
   .style(
     styles.flex('row'),
     styles.dims('33%', '100%')
   )
    for(var j = 0; j < items.length / 2; j++){
      flex.content(
        new Element('span')
        .style('flex-grow', 3)
        .content(items[(items.length/2)+j])
      )
      if(j !== (items.length / 2) - 1)
        flex.content(
          xsvg(17, 'px')
          .style('flex-grow', 1)
        )
    }
    menus.push(flex)
  }
  
  function bar(){
    return new Element('div').style(
      styles.dims('22%', '12%'),

      { 'background' : color.pString ,
        'flex-grow' : '1', 'border-radius' : '1px' }
    )
  }

  var center = new Element('div')
  .style(
    styles.flex('row', 'space-between'),
    styles.dims('18%', '100%')
  )
  .content(
    bar(),
    new Element('span').style(
     styles.font('7.5vmin', '400', "'Calligraffitti', cursive"),
     {'flex-grow' : '0', 'padding' : '15px' }
    ).content(
      'MJ'
    ),
    bar()
  )

  return new Element('div').style(
    styles.flex(),
    styles.dims('100%', height + '%'),
    {'text-align' : 'center'},
    styles.font('3.75vmin', '400', "'Open Sans Condensed', sans serif")
  ).content(
    new Element('div').style(
      styles.flex('row', 'space-around'),
      styles.dims('90%', '100%')
    )
    .content(
      menus[0],
      center,
      menus[1]
    )
  )
} 
  
  
