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
 * Return the length of the dictionary length.
 * @param { dictionary / json data } dic : Dictionary object
 * or json data container.
 */
only.Util.dictionaryLength = function (dic) {
  return Object.keys(dic).length;
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
 * Return new node string, default uses `span`.
 * @param { string } sel : selector query.
 */
only.Util.createNewNode = function (sel) {
  let idr = sel.charAt(0);
  let tag = sel.substring(1);
  switch (idr) {
  case '#':
    return '<div id="' + tag + '"></div>';
  case '.':
    return '<div class="' + tag + '"></div>';
  default:
    return '<' + tag + '></' + tag + '>' ;
  }
};

/**
 * Solve the post string to just the stirng.
 * @param { typename } val : Value to combine with `postStr`.
 * @param { typename } postStr : Post to solve.
 */
only.Util.solvePostString = function (val, postStr) {
  if (!only.Util.isString())
    val = val.toString() + postStr;
  return val;
};

/**
 * Convert transform string to dictionary.
 * @param { String } mat : Transform maxtrix
 */
only.Util.transToDic = function (mat) {
  let props = mat.split(')').filter(Boolean);
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
 * Convert transform string list to dictionary list.
 * @param { Array } mat : Transform matrix array.
 */
only.Util.transMatrixListToDicList = function (mat) {
  let datas = [];
  mat.forEach(function (values) {
    let data = only.Util.transToDic(values);
    datas.push(data);
  });
  return datas;
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
      result += key + "(" + val + ") ";
    }
  }
  return result;
};

/**
 * Convert dictionary list to transform string list.
 * @param { Array } dic : Dictionary list with transform string data.
 */
only.Util.dicListToTransMatrixList = function (dicList) {
  let transList = [];
  dicList.forEach(function (dic) {
    let result = only.Util.dicToTrans(dic);
    transList.push(result);
  });
  return transList;
};
