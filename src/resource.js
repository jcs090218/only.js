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

only.Resource.LOADED_IMAGES_FLAGS = [];

/* When all resource is loaded, call this. */
only.Resource.loadedInit = function () {
  if (only.Resource.allImagesLoaded()) {
    only.Screen.INIT_RESIZE = true;
    only.Screen.onResize();
  }
};

/* Check if all images are loaded. */
only.Resource.allImagesLoaded = function () {
  return only.Resource.LOADED_IMAGES_FLAGS.length ==
    only.Util.dictionaryLength(only.Resource.PRELOADED_IMAGES);
};
