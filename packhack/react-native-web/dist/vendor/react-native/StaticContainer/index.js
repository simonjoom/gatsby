"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _propTypes = require("prop-types");

var _react = require("react");

/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var StaticContainer =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(StaticContainer, _Component);

  function StaticContainer() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = StaticContainer.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return nextProps.shouldUpdate;
  };

  _proto.render = function render() {
    var child = this.props.children;
    return child === null || child === false ? null : _react.Children.only(child);
  };

  return StaticContainer;
}(_react.Component);

exports.default = StaticContainer;
StaticContainer.propTypes = {
  children: _propTypes.any.isRequired,
  shouldUpdate: _propTypes.bool.isRequired
};