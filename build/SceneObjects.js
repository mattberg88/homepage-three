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
  var particles = new ParticlesObject(scene);
  $("#staticsound").get(0).volume = 0;
  $('.ui.dropdown').dropdown();
  this.update = function () {
    particles.rotate()
  };
  this.getGhostMixer = function () {
    return ghost.getMixer();
  };
  this.toggleAudio = function () {
    console.log($("#audioIcon").html())
    if ($("#audioIcon").html() === 'soundOff.') {
      $("#audioIcon").html('soundOn.')
      $("#dronesound").get(0).play()
      $("#dronesound").get(0).volume = 0.2;
      $("#staticsound").get(0).volume = 0.5;
    } else {
      $("#audioIcon").html('soundOff.')
      $("#dronesound").get(0).pause()
      $("#staticsound").get(0).volume = 0;
    }
  };
  this.staticSound = function () {
    $('#staticsound').get(0).load();
    $('#staticsound').get(0).play();  
  };
  this.buttonPress = function () {
    if (!pressed) {
      $('#staticsound').get(0).load();
      $('#staticsound').get(0).play();
      ghost.close();
      pressed = true;
    } else {
      $('#staticsound').get(0).load();
      $('#staticsound').get(0).play();
      ghost.open();
      pressed = false;
    }
  };
}