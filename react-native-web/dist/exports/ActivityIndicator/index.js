"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _applyNativeMethods = _interopRequireDefault(require("../../modules/applyNativeMethods"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _View = _interopRequireDefault(require("../View"));

var _ViewPropTypes = _interopRequireDefault(require("../ViewPropTypes"));

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
var createSvgCircle = function createSvgCircle(style) {
  return _react.default.createElement("circle", {
    cx: "16",
    cy: "16",
    fill: "none",
    r: "14",
    strokeWidth: "4",
    style: style
  });
};

var ActivityIndicator =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(ActivityIndicator, _Component);

  function ActivityIndicator() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ActivityIndicator.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        animating = _this$props.animating,
        color = _this$props.color,
        hidesWhenStopped = _this$props.hidesWhenStopped,
        size = _this$props.size,
        style = _this$props.style,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["animating", "color", "hidesWhenStopped", "size", "style"]);

    var svg = _react.default.createElement("svg", {
      height: "100%",
      viewBox: "0 0 32 32",
      width: "100%"
    }, createSvgCircle({
      stroke: color,
      opacity: 0.2
    }), createSvgCircle({
      stroke: color,
      strokeDasharray: 80,
      strokeDashoffset: 60
    }));

    return _react.default.createElement(_View.default, (0, _extends2.default)({}, other, {
      accessibilityRole: "progressbar",
      "aria-valuemax": "1",
      "aria-valuemin": "0",
      style: [styles.container, style]
    }), _react.default.createElement(_View.default, {
      children: svg,
      style: [typeof size === 'number' ? {
        height: size,
        width: size
      } : indicatorSizes[size], styles.animation, !animating && styles.animationPause, !animating && hidesWhenStopped && styles.hidesWhenStopped]
    }));
  };

  return ActivityIndicator;
}(_react.Component);

ActivityIndicator.displayName = 'ActivityIndicator';
ActivityIndicator.propTypes = (0, _extends2.default)({}, _ViewPropTypes.default, {
  animating: _propTypes.bool,
  color: _propTypes.string,
  hidesWhenStopped: _propTypes.bool,
  size: (0, _propTypes.oneOfType)([(0, _propTypes.oneOf)(['small', 'large']), _propTypes.number])
});
ActivityIndicator.defaultProps = {
  animating: true,
  color: '#1976D2',
  hidesWhenStopped: true,
  size: 'small'
};

var styles = _StyleSheet.default.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  hidesWhenStopped: {
    visibility: 'hidden'
  },
  animation: {
    animationDuration: '0.75s',
    animationName: [{
      '0%': {
        transform: [{
          rotate: '0deg'
        }]
      },
      '100%': {
        transform: [{
          rotate: '360deg'
        }]
      }
    }],
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite'
  },
  animationPause: {
    animationPlayState: 'paused'
  }
});

var indicatorSizes = _StyleSheet.default.create({
  small: {
    width: 20,
    height: 20
  },
  large: {
    width: 36,
    height: 36
  }
});

var _default = (0, _applyNativeMethods.default)(ActivityIndicator);

exports.default = _default;