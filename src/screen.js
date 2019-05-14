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
};

/**
 * When resizing the window.
 */
only.Screen.onResize = function () {
  console.log("Width: " + only.Screen.WIDTH());
  console.log("Height: " + only.Screen.HEIGHT());
};
