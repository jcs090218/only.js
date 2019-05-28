/**
 * $File: main.js $
 * $Date: 2019-05-08 10:57:12 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2019 by Shen, Jen-Chieh $
 */

"use strict";


// Configure all the settings.
only.Config.FPS = 30;
only.Config.TITLE = "Test - Unit!";

only.Config.RESIZE_MODE = 0;
only.Config.TARGET_SCREEN_WIDTH = 1852;
only.Config.TARGET_SCREEN_HEIGHT = 977;

// Register all events.
only.Event.registerInit(init);
only.Event.registerUpdate(update);

// Change mask opacity for better seeing.
only.Screen.MASK_OPACITY = 0.3;

only.init();  // This should be last called.


var greenBox = new only.Object('#greenbox', true);

function init() {
  // greenBox.left = 0;
  greenBox.top = 10;
  greenBox.left = 1852 - 110;
  // greenBox.left = 0;
  greenBox.width = 100;
  greenBox.height = 200;
  greenBox.opacity = 0.5;
  greenBox.zIndex = 5;
  greenBox.backgroundColor = 'yellow';
}

function update() {
  // greenBox.rotateZ -= 100 * only.Time.FIXED_TIME;

  // console.log("Runs!!");
}
