'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var __DEV__ = process.env.NODE_ENV !== 'production';

function cloneReferencedElement(element, config) {
  var cloneRef = config.ref;
  var originalRef = element.ref;

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  if (originalRef == null || cloneRef == null) {
    return _react.default.cloneElement.apply(_react.default, [element, config].concat(children));
  }

  if (typeof originalRef !== 'function') {
    if (__DEV__) {
      console.warn('Cloning an element with a ref that will be overwritten because it ' + 'is not a function. Use a composable callback-style ref instead. ' + 'Ignoring ref: ' + originalRef);
    }

    return _react.default.cloneElement.apply(_react.default, [element, config].concat(children));
  }

  return _react.default.cloneElement.apply(_react.default, [element, (0, _extends2.default)({}, config, {
    ref: function ref(component) {
      cloneRef(component);
      originalRef(component);
    }
  })].concat(children));
}

var _default = cloneReferencedElement;
exports.default = _default;