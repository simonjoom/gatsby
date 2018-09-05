"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _ColorPropType = _interopRequireDefault(require("../ColorPropType"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _TouchableOpacity = _interopRequireDefault(require("../TouchableOpacity"));

var _Text = _interopRequireDefault(require("../Text"));

var _propTypes = require("prop-types");

var _react = _interopRequireWildcard(require("react"));

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var Button =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Button, _Component);

  function Button() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Button.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        accessibilityLabel = _this$props.accessibilityLabel,
        color = _this$props.color,
        disabled = _this$props.disabled,
        onPress = _this$props.onPress,
        testID = _this$props.testID,
        title = _this$props.title;
    return _react.default.createElement(_TouchableOpacity.default, {
      accessibilityLabel: accessibilityLabel,
      accessibilityRole: "button",
      disabled: disabled,
      onPress: onPress,
      style: [styles.button, color && {
        backgroundColor: color
      }, disabled && styles.buttonDisabled],
      testID: testID
    }, _react.default.createElement(_Text.default, {
      style: [styles.text, disabled && styles.textDisabled]
    }, title));
  };

  return Button;
}(_react.Component);

Button.propTypes = {
  accessibilityLabel: _propTypes.string,
  color: _ColorPropType.default,
  disabled: _propTypes.bool,
  onPress: _propTypes.func.isRequired,
  testID: _propTypes.string,
  title: _propTypes.string.isRequired
};

var styles = _StyleSheet.default.create({
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 2
  },
  text: {
    color: '#fff',
    fontWeight: '500',
    padding: 8,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  buttonDisabled: {
    backgroundColor: '#dfdfdf'
  },
  textDisabled: {
    color: '#a1a1a1'
  }
});

var _default = Button;
exports.default = _default;