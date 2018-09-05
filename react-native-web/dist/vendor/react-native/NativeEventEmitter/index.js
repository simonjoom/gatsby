/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule NativeEventEmitter
 * 
 */
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _EventEmitter2 = _interopRequireDefault(require("../emitter/EventEmitter"));

var _Platform = _interopRequireDefault(require("../../../exports/Platform"));

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

/**
 * Abstract base class for implementing event-emitting modules. This implements
 * a subset of the standard EventEmitter node module API.
 */
var NativeEventEmitter =
/*#__PURE__*/
function (_EventEmitter) {
  (0, _inheritsLoose2.default)(NativeEventEmitter, _EventEmitter);

  function NativeEventEmitter(nativeModule) {
    var _this;

    _this = _EventEmitter.call(this) || this;

    if (_Platform.default.OS === 'ios') {
      (0, _invariant.default)(nativeModule, 'Native module cannot be null.');
      _this._nativeModule = nativeModule;
    }

    return _this;
  }

  var _proto = NativeEventEmitter.prototype;

  _proto.addListener = function addListener(eventType, listener, context) {
    if (this._nativeModule != null) {
      this._nativeModule.addListener(eventType);
    }

    return _EventEmitter.prototype.addListener.call(this, eventType, listener, context);
  };

  _proto.removeAllListeners = function removeAllListeners(eventType) {
    (0, _invariant.default)(eventType, 'eventType argument is required.');
    var count = this.listeners(eventType).length;

    if (this._nativeModule != null) {
      this._nativeModule.removeListeners(count);
    }

    _EventEmitter.prototype.removeAllListeners.call(this, eventType);
  };

  _proto.removeSubscription = function removeSubscription(subscription) {
    if (this._nativeModule != null) {
      this._nativeModule.removeListeners(1);
    }

    _EventEmitter.prototype.removeSubscription.call(this, subscription);
  };

  return NativeEventEmitter;
}(_EventEmitter2.default);

var _default = NativeEventEmitter;
exports.default = _default;