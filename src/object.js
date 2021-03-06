/**
 * $File: object.js $
 * $Date: 2019-05-08 11:33:36 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2019 by Shen, Jen-Chieh $
 */

"use strict";

if (typeof only === 'undefined') var only = { };


/**
 * @func Constructor
 * @param { string } selectorId : Selector query represet id for this object.
 * @param { boolean } force : Force create one if does not find one.
 */
only.Object = function (selectorId, force = false) {
  only.Render.OBJECT_LIST.push(this);
  this.initResized = true;

  // NOTE: After the first resize event was called,
  // we treat everything new object.
  if (only.Screen.INIT_RESIZE) {
    this.initResized = false;
    only.Render.NEW_OBJECTS.push(this);
  }

  this.selectorId = selectorId;
  this.elements = this.getElements(false, force);  // cache.
  this.transforms = null;  // cache.

  this.animations = { };
  this.currentAnimId = '';

  this.offsetX = 0;
  this.offsetY = 0;

  this.position = 'absolute';
  this.transformOrigin = 'center center';

  this.width = 0;
  this.height = 0;
  this.left = 0;
  this.top = 0;
  this.x = 0;
  this.y = 0;
};

only.Object.prototype = {
  get left () { return parseFloat(this.getCss('left')); },
  set left (val) { this.setCss('left', val, 'px'); },

  get top () { return parseFloat(this.getCss('top')); },
  set top (val) { this.setCss('top', val, 'px'); },

  get width () { return parseFloat(this.getCss('width')); },
  set width (val) { this.setCss('width', val, 'px'); },

  get height () { return parseFloat(this.getCss('height')); },
  set height (val) { this.setCss('height', val, 'px'); },

  get x () {
    let val = parseFloat(this.getTransform('translateX', 0, 'px'));
    if (!only.Screen.RESIZING)
      val -= only.Screen.RESIZE_LEFT;
    val = only.Object.resolveResize(val);
    return val;
  },
  set x (val) {
    val = only.Object.unsolveResize(val);
    if (!only.Screen.RESIZING)
      val += only.Screen.RESIZE_LEFT;
    this.setTransform('translateX', val, 'px');
  },

  get y () {
    let val = parseFloat(this.getTransform('translateY', 0, 'px'));
    if (!only.Screen.RESIZING)
      val -= only.Screen.RESIZE_TOP;
    val = only.Object.resolveResize(val);
    return val;
  },
  set y (val) {
    val = only.Object.unsolveResize(val);
    if (!only.Screen.RESIZING)
      val += only.Screen.RESIZE_TOP;
    this.setTransform('translateY', val, 'px');
  },

  get scaleX () {
    let val = parseFloat(this.getTransform('scaleX', 1));
    val = only.Object.resolveResize(val);
    return val;
  },
  set scaleX (val) {
    val = only.Object.unsolveResize(val);
    this.setTransform('scaleX', val);
  },

  get scaleY () {
    let val = parseFloat(this.getTransform('scaleY', 1));
    val = only.Object.resolveResize(val);
    return val;
  },
  set scaleY (val) {
    val = only.Object.unsolveResize(val);
    this.setTransform('scaleY', val);
  },

  get rotateX () { return parseFloat(this.getTransform('rotateX', 0, 'deg')); },
  set rotateX (val) { this.setTransform('rotateX', val, 'deg'); },

  get rotateY () { return parseFloat(this.getTransform('rotateY', 0, 'deg')); },
  set rotateY (val) { this.setTransform('rotateY', val, 'deg'); },

  get rotateZ () { return parseFloat(this.getTransform('rotateZ', 0, 'deg')); },
  set rotateZ (val) { this.setTransform('rotateZ', val, 'deg'); },

  get skewX () { return parseFloat(this.getTransform('skewX', 1, 'deg')); },
  set skewX (val) { this.setTransform('skewX', val, 'deg'); },

  get skewY () { return parseFloat(this.getTransform('skewY', 1, 'deg')); },
  set skewY (val) { this.setTransform('skewY', val, 'deg'); },

  get display () { return this.getCss('display'); },
  set display (val) { this.setCss('display', val); },

  get visibility () { return this.getCss('visibility'); },
  set visibility (val) { this.setCss('visibility', val); },

  get opacity () { return this.getCss('opacity'); },
  set opacity (val) { this.setCss('opacity', val); },

  get zIndex () { return this.getCss('z-index'); },
  set zIndex (val) { return this.setCss('z-index', val); },

  get background () { return this.getCss('background'); },
  set background (val) { this.setCss('background', val); },

  get backgroundColor () { return this.getCss('background-color'); },
  set backgroundColor (val) { this.setCss('background-color', val); },

  get backgroundImage () { return this.getCss('background-image'); },
  set backgroundImage (val) { this.setCss('background-image', val); },

  get backgroundRepeat () { return this.getCss('background-repeat'); },
  set backgroundRepeat (val) { this.setCss('background-repeat', val); },

  get position () { return this.getCss('position'); },
  set position (val) { this.setCss('position', val); },

  get transformOrigin () { return this.getCss('transform-origin'); },
  set transformOrigin (val) { this.setCss('transform-origin', val); },
};

/** Runs every frame. */
only.Object.prototype.update = function () {
  this.updateAnimation();
  this.updateTransforms();
};

/**
 * Get the elements using query selector methods and store it
 * within the cache.
 * @param { boolean } refresh : Refresh the cache.
 * @param { boolean } force : Force create one if does not find one.
 */
only.Object.prototype.getElements = function (refresh = false, force = false) {
  if (this.elements == null || refresh) {
    this.elements = document.querySelectorAll(this.selectorId);
    /* See if we need to create one? */
    if (force && this.elements.length == 0) {
      document.body.appendChild(only.Util.createNewNode(this.selectorId));
      this.elements = document.querySelectorAll(this.selectorId);
    }
  }
  return this.elements;
};

/**
 * Set CSS attribute by passing attribute name and attribute value.
 * @param { string } st : Attribute name.
 * @param { string } val : Attribute value.
 * @param { string } postStr : Post string.
 */
only.Object.prototype.setCss = function (st, val, postStr = '') {
  val = only.Util.solvePostString(val, postStr);
  this.getElements().forEach(function (elm) { elm.style[st] = val; });
};

/**
 * Return the CSS attribute value by using attribute name.
 * @param { typename } st : Attribute name.
 * @return { string } : Attribute value.
 */
only.Object.prototype.getCss = function (st) {
  let el = this.getElements();
  let list_attr = [];
  this.getElements().forEach(function (elm) { list_attr.push(elm.style[st]); });
  return list_attr;
};

/** Remove all CSS properties. */
only.Object.prototype.cleanCss = function () {
  this.getElements().forEach(function (elm) { elm.style.cssText = ''; });
};

/**
 * Set transform property.
 * @param { typename } key : Key to target the specific transform property.
 * @param { typename } val : Transform property value.
 * @param { typename } postStr : Post string added after `val`.
 */
only.Object.prototype.setTransform = function (key, val, postStr = '') {
  val = only.Util.solvePostString(val, postStr);
  this.getTransforms().forEach(function (trans) { trans[key] = val; });
};

/**
 * Return the dictionary of the transform type.
 * @param { string } key : Key to target the specific transform property.
 * @return { List | string } : If key is empty then return the full list,
 * else return the list of targeted value.
 */
only.Object.prototype.getTransform = function (key = '', defVal = '', postStr = '') {
  if (key == '') {
    return this.getTransforms();  // Just return the full list.
  } else {
    defVal = only.Util.solvePostString(defVal, postStr);
    let list_attr = [];
    this.getTransforms().forEach(function (trans) {
      if (trans[key] === undefined)
        trans[key] = defVal;
      list_attr.push(trans[key]);
    });
    return list_attr;
  }
};

/** Return the list of transform cache from the elements. */
only.Object.prototype.getTransforms = function () {
  if (this.transforms == null)
    this.transforms = only.Util.transMatrixListToDicList(this.getCss('transform'));
  return this.transforms;
};

/** Assign `this.transforms` cache to CSS. */
only.Object.prototype.updateTransforms = function () {
  let el = this.getElements();
  let tml = only.Util.dicListToTransMatrixList(this.getTransforms());
  for (let index = 0; index < el.length; ++index)
    el[index].style['transform'] = tml[index];
};

/**
 * Register the event listener.
 * @param { typename } evtStr : Event string.
 * @param { typename } fp : Function pointer.
 */
only.Object.prototype.addEventListener = function (evtStr, fp) {
  this.getElements().forEach(function (elm) { elm.addEventListener(evtStr, fp); });
};

/** Set the DOM value. */
only.Object.prototype.setDom = function (key, val) {
  this.getElements().forEach(function (elm) { elm[key] = val; });
};

/** Set the DOM value. */
only.Object.prototype.appendDom = function (key, val) {
  this.getElements().forEach(function (elm) { elm[key] += val; });
};

/** Return selector's DOM value. */
only.Object.prototype.getDom = function (key) {
  let el = this.getElements();
  let list_attr = [];
  this.getElements().forEach(function (elm) { list_attr.push(elm[key]); });
  return list_attr;
};

/** On load image callback for just image. */
only.Object.onloadImage = function (self, img, imagePath = null) {
  self.width = img.naturalWidth;
  self.height = img.naturalHeight;

  if (imagePath != null) {
    only.Object.solveDupObjs(imagePath);

    // Push loaded flag.
    ++only.Resource.LOADED_IMAGES_FLAGS;
  }
};

/** Solve all objects that use the same image resouce. */
only.Object.solveDupObjs = function (imagePath) {
  let imageData = only.Resource.PRELOADED_IMAGES[imagePath];
  imageData.dupObjs.forEach(function (obj) {
    only.Object.onloadImage(obj, imageData.image);
  });
  imageData.dupObjs = [];  // After solving it, clean it.
};

/** Set the image. */
only.Object.prototype.setImage = function (imagePath) {
  this.backgroundImage = 'url("' + imagePath + '")';

  // NOTE: Here we use dictionary so we can save the duplicated
  // resource loading.
  let imageData = only.Resource.PRELOADED_IMAGES[imagePath];

  if (imageData != undefined) {
    let image = imageData.image;

    // Check image loaded, if loaded `width` or `height` should
    // not be 0.
    if (only.Resource.isImageLoaded(image)) {
      only.Object.onloadImage(this, image);
    } else {
      imageData.dupObjs.push(this);
    }
    return;
  }

  let self = this;
  let image = new Image();

  image.onload = function () {
    only.Object.onloadImage(self, this, imagePath);
  };

  // This should do it after `onload` is assigned.
  image.src = imagePath;

  // Save to preloaded resource memory.
  only.Resource.PRELOADED_IMAGES[imagePath] =  {
    image : image,
    dupObjs : [],   // Store objects that also use the same image.
    dupAnims : [],  // Match `animtion.js`.
  };
};

/** Add one animation object with `id` and `animation` itself. */
only.Object.prototype.addAnimation = function (animId, newAnim) {
  this.animations[animId] = newAnim;
  newAnim.init(this);
  if (this.currentAnimId == '')
    this.playAnimation(animId);
};

/** Play the animation by using animation `id`. */
only.Object.prototype.playAnimation = function (animId, restart = false) {
  if (this.animations[animId] == undefined) {
    only.Debug.warn("Cannot play `undefined` animation..");
    return;
  }

  if (this.currentAnimId == animId && !restart)
    return;

  if (this.currentAnimId != '')
    this.animations[this.currentAnimId].restoreAnimation();
  this.currentAnimId = animId;
  this.animations[this.currentAnimId].reviveAnimation();
};

/** System call for updating `animations` in background. */
only.Object.prototype.updateAnimation = function () {
  if (this.animations[this.currentAnimId] === undefined)
    return;
  this.animations[this.currentAnimId].update(this);
};

/** Resolve resize event scaling. */
only.Object.resolveResize = function (val) {
  if (!only.Screen.RESIZING)
    val /= only.Screen.RESIZE_SCALE;
  return val;
};

/** Unsolve resize event scaling. */
only.Object.unsolveResize = function (val) {
  if (!only.Screen.RESIZING)
    val *= only.Screen.RESIZE_SCALE;
  return val;
};
