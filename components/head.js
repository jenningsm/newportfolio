var Element = require('/home/mjennings/pagebuilder/html.js')

function gFont(href){
  return new Element('link').attribute({
    'href' : href,
    'rel' : 'stylesheet',
    'type' : 'text/css'
  })
}

module.exports = new Element('head').content(
  gFont('http://fonts.googleapis.com/css?family=Calligraffitti'),
  gFont('http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300'),
  new Element('link').attribute({
    'href' : 'o.css',
    'rel' : 'stylesheet',
    'type' : 'text/css'
  })
).embedJS()
