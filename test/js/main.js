/**
 * $File: main.js $
 * $Date: 2019-05-08 10:57:12 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2019 by Shen, Jen-Chieh $
 */

"use strict";


const FPS = 30;
const FIXED_TIME = 1 / FPS;

window.setInterval(update, FIXED_TIME * 1000);


function init() {
  let obj = new only.Object('*');
  obj.setPosition('absolute');


  let hello = new only.Object('#hello');
  hello.setWidth(100);
  hello.setHeight(100);
  hello.setTop(100);
  hello.setBackgroundColor('red');
}
init();

function update() {
  console.log("Runs");
}
