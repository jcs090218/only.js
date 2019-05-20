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

only.Screen.CURRENT_WIDTH = -1;
only.Screen.CURRENT_HEIGHT = -1;

only.Screen.LAST_WIDTH = -1;
only.Screen.LAST_HEIGHT = -1;

// Resize once after initialization. This prevent any
// resize event before the app is done initilaized.
only.Screen.INIT_RESIZE = false;

// Is currently resizing? For resizing guarde.
only.Screen.RESIZING = false;

only.Screen.RESIZE_LEFT = 0;
only.Screen.RESIZE_TOP = 0;
only.Screen.RESIZE_SCALE = 1;

only.Screen.MASK_COLOR = 'black';
only.Screen.MASK_Z_INDEX = 100;
only.Screen.MASK_LEFT = null;
only.Screen.MASK_RIGHT = null;
only.Screen.MASK_TOP = null;
only.Screen.MASK_BOTTOM = null;


only.Screen.width = function () {
  return window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
};

only.Screen.height = function () {
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
  mask.opacity = 0.3;  // TODO: Delete this line after test.
  return mask;
};

only.Screen.isMaskObject = function (obj) {
  return obj.selectorId == '#mask_top' ||
    obj.selectorId == '#mask_bottom' ||
    obj.selectorId == '#mask_left' ||
    obj.selectorId == '#mask_right';
};

/** Everytime resize the window. */
only.Screen.onResize = function () {
  // Check already if app initialized and at resize once?
  if (!only.Screen.INIT_RESIZE)
    return;

  only.Screen.RESIZING = true;

  let screenWidth = only.Screen.width();
  let screenHeight = only.Screen.height();

  switch (only.Config.RESIZE_MODE) {
  case 0:
    only.Screen.resizeFullEdge(screenWidth, screenHeight);
    break;
  case 1:
    only.Screen.resizePerspective(screenWidth, screenHeight);
    break;
  }

  only.Screen.RESIZING = false;
};

/** Resize to the current window size. */
only.Screen.onResizeCurrent = function () {
  // Check already if app initialized and at resize once?
  if (!only.Screen.INIT_RESIZE)
    return;

  only.Screen.RESIZING = true;

  let screenWidth = only.Screen.width();
  let screenHeight = only.Screen.height();

  switch (only.Config.RESIZE_MODE) {
  case 0:
    only.Screen.resizeFullEdgeCurrent(screenWidth, screenHeight);
    break;
  case 1:
    only.Screen.resizePerspectiveCurrent(screenWidth, screenHeight);
    break;
  }

  only.Screen.RESIZING = false;
};


/* Resize screen by picking the larger side. */
only.Screen.resizeFullEdge = function (sw, sh) {
  let wScale = sw / only.Config.TARGET_SCREEN_WIDTH;
  let hScale = sh / only.Config.TARGET_SCREEN_HEIGHT;

  let targetScale = (wScale > hScale) ? hScale : wScale;

  // NOTE: The `width` and `height` that play can see, not
  // including the black masks.
  only.Screen.CURRENT_WIDTH = only.Config.TARGET_SCREEN_WIDTH * targetScale;
  only.Screen.CURRENT_HEIGHT = only.Config.TARGET_SCREEN_HEIGHT * targetScale;

  let wRatio = only.Screen.CURRENT_WIDTH / only.Screen.LAST_WIDTH;
  let hRatio = only.Screen.CURRENT_HEIGHT / only.Screen.LAST_HEIGHT;

  let lrWidth = (sw - only.Screen.CURRENT_WIDTH) / 2;
  let tbHeight = (sh - only.Screen.CURRENT_HEIGHT) / 2;

  only.Render.OBJECT_LIST.forEach(function (obj) {
    only.Screen.resizeFullEdgeObject(obj,
                                     sw, sh,
                                     lrWidth, tbHeight,
                                     targetScale);
  });

  only.Screen.RESIZE_LEFT = lrWidth;
  only.Screen.RESIZE_TOP = tbHeight;
  only.Screen.RESIZE_SCALE = targetScale;

  only.Screen.LAST_WIDTH = sw;
  only.Screen.LAST_HEIGHT = sh;
};

/* Resize screen by picking the larger side to current window size. */
only.Screen.resizeFullEdgeCurrent = function (sw, sh) {
  let wScale = sw / only.Config.TARGET_SCREEN_WIDTH;
  let hScale = sh / only.Config.TARGET_SCREEN_HEIGHT;

  let targetScale = (wScale > hScale) ? hScale : wScale;

  // NOTE: The `width` and `height` that play can see, not
  // including the black masks.
  only.Screen.CURRENT_WIDTH = only.Config.TARGET_SCREEN_WIDTH * targetScale;
  only.Screen.CURRENT_HEIGHT = only.Config.TARGET_SCREEN_HEIGHT * targetScale;

  let wRatio = only.Screen.CURRENT_WIDTH / only.Screen.LAST_WIDTH;
  let hRatio = only.Screen.CURRENT_HEIGHT / only.Screen.LAST_HEIGHT;

  let lrWidth = (sw - only.Screen.CURRENT_WIDTH) / 2;
  let tbHeight = (sh - only.Screen.CURRENT_HEIGHT) / 2;

  only.Render.NEW_OBJECTS.forEach(function (obj) {
    obj.left *= targetScale;
    obj.top *= targetScale;
    obj.scaleX *= targetScale;
    obj.scaleY *= targetScale;

    obj.left += lrWidth;
    obj.top += tbHeight;
  });
};

/* Resize screen on perspective. */
only.Screen.resizePerspective = function (sw, sh) {
  let wRatio = sw / only.Screen.CURRENT_WIDTH;
  let hRatio = sh / only.Screen.CURRENT_HEIGHT;

  only.Render.OBJECT_LIST.forEach(function (obj) {
    only.Screen.resizePerspectiveObject(obj, wRatio, hRatio);
  });

  only.Screen.CURRENT_WIDTH = sw;
  only.Screen.CURRENT_HEIGHT = sh;
};

/* Resize screen on perspective to current window size. */
only.Screen.resizePerspectiveCurrent = function (sw, sh) {
  let wRatio = sw / only.Config.TARGET_SCREEN_WIDTH;
  let hRatio = sh / only.Config.TARGET_SCREEN_HEIGHT;

  only.Render.NEW_OBJECTS.forEach(function (obj) {
    only.Screen.resizePerspectiveObject(obj, wRatio, hRatio);
  });
};

/* Apply one object, resize screen by picking the larger side. */
only.Screen.resizeFullEdgeObject = function (obj,
                                             sw, sh,
                                             lrWidth, tbHeight,
                                             targetScale) {
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
    obj.scaleX /= only.Screen.RESIZE_SCALE;
    obj.scaleY /= only.Screen.RESIZE_SCALE;
    /******** Before apply ********/

    obj.left *= targetScale;
    obj.top *= targetScale;
    obj.scaleX *= targetScale;
    obj.scaleY *= targetScale;

    /******** After apply ********/
    obj.left += lrWidth;
    obj.top += tbHeight;
  }
};

/* Apply one object, resize screen on perspective. */
only.Screen.resizePerspectiveObject = function (obj, wRatio, hRatio) {
  obj.left *= wRatio;
  obj.top *= hRatio;
  obj.scaleX *= wRatio;
  obj.scaleY *= hRatio;
};
