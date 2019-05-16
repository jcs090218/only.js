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

/**
 * Update all the object transform state right before the
 * render quere starts.
 */
only.Render.update = function () {
  only.Render.OBJECT_LIST.forEach(function (obj) {
    obj.update();
  });
};

only.Render.cleanNullObjects = function (obj) {
  // TODO(jenchieh): Impls this..
  for (let index = 0; index < only.Render.OBJECT_LIST.length; ++index) {
    console.log(only.Render.OBJECT_LIST[index]);
  }
};
