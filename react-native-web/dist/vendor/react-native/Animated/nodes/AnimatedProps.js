/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _AnimatedEvent = require("../AnimatedEvent");

var _AnimatedNode2 = _interopRequireDefault(require("./AnimatedNode"));

var _AnimatedStyle = _interopRequireDefault(require("./AnimatedStyle"));

var _NativeAnimatedHelper = _interopRequireDefault(require("../NativeAnimatedHelper"));

var _findNodeHandle = _interopRequireDefault(require("../../../../exports/findNodeHandle"));

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

var AnimatedProps =
/*#__PURE__*/
function (_AnimatedNode) {
  (0, _inheritsLoose2.default)(AnimatedProps, _AnimatedNode);

  function AnimatedProps(props, callback) {
    var _this;

    _this = _AnimatedNode.call(this) || this;

    if (props.style) {
      props = (0, _extends2.default)({}, props, {
        style: new _AnimatedStyle.default(props.style)
      });
    }

    _this._props = props;
    _this._callback = callback;

    _this.__attach();

    return _this;
  }

  var _proto = AnimatedProps.prototype;

  _proto.__getValue = function __getValue() {
    var props = {};

    for (var key in this._props) {
      var value = this._props[key];

      if (value instanceof _AnimatedNode2.default) {
        if (!value.__isNative || value instanceof _AnimatedStyle.default) {
          // We cannot use value of natively driven nodes this way as the value we have access from
          // JS may not be up to date.
          props[key] = value.__getValue();
        }
      } else if (value instanceof _AnimatedEvent.AnimatedEvent) {
        props[key] = value.__getHandler();
      } else {
        props[key] = value;
      }
    }

    return props;
  };

  _proto.__getAnimatedValue = function __getAnimatedValue() {
    var props = {};

    for (var key in this._props) {
      var value = this._props[key];

      if (value instanceof _AnimatedNode2.default) {
        props[key] = value.__getAnimatedValue();
      }
    }

    return props;
  };

  _proto.__attach = function __attach() {
    for (var key in this._props) {
      var value = this._props[key];

      if (value instanceof _AnimatedNode2.default) {
        value.__addChild(this);
      }
    }
  };

  _proto.__detach = function __detach() {
    if (this.__isNative && this._animatedView) {
      this.__disconnectAnimatedView();
    }

    for (var key in this._props) {
      var value = this._props[key];

      if (value instanceof _AnimatedNode2.default) {
        value.__removeChild(this);
      }
    }

    _AnimatedNode.prototype.__detach.call(this);
  };

  _proto.update = function update() {
    this._callback();
  };

  _proto.__makeNative = function __makeNative() {
    if (!this.__isNative) {
      this.__isNative = true;

      for (var key in this._props) {
        var value = this._props[key];

        if (value instanceof _AnimatedNode2.default) {
          value.__makeNative();
        }
      }

      if (this._animatedView) {
        this.__connectAnimatedView();
      }
    }
  };

  _proto.setNativeView = function setNativeView(animatedView) {
    if (this._animatedView === animatedView) {
      return;
    }

    this._animatedView = animatedView;

    if (this.__isNative) {
      this.__connectAnimatedView();
    }
  };

  _proto.__connectAnimatedView = function __connectAnimatedView() {
    (0, _invariant.default)(this.__isNative, 'Expected node to be marked as "native"');
    var nativeViewTag = (0, _findNodeHandle.default)(this._animatedView);
    (0, _invariant.default)(nativeViewTag != null, 'Unable to locate attached view in the native tree');

    _NativeAnimatedHelper.default.API.connectAnimatedNodeToView(this.__getNativeTag(), nativeViewTag);
  };

  _proto.__disconnectAnimatedView = function __disconnectAnimatedView() {
    (0, _invariant.default)(this.__isNative, 'Expected node to be marked as "native"');
    var nativeViewTag = (0, _findNodeHandle.default)(this._animatedView);
    (0, _invariant.default)(nativeViewTag != null, 'Unable to locate attached view in the native tree');

    _NativeAnimatedHelper.default.API.disconnectAnimatedNodeFromView(this.__getNativeTag(), nativeViewTag);
  };

  _proto.__getNativeConfig = function __getNativeConfig() {
    var propsConfig = {};

    for (var propKey in this._props) {
      var value = this._props[propKey];

      if (value instanceof _AnimatedNode2.default) {
        propsConfig[propKey] = value.__getNativeTag();
      }
    }

    return {
      type: 'props',
      props: propsConfig
    };
  };

  return AnimatedProps;
}(_AnimatedNode2.default);

var _default = AnimatedProps;
exports.default = _default;