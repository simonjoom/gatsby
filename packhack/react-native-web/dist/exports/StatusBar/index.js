"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = require("react");

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var StatusBar =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(StatusBar, _Component);

  function StatusBar() {
    return _Component.apply(this, arguments) || this;
  }

  StatusBar.setBackgroundColor = function setBackgroundColor() {};

  StatusBar.setBarStyle = function setBarStyle() {};

  StatusBar.setHidden = function setHidden() {};

  StatusBar.setNetworkActivityIndicatorVisible = function setNetworkActivityIndicatorVisible() {};

  StatusBar.setTranslucent = function setTranslucent() {};

  var _proto = StatusBar.prototype;

  _proto.render = function render() {
    return null;
  };

  return StatusBar;
}(_react.Component);

exports.default = StatusBar;