"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _normalizeColor = _interopRequireDefault(require("../../modules/normalizeColor"));

var _normalizeValue = _interopRequireDefault(require("./normalizeValue"));

/**
 * Copyright (c) 2018-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var defaultOffset = {
  height: 0,
  width: 0
};

var resolveShadowValue = function resolveShadowValue(style) {
  var shadowColor = style.shadowColor,
      shadowOffset = style.shadowOffset,
      shadowOpacity = style.shadowOpacity,
      shadowRadius = style.shadowRadius;

  var _ref = shadowOffset || defaultOffset,
      height = _ref.height,
      width = _ref.width;

  var offsetX = (0, _normalizeValue.default)(null, width);
  var offsetY = (0, _normalizeValue.default)(null, height);
  var blurRadius = (0, _normalizeValue.default)(null, shadowRadius || 0);
  var color = (0, _normalizeColor.default)(shadowColor || 'black', shadowOpacity);

  if (color) {
    return offsetX + " " + offsetY + " " + blurRadius + " " + color;
  }
};

var _default = resolveShadowValue;
exports.default = _default;