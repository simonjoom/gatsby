"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _AnimatedImplementation = _interopRequireDefault(require("../../vendor/react-native/Animated/AnimatedImplementation"));

var _Image = _interopRequireDefault(require("../Image"));

var _ScrollView = _interopRequireDefault(require("../ScrollView"));

var _Text = _interopRequireDefault(require("../Text"));

var _View = _interopRequireDefault(require("../View"));

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var Animated = (0, _extends2.default)({}, _AnimatedImplementation.default, {
  Image: _AnimatedImplementation.default.createAnimatedComponent(_Image.default),
  ScrollView: _AnimatedImplementation.default.createAnimatedComponent(_ScrollView.default),
  View: _AnimatedImplementation.default.createAnimatedComponent(_View.default),
  Text: _AnimatedImplementation.default.createAnimatedComponent(_Text.default)
});
var _default = Animated;
exports.default = _default;