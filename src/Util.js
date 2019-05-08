/**
 * $File: util.js $
 * $Date: 2019-05-08 14:17:00 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2019 by Shen, Jen-Chieh $
 */

if (typeof only === 'undefined') var only = { };


only.Util = function () {

};


only.Util.numberToPixelString = function (val) {
  if (only.Util.isNumber(val))
    val = val.toString() + 'px';
  return val;
};

only.Util.isNumber = function (sym) {
  return typeof sym == 'number';
};
