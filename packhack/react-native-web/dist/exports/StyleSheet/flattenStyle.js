"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ReactNativePropRegistry = _interopRequireDefault(require("../../modules/ReactNativePropRegistry"));

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function getStyle(style) {
  if (typeof style === 'number') {
    return _ReactNativePropRegistry.default.getByID(style);
  }

  return style;
}

function flattenStyle(style) {
  if (!style) {
    return undefined;
  }

  if (process.env.NODE_ENV !== 'production') {
    (0, _invariant.default)(style !== true, 'style may be false but not true');
  }

  if (!Array.isArray(style)) {
    // $FlowFixMe
    return getStyle(style);
  }

  var result = {};

  for (var i = 0, styleLength = style.length; i < styleLength; ++i) {
    var computedStyle = flattenStyle(style[i]);

    if (computedStyle) {
      for (var key in computedStyle) {
        var value = computedStyle[key];
        result[key] = value;
      }
    }
  }

  return result;
}

var _default = flattenStyle;
exports.default = _default;