var Element = require('/home/mjennings/pagebuilder/html.js')
var templates = require('../templates.js')
var getContent = require('../content.js')
var util = require('../util.js')

/*
  Experience portion of the site
*/

module.exports = function(name, width){
  //The different jobs
  var options = ['dandb', 'amazon', 'viasat']
  
  for(var i = 0; i < options.length; i++){
    var option = getContent("experience/" + options[i])
    var title = option[0]
  
    var paragraphs = util.linkedParagraphs(option.slice(1))

    var optionContent = new Element('div')
    .content(paragraphs)
  
    options[i] = {
      //the name of the option
      'name'    : options[i],
      //the title of the option, to appear in the menu
      'title'   : title,
      //the option's content
      'content' : optionContent
    }
  }
  
  
  return templates.selectionSection(name, 'EXPERIENCE', options, width)
} 
  
