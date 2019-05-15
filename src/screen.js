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

only.Screen.INIT_RESIZE = false;  // Resize once after initialization.

only.Screen.CURRENT_WIDTH = -1;
only.Screen.CURRENT_HEIGHT = -1;

only.Screen.RESIZE_SCALE = 1;

only.Screen.MASK_COLOR = 'black';
only.Screen.MASK_Z_INDEX = 100;
only.Screen.MASK_LEFT = null;
only.Screen.MASK_RIGHT = null;
only.Screen.MASK_TOP = null;
only.Screen.MASK_BOTTOM = null;


only.Screen.Width = function () {
  return window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
};

only.Screen.Height = function () {
  return window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
};

only.Screen.init = function () {
  window.onresize = only.Screen.onResize;
  only.Screen.CURRENT_WIDTH = only.Config.TARGET_SCREEN_WIDTH;
  only.Screen.CURRENT_HEIGHT = only.Config.TARGET_SCREEN_HEIGHT;
  if (only.Config.RESIZE_MODE == 0)
    only.Screen.initMask();
};

only.Screen.initMask = function () {
  only.Screen.MASK_TOP = new only.Object('#mask_top', true);
  only.Screen.MASK_TOP.backgroundColor = only.Screen.MASK_COLOR;
  only.Screen.MASK_TOP.zIndex = only.Screen.MASK_Z_INDEX;

  only.Screen.MASK_BOTTOM = new only.Object('#mask_bottom', true);
  only.Screen.MASK_BOTTOM.backgroundColor = only.Screen.MASK_COLOR;
  only.Screen.MASK_BOTTOM.zIndex = only.Screen.MASK_Z_INDEX;

  only.Screen.MASK_LEFT = new only.Object('#mask_left', true);
  only.Screen.MASK_LEFT.backgroundColor = only.Screen.MASK_COLOR;
  only.Screen.MASK_LEFT.zIndex = only.Screen.MASK_Z_INDEX;

  only.Screen.MASK_RIGHT = new only.Object('#mask_right', true);
  only.Screen.MASK_RIGHT.backgroundColor = only.Screen.MASK_COLOR;
  only.Screen.MASK_RIGHT.zIndex = only.Screen.MASK_Z_INDEX;
};

/**
 * When resizing the window.
 */
only.Screen.onResize = function () {
  // Check already if app initialized and at resize once?
  if (!only.Screen.INIT_RESIZE)
    return;

  let screenWidth = only.Screen.Width();
  let screenHeight = only.Screen.Height();

  switch (only.Config.RESIZE_MODE) {
  case 1:
    only.Screen.resizePerspective(screenWidth, screenHeight);
    break;
  default:
    only.Screen.resizeFullEdge(screenWidth, screenHeight);
    break;
  }

  only.Screen.CURRENT_WIDTH = screenWidth;
  only.Screen.CURRENT_HEIGHT = screenHeight;
};

/* Resize screen by picking the larger side. */
only.Screen.resizeFullEdge = function (sw, sh) {
  let wScale = sw / only.Config.TARGET_SCREEN_WIDTH;
  let hScale = sh / only.Config.TARGET_SCREEN_HEIGHT;

  let targetScale = (wScale > hScale) ? hScale : wScale;

  let wDelta = only.Screen.CURRENT_WIDTH / wScale;
  let hDelta = only.Screen.CURRENT_HEIGHT / hScale;

  only.Render.OBJECT_LIST.forEach(function (obj) {
    obj.scaleX /= only.Screen.RESIZE_SCALE;
    obj.scaleY /= only.Screen.RESIZE_SCALE;

    obj.scaleX *= targetScale;
    obj.scaleY *= targetScale;
  });

  only.Screen.RESIZE_SCALE = targetScale;
};

/* Resize screen on perspective. */
only.Screen.resizePerspective = function (sw, sh) {
  let wRatio = sw / only.Screen.CURRENT_WIDTH;
  let hRatio = sh / only.Screen.CURRENT_HEIGHT;

  only.Render.OBJECT_LIST.forEach(function (obj) {
    obj.left *= wRatio;
    obj.top *= hRatio;
    obj.scaleX *= wRatio;
    obj.scaleY *= hRatio;
  });
};
