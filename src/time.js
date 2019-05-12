/**
 * $File: time.js $
 * $Date: 2019-05-08 23:31:18 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2019 by Shen, Jen-Chieh $
 */

"use strict";

if (typeof only === 'undefined') var only = { };

only.Time = { };
only.Time.FIXED_TIME = 0;


only.Time.init = function () {
  only.Time.FIXED_TIME = 1 / only.Config.FPS;
};

only.Time.getFormattedDate = function () {
  let monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  let ampm = ["AM", "PM"];
  let date = new Date();

  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let mmIndex = mm;
  let yy = date.getFullYear();

  let hh = date.getHours();
  let ampmIndex = Math.floor(hh / 12);
  if (hh >= 12)
    hh -= 12;
  let min = date.getMinutes();
  let ss = date.getSeconds();

  return monthNames[mmIndex] + " " + dd + ", " + yy +
    " " +
    hh + ":" + min + ":" + ss + " " + ampm[ampmIndex];
};
