"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Portal;
function Portal(scene) {

  var geometry = new THREE.TorusKnotGeometry(4, 0.1, 200, 16, 10, 2, 10);
  var material = new THREE.MeshNormalMaterial({ wireframe: true });
  var cube = new THREE.Mesh(geometry, material);
  cube.position.z = 5
  cube.position.y = 1.9
  scene.add(cube);
  this.getCube = function () {
    return cube;
  }
}

