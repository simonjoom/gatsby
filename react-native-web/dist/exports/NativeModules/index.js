"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _UIManager = _interopRequireDefault(require("../UIManager"));

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */
// NativeModules shim
var NativeModules = {
  UIManager: _UIManager.default
};
var _default = NativeModules;
exports.default = _default;