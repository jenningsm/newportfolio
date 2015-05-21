#!/bin/bash
#remove the # from before the following two lines:
#sudo apt-get install python-pip
#sudo pip install jsmin
python -m jsmin transform.js viewport.js unjump.js parallax.js motion.js move.js curtain.js sections.js choiceSections.js sun.js > cs.min.js 
