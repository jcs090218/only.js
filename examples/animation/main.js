/**
 * $File: main.js $
 * $Date: 2019-05-14 12:53:29 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2019 by Shen, Jen-Chieh $
 */

"use strict";


// Configure all the settings.
only.Config.FPS = 30;
only.Config.TITLE = "Animation Example";

// Register all events.
only.Event.registerInit(init);

only.init();  // This should be last called.


function init () {
  // Create display object ready for adding animation to it.
  let disObj = new only.Object('#disObj');

  // Create animation.
  let animIdle = new only.Animation(
    './images/flatboy/Idle (',  // Path
    15,                         // Frames
    ').png',                    // Extension
    150,                        // Speed
    1);                         // Starting Frame, default as 0.

  // Add animation to display object.
  disObj.addAnimation('idle', animIdle);

  // The sprite is abit too large, scale it down.
  disObj.scaleX = 0.5;
  disObj.scaleY = 0.5;
}
