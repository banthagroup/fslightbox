(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/FsLightbox.scss":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/FsLightbox.scss ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Imports\nexports.push([module.i, \"@import url(https://fonts.googleapis.com/css?family=Roboto);\", \"\"]);\n\n// Module\nexports.push([module.i, \".fslightbox-absoluted {\\n  position: absolute;\\n  top: 0;\\n  left: 0; }\\n\\n.fslightbox-fade-in {\\n  animation: fslightbox-fade-in 0.25s cubic-bezier(0, 0, 0.7, 1); }\\n\\n.fslightbox-fade-out {\\n  animation: fslightbox-fade-out .25s ease; }\\n\\n.fslightbox-fade-in-strong {\\n  animation: fslightbox-fade-in-strong 0.25s cubic-bezier(0, 0, 0.7, 1); }\\n\\n.fslightbox-fade-out-strong {\\n  animation: fslightbox-fade-out-strong .25s ease; }\\n\\n@keyframes fslightbox-fade-in {\\n  from {\\n    opacity: .65; }\\n  to {\\n    opacity: 1; } }\\n\\n@keyframes fslightbox-fade-out {\\n  from {\\n    opacity: .35; }\\n  to {\\n    opacity: 0; } }\\n\\n@keyframes fslightbox-fade-in-strong {\\n  from {\\n    opacity: .3; }\\n  to {\\n    opacity: 1; } }\\n\\n@keyframes fslightbox-fade-out-strong {\\n  from {\\n    opacity: 1; }\\n  to {\\n    opacity: 0; } }\\n\\n.fslightbox-cursor-grabbing {\\n  cursor: grabbing; }\\n\\n.fslightbox-full-dimension {\\n  width: 100%;\\n  height: 100%; }\\n\\n.fslightbox-open {\\n  overflow: hidden;\\n  height: 100%; }\\n\\n.fslightbox-flex-centered {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center; }\\n\\n.fslightbox-opacity-0 {\\n  opacity: 0 !important; }\\n\\n.fslightbox-opacity-1 {\\n  opacity: 1 !important; }\\n\\n.fslightbox-scrollbarfix {\\n  padding-right: 17px; }\\n\\n.fslightbox-transform-transition {\\n  transition: transform .3s; }\\n\\n.fslightbox-container {\\n  font-family: \\\"Roboto\\\", sans-serif;\\n  position: fixed;\\n  top: 0;\\n  left: 0;\\n  background: linear-gradient(rgba(30, 30, 30, 0.9), black 1810%);\\n  z-index: 9999999;\\n  -webkit-user-select: none;\\n  -moz-user-select: none;\\n  -ms-user-select: none;\\n  user-select: none;\\n  -webkit-tap-highlight-color: transparent; }\\n  .fslightbox-container * {\\n    box-sizing: border-box; }\\n\\n.fslightbox-svg-path {\\n  transition: fill .15s ease;\\n  fill: #ddd; }\\n\\n.fslightbox-nav {\\n  height: 45px;\\n  width: 100%;\\n  position: absolute;\\n  top: 0;\\n  left: 0; }\\n\\n.fslightbox-slide-number-container {\\n  height: 100%;\\n  font-size: 14px;\\n  color: #d7d7d7;\\n  z-index: 0;\\n  max-width: 55px; }\\n  .fslightbox-slide-number-container div {\\n    padding: 0 1.5px; }\\n\\n.fslightbox-slash {\\n  margin-top: -1.5px;\\n  font-size: 16px; }\\n\\n.fslightbox-toolbar {\\n  position: absolute;\\n  z-index: 3;\\n  right: 0;\\n  top: 0;\\n  height: 100%;\\n  display: flex;\\n  background: rgba(35, 35, 35, 0.65); }\\n\\n.fslightbox-toolbar-button {\\n  height: 100%;\\n  width: 45px;\\n  cursor: pointer; }\\n\\n.fslightbox-toolbar-button:hover .fslightbox-svg-path {\\n  fill: white; }\\n\\n.fslightbox-slide-btn-container {\\n  display: flex;\\n  align-items: center;\\n  padding: 12px 12px 12px 6px;\\n  position: absolute;\\n  top: 50%;\\n  cursor: pointer;\\n  z-index: 3;\\n  transform: translateY(-50%); }\\n  @media (min-width: 476px) {\\n    .fslightbox-slide-btn-container {\\n      padding: 22px 22px 22px 6px; } }\\n  @media (min-width: 768px) {\\n    .fslightbox-slide-btn-container {\\n      padding: 30px 30px 30px 6px; } }\\n\\n.fslightbox-slide-btn-container:hover .fslightbox-svg-path {\\n  fill: #f1f1f1; }\\n\\n.fslightbox-slide-btn {\\n  padding: 9px;\\n  font-size: 26px;\\n  background: rgba(35, 35, 35, 0.65); }\\n  @media (min-width: 768px) {\\n    .fslightbox-slide-btn {\\n      padding: 10px; } }\\n  @media (min-width: 1600px) {\\n    .fslightbox-slide-btn {\\n      padding: 11px; } }\\n\\n.fslightbox-slide-btn-previous-container {\\n  left: 0; }\\n\\n@media (max-width: 475.99px) {\\n  .fslightbox-slide-btn-previous-container {\\n    padding-left: 3px; } }\\n\\n.fslightbox-slide-btn-next-container {\\n  right: 0;\\n  padding-left: 12px;\\n  padding-right: 3px; }\\n  @media (min-width: 476px) {\\n    .fslightbox-slide-btn-next-container {\\n      padding-left: 22px; } }\\n  @media (min-width: 768px) {\\n    .fslightbox-slide-btn-next-container {\\n      padding-left: 30px; } }\\n\\n@media (min-width: 476px) {\\n  .fslightbox-slide-btn-next-container {\\n    padding-right: 6px; } }\\n\\n.fslightbox-down-event-detector {\\n  position: absolute;\\n  z-index: 1; }\\n\\n.fslightbox-slide-swiping-hoverer {\\n  z-index: 4; }\\n\\n.fslightbox-invalid-file-wrapper {\\n  font-size: 22px;\\n  color: #eaebeb;\\n  margin: auto; }\\n\\n.fslightbox-video {\\n  object-fit: cover; }\\n\\n.fslightbox-youtube-iframe {\\n  border: 0; }\\n\\n.fslightbox-loader {\\n  display: block;\\n  margin: auto;\\n  position: absolute;\\n  top: 50%;\\n  left: 50%;\\n  transform: translate(-50%, -50%);\\n  width: 67px;\\n  height: 67px; }\\n  .fslightbox-loader div {\\n    box-sizing: border-box;\\n    display: block;\\n    position: absolute;\\n    width: 54px;\\n    height: 54px;\\n    margin: 6px;\\n    border: 5px solid;\\n    border-color: #999 transparent transparent transparent;\\n    border-radius: 50%;\\n    animation: fslightbox-loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite; }\\n  .fslightbox-loader div:nth-child(1) {\\n    animation-delay: -0.45s; }\\n  .fslightbox-loader div:nth-child(2) {\\n    animation-delay: -0.3s; }\\n  .fslightbox-loader div:nth-child(3) {\\n    animation-delay: -0.15s; }\\n\\n@keyframes fslightbox-loader {\\n  0% {\\n    transform: rotate(0deg); }\\n  100% {\\n    transform: rotate(360deg); } }\\n\\n.fslightbox-source {\\n  position: relative;\\n  margin: auto;\\n  opacity: 0;\\n  z-index: 2;\\n  backface-visibility: hidden;\\n  transform: translateZ(0);\\n  transition: opacity .3s;\\n  will-change: opacity; }\\n\\n.fslightbox-source-outer {\\n  will-change: transform; }\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/scss/FsLightbox.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return '@media ' + item[2] + '{' + content + '}';\n      } else {\n        return content;\n      }\n    }).join('');\n  }; // import a list of modules into the list\n\n\n  list.i = function (modules, mediaQuery) {\n    if (typeof modules === 'string') {\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    for (var i = 0; i < this.length; i++) {\n      var id = this[i][0];\n\n      if (id != null) {\n        alreadyImportedModules[id] = true;\n      }\n    }\n\n    for (i = 0; i < modules.length; i++) {\n      var item = modules[i]; // skip already imported module\n      // this implementation is not 100% perfect for weird media query combinations\n      // when a module is imported multiple times with different media queries.\n      // I hope this will never occur (Hey this way we have smaller bundles)\n\n      if (item[0] == null || !alreadyImportedModules[item[0]]) {\n        if (mediaQuery && !item[2]) {\n          item[2] = mediaQuery;\n        } else if (mediaQuery) {\n          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';\n        }\n\n        list.push(item);\n      }\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || '';\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n  return '/*# ' + data + ' */';\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\nvar stylesInDom = {};\n\nvar\tmemoize = function (fn) {\n\tvar memo;\n\n\treturn function () {\n\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\n\t\treturn memo;\n\t};\n};\n\nvar isOldIE = memoize(function () {\n\t// Test for IE <= 9 as proposed by Browserhacks\n\t// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n\t// Tests for existence of standard globals is to allow style-loader\n\t// to operate correctly into non-standard environments\n\t// @see https://github.com/webpack-contrib/style-loader/issues/177\n\treturn window && document && document.all && !window.atob;\n});\n\nvar getTarget = function (target, parent) {\n  if (parent){\n    return parent.querySelector(target);\n  }\n  return document.querySelector(target);\n};\n\nvar getElement = (function (fn) {\n\tvar memo = {};\n\n\treturn function(target, parent) {\n                // If passing function in options, then use it for resolve \"head\" element.\n                // Useful for Shadow Root style i.e\n                // {\n                //   insertInto: function () { return document.querySelector(\"#foo\").shadowRoot }\n                // }\n                if (typeof target === 'function') {\n                        return target();\n                }\n                if (typeof memo[target] === \"undefined\") {\n\t\t\tvar styleTarget = getTarget.call(this, target, parent);\n\t\t\t// Special case to return head of iframe instead of iframe itself\n\t\t\tif (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n\t\t\t\ttry {\n\t\t\t\t\t// This will throw an exception if access to iframe is blocked\n\t\t\t\t\t// due to cross-origin restrictions\n\t\t\t\t\tstyleTarget = styleTarget.contentDocument.head;\n\t\t\t\t} catch(e) {\n\t\t\t\t\tstyleTarget = null;\n\t\t\t\t}\n\t\t\t}\n\t\t\tmemo[target] = styleTarget;\n\t\t}\n\t\treturn memo[target]\n\t};\n})();\n\nvar singleton = null;\nvar\tsingletonCounter = 0;\nvar\tstylesInsertedAtTop = [];\n\nvar\tfixUrls = __webpack_require__(/*! ./urls */ \"./node_modules/style-loader/lib/urls.js\");\n\nmodule.exports = function(list, options) {\n\tif (typeof DEBUG !== \"undefined\" && DEBUG) {\n\t\tif (typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\n\t}\n\n\toptions = options || {};\n\n\toptions.attrs = typeof options.attrs === \"object\" ? options.attrs : {};\n\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n\t// tags it will allow on a page\n\tif (!options.singleton && typeof options.singleton !== \"boolean\") options.singleton = isOldIE();\n\n\t// By default, add <style> tags to the <head> element\n        if (!options.insertInto) options.insertInto = \"head\";\n\n\t// By default, add <style> tags to the bottom of the target\n\tif (!options.insertAt) options.insertAt = \"bottom\";\n\n\tvar styles = listToStyles(list, options);\n\n\taddStylesToDom(styles, options);\n\n\treturn function update (newList) {\n\t\tvar mayRemove = [];\n\n\t\tfor (var i = 0; i < styles.length; i++) {\n\t\t\tvar item = styles[i];\n\t\t\tvar domStyle = stylesInDom[item.id];\n\n\t\t\tdomStyle.refs--;\n\t\t\tmayRemove.push(domStyle);\n\t\t}\n\n\t\tif(newList) {\n\t\t\tvar newStyles = listToStyles(newList, options);\n\t\t\taddStylesToDom(newStyles, options);\n\t\t}\n\n\t\tfor (var i = 0; i < mayRemove.length; i++) {\n\t\t\tvar domStyle = mayRemove[i];\n\n\t\t\tif(domStyle.refs === 0) {\n\t\t\t\tfor (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();\n\n\t\t\t\tdelete stylesInDom[domStyle.id];\n\t\t\t}\n\t\t}\n\t};\n};\n\nfunction addStylesToDom (styles, options) {\n\tfor (var i = 0; i < styles.length; i++) {\n\t\tvar item = styles[i];\n\t\tvar domStyle = stylesInDom[item.id];\n\n\t\tif(domStyle) {\n\t\t\tdomStyle.refs++;\n\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\n\t\t\t}\n\n\t\t\tfor(; j < item.parts.length; j++) {\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\t\t} else {\n\t\t\tvar parts = [];\n\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\n\t\t}\n\t}\n}\n\nfunction listToStyles (list, options) {\n\tvar styles = [];\n\tvar newStyles = {};\n\n\tfor (var i = 0; i < list.length; i++) {\n\t\tvar item = list[i];\n\t\tvar id = options.base ? item[0] + options.base : item[0];\n\t\tvar css = item[1];\n\t\tvar media = item[2];\n\t\tvar sourceMap = item[3];\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\n\n\t\tif(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});\n\t\telse newStyles[id].parts.push(part);\n\t}\n\n\treturn styles;\n}\n\nfunction insertStyleElement (options, style) {\n\tvar target = getElement(options.insertInto)\n\n\tif (!target) {\n\t\tthrow new Error(\"Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.\");\n\t}\n\n\tvar lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];\n\n\tif (options.insertAt === \"top\") {\n\t\tif (!lastStyleElementInsertedAtTop) {\n\t\t\ttarget.insertBefore(style, target.firstChild);\n\t\t} else if (lastStyleElementInsertedAtTop.nextSibling) {\n\t\t\ttarget.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);\n\t\t} else {\n\t\t\ttarget.appendChild(style);\n\t\t}\n\t\tstylesInsertedAtTop.push(style);\n\t} else if (options.insertAt === \"bottom\") {\n\t\ttarget.appendChild(style);\n\t} else if (typeof options.insertAt === \"object\" && options.insertAt.before) {\n\t\tvar nextSibling = getElement(options.insertAt.before, target);\n\t\ttarget.insertBefore(style, nextSibling);\n\t} else {\n\t\tthrow new Error(\"[Style Loader]\\n\\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\\n Must be 'top', 'bottom', or Object.\\n (https://github.com/webpack-contrib/style-loader#insertat)\\n\");\n\t}\n}\n\nfunction removeStyleElement (style) {\n\tif (style.parentNode === null) return false;\n\tstyle.parentNode.removeChild(style);\n\n\tvar idx = stylesInsertedAtTop.indexOf(style);\n\tif(idx >= 0) {\n\t\tstylesInsertedAtTop.splice(idx, 1);\n\t}\n}\n\nfunction createStyleElement (options) {\n\tvar style = document.createElement(\"style\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\n\tif(options.attrs.nonce === undefined) {\n\t\tvar nonce = getNonce();\n\t\tif (nonce) {\n\t\t\toptions.attrs.nonce = nonce;\n\t\t}\n\t}\n\n\taddAttrs(style, options.attrs);\n\tinsertStyleElement(options, style);\n\n\treturn style;\n}\n\nfunction createLinkElement (options) {\n\tvar link = document.createElement(\"link\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\toptions.attrs.rel = \"stylesheet\";\n\n\taddAttrs(link, options.attrs);\n\tinsertStyleElement(options, link);\n\n\treturn link;\n}\n\nfunction addAttrs (el, attrs) {\n\tObject.keys(attrs).forEach(function (key) {\n\t\tel.setAttribute(key, attrs[key]);\n\t});\n}\n\nfunction getNonce() {\n\tif (false) {}\n\n\treturn __webpack_require__.nc;\n}\n\nfunction addStyle (obj, options) {\n\tvar style, update, remove, result;\n\n\t// If a transform function was defined, run it on the css\n\tif (options.transform && obj.css) {\n\t    result = typeof options.transform === 'function'\n\t\t ? options.transform(obj.css) \n\t\t : options.transform.default(obj.css);\n\n\t    if (result) {\n\t    \t// If transform returns a value, use that instead of the original css.\n\t    \t// This allows running runtime transformations on the css.\n\t    \tobj.css = result;\n\t    } else {\n\t    \t// If the transform function returns a falsy value, don't add this css.\n\t    \t// This allows conditional loading of css\n\t    \treturn function() {\n\t    \t\t// noop\n\t    \t};\n\t    }\n\t}\n\n\tif (options.singleton) {\n\t\tvar styleIndex = singletonCounter++;\n\n\t\tstyle = singleton || (singleton = createStyleElement(options));\n\n\t\tupdate = applyToSingletonTag.bind(null, style, styleIndex, false);\n\t\tremove = applyToSingletonTag.bind(null, style, styleIndex, true);\n\n\t} else if (\n\t\tobj.sourceMap &&\n\t\ttypeof URL === \"function\" &&\n\t\ttypeof URL.createObjectURL === \"function\" &&\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\n\t\ttypeof Blob === \"function\" &&\n\t\ttypeof btoa === \"function\"\n\t) {\n\t\tstyle = createLinkElement(options);\n\t\tupdate = updateLink.bind(null, style, options);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\n\t\t\tif(style.href) URL.revokeObjectURL(style.href);\n\t\t};\n\t} else {\n\t\tstyle = createStyleElement(options);\n\t\tupdate = applyToTag.bind(null, style);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\t\t};\n\t}\n\n\tupdate(obj);\n\n\treturn function updateStyle (newObj) {\n\t\tif (newObj) {\n\t\t\tif (\n\t\t\t\tnewObj.css === obj.css &&\n\t\t\t\tnewObj.media === obj.media &&\n\t\t\t\tnewObj.sourceMap === obj.sourceMap\n\t\t\t) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tupdate(obj = newObj);\n\t\t} else {\n\t\t\tremove();\n\t\t}\n\t};\n}\n\nvar replaceText = (function () {\n\tvar textStore = [];\n\n\treturn function (index, replacement) {\n\t\ttextStore[index] = replacement;\n\n\t\treturn textStore.filter(Boolean).join('\\n');\n\t};\n})();\n\nfunction applyToSingletonTag (style, index, remove, obj) {\n\tvar css = remove ? \"\" : obj.css;\n\n\tif (style.styleSheet) {\n\t\tstyle.styleSheet.cssText = replaceText(index, css);\n\t} else {\n\t\tvar cssNode = document.createTextNode(css);\n\t\tvar childNodes = style.childNodes;\n\n\t\tif (childNodes[index]) style.removeChild(childNodes[index]);\n\n\t\tif (childNodes.length) {\n\t\t\tstyle.insertBefore(cssNode, childNodes[index]);\n\t\t} else {\n\t\t\tstyle.appendChild(cssNode);\n\t\t}\n\t}\n}\n\nfunction applyToTag (style, obj) {\n\tvar css = obj.css;\n\tvar media = obj.media;\n\n\tif(media) {\n\t\tstyle.setAttribute(\"media\", media)\n\t}\n\n\tif(style.styleSheet) {\n\t\tstyle.styleSheet.cssText = css;\n\t} else {\n\t\twhile(style.firstChild) {\n\t\t\tstyle.removeChild(style.firstChild);\n\t\t}\n\n\t\tstyle.appendChild(document.createTextNode(css));\n\t}\n}\n\nfunction updateLink (link, options, obj) {\n\tvar css = obj.css;\n\tvar sourceMap = obj.sourceMap;\n\n\t/*\n\t\tIf convertToAbsoluteUrls isn't defined, but sourcemaps are enabled\n\t\tand there is no publicPath defined then lets turn convertToAbsoluteUrls\n\t\ton by default.  Otherwise default to the convertToAbsoluteUrls option\n\t\tdirectly\n\t*/\n\tvar autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;\n\n\tif (options.convertToAbsoluteUrls || autoFixUrls) {\n\t\tcss = fixUrls(css);\n\t}\n\n\tif (sourceMap) {\n\t\t// http://stackoverflow.com/a/26603875\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\n\t}\n\n\tvar blob = new Blob([css], { type: \"text/css\" });\n\n\tvar oldSrc = link.href;\n\n\tlink.href = URL.createObjectURL(blob);\n\n\tif(oldSrc) URL.revokeObjectURL(oldSrc);\n}\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/addStyles.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n/**\n * When source maps are enabled, `style-loader` uses a link element with a data-uri to\n * embed the css on the page. This breaks all relative urls because now they are relative to a\n * bundle instead of the current page.\n *\n * One solution is to only use full urls, but that may be impossible.\n *\n * Instead, this function \"fixes\" the relative urls to be absolute according to the current page location.\n *\n * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.\n *\n */\n\nmodule.exports = function (css) {\n  // get current location\n  var location = typeof window !== \"undefined\" && window.location;\n\n  if (!location) {\n    throw new Error(\"fixUrls requires window.location\");\n  }\n\n\t// blank or null?\n\tif (!css || typeof css !== \"string\") {\n\t  return css;\n  }\n\n  var baseUrl = location.protocol + \"//\" + location.host;\n  var currentDir = baseUrl + location.pathname.replace(/\\/[^\\/]*$/, \"/\");\n\n\t// convert each url(...)\n\t/*\n\tThis regular expression is just a way to recursively match brackets within\n\ta string.\n\n\t /url\\s*\\(  = Match on the word \"url\" with any whitespace after it and then a parens\n\t   (  = Start a capturing group\n\t     (?:  = Start a non-capturing group\n\t         [^)(]  = Match anything that isn't a parentheses\n\t         |  = OR\n\t         \\(  = Match a start parentheses\n\t             (?:  = Start another non-capturing groups\n\t                 [^)(]+  = Match anything that isn't a parentheses\n\t                 |  = OR\n\t                 \\(  = Match a start parentheses\n\t                     [^)(]*  = Match anything that isn't a parentheses\n\t                 \\)  = Match a end parentheses\n\t             )  = End Group\n              *\\) = Match anything and then a close parens\n          )  = Close non-capturing group\n          *  = Match anything\n       )  = Close capturing group\n\t \\)  = Match a close parens\n\n\t /gi  = Get all matches, not the first.  Be case insensitive.\n\t */\n\tvar fixedCss = css.replace(/url\\s*\\(((?:[^)(]|\\((?:[^)(]+|\\([^)(]*\\))*\\))*)\\)/gi, function(fullMatch, origUrl) {\n\t\t// strip quotes (if they exist)\n\t\tvar unquotedOrigUrl = origUrl\n\t\t\t.trim()\n\t\t\t.replace(/^\"(.*)\"$/, function(o, $1){ return $1; })\n\t\t\t.replace(/^'(.*)'$/, function(o, $1){ return $1; });\n\n\t\t// already a full url? no change\n\t\tif (/^(#|data:|http:\\/\\/|https:\\/\\/|file:\\/\\/\\/|\\s*$)/i.test(unquotedOrigUrl)) {\n\t\t  return fullMatch;\n\t\t}\n\n\t\t// convert the url to a full url\n\t\tvar newUrl;\n\n\t\tif (unquotedOrigUrl.indexOf(\"//\") === 0) {\n\t\t  \t//TODO: should we add protocol?\n\t\t\tnewUrl = unquotedOrigUrl;\n\t\t} else if (unquotedOrigUrl.indexOf(\"/\") === 0) {\n\t\t\t// path should be relative to the base url\n\t\t\tnewUrl = baseUrl + unquotedOrigUrl; // already starts with '/'\n\t\t} else {\n\t\t\t// path should be relative to current directory\n\t\t\tnewUrl = currentDir + unquotedOrigUrl.replace(/^\\.\\//, \"\"); // Strip leading './'\n\t\t}\n\n\t\t// send back the fixed url(...)\n\t\treturn \"url(\" + JSON.stringify(newUrl) + \")\";\n\t});\n\n\t// send back the fixed css\n\treturn fixedCss;\n};\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/urls.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_FsLightbox_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/FsLightbox.scss */ \"./src/scss/FsLightbox.scss\");\n/* harmony import */ var _scss_FsLightbox_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_FsLightbox_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _js_FsLightbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/FsLightbox */ \"./src/js/FsLightbox.js\");\n\n\nwindow.fsLightboxInstances = {};\nvar a = document.getElementsByTagName('a');\n\nvar _loop = function _loop(i) {\n  if (!a[i].hasAttribute('data-fslightbox')) {\n    return \"continue\";\n  }\n\n  var instanceName = a[i].getAttribute('data-fslightbox');\n  var href = a[i].getAttribute('href');\n\n  if (!fsLightboxInstances[instanceName]) {\n    fsLightboxInstances[instanceName] = new FsLightbox();\n  }\n\n  var source = null;\n  href.charAt(0) === '#' ? source = document.getElementById(href.substring(1)) : source = href;\n  fsLightboxInstances[instanceName].props.sources.push(source);\n  fsLightboxInstances[instanceName].elements.a.push(a[i]);\n  var currentIndex = fsLightboxInstances[instanceName].props.sources.length - 1;\n  setUpProp('types', 'data-type');\n  setUpProp('videosPosters', 'data-video-poster');\n  setUpProp('maxWidths', 'data-max-width');\n  setUpProp('maxHeights', 'data-max-height');\n\n  function setUpProp(propName, attributeName) {\n    if (a[i].hasAttribute(attributeName)) {\n      fsLightboxInstances[instanceName].props[propName][currentIndex] = a[i].getAttribute(attributeName);\n    }\n  }\n};\n\nfor (var i = 0; i < a.length; i++) {\n  var _ret = _loop(i);\n\n  if (_ret === \"continue\") continue;\n}\n\nvar fsLightboxKeys = Object.keys(fsLightboxInstances);\nwindow.fsLightbox = fsLightboxInstances[fsLightboxKeys[fsLightboxKeys.length - 1]];\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/js/FsLightbox.js":
/*!******************************!*\
  !*** ./src/js/FsLightbox.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core_collections_getSourcesHoldersTransformersCollection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/collections/getSourcesHoldersTransformersCollection */ \"./src/js/core/collections/getSourcesHoldersTransformersCollection.js\");\n/* harmony import */ var _core_sources_getSourcesCount__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/sources/getSourcesCount */ \"./src/js/core/sources/getSourcesCount.js\");\n/* harmony import */ var _core_setUpCore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/setUpCore */ \"./src/js/core/setUpCore.js\");\nfunction isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\n\n\n\n\nwindow.FsLightbox = function () {\n  var _this = this;\n\n  /**\n   * @property { Array } sources\n   *\n   * @property { Array } maxWidths\n   * @property { Array } maxHeights\n   * @property { Object } globalMaxDimensions\n   *\n   * @property { Function } onOpen\n   * @property { Function } onClose\n   * @property { Function } onInit\n   * @property { Function } onShow\n   *\n   * @property { Boolean } disableLocalStorage\n   * @property { Array } types\n   * @property { String } type\n   *\n   * @property { Array } videosPosters\n   * @property { Number } slideDistance\n   * @property { Boolean } openOnMount\n   */\n  this.props = {\n    sources: [],\n    maxWidths: [],\n    maxHeights: [],\n    types: [],\n    videosPosters: []\n  };\n  this.data = {\n    sourcesCount: Object(_core_sources_getSourcesCount__WEBPACK_IMPORTED_MODULE_1__[\"getSourcesCount\"])(this),\n    isInitialized: false,\n    maxSourceWidth: 0,\n    maxSourceHeight: 0,\n    scrollbarWidth: 0,\n    slideDistance: this.props.slideDistance ? this.props.slideDistance : 0.3\n  };\n  this.slideSwipingProps = {\n    isSwiping: false,\n    downClientX: null,\n    isSourceDownEventTarget: false,\n    swipedX: 0\n  };\n  /**\n   * @property { Number } previous\n   * @property { Number } current\n   * @property { Number } next\n   */\n\n  this.stageIndexes = {};\n  this.elements = {\n    // array of <a> tags lightbox was created from\n    a: [],\n    container: null,\n    sourcesOutersWrapper: null,\n    sources: [],\n    sourcesOuters: [],\n    sourcesInners: [],\n    sourcesComponents: []\n  };\n\n  this.resolve = function (dependency) {\n    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];\n    params.unshift(_this);\n    return _construct(dependency, _toConsumableArray(params));\n  };\n\n  this.collections = {\n    sourcesOutersTransformers: Object(_core_collections_getSourcesHoldersTransformersCollection__WEBPACK_IMPORTED_MODULE_0__[\"getSourcesHoldersTransformersCollection\"])(this),\n    sourcesLoadsHandlers: [],\n    // after source load its size adjuster will be stored in this array so it may be later resized\n    sourcesStylers: [],\n    // if lightbox is unmounted pending xhrs need to be aborted\n    xhrs: []\n  };\n  this.core = {\n    classFacade: {},\n    eventsDispatcher: {},\n    fullscreenToggler: {},\n    globalEventsController: {},\n    lightboxCloser: {},\n    lightboxOpener: {},\n    lightboxOpenActioner: {},\n    lightboxUpdater: {},\n    scrollbarRecompensor: {},\n    slideChangeFacade: {},\n    slideIndexChanger: {},\n    slideSwipingDown: {},\n    sourceLoadActioner: {},\n    stageManager: {},\n    windowResizeActioner: {}\n  };\n  Object(_core_setUpCore__WEBPACK_IMPORTED_MODULE_2__[\"setUpCore\"])(this);\n  this.open = this.core.lightboxOpener.open;\n\n  this.close = function () {};\n};\n\n//# sourceURL=webpack:///./src/js/FsLightbox.js?");

/***/ }),

/***/ "./src/js/components/sources/proper-sources/renderCustom.js":
/*!******************************************************************!*\
  !*** ./src/js/components/sources/proper-sources/renderCustom.js ***!
  \******************************************************************/
/*! exports provided: renderCustom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderCustom\", function() { return renderCustom; });\nfunction renderCustom() {}\n\n//# sourceURL=webpack:///./src/js/components/sources/proper-sources/renderCustom.js?");

/***/ }),

/***/ "./src/js/components/sources/proper-sources/renderImage.js":
/*!*****************************************************************!*\
  !*** ./src/js/components/sources/proper-sources/renderImage.js ***!
  \*****************************************************************/
/*! exports provided: renderImage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderImage\", function() { return renderImage; });\nfunction renderImage() {}\n\n//# sourceURL=webpack:///./src/js/components/sources/proper-sources/renderImage.js?");

/***/ }),

/***/ "./src/js/components/sources/proper-sources/renderInvalid.js":
/*!*******************************************************************!*\
  !*** ./src/js/components/sources/proper-sources/renderInvalid.js ***!
  \*******************************************************************/
/*! exports provided: renderInvalid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderInvalid\", function() { return renderInvalid; });\nfunction renderInvalid() {}\n\n//# sourceURL=webpack:///./src/js/components/sources/proper-sources/renderInvalid.js?");

/***/ }),

/***/ "./src/js/components/sources/proper-sources/renderVideo.js":
/*!*****************************************************************!*\
  !*** ./src/js/components/sources/proper-sources/renderVideo.js ***!
  \*****************************************************************/
/*! exports provided: renderVideo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderVideo\", function() { return renderVideo; });\nfunction renderVideo() {}\n\n//# sourceURL=webpack:///./src/js/components/sources/proper-sources/renderVideo.js?");

/***/ }),

/***/ "./src/js/components/sources/proper-sources/renderYoutube.js":
/*!*******************************************************************!*\
  !*** ./src/js/components/sources/proper-sources/renderYoutube.js ***!
  \*******************************************************************/
/*! exports provided: renderYoutube */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderYoutube\", function() { return renderYoutube; });\nfunction renderYoutube() {}\n\n//# sourceURL=webpack:///./src/js/components/sources/proper-sources/renderYoutube.js?");

/***/ }),

/***/ "./src/js/components/sources/renderSourceInner.js":
/*!********************************************************!*\
  !*** ./src/js/components/sources/renderSourceInner.js ***!
  \********************************************************/
/*! exports provided: renderSourceInner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderSourceInner\", function() { return renderSourceInner; });\nfunction renderSourceInner(fsLightbox, i) {}\n\n//# sourceURL=webpack:///./src/js/components/sources/renderSourceInner.js?");

/***/ }),

/***/ "./src/js/components/sources/renderSourceOuter.js":
/*!********************************************************!*\
  !*** ./src/js/components/sources/renderSourceOuter.js ***!
  \********************************************************/
/*! exports provided: renderSourceOuter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderSourceOuter\", function() { return renderSourceOuter; });\n/* harmony import */ var _constants_classes_names__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants/classes-names */ \"./src/js/constants/classes-names.js\");\n/* harmony import */ var _renderSourceInner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderSourceInner */ \"./src/js/components/sources/renderSourceInner.js\");\n\n\nfunction renderSourceOuter(fsLightbox, i) {\n  var _fsLightbox$elements = fsLightbox.elements,\n      sourcesOutersWrapper = _fsLightbox$elements.sourcesOutersWrapper,\n      sourcesOuters = _fsLightbox$elements.sourcesOuters;\n  sourcesOuters[i] = document.createElement('div');\n  sourcesOuters[i].className = \"\".concat(_constants_classes_names__WEBPACK_IMPORTED_MODULE_0__[\"SOURCE_OUTER_CLASS_NAME\"], \" \").concat(_constants_classes_names__WEBPACK_IMPORTED_MODULE_0__[\"ABSOLUTED_CLASS_NAME\"], \" \").concat(_constants_classes_names__WEBPACK_IMPORTED_MODULE_0__[\"FULL_DIMENSION_CLASS_NAME\"], \" \").concat(_constants_classes_names__WEBPACK_IMPORTED_MODULE_0__[\"FLEX_CENTERED_CLASS_NAME\"]);\n  sourcesOuters[i].innerHTML = '<div class=\"fslightbox-loader\"><div></div><div></div><div></div><div></div></div>';\n  sourcesOutersWrapper.appendChild(sourcesOuters[i]);\n  Object(_renderSourceInner__WEBPACK_IMPORTED_MODULE_1__[\"renderSourceInner\"])(fsLightbox, 0);\n}\n\n//# sourceURL=webpack:///./src/js/components/sources/renderSourceOuter.js?");

/***/ }),

/***/ "./src/js/components/sources/renderSourcesOutersWrapper.js":
/*!*****************************************************************!*\
  !*** ./src/js/components/sources/renderSourcesOutersWrapper.js ***!
  \*****************************************************************/
/*! exports provided: renderSourcesOutersWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderSourcesOutersWrapper\", function() { return renderSourcesOutersWrapper; });\n/* harmony import */ var _renderSourceOuter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderSourceOuter */ \"./src/js/components/sources/renderSourceOuter.js\");\n/* harmony import */ var _constants_classes_names__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants/classes-names */ \"./src/js/constants/classes-names.js\");\n\n\nfunction renderSourcesOutersWrapper(fsLightbox) {\n  var elements = fsLightbox.elements,\n      sources = fsLightbox.props.sources;\n  elements.sourcesOutersWrapper = document.createElement('div');\n  elements.sourcesOutersWrapper.className = \"\".concat(_constants_classes_names__WEBPACK_IMPORTED_MODULE_1__[\"ABSOLUTED_CLASS_NAME\"], \" \").concat(_constants_classes_names__WEBPACK_IMPORTED_MODULE_1__[\"FULL_DIMENSION_CLASS_NAME\"]);\n  elements.container.appendChild(elements.sourcesOutersWrapper);\n\n  for (var i = 0; i < sources.length; i++) {\n    Object(_renderSourceOuter__WEBPACK_IMPORTED_MODULE_0__[\"renderSourceOuter\"])(fsLightbox, i);\n  }\n}\n\n//# sourceURL=webpack:///./src/js/components/sources/renderSourcesOutersWrapper.js?");

/***/ }),

/***/ "./src/js/constants/classes-names.js":
/*!*******************************************!*\
  !*** ./src/js/constants/classes-names.js ***!
  \*******************************************/
/*! exports provided: PREFIX, FSLIGHTBOX_STYLES, CURSOR_GRABBING_CLASS_NAME, FULL_DIMENSION_CLASS_NAME, FLEX_CENTERED_CLASS_NAME, OPEN_CLASS_NAME, TRANSFORM_TRANSITION_CLASS_NAME, ABSOLUTED_CLASS_NAME, FADE_IN_CLASS_NAME, FADE_OUT_CLASS_NAME, FADE_IN_STRONG_CLASS_NAME, FADE_OUT_STRONG_CLASS_NAME, OPACITY_0_CLASS_NAME, OPACITY_1_CLASS_NAME, SOURCE_CLASS_NAME, SOURCE_OUTER_CLASS_NAME, SOURCES_OUTERS_WRAPPER */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PREFIX\", function() { return PREFIX; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FSLIGHTBOX_STYLES\", function() { return FSLIGHTBOX_STYLES; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CURSOR_GRABBING_CLASS_NAME\", function() { return CURSOR_GRABBING_CLASS_NAME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FULL_DIMENSION_CLASS_NAME\", function() { return FULL_DIMENSION_CLASS_NAME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FLEX_CENTERED_CLASS_NAME\", function() { return FLEX_CENTERED_CLASS_NAME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"OPEN_CLASS_NAME\", function() { return OPEN_CLASS_NAME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TRANSFORM_TRANSITION_CLASS_NAME\", function() { return TRANSFORM_TRANSITION_CLASS_NAME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ABSOLUTED_CLASS_NAME\", function() { return ABSOLUTED_CLASS_NAME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FADE_IN_CLASS_NAME\", function() { return FADE_IN_CLASS_NAME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FADE_OUT_CLASS_NAME\", function() { return FADE_OUT_CLASS_NAME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FADE_IN_STRONG_CLASS_NAME\", function() { return FADE_IN_STRONG_CLASS_NAME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FADE_OUT_STRONG_CLASS_NAME\", function() { return FADE_OUT_STRONG_CLASS_NAME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"OPACITY_0_CLASS_NAME\", function() { return OPACITY_0_CLASS_NAME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"OPACITY_1_CLASS_NAME\", function() { return OPACITY_1_CLASS_NAME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SOURCE_CLASS_NAME\", function() { return SOURCE_CLASS_NAME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SOURCE_OUTER_CLASS_NAME\", function() { return SOURCE_OUTER_CLASS_NAME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SOURCES_OUTERS_WRAPPER\", function() { return SOURCES_OUTERS_WRAPPER; });\nvar PREFIX = 'fslightbox-'; // single classes names\n\nvar FSLIGHTBOX_STYLES = \"\".concat(PREFIX, \"styles\");\nvar CURSOR_GRABBING_CLASS_NAME = \"\".concat(PREFIX, \"cursor-grabbing\");\nvar FULL_DIMENSION_CLASS_NAME = \"\".concat(PREFIX, \"full-dimension\");\nvar FLEX_CENTERED_CLASS_NAME = \"\".concat(PREFIX, \"flex-centered\");\nvar OPEN_CLASS_NAME = \"\".concat(PREFIX, \"open\");\nvar TRANSFORM_TRANSITION_CLASS_NAME = \"\".concat(PREFIX, \"transform-transition\");\nvar ABSOLUTED_CLASS_NAME = \"\".concat(PREFIX, \"absoluted\"); // animations\n\nvar FADE_IN_CLASS_NAME = \"\".concat(PREFIX, \"fade-in\");\nvar FADE_OUT_CLASS_NAME = \"\".concat(PREFIX, \"fade-out\");\nvar FADE_IN_STRONG_CLASS_NAME = FADE_IN_CLASS_NAME + '-strong';\nvar FADE_OUT_STRONG_CLASS_NAME = FADE_OUT_CLASS_NAME + '-strong'; // opacity\n\nvar opacityBaseClassName = \"\".concat(PREFIX, \"opacity-\");\nvar OPACITY_0_CLASS_NAME = \"\".concat(opacityBaseClassName, \"0\");\nvar OPACITY_1_CLASS_NAME = \"\".concat(opacityBaseClassName, \"1\"); // sources\n\nvar SOURCE_CLASS_NAME = \"\".concat(PREFIX, \"source\");\nvar SOURCE_OUTER_CLASS_NAME = \"\".concat(SOURCE_CLASS_NAME, \"-outer\");\nvar SOURCES_OUTERS_WRAPPER = \"\".concat(SOURCE_OUTER_CLASS_NAME, \"s-outers-wrapper\");\n\n//# sourceURL=webpack:///./src/js/constants/classes-names.js?");

/***/ }),

/***/ "./src/js/constants/core-constants.js":
/*!********************************************!*\
  !*** ./src/js/constants/core-constants.js ***!
  \********************************************/
/*! exports provided: IMAGE_TYPE, VIDEO_TYPE, YOUTUBE_TYPE, CUSTOM_TYPE, INVALID_TYPE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"IMAGE_TYPE\", function() { return IMAGE_TYPE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"VIDEO_TYPE\", function() { return VIDEO_TYPE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"YOUTUBE_TYPE\", function() { return YOUTUBE_TYPE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CUSTOM_TYPE\", function() { return CUSTOM_TYPE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"INVALID_TYPE\", function() { return INVALID_TYPE; });\n// sources types\nvar IMAGE_TYPE = 'image';\nvar VIDEO_TYPE = 'video';\nvar YOUTUBE_TYPE = 'youtube';\nvar CUSTOM_TYPE = 'custom';\nvar INVALID_TYPE = 'invalid';\n\n//# sourceURL=webpack:///./src/js/constants/core-constants.js?");

/***/ }),

/***/ "./src/js/constants/local-storage-constants.js":
/*!*****************************************************!*\
  !*** ./src/js/constants/local-storage-constants.js ***!
  \*****************************************************/
/*! exports provided: SOURCES_TYPES_KEY, SCROLLBAR_WIDTH_KEY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SOURCES_TYPES_KEY\", function() { return SOURCES_TYPES_KEY; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SCROLLBAR_WIDTH_KEY\", function() { return SCROLLBAR_WIDTH_KEY; });\nvar SOURCES_TYPES_KEY = 'fslightbox-types';\nvar SCROLLBAR_WIDTH_KEY = 'fslightbox-scrollbar-width';\n\n//# sourceURL=webpack:///./src/js/constants/local-storage-constants.js?");

/***/ }),

/***/ "./src/js/core/collections/getSourcesHoldersTransformersCollection.js":
/*!****************************************************************************!*\
  !*** ./src/js/core/collections/getSourcesHoldersTransformersCollection.js ***!
  \****************************************************************************/
/*! exports provided: getSourcesHoldersTransformersCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSourcesHoldersTransformersCollection\", function() { return getSourcesHoldersTransformersCollection; });\n/* harmony import */ var _transforms_SourceOuterTransformer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transforms/SourceOuterTransformer */ \"./src/js/core/transforms/SourceOuterTransformer.js\");\n\nfunction getSourcesHoldersTransformersCollection(_ref) {\n  var sourcesOuters = _ref.elements.sourcesOuters,\n      resolve = _ref.resolve;\n  var collection = [];\n\n  for (var i = 0; i < sourcesOuters.length; i++) {\n    var sourceHolderTransformer = resolve(_transforms_SourceOuterTransformer__WEBPACK_IMPORTED_MODULE_0__[\"SourceOuterTransformer\"]);\n    sourceHolderTransformer.setSourceHolder(sourcesOuters[i]);\n    collection.push(sourceHolderTransformer);\n  }\n\n  return collection;\n}\n\n//# sourceURL=webpack:///./src/js/core/collections/getSourcesHoldersTransformersCollection.js?");

/***/ }),

/***/ "./src/js/core/elements/setUpClassFacade.js":
/*!**************************************************!*\
  !*** ./src/js/core/elements/setUpClassFacade.js ***!
  \**************************************************/
/*! exports provided: setUpClassFacade */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setUpClassFacade\", function() { return setUpClassFacade; });\n/* harmony import */ var _helpers_elements_removeFromElementClassIfContains__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/elements/removeFromElementClassIfContains */ \"./src/js/helpers/elements/removeFromElementClassIfContains.js\");\n\nfunction setUpClassFacade(_ref) {\n  var self = _ref.core.classFacade,\n      elements = _ref.elements;\n\n  self.removeFromEachElementClassIfContains = function (elementsArrayName, className) {\n    for (var i = 0; i < elements[elementsArrayName].length; i++) {\n      Object(_helpers_elements_removeFromElementClassIfContains__WEBPACK_IMPORTED_MODULE_0__[\"removeFromElementClassIfContains\"])(elements[elementsArrayName][i], className);\n    }\n  };\n}\n\n//# sourceURL=webpack:///./src/js/core/elements/setUpClassFacade.js?");

/***/ }),

/***/ "./src/js/core/events/setUpEventsDispatcher.js":
/*!*****************************************************!*\
  !*** ./src/js/core/events/setUpEventsDispatcher.js ***!
  \*****************************************************/
/*! exports provided: setUpEventsDispatcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setUpEventsDispatcher\", function() { return setUpEventsDispatcher; });\nfunction setUpEventsDispatcher(_ref) {\n  var self = _ref.core.eventsDispatcher,\n      props = _ref.props;\n\n  self.dispatch = function (eventName) {\n    if (props[eventName]) {\n      props[eventName]();\n    }\n  };\n}\n\n//# sourceURL=webpack:///./src/js/core/events/setUpEventsDispatcher.js?");

/***/ }),

/***/ "./src/js/core/main-component/initializing/initializeLightbox.js":
/*!***********************************************************************!*\
  !*** ./src/js/core/main-component/initializing/initializeLightbox.js ***!
  \***********************************************************************/
/*! exports provided: initializeLightbox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initializeLightbox\", function() { return initializeLightbox; });\n/* harmony import */ var _constants_classes_names__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants/classes-names */ \"./src/js/constants/classes-names.js\");\n/* harmony import */ var _sources_creating_createSources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../sources/creating/createSources */ \"./src/js/core/sources/creating/createSources.js\");\n/* harmony import */ var _components_sources_renderSourcesOutersWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/sources/renderSourcesOutersWrapper */ \"./src/js/components/sources/renderSourcesOutersWrapper.js\");\n\n\n\nfunction initializeLightbox(fsLightbox) {\n  var data = fsLightbox.data,\n      eventsDispatcher = fsLightbox.core.eventsDispatcher,\n      elements = fsLightbox.elements;\n  data.isInitialized = true;\n  elements.container = document.createElement('div');\n  elements.container.className = \"\".concat(_constants_classes_names__WEBPACK_IMPORTED_MODULE_0__[\"PREFIX\"], \"container \").concat(_constants_classes_names__WEBPACK_IMPORTED_MODULE_0__[\"FULL_DIMENSION_CLASS_NAME\"], \" \").concat(_constants_classes_names__WEBPACK_IMPORTED_MODULE_0__[\"FADE_IN_STRONG_CLASS_NAME\"]);\n  document.body.appendChild(elements.container);\n  Object(_components_sources_renderSourcesOutersWrapper__WEBPACK_IMPORTED_MODULE_2__[\"renderSourcesOutersWrapper\"])(fsLightbox);\n  Object(_sources_creating_createSources__WEBPACK_IMPORTED_MODULE_1__[\"createSources\"])(fsLightbox);\n  eventsDispatcher.dispatch('onInit');\n}\n\n//# sourceURL=webpack:///./src/js/core/main-component/initializing/initializeLightbox.js?");

/***/ }),

/***/ "./src/js/core/main-component/opening/setUpLightboxOpenActioner.js":
/*!*************************************************************************!*\
  !*** ./src/js/core/main-component/opening/setUpLightboxOpenActioner.js ***!
  \*************************************************************************/
/*! exports provided: setUpLightboxOpenActioner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setUpLightboxOpenActioner\", function() { return setUpLightboxOpenActioner; });\n/* harmony import */ var _initializing_initializeLightbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../initializing/initializeLightbox */ \"./src/js/core/main-component/initializing/initializeLightbox.js\");\n/* harmony import */ var _constants_classes_names__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../constants/classes-names */ \"./src/js/constants/classes-names.js\");\n\n\nfunction setUpLightboxOpenActioner(fsLightbox) {\n  var sourcesOutersTransformers = fsLightbox.collections.sourcesOutersTransformers,\n      _fsLightbox$core = fsLightbox.core,\n      eventsDispatcher = _fsLightbox$core.eventsDispatcher,\n      self = _fsLightbox$core.lightboxOpenActioner,\n      globalEventsController = _fsLightbox$core.globalEventsController,\n      scrollbarRecompensor = _fsLightbox$core.scrollbarRecompensor,\n      stageManager = _fsLightbox$core.stageManager,\n      windowResizeActioner = _fsLightbox$core.windowResizeActioner,\n      data = fsLightbox.data,\n      stageIndexes = fsLightbox.stageIndexes;\n\n  self.runActions = function () {\n    stageManager.updateStageIndexes();\n    document.documentElement.classList.add(_constants_classes_names__WEBPACK_IMPORTED_MODULE_1__[\"OPEN_CLASS_NAME\"]);\n    windowResizeActioner.runActions();\n    scrollbarRecompensor.addRecompense();\n    globalEventsController.attachListeners();\n    sourcesOutersTransformers[stageIndexes.current].zero();\n    eventsDispatcher.dispatch('onOpen');\n    data.isInitialized ? eventsDispatcher.dispatch('onShow') : Object(_initializing_initializeLightbox__WEBPACK_IMPORTED_MODULE_0__[\"initializeLightbox\"])(fsLightbox);\n  };\n}\n\n//# sourceURL=webpack:///./src/js/core/main-component/opening/setUpLightboxOpenActioner.js?");

/***/ }),

/***/ "./src/js/core/main-component/opening/setUpLightboxOpener.js":
/*!*******************************************************************!*\
  !*** ./src/js/core/main-component/opening/setUpLightboxOpener.js ***!
  \*******************************************************************/
/*! exports provided: setUpLightboxOpener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setUpLightboxOpener\", function() { return setUpLightboxOpener; });\n/* harmony import */ var _constants_classes_names__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants/classes-names */ \"./src/js/constants/classes-names.js\");\n/* harmony import */ var _initializing_initializeLightbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../initializing/initializeLightbox */ \"./src/js/core/main-component/initializing/initializeLightbox.js\");\n\n\nfunction setUpLightboxOpener(fsLightbox) {\n  var sourcesOutersTransformers = fsLightbox.collections.sourcesOutersTransformers,\n      _fsLightbox$core = fsLightbox.core,\n      eventsDispatcher = _fsLightbox$core.eventsDispatcher,\n      self = _fsLightbox$core.lightboxOpener,\n      globalEventsController = _fsLightbox$core.globalEventsController,\n      scrollbarRecompensor = _fsLightbox$core.scrollbarRecompensor,\n      stageManager = _fsLightbox$core.stageManager,\n      windowResizeActioner = _fsLightbox$core.windowResizeActioner,\n      data = fsLightbox.data,\n      stageIndexes = fsLightbox.stageIndexes;\n\n  self.open = function () {\n    stageManager.updateStageIndexes();\n    document.documentElement.classList.add(_constants_classes_names__WEBPACK_IMPORTED_MODULE_0__[\"OPEN_CLASS_NAME\"]); // windowResizeActioner.runActions();\n    // scrollbarRecompensor.addRecompense();\n    // globalEventsController.attachListeners();\n    // sourcesOutersTransformers[stageIndexes.current].zero();\n    // eventsDispatcher.dispatch('onOpen');\n\n    data.isInitialized ? eventsDispatcher.dispatch('onShow') : Object(_initializing_initializeLightbox__WEBPACK_IMPORTED_MODULE_1__[\"initializeLightbox\"])(fsLightbox);\n  };\n}\n\n//# sourceURL=webpack:///./src/js/core/main-component/opening/setUpLightboxOpener.js?");

/***/ }),

/***/ "./src/js/core/setUpCore.js":
/*!**********************************!*\
  !*** ./src/js/core/setUpCore.js ***!
  \**********************************/
/*! exports provided: setUpCore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setUpCore\", function() { return setUpCore; });\n/* harmony import */ var _main_component_opening_setUpLightboxOpener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main-component/opening/setUpLightboxOpener */ \"./src/js/core/main-component/opening/setUpLightboxOpener.js\");\n/* harmony import */ var _main_component_opening_setUpLightboxOpenActioner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main-component/opening/setUpLightboxOpenActioner */ \"./src/js/core/main-component/opening/setUpLightboxOpenActioner.js\");\n/* harmony import */ var _stage_setUpStageManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stage/setUpStageManager */ \"./src/js/core/stage/setUpStageManager.js\");\n/* harmony import */ var _elements_setUpClassFacade__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./elements/setUpClassFacade */ \"./src/js/core/elements/setUpClassFacade.js\");\n/* harmony import */ var _events_setUpEventsDispatcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./events/setUpEventsDispatcher */ \"./src/js/core/events/setUpEventsDispatcher.js\");\n\n\n\n\n\nfunction setUpCore(fsLightbox) {\n  Object(_elements_setUpClassFacade__WEBPACK_IMPORTED_MODULE_3__[\"setUpClassFacade\"])(fsLightbox);\n  Object(_events_setUpEventsDispatcher__WEBPACK_IMPORTED_MODULE_4__[\"setUpEventsDispatcher\"])(fsLightbox); // setUpFullscreenToggler(fsLightbox);\n  // setUpGlobalEventsController(fsLightbox);\n  // setUpLightboxCloser(fsLightbox);\n\n  Object(_main_component_opening_setUpLightboxOpener__WEBPACK_IMPORTED_MODULE_0__[\"setUpLightboxOpener\"])(fsLightbox);\n  Object(_main_component_opening_setUpLightboxOpenActioner__WEBPACK_IMPORTED_MODULE_1__[\"setUpLightboxOpenActioner\"])(fsLightbox); // setUpLightboxUpdater(fsLightbox);\n  // setUpScrollbarRecompensor(fsLightbox);\n  // setUpSlideChangeFacade(fsLightbox);\n  // setUpSlideIndexChanger(fsLightbox);\n  // setUpSlideSwipingDown(fsLightbox);\n\n  Object(_stage_setUpStageManager__WEBPACK_IMPORTED_MODULE_2__[\"setUpStageManager\"])(fsLightbox); // setUpWindowResizeActioner(fsLightbox);\n}\n\n//# sourceURL=webpack:///./src/js/core/setUpCore.js?");

/***/ }),

/***/ "./src/js/core/sources/SourceLoadActioner.js":
/*!***************************************************!*\
  !*** ./src/js/core/sources/SourceLoadActioner.js ***!
  \***************************************************/
/*! exports provided: SourceLoadActioner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SourceLoadActioner\", function() { return SourceLoadActioner; });\n/* harmony import */ var _SourceStyler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SourceStyler */ \"./src/js/core/sources/SourceStyler.js\");\n/* harmony import */ var _constants_classes_names__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants/classes-names */ \"./src/js/constants/classes-names.js\");\n\n\nfunction SourceLoadActioner(_ref, i, defaultWidth, defaultHeight) {\n  var _this = this;\n\n  var isSourceLoadedCollection = _ref.componentsStates.isSourceLoadedCollection,\n      sourcesStylers = _ref.collections.sourcesStylers,\n      _ref$elements = _ref.elements,\n      sourcesInners = _ref$elements.sourcesInners,\n      sources = _ref$elements.sources,\n      resolve = _ref.resolve;\n\n  this.runNormalLoadActions = function () {\n    sources[i].current.classList.add(_constants_classes_names__WEBPACK_IMPORTED_MODULE_1__[\"OPACITY_1_CLASS_NAME\"]);\n    sourcesInners[i].current.classList.add(_constants_classes_names__WEBPACK_IMPORTED_MODULE_1__[\"FADE_IN_STRONG_CLASS_NAME\"]);\n    isSourceLoadedCollection[i].set(true);\n  };\n\n  this.runInitialLoadActions = function () {\n    _this.runNormalLoadActions();\n\n    var sourceStyler = resolve(_SourceStyler__WEBPACK_IMPORTED_MODULE_0__[\"SourceStyler\"], [i, defaultWidth, defaultHeight]);\n    sourceStyler.styleSize();\n    sourcesStylers[i] = sourceStyler;\n  };\n}\n\n//# sourceURL=webpack:///./src/js/core/sources/SourceLoadActioner.js?");

/***/ }),

/***/ "./src/js/core/sources/SourceLoadHandler.js":
/*!**************************************************!*\
  !*** ./src/js/core/sources/SourceLoadHandler.js ***!
  \**************************************************/
/*! exports provided: SourceLoadHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SourceLoadHandler\", function() { return SourceLoadHandler; });\n/* harmony import */ var _SourceLoadActioner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SourceLoadActioner */ \"./src/js/core/sources/SourceLoadActioner.js\");\n\nfunction SourceLoadHandler(_ref, i) {\n  var _this = this;\n\n  var _ref$props = _ref.props,\n      maxYoutubeVideoDimensions = _ref$props.maxYoutubeVideoDimensions,\n      customSourcesMaxDimensions = _ref$props.customSourcesMaxDimensions,\n      customSourcesGlobalMaxDimensions = _ref$props.customSourcesGlobalMaxDimensions,\n      resolve = _ref.resolve;\n  var defaultWidth;\n  var defaultHeight;\n\n  var setUpSourceDimensions = function setUpSourceDimensions() {};\n\n  this.setUpLoadForImage = function () {\n    setUpSourceDimensions = function setUpSourceDimensions(_ref2) {\n      var _ref2$target = _ref2.target,\n          width = _ref2$target.width,\n          height = _ref2$target.height;\n      defaultWidth = width;\n      defaultHeight = height;\n    };\n  };\n\n  this.setUpLoadForVideo = function () {\n    setUpSourceDimensions = function setUpSourceDimensions(_ref3) {\n      var _ref3$target = _ref3.target,\n          videoWidth = _ref3$target.videoWidth,\n          videoHeight = _ref3$target.videoHeight;\n      defaultWidth = videoWidth;\n      defaultHeight = videoHeight;\n    };\n  };\n\n  this.setUpLoadForYoutube = function () {\n    if (maxYoutubeVideoDimensions && maxYoutubeVideoDimensions[i]) {\n      defaultWidth = maxYoutubeVideoDimensions[i].width;\n      defaultHeight = maxYoutubeVideoDimensions[i].height;\n    } else {\n      defaultWidth = 1920;\n      defaultHeight = 1080;\n    }\n  };\n\n  this.setUpLoadForCustom = function () {\n    if (customSourcesMaxDimensions && customSourcesMaxDimensions[i]) {\n      defaultWidth = customSourcesMaxDimensions[i].width;\n      defaultHeight = customSourcesMaxDimensions[i].height;\n    } else if (customSourcesGlobalMaxDimensions) {\n      defaultWidth = customSourcesGlobalMaxDimensions.width;\n      defaultHeight = customSourcesGlobalMaxDimensions.height;\n    } else {\n      throw new Error('You need to set max dimensions of custom sources. Use customSourcesMaxDimensions prop array or customSourcesGlobalMaxDimensions prop object');\n    }\n  };\n\n  this.handleLoad = function (e) {\n    setUpSourceDimensions(e);\n    var sourceLoadActioner = resolve(_SourceLoadActioner__WEBPACK_IMPORTED_MODULE_0__[\"SourceLoadActioner\"], [i, defaultWidth, defaultHeight]);\n    sourceLoadActioner.runInitialLoadActions();\n    _this.handleLoad = sourceLoadActioner.runNormalLoadActions;\n  };\n}\n\n//# sourceURL=webpack:///./src/js/core/sources/SourceLoadHandler.js?");

/***/ }),

/***/ "./src/js/core/sources/SourceStyler.js":
/*!*********************************************!*\
  !*** ./src/js/core/sources/SourceStyler.js ***!
  \*********************************************/
/*! exports provided: SourceStyler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SourceStyler\", function() { return SourceStyler; });\nfunction SourceStyler(_ref, i, defaultWidth, defaultHeight) {\n  var data = _ref.data,\n      sources = _ref.elements.sources;\n  var ratio = defaultWidth / defaultHeight;\n  var newHeight = 0;\n  /**\n   * This method takes care of setting sources dimensions.\n   * Unfortunately wa cannot only set max width and max height and allow the sources to scale themselves,\n   * due tu Youtube source which dimensions needs to be set in advance.\n   * In this case we are calculating dimensions mathematically.\n   */\n\n  this.styleSize = function () {\n    newHeight = data.maxSourceWidth / ratio; // wider than higher\n\n    if (newHeight < data.maxSourceHeight) {\n      if (defaultWidth < data.maxSourceWidth) {\n        newHeight = defaultHeight;\n      }\n\n      return updateDimensions();\n    } // higher than wider\n\n\n    if (defaultHeight > data.maxSourceHeight) {\n      newHeight = data.maxSourceHeight;\n    } else {\n      newHeight = defaultHeight;\n    }\n\n    updateDimensions();\n  };\n\n  var updateDimensions = function updateDimensions() {\n    var style = sources[i].current.style;\n    style.width = newHeight * ratio + 'px';\n    style.height = newHeight + 'px';\n  };\n}\n\n//# sourceURL=webpack:///./src/js/core/sources/SourceStyler.js?");

/***/ }),

/***/ "./src/js/core/sources/creating/CreatingSourcesBucket.js":
/*!***************************************************************!*\
  !*** ./src/js/core/sources/creating/CreatingSourcesBucket.js ***!
  \***************************************************************/
/*! exports provided: CreatingSourcesBucket */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CreatingSourcesBucket\", function() { return CreatingSourcesBucket; });\n/* harmony import */ var _types_AutomaticTypeDetector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/AutomaticTypeDetector */ \"./src/js/core/sources/types/AutomaticTypeDetector.js\");\n\nfunction CreatingSourcesBucket(_ref, localStorageManager, detectedTypeActioner) {\n  var _ref$props = _ref.props,\n      types = _ref$props.types,\n      type = _ref$props.type,\n      sources = _ref$props.sources,\n      resolve = _ref.resolve;\n\n  this.getTypeSetByClientForIndex = function (i) {\n    var typeSetManuallyByClient;\n\n    if (types && types[i]) {\n      typeSetManuallyByClient = types[i];\n    } else if (type) {\n      typeSetManuallyByClient = type;\n    }\n\n    return typeSetManuallyByClient;\n  };\n\n  this.retrieveTypeWithXhrForIndex = function (i) {\n    // we need to copy index because xhr will for sure come later than next loop iteration\n    var automaticTypeDetector = resolve(_types_AutomaticTypeDetector__WEBPACK_IMPORTED_MODULE_0__[\"AutomaticTypeDetector\"]);\n    automaticTypeDetector.setUrlToCheck(sources[i]);\n    automaticTypeDetector.getSourceType(function (sourceType) {\n      localStorageManager.handleReceivedSourceTypeForUrl(sourceType, sources[i]);\n      detectedTypeActioner.runActionsForSourceTypeAndIndex(sourceType, i);\n    });\n  };\n}\n\n//# sourceURL=webpack:///./src/js/core/sources/creating/CreatingSourcesBucket.js?");

/***/ }),

/***/ "./src/js/core/sources/creating/CreatingSourcesLocalStorageManager.js":
/*!****************************************************************************!*\
  !*** ./src/js/core/sources/creating/CreatingSourcesLocalStorageManager.js ***!
  \****************************************************************************/
/*! exports provided: CreatingSourcesLocalStorageManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CreatingSourcesLocalStorageManager\", function() { return CreatingSourcesLocalStorageManager; });\n/* harmony import */ var _constants_local_storage_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants/local-storage-constants */ \"./src/js/constants/local-storage-constants.js\");\n/* harmony import */ var _helpers_objects_assignToObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../helpers/objects/assignToObject */ \"./src/js/helpers/objects/assignToObject.js\");\n\n\nfunction CreatingSourcesLocalStorageManager(_ref) {\n  var disableLocalStorage = _ref.props.disableLocalStorage;\n  var NOT_YET_DETECTED = false;\n  var decodedSourceTypes;\n  var newSourceTypesToDetect = 0;\n  var newTypes = {};\n\n  this.getSourceTypeFromLocalStorageByUrl = function (url) {\n    if (!decodedSourceTypes[url]) {\n      return addNewUrlToDetect(url);\n    }\n\n    return decodedSourceTypes[url];\n  };\n\n  this.handleReceivedSourceTypeForUrl = function (sourceType, url) {\n    if (newTypes[url] !== undefined) {\n      newSourceTypesToDetect--;\n      newTypes[url] = sourceType;\n      ifAllNewTypesAreDetectedStoreAllTypesToLocalStorage();\n    }\n  };\n\n  var addNewUrlToDetect = function addNewUrlToDetect(url) {\n    newSourceTypesToDetect++;\n    newTypes[url] = NOT_YET_DETECTED;\n  };\n\n  var ifAllNewTypesAreDetectedStoreAllTypesToLocalStorage = function ifAllNewTypesAreDetectedStoreAllTypesToLocalStorage() {\n    if (newSourceTypesToDetect === 0) {\n      Object(_helpers_objects_assignToObject__WEBPACK_IMPORTED_MODULE_1__[\"assignToObject\"])(decodedSourceTypes, newTypes);\n      localStorage.setItem(_constants_local_storage_constants__WEBPACK_IMPORTED_MODULE_0__[\"SOURCES_TYPES_KEY\"], JSON.stringify(decodedSourceTypes));\n    }\n  };\n\n  if (!disableLocalStorage) {\n    decodedSourceTypes = JSON.parse(localStorage.getItem(_constants_local_storage_constants__WEBPACK_IMPORTED_MODULE_0__[\"SOURCES_TYPES_KEY\"])); // we are checking if detected source types contains at certain key source type\n    // when localStorage will be empty we can overwrite this method because we are sure\n    // that at every index will be no source type\n\n    if (!decodedSourceTypes) {\n      // in ifAllNewTypesAreDetectedStoreAllTypesToLocalStorage we are assigning to\n      // decodedSourceTypes new Types so we need to make it an object to avoid errors\n      decodedSourceTypes = {};\n      this.getSourceTypeFromLocalStorageByUrl = addNewUrlToDetect;\n    }\n  } else {\n    this.getSourceTypeFromLocalStorageByUrl = function () {};\n\n    this.handleReceivedSourceTypeForUrl = function () {};\n  }\n}\n\n//# sourceURL=webpack:///./src/js/core/sources/creating/CreatingSourcesLocalStorageManager.js?");

/***/ }),

/***/ "./src/js/core/sources/creating/createSources.js":
/*!*******************************************************!*\
  !*** ./src/js/core/sources/creating/createSources.js ***!
  \*******************************************************/
/*! exports provided: createSources */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createSources\", function() { return createSources; });\n/* harmony import */ var _CreatingSourcesLocalStorageManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreatingSourcesLocalStorageManager */ \"./src/js/core/sources/creating/CreatingSourcesLocalStorageManager.js\");\n/* harmony import */ var _types_DetectedTypeActioner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/DetectedTypeActioner */ \"./src/js/core/sources/types/DetectedTypeActioner.js\");\n/* harmony import */ var _CreatingSourcesBucket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CreatingSourcesBucket */ \"./src/js/core/sources/creating/CreatingSourcesBucket.js\");\n/* harmony import */ var _constants_core_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants/core-constants */ \"./src/js/constants/core-constants.js\");\n\n\n\n\nfunction createSources(_ref) {\n  var sourcesCount = _ref.data.sourcesCount,\n      sources = _ref.props.sources,\n      resolve = _ref.resolve;\n  var localStorageManager = resolve(_CreatingSourcesLocalStorageManager__WEBPACK_IMPORTED_MODULE_0__[\"CreatingSourcesLocalStorageManager\"]);\n  var detectedTypeActioner = resolve(_types_DetectedTypeActioner__WEBPACK_IMPORTED_MODULE_1__[\"DetectedTypeActioner\"]);\n  var creatingSourcesBucket = resolve(_CreatingSourcesBucket__WEBPACK_IMPORTED_MODULE_2__[\"CreatingSourcesBucket\"], [localStorageManager, detectedTypeActioner]);\n\n  for (var i = 0; i < sourcesCount; i++) {\n    if (typeof sources[i] !== \"string\") {\n      detectedTypeActioner.runActionsForSourceTypeAndIndex(_constants_core_constants__WEBPACK_IMPORTED_MODULE_3__[\"CUSTOM_TYPE\"], i);\n      continue;\n    }\n\n    var typeSetManuallyByClient = creatingSourcesBucket.getTypeSetByClientForIndex(i);\n\n    if (typeSetManuallyByClient) {\n      detectedTypeActioner.runActionsForSourceTypeAndIndex(typeSetManuallyByClient, i);\n      continue;\n    }\n\n    var sourceTypeRetrievedWithoutXhr = localStorageManager.getSourceTypeFromLocalStorageByUrl(sources[i]);\n    sourceTypeRetrievedWithoutXhr ? detectedTypeActioner.runActionsForSourceTypeAndIndex(sourceTypeRetrievedWithoutXhr, i) : creatingSourcesBucket.retrieveTypeWithXhrForIndex(i);\n  }\n}\n\n//# sourceURL=webpack:///./src/js/core/sources/creating/createSources.js?");

/***/ }),

/***/ "./src/js/core/sources/getSourcesCount.js":
/*!************************************************!*\
  !*** ./src/js/core/sources/getSourcesCount.js ***!
  \************************************************/
/*! exports provided: getSourcesCount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSourcesCount\", function() { return getSourcesCount; });\nfunction getSourcesCount(_ref) {\n  var _ref$props = _ref.props,\n      sources = _ref$props.sources,\n      customSources = _ref$props.customSources;\n  return customSources ? sources ? Math.max(customSources.length, sources.length) : customSources.length : sources.length;\n}\n\n//# sourceURL=webpack:///./src/js/core/sources/getSourcesCount.js?");

/***/ }),

/***/ "./src/js/core/sources/types/AutomaticTypeDetector.js":
/*!************************************************************!*\
  !*** ./src/js/core/sources/types/AutomaticTypeDetector.js ***!
  \************************************************************/
/*! exports provided: AutomaticTypeDetector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AutomaticTypeDetector\", function() { return AutomaticTypeDetector; });\n/* harmony import */ var _constants_core_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants/core-constants */ \"./src/js/constants/core-constants.js\");\n/* harmony import */ var _getAutomaticTypeDetectorBucket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getAutomaticTypeDetectorBucket */ \"./src/js/core/sources/types/getAutomaticTypeDetectorBucket.js\");\n\n\nfunction AutomaticTypeDetector(_ref) {\n  var xhrs = _ref.collections.xhrs;\n  var automaticTypeDetectorBucket = Object(_getAutomaticTypeDetectorBucket__WEBPACK_IMPORTED_MODULE_1__[\"getAutomaticTypeDetectorBucket\"])();\n  var url;\n  var sourceType;\n  var resolveSourceType;\n  var xhr;\n  var isResolved;\n\n  this.setUrlToCheck = function (urlToCheck) {\n    url = urlToCheck;\n  };\n  /**\n   * Asynchronous method takes callback which will be called after source type is received with source type as param.\n   * @param { Function } callback\n   */\n\n\n  this.getSourceType = function (callback) {\n    if (automaticTypeDetectorBucket.isUrlYoutubeOne(url)) {\n      return callback(_constants_core_constants__WEBPACK_IMPORTED_MODULE_0__[\"YOUTUBE_TYPE\"]);\n    }\n\n    resolveSourceType = callback;\n    xhr = new XMLHttpRequest();\n    xhrs.push(xhr);\n    xhr.open('GET', url, true);\n    xhr.onreadystatechange = onRequestStateChange;\n    xhr.send();\n  };\n\n  var onRequestStateChange = function onRequestStateChange() {\n    // we need to use isResolved helper because logic after readyState 2 is complex enough that readyState 4 is called\n    // before request is aborted\n    if (xhr.readyState === 4 && xhr.status === 0 && !isResolved) {\n      return resolveInvalidType();\n    }\n\n    if (xhr.readyState !== 2) {\n      return;\n    }\n\n    if (xhr.status !== 200 && xhr.status !== 206) {\n      // we are setting isResolved to true so readyState 4 won't be called before forwarding logic\n      isResolved = true;\n      return resolveInvalidType();\n    } // we are setting isResolved to true so readyState 4 won't be called before forwarding logic\n\n\n    isResolved = true;\n    setSourceTypeDependingOnResponseContentType(automaticTypeDetectorBucket.getTypeFromResponseContentType(xhr.getResponseHeader('content-type')));\n    abortRequestAndResolvePromise();\n  };\n\n  var resolveInvalidType = function resolveInvalidType() {\n    sourceType = _constants_core_constants__WEBPACK_IMPORTED_MODULE_0__[\"INVALID_TYPE\"];\n    abortRequestAndResolvePromise();\n  };\n\n  var abortRequestAndResolvePromise = function abortRequestAndResolvePromise() {\n    xhr.abort();\n    resolveSourceType(sourceType);\n  };\n\n  var setSourceTypeDependingOnResponseContentType = function setSourceTypeDependingOnResponseContentType(type) {\n    switch (type) {\n      case 'image':\n        sourceType = _constants_core_constants__WEBPACK_IMPORTED_MODULE_0__[\"IMAGE_TYPE\"];\n        break;\n\n      case 'video':\n        sourceType = _constants_core_constants__WEBPACK_IMPORTED_MODULE_0__[\"VIDEO_TYPE\"];\n        break;\n\n      default:\n        sourceType = _constants_core_constants__WEBPACK_IMPORTED_MODULE_0__[\"INVALID_TYPE\"];\n    }\n  };\n}\n\n//# sourceURL=webpack:///./src/js/core/sources/types/AutomaticTypeDetector.js?");

/***/ }),

/***/ "./src/js/core/sources/types/DetectedTypeActioner.js":
/*!***********************************************************!*\
  !*** ./src/js/core/sources/types/DetectedTypeActioner.js ***!
  \***********************************************************/
/*! exports provided: DetectedTypeActioner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DetectedTypeActioner\", function() { return DetectedTypeActioner; });\n/* harmony import */ var _constants_core_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants/core-constants */ \"./src/js/constants/core-constants.js\");\n/* harmony import */ var _SourceLoadHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SourceLoadHandler */ \"./src/js/core/sources/SourceLoadHandler.js\");\n/* harmony import */ var _components_sources_proper_sources_renderImage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/sources/proper-sources/renderImage */ \"./src/js/components/sources/proper-sources/renderImage.js\");\n/* harmony import */ var _components_sources_proper_sources_renderVideo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/sources/proper-sources/renderVideo */ \"./src/js/components/sources/proper-sources/renderVideo.js\");\n/* harmony import */ var _components_sources_proper_sources_renderYoutube__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/sources/proper-sources/renderYoutube */ \"./src/js/components/sources/proper-sources/renderYoutube.js\");\n/* harmony import */ var _components_sources_proper_sources_renderCustom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/sources/proper-sources/renderCustom */ \"./src/js/components/sources/proper-sources/renderCustom.js\");\n/* harmony import */ var _components_sources_proper_sources_renderInvalid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/sources/proper-sources/renderInvalid */ \"./src/js/components/sources/proper-sources/renderInvalid.js\");\n\n\n\n\n\n\n\nfunction DetectedTypeActioner(fsLightbox) {\n  var sourcesLoadsHandlers = fsLightbox.collections.sourcesLoadsHandlers,\n      resolve = fsLightbox.resolve;\n\n  this.runActionsForSourceTypeAndIndex = function (type, i) {\n    if (type !== _constants_core_constants__WEBPACK_IMPORTED_MODULE_0__[\"INVALID_TYPE\"]) {\n      sourcesLoadsHandlers[i] = resolve(_SourceLoadHandler__WEBPACK_IMPORTED_MODULE_1__[\"SourceLoadHandler\"], [i]);\n    }\n\n    switch (type) {\n      case _constants_core_constants__WEBPACK_IMPORTED_MODULE_0__[\"IMAGE_TYPE\"]:\n        sourcesLoadsHandlers[i].setUpLoadForImage();\n        Object(_components_sources_proper_sources_renderImage__WEBPACK_IMPORTED_MODULE_2__[\"renderImage\"])();\n        break;\n\n      case _constants_core_constants__WEBPACK_IMPORTED_MODULE_0__[\"VIDEO_TYPE\"]:\n        sourcesLoadsHandlers[i].setUpLoadForVideo();\n        Object(_components_sources_proper_sources_renderVideo__WEBPACK_IMPORTED_MODULE_3__[\"renderVideo\"])();\n        break;\n\n      case _constants_core_constants__WEBPACK_IMPORTED_MODULE_0__[\"YOUTUBE_TYPE\"]:\n        sourcesLoadsHandlers[i].setUpLoadForYoutube();\n        Object(_components_sources_proper_sources_renderYoutube__WEBPACK_IMPORTED_MODULE_4__[\"renderYoutube\"])();\n        break;\n\n      case _constants_core_constants__WEBPACK_IMPORTED_MODULE_0__[\"CUSTOM_TYPE\"]:\n        sourcesLoadsHandlers[i].setUpLoadForCustom();\n        Object(_components_sources_proper_sources_renderCustom__WEBPACK_IMPORTED_MODULE_5__[\"renderCustom\"])();\n        break;\n\n      default:\n        Object(_components_sources_proper_sources_renderInvalid__WEBPACK_IMPORTED_MODULE_6__[\"renderInvalid\"])();\n        break;\n    }\n  };\n}\n\n//# sourceURL=webpack:///./src/js/core/sources/types/DetectedTypeActioner.js?");

/***/ }),

/***/ "./src/js/core/sources/types/getAutomaticTypeDetectorBucket.js":
/*!*********************************************************************!*\
  !*** ./src/js/core/sources/types/getAutomaticTypeDetectorBucket.js ***!
  \*********************************************************************/
/*! exports provided: getAutomaticTypeDetectorBucket */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAutomaticTypeDetectorBucket\", function() { return getAutomaticTypeDetectorBucket; });\nfunction getAutomaticTypeDetectorBucket() {\n  return {\n    isUrlYoutubeOne: function isUrlYoutubeOne(url) {\n      var parser = document.createElement('a');\n      parser.href = url;\n      return parser.hostname === 'www.youtube.com';\n    },\n    getTypeFromResponseContentType: function getTypeFromResponseContentType(responseContentType) {\n      return responseContentType.slice(0, responseContentType.indexOf('/'));\n    }\n  };\n}\n\n//# sourceURL=webpack:///./src/js/core/sources/types/getAutomaticTypeDetectorBucket.js?");

/***/ }),

/***/ "./src/js/core/stage/setUpStageManager.js":
/*!************************************************!*\
  !*** ./src/js/core/stage/setUpStageManager.js ***!
  \************************************************/
/*! exports provided: setUpStageManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setUpStageManager\", function() { return setUpStageManager; });\nfunction setUpStageManager(_ref) {\n  var stageIndexes = _ref.stageIndexes,\n      self = _ref.core.stageManager,\n      sourcesCount = _ref.data.sourcesCount;\n  var lastSourceIndex = sourcesCount - 1;\n\n  self.getPreviousSlideIndex = function () {\n    return stageIndexes.current === 0 ? lastSourceIndex : stageIndexes.current - 1;\n  };\n\n  self.getNextSlideIndex = function () {\n    return stageIndexes.current === lastSourceIndex ? 0 : stageIndexes.current + 1;\n  }; // set up updateStageIndexes\n\n\n  if (lastSourceIndex === 0) {\n    self.updateStageIndexes = function () {};\n  } else if (lastSourceIndex === 1) {\n    self.updateStageIndexes = function () {\n      if (stageIndexes.current === 0) {\n        stageIndexes.next = 1;\n        delete stageIndexes.previous;\n      } else {\n        stageIndexes.previous = 0;\n        delete stageIndexes.next;\n      }\n    };\n  } else {\n    self.updateStageIndexes = function () {\n      stageIndexes.previous = self.getPreviousSlideIndex();\n      stageIndexes.next = self.getNextSlideIndex();\n    };\n  } // set up isSourceInStage\n  // if there are 3, 2, 1 slides all sources will be always in stage\n\n\n  lastSourceIndex <= 2 ? self.isSourceInStage = function () {\n    return true;\n  } : self.isSourceInStage = function (index) {\n    var currentIndex = stageIndexes.current;\n    if (currentIndex === 0 && index === lastSourceIndex || currentIndex === lastSourceIndex && index === 0) return true;\n    var difference = currentIndex - index;\n    return difference === -1 || difference === 0 || difference === 1;\n  };\n}\n\n//# sourceURL=webpack:///./src/js/core/stage/setUpStageManager.js?");

/***/ }),

/***/ "./src/js/core/transforms/SourceOuterTransformer.js":
/*!**********************************************************!*\
  !*** ./src/js/core/transforms/SourceOuterTransformer.js ***!
  \**********************************************************/
/*! exports provided: SourceOuterTransformer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SourceOuterTransformer\", function() { return SourceOuterTransformer; });\nfunction SourceOuterTransformer(_ref) {\n  var _this = this;\n\n  var slideDistance = _ref.data.slideDistance;\n  var realSlideDistance = slideDistance + 1;\n  var sourceHolder;\n  var additionalTransformValue = 0;\n\n  this.setSourceHolder = function (sourceHolderElement) {\n    sourceHolder = sourceHolderElement;\n  };\n  /** @return { this } */\n\n\n  this.byValue = function (value) {\n    additionalTransformValue = value;\n    return _this;\n  };\n\n  this.negative = function () {\n    setFinalTransformAndCleanTransformer(-getDefaultTransformDistance());\n  };\n\n  this.zero = function () {\n    setFinalTransformAndCleanTransformer(0);\n  };\n\n  this.positive = function () {\n    setFinalTransformAndCleanTransformer(getDefaultTransformDistance());\n  };\n\n  var setFinalTransformAndCleanTransformer = function setFinalTransformAndCleanTransformer(value) {\n    sourceHolder.current.style.transform = \"translateX(\".concat(value + additionalTransformValue, \"px)\");\n    additionalTransformValue = 0;\n  };\n\n  var getDefaultTransformDistance = function getDefaultTransformDistance() {\n    return realSlideDistance * innerWidth;\n  };\n}\n\n//# sourceURL=webpack:///./src/js/core/transforms/SourceOuterTransformer.js?");

/***/ }),

/***/ "./src/js/helpers/elements/removeFromElementClassIfContains.js":
/*!*********************************************************************!*\
  !*** ./src/js/helpers/elements/removeFromElementClassIfContains.js ***!
  \*********************************************************************/
/*! exports provided: removeFromElementClassIfContains */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeFromElementClassIfContains\", function() { return removeFromElementClassIfContains; });\nfunction removeFromElementClassIfContains(element, className) {\n  var classList = element.current.classList;\n\n  if (classList.contains(className)) {\n    classList.remove(className);\n  }\n}\n\n//# sourceURL=webpack:///./src/js/helpers/elements/removeFromElementClassIfContains.js?");

/***/ }),

/***/ "./src/js/helpers/objects/assignToObject.js":
/*!**************************************************!*\
  !*** ./src/js/helpers/objects/assignToObject.js ***!
  \**************************************************/
/*! exports provided: assignToObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"assignToObject\", function() { return assignToObject; });\n/**\n * This function assigns to object properties from second one\n * @param { Object } object\n * @param { Object } toAssign\n */\nfunction assignToObject(object, toAssign) {\n  for (var toAssignPropertyName in toAssign) {\n    object[toAssignPropertyName] = toAssign[toAssignPropertyName];\n  }\n}\n\n//# sourceURL=webpack:///./src/js/helpers/objects/assignToObject.js?");

/***/ }),

/***/ "./src/scss/FsLightbox.scss":
/*!**********************************!*\
  !*** ./src/scss/FsLightbox.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./FsLightbox.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/FsLightbox.scss\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/scss/FsLightbox.scss?");

/***/ })

/******/ });
});