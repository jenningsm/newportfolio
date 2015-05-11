var Element = require('/home/mjennings/pagebuilder/html.js')
var styles = require('./styles.js')
var xsvg = require('./x.js')
var color = require('./color.js')



var html = new Element('html').style(
  styles.boxing()
)

var body = new Element('body').style(
  styles.boxing()
)

var head = require('./components/head.js')


var headerHeight = 16
var items = ['ABOUT', 'SKILLS', 'EXPERIENCE', 'EDUCATION', 'CONTACT', 'PROJECTS']

var header = require('./components/header.js')(items, headerHeight)

var bulk = require('./components/bulk.js')(100 - 2 * headerHeight)

html.content(
  head,
  body.content(
    header,
    bulk
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
