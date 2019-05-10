/**
 * $File: only.js $
 * $Date: 2019-05-08 23:24:50 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2019 by Shen, Jen-Chieh $
 */

"use strict";

if (typeof only === 'undefined') var only = { };

only.init = function () {
  only.Config.init();
  only.Time.init();
};