/**
 * $File: main.js $
 * $Date: 2019-05-08 10:57:12 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2019 by Shen, Jen-Chieh $
 */

"use strict";


// Configure all the settings.
only.Config.FPS = 30;
only.Config.TITLE = "Some App!";

// Register all events.
only.Event.registerInit(init);
only.Event.registerUpdate(update);

only.init();  // This should be last called.


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

  hello.rotateX = 20;
  hello.rotateY = 30;
  hello.rotateZ = 40;
  hello.rotateZ = 50;
  console.log(hello.rotateZ);
  console.log(hello.getTransform());
}

function update() {
  hello.left += 20 * only.Time.FIXED_TIME;
  hello.rotateX += 100 * only.Time.FIXED_TIME;
  hello.rotateY += 100 * only.Time.FIXED_TIME;
  hello.rotateZ += 20 * only.Time.FIXED_TIME;
  //console.log(hello.rotateZ);
  console.log("Runs!!");
}
