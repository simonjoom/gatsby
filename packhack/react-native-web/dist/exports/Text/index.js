"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _applyLayout = _interopRequireDefault(require("../../modules/applyLayout"));

var _applyNativeMethods = _interopRequireDefault(require("../../modules/applyNativeMethods"));

var _propTypes = require("prop-types");

var _react = require("react");

var _createElement = _interopRequireDefault(require("../createElement"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _TextPropTypes = _interopRequireDefault(require("./TextPropTypes"));

/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var Text =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Text, _Component);

  function Text() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Text.prototype;

  _proto.getChildContext = function getChildContext() {
    return {
      isInAParentText: true
    };
  };

  _proto.render = function render() {
    var _this$props = this.props,
        dir = _this$props.dir,
        numberOfLines = _this$props.numberOfLines,
        onPress = _this$props.onPress,
        selectable = _this$props.selectable,
        style = _this$props.style,
        adjustsFontSizeToFit = _this$props.adjustsFontSizeToFit,
        allowFontScaling = _this$props.allowFontScaling,
        ellipsizeMode = _this$props.ellipsizeMode,
        lineBreakMode = _this$props.lineBreakMode,
        minimumFontScale = _this$props.minimumFontScale,
        onLayout = _this$props.onLayout,
        onLongPress = _this$props.onLongPress,
        pressRetentionOffset = _this$props.pressRetentionOffset,
        selectionColor = _this$props.selectionColor,
        suppressHighlighting = _this$props.suppressHighlighting,
        textBreakStrategy = _this$props.textBreakStrategy,
        tvParallaxProperties = _this$props.tvParallaxProperties,
        otherProps = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["dir", "numberOfLines", "onPress", "selectable", "style", "adjustsFontSizeToFit", "allowFontScaling", "ellipsizeMode", "lineBreakMode", "minimumFontScale", "onLayout", "onLongPress", "pressRetentionOffset", "selectionColor", "suppressHighlighting", "textBreakStrategy", "tvParallaxProperties"]);
    var isInAParentText = this.context.isInAParentText;

    if (onPress) {
      otherProps.accessible = true;
      otherProps.onClick = this._createPressHandler(onPress);
      otherProps.onKeyDown = this._createEnterHandler(onPress);
    } // allow browsers to automatically infer the language writing direction


    otherProps.dir = dir !== undefined ? dir : 'auto';
    otherProps.style = [styles.initial, this.context.isInAParentText === true && styles.isInAParentText, style, selectable === false && styles.notSelectable, numberOfLines === 1 && styles.singleLineStyle, onPress && styles.pressable];
    var component = isInAParentText ? 'span' : 'div';
    return (0, _createElement.default)(component, otherProps);
  };

  _proto._createEnterHandler = function _createEnterHandler(fn) {
    return function (e) {
      if (e.keyCode === 13) {
        fn && fn(e);
      }
    };
  };

  _proto._createPressHandler = function _createPressHandler(fn) {
    return function (e) {
      e.stopPropagation();
      fn && fn(e);
    };
  };

  return Text;
}(_react.Component);

Text.displayName = 'Text';
Text.propTypes = _TextPropTypes.default;
Text.childContextTypes = {
  isInAParentText: _propTypes.bool
};
Text.contextTypes = {
  isInAParentText: _propTypes.bool
};

var styles = _StyleSheet.default.create({
  initial: {
    borderWidth: 0,
    boxSizing: 'border-box',
    color: 'inherit',
    display: 'inline',
    fontFamily: 'System',
    fontSize: 14,
    fontStyle: 'inherit',
    fontVariant: ['inherit'],
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    margin: 0,
    padding: 0,
    textDecorationLine: 'none',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  },
  isInAParentText: {
    // inherit parent font styles
    fontFamily: 'inherit',
    fontSize: 'inherit',
    whiteSpace: 'inherit'
  },
  notSelectable: {
    userSelect: 'none'
  },
  pressable: {
    cursor: 'pointer'
  },
  singleLineStyle: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

var _default = (0, _applyLayout.default)((0, _applyNativeMethods.default)(Text));

exports.default = _default;