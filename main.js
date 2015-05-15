var Element = require('/home/mjennings/pagebuilder/html.js')
var styles = require('./styles.js')
var xsvg = require('./graphics/x.js')
var color = require('./color.js')
var flex = require('./util.js').flex


var html = new Element('html').style(
  {'margin' : '0', 'padding' : '0'}
)

var scripts = [
  new Element('script', 'src', 'cs/viewport.js'),
  new Element('script', 'src', 'cs/parallax.js'),
  new Element('script', 'src', 'cs/motion.js'),
  new Element('script', 'src', 'cs/move.js'),
  new Element('script', 'src', 'cs/sections.js'),
  new Element('script', 'src', 'cs/choiceSections.js'),
  new Element('script', 'src', 'cs/sun.js'),
]

var body = new Element('body').style({
 'margin' : '0',
 'padding' : '0',
 'font-family' : "'Open Sans Condensed', sans serif",
 'font-weight' : '400', 
 'text-align' : 'center'
})

var head = require('./components/head.js')

var headerHeight = .16
var items = [['ABOUT', 'about'], ['EXPERIENCE'], ['PROJECTS', 'projects'], ['CONTACT', 'contact']]

var header = require('./components/header.js')(items, headerHeight)

//the ratio of image movement to page scrolling
var parallaxRatio = .5
var vistaGen = require('./components/vista.js')(parallaxRatio)
var vista = vistaGen(1 - 2 * headerHeight, ['FRONT-END DEVELOPER', 'READY FOR ACTION'])
var secondBulk = vistaGen(.4, ['TESTING'], -.2)

var tagline = new Element('span').content("SEE WHAT I CAN DO")
.style('padding', '20px')

//the bottom part of the viewport at the top of the page
var frontBottom = flex("row", ["100%", 100 * headerHeight + "%"])(
  xsvg('17px'), 0,
  tagline, 0,
  xsvg('17px'), 0
).style(
  styles.font("3.75vmin", "400", "'Open Sans Condensed'")
)

var sunGen = require('./graphics/sun.js')
var suns = []
for(var i = 0; i < 3; i++){
  var sun = sunGen('50px')
  suns.push(flex("row", ['100%', ''])(sun).share(sun))
}
var sun = flex("row", ['100%', ''])(require('./graphics/sun.js')('50px'))

var sections = { 'about' : require('./components/about.js'),
                 'projects' : require('./components/projects.js')}

html.content(
  head,
  body.content(
    header,
    vista,
    frontBottom,
    suns[0],
    sections.about,
    suns[1],
    sections.projects,
    suns[2].style('margin-bottom', '30px'),
    secondBulk,
    new Element('div').style('height', '100%'),
    scripts
  )
)

var p = html.generate({
  'sections' : sections,
  'parallax' : {
    'vistas' : [vista, secondBulk],
    //the ratio of scrolling to image parallax
    'ratio' : parallaxRatio,
    //the width of the image divided by the height of the image
    'aspectRatio' : 2.263,
    //the height of the image as a proportion of the viewport height
    'height' : vistaGen()
  },
  'suns' : suns
},true);

var fs = require('fs');
if(p.css !== undefined){
  fs.writeFileSync('o.css', p.css);
}
if(p.js !== undefined){
  fs.writeFileSync('o.js', p.js);
}
fs.writeFileSync('index.html', p.html);
