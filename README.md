# newportfolio

This is my current portfolio site. It's live at jenningsm.com. It was developed with the element.js Node
library I'm developing that I have not yet documented.

main.js is the main file that puts together all the pieces. 

The components folder contains all thecomponents (e.g. each of the sections, the header, the image sections).

The content folder contains the textual content for each of the sections. It's basically the data store for
an extremely simple CMS I built into this project. The code for getting the content is in content.js and the
code for extracting links from that content is in the linkify() function of util.js.

The cs folder contains all the client-side javascript.

The graphics folder contains the code for generating the little svg x's and sun graphics.

templates.js contains the functions for creating sections.