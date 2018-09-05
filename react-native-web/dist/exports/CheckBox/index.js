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

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _UIManager = _interopRequireDefault(require("../UIManager"));

var _View = _interopRequireDefault(require("../View"));

var _ViewPropTypes = _interopRequireDefault(require("../ViewPropTypes"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = require("prop-types");

/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var CheckBox =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(CheckBox, _Component);

  function CheckBox() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._handleChange = function (event) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          onValueChange = _this$props.onValueChange;
      var value = event.nativeEvent.target.checked;
      event.nativeEvent.value = value;
      onChange && onChange(event);
      onValueChange && onValueChange(value);
    };

    _this._setCheckboxRef = function (element) {
      _this._checkboxElement = element;
    };

    return _this;
  }

  var _proto = CheckBox.prototype;

  _proto.blur = function blur() {
    _UIManager.default.blur(this._checkboxElement);
  };

  _proto.focus = function focus() {
    _UIManager.default.focus(this._checkboxElement);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        color = _this$props2.color,
        disabled = _this$props2.disabled,
        onChange = _this$props2.onChange,
        onValueChange = _this$props2.onValueChange,
        style = _this$props2.style,
        value = _this$props2.value,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["color", "disabled", "onChange", "onValueChange", "style", "value"]);

    var fakeControl = _react.default.createElement(_View.default, {
      style: [styles.fakeControl, value && styles.fakeControlChecked, // custom color
      value && color && {
        backgroundColor: color,
        borderColor: color
      }, disabled && styles.fakeControlDisabled, value && disabled && styles.fakeControlCheckedAndDisabled]
    });

    var nativeControl = (0, _createElement.default)('input', {
      checked: value,
      disabled: disabled,
      onChange: this._handleChange,
      ref: this._setCheckboxRef,
      style: [styles.nativeControl, styles.cursorInherit],
      type: 'checkbox'
    });
    return _react.default.createElement(_View.default, (0, _extends2.default)({}, other, {
      style: [styles.root, style, disabled && styles.cursorDefault]
    }), fakeControl, nativeControl);
  };

  return CheckBox;
}(_react.Component);

CheckBox.displayName = 'CheckBox';
CheckBox.propTypes = (0, _extends2.default)({}, _ViewPropTypes.default, {
  color: _ColorPropType.default,
  disabled: _propTypes.bool,
  onChange: _propTypes.func,
  onValueChange: _propTypes.func,
  value: _propTypes.bool
});
CheckBox.defaultProps = {
  disabled: false,
  value: false
};

var styles = _StyleSheet.default.create({
  root: {
    cursor: 'pointer',
    height: 16,
    userSelect: 'none',
    width: 16
  },
  cursorDefault: {
    cursor: 'default'
  },
  cursorInherit: {
    cursor: 'inherit'
  },
  fakeControl: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#657786',
    borderRadius: 2,
    borderStyle: 'solid',
    borderWidth: 2,
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  },
  fakeControlChecked: {
    backgroundColor: '#009688',
    backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgdmVyc2lvbj0iMS4xIgogICB2aWV3Qm94PSIwIDAgMSAxIgogICBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0Ij4KICA8cGF0aAogICAgIGQ9Ik0gMC4wNDAzODA1OSwwLjYyNjc3NjcgMC4xNDY0NDY2MSwwLjUyMDcxMDY4IDAuNDI5Mjg5MzIsMC44MDM1NTMzOSAwLjMyMzIyMzMsMC45MDk2MTk0MSB6IE0gMC4yMTcxNTcyOSwwLjgwMzU1MzM5IDAuODUzNTUzMzksMC4xNjcxNTcyOSAwLjk1OTYxOTQxLDAuMjczMjIzMyAwLjMyMzIyMzMsMC45MDk2MTk0MSB6IgogICAgIGlkPSJyZWN0Mzc4MCIKICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lIiAvPgo8L3N2Zz4K")',
    backgroundRepeat: 'no-repeat',
    borderColor: '#009688'
  },
  fakeControlDisabled: {
    borderColor: '#CCD6DD'
  },
  fakeControlCheckedAndDisabled: {
    backgroundColor: '#AAB8C2',
    borderColor: '#AAB8C2'
  },
  nativeControl: (0, _extends2.default)({}, _StyleSheet.default.absoluteFillObject, {
    height: '100%',
    margin: 0,
    opacity: 0,
    padding: 0,
    width: '100%'
  })
});

var _default = (0, _applyNativeMethods.default)(CheckBox);

exports.default = _default;