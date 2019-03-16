"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Light;
function Light(scene, xyz, color, int) {
  var light = new THREE.DirectionalLight(color);
  light.position.x = xyz.x;
  light.position.y = xyz.y;
  light.position.z = xyz.z;
  light.intensity = int;
  scene.add(light);

}