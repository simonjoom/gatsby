"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _dangerousStyleValue = _interopRequireDefault(require("../dangerousStyleValue"));

var _hyphenateStyleName = _interopRequireDefault(require("hyphenate-style-name"));

var _warnValidStyle = _interopRequireDefault(require("../warnValidStyle"));

/* eslint-disable */

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Based on React 16.3.0
 */

/**
 * Sets the value for multiple styles on a node.  If a value is specified as
 * '' (empty string), the corresponding style property will be unset.
 *
 * @param {DOMElement} node
 * @param {object} styles
 */
function setValueForStyles(node, styles, getStack) {
  var style = node.style;

  for (var styleName in styles) {
    if (!styles.hasOwnProperty(styleName)) {
      continue;
    }

    var isCustomProperty = styleName.indexOf('--') === 0;
    var isImportant = typeof styles[styleName] === 'string' && styles[styleName].indexOf('!important') > -1;

    if (process.env.NODE_ENV !== 'production') {
      if (!isCustomProperty) {
        (0, _warnValidStyle.default)(styleName, styles[styleName], getStack);
      }
    }

    var styleValue = (0, _dangerousStyleValue.default)(styleName, styles[styleName], isCustomProperty);

    if (styleName === 'float') {
      styleName = 'cssFloat';
    }

    if (isCustomProperty || isImportant) {
      var name = isCustomProperty ? styleName : (0, _hyphenateStyleName.default)(styleName);

      if (isImportant) {
        var _styleValue$split = styleValue.split('!'),
            value = _styleValue$split[0],
            priority = _styleValue$split[1];

        style.setProperty(name, value, priority);
      } else {
        style.setProperty(name, styleValue);
      }
    } else {
      style[styleName] = styleValue;
    }
  }
}

var _default = setValueForStyles;
exports.default = _default;