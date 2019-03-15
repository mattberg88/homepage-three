'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RendererObject;
function RendererObject() {
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor('white', 1);
  renderer.setPixelRatio(window.devicePixelRatio);
  return renderer;
}