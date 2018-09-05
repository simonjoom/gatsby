"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _TextInputState = _interopRequireDefault(require("../TextInputState"));

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var dismissKeyboard = function dismissKeyboard() {
  _TextInputState.default.blurTextInput(_TextInputState.default.currentlyFocusedField());
};

var _default = dismissKeyboard;
exports.default = _default;