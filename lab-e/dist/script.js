/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


var appState = {
  currentStyle: '',
  styles: {
    'Styl 1': './styles/page1.css',
    'Styl 2': './styles/page2.css',
    'Styl 3': './styles/page3.css'
  }
};
function changeStyle(styleName) {
  console.log("Attempting to change style to: ".concat(styleName));
  var stylePath = appState.styles[styleName];
  if (!stylePath) {
    console.error("Style \"".concat(styleName, "\" not found."));
    return;
  }
  var existingLink = document.querySelector('link[data-app-style]');
  if (existingLink) {
    console.log('Removing existing style.');
    existingLink.remove();
  }
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = stylePath;
  link.setAttribute('data-app-style', 'true');
  document.head.appendChild(link);
  appState.currentStyle = styleName;
  console.log("Style successfully changed to: ".concat(styleName));
}
function generateStyleLinks() {
  var container = document.getElementById('style-links');
  if (!container) {
    console.error('Container for style links not found.');
    return;
  }
  container.innerHTML = '';
  var _loop = function _loop() {
    var styleName = _Object$keys[_i];
    var link = document.createElement('a');
    link.href = '#';
    link.textContent = styleName;
    link.onclick = function (event) {
      event.preventDefault();
      changeStyle(styleName);
    };
    container.appendChild(link);
    container.appendChild(document.createElement('br'));
  };
  for (var _i = 0, _Object$keys = Object.keys(appState.styles); _i < _Object$keys.length; _i++) {
    _loop();
  }
}
function initApp() {
  generateStyleLinks();
  changeStyle('Styl 1'); // Domyślny styl
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
/******/ })()
;