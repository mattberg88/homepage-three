'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = ParticlesObject;
function ParticlesObject(scene) {
  var particleCount = 10000;
  var particles = new THREE.Geometry();
  var pMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 0.4
  });
  for (var p = 0; p < particleCount; p++) {
    var pX = Math.random() * 500 - 250;
    var pY = Math.random() * 500 - 250;
    var pZ = Math.random() * 500 - 250;
    var particle = new THREE.Vector3(pX, pY, pZ);
    particles.vertices.push(particle);
  }
  var particleSystem = new THREE.Points(
    particles,
    pMaterial
  );
  scene.add(particleSystem);
  this.rotate = function () {
    particleSystem.rotation.y -= 0.001;
  };
}
