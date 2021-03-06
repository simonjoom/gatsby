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
function emptyFunction() {}

var BackHandler = {
  exitApp: emptyFunction,
  addEventListener: function addEventListener() {
    return {
      remove: emptyFunction
    };
  },
  removeEventListener: emptyFunction
};
var _default = BackHandler;
exports.default = _default;