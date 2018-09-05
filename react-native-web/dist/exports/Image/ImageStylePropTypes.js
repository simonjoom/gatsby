"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _AnimationPropTypes = _interopRequireDefault(require("../../modules/AnimationPropTypes"));

var _BorderPropTypes = _interopRequireDefault(require("../../modules/BorderPropTypes"));

var _ColorPropType = _interopRequireDefault(require("../ColorPropType"));

var _ImageResizeMode = _interopRequireDefault(require("./ImageResizeMode"));

var _InteractionPropTypes = _interopRequireDefault(require("../../modules/InteractionPropTypes"));

var _LayoutPropTypes = _interopRequireDefault(require("../../modules/LayoutPropTypes"));

var _ShadowPropTypes = _interopRequireDefault(require("../../modules/ShadowPropTypes"));

var _TransformPropTypes = _interopRequireDefault(require("../../modules/TransformPropTypes"));

var _propTypes = require("prop-types");

var ImageStylePropTypes = (0, _extends2.default)({}, _AnimationPropTypes.default, _BorderPropTypes.default, _InteractionPropTypes.default, _LayoutPropTypes.default, _ShadowPropTypes.default, _TransformPropTypes.default, {
  backgroundColor: _ColorPropType.default,
  opacity: _propTypes.number,
  resizeMode: (0, _propTypes.oneOf)(Object.keys(_ImageResizeMode.default)),
  tintColor: _ColorPropType.default,

  /**
   * @platform unsupported
   */
  overlayColor: _propTypes.string,

  /**
   * @platform web
   */
  boxShadow: _propTypes.string,
  filter: _propTypes.string
});
var _default = ImageStylePropTypes;
exports.default = _default;