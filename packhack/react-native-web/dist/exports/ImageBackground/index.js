"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _ensureComponentIsNative = _interopRequireDefault(require("../../modules/ensureComponentIsNative"));

var _Image = _interopRequireDefault(require("../Image"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _View = _interopRequireDefault(require("../View"));

var _ViewPropTypes = _interopRequireDefault(require("../ViewPropTypes"));

var _react = _interopRequireWildcard(require("react"));

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var emptyObject = {};
/**
 * Very simple drop-in replacement for <Image> which supports nesting views.
 */

var ImageBackground =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(ImageBackground, _Component);

  function ImageBackground() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this._viewRef = null;

    _this._captureRef = function (ref) {
      _this._viewRef = ref;
    };

    return _this;
  }

  var _proto = ImageBackground.prototype;

  _proto.setNativeProps = function setNativeProps(props) {
    // Work-around flow
    var viewRef = this._viewRef;

    if (viewRef) {
      (0, _ensureComponentIsNative.default)(viewRef);
      viewRef.setNativeProps(props);
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        style = _this$props.style,
        imageStyle = _this$props.imageStyle,
        imageRef = _this$props.imageRef,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["children", "style", "imageStyle", "imageRef"]);
    return _react.default.createElement(_View.default, {
      ref: this._captureRef,
      style: style
    }, _react.default.createElement(_Image.default, (0, _extends2.default)({}, props, {
      ref: imageRef,
      style: [_StyleSheet.default.absoluteFill, {
        // Temporary Workaround:
        // Current (imperfect yet) implementation of <Image> overwrites width and height styles
        // (which is not quite correct), and these styles conflict with explicitly set styles
        // of <ImageBackground> and with our internal layout model here.
        // So, we have to proxy/reapply these styles explicitly for actual <Image> component.
        // This workaround should be removed after implementing proper support of
        // intrinsic content size of the <Image>.
        width: style.width,
        height: style.height,
        zIndex: -1
      }, imageStyle]
    })), children);
  };

  return ImageBackground;
}(_react.Component);
/*
ImageBackground.propTypes = (0, _extends2.default)({}, _Image.default.propTypes, {
  imageStyle: _Image.default.propTypes.style,
  style: _ViewPropTypes.default.style
});*/
ImageBackground.defaultProps = {
  style: emptyObject
};
var _default = ImageBackground;
exports.default = _default;