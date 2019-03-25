"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SceneObjects;
function SceneObjects(scene) {
  var ghost = new Ghost(scene);
  var light = new Light(scene, { x: 0, y: 0, z: -5 }, 'white', 1);
  var particles = new ParticlesObject(scene);
  scene.position.set(0, -5, 2);

  this.update = function () {
    particles.rotate()
  };
  this.getGhostObject = function () {
    return ghost.getGhost();

  };
  this.getGhostMixer = function () {
    return ghost.getMixer();
  };
  this.ghostFadeAnim = function (mouse) {
    ghost.fadeAnim(mouse);
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
      $("#audioIcon").html('soundOn.').addClass('change')
      $("#dronesound").get(0).volume = 0.4;
      $("#staticsound").get(0).volume = 0.4;
      $("#menu2").get(0).volume = 0.4;
      $("#dronesound").get(0).play()
    } else {
      $("#audioIcon").html('soundOff.').removeClass('change');
      $("#menu2").get(0).volume = 0;
      $("#dronesound").get(0).pause()
      $("#staticsound").get(0).volume = 0;
    }
  };
  this.glitch = function (effectGlitch, bool) {
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
    switch (type) {
      case 'art.':
        $("#placeholder").load("assets/html/art.html").fadeIn(); break;
      case 'web.':
        $("#placeholder").load("assets/html/web.html").fadeIn(); break;
      case 'cV.' :
        $("#placeholder").load("assets/html/cv.html").fadeIn(); break;
      case 'bio.':
        $("#placeholder").load("assets/html/bio.html").fadeIn(); break;
      case 'contact.':
        $("#placeholder").load("assets/html/contact.html").fadeIn(); break;
        default: null;
    }
  };

  this.ghostFadeIn = function (scene) {
    console.log(scene.children[2].children[0].children);
    var meshes = scene.children[2].children[0].children.filter(function (i) { return i.type === 'SkinnedMesh' });
    console.log(meshes)
    meshes.forEach(function (i) {
     if (i.material.opacity < 1) {
       i.material.opacity += 0.1
       i.material.transparent = true;
     }
    })
  }
  this.ghostFadeOut = function (scene) {
    var meshes = scene.children[2].children[0].children.filter(function (i) { return i.type === 'SkinnedMesh' });
    meshes.forEach(function(i){ 
      if(i.material.opacity > 0) {
        i.material.opacity -= 0.1 
        i.material.transparent = true;
      }
    })
  }
}