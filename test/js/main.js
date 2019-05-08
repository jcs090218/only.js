/**
 * $File: main.js $
 * $Date: 2019-05-08 10:57:12 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2019 by Shen, Jen-Chieh $
 */

"use strict";


only.Config.FPS = 30;
only.Config.TITLE = "Some App!";

only.init();
only.Config.registerUpdate(update);


var hello = new only.Object('#hello');

function init() {
  let obj = new only.Object('*');
  obj.position = 'absolute';

  hello.width = 50;
  hello.height = 50;
  hello.top = 100;
  hello.left = 10;
  hello.backgroundColor = 'red';
  hello.opacity = 0.5;
}
init();

function update() {
  hello.left += 20 * only.Time.FIXED_TIME;
  console.log("Runs!!");
}
