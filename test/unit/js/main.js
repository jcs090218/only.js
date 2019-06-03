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

only.Config.RESIZE_MODE = 2;
only.Config.TARGET_SCREEN_WIDTH = 1852;
only.Config.TARGET_SCREEN_HEIGHT = 977;

// Register all events.
only.Event.registerInit(init);
only.Event.registerUpdate(update);

// Change mask opacity for better seeing.
only.Screen.MASK_OPACITY = 0.3;

only.init();  // This should be last called.


var greenBox = new only.Object('#greenbox', true);
var index = 0;

function init() {
  greenBox.x = 100;
  greenBox.y = 200;
  greenBox.width = 100;
  greenBox.height = 200;
  greenBox.scaleX = 1.5;
  greenBox.opacity = 0.5;
  greenBox.zIndex = 5;
  greenBox.backgroundColor = 'yellow';

  greenBox.addEventListener('click', function () {
    let newObj = new only.Object('#lol_' + index, true);
    newObj.x = 100;
    newObj.y = 200;
    newObj.width = 100;
    newObj.height = 200;
    newObj.opacity = 0.5;
    newObj.scaleX = 1.5;
    newObj.backgroundColor = 'blue';
    ++index;

    // greenBox.x = 0;
  });

}

function update() {
  // greenBox.rotateZ -= 100 * only.Time.FIXED_TIME;

  // console.log("Runs!!");
}
