var Element = require('/home/mjennings/pagebuilder/html.js');

function gFont(href){
  return new Element('link').attribute({
    'href' : href,
    'rel' : 'stylesheet',
    'type' : 'text/css'
  })
}


var head = new Element('head').content(
  gFont('http://fonts.googleapis.com/css?family=Calligraffitti'),
  gFont('http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300'),
  gFont('http://fonts.googleapis.com/css?family=Yanone+Kaffeesatz:300'),
  new Element('link').attribute({
    'href' : 'o.css',
    'rel' : 'stylesheet',
    'type' : 'text/css'
  })
)

var html = new Element('html').style({
  'margin' : '0',
  'padding' : '0'
})

var body = new Element('body').style({
  'margin' : '0',
  'padding' : '0'
})

var headerHeight = 16

var header = new Element('div').style({
  'height' : headerHeight + '%',
  'width' : '100%',
  'display' : 'flex',
  'justify-content' : 'center',
  'align-items' : 'center',
}).content(
  new Element('span').style({
    'font-size' : '7.5vmin',
    'font-family' : "'Calligraffitti', cursive",
    'font-weight' : '400'
  }).content(
    'MJ'
  )
)

var border = '4px solid rgb(210, 180, 100)';

var imgDims = {'width' : '100%', 'height' : (100 - 2 * headerHeight) + '%'}

var img = new Element('img', 'src', './clouds.jpg').style({
    'border-top' : border,
    'border-bottom' : border
  },
  imgDims
)

var text = new Element('div').style(
  imgDims,
  {
    'display' : 'flex',
    'justify-content' : 'center',
    'align-items' : 'center',
    'position' : 'absolute',
    'top' : headerHeight + '%',
    'font-size' : '7vmin',
    'color' : 'rgb(255, 255, 235)',
    'font-weight' : '900',
    'font-family' : "'Open Sans Condensed'"
  }
).content(
  new Element('div').content(
    new Element('span').content('FRONT-END DEVELOPER'),
    new Element('span').content('READY FOR ACTION')
  ).style({
    'display' : 'flex',
    'justify-content' : 'center',
    'align-items' : 'center',
    'flex-direction' : 'column'
  })
)

html.content(
  head,
  body.content(
    header,
    img,
    text
  )
)

var p = html.generate({}, true);

var fs = require('fs');
if(p.css !== undefined){
  fs.writeFileSync('o.css', p.css);
}
if(p.js !== undefined){
  fs.writeFileSync('o.js', p.js);
}
fs.writeFileSync('index.html', p.html);
