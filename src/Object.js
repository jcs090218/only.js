/**
 * $File: object.js $
 * $Date: 2019-05-08 11:33:36 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2019 by Shen, Jen-Chieh $
 */

if (typeof only === 'undefined') var only = { };


/**
 * @func Constructor
 * @param { typename } selectorId : Selector query represet id for this object.
 */
only.Object = function (selectorId) {
  this.selectorId = selectorId;
  this.elements = this.getElements();
};


only.Object.prototype.getElements = function (refresh = false) {
  if (this.elements == null || refresh == true)
    this.elements = document.querySelectorAll(this.selectorId);
  return this.elements;
};

only.Object.prototype.setCss = function (st, val) {
  this.getElements().forEach(function (elm) { elm.style[st] = val; });
};

only.Object.prototype.getCss = function (st) {
  let el = this.getElements();
  let list_attr = [];
  this.getElements().forEach(function (elm) { list_attr.push(elm.style[st]); });
  return list_attr;
};

only.Object.prototype.setPosition = function (val) {
  this.getElements().forEach(function (elm) { elm.style.position = val; });
};

/**
 * @desc Get the position from this selector.
 * @return List of position from this selector.
 */
only.Object.prototype.getPosition = function () { this.getCss('position');  };

only.Object.prototype.setTop = function (val) {
  val = only.Util.numberToPixelString(val);
  this.setCss('top', val);
};

only.Object.prototype.setLeft = function (val) {
  val = only.Util.numberToPixelString(val);
  this.setCss('left', val);
};

only.Object.prototype.setWidth = function (val) {
  val = only.Util.numberToPixelString(val);
  this.setCss('width', val);
};

only.Object.prototype.setHeight = function (val) {
  val = only.Util.numberToPixelString(val);
  this.setCss('height', val);
};

only.Object.prototype.setBackgroundColor = function (val) {
  this.setCss('background-color', val);
};
