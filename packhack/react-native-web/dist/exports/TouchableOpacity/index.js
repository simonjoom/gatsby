"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _applyNativeMethods = _interopRequireDefault(require("../../modules/applyNativeMethods"));

var _createReactClass = _interopRequireDefault(require("create-react-class"));

var _ensurePositiveDelayProps = _interopRequireDefault(require("../Touchable/ensurePositiveDelayProps"));

var _propTypes = require("prop-types");

var _react = _interopRequireDefault(require("react"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _Touchable = _interopRequireDefault(require("../Touchable"));

var _TouchableWithoutFeedback = _interopRequireDefault(require("../TouchableWithoutFeedback"));

var _View = _interopRequireDefault(require("../View"));

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */
var flattenStyle = _StyleSheet.default.flatten;
var PRESS_RETENTION_OFFSET = {
  top: 20,
  left: 20,
  right: 20,
  bottom: 30
};
/**
 * A wrapper for making views respond properly to touches.
 * On press down, the opacity of the wrapped view is decreased, dimming it.
 *
 * Opacity is controlled by wrapping the children in a View, which is
 * added to the view hiearchy. Be aware that this can affect layout.
 *
 * Example:
 *
 * ```
 * renderButton: function() {
 *   return (
 *     <TouchableOpacity onPress={this._onPressButton}>
 *       <Image
 *         style={styles.button}
 *         source={require('./myButton.png')}
 *       />
 *     </TouchableOpacity>
 *   );
 * },
 * ```
 */

/* eslint-disable react/prefer-es6-class */

var TouchableOpacity = (0, _createReactClass.default)({
  displayName: 'TouchableOpacity',
  mixins: [_Touchable.default.Mixin],
  propTypes: (0, _extends2.default)({}, _TouchableWithoutFeedback.default.propTypes, {
    /**
     * Determines what the opacity of the wrapped view should be when touch is
     * active.
     */
    activeOpacity: _propTypes.number,
    focusedOpacity: _propTypes.number
  }),
  getDefaultProps: function getDefaultProps() {
    return {
      activeOpacity: 0.2,
      focusedOpacity: 0.7
    };
  },
  getInitialState: function getInitialState() {
    return this.touchableGetInitialState();
  },
  componentDidMount: function componentDidMount() {
    (0, _ensurePositiveDelayProps.default)(this.props);
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    (0, _ensurePositiveDelayProps.default)(nextProps);
  },

  /**
   * Animate the touchable to a new opacity.
   */
  setOpacityTo: function setOpacityTo(value, duration) {
    this.setNativeProps({
      style: {
        opacity: value,
        transitionDuration: duration ? duration / 1000 + "s" : '0s'
      }
    });
  },

  /**
   * `Touchable.Mixin` self callbacks. The mixin will invoke these if they are
   * defined on your component.
   */
  touchableHandleActivePressIn: function touchableHandleActivePressIn(e) {
    if (e.dispatchConfig.registrationName === 'onResponderGrant') {
      this._opacityActive(0);
    } else {
      this._opacityActive(150);
    }

    this.props.onPressIn && this.props.onPressIn(e);
  },
  touchableHandleActivePressOut: function touchableHandleActivePressOut(e) {
    this._opacityInactive(250);

    this.props.onPressOut && this.props.onPressOut(e);
  },
  touchableHandlePress: function touchableHandlePress(e) {
    this.props.onPress && this.props.onPress(e);
  },
  touchableHandleLongPress: function touchableHandleLongPress(e) {
    this.props.onLongPress && this.props.onLongPress(e);
  },
  touchableGetPressRectOffset: function touchableGetPressRectOffset() {
    return this.props.pressRetentionOffset || PRESS_RETENTION_OFFSET;
  },
  touchableGetHitSlop: function touchableGetHitSlop() {
    return this.props.hitSlop;
  },
  touchableGetHighlightDelayMS: function touchableGetHighlightDelayMS() {
    return this.props.delayPressIn || 0;
  },
  touchableGetLongPressDelayMS: function touchableGetLongPressDelayMS() {
    return this.props.delayLongPress === 0 ? 0 : this.props.delayLongPress || 500;
  },
  touchableGetPressOutDelayMS: function touchableGetPressOutDelayMS() {
    return this.props.delayPressOut;
  },
  _opacityActive: function _opacityActive(duration) {
    this.setOpacityTo(this.props.activeOpacity, duration);
  },
  _opacityInactive: function _opacityInactive(duration) {
    this.setOpacityTo(this._getChildStyleOpacityWithDefault(), duration);
  },
  _opacityFocused: function _opacityFocused() {
    this.setOpacityTo(this.props.focusedOpacity);
  },
  _getChildStyleOpacityWithDefault: function _getChildStyleOpacityWithDefault() {
    var childStyle = flattenStyle(this.props.style) || {};
    return childStyle.opacity === undefined ? 1 : childStyle.opacity;
  },
  render: function render() {
    var _this$props = this.props,
        activeOpacity = _this$props.activeOpacity,
        focusedOpacity = _this$props.focusedOpacity,
        delayLongPress = _this$props.delayLongPress,
        delayPressIn = _this$props.delayPressIn,
        delayPressOut = _this$props.delayPressOut,
        onLongPress = _this$props.onLongPress,
        onPress = _this$props.onPress,
        onPressIn = _this$props.onPressIn,
        onPressOut = _this$props.onPressOut,
        pressRetentionOffset = _this$props.pressRetentionOffset,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["activeOpacity", "focusedOpacity", "delayLongPress", "delayPressIn", "delayPressOut", "onLongPress", "onPress", "onPressIn", "onPressOut", "pressRetentionOffset"]);
    return _react.default.createElement(_View.default, (0, _extends2.default)({}, other, {
      accessible: this.props.accessible !== false,
      onKeyDown: this.touchableHandleKeyEvent,
      onKeyUp: this.touchableHandleKeyEvent,
      onResponderGrant: this.touchableHandleResponderGrant,
      onResponderMove: this.touchableHandleResponderMove,
      onResponderRelease: this.touchableHandleResponderRelease,
      onResponderTerminate: this.touchableHandleResponderTerminate,
      onResponderTerminationRequest: this.touchableHandleResponderTerminationRequest,
      onStartShouldSetResponder: this.touchableHandleStartShouldSetResponder,
      style: [styles.root, !this.props.disabled && styles.actionable, this.props.style]
    }), this.props.children, _Touchable.default.renderDebugView({
      color: 'blue',
      hitSlop: this.props.hitSlop
    }));
  }
});

var styles = _StyleSheet.default.create({
  root: {
    transitionProperty: 'opacity',
    transitionDuration: '0.15s',
    userSelect: 'none'
  },
  actionable: {
    cursor: 'pointer',
    touchAction: 'manipulation'
  }
});

var _default = (0, _applyNativeMethods.default)(TouchableOpacity);

exports.default = _default;