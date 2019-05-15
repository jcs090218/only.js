/**
 * $File: animation.js $
 * $Date: 2019-05-10 23:08:18 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2019 by Shen, Jen-Chieh $
 */

"use strict";

if (typeof only === 'undefined') var only = { };


/**
 * Constructor
 * @param { string } base : Base animation name.
 * @param { integer } frames : Total frame count.
 * @param { string } ext : Animation extension.
 * @param { float } time : Time per frame.
 * @param { integer } startFrame : Starting frame, default to 0.
 */
only.Animation = function (base, frames, ext, time, startFrame = 0) {
  this.object = null;

  this.base = base;
  this.frames = frames;
  this.ext = ext;
  this.__time = time / 1000;

  this.width = 0;
  this.height = 0;

  this.offsetX = 0;
  this.offsetY = 0;

  this.startFrame = startFrame;         // The first frame.
  this.endFrame = frames + startFrame;  // The last frame.
  this.currentFrame = startFrame;
  this.timer = 0.0;

  // Check if this animation the first animation in the `object`.
  this.firstAnim = false;
  this.revived = false;
  this.imageLoaded = false;  // Check if at least one image loaded.
};

only.Animation.prototype = {
  get time () { return this.__time; },
  set time (val) { this.__time = val / 1000; },
};

/** Construct the current frame's file path. */
only.Animation.prototype.getFrameName = function (frame = -1) {
  let targetFrame = this.currentFrame;
  if (frame != -1)
    targetFrame = frame;
  return this.base + targetFrame + this.ext;
};

/** Revive the animation after switch to the new animation. */
only.Animation.prototype.reviveAnimation = function () {
  if (this.revived || !this.imageLoaded)
    return;
  this.revived = true;
  this.object.width = this.width;
  this.object.height = this.height;
  this.object.top -= (this.height / 2) + this.offsetX;
  this.object.left -= (this.width / 2) + this.offsetY;
  this.updateFrame(this.startFrame);
};

/** Restore the animation before switching animation. */
only.Animation.prototype.restoreAnimation = function () {
  if (!this.revived)
    return;
  this.revived = false;
  this.object.top += (this.height / 2) + this.offsetX;
  this.object.left += (this.width / 2) + this.offsetY;
};

/** Update the current frame. */
only.Animation.prototype.updateFrame = function (frame = -1) {
  if (frame != -1)
    this.currentFrame = frame;
  this.object.backgroundImage = 'url("' + this.getFrameName() + '")';
};

/** Preload all images to prevent flickering. */
only.Animation.prototype.preloadImages = function () {
  let self = this;
  for (let cnt = this.startFrame; cnt < this.endFrame; ++cnt) {
    let imagePath = this.getFrameName(cnt);

    // NOTE: Here we use dictionary so we can save the duplicated
    // resource loading.
    if (only.Resource.PRELOADED_IMAGES[imagePath] != undefined)
      continue;

    let image = new Image();

    image.onload = function () {
      self.imageLoaded = true;

      self.width = this.naturalWidth;
      self.height = this.naturalHeight;
      if (self.firstAnim)
        self.reviveAnimation();

      // Push loaded flag.
      only.Resource.LOADED_IMAGES_FLAGS.push(true);

      only.Resource.loadedInit();
    };

    image.src = imagePath;

    // Save to preloaded resource memory.
    only.Resource.PRELOADED_IMAGES[imagePath] = image;
  }
};

/** Initialize animation - core loop. */
only.Animation.prototype.init = function (obj) {
  this.object = obj;
  if (this.object.currentAnimId == '')
    this.firstAnim = true;
  this.preloadImages();
};

/** Update animation - core loop. */
only.Animation.prototype.update = function () {
  this.timer += only.Time.FIXED_TIME;

  if (this.timer < this.time)
    return;

  this.updateFrame();

  ++this.currentFrame;

  if (this.currentFrame >= this.endFrame)
    this.currentFrame = this.startFrame;

  this.timer = 0.0;
};
