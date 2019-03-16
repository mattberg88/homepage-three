"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SceneObjects;
function SceneObjects(scene, camera) {
  var ghost = new Ghost(scene);
  var pressed = false; 0xf2ece8
  //var light1 = new Light(scene, {x:2, y:10, z:-5}, '0xa1adac)', 0.8);
  var light2 = new Light(scene, { x: 0, y: 0, z: -5 }, '0x395956)', 1);

  this.getGhostMixer = function () {
    return ghost.getMixer();
  };
  this.staticSound = function () {
    $('#staticsound').get(0).load();
    $('#staticsound').get(0).play();
  }
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