'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Ghost;
function Ghost(scene) {
  var gltfObject = null;
  var mixer = null;
  var loader = new THREE.GLTFLoader();
  loader.load('../assets/gltf/ghostanim4.gltf', function (obj) {
    scene.add(obj.scene);
    mixer = new THREE.AnimationMixer(obj.scene);
    gltfObject = obj;
    for (var i = 0; i < gltfObject.scene.children.length; i += 1) {
      gltfObject.scene.children[i].material.side = THREE.DoubleSide;
    }
  });
  this.getMixer = function () {
    return mixer;
  };
  this.open = function () {
    for (var i = 0; i < gltfObject.animations.length; i += 1) {
      mixer.clipAction(gltfObject.animations[i]).paused = false;
      mixer.clipAction(gltfObject.animations[i]).setLoop(THREE.LoopOnce);
      mixer.clipAction(gltfObject.animations[i]).timeScale = -1;
      mixer.clipAction(gltfObject.animations[i]).play();
    }
  };
  this.close = function () {
    for (var i = 0; i < gltfObject.animations.length; i += 1) {
      mixer.clipAction(gltfObject.animations[i]).paused = false;
      mixer.clipAction(gltfObject.animations[i]).timeScale = 1;
      mixer.clipAction(gltfObject.animations[i]).clampWhenFinished = true;
      mixer.clipAction(gltfObject.animations[i]).setLoop(THREE.LoopOnce).play();
    }
  };
}