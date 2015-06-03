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
 'font-weight' : '300', 
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
  {'name' : 'projects', 'menuTitle' : 'PROJECTS'}, 
  {'name' : 'experience', 'menuTitle' : 'EXPERIENCE'}, 
  {'name' : 'contact', 'menuTitle' : 'CONTACT'} 
]

//the height, as a proportion of the viewport height, of the header bar
var headerHeight = .2
//the ratio of parallax image movement to page scrolling
var parallaxRatio = .5
//the vertical margin on the suns
var vertMargin = '50px'
//the width of each page, as a media query
var pageWidth = util.mediaWidth(800, {'width' : '80%'}, {'width' : '60%'})


      /* ------------------ THE CURTAIN ----------------- */

//a blank white div that covers the whole viewport until the page loads
var curtain = new Element('div')
.style(
  styles.dims('100%', '100%'),
  {'position' : 'absolute',
   'z-index' : '10',
   'pointer-events' : 'none',
   'background' : 'white' }
)


       /* ---------------- THE HEADER ----------------*/

var header = require('./components/header.js')(sectionsInfo, headerHeight)

         /*  -----------  THE VISTAS   ----------  */

var vistaGen = require('./components/vista.js')(parallaxRatio)
var vistas = []
vistas.push(
  vistaGen(1 -  headerHeight, ['FRONT-END DEVELOPER', 'READY FOR ACTION'])
)
vistas.push(
  vistaGen(.55, ['BUILDING BEAUTIFUL WEBSITES'])
)
vistas.push(
  vistaGen(1 - 2 * headerHeight, [])
)

//to be shared with the client side
//for an explanation of why it is needed, see cs/unjump.js
percentageHeights = [{'element' : vistas[0], 'height' : 1 - headerHeight},
                {'element' : header, 'height' : headerHeight},
                {'element' : vistas[1], 'height' : .55},
                {'element' : vistas[2], 'height' : 1 - 2 * headerHeight}]
               

           /*  ---------- THE SUNS ------------ */

var sunGen = require('./graphics/sun.js')

var suns = []
for(var i = 0; i < 6; i++){
  var sun = sunGen('50px')
  suns.push(flex("row", ['100%', ''])(sun).share(sun).style('margin', vertMargin + ' 0'))
}


        /* ------------ THE SECTIONS --------------- */

var sections = {}
for(var i = 0; i < sectionsInfo.length; i++){
  if(sectionsInfo[i].notDone === undefined){
    var name = sectionsInfo[i].name
    sections[name] = require('./components/' + name + '.js')(name)
    //set the width of the section
    sections[name].assign(pageWidth, ['0'])
  }
}

   /* ---------------- PHOTO CREDIT ------------------- */

var photoCredit = new Element('div')
    .style('margin', '15px auto')
    .content(
      "The background photo of this page was taken by the Flickr user ",
      util.link("Umnak", "https://www.flickr.com/photos/umnak/14558226377/"),
      "."
    )
    .assign(pageWidth, [0])


        /* ------------- THE SCRIPTS --------------- */

var scripts = [
  new Element('script', 'src', 'cs/cs.min.js')
/*  new Element('script', 'src', 'cs/transform.js'),
  new Element('script', 'src', 'cs/viewport.js'),
  new Element('script', 'src', 'cs/unjump.js'),
  new Element('script', 'src', 'cs/parallax.js'),
  new Element('script', 'src', 'cs/motion.js'),
  new Element('script', 'src', 'cs/move.js'),
  new Element('script', 'src', 'cs/curtain.js'),
  new Element('script', 'src', 'cs/sections.js'),
  new Element('script', 'src', 'cs/choiceSections.js'),
  new Element('script', 'src', 'cs/sun.js'),*/
]


/* ---------------- THE WHOLE SHEBANG ----------------- */

html.content(
  require('./components/head.js'),
  body.content(
    curtain,
    vistas[0].style('border-top', 'none'),
    header,
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
  'curtain' : curtain,
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
  'suns' : suns,
  //as described in cs/unjump.js
  'percentageHeights' : percentageHeights
},true);

var fs = require('fs');
if(p.css !== undefined){
  fs.writeFileSync('o.css', p.css);
}
if(p.js !== undefined){
  fs.writeFileSync('o.js', p.js);
}
fs.writeFileSync('index.html', p.html);
