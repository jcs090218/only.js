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

only.Screen.RESIZE_LEFT = 0;
only.Screen.RESIZE_TOP = 0;
only.Screen.RESIZE_SCALE_X = 1;
only.Screen.RESIZE_SCALE_Y = 0;
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
    only.Screen.initMasks();
};

only.Screen.initMasks = function () {
  only.Screen.MASK_TOP = only.Screen.initMask('#mask_top');
  only.Screen.MASK_BOTTOM = only.Screen.initMask('#mask_bottom');
  only.Screen.MASK_LEFT = only.Screen.initMask('#mask_left');
  only.Screen.MASK_RIGHT = only.Screen.initMask('#mask_right');

  only.Screen.MASK_TOP.top = 0;
  only.Screen.MASK_BOTTOM.top = only.Config.TARGET_SCREEN_HEIGHT;
  only.Screen.MASK_LEFT.left = 0;
  only.Screen.MASK_RIGHT.left = only.Config.TARGET_SCREEN_WIDTH;
};

only.Screen.initMask = function (id) {
  let mask = new only.Object(id, true);
  mask.backgroundColor = only.Screen.MASK_COLOR;
  mask.zIndex = only.Screen.MASK_Z_INDEX;
  return mask;
};

only.Screen.isMaskObject = function (obj) {
  return obj.selectorId == '#mask_top' ||
    obj.selectorId == '#mask_bottom' ||
    obj.selectorId == '#mask_left' ||
    obj.selectorId == '#mask_right';
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

  let ratioSW = only.Config.TARGET_SCREEN_WIDTH * targetScale;
  let ratioSH = only.Config.TARGET_SCREEN_HEIGHT * targetScale;

  let wRatio = ratioSW / only.Screen.CURRENT_WIDTH;
  let hRatio = ratioSH / only.Screen.CURRENT_HEIGHT;

  let lrWidth = (sw - ratioSW) / 2;
  let tbHeight = (sh - ratioSH) / 2;

  only.Render.OBJECT_LIST.forEach(function (obj) {
    if (only.Screen.isMaskObject(obj)) {
      if (obj.selectorId == '#mask_top' || obj.selectorId == '#mask_bottom') {
        obj.width = sw;
        obj.height = tbHeight;
      } else {
        obj.width = lrWidth;
        obj.height = sh;
      }

      switch (obj.selectorId) {
      case '#mask_top':
        obj.top = 0;
        break;
      case '#mask_bottom':
        obj.top = sh - Math.abs(tbHeight);
        break;
      case '#mask_left':
        obj.left = 0;
        break;
      case '#mask_right':
        obj.left = sw - Math.abs(lrWidth);
        break;
      }

    } else {
      obj.left -= only.Screen.RESIZE_LEFT;
      obj.top -= only.Screen.RESIZE_TOP;

      obj.left /= only.Screen.RESIZE_SCALE;
      obj.top /= only.Screen.RESIZE_SCALE;
      // obj.scaleX /= only.Screen.RESIZE_SCALE;
      // obj.scaleY /= only.Screen.RESIZE_SCALE;
      /******** Before apply ********/

      obj.left *= targetScale;
      obj.top *= targetScale;
      // obj.scaleX *= targetScale;
      // obj.scaleY *= targetScale;

      /******** After apply ********/
      obj.left += lrWidth;
      obj.top += tbHeight;
    }
  });

  only.Screen.RESIZE_LEFT = lrWidth;
  only.Screen.RESIZE_TOP = tbHeight;
  only.Screen.RESIZE_SCALE_X = wRatio;
  only.Screen.RESIZE_SCALE_Y = hRatio;
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
