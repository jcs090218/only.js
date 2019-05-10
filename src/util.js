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

/**
 * Convert transform string to dictionary.
 * @param { Array } mat : Transform array.
 */
only.Util.transToDic = function (mat) {
  let values = mat[0];
  let props = values.split(')').filter(Boolean);
  let data = { };
  props.forEach(function (prop) {
    let pair = prop.split('(');
    let key = pair[0].trim();
    let val = pair[1].trim();
    data[key] = val;
  });
  return data;
};

/**
 * Convert dictionary to transform string.
 * @param { Dictionary } dic : Dictionary data.
 */
only.Util.dicToTrans = function (dic) {
  let result = '';
  for (let p in dic) {
    if (dic.hasOwnProperty(p)) {
      let key = p;
      let val = dic[p];
      console.log(key);
      console.log(val);
      result += key + "(" + val + ") ";
    }
  }
  return result;
};
