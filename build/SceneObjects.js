"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SceneObjects;
function SceneObjects(scene) {
  var ghost = new Ghost(scene);
  var pressed = false; 0xf2ece8
  var light = new Light(scene, { x: 0, y: 0, z: -5 }, 'white', 1);
  var particles = new ParticlesObject(scene);
  $("#staticsound").get(0).volume = 0;
  $('.ui.dropdown').dropdown({ direction: 'upward' });
  $('.ui.dropdown').direction = 'upward';
  scene.position.y = -5;
  scene.position.z = 2;

  this.update = function () {
    particles.rotate()
  };

  this.getGhostMixer = function () {
    return ghost.getMixer();
  };

  this.ghostEyeRotate = function (ghostEye, mouse) {
    ghostEye.rotation.z = mouse.x + 3;
    ghostEye.rotation.x = mouse.y - 1.58 
  };

  this.lightSetPos = function (light, mouse) {
  light.position.x = mouse.x * -3
  light.position.y = (mouse.y * 3) + 4
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
  this.glitch = function (effectGlitch, bool) {
    if (bool) $('#staticsound').get(0).play();  
    effectGlitch.enabled = bool;
    effectGlitch.goWild = bool;
  };
  this.setUpComposer = function (composer, renderPass, effectGlitch) {
    composer.addPass(renderPass)
    composer.addPass(effectGlitch)
    composer.setSize(window.innerWidth / 2, window.innerHeight / 2)
    effectGlitch.goWild = true
    effectGlitch.renderToScreen = true
  }
}