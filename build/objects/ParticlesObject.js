'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ParticlesObject;
function ParticlesObject(scene) {
  var particleCount = 10000,
    particles = new THREE.Geometry(),
    pMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.4
    });
  for (var p = 0; p < particleCount; p++) {
    var pX = Math.random() * 500 - 250,
      pY = Math.random() * 500 - 250,
      pZ = Math.random() * 500 - 250,
      particle = new THREE.Vector3(pX, pY, pZ)
    particles.vertices.push(particle);
  }
  var particleSystem = new THREE.ParticleSystem(
    particles,
    pMaterial
  );
  scene.add(particleSystem);
  this.rotate = function() {
    particleSystem.rotation.y -= 0.001;
  }
}