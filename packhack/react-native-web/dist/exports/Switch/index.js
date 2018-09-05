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

var _createElement = _interopRequireDefault(require("../createElement"));

var _multiplyStyleLengthValue = _interopRequireDefault(require("../../modules/multiplyStyleLengthValue"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _UIManager = _interopRequireDefault(require("../UIManager"));

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
var emptyObject = {};
var thumbDefaultBoxShadow = '0px 1px 3px rgba(0,0,0,0.5)';
var thumbFocusedBoxShadow = thumbDefaultBoxShadow + ", 0 0 0 10px rgba(0,0,0,0.1)";

var Switch =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Switch, _Component);

  function Switch() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._handleChange = function (event) {
      var onValueChange = _this.props.onValueChange;
      onValueChange && onValueChange(event.nativeEvent.target.checked);
    };

    _this._handleFocusState = function (event) {
      var isFocused = event.nativeEvent.type === 'focus';
      var boxShadow = isFocused ? thumbFocusedBoxShadow : thumbDefaultBoxShadow;

      if (_this._thumbElement) {
        _this._thumbElement.setNativeProps({
          style: {
            boxShadow: boxShadow
          }
        });
      }
    };

    _this._setCheckboxRef = function (element) {
      _this._checkboxElement = element;
    };

    _this._setThumbRef = function (element) {
      _this._thumbElement = element;
    };

    return _this;
  }

  var _proto = Switch.prototype;

  _proto.blur = function blur() {
    _UIManager.default.blur(this._checkboxElement);
  };

  _proto.focus = function focus() {
    _UIManager.default.focus(this._checkboxElement);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        activeThumbColor = _this$props.activeThumbColor,
        activeTrackColor = _this$props.activeTrackColor,
        disabled = _this$props.disabled,
        onValueChange = _this$props.onValueChange,
        style = _this$props.style,
        thumbColor = _this$props.thumbColor,
        trackColor = _this$props.trackColor,
        value = _this$props.value,
        onTintColor = _this$props.onTintColor,
        thumbTintColor = _this$props.thumbTintColor,
        tintColor = _this$props.tintColor,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["activeThumbColor", "activeTrackColor", "disabled", "onValueChange", "style", "thumbColor", "trackColor", "value", "onTintColor", "thumbTintColor", "tintColor"]);

    var _StyleSheet$flatten = _StyleSheet.default.flatten(style),
        styleHeight = _StyleSheet$flatten.height,
        styleWidth = _StyleSheet$flatten.width;

    var height = styleHeight || 20;
    var minWidth = (0, _multiplyStyleLengthValue.default)(height, 2);
    var width = styleWidth > minWidth ? styleWidth : minWidth;
    var trackBorderRadius = (0, _multiplyStyleLengthValue.default)(height, 0.5);
    var trackCurrentColor = value ? onTintColor || activeTrackColor : tintColor || trackColor;
    var thumbCurrentColor = value ? activeThumbColor : thumbTintColor || thumbColor;
    var thumbHeight = height;
    var thumbWidth = thumbHeight;
    var rootStyle = [styles.root, style, {
      height: height,
      width: width
    }, disabled && styles.cursorDefault];
    var trackStyle = [styles.track, {
      backgroundColor: trackCurrentColor,
      borderRadius: trackBorderRadius
    }, disabled && styles.disabledTrack];
    var thumbStyle = [styles.thumb, {
      backgroundColor: thumbCurrentColor,
      height: thumbHeight,
      width: thumbWidth
    }, disabled && styles.disabledThumb];
    var nativeControl = (0, _createElement.default)('input', {
      checked: value,
      disabled: disabled,
      onBlur: this._handleFocusState,
      onChange: this._handleChange,
      onFocus: this._handleFocusState,
      ref: this._setCheckboxRef,
      style: [styles.nativeControl, styles.cursorInherit],
      type: 'checkbox'
    });
    return _react.default.createElement(_View.default, (0, _extends2.default)({}, other, {
      style: rootStyle
    }), _react.default.createElement(_View.default, {
      style: trackStyle
    }), _react.default.createElement(_View.default, {
      ref: this._setThumbRef,
      style: [thumbStyle, value && styles.thumbOn, {
        marginStart: value ? (0, _multiplyStyleLengthValue.default)(thumbWidth, -1) : 0
      }]
    }), nativeControl);
  };

  return Switch;
}(_react.Component);

Switch.displayName = 'Switch';
Switch.propTypes = (0, _extends2.default)({}, _ViewPropTypes.default, {
  activeThumbColor: _ColorPropType.default,
  activeTrackColor: _ColorPropType.default,
  disabled: _propTypes.bool,
  onValueChange: _propTypes.func,
  thumbColor: _ColorPropType.default,
  trackColor: _ColorPropType.default,
  value: _propTypes.bool,

  /* eslint-disable react/sort-prop-types */
  // Equivalent of 'activeTrackColor'
  onTintColor: _ColorPropType.default,
  // Equivalent of 'thumbColor'
  thumbTintColor: _ColorPropType.default,
  // Equivalent of 'trackColor'
  tintColor: _ColorPropType.default
});
Switch.defaultProps = {
  activeThumbColor: '#009688',
  activeTrackColor: '#A3D3CF',
  disabled: false,
  style: emptyObject,
  thumbColor: '#FAFAFA',
  trackColor: '#939393',
  value: false
};

var styles = _StyleSheet.default.create({
  root: {
    cursor: 'pointer',
    userSelect: 'none'
  },
  cursorDefault: {
    cursor: 'default'
  },
  cursorInherit: {
    cursor: 'inherit'
  },
  track: (0, _extends2.default)({}, _StyleSheet.default.absoluteFillObject, {
    height: '70%',
    margin: 'auto',
    transitionDuration: '0.1s',
    width: '100%'
  }),
  disabledTrack: {
    backgroundColor: '#D5D5D5'
  },
  thumb: {
    alignSelf: 'flex-start',
    borderRadius: '100%',
    boxShadow: thumbDefaultBoxShadow,
    start: '0%',
    transform: [{
      translateZ: 0
    }],
    transitionDuration: '0.1s'
  },
  thumbOn: {
    start: '100%'
  },
  disabledThumb: {
    backgroundColor: '#BDBDBD'
  },
  nativeControl: (0, _extends2.default)({}, _StyleSheet.default.absoluteFillObject, {
    height: '100%',
    margin: 0,
    opacity: 0,
    padding: 0,
    width: '100%'
  })
});

var _default = (0, _applyNativeMethods.default)(Switch);

exports.default = _default;