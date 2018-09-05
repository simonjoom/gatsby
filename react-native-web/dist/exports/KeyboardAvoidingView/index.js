"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _View = _interopRequireDefault(require("../View"));

var _propTypes = require("prop-types");

var _react = _interopRequireWildcard(require("react"));

var _ViewPropTypes = _interopRequireDefault(require("../ViewPropTypes"));

/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var KeyboardAvoidingView =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(KeyboardAvoidingView, _Component);

  function KeyboardAvoidingView() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.frame = null;

    _this.onLayout = function (event) {
      _this.frame = event.nativeEvent.layout;
    };

    return _this;
  }

  var _proto = KeyboardAvoidingView.prototype;

  _proto.relativeKeyboardHeight = function relativeKeyboardHeight(keyboardFrame) {
    var frame = this.frame;

    if (!frame || !keyboardFrame) {
      return 0;
    }

    var keyboardY = keyboardFrame.screenY - this.props.keyboardVerticalOffset;
    return Math.max(frame.y + frame.height - keyboardY, 0);
  };

  _proto.onKeyboardChange = function onKeyboardChange(event) {};

  _proto.render = function render() {
    var _this$props = this.props,
        behavior = _this$props.behavior,
        contentContainerStyle = _this$props.contentContainerStyle,
        keyboardVerticalOffset = _this$props.keyboardVerticalOffset,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["behavior", "contentContainerStyle", "keyboardVerticalOffset"]);
    return _react.default.createElement(_View.default, (0, _extends2.default)({
      onLayout: this.onLayout
    }, rest));
  };

  return KeyboardAvoidingView;
}(_react.Component);

KeyboardAvoidingView.propTypes = (0, _extends2.default)({}, _ViewPropTypes.default, {
  behavior: (0, _propTypes.oneOf)(['height', 'padding', 'position']),
  contentContainerStyle: _ViewPropTypes.default.style,
  keyboardVerticalOffset: _propTypes.number.isRequired
});
KeyboardAvoidingView.defaultProps = {
  keyboardVerticalOffset: 0
};
var _default = KeyboardAvoidingView;
exports.default = _default;