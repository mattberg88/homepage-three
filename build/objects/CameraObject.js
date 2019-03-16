"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CameraObject;
function CameraObject() {
  var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = -14;
  camera.position.y = 1;

  camera.position.x = -1;

  camera.rotation._y = 22
  return camera;
}