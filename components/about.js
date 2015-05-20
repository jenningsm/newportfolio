
var Element = require('/home/mjennings/pagebuilder/html.js')
var templates = require('../templates.js')
var content = require('../content.js')
var util = require('../util.js')

module.exports = function(name, width){
  var body = new Element('div')
  .content(util.linkedParagraphs(content("about")))

  return templates.section("ABOUT ME", body, width)
}
