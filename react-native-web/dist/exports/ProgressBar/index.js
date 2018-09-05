"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _applyNativeMethods = _interopRequireDefault(require("../../modules/applyNativeMethods"));

var _ColorPropType = _interopRequireDefault(require("../ColorPropType"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _View = _interopRequireDefault(require("../View"));

var _ViewPropTypes = _interopRequireDefault(require("../ViewPropTypes"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = require("prop-types");

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var ProgressBar =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(ProgressBar, _Component);

  function ProgressBar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._setProgressRef = function (element) {
      _this._progressElement = element;
    };

    _this._updateProgressWidth = function () {
      var _this$props = _this.props,
          indeterminate = _this$props.indeterminate,
          progress = _this$props.progress;
      var percentageProgress = indeterminate ? 50 : progress * 100;
      var width = indeterminate ? '25%' : percentageProgress + "%";

      if (_this._progressElement) {
        _this._progressElement.setNativeProps({
          style: {
            width: width
          }
        });
      }
    };

    return _this;
  }

  var _proto = ProgressBar.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this._updateProgressWidth();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this._updateProgressWidth();
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        color = _this$props2.color,
        indeterminate = _this$props2.indeterminate,
        progress = _this$props2.progress,
        trackColor = _this$props2.trackColor,
        style = _this$props2.style,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["color", "indeterminate", "progress", "trackColor", "style"]);
    var percentageProgress = progress * 100;
    return _react.default.createElement(_View.default, (0, _extends2.default)({}, other, {
      accessibilityRole: "progressbar",
      "aria-valuemax": "100",
      "aria-valuemin": "0",
      "aria-valuenow": indeterminate ? null : percentageProgress,
      style: [styles.track, style, {
        backgroundColor: trackColor
      }]
    }), _react.default.createElement(_View.default, {
      ref: this._setProgressRef,
      style: [styles.progress, indeterminate && styles.animation, {
        backgroundColor: color
      }]
    }));
  };

  return ProgressBar;
}(_react.Component);

ProgressBar.displayName = 'ProgressBar';
ProgressBar.propTypes = (0, _extends2.default)({}, _ViewPropTypes.default, {
  color: _ColorPropType.default,
  indeterminate: _propTypes.bool,
  progress: _propTypes.number,
  trackColor: _ColorPropType.default
});
ProgressBar.defaultProps = {
  color: '#1976D2',
  indeterminate: false,
  progress: 0,
  trackColor: 'transparent'
};

var styles = _StyleSheet.default.create({
  track: {
    height: 5,
    overflow: 'hidden',
    userSelect: 'none',
    zIndex: 0
  },
  progress: {
    height: '100%',
    zIndex: -1
  },
  animation: {
    animationDuration: '1s',
    animationName: [{
      '0%': {
        transform: [{
          translateX: '-100%'
        }]
      },
      '100%': {
        transform: [{
          translateX: '400%'
        }]
      }
    }],
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite'
  }
});

var _default = (0, _applyNativeMethods.default)(ProgressBar);

exports.default = _default;