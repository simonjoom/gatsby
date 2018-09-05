"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _ColorPropType = _interopRequireDefault(require("../ColorPropType"));

var _View = _interopRequireDefault(require("../View"));

var _ViewPropTypes = _interopRequireDefault(require("../ViewPropTypes"));

var _propTypes = require("prop-types");

var _react = _interopRequireWildcard(require("react"));

/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var RefreshControl =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(RefreshControl, _Component);

  function RefreshControl() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = RefreshControl.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        colors = _this$props.colors,
        enabled = _this$props.enabled,
        onRefresh = _this$props.onRefresh,
        progressBackgroundColor = _this$props.progressBackgroundColor,
        progressViewOffset = _this$props.progressViewOffset,
        refreshing = _this$props.refreshing,
        size = _this$props.size,
        tintColor = _this$props.tintColor,
        title = _this$props.title,
        titleColor = _this$props.titleColor,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["colors", "enabled", "onRefresh", "progressBackgroundColor", "progressViewOffset", "refreshing", "size", "tintColor", "title", "titleColor"]);
    return _react.default.createElement(_View.default, rest);
  };

  return RefreshControl;
}(_react.Component);

RefreshControl.propTypes = (0, _extends2.default)({}, _ViewPropTypes.default, {
  colors: (0, _propTypes.arrayOf)(_ColorPropType.default),
  enabled: _propTypes.bool,
  onRefresh: _propTypes.func,
  progressBackgroundColor: _ColorPropType.default,
  progressViewOffset: _propTypes.number,
  refreshing: _propTypes.bool.isRequired,
  size: (0, _propTypes.oneOf)([0, 1]),
  tintColor: _ColorPropType.default,
  title: _propTypes.string,
  titleColor: _ColorPropType.default
});
var _default = RefreshControl;
exports.default = _default;