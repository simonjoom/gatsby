"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _default = _StyleSheet.default.create({
  baseStyle: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 9999
  },
  bgTransparent: {
    backgroundColor: 'transparent'
  },
  bgNotTransparent: {
    backgroundColor: '#ffffff'
  },
  hidden: {
    display: 'none'
  },
  visible: {
    display: 'flex'
  }
});

exports.default = _default;