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
var PointPropType = (0, _createStrictShapeTypeChecker.default)({
  x: _propTypes.number,
  y: _propTypes.number
});
var _default = PointPropType;
exports.default = _default;