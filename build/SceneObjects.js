"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SceneObjects;
function SceneObjects(scene, camera) {

  var ghost = new Ghost(scene);
  var audio = new AudioObject(camera);
  var pressed = false;
  Light(scene);
  this.playOpenSound = function () {
    audio.playOpen();
  };
  this.playStaticSound = function () {
    audio.playStatic();
  };
  this.getGhostMixer = function () {
    return ghost.getMixer();
  };
  this.buttonPress = function () {
    if (!pressed) {
      audio.playOpen();
      ghost.close();
      pressed = true;
    } else {
      audio.playOpen();
      ghost.open();
      pressed = false;
    }
  };
}