/**
 * $File: render.js $
 * $Date: 2019-05-10 13:24:07 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2019 by Shen, Jen-Chieh $
 */

"use strict";

if (typeof only === 'undefined') var only = { };

only.Render = { };
only.Render.OBJECT_LIST = [];

only.Render.addObject = function (obj) {
  only.Render.OBJECT_LIST.push(obj);
};

only.Render.removeObject = function (obj) {
  // TODO(jenchieh): ..
};
