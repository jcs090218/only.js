/**
 * $File: resource.js $
 * $Date: 2019-05-14 12:24:49 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2019 by Shen, Jen-Chieh $
 */

"use strict";

if (typeof only === 'undefined') var only = { };

only.Resource = { };
only.Resource.PRELOADED_IMAGES = { };  // Preloaded Images
only.Resource.PRELOADED_SOUNDS = { };  // Preloaded Sounds

only.Resource.LOADED_IMAGES_FLAGS = 0;

only.Resource.update = function () {
  only.Resource.loadedInit();
};

/* When all resource is loaded, call this. */
only.Resource.loadedInit = function () {
  if (!only.Resource.allImagesLoaded())
    return;

  if (!only.Screen.INIT_RESIZE) {
    only.Screen.INIT_RESIZE = true;
    only.Screen.onResize();
  } else {
    only.Screen.onResizeCurrent();
    only.Render.NEW_OBJECTS.forEach(function (obj) {
      obj.initResized = true;
    });
    only.Render.NEW_OBJECTS = [];
  }
};

/**
 * Check if an image is loaded.
 * @param { Image } img : Image object.
 */
only.Resource.isImageLoaded = function (img) {
  return img.naturalWidth != 0 || img.naturalHeight != 0;
};

/* Check if all images are loaded. */
only.Resource.allImagesLoaded = function () {
  return only.Resource.LOADED_IMAGES_FLAGS ==
    only.Util.dictionaryLength(only.Resource.PRELOADED_IMAGES);
};
