/**
 * $File: main.js $
 * $Date: 2019-05-14 13:41:14 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2019 by Shen, Jen-Chieh $
 */

"use strict";


// Configure all the settings.
only.Config.FPS = 30;
only.Config.TITLE = "Scaling Example";

// Register all events.
only.Event.registerInit(init);
only.Event.registerUpdate(update);

only.init();  // This should be last called.


var disObj = null;

function init () {
  // Create display object ready for adding animation to it.
  disObj = new only.Object('#disObj');

  disObj.width = 50;
  disObj.height = 50;
  disObj.top = 100;
  disObj.left = 100;
  disObj.backgroundColor = 'red';
  disObj.opacity = 0.5;
}

function update () {
  disObj.scaleX += 1 * only.Time.FIXED_TIME;
  // disObj.scaleY += 100 * only.Time.FIXED_TIME;
}
