/**
 * $File: screen.js $
 * $Date: 2019-05-14 13:56:55 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2019 by Shen, Jen-Chieh $
 */

"use strict";

if (typeof only === 'undefined') var only = { };


only.Screen = { };
only.Screen.MASK_LEFT = null;
only.Screen.MASK_RIGHT = null;
only.Screen.MASK_TOP = null;
only.Screen.MASK_BOTTOM = null;

only.Screen.WIDTH = function () {
  return window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
};

only.Screen.HEIGHT = function () {
  return window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
};

only.Screen.init = function () {
  window.onresize = only.Screen.onResize;
  only.Scree.initMask();
};

only.Screen.initMask = function () {
  only.Screen.MASK_TOP = new only.Object('#mask_top', true);
  only.Screen.MASK_TOP.backgroundColor = 'black';

  only.Screen.MASK_BOTTOM = new only.Object('#mask_bottom', true);
  only.Screen.MASK_BOTTOM.backgroundColor = 'black';

  only.Screen.MASK_LEFT = new only.Object('#mask_left', true);
  only.Screen.MASK_LEFT.backgroundColor = 'black';

  only.Screen.MASK_RIGHT = new only.Object('#mask_right', true);
  only.Screen.MASK_RIGHT.backgroundColor = 'black';
};

/**
 * When resizing the window.
 */
only.Screen.onResize = function () {
  console.log("Width: " + only.Screen.WIDTH());
  console.log("Height: " + only.Screen.HEIGHT());
};
