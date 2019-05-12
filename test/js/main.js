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

function init() {
  //let obj = new only.Object('*');
  //obj.position = 'absolute';

  let anim1 = new only.Animation('./images/CrazyCat/summon.stand_', 4, '.png', 200,
                                 148, 159);
  let anim2 = new only.Animation('./images/CrazyCat/summon.attack1_', 20, '.png', 150,
                                 348, 214);

  world.addAnimation('stand', anim1);
  world.addAnimation('attack', anim2);

  world.position = 'absolute';
  world.width = 10;
  world.height = 10;
  world.top = 200;
  world.left = 200;
  world.backgroundColor = 'green';
  //world.opacity = 0.5;
  //world.backgroundImage = 'url(./images/CrazyCat/summon.stand_0.png)';

  world.addEventListener('click', function () {
    world.playAnimation('attack');
  });

  hello.position = 'absolute';
  hello.width = 50;
  hello.height = 50;
  hello.top = 100;
  hello.left = 10;
  hello.backgroundColor = 'red';
  hello.opacity = 0.5;

  hello.addEventListener('click', function () {
    vel = -40;
    console.log('hell22!!');
  });

  // hello.rotateX = 20;
  // hello.rotateY = 30;
  // hello.rotateZ = 40;
  // hello.rotateZ = 50;
}

var gravity = 3;
var vel = 0;

function update() {
  hello.left += 20 * only.Time.FIXED_TIME;
  hello.rotateX += 100 * only.Time.FIXED_TIME;
  hello.rotateY += 100 * only.Time.FIXED_TIME;
  hello.rotateZ += 20 * only.Time.FIXED_TIME;

  hello.top += vel * only.Time.FIXED_TIME;
  vel += gravity;

  // world.left += 5 * only.Time.FIXED_TIME;
  // world.rotateX += 10 * only.Time.FIXED_TIME;
  // world.rotateY += 10 * only.Time.FIXED_TIME;
  // world.rotateZ += 10 * only.Time.FIXED_TIME;
  //world.skewX += 20 * only.Time.FIXED_TIME;

  console.log("Runs!!");
}
