/**
 * $File: util.js $
 * $Date: 2019-05-08 14:17:00 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2019 by Shen, Jen-Chieh $
 */

"use strict";

if (typeof only === 'undefined') var only = { };


only.Util = function () {

};

/**
 * Check if the variable is a number.
 * @param { any } sym : Variable symbol to check.
 */
only.Util.isNumber = function (sym) {
  return typeof sym == 'number';
};

/**
 * Check if the variable is a string.
 * @param { any } sym : Variable symbol to check.
 */
only.Util.isString = function (sym) {
  return typeof sym == 'string';
};
