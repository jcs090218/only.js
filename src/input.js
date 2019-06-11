/**
 * $File: input.js $
 * $Date: 2019-06-03 15:49:03 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2019 by Shen, Jen-Chieh $
 */

"use strict";

if (typeof only === 'undefined') var only = { };

only.Input = { };

/* Keyboard */
{
  only.Input._keysDown = [];
  only.Input._keysReleaseThisFrame = [];
  only.Input._keysPressedThisFrame = [];

  only.Input._frameIdCounter = 0;
  only.Input._frameId = 0;
}

/* Mouse */
{
  only.Input.mousePositionX = 0;
  only.Input.mousePositionY = 0;
 }



/** Initialize for input module to get ready to work. */
only.Input.init = function () {
  only.Input.initKeyboard();
  only.Input.initMouse();
};

/** Run every frame. */
only.Input.update = function () {
  only.Input.cleanInputBuffer();
};


/** Initialize the mouse device. */
only.Input.initMouse = function () {
  window.onmousemove = function () {
    only.Input.mousePositionX = window.event.clientX;
    only.Input.mousePositionY = window.event.clientY;
  };
};

/** Initialize the keyboard receiver. */
only.Input.initKeyboard = function () {
  // Keyboard handle.
  document.addEventListener("keydown", (e) => {
    let key = e.keyCode;
    only.Input.safePushKey(only.Input._keysPressedThisFrame, key);
  });

  document.addEventListener("keyup", (e) => {
    let key = e.keyCode;
    only.Input.safePushKey(only.Input._keysReleaseThisFrame, key);

    // Remove the key down list.
    only.Input.removeKeyFromList(only.Input._keysDown, key);
    only.Input.removeKeyFromList(only.Input._keysPressedThisFrame, key);
  });
};

/**
 * @desc Check if the key is down?
 * @param { integer } keyCode : Key code.
 * @returns { boolean } : True, key is down. False, key is not down.
 */
only.Input.getKeyDown = function (keyCode) {
  if (only.Input.getKey(keyCode)) {
    // Check contains.
    if (only.Input.containsKey(only.Input._keysDown, keyCode)) {
      if (only.Input._frameIdCounter == only.Input._frameId)
        return true;
      return false;
    } else {
      // The key is down this frame, add to the check list.
      // So when the next time it etners will return false.
      only.Input.safePushKey(only.Input._keysDown, keyCode);

      // Update it so know is the same frame.
      only.Input._frameId = only.Input._frameIdCounter;

      return true;
    }
  }
  return false;
};

/**
 * @desc Check if the key is held down?
 * @param { integer } keyCode : Key code.
 * @returns { boolean } : True, key is held down. False, key is not held down.
 */
only.Input.getKey = function (keyCode) {
  if (only.Input.containsKey(only.Input._keysPressedThisFrame, keyCode))
    return true;
  return false;
};

/**
 * @desc Check if the key is up?
 * @param { integer } keyCode : Key code.
 * @returns { boolean } : True, key is up. False, key is not up.
 */
only.Input.getKeyUp = function (keyCode) {
  for (let index = 0;
       index < only.Input._keysReleaseThisFrame.length;
       ++index)
  {
    let key = only.Input._keysReleaseThisFrame[index];
    if (key == keyCode)
      return true;
  }
  return false;
};

/** Check if key is contains in the list. */
only.Input.containsKey = function (list, key) {
  return (list.indexOf(key) > -1);
};

/**
 * @desc Prevent pushing duplicate keycode.
 * @param { Array } list : List of keycode.
 * @param { integer } key : Key code value.
 */
only.Input.safePushKey = function (list, key) {
  // If contain.
  if (only.Input.containsKey(list, key))
    return;
  list.push(key);
};

/**
 * @desc Remove a key from a list.
 * @param list List of keycode.
 * @param key Target key code you want to remove.
 */
only.Input.removeKeyFromList = function (list, key) {
  const searchIndex = list.indexOf(key, 0);
  if (searchIndex > -1) {
    // Remove it.
    list.splice(searchIndex, 1);
  }
};

/** Clean the input buffer every frame. */
only.Input.cleanInputBuffer = function () {
  /* Do frame counter, in order to check if the same frame
   * pressed the same button multiple different places/files. */
  {
    ++only.Input._frameIdCounter;

    /* NOTE(jenchieh): Not sure javascript will go up to what certain
     * limit. Just set it to something that would not be easily reach.
     * In theory, 2 is good enough. [Default: 1000]
     */
    if (only.Input._frameIdCounter > 1000)
      only.Input._frameIdCounter = 0;
  }

  only.Input._keysReleaseThisFrame = [];
};
