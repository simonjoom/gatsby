"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _applyLayout = _interopRequireDefault(require("../../modules/applyLayout"));

var _applyNativeMethods = _interopRequireDefault(require("../../modules/applyNativeMethods"));

var _propTypes = require("prop-types");

var _createElement = _interopRequireDefault(require("../createElement"));

var _filterSupportedProps = _interopRequireDefault(require("./filterSupportedProps"));

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _ViewPropTypes = _interopRequireDefault(require("./ViewPropTypes"));

var _react = _interopRequireWildcard(require("react"));

/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * 
 */
var calculateHitSlopStyle = function calculateHitSlopStyle(hitSlop) {
  var hitStyle = {};

  for (var prop in hitSlop) {
    if (hitSlop.hasOwnProperty(prop)) {
      var value = hitSlop[prop];
      hitStyle[prop] = value > 0 ? -1 * value : 0;
    }
  }

  return hitStyle;
};

var View =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(View, _Component);

  function View() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = View.prototype;

  _proto.render = function render() {
    var hitSlop = this.props.hitSlop;
    var supportedProps = (0, _filterSupportedProps.default)(this.props);

    if (process.env.NODE_ENV !== 'production') {
      _react.default.Children.toArray(this.props.children).forEach(function (item) {
        (0, _invariant.default)(typeof item !== 'string', "Unexpected text node: " + item + ". A text node cannot be a child of a <View>.");
      });
    }

    var isInAParentText = this.context.isInAParentText;
    supportedProps.style = _StyleSheet.default.compose(styles.initial, _StyleSheet.default.compose(isInAParentText && styles.inline, this.props.style));

    if (hitSlop) {
      var hitSlopStyle = calculateHitSlopStyle(hitSlop);
      var hitSlopChild = (0, _createElement.default)('span', {
        style: [styles.hitSlop, hitSlopStyle]
      });
      supportedProps.children = _react.default.Children.toArray([hitSlopChild, supportedProps.children]);
    }

    return (0, _createElement.default)('div', supportedProps);
  };

  return View;
}(_react.Component);

View.displayName = 'View';
View.contextTypes = {
  isInAParentText: _propTypes.bool
};
View.propTypes = _ViewPropTypes.default;

var styles = _StyleSheet.default.create({
  // https://github.com/facebook/css-layout#default-values
  initial: {
    alignItems: 'stretch',
    borderWidth: 0,
    borderStyle: 'solid',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    position: 'relative',
    zIndex: 0,
    // fix flexbox bugs
    minHeight: 0,
    minWidth: 0
  },
  inline: {
    display: 'inline-flex'
  },
  // this zIndex-ordering positions the hitSlop above the View but behind
  // its children
  hitSlop: (0, _extends2.default)({}, _StyleSheet.default.absoluteFillObject, {
    zIndex: -1
  })
});

var _default = (0, _applyLayout.default)((0, _applyNativeMethods.default)(View));

exports.default = _default;