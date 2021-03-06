"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _hyphenateStyleName = _interopRequireDefault(require("hyphenate-style-name"));

var _mapKeyValue = _interopRequireDefault(require("../../modules/mapKeyValue"));

var _normalizeValue = _interopRequireDefault(require("./normalizeValue"));

var _prefixStyles = _interopRequireDefault(require("../../modules/prefixStyles"));

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */
var createDeclarationString = function createDeclarationString(prop, val) {
  var name = (0, _hyphenateStyleName.default)(prop);
  var value = (0, _normalizeValue.default)(prop, val);

  if (Array.isArray(val)) {
    return val.map(function (v) {
      return name + ":" + v;
    }).join(';');
  }

  return name + ":" + value;
};
/**
 * Generates valid CSS rule body from a JS object
 *
 * createRuleBlock({ width: 20, color: 'blue' });
 * // => 'color:blue;width:20px'
 */


var createRuleBlock = function createRuleBlock(style) {
  return (0, _mapKeyValue.default)((0, _prefixStyles.default)(style), createDeclarationString).sort().join(';');
};

var _default = createRuleBlock;
exports.default = _default;