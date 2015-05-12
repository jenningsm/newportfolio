
var Element = require('/home/mjennings/pagebuilder/html.js')
var templates = require('./templates.js')

var body = new Element('div')
.content("My name is Michael Jennings and blah blah blah" +
         " whatever gets said here that's what I say.")

module.exports = templates.page("ABOUT ME", body)
