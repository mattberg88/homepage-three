"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Light;
function Light(scene) {
  var light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0.5, 1.2, -1).normalize();
  scene.add(light);
}