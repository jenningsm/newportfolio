var Element = require('/home/mjennings/pagebuilder/html.js')
var styles = require('./styles.js')
var xsvg = require('./graphics/x.js')
var color = require('./color.js')
var util = require('./util.js')
var flex = util.flex


var html = new Element('html').style(
  {'margin' : '0', 'padding' : '0'}
)
var body = new Element('body').style({
 'margin' : '0',
 'padding' : '0',
 'font-family' : "'Open Sans Condensed', sans serif",
 'font-weight' : '400', 
 'font-size' : '1.3em',
 'text-align' : 'center'
})

/*
  sectionsInfo contains the following information for each section:

    name: the name which the client side code uses to reference that section
    menuTitle: the title that will appear in that section's entry in the main
               menu. If menuTitle is undefined, that section will not appear
               in the main menu
*/
var sectionsInfo = [
  {'name' : 'about', 'menuTitle' : 'ABOUT'}, 
  {'name' : 'experience', 'menuTitle' : 'EXPERIENCE'}, 
  {'name' : 'projects', 'menuTitle' : 'PROJECTS'}, 
  {'name' : 'contact', 'menuTitle' : 'CONTACT'} 
]

//the height, as a proportion of the viewport height, of the header bar
var headerHeight = .16
//the ratio of parallax image movement to page scrolling
var parallaxRatio = .5
//the vertical margin on the suns
var vertMargin = '50px'


         /*  -----------  THE VISTAS   ----------  */

var vistaGen = require('./components/vista.js')(parallaxRatio)
var vistas = []
vistas.push(
  vistaGen(1 - 2 * headerHeight, ['FRONT-END DEVELOPER', 'READY FOR ACTION'])
)
vistas.push(
  vistaGen(.5, ['TESTING'], -.2)
)
vistas.push(
  vistaGen(.6, [], -.2)
)


           /*  ---------- THE SUNS ------------ */

var sunGen = require('./graphics/sun.js')
var suns = []
for(var i = 0; i < 6; i++){
  var sun = sunGen('50px')
  suns.push(flex("row", ['100%', ''])(sun).share(sun).style('margin', vertMargin + ' 0'))
}
suns[0].style('margin', '0 0 ' + vertMargin + ' 0')


        /* ------------ THE SECTIONS --------------- */

var sections = {}
for(var i = 0; i < sectionsInfo.length; i++){
  if(sectionsInfo[i].notDone === undefined){
    var name = sectionsInfo[i].name
    sections[name] = require('./components/' + name + '.js')(name)
  }
}

   /* ---------------- PHOTO CREDIT ------------------- */

var photoCredit = new Element('div')
    .style('margin', '20px auto')
    .content(
      "The background photo for this page was take by the Flickr user ",
      util.link("Umnak", "https://www.flickr.com/photos/umnak/14558226377/"),
      "."
    )


        /* ------------- THE SCRIPTS --------------- */

var scripts = [
  new Element('script', 'src', 'cs/viewport.js'),
  new Element('script', 'src', 'cs/parallax.js'),
  new Element('script', 'src', 'cs/motion.js'),
  new Element('script', 'src', 'cs/move.js'),
  new Element('script', 'src', 'cs/sections.js'),
  new Element('script', 'src', 'cs/choiceSections.js'),
  new Element('script', 'src', 'cs/sun.js'),
]


/* ---------------- THE WHOLE SHEBANG ----------------- */

html.content(
  require('./components/head.js'),
  body.content(
    require('./components/header.js')(sectionsInfo, headerHeight),
    vistas[0],
    require('./components/frontBottom.js')(headerHeight),
    suns[0],
    sections.about,
    suns[1],
    sections.projects,
    suns[2],
    vistas[1],
    suns[3],
    sections.experience,
    suns[4],
    sections.contact,
    suns[5],
    photoCredit,
    vistas[2],
    scripts
  )
)

var p = html.generate({
  'sections' : sections,
  'parallax' : {
    'vistas' : vistas,
    //the ratio of scrolling to image parallax
    'ratio' : parallaxRatio,
    //the width of the image divided by the height of the image
    'aspectRatio' : 2.263,
    //the height of the image as a proportion of the viewport height
    'height' : vistaGen()
  },
  'suns' : suns
},true);

var fs = require('fs');
if(p.css !== undefined){
  fs.writeFileSync('o.css', p.css);
}
if(p.js !== undefined){
  fs.writeFileSync('o.js', p.js);
}
fs.writeFileSync('index.html', p.html);
