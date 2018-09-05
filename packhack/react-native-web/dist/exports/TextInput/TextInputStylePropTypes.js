"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _TextStylePropTypes = _interopRequireDefault(require("../Text/TextStylePropTypes"));

var _propTypes = require("prop-types");

/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var TextInputStylePropTypes = (0, _extends2.default)({}, _TextStylePropTypes.default, {
  /* @platform web */
  resize: (0, _propTypes.oneOf)(['none', 'vertical', 'horizontal', 'both'])
});
var _default = TextInputStylePropTypes;
exports.default = _default;