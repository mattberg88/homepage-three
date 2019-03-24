'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Ghost;
function Ghost(scene) {
  var gltfObject = null;
  var material = null;
  var mixer = null;
  var loader = new THREE.GLTFLoader();
  var normalMap = new THREE.TextureLoader().load("../assets/textures/demonnorms.gif");
  loader.load('../assets/gltf/threeanimtest6.gltf', function (obj) {
    scene.add(obj.scene);
    mixer = new THREE.AnimationMixer(obj.scene);
    gltfObject = obj;
    for (var i = 1; i < gltfObject.scene.children[0].children.length; i += 1) {
      obj.scene.children[0].children[i].position.y += 1;
      obj.scene.children[0].children[i].position.x += 1;
      material = obj.scene.children[0].children[i].material;

      material.transparent = true;
      // material.opacity = 0;
      material.normalMap = normalMap;
      material.normalMap.flipY = false;
      material.normalScale.x = 2;
      material.normalScale.y = 2;
      console.log(obj.animations)
      var clips = obj.animations
      var clipAnimation = new THREE.AnimationClip.findByName(clips, 'ArmatureAction');
      var action = mixer.clipAction(clipAnimation);
      action.play();
    }
  });
  this.getMixer = function () {
    return mixer;
  };
  this.getGhost = function () {
    return gltfObject;
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