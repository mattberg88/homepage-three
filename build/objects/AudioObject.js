'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AudioObject;
function AudioObject(camera) {
  var listener = new THREE.AudioListener();
  camera.add(listener);
  var openSound = new THREE.Audio(listener);
  var staticSound = new THREE.Audio(listener);
  var audioLoader = new THREE.AudioLoader();
  audioLoader.load('../assets/sounds/Static.mp3', function (buffer) {
    staticSound.setBuffer(buffer);
    staticSound.setVolume(0.5);
  });
  audioLoader.load('../assets/sounds/electric_door_opening_1.mp3', function (buffer) {
    openSound.setBuffer(buffer);
    openSound.setVolume(0.5);
  });
  this.playOpen = function () {
    if (openSound.isPlaying) openSound.stop();
    openSound.play();
  };
  this.playStatic = function () {
    if (staticSound.isPlaying) staticSound.stop();
    staticSound.play();
  };
}