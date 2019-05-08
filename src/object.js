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
 * @param { typename } selectorId : Selector query represet id for this object.
 */
only.Object = function (selectorId) {
  this.selectorId = selectorId;
  this.elements = this.getElements();  // Store it as cache.
};

only.Object.prototype = {
  get top () { return parseInt(this.getCss('top')); },
  set top (val) { this.setCss('top', val, 'px'); },

  get left () { return parseInt(this.getCss('left')); },
  set left (val) { this.setCss('left', val, 'px'); },

  get width () { return parseInt(this.getCss('width')); },
  set width (val) { this.setCss('width', val, 'px'); },

  get height () { return parseInt(this.getCss('height')); },
  set height (val) { this.setCss('height', val, 'px'); },

  get backgroundColor () { return this.getCss('background-color'); },
  set backgroundColor (val) { this.setCss('background-color', val); },

  get position () { return this.getCss('position'); },
  set position (val) { this.setCss('position', val); },

  get opacity () { return this.getCss('opacity'); },
  set opacity (val) { this.setCss('opacity', val); },
};

/**
 * Get the elements using query selector methods and store it
 * within the cache.
 * @param { boolean } refresh : Refresh the cache.
 */
only.Object.prototype.getElements = function (refresh = false) {
  if (this.elements == null || refresh == true)
    this.elements = document.querySelectorAll(this.selectorId);
  return this.elements;
};

/**
 * Set CSS attribute by passing attribute name and attribute value.
 * @param { string } st : Attribute name.
 * @param { string } val : Attribute value.
 * @param { string } postStr : Post string.
 */
only.Object.prototype.setCss = function (st, val, postStr = '') {
  if (!only.Util.isString()) {
    if (postStr == 'px')
      val = Math.round(val);  // Ensure is integer.
    val = val.toString() + postStr;
  }
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
