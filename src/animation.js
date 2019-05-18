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
  this.frames = frames;  // Total frames.
  this.ext = ext;
  this.__time = time / 1000;

  this.width = 0;
  this.height = 0;

  this.startFrame = startFrame;         // The first frame.
  this.endFrame = frames + startFrame;  // The last frame.
  this.currentFrame = startFrame;
  this.timer = 0.0;

  // Check if this animation the first animation in the `object`.
  this.firstAnim = false;
  this.revived = false;
  this.imageLoaded = false;  // Check if at least one image loaded.

  this.offsetX = 0;
  this.offsetY = 0;
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
  this.object.left += this.offsetX;
  this.object.top += this.offsetY;
  this.updateFrame(this.startFrame);
};

/** Restore the animation before switching animation. */
only.Animation.prototype.restoreAnimation = function () {
  if (!this.revived)
    return;
  this.revived = false;
  this.object.left -= this.offsetX;
  this.object.top -= this.offsetY;
};

/** Update the current frame. */
only.Animation.prototype.updateFrame = function (frame = -1) {
  if (frame != -1)
    this.currentFrame = frame;
  this.object.backgroundImage = 'url("' + this.getFrameName() + '")';
};

/** On load image callback for animation. */
only.Animation.onloadImage = function (self, img, imagePath = null) {
  self.imageLoaded = true;

  self.width = img.naturalWidth;
  self.height = img.naturalHeight;

  // Build object's animation with first animation.
  if (self.firstAnim)
    self.reviveAnimation();

  // NOTE: We will only need to solve `dupAnims` when
  // `imagePath` is passed in.
  if (imagePath != null) {
    only.Animation.solveDupAnims(imagePath);

    // Push loaded flag.
    ++only.Resource.LOADED_IMAGES_FLAGS;
  }

  only.Resource.loadedInit();
};

/** Solve all animations that use the same image resouce. */
only.Animation.solveDupAnims = function (imagePath) {
  let imageData = only.Resource.PRELOADED_IMAGES[imagePath];
  imageData.dupAnims.forEach(function (anim) {
    only.Animation.onloadImage(anim, imageData.image);
  });
  imageData.dupAnims = [];  // After solving it, clean it.
};

/** Preload all images to prevent flickering. */
only.Animation.prototype.preloadImages = function () {
  for (let cnt = this.startFrame; cnt < this.endFrame; ++cnt) {
    let imagePath = this.getFrameName(cnt);

    // NOTE: Here we use dictionary so we can save the duplicated
    // resource loading.
    let imageData = only.Resource.PRELOADED_IMAGES[imagePath];

    if (imageData != undefined) {
      let image = imageData.image;

      // Check image loaded, if loaded `width` or `height` should
      // not be 0.
      if (only.Resource.isImageLoaded(image)) {
        only.Animation.onloadImage(this, image);
      } else {
        imageData.dupAnims.push(this);
      }
      continue;
    }

    let self = this;
    let image = new Image();

    image.onload = function () {
      only.Animation.onloadImage(self, this, imagePath);
    };

    // This should do it after `onload` is assigned.
    image.src = imagePath;

    // Save to preloaded resource memory.
    only.Resource.PRELOADED_IMAGES[imagePath] =  {
      image : image,
      dupObjs : [],   // Match `object.js`.
      dupAnims : [],  // Store animations that also use the same image.
    };
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
  if (this.frames <= 1)
    return;

  this.timer += only.Time.FIXED_TIME;

  if (this.timer < this.time)
    return;

  this.updateFrame();

  ++this.currentFrame;

  if (this.currentFrame >= this.endFrame)
    this.currentFrame = this.startFrame;

  this.timer = 0.0;
};
