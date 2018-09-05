"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _ColorPropType = _interopRequireDefault(require("../ColorPropType"));

var _react = require("react");

var _createElement = _interopRequireDefault(require("../createElement"));

var _propTypes = require("prop-types");

var PickerItem =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(PickerItem, _Component);

  function PickerItem() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = PickerItem.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        color = _this$props.color,
        label = _this$props.label,
        testID = _this$props.testID,
        value = _this$props.value;
    var style = {
      color: color
    };
    return (0, _createElement.default)('option', {
      style: style,
      testID: testID,
      value: value
    }, label);
  };

  return PickerItem;
}(_react.Component);

exports.default = PickerItem;
PickerItem.propTypes = {
  color: _ColorPropType.default,
  label: _propTypes.string.isRequired,
  testID: _propTypes.string,
  value: (0, _propTypes.oneOfType)([_propTypes.number, _propTypes.string])
};