'use strict';

// setup
var scene = new THREE.Scene();
var camera = new CameraObject();
var renderer = new RendererObject();
var raycaster = new THREE.Raycaster();
var clock = new THREE.Clock();
var sceneObjects = new SceneObjects(scene, camera);
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var mouse = new THREE.Vector2();
var mixer = void 0;
var mouseOn = void 0;
var intersectedObject = null;
// animation loop
var effect = new THREE.AnaglyphEffect(renderer, window.innerWidth, window.innerHeight);
var renderPass = new THREE.RenderPass(scene, camera)
var effectGlitch = new THREE.GlitchPass()
effectGlitch.goWild = true
effectGlitch.renderToScreen = true

var composer = new THREE.EffectComposer(renderer)
composer.addPass(renderPass)
composer.addPass(effectGlitch)
composer.setSize(window.innerWidth / 2, window.innerHeight / 2)

console.log($('#opensound'))

var onAnimationFrameHandler = function onAnimationFrameHandler() {
  renderer.render(scene, camera);
  if (clock.elapsedTime > 1.3) {
    effectGlitch.goWild = false
    effectGlitch.enabled = false
  }
  if (scene.children.length > 1) {
    mixer = sceneObjects.getGhostMixer();
    mixer.update(clock.getDelta());
  }
  effect.render(scene, camera);
  composer.render(clock.getDelta())
  controls.update();
  window.requestAnimationFrame(onAnimationFrameHandler);
};
onAnimationFrameHandler();
// mouse movement
var onMouseMove = function onMouseMove(event) {
  raycaster.setFromCamera(mouse, camera);
  if (scene.children.length > 1) {
    var intersects = raycaster.intersectObjects(scene.children[1].children);
    if (intersects.length > 0) {
      if (intersects[0].object !== intersectedObject) intersectedObject = intersects[0].object;
      if (intersectedObject.name === 'Button') mouseOn = 'button';
    } else {
      intersectedObject = null;
      mouseOn = null;
    }
  }
  mouse.x = event.clientX / window.innerWidth * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
};
// mouse interaction
var onMouseDown = function onMouseDown() {
  if (mouseOn === 'button') {
    sceneObjects.buttonPress();
  }
};
// window resize
var windowResizeHanlder = function windowResizeHanlder() {

  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHanlder();
// listeners
window.addEventListener('resize', windowResizeHanlder);
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mousedown', onMouseDown, false);
// dom
document.body.style.margin = 0;
document.body.appendChild(renderer.domElement);