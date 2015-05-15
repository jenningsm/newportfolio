
var Element = require('/home/mjennings/pagebuilder/html.js')
var templates = require('../templates.js')
var content = require('../content.js')

module.exports = function(name){
  var body = new Element('div')
  .content("<p>" + content("about").join("</p><p>") + "</p>")

  return templates.section("ABOUT ME", body)
}
