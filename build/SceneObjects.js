"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SceneObjects;
function SceneObjects(scene, camera) {
  var ghost = new Ghost(scene);
  var pressed = false;
  Light(scene);
  this.getGhostMixer = function () {
    return ghost.getMixer();
  };
  this.buttonPress = function () {
    if (!pressed) {
      $('#opensound').get(0).load();
      $('#opensound').get(0).play();
      ghost.close();
      pressed = true;
    } else {
      $('#opensound').get(0).load();
      $('#opensound').get(0).play();
      ghost.open();
      pressed = false;
    }
  };
}