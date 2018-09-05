"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _dismissKeyboard = _interopRequireDefault(require("../../modules/dismissKeyboard"));

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var Keyboard = {
  addListener: function addListener() {
    return {
      remove: function remove() {}
    };
  },
  dismiss: function dismiss() {
    (0, _dismissKeyboard.default)();
  },
  removeAllListeners: function removeAllListeners() {},
  removeListener: function removeListener() {}
};
var _default = Keyboard;
exports.default = _default;