"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SceneObjects;
function SceneObjects(scene) {
  var ghost = new Ghost(scene);
  var light = new Light(scene, { x: 0, y: 0, z: -5 }, 'white', 1);
  var particles = new ParticlesObject(scene);
  scene.position.y = -5;
  scene.position.z = 2;

  this.update = function () {
    particles.rotate()
  };

  this.getGhostMixer = function () {
    return ghost.getMixer();
  };

  this.ghostEyeRotate = function (ghostEye, mouse) {
    ghostEye.rotation.z = mouse.x + 3.2;
    ghostEye.rotation.x = mouse.y - 1.7 
  };

  this.lightSetPos = function (light, mouse) {
  light.position.x = mouse.x * -3
  light.position.y = (mouse.y * 3) + 4
  };

  this.toggleAudio = function () {
    if ($("#audioIcon").html() === 'soundOff.') {
      $("#audioIcon").html('soundOn.')
      $("#audioIcon").addClass('change');
      $("#dronesound").get(0).play()
      $("#menu1").get(0).volume = 0.4;
      $("#menu2").get(0).volume = 0.4;
      $("#menu3").get(0).volume = 0.4;
      $("#dronesound").get(0).volume = 0.4;
      $("#staticsound").get(0).volume = 0.5;
    } else {
      $("#audioIcon").html('soundOff.')
      $("#audioIcon").removeClass('change');
      $("#menu1").get(0).volume = 0;
      $("#menu2").get(0).volume = 0;
      $("#menu4").get(0).volume = 0;
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
  };

  this.renderSection = function (type) {
    if(type === 'cV.') {
      console.log('cv')
      $("#placeholder").load("assets/html/cv.html").fadeIn();
    }
    if (type === 'contact.') {
      console.log('contact')
      $("#placeholder").load("assets/html/contact.html").fadeIn();
    }
    if (type === 'art.') {
      console.log('contact')
      $("#placeholder").load("assets/html/art.html").fadeIn();
    }
  };

  this.ghostFadeIn = function (scene) {
    scene.children[2].children.forEach(function (i) {
      if (i.material.opacity < 1) {
        i.material.opacity += 0.1
        i.material.transparent = true;
      }
    })
  }
  this.ghostFadeOut = function (scene) {
    scene.children[2].children.forEach(function(i){ 
      if(i.material.opacity > 0) {
        i.material.opacity -= 0.1 
        i.material.transparent = true;
      }
    })
    
      // if (scene.position.x < 20) {
      //   scene.position.x += moveBy;
      //   moveBy += 0.1;      
      // } else if(scene.position.x < 40) {
      //   scene.position.x += moveBy;
      //   moveBy -= 0.1;
      // }
  }
}