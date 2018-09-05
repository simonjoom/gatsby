"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _View = _interopRequireDefault(require("../View"));

var _ViewPropTypes = _interopRequireDefault(require("../ViewPropTypes"));

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var SafeAreaView =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(SafeAreaView, _React$Component);

  function SafeAreaView() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = SafeAreaView.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        style = _this$props.style,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["style"]);
    return _react.default.createElement(_View.default, (0, _extends2.default)({}, rest, {
      style: _StyleSheet.default.compose(styles.root, style)
    }));
  };

  return SafeAreaView;
}(_react.default.Component);

SafeAreaView.displayName = 'SafeAreaView';
SafeAreaView.propTypes = (0, _extends2.default)({}, _ViewPropTypes.default);

var styles = _StyleSheet.default.create({
  root: {
    paddingTop: 'env(safe-area-inset-top)',
    paddingRight: 'env(safe-area-inset-right)',
    paddingBottom: 'env(safe-area-inset-bottom)',
    paddingLeft: 'env(safe-area-inset-left)'
  }
});

var _default = SafeAreaView;
exports.default = _default;