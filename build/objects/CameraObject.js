"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CameraObject;
function CameraObject() {
  var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = -14;
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  return camera;
}