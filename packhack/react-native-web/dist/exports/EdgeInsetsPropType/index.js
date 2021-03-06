"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _createStrictShapeTypeChecker = _interopRequireDefault(require("../../modules/createStrictShapeTypeChecker"));

var _propTypes = require("prop-types");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var EdgeInsetsPropType = (0, _createStrictShapeTypeChecker.default)({
  top: _propTypes.number,
  left: _propTypes.number,
  bottom: _propTypes.number,
  right: _propTypes.number
});
var _default = EdgeInsetsPropType;
exports.default = _default;