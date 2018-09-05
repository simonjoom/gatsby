"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _View = _interopRequireDefault(require("../View"));

var _propTypes = require("prop-types");

var _react = _interopRequireWildcard(require("react"));

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var AppContainer =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(AppContainer, _Component);

  function AppContainer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      mainKey: 1
    };
    return _this;
  }

  var _proto = AppContainer.prototype;

  _proto.getChildContext = function getChildContext() {
    return {
      rootTag: this.props.rootTag
    };
  };

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        WrapperComponent = _this$props.WrapperComponent;

    var innerView = _react.default.createElement(_View.default, {
      children: children,
      key: this.state.mainKey,
      pointerEvents: "box-none",
      style: styles.appContainer
    });

    if (WrapperComponent) {
      innerView = _react.default.createElement(WrapperComponent, null, innerView);
    }

    return _react.default.createElement(_View.default, {
      pointerEvents: "box-none",
      style: styles.appContainer
    }, innerView);
  };

  return AppContainer;
}(_react.Component);

exports.default = AppContainer;
AppContainer.childContextTypes = {
  rootTag: _propTypes.any
};
AppContainer.propTypes = {
  WrapperComponent: _propTypes.any,
  children: _propTypes.node,
  rootTag: _propTypes.any.isRequired
};

var styles = _StyleSheet.default.create({
  appContainer: {
    flex: 1
  }
});