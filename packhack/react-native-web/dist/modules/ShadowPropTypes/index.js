"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ColorPropType = _interopRequireDefault(require("../../exports/ColorPropType"));

var _propTypes = require("prop-types");

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var numberOrString = (0, _propTypes.oneOfType)([_propTypes.number, _propTypes.string]);
var ShadowPropTypes = {
  shadowColor: _ColorPropType.default,
  shadowOffset: (0, _propTypes.shape)({
    width: numberOrString,
    height: numberOrString
  }),
  shadowOpacity: _propTypes.number,
  shadowRadius: numberOrString,
  shadowSpread: numberOrString
};
var _default = ShadowPropTypes;
exports.default = _default;