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
var world = new only.Object('#world');
let toggle = true;

function init() {
  //let obj = new only.Object('*');
  //obj.position = 'absolute';

  let anim1 = new only.Animation('./images/CrazyCat/summon.stand_', 4, '.png', 150);
  let anim2 = new only.Animation('./images/CrazyCat/summon.attack1_', 20, '.png', 150);
  let anim3 = new only.Animation('./images/CrazyCat/summon.move_', 4, '.png', 125);

  world.addAnimation('stand', anim1);
  world.addAnimation('attack', anim2);
  world.addAnimation('move', anim3);

  world.position = 'absolute';
  // world.width = 10;
  // world.height = 10;
  world.top = 200;
  world.left = 200;
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
  });

  hello.position = 'absolute';
  hello.width = 50;
  hello.height = 50;
  hello.top = 100;
  hello.left = 10;
  hello.backgroundColor = 'red';
  hello.opacity = 0.5;

  hello.addEventListener('click', function () {
    vel = -200;
    console.log('hell22!!');
  });

  // hello.rotateX = 20;
  // hello.rotateY = 30;
  // hello.rotateZ = 40;
  // hello.rotateZ = 50;
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
  hello.left += 5 * only.Time.FIXED_TIME;
  hello.rotateX += 100 * only.Time.FIXED_TIME;
  hello.rotateY += 100 * only.Time.FIXED_TIME;
  hello.rotateZ += 20 * only.Time.FIXED_TIME;

  hello.top += vel * only.Time.FIXED_TIME;
  vel += gravity;

  world.left += (mouse_x - world.left) / 0.2 * only.Time.FIXED_TIME;
  world.top += (mouse_y - world.top) / 0.2 * only.Time.FIXED_TIME;
  // world.rotateX += 10 * only.Time.FIXED_TIME;
  // world.rotateY += 10 * only.Time.FIXED_TIME;
  // world.rotateZ += 10 * only.Time.FIXED_TIME;
  // world.skewX += 20 * only.Time.FIXED_TIME;
  // world.width += 10 * only.Time.FIXED_TIME;
  // world.height += 10 * only.Time.FIXED_TIME;

  console.log("Runs!!");
}
