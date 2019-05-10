/**
 * $File: event.js $
 * $Date: 2019-05-10 11:53:35 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2019 by Shen, Jen-Chieh $
 */

"use strict";

if (typeof only === 'undefined') var only = { };

only.Event = { };
only.Event.INIT_FUNC = [];
only.Event.UPDATE_FUNC = [];


only.Event.init = function () {
  only.Event.processEvent();
};

/**
 * Start all the events and prepare for main
 * app loop.
 */
only.Event.processEvent = function () {
  only.Event.INIT_FUNC.forEach(function (initEvt) {
    window.setTimeout(initEvt.func, initEvt.time);
  });

  only.Event.UPDATE_FUNC.forEach(function (fp) {
    window.setInterval(fp, only.Time.FIXED_TIME * 1000);
  });
};

/**
 * Register an initialize function.
 * @param { symbol } fp : Function pointer.
 * @param { integer } t : Delay time to run.
 */
only.Event.registerInit = function (fp, t = 0) {
  let initEvt = { };
  initEvt.func = fp;
  initEvt.time = t;
  only.Event.INIT_FUNC.push(initEvt);
};

/**
 * Register an update function.
 * @param { symbol } fp : Function pointer.
 */
only.Event.registerUpdate = function (fp) {
  only.Event.UPDATE_FUNC.push(fp);
};
