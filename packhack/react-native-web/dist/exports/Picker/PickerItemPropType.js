"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ = _interopRequireDefault(require("./"));

/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var PickerItemPropType = function PickerItemPropType(props, propName, componentName) {
  var prop = props[propName];
  var error = null;

  _react.default.Children.forEach(prop, function (child) {
    if (child.type !== _.default.Item) {
      error = new Error('`Picker` children must be of type `Picker.Item`.');
    }
  });

  return error;
};

var _default = PickerItemPropType;
exports.default = _default;