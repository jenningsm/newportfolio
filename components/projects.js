
var Element = require('/home/mjennings/pagebuilder/html.js')
var templates = require('../templates.js')
var content = require('../content.js')
var util = require('../util.js')


var pages = ['electrodynamics', 'deftly', 'portfolio']

for(var i = 0; i < pages.length; i++){
  var page = content("projects/" + pages[i])
  var title = page[0]

  var description = new Element('div')

  for(var j = 1; j < page.length; j++){
    description.content(new Element('p').content(linkify(page[j])))
  }

  pages[i] = [title, description]
}

module.exports = templates.selectionPage("PROJECTS", pages)



/////////////////////////////////////////////////

function linkify(text){
  split = text.split(/[(\$\()\)]/).filter(function(e) { return e })

  var ret = []

  var open = false
  if(text.indexOf('$') === 0)
    open = true

  for(var j = 0; j < split.length; j++){
    var item
    if(open){
      item = util.spanUnderline(split[j], .5)
      open = false
    } else {
      item = split[j]
      open = true
    }
    ret.push(item)
  }
  return ret
}
