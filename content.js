
var fs = require('fs');

module.exports = function(filename){
  return fs.readFileSync('./content/' + filename, 'utf8').replace(/\n/g, ' ')
}
