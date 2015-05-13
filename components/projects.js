
var Element = require('/home/mjennings/pagebuilder/html.js')
var templates = require('../templates.js')
var content = require('../content.js')
var util = require('../util.js')


var pages = ['electrodynamics', 'deftly', 'portfolio']

for(var i = 0; i < pages.length; i++){
  var page = content("projects/" + pages[i])
  var title = page[0]
  var subTitle = new Element("span")

  split = page[1].split(/[(\$\()\)]/).filter(function(e) { return e })

  var open = false
  var linkSpot = page[1].indexOf('$')
  if(linkSpot === 0)
    open = true
  for(var j = 0; j < split.length; j++){
    var item
    if(open){
      item = util.divUnderline(split[j], true, .5).div.style('display' , 'inline-block')
      open = false
    } else {
      item = split[j]
      open = true
    }
    subTitle.content(item)
  }

  page.splice(0, 2)
  var body = "<p>" + page.join("</p><p>") + "</p>"

  pages[i] = [title,
              new Element().content(
                util.flex("row", ["100%", ''])(subTitle).style('margin', '30px 0 25px 0'),
                body
              )]
}

module.exports = templates.selectionPage("PROJECTS", pages)
