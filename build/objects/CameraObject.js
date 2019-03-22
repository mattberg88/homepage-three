"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CameraObject;
function CameraObject() {
  var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = -14;
  return camera;
}