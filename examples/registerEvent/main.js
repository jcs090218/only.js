/**
 * $File: main.js $
 * $Date: 2019-05-12 12:29:17 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2019 by Shen, Jen-Chieh $
 */

"use strict";


// Register all events.
only.Event.registerInit(init);
only.Event.registerUpdate(update);

only.init();  // This should be last called.


function init() {
  console.log("Initializing!!");
}

function update() {
  console.log("Updating!!");
}
