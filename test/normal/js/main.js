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
only.Config.TITLE = "Test - Main!";

only.Config.RESIZE_MODE = 0;
only.Config.TARGET_SCREEN_WIDTH = 1852;
only.Config.TARGET_SCREEN_HEIGHT = 977;

// Register all events.
only.Event.registerInit(init);
only.Event.registerUpdate(update);

// Change mask opacity for better seeing.
only.Screen.MASK_OPACITY = 0.3;

only.init();  // This should be last called.


//var hello = new only.Object('#hello', true);
var greenBox = new only.Object('#greenbox', true);
var back_4 = new only.Object('#back_4', true);
// var cat = new only.Object('#cat', true);
let toggle = true;
let index = 0;

function init() {
  //let obj = new only.Object('*');
  //obj.position = 'absolute';

  let anim1 = new only.Animation('../images/CrazyCat/summon.stand_', 4, '.png', 150);
  // anim1.offsetX = 10;
  // anim1.offsetY = 10;
  let anim2 = new only.Animation('../images/CrazyCat/summon.attack1_', 20, '.png', 150);
  // anim2.offsetX = 100;
  // anim2.offsetY = 100;
  let anim3 = new only.Animation('../images/CrazyCat/summon.move_', 4, '.png', 125);
  // anim3.offsetX = -50;
  // anim3.offsetY = -50;

  // cat.addAnimation('stand', anim1);
  // cat.addAnimation('attack', anim2);
  // cat.addAnimation('move', anim3);

  // cat.zIndex = 100;
  // // cat.width = 10;
  // // cat.height = 10;
  // cat.x = 800;
  // cat.y = 200;
  // // cat.scaleX = 2;
  // // cat.rotateZ = 30;
  // cat.setCss('border', '1px green solid');
  // // cat.scaleX = 2;
  // // cat.backgroundColor = 'green';
  // cat.backgroundRepeat = 'no-repeat';
  // //cat.opacity = 0.5;
  // //cat.backgroundImage = 'url(./images/CrazyCat/summon.stand_0.png)';

  // cat.addEventListener('click', function () {
  //   if (toggle)
  //     cat.playAnimation('move');
  //   else
  //     cat.playAnimation('attack');
  //   toggle = !toggle;

  //   ++index;
  //   let newObj = new only.Object('#lol' + index, true);
  //   let newAnim = new only.Animation('../images/CrazyCat/summon.stand_', 4, '.png', 150);
  //   newObj.addAnimation('stand', newAnim);
  //   // newObj.left = 0;
  //   // newObj.top = 0;
  //   newObj.scaleX = 2;
  //   newObj.setCss('border', '1px red solid');

  //   // cat.left += 148;

  //   // cat.left = 0;
  //   // cat.top = 0;

  //   // back_4.left = 1100;
  //   // back_4.top = 650;
  //   // back_4.scaleX = 0.5;
  //   // back_4.scaleY = 0.5;

  //   // back_4.scaleX = 0.5;
  //   // back_4.scaleY = 0.5;

  //   // let newBg = new only.Object('#bg-' + index, true);
  //   // newBg.setImage('../images/festival/back_4.png');
  //   // newBg.left = only.Util.getRandomFloat(0, only.Screen.CURRENT_WIDTH);
  //   // newBg.top = only.Util.getRandomFloat(0, only.Screen.CURRENT_HEIGHT);
  // });


  greenBox.x = 100;
  greenBox.y = 100;
  greenBox.width = 100;
  greenBox.height = 200;
  greenBox.opacity = 0.5;
  greenBox.zIndex = 5;
  greenBox.backgroundColor = 'yellow';
  // greenBox.scaleX = 0.5;
  // greenBox.scaleY = 0.5;

  back_4.setImage('../images/festival/back_4.png');
  back_4.x = 10;
  back_4.y = 10;
  back_4.scaleX = 0.5;
  // back_4.scaleY = 0.5;
  back_4.backgroundColor = 'green';
  back_4.opacity = 0.5;
}

var gravity = 3;
var vel = 0;
var mouse_x = 0;
var mouse_y = 0;

window.onmousemove = function () {
  mouse_x = window.event.clientX;
  mouse_y = window.event.clientY;
};

function update() {
  // back_4.scaleX -= 0.01 * only.Time.FIXED_TIME;
  // back_4.scaleY -= 0.01 * only.Time.FIXED_TIME;

  // cat.rotateZ -= 100 * only.Time.FIXED_TIME;

  // greenBox.rotateZ -= 500 * only.Time.FIXED_TIME;

  // greenBox.x += 100 * only.Time.FIXED_TIME;

  // vel += gravity;

  // cat.left += 10 * only.Time.FIXED_TIME;
  //cat.left += (mouse_x - cat.left) / 0.2 * only.Time.FIXED_TIME;
  //cat.top += (mouse_y - cat.top) / 0.2 * only.Time.FIXED_TIME;
  // cat.rotateX += 10 * only.Time.FIXED_TIME;
  // cat.rotateY += 10 * only.Time.FIXED_TIME;
  // cat.rotateZ += 10 * only.Time.FIXED_TIME;
  // cat.skewX += 20 * only.Time.FIXED_TIME;
  // cat.width += 10 * only.Time.FIXED_TIME;
  // cat.height += 10 * only.Time.FIXED_TIME;

  // cat.scaleX -= 0.1 * only.Time.FIXED_TIME;

  console.log("Runs!!");
}
