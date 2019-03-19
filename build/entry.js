'use strict';
var mixer, mouseOn, intersectedObject;
var clock = new THREE.Clock();
var scene = new THREE.Scene();
var mouse = new THREE.Vector2();
var camera = new CameraObject();
var renderer = new RendererObject();
var raycaster = new THREE.Raycaster();
var effectGlitch = new THREE.GlitchPass()
var sceneObjects = new SceneObjects(scene);
var composer = new THREE.EffectComposer(renderer)
var renderPass = new THREE.RenderPass(scene, camera)
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var effect = new THREE.AnaglyphEffect(renderer, window.innerWidth, window.innerHeight);
sceneObjects.setUpComposer(composer, renderPass, effectGlitch)
var ghostVisible = true;
mouse.x = 2;
mouse.y = 2;

var onAnimationFrameHandler = function onAnimationFrameHandler() {
  var time = clock.getDelta();
  renderer.render(scene, camera);
  sceneObjects.update();

  if (clock.elapsedTime > 1 && clock.elapsedTime < 2) {
    sceneObjects.glitch(effectGlitch, false)
  }
  if (scene.children.length > 2) {
    if (ghostVisible) sceneObjects.ghostFadeIn(scene);
    if (!ghostVisible) sceneObjects.ghostFadeOut(scene);
    mixer = sceneObjects.getGhostMixer();
    mixer.update(time);
  }
  effect.render(scene, camera);

  composer.render(time)
  controls.update();
  window.requestAnimationFrame(onAnimationFrameHandler);
};
onAnimationFrameHandler();
// mouse movement
var onMouseMove = function onMouseMove(event) {
  raycaster.setFromCamera(mouse, camera);
  if (scene.children[2]) {
    sceneObjects.lightSetPos(
      scene.children.find(function (i) { 
        return i.type === "DirectionalLight"; 
      }), mouse
    );
    sceneObjects.ghostEyeRotate(scene.children[2].children[1], mouse);
    effect.setStrength(mouse.x/5)
    var intersects = raycaster.intersectObjects(scene.children[2].children);
    if (intersects.length > 0) {
      if (intersects[0].object !== intersectedObject) intersectedObject = intersects[0].object;
      if (intersectedObject.name === 'ZBrush_defualt_group002') mouseOn = 'eye';
    } else {
      intersectedObject = null;
      mouseOn = null;
    }
  }
  if(ghostVisible && mouseOn === 'eye'){
    sceneObjects.glitch(effectGlitch, true)
  }
  if (mouseOn !== 'eye' && clock.elapsedTime > 1.3) {
    sceneObjects.glitch(effectGlitch, false)
  }
  mouse.x = event.clientX / window.innerWidth * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
};
// mouse interaction
var onMouseDown = function onMouseDown(e) {  
  if (e.target.id === "title") {
    ghostVisible = true
    $('#placeholder').fadeOut()
    $('#menu2').get(0).play();
  }
  if (e.target.className.includes("item") ) {
    ghostVisible = false
    sceneObjects.renderSection(e.target.innerHTML)
  }
  if (e.target.id === 'audioIcon'){
    sceneObjects.toggleAudio()
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