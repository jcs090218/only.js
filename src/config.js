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


only.Config.init = function () {
  document.title = only.Config.TITLE;
};

// TODO(jenchieh): Put this somewhere else.
only.Config.registerUpdate = function (fp) {
  window.setInterval(fp, only.Time.FIXED_TIME * 1000);
};
