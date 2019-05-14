/**
 * $File: performance.js $
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
only.Config.FPS = 120;
only.Config.TITLE = "Test - Performance!";

// Register all events.
only.Event.registerInit(init);
only.Event.registerUpdate(update);

only.init();  // This should be last called.


function init() {

}

function update() {
  console.log("Runs!!");
}
