
var Element = require('/home/mjennings/pagebuilder/html.js')
var templates = require('../templates.js')
var content = require('../content.js')
var util = require('../util.js')

/*
  Projects portion of the site
*/

//the different projects
var pages = ['electrodynamics', 'deftly', 'portfolio']

for(var i = 0; i < pages.length; i++){
  /*
    Each project file contains the title as the first paragraph
    and the description in all the following paragraphs. Links inside
    the projects files are indicated like this:
  
        $(this is the link text)
  */
  var page = content("projects/" + pages[i])
  var title = page[0]

  var description = new Element('div')

  //for each paragraph, insert links and put inside a p tag
  for(var j = 1; j < page.length; j++){
    description.content(new Element('p').content(linkify(page[j])))
  }

  pages[i] = [title, description]
}

module.exports = templates.selectionPage("PROJECTS", pages)



/////////////////////////////////////////////////

/*
   Looks for '$(whatever)' inside a chnages them to links
   Returns an array containing the text and links
*/
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
