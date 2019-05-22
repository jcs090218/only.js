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
var world = new only.Object('#world', true);
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

  world.addAnimation('stand', anim1);
  world.addAnimation('attack', anim2);
  world.addAnimation('move', anim3);

  world.zIndex = 100;
  // world.width = 10;
  // world.height = 10;
  world.left = 800;
  world.top = 200;
  // world.scaleX = 2;
  world.rotateZ = 30;
  world.setCss('border', '1px green solid');
  // world.scaleX = 2;
  // world.backgroundColor = 'green';
  world.backgroundRepeat = 'no-repeat';
  //world.opacity = 0.5;
  //world.backgroundImage = 'url(./images/CrazyCat/summon.stand_0.png)';

  world.addEventListener('click', function () {
    if (toggle)
      world.playAnimation('move');
    else
      world.playAnimation('attack');
    toggle = !toggle;

    ++index;
    let newObj = new only.Object('#lol' + index, true);
    let newAnim = new only.Animation('../images/CrazyCat/summon.stand_', 4, '.png', 150);
    newObj.addAnimation('stand', newAnim);
    // newObj.left = 0;
    // newObj.top = 0;
    newObj.scaleX = 2;
    newObj.setCss('border', '1px red solid');

    // world.left += 148;

    // world.left = 0;
    // world.top = 0;

    // back_4.left = 1100;
    // back_4.top = 650;
    // back_4.scaleX = 0.5;
    // back_4.scaleY = 0.5;

    // back_4.scaleX = 0.5;
    // back_4.scaleY = 0.5;

    // let newBg = new only.Object('#bg-' + index, true);
    // newBg.setImage('../images/festival/back_4.png');
    // newBg.left = only.Util.getRandomFloat(0, only.Screen.CURRENT_WIDTH);
    // newBg.top = only.Util.getRandomFloat(0, only.Screen.CURRENT_HEIGHT);
  });

  // greenBox.left = 0;
  // greenBox.top = 0;
  greenBox.width = 100;
  greenBox.height = 200;
  greenBox.opacity = 0.5;
  greenBox.zIndex = 5;
  greenBox.backgroundColor = 'yellow';

  back_4.setImage('../images/festival/back_4.png');
  back_4.left = 1000;
  back_4.top = 650;
  back_4.scaleX = 0.5;
  back_4.scaleY = 0.5;
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

  world.rotateZ -= 100 * only.Time.FIXED_TIME;

  // vel += gravity;

  // world.left += 10 * only.Time.FIXED_TIME;
  //world.left += (mouse_x - world.left) / 0.2 * only.Time.FIXED_TIME;
  //world.top += (mouse_y - world.top) / 0.2 * only.Time.FIXED_TIME;
  // world.rotateX += 10 * only.Time.FIXED_TIME;
  // world.rotateY += 10 * only.Time.FIXED_TIME;
  // world.rotateZ += 10 * only.Time.FIXED_TIME;
  // world.skewX += 20 * only.Time.FIXED_TIME;
  // world.width += 10 * only.Time.FIXED_TIME;
  // world.height += 10 * only.Time.FIXED_TIME;

  // world.scaleX -= 0.1 * only.Time.FIXED_TIME;

  console.log("Runs!!");
}
