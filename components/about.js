
var Element = require('/home/mjennings/pagebuilder/html.js')
var styles = require('../styles.js')
var xsvg = require('../x.js')
var color = require('../color.js')
var util = require('../util.js')

var about = util.flex("column", ["100%", ''])

var title = util.underline("ABOUT ME", color.pString, 5).style(
  styles.font("2.5em")
)

var body = new Element('div')
.style({'width' : '50%', 'text-align' : 'center'})
.content("My name is Michael Jennings and blah blah blah" +
         " whatever gets said here that's what I say.")

about(title)
about(body)

module.exports = about()
