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
var modelLoaded = false;
var isMobile = false
sceneObjects.glitch(effectGlitch, false)

var animate = function() {
  renderer.render(scene, camera);
  sceneObjects.update();
  if (scene.children.length > 2) {
    if (ghostVisible) sceneObjects.ghostFadeIn(scene);
    if (!ghostVisible) sceneObjects.ghostFadeOut(scene);
    mixer = sceneObjects.getGhostMixer();
    mixer.update(clock.getDelta());
  }
  effect.render(scene, camera);
  composer.render(clock.getDelta())
  controls.update();
  requestAnimationFrame(animate);
};
animate();
var onMouseMove = function(event) {
  raycaster.setFromCamera(mouse, camera);
  if (scene.children[2]) {
    sceneObjects.lightSetPos(
      scene.children.find(function (i) { 
        return i.type === "DirectionalLight"; 
      }), mouse
    );
    //sceneObjects.ghostEyeRotate(scene.children[2].children[1], mouse);
    effect.setStrength(mouse.x/5)
    var intersects = raycaster.intersectObjects(scene.children[2].children);
    if (intersects.length > 0) {
      if (intersects[0].object !== intersectedObject) intersectedObject = intersects[0].object;
      if (intersects[0].object.name === 'ZBrush_defualt_group002') mouseOn = 'eye';
    } else {
      intersectedObject = null;
      mouseOn = null;
    }
  }
  if(ghostVisible && mouseOn === 'eye'){
    $('#staticsound').get(0).play().then(() => { }).catch(e => { })
    sceneObjects.glitch(effectGlitch, true)
  }
  if (mouseOn !== 'eye' && clock.elapsedTime > 1.3) {
    sceneObjects.glitch(effectGlitch, false)
  }
  mouse.x = event.clientX / window.innerWidth * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
};
var onMouseDown = function(e) {  
  if (e.target.id === "title") {
    ghostVisible = true
    $('#placeholder').fadeOut()
    $('#menu2').get(0).play();
  }
  if (e.target.className.includes("item") ) {
    ghostVisible = false
    switch (e.target.innerHTML) {
      case 'art.':
        $("#placeholder").load("./html/art.html").fadeIn(); break;
      case 'web.':
        $("#placeholder").load("./html/web.html").fadeIn(); break;
      case 'cV.':
        $("#placeholder").load("./html/cv.html").fadeIn(); break;
      case 'bio.':
        $("#placeholder").load("./html/bio.html").fadeIn(); break;
      case 'contact.':
        $("#placeholder").load("./html/contact.html").fadeIn(); break;
      default: null;
    }
  }
  if (e.target.id === 'audioIcon'){
    sceneObjects.toggleAudio()
  }
};
var windowResizeHanlder = function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHanlder();
window.addEventListener('resize', windowResizeHanlder);
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mousedown', onMouseDown, false);
document.body.style.margin = 0;
document.body.appendChild(renderer.domElement);