"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _UnimplementedView = _interopRequireDefault(require("../../modules/UnimplementedView"));

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var YellowBox =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(YellowBox, _React$Component);

  function YellowBox() {
    return _React$Component.apply(this, arguments) || this;
  }

  YellowBox.ignoreWarnings = function ignoreWarnings() {};

  var _proto = YellowBox.prototype;

  _proto.render = function render() {
    return _react.default.createElement(_UnimplementedView.default, this.props);
  };

  return YellowBox;
}(_react.default.Component);

var _default = YellowBox;
exports.default = _default;