"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _EdgeInsetsPropType = _interopRequireDefault(require("../EdgeInsetsPropType"));

var _StyleSheetPropType = _interopRequireDefault(require("../../modules/StyleSheetPropType"));

var _ViewStylePropTypes = _interopRequireDefault(require("./ViewStylePropTypes"));

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
var stylePropType = (0, _StyleSheetPropType.default)(_ViewStylePropTypes.default);
var ViewPropTypes = {
  accessibilityComponentType: _propTypes.string,
  accessibilityLabel: _propTypes.string,
  accessibilityLiveRegion: (0, _propTypes.oneOf)(['assertive', 'none', 'polite']),
  accessibilityRole: _propTypes.string,
  accessibilityTraits: (0, _propTypes.oneOfType)([_propTypes.array, _propTypes.string]),
  accessible: _propTypes.bool,
  children: _propTypes.any,
  hitSlop: _EdgeInsetsPropType.default,
  importantForAccessibility: (0, _propTypes.oneOf)(['auto', 'no', 'no-hide-descendants', 'yes']),
  onBlur: _propTypes.func,
  onClick: _propTypes.func,
  onClickCapture: _propTypes.func,
  onContextMenu: _propTypes.func,
  onFocus: _propTypes.func,
  onLayout: _propTypes.func,
  onMoveShouldSetResponder: _propTypes.func,
  onMoveShouldSetResponderCapture: _propTypes.func,
  onResponderGrant: _propTypes.func,
  onResponderMove: _propTypes.func,
  onResponderReject: _propTypes.func,
  onResponderRelease: _propTypes.func,
  onResponderTerminate: _propTypes.func,
  onResponderTerminationRequest: _propTypes.func,
  onStartShouldSetResponder: _propTypes.func,
  onStartShouldSetResponderCapture: _propTypes.func,
  onTouchCancel: _propTypes.func,
  onTouchCancelCapture: _propTypes.func,
  onTouchEnd: _propTypes.func,
  onTouchEndCapture: _propTypes.func,
  onTouchMove: _propTypes.func,
  onTouchMoveCapture: _propTypes.func,
  onTouchStart: _propTypes.func,
  onTouchStartCapture: _propTypes.func,
  pointerEvents: (0, _propTypes.oneOf)(['auto', 'box-none', 'box-only', 'none']),
  style: stylePropType,
  testID: _propTypes.string,
  // compatibility with React Native
  accessibilityViewIsModal: _propTypes.bool,
  collapsable: _propTypes.bool,
  needsOffscreenAlphaCompositing: _propTypes.bool,
  onAccessibilityTap: _propTypes.func,
  onMagicTap: _propTypes.func,
  removeClippedSubviews: _propTypes.bool,
  renderToHardwareTextureAndroid: _propTypes.bool,
  shouldRasterizeIOS: _propTypes.bool,
  tvParallaxProperties: _propTypes.object
};
var _default = ViewPropTypes;
exports.default = _default;