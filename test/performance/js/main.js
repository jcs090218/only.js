/**
 * $File: main.js $
 * $Date: 2019-05-14 15:33:35 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2019 by Shen, Jen-Chieh $
 */

"use strict";

/**
 * For performance testing.
 */

// Configure all the settings.
only.Config.FPS = 30;
only.Config.TITLE = "Test - Performance!";

only.Config.RESIZE_MODE = 1;
only.Config.TARGET_SCREEN_WIDTH = 1920;
only.Config.TARGET_SCREEN_HEIGHT = 1080;

// Register all events.
only.Event.registerInit(init);
only.Event.registerUpdate(update);

only.init();  // This should be last called.


function init() {
  let spawns = 500;

  for (let index = 0; index < spawns; ++index) {
    let newObj = new only.Object('#world_' + index, true);
    let newAnim = new only.Animation('../images/CrazyCat/summon.stand_', 4, '.png', 150);
    newObj.addAnimation('stand', newAnim);
    newObj.left = only.Util.getRandomFloat(0, only.Config.TARGET_SCREEN_WIDTH);
    newObj.top = only.Util.getRandomFloat(0, only.Config.TARGET_SCREEN_HEIGHT);
  }
}

function update() {
  // console.log("Runs!!");
}
