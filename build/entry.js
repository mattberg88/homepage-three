'use strict';
var mixer, mouseOn, intersectedObject;
var scene = new THREE.Scene();
var camera = new CameraObject();
var renderer = new RendererObject();
var raycaster = new THREE.Raycaster();
var clock = new THREE.Clock();
var sceneObjects = new SceneObjects(scene, camera);
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var mouse = new THREE.Vector2();
var effect = new THREE.AnaglyphEffect(renderer, window.innerWidth, window.innerHeight);
var renderPass = new THREE.RenderPass(scene, camera)
var effectGlitch = new THREE.GlitchPass()
effectGlitch.goWild = true
effectGlitch.renderToScreen = true
scene.position.y = -5;
scene.position.z = 2
var composer = new THREE.EffectComposer(renderer)
composer.addPass(renderPass)
composer.addPass(effectGlitch)
composer.setSize(window.innerWidth / 2, window.innerHeight / 2)

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
  pMaterial);

// add it to the scene
scene.add(particleSystem);
var onAnimationFrameHandler = function onAnimationFrameHandler() {
  renderer.render(scene, camera);
  particleSystem.rotation.y -= 0.001;
  if (clock.elapsedTime > 1.3 && clock.elapsedTime < 2) {
    effectGlitch.goWild = false
    effectGlitch.enabled = false
  }
  if (scene.children.length > 2) {
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
    scene.children[0].position.x = mouse.x * -3
    scene.children[0].position.y = (mouse.y * 3) + 4
    scene.children[2].children[1].rotation.z = mouse.x + 3;
    scene.children[2].children[1].rotation.x = mouse.y - 1.58 
    effect.setStrength(mouse.x/4)

  }
  if (mouseOn === 'eye') { 
    effectGlitch.enabled = true
    effectGlitch.goWild = true
    sceneObjects.staticSound()
  } else {
    effectGlitch.enabled = false
    effectGlitch.goWild = false
  }
  if (scene.children.length > 1) {
    var intersects = raycaster.intersectObjects(scene.children[2].children);
    if (intersects.length > 0) {
      console.log(intersects)
      if (intersects[0].object !== intersectedObject) intersectedObject = intersects[0].object;
      if (intersectedObject.name === 'ZBrush_defualt_group002') mouseOn = 'eye';
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
  if (mouseOn === 'eye') {
    //sceneObjects.buttonPress();
  }
};
// window resize
var windowResizeHanlder = function windowResizeHanlder() {

  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
// var onLoad = function onLoad() {
//   $('#staticsound').get(0).volume = 0.6;
//   $('#staticsound').get(0).play();
// };
windowResizeHanlder();
// listeners
window.addEventListener('resize', windowResizeHanlder);
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mousedown', onMouseDown, false);
//window.addEventListener('load', onLoad);

// dom
document.body.style.margin = 0;
document.body.appendChild(renderer.domElement);