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
