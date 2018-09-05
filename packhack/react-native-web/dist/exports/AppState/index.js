"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _ExecutionEnvironment = require("fbjs/lib/ExecutionEnvironment");

var _arrayFindIndex = _interopRequireDefault(require("array-find-index"));

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */
// Android 4.4 browser
var isPrefixed = _ExecutionEnvironment.canUseDOM && !document.hasOwnProperty('hidden') && document.hasOwnProperty('webkitHidden');
var EVENT_TYPES = ['change', 'memoryWarning'];
var VISIBILITY_CHANGE_EVENT = isPrefixed ? 'webkitvisibilitychange' : 'visibilitychange';
var VISIBILITY_STATE_PROPERTY = isPrefixed ? 'webkitVisibilityState' : 'visibilityState';
var AppStates = {
  BACKGROUND: 'background',
  ACTIVE: 'active'
};
var listeners = [];

var AppState =
/*#__PURE__*/
function () {
  function AppState() {}

  AppState.addEventListener = function addEventListener(type, handler) {
    if (AppState.isAvailable) {
      (0, _invariant.default)(EVENT_TYPES.indexOf(type) !== -1, 'Trying to subscribe to unknown event: "%s"', type);

      if (type === 'change') {
        var callback = function callback() {
          return handler(AppState.currentState);
        };

        listeners.push([handler, callback]);
        document.addEventListener(VISIBILITY_CHANGE_EVENT, callback, false);
      }
    }
  };

  AppState.removeEventListener = function removeEventListener(type, handler) {
    if (AppState.isAvailable) {
      (0, _invariant.default)(EVENT_TYPES.indexOf(type) !== -1, 'Trying to remove listener for unknown event: "%s"', type);

      if (type === 'change') {
        var listenerIndex = (0, _arrayFindIndex.default)(listeners, function (pair) {
          return pair[0] === handler;
        });
        (0, _invariant.default)(listenerIndex !== -1, 'Trying to remove AppState listener for unregistered handler');
        var callback = listeners[listenerIndex][1];
        document.removeEventListener(VISIBILITY_CHANGE_EVENT, callback, false);
        listeners.splice(listenerIndex, 1);
      }
    }
  };

  (0, _createClass2.default)(AppState, null, [{
    key: "currentState",
    get: function get() {
      if (!AppState.isAvailable) {
        return AppStates.ACTIVE;
      }

      switch (document[VISIBILITY_STATE_PROPERTY]) {
        case 'hidden':
        case 'prerender':
        case 'unloaded':
          return AppStates.BACKGROUND;

        default:
          return AppStates.ACTIVE;
      }
    }
  }]);
  return AppState;
}();

exports.default = AppState;
AppState.isAvailable = _ExecutionEnvironment.canUseDOM && document[VISIBILITY_STATE_PROPERTY];