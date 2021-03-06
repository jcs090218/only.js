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

// Resize once after initialization. This prevent any
// resize event before the app is done initilaized.
only.Screen.INIT_RESIZE = false;

// Is currently resizing? For resizing guarde.
only.Screen.RESIZING = false;

/* Full Edge */
only.Screen.CURRENT_WIDTH = -1;
only.Screen.CURRENT_HEIGHT = -1;

only.Screen.LAST_WIDTH = -1;
only.Screen.LAST_HEIGHT = -1;

only.Screen.RESIZE_LEFT = 0;
only.Screen.RESIZE_TOP = 0;
only.Screen.RESIZE_SCALE = 1;

/* Perspective */
only.Screen.RESIZE_SCALE_W = 1;
only.Screen.RESIZE_SCALE_H = 1;

/* Masks */
only.Screen.MASK_COLOR = 'black';
only.Screen.MASK_Z_INDEX = 100;
only.Screen.MASK_OPACITY = 1.0;
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
  if (only.Config.RESIZE_MODE == 1)
    only.Screen.initMasks();
};

only.Screen.initMasks = function () {
  only.Screen.MASK_TOP = only.Screen.initMask('#mask_top');
  only.Screen.MASK_BOTTOM = only.Screen.initMask('#mask_bottom');
  only.Screen.MASK_LEFT = only.Screen.initMask('#mask_left');
  only.Screen.MASK_RIGHT = only.Screen.initMask('#mask_right');
};

only.Screen.initMask = function (id) {
  let mask = new only.Object(id, true);
  mask.backgroundColor = only.Screen.MASK_COLOR;
  mask.zIndex = only.Screen.MASK_Z_INDEX;
  mask.opacity = only.Screen.MASK_OPACITY;
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
  case 1:
    only.Screen.resizeFullEdge(screenWidth, screenHeight);
    break;
  case 2:
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
  case 1:
    only.Screen.resizeFullEdgeCurrent(screenWidth, screenHeight);
    break;
  case 2:
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
    /* STUDY: This is very weird, but it works! */
    {
      obj.x -= only.Screen.RESIZE_LEFT;
      // obj.y -= only.Screen.RESIZE_TOP;
    }

    let oldWSX = obj.width * obj.scaleX;
    let oldHSY = obj.height * obj.scaleY;

    /******** Start applying *********/

    let realScaleX = obj.scaleX;
    let realScaleY = obj.scaleY;

    obj.scaleX *= targetScale;
    obj.scaleY *= targetScale;

    obj.x *= targetScale;
    obj.y *= targetScale;

    let newWSX = obj.width * obj.scaleX;
    let newHSY = obj.height * obj.scaleY;

    let deltaWSX = (newWSX - oldWSX) / 2 / realScaleX;
    let deltaHSY = (newHSY - oldHSY) / 2 / realScaleY;

    obj.x += deltaWSX;
    obj.y += deltaHSY;

    obj.x += lrWidth;
    obj.y += tbHeight;
  });
};

/* Resize screen on perspective. */
only.Screen.resizePerspective = function (sw, sh) {
  let wScale = sw / only.Config.TARGET_SCREEN_WIDTH;
  let hScale = sh / only.Config.TARGET_SCREEN_HEIGHT;

  only.Render.OBJECT_LIST.forEach(function (obj) {
    only.Screen.resizePerspectiveObject(obj, wScale, hScale);
  });

  only.Screen.RESIZE_SCALE_W = wScale;
  only.Screen.RESIZE_SCALE_H = hScale;
};

/* Resize screen on perspective to current window size. */
only.Screen.resizePerspectiveCurrent = function (sw, sh) {
  let wScale = sw / only.Config.TARGET_SCREEN_WIDTH;
  let hScale = sh / only.Config.TARGET_SCREEN_HEIGHT;

  only.Render.NEW_OBJECTS.forEach(function (obj) {
    let oldWSX = obj.width * obj.scaleX;
    let oldHSY = obj.height * obj.scaleY;

    /******** Start applying *********/

    let realScaleX = obj.scaleX;
    let realScaleY = obj.scaleY;

    obj.scaleX *= wScale;
    obj.scaleY *= hScale;

    obj.x *= wScale;
    obj.y *= hScale;

    let newWSX = obj.width * obj.scaleX;
    let newHSY = obj.height * obj.scaleY;

    let deltaWSX = (newWSX - oldWSX) / 2 / realScaleX;
    let deltaHSY = (newHSY - oldHSY) / 2 / realScaleY;

    obj.x += deltaWSX;
    obj.y += deltaHSY;
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
    obj.x -= only.Screen.RESIZE_LEFT;
    obj.y -= only.Screen.RESIZE_TOP;

    let oldWSX = obj.width * obj.scaleX;
    let oldHSY = obj.height * obj.scaleY;

    obj.x /= only.Screen.RESIZE_SCALE;
    obj.y /= only.Screen.RESIZE_SCALE;

    obj.scaleX /= only.Screen.RESIZE_SCALE;
    obj.scaleY /= only.Screen.RESIZE_SCALE;

    /******** Start applying *********/

    let realScaleX = obj.scaleX;
    let realScaleY = obj.scaleY;

    obj.scaleX *= targetScale;
    obj.scaleY *= targetScale;

    obj.x *= targetScale;
    obj.y *= targetScale;

    let newWSX = obj.width * obj.scaleX;
    let newHSY = obj.height * obj.scaleY;

    let deltaWSX = (newWSX - oldWSX) / 2 / only.Screen.RESIZE_SCALE / realScaleX;
    let deltaHSY = (newHSY - oldHSY) / 2 / only.Screen.RESIZE_SCALE / realScaleY;

    obj.x += deltaWSX;
    obj.y += deltaHSY;

    obj.x += lrWidth;
    obj.y += tbHeight;
  }
};

/* Apply one object, resize screen on perspective. */
only.Screen.resizePerspectiveObject = function (obj, wScale, hScale) {
  let oldWSX = obj.width * obj.scaleX;
  let oldHSY = obj.height * obj.scaleY;

  obj.x /= only.Screen.RESIZE_SCALE_W;
  obj.y /= only.Screen.RESIZE_SCALE_H;

  obj.scaleX /= only.Screen.RESIZE_SCALE_W;
  obj.scaleY /= only.Screen.RESIZE_SCALE_H;

  /******** Start applying *********/

  let realScaleX = obj.scaleX;
  let realScaleY = obj.scaleY;

  obj.scaleX *= wScale;
  obj.scaleY *= hScale;

  obj.x *= wScale;
  obj.y *= hScale;

  let newWSX = obj.width * obj.scaleX;
  let newHSY = obj.height * obj.scaleY;

  let deltaWSX = (newWSX - oldWSX) / 2 / only.Screen.RESIZE_SCALE_W / realScaleX;
  let deltaHSY = (newHSY - oldHSY) / 2 / only.Screen.RESIZE_SCALE_H / realScaleY;

  obj.x += deltaWSX;
  obj.y += deltaHSY;
};
