"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _AnimationPropTypes = _interopRequireDefault(require("../../modules/AnimationPropTypes"));

var _BorderPropTypes = _interopRequireDefault(require("../../modules/BorderPropTypes"));

var _ColorPropType = _interopRequireDefault(require("../ColorPropType"));

var _InteractionPropTypes = _interopRequireDefault(require("../../modules/InteractionPropTypes"));

var _LayoutPropTypes = _interopRequireDefault(require("../../modules/LayoutPropTypes"));

var _ShadowPropTypes = _interopRequireDefault(require("../../modules/ShadowPropTypes"));

var _TransformPropTypes = _interopRequireDefault(require("../../modules/TransformPropTypes"));

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
var overscrollBehaviorType = (0, _propTypes.oneOf)(['auto', 'contain', 'none']);
var ViewStylePropTypes = (0, _extends2.default)({}, _AnimationPropTypes.default, _BorderPropTypes.default, _InteractionPropTypes.default, _LayoutPropTypes.default, _ShadowPropTypes.default, _TransformPropTypes.default, {
  backgroundColor: _ColorPropType.default,
  opacity: _propTypes.number,

  /**
   * @platform unsupported
   */
  elevation: _propTypes.number,

  /**
   * @platform web
   */
  backgroundAttachment: _propTypes.string,
  backgroundBlendMode: _propTypes.string,
  backgroundClip: _propTypes.string,
  backgroundImage: _propTypes.string,
  backgroundOrigin: (0, _propTypes.oneOf)(['border-box', 'content-box', 'padding-box']),
  backgroundPosition: _propTypes.string,
  backgroundRepeat: _propTypes.string,
  backgroundSize: _propTypes.string,
  boxShadow: _propTypes.string,
  clip: _propTypes.string,
  filter: _propTypes.string,
  outline: _propTypes.string,
  outlineColor: _ColorPropType.default,
  overscrollBehavior: overscrollBehaviorType,
  overscrollBehaviorX: overscrollBehaviorType,
  overscrollBehaviorY: overscrollBehaviorType,
  WebkitMaskImage: _propTypes.string,
  WebkitOverflowScrolling: (0, _propTypes.oneOf)(['auto', 'touch'])
});
var _default = ViewStylePropTypes;
exports.default = _default;