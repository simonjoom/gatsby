"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _StyleSheetValidation = _interopRequireDefault(require("./StyleSheetValidation"));

var _ReactNativePropRegistry = _interopRequireDefault(require("../../modules/ReactNativePropRegistry"));

var _flattenStyle = _interopRequireDefault(require("./flattenStyle"));

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */
var absoluteFillObject = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

var absoluteFill = _ReactNativePropRegistry.default.register(absoluteFillObject);

var StyleSheet = {
  absoluteFill: absoluteFill,
  absoluteFillObject: absoluteFillObject,
  compose: function compose(style1, style2) {
    if (style1 && style2) {
      return [style1, style2];
    } else {
      return style1 || style2;
    }
  },
  create: function create(styles) {
    var result = {};
    Object.keys(styles).forEach(function (key) {
      if (process.env.NODE_ENV !== 'production') {
        _StyleSheetValidation.default.validateStyle(key, styles);
      }

      var id = styles[key] && _ReactNativePropRegistry.default.register(styles[key]);

      result[key] = id;
    });
    return result;
  },
  flatten: _flattenStyle.default,
  hairlineWidth: 1
};
var _default = StyleSheet;
exports.default = _default;