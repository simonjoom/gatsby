"use strict";

exports.__esModule = true;
exports.default = void 0;

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var _vibrate = function vibrate(pattern) {
  if ('vibrate' in window.navigator) {
    window.navigator.vibrate(pattern);
  }
};

var Vibration = {
  cancel: function cancel() {
    _vibrate(0);
  },
  vibrate: function vibrate(pattern) {
    if (pattern === void 0) {
      pattern = 400;
    }

    _vibrate(pattern);
  }
};
var _default = Vibration;
exports.default = _default;