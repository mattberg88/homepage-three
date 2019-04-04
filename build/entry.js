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

function animate() {
  renderer.render(scene, camera);
  sceneObjects.update();
  effect.setStrength(mouse.x / 10);
  if (clock.elapsedTime > 1.3 && clock.elapsedTime < 2) {
    sceneObjects.glitch(effectGlitch, false);
  }
  if (scene.children.length > 2) {
    sceneObjects.ghostFadeAnim(mouse);
    if (ghostVisible) sceneObjects.ghostFadeIn(scene);
    if (!ghostVisible) sceneObjects.ghostFadeOut(scene);
    mixer = sceneObjects.getGhostMixer();
    mixer.update(clock.getDelta());
  }
  effect.render(scene, camera);
  composer.render(clock.getDelta());
  controls.update();
  requestAnimationFrame(animate);
}

animate();
function onMouseMove(event) {
  raycaster.setFromCamera(mouse, camera);
  if (scene.children[2]) {
    sceneObjects.lightSetPos(
      scene.children.find(function (i) {
        return i.type === 'DirectionalLight';
      }), mouse
    );
    var intersects = raycaster.intersectObjects(scene.children[2].children[0].children);
    if (intersects.length > 0) {
      if (intersects[0].object !== intersectedObject) intersectedObject = intersects[0].object;
      if (intersects[0].object.name === 'ZBrush_defualt_group002') mouseOn = 'eye';
    } else {
      intersectedObject = null;
      mouseOn = null;
    }
  }
  mouse.x = event.clientX / window.innerWidth * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onMouseDown(e) {
  if (e.target.id === 'title') {
    ghostVisible = true;
    $('#placeholder').fadeOut();
    $('#menu2').get(0).play();
  }
  if (e.target.className.includes('item') ) {
    sceneObjects.glitch(effectGlitch, true);
    setTimeout(function () { sceneObjects.glitch(effectGlitch, false); }, 100);
    $('#staticsound').get(0).play();

    ghostVisible = false;
    sceneObjects.renderSection(e.target.innerHTML);
  }
  if (mouseOn === 'eye') {
    $('#menu4').get(0).play();
  }
  if (e.target.id === 'audioIcon') {
    sceneObjects.toggleAudio();
  }
}

function windowResizeHanlder() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

windowResizeHanlder();
window.addEventListener('resize', windowResizeHanlder);
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mousedown', onMouseDown, false);
document.body.style.margin = 0;
document.body.appendChild(renderer.domElement);
