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
 *
 * @param { string } base : Base animation name.
 * @param { integer } frames : Total frame count.
 * @param { string } ext : Animation extension.
 * @param { float } time : Time per frame.
 */
only.Animation = function (base, frames, ext, time, width, height) {
  this.base = base;
  this.frames = frames;
  this.ext = ext;
  this.__time = time / 1000;
  this.width = width;
  this.height = height;

  this.currentFrame = 0;
  this.timer = 0.0;
};

only.Animation.prototype = {
  get time () { return this.__time; },
  set time (val) { this.__time = val / 1000; },
};

/** Construct the current frame's file path. */
only.Animation.prototype.getFrameName = function () {
  return this.base + this.currentFrame + this.ext;
};

only.Animation.prototype.updateFrame = function (obj, frame = -1) {
  if (frame != -1)
    this.currentFrame = frame;
  obj.backgroundImage = 'url(' + this.getFrameName() + ')';
  obj.width = this.width;
  obj.height = this.height;
};

/** Initialize animation - core loop. */
only.Animation.prototype.init = function (obj) {
  this.updateFrame(obj);
};

/** Update animation - core loop. */
only.Animation.prototype.update = function (obj) {
  this.timer += only.Time.FIXED_TIME;

  if (this.timer < this.time)
    return;

  this.updateFrame(obj);

  ++this.currentFrame;

  if (this.currentFrame >= this.frames)
    this.currentFrame = 0;

  this.timer = 0.0;
};
