"use strict";

exports.__esModule = true;
exports.default = void 0;

var isWebColor = function isWebColor(color) {
  return color === 'currentcolor' || color === 'currentColor' || color === 'inherit' || color.indexOf('var(') === 0;
};

var _default = isWebColor;
exports.default = _default;