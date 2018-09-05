"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.SafeHTMLElement = exports.canUseDOM = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

/**
 * MIT License
 * Copyright (c) 2017 Ryan Florence
 * https://github.com/reactjs/react-modal/blob/master/LICENSE
 *
 * Take WAI-ARIA workaround for React Native Web
 *
 * Modified by Ray Andrew <raydreww@gmail.com>
 * For Modal React Native Web
 *
 * MIT License
 * Copyright (c) 2018 Ray Andrew
 * https://github.com/rayandrews/react-native-web-modal
 */
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
exports.canUseDOM = canUseDOM;
var SafeHTMLElement = canUseDOM ? HTMLElement : _propTypes.default.any;
exports.SafeHTMLElement = SafeHTMLElement;