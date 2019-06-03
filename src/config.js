/**
 * $File: config.js $
 * $Date: 2019-05-08 22:53:13 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2019 by Shen, Jen-Chieh $
 */

"use strict";

if (typeof only === 'undefined') var only = { };

only.Config = { };
only.Config.FPS = 30;
only.Config.TITLE = "App - only.js";

/**
 * List of resize mode:
 *   0 - Defuault, none.
 *   1 - Resize to one full/larger edge.
 *   2 - Resize by all perspective.
 */
only.Config.RESIZE_MODE = 0;

only.Config.TARGET_SCREEN_WIDTH = 1920;
only.Config.TARGET_SCREEN_HEIGHT = 1080;


only.Config.init = function () {
  document.title = only.Config.TITLE;
};
