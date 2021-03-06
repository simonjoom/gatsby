"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ImageStylePropTypes = _interopRequireDefault(require("../Image/ImageStylePropTypes"));

var _TextInputStylePropTypes = _interopRequireDefault(require("../TextInput/TextInputStylePropTypes"));

var _TextStylePropTypes = _interopRequireDefault(require("../Text/TextStylePropTypes"));

var _ViewStylePropTypes = _interopRequireDefault(require("../View/ViewStylePropTypes"));

var _warning = _interopRequireDefault(require("fbjs/lib/warning"));

var _propTypes = require("prop-types");

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
// Hardcoded because this is a legit case but we don't want to load it from
// a private API. We might likely want to unify style sheet creation with how it
// is done in the DOM so this might move into React. I know what I'm doing so
// plz don't fire me.
var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var StyleSheetValidation =
/*#__PURE__*/
function () {
  function StyleSheetValidation() {}

  StyleSheetValidation.validateStyleProp = function validateStyleProp(prop, style, caller) {
    if (process.env.NODE_ENV !== 'production') {
      var value = style[prop];
      var isCustomProperty = prop.indexOf('--') === 0;
      if (isCustomProperty) return;

      if (allStylePropTypes[prop] === undefined) {
        var message1 = '"' + prop + '" is not a valid style property.';
        var message2 = '\nValid style props: ' + JSON.stringify(Object.keys(allStylePropTypes).sort(), null, '  ');
        styleError(message1, style, caller, message2);
      } else if (typeof value === 'string' && value.indexOf('!important') > -1) {
        styleError("Invalid value of \"" + value + "\" set on prop \"" + prop + "\". Values cannot include \"!important\"", style, caller);
      } else {
        var error = allStylePropTypes[prop](style, prop, caller, 'prop', null, ReactPropTypesSecret);

        if (error) {
          styleError(error.message, style, caller);
        }
      }
    }
  };

  StyleSheetValidation.validateStyle = function validateStyle(name, styles) {
    if (process.env.NODE_ENV !== 'production') {
      for (var prop in styles[name]) {
        StyleSheetValidation.validateStyleProp(prop, styles[name], 'StyleSheet ' + name);
      }
    }
  };

  StyleSheetValidation.addValidStylePropTypes = function addValidStylePropTypes(stylePropTypes) {
    for (var key in stylePropTypes) {
      allStylePropTypes[key] = stylePropTypes[key];
    }
  };

  return StyleSheetValidation;
}();

var styleError = function styleError(message1, style, caller, message2) {
  (0, _warning.default)(false, message1 + '\n' + (caller || '<<unknown>>') + ': ' + JSON.stringify(style, null, '  ') + (message2 || ''));
};

var allStylePropTypes = {};
StyleSheetValidation.addValidStylePropTypes(_ImageStylePropTypes.default);
StyleSheetValidation.addValidStylePropTypes(_TextStylePropTypes.default);
StyleSheetValidation.addValidStylePropTypes(_TextInputStylePropTypes.default);
StyleSheetValidation.addValidStylePropTypes(_ViewStylePropTypes.default);
StyleSheetValidation.addValidStylePropTypes({
  appearance: _propTypes.string,
  borderCollapse: _propTypes.string,
  borderSpacing: (0, _propTypes.oneOf)([_propTypes.number, _propTypes.string]),
  clear: _propTypes.string,
  cursor: _propTypes.string,
  fill: _propTypes.string,
  float: (0, _propTypes.oneOf)(['end', 'left', 'none', 'right', 'start']),
  listStyle: _propTypes.string,
  pointerEvents: _propTypes.string,
  tableLayout: _propTypes.string,

  /* @private */
  MozAppearance: _propTypes.string,
  WebkitAppearance: _propTypes.string
});
var _default = StyleSheetValidation;
exports.default = _default;