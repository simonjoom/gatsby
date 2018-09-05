"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _applyNativeMethods = _interopRequireDefault(require("../../modules/applyNativeMethods"));

var _react = require("react");

var _createElement = _interopRequireDefault(require("../createElement"));

var _PickerItem = _interopRequireDefault(require("./PickerItem"));

var _PickerItemPropType = _interopRequireDefault(require("./PickerItemPropType"));

var _PickerStylePropTypes = _interopRequireDefault(require("./PickerStylePropTypes"));

var _StyleSheetPropType = _interopRequireDefault(require("../../modules/StyleSheetPropType"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _TextPropTypes = _interopRequireDefault(require("../Text/TextPropTypes"));

var _propTypes = require("prop-types");

/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var pickerStyleType = (0, _StyleSheetPropType.default)(_PickerStylePropTypes.default);

var Picker =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Picker, _Component);

  function Picker() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._handleChange = function (e) {
      var onValueChange = _this.props.onValueChange;
      var _e$target = e.target,
          selectedIndex = _e$target.selectedIndex,
          value = _e$target.value;

      if (onValueChange) {
        onValueChange(value, selectedIndex);
      }
    };

    return _this;
  }

  var _proto = Picker.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        enabled = _this$props.enabled,
        selectedValue = _this$props.selectedValue,
        style = _this$props.style,
        testID = _this$props.testID,
        itemStyle = _this$props.itemStyle,
        mode = _this$props.mode,
        prompt = _this$props.prompt;
    return (0, _createElement.default)('select', {
      children: children,
      disabled: enabled === false ? true : undefined,
      onChange: this._handleChange,
      style: [styles.initial, style],
      testID: testID,
      value: selectedValue
    });
  };

  return Picker;
}(_react.Component);

Picker.propTypes = {
  children: (0, _propTypes.oneOfType)([_PickerItemPropType.default, (0, _propTypes.arrayOf)(_PickerItemPropType.default)]),
  enabled: _propTypes.bool,
  onValueChange: _propTypes.func,
  selectedValue: (0, _propTypes.oneOfType)([_propTypes.number, _propTypes.string]),
  style: pickerStyleType,
  testID: _propTypes.string
};
Picker.Item = _PickerItem.default;

var styles = _StyleSheet.default.create({
  initial: {
    fontFamily: 'System',
    fontSize: 'inherit',
    margin: 0
  }
});

var _default = (0, _applyNativeMethods.default)(Picker);

exports.default = _default;