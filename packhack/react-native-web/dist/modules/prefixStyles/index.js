"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.prefixInlineStyles = exports.default = void 0;

var _createPrefixer = _interopRequireDefault(require("inline-style-prefixer/static/createPrefixer"));

var _static = _interopRequireDefault(require("./static"));

/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var prefixAll = (0, _createPrefixer.default)(_static.default);
var _default = prefixAll;
exports.default = _default;

var prefixInlineStyles = function prefixInlineStyles(style) {
  var prefixedStyles = prefixAll(style); // React@15 removed undocumented support for fallback values in
  // inline-styles. Revert array values to the standard CSS value

  Object.keys(prefixedStyles).forEach(function (prop) {
    var value = prefixedStyles[prop];

    if (Array.isArray(value)) {
      prefixedStyles[prop] = value[value.length - 1];
    }
  });
  return prefixedStyles;
};

exports.prefixInlineStyles = prefixInlineStyles;