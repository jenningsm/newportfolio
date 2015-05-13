
var fs = require('fs');

//takes the name of a file and returns an array containing
//each of the paragraphs in that file
module.exports = function(filename){
  var text = fs.readFileSync('./content/' + filename, 'utf8')
  text = text.split("\n\n")
  
  for(var i = 0; i < text.length; i++){
    var block = text[i].replace(/\n/g, ' ')
    if(block.replace(/\s*/, '') === ''){
      text.splice(i, 1)
    } else {
      text[i] = block.replace(/^\s*/g, '').replace(/\s*$/g, '')
    }
  }

  return text
}
