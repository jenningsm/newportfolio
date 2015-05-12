var Element = require('/home/mjennings/pagebuilder/html.js')
var styles = require('./styles.js')
var xsvg = require('./x.js')
var color = require('./color.js')
var flex = require('./util.js').flex


var html = new Element('html').style(
  styles.boxing()
)

var body = new Element('body').style(
  styles.boxing(),
  {'font-family' : "'Open Sans Condensed', sans serif", 'font-weight' : '400', 'text-align' : 'center'}
)

var head = require('./components/head.js')


var headerHeight = 16
var items = ['ABOUT', 'SKILLS', 'EXPERIENCE', 'EDUCATION', 'CONTACT', 'PROJECTS']
var items = ['ABOUT', 'EXPERIENCE', 'PROJECTS', 'CONTACT']

var header = require('./components/header.js')(items, headerHeight)

var bulk = require('./components/bulk.js')(100 - 2 * headerHeight)

var tagline = new Element('span').content("SEE WHAT I CAN DO")
.style({'padding' : '20px'})

var frontBottom = flex("row", ["100%", headerHeight + "%"])(
  xsvg(17, "px"), 0,
  tagline, 0,
  xsvg(17, "px"), 0
).style(
  styles.font("3.75vmin", "400", "'Open Sans Condensed'")
)

var sun = flex("row", ['100%', ''])(require('./sun.js')(50, 'px'))

html.content(
  head,
  body.content(
    header,
    bulk,
    frontBottom,
    sun,
    require('./components/about.js'),
    sun,
    require('./components/projects.js')
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
