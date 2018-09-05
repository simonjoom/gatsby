"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _applyLayout = _interopRequireDefault(require("../../modules/applyLayout"));

var _applyNativeMethods = _interopRequireDefault(require("../../modules/applyNativeMethods"));

var _ExecutionEnvironment = require("fbjs/lib/ExecutionEnvironment");

var _react = require("react");

var _ColorPropType = _interopRequireDefault(require("../ColorPropType"));

var _createElement = _interopRequireDefault(require("../createElement"));

var _findNodeHandle = _interopRequireDefault(require("../findNodeHandle"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _StyleSheetPropType = _interopRequireDefault(require("../../modules/StyleSheetPropType"));

var _TextInputStylePropTypes = _interopRequireDefault(require("./TextInputStylePropTypes"));

var _TextInputState = _interopRequireDefault(require("../../modules/TextInputState"));

var _ViewPropTypes = _interopRequireDefault(require("../ViewPropTypes"));

var _propTypes = require("prop-types");

/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var isAndroid = _ExecutionEnvironment.canUseDOM && /Android/i.test(navigator && navigator.userAgent);
var emptyObject = {};
/**
 * React Native events differ from W3C events.
 */

var normalizeEventHandler = function normalizeEventHandler(handler) {
  return function (e) {
    if (handler) {
      e.nativeEvent.text = e.target.value;
      return handler(e);
    }
  };
};
/**
 * Determines whether a 'selection' prop differs from a node's existing
 * selection state.
 */


var isSelectionStale = function isSelectionStale(node, selection) {
  if (node && selection) {
    var selectionEnd = node.selectionEnd,
        selectionStart = node.selectionStart;
    var start = selection.start,
        end = selection.end;
    return start !== selectionStart || end !== selectionEnd;
  }

  return false;
};
/**
 * Certain input types do no support 'selectSelectionRange' and will throw an
 * error.
 */


var setSelection = function setSelection(node, selection) {
  try {
    if (isSelectionStale(node, selection)) {
      var start = selection.start,
          end = selection.end; // workaround for Blink on Android: see https://github.com/text-mask/text-mask/issues/300

      if (isAndroid) {
        setTimeout(function () {
          return node.setSelectionRange(start, end || start);
        }, 10);
      } else {
        node.setSelectionRange(start, end || start);
      }
    }
  } catch (e) {}
};

var TextInput =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(TextInput, _Component);

  function TextInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._handleBlur = function (e) {
      var onBlur = _this.props.onBlur;
      _TextInputState.default._currentlyFocusedNode = null;

      if (onBlur) {
        onBlur(e);
      }
    };

    _this._handleChange = function (e) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          onChangeText = _this$props.onChangeText;
      var text = e.nativeEvent.text;

      if (onChange) {
        onChange(e);
      }

      if (onChangeText) {
        onChangeText(text);
      }

      _this._handleSelectionChange(e);
    };

    _this._handleFocus = function (e) {
      var _this$props2 = _this.props,
          clearTextOnFocus = _this$props2.clearTextOnFocus,
          onFocus = _this$props2.onFocus,
          selectTextOnFocus = _this$props2.selectTextOnFocus;
      var node = _this._node;
      _TextInputState.default._currentlyFocusedNode = _this._node;

      if (onFocus) {
        onFocus(e);
      }

      if (clearTextOnFocus) {
        _this.clear();
      }

      if (selectTextOnFocus) {
        node && node.select();
      }
    };

    _this._handleKeyDown = function (e) {
      // Prevent key events bubbling (see #612)
      e.stopPropagation(); // Backspace, Tab, Cmd+Enter, and Arrow keys only fire 'keydown' DOM events

      if (e.which === 8 || e.which === 9 || e.which === 13 && e.metaKey || e.which === 37 || e.which === 38 || e.which === 39 || e.which === 40) {
        _this._handleKeyPress(e);
      }
    };

    _this._handleKeyPress = function (e) {
      var _this$props3 = _this.props,
          blurOnSubmit = _this$props3.blurOnSubmit,
          multiline = _this$props3.multiline,
          onKeyPress = _this$props3.onKeyPress,
          onSubmitEditing = _this$props3.onSubmitEditing;
      var blurOnSubmitDefault = !multiline;
      var shouldBlurOnSubmit = blurOnSubmit == null ? blurOnSubmitDefault : blurOnSubmit;

      if (onKeyPress) {
        var keyValue;

        switch (e.which) {
          case 8:
            keyValue = 'Backspace';
            break;

          case 9:
            keyValue = 'Tab';
            break;

          case 13:
            keyValue = 'Enter';
            break;

          case 32:
            keyValue = ' ';
            break;

          case 37:
            keyValue = 'ArrowLeft';
            break;

          case 38:
            keyValue = 'ArrowUp';
            break;

          case 39:
            keyValue = 'ArrowRight';
            break;

          case 40:
            keyValue = 'ArrowDown';
            break;

          default:
            {
              // Trim to only care about the keys that have a textual representation
              if (e.shiftKey) {
                keyValue = String.fromCharCode(e.which).trim();
              } else {
                keyValue = String.fromCharCode(e.which).toLowerCase().trim();
              }
            }
        }

        if (keyValue) {
          e.nativeEvent = {
            altKey: e.altKey,
            ctrlKey: e.ctrlKey,
            key: keyValue,
            metaKey: e.metaKey,
            shiftKey: e.shiftKey,
            target: e.target
          };
          onKeyPress(e);
        }
      }

      if (!e.isDefaultPrevented() && e.which === 13 && !e.shiftKey) {
        if ((blurOnSubmit || !multiline) && onSubmitEditing) {
          // prevent "Enter" from inserting a newline
          e.preventDefault();
          e.nativeEvent = {
            target: e.target,
            text: e.target.value
          };
          onSubmitEditing(e);
        }

        if (shouldBlurOnSubmit) {
          _this.blur();
        }
      }
    };

    _this._handleSelectionChange = function (e) {
      var _this$props4 = _this.props,
          onSelectionChange = _this$props4.onSelectionChange,
          _this$props4$selectio = _this$props4.selection,
          selection = _this$props4$selectio === void 0 ? emptyObject : _this$props4$selectio;

      if (onSelectionChange) {
        try {
          var node = e.target;

          if (isSelectionStale(node, selection)) {
            var selectionStart = node.selectionStart,
                selectionEnd = node.selectionEnd;
            e.nativeEvent.selection = {
              start: selectionStart,
              end: selectionEnd
            };
            onSelectionChange(e);
          }
        } catch (e) {}
      }
    };

    _this._setNode = function (component) {
      _this._node = (0, _findNodeHandle.default)(component);
    };

    return _this;
  }

  var _proto = TextInput.prototype;

  _proto.clear = function clear() {
    this._node.value = '';
  };

  _proto.isFocused = function isFocused() {
    return _TextInputState.default.currentlyFocusedField() === this._node;
  };

  _proto.componentDidMount = function componentDidMount() {
    setSelection(this._node, this.props.selection);

    if (document.activeElement === this._node) {
      _TextInputState.default._currentlyFocusedNode = this._node;
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    setSelection(this._node, this.props.selection);
  };

  _proto.render = function render() {
    var _this$props5 = this.props,
        autoCorrect = _this$props5.autoCorrect,
        editable = _this$props5.editable,
        keyboardType = _this$props5.keyboardType,
        multiline = _this$props5.multiline,
        numberOfLines = _this$props5.numberOfLines,
        secureTextEntry = _this$props5.secureTextEntry,
        style = _this$props5.style,
        blurOnSubmit = _this$props5.blurOnSubmit,
        clearTextOnFocus = _this$props5.clearTextOnFocus,
        onChangeText = _this$props5.onChangeText,
        onLayout = _this$props5.onLayout,
        onSelectionChange = _this$props5.onSelectionChange,
        onSubmitEditing = _this$props5.onSubmitEditing,
        selection = _this$props5.selection,
        selectTextOnFocus = _this$props5.selectTextOnFocus,
        spellCheck = _this$props5.spellCheck,
        caretHidden = _this$props5.caretHidden,
        clearButtonMode = _this$props5.clearButtonMode,
        dataDetectorTypes = _this$props5.dataDetectorTypes,
        disableFullscreenUI = _this$props5.disableFullscreenUI,
        enablesReturnKeyAutomatically = _this$props5.enablesReturnKeyAutomatically,
        inlineImageLeft = _this$props5.inlineImageLeft,
        inlineImagePadding = _this$props5.inlineImagePadding,
        keyboardAppearance = _this$props5.keyboardAppearance,
        onContentSizeChange = _this$props5.onContentSizeChange,
        onEndEditing = _this$props5.onEndEditing,
        onScroll = _this$props5.onScroll,
        returnKeyLabel = _this$props5.returnKeyLabel,
        returnKeyType = _this$props5.returnKeyType,
        selectionColor = _this$props5.selectionColor,
        selectionState = _this$props5.selectionState,
        textBreakStrategy = _this$props5.textBreakStrategy,
        underlineColorAndroid = _this$props5.underlineColorAndroid,
        otherProps = (0, _objectWithoutPropertiesLoose2.default)(_this$props5, ["autoCorrect", "editable", "keyboardType", "multiline", "numberOfLines", "secureTextEntry", "style", "blurOnSubmit", "clearTextOnFocus", "onChangeText", "onLayout", "onSelectionChange", "onSubmitEditing", "selection", "selectTextOnFocus", "spellCheck", "caretHidden", "clearButtonMode", "dataDetectorTypes", "disableFullscreenUI", "enablesReturnKeyAutomatically", "inlineImageLeft", "inlineImagePadding", "keyboardAppearance", "onContentSizeChange", "onEndEditing", "onScroll", "returnKeyLabel", "returnKeyType", "selectionColor", "selectionState", "textBreakStrategy", "underlineColorAndroid"]);
    var type;

    switch (keyboardType) {
      case 'email-address':
        type = 'email';
        break;

      case 'number-pad':
      case 'numeric':
        type = 'number';
        break;

      case 'phone-pad':
        type = 'tel';
        break;

      case 'search':
      case 'web-search':
        type = 'search';
        break;

      case 'url':
        type = 'url';
        break;

      default:
        type = 'text';
    }

    if (secureTextEntry) {
      type = 'password';
    }

    var component = multiline ? 'textarea' : 'input';
    Object.assign(otherProps, {
      autoCorrect: autoCorrect ? 'on' : 'off',
      dir: 'auto',
      onBlur: normalizeEventHandler(this._handleBlur),
      onChange: normalizeEventHandler(this._handleChange),
      onFocus: normalizeEventHandler(this._handleFocus),
      onKeyDown: this._handleKeyDown,
      onKeyPress: this._handleKeyPress,
      onSelect: normalizeEventHandler(this._handleSelectionChange),
      readOnly: !editable,
      ref: this._setNode,
      spellCheck: spellCheck != null ? spellCheck : autoCorrect,
      style: [styles.initial, style]
    });

    if (multiline) {
      otherProps.rows = numberOfLines;
    } else {
      otherProps.type = type;
    }

    return (0, _createElement.default)(component, otherProps);
  };

  return TextInput;
}(_react.Component);

TextInput.displayName = 'TextInput';
TextInput.propTypes = (0, _extends2.default)({}, _ViewPropTypes.default, {
  autoCapitalize: (0, _propTypes.oneOf)(['characters', 'none', 'sentences', 'words']),
  autoComplete: _propTypes.string,
  autoCorrect: _propTypes.bool,
  autoFocus: _propTypes.bool,
  blurOnSubmit: _propTypes.bool,
  clearTextOnFocus: _propTypes.bool,
  defaultValue: _propTypes.string,
  editable: _propTypes.bool,
  keyboardType: (0, _propTypes.oneOf)(['default', 'email-address', 'number-pad', 'numbers-and-punctuation', 'numeric', 'phone-pad', 'search', 'url', 'web-search']),
  maxLength: _propTypes.number,
  multiline: _propTypes.bool,
  numberOfLines: _propTypes.number,
  onBlur: _propTypes.func,
  onChange: _propTypes.func,
  onChangeText: _propTypes.func,
  onFocus: _propTypes.func,
  onKeyPress: _propTypes.func,
  onSelectionChange: _propTypes.func,
  onSubmitEditing: _propTypes.func,
  placeholder: _propTypes.string,
  placeholderTextColor: _ColorPropType.default,
  secureTextEntry: _propTypes.bool,
  selectTextOnFocus: _propTypes.bool,
  selection: (0, _propTypes.shape)({
    start: _propTypes.number.isRequired,
    end: _propTypes.number
  }),
  spellCheck: _propTypes.bool,
  style: (0, _StyleSheetPropType.default)(_TextInputStylePropTypes.default),
  value: _propTypes.string,

  /* react-native compat */

  /* eslint-disable */
  caretHidden: _propTypes.bool,
  clearButtonMode: _propTypes.string,
  dataDetectorTypes: _propTypes.string,
  disableFullscreenUI: _propTypes.bool,
  enablesReturnKeyAutomatically: _propTypes.bool,
  keyboardAppearance: _propTypes.string,
  inlineImageLeft: _propTypes.string,
  inlineImagePadding: _propTypes.number,
  onContentSizeChange: _propTypes.func,
  onEndEditing: _propTypes.func,
  onScroll: _propTypes.func,
  returnKeyLabel: _propTypes.string,
  returnKeyType: _propTypes.string,
  selectionColor: _ColorPropType.default,
  selectionState: _propTypes.any,
  textBreakStrategy: _propTypes.string,
  underlineColorAndroid: _ColorPropType.default
  /* eslint-enable */

});
TextInput.defaultProps = {
  autoCapitalize: 'sentences',
  autoComplete: 'on',
  autoCorrect: true,
  editable: true,
  keyboardType: 'default',
  multiline: false,
  numberOfLines: 2,
  secureTextEntry: false,
  style: emptyObject
};
TextInput.State = _TextInputState.default;

var styles = _StyleSheet.default.create({
  initial: {
    MozAppearance: 'textfield',
    WebkitAppearance: 'none',
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderRadius: 0,
    borderStyle: 'solid',
    borderWidth: 0,
    boxSizing: 'border-box',
    fontFamily: 'System',
    fontSize: 14,
    padding: 0,
    resize: 'none'
  }
});

var _default = (0, _applyLayout.default)((0, _applyNativeMethods.default)(TextInput));

exports.default = _default;