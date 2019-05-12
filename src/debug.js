/**
 * $File: debug.js $
 * $Date: 2019-05-12 15:12:01 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2019 by Shen, Jen-Chieh $
 */

"use strict";

if (typeof only === 'undefined') var only = { };


only.Debug = { };

only.Debug.log = function (msg) {
  let css = "color: #FFFFFF;";
  let timestamp = only.Time.getFormattedDate();
  console.log(`%c${timestamp}`,css);
  console.log(`%cLOG: ${msg}`, css);
};

only.Debug.error = function (msg) {
  let css = "color: #FF0000;";
  let timestamp = only.Time.getFormattedDate();
  console.log(`%c${timestamp}`,css);
  console.log(`%cERROR: ${msg}`, css);
};

only.Debug.info = function (msg) {
  let css = "color: #FFFF00;";
  let timestamp = only.Time.getFormattedDate();
  console.log(`%c${timestamp}`,css);
  console.log(`%cINFO: ${msg}`, css);
};

only.Debug.warn = function (msg) {
  let css = "color: #FFFF00;";
  let timestamp = only.Time.getFormattedDate();
  console.log(`%c${timestamp}`,css);
  console.log(`%cWARN: ${msg}`, css);
};
