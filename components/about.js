
var Element = require('/home/mjennings/pagebuilder/html.js')
var templates = require('./templates.js')
var content = require('../content.js')

var body = new Element('div')
.content(content("about"))

module.exports = templates.page("ABOUT ME", body)
