"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _StyleSheetPropType = _interopRequireDefault(require("../../modules/StyleSheetPropType"));

var _TextStylePropTypes = _interopRequireDefault(require("./TextStylePropTypes"));

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
var TextPropTypes = {
  accessibilityComponentType: _propTypes.string,
  accessibilityLabel: _propTypes.string,
  accessibilityLiveRegion: (0, _propTypes.oneOf)(['assertive', 'none', 'polite']),
  accessibilityRole: (0, _propTypes.oneOf)(['button', 'heading', 'label', 'link', 'listitem']),
  accessibilityTraits: (0, _propTypes.oneOfType)([_propTypes.array, _propTypes.string]),
  accessible: _propTypes.bool,
  children: _propTypes.any,
  importantForAccessibility: (0, _propTypes.oneOf)(['auto', 'no', 'no-hide-descendants', 'yes']),
  numberOfLines: _propTypes.number,
  onBlur: _propTypes.func,
  onContextMenu: _propTypes.func,
  onFocus: _propTypes.func,
  onLayout: _propTypes.func,
  onPress: _propTypes.func,
  selectable: _propTypes.bool,
  style: (0, _StyleSheetPropType.default)(_TextStylePropTypes.default),
  testID: _propTypes.string
};
var _default = TextPropTypes;
exports.default = _default;