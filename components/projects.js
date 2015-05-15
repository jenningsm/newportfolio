
var Element = require('/home/mjennings/pagebuilder/html.js')
var templates = require('../templates.js')
var getContent = require('../content.js')
var util = require('../util.js')

/*
  Projects portion of the site
*/

module.exports = function(name){
  //the different projects
  var options = ['electrodynamics', 'deftly', 'portfolio']
  
  for(var i = 0; i < options.length; i++){
    var option = getContent("projects/" + options[i])
    var title = option[0]
  
    var content = new Element('div')
  
    //for each paragraph, insert links and put inside a p tag
    for(var j = 1; j < option.length; j++){
      content.content(
        new Element('p').content(
          util.linkify(option[j])
        )
      )
    }
  
    options[i] = {
      //the name of the option
      'name'    : options[i],
      //the title of the option, to appear in the menu
      'title'   : title,
      //the option's content
      'content' : content
    }
  }
  
  
  return templates.selectionSection(name, 'PROJECTS', options)
} 
  
