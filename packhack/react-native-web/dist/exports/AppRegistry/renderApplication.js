"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = renderApplication;
exports.getApplication = getApplication;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _AppContainer = _interopRequireDefault(require("./AppContainer"));

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

var _hydrate = _interopRequireDefault(require("../../modules/hydrate"));

var _render = _interopRequireDefault(require("../render"));

var _styleResolver = _interopRequireDefault(require("../StyleSheet/styleResolver"));

var _react = _interopRequireDefault(require("react"));

/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var renderFn = process.env.NODE_ENV !== 'production' ? _render.default : _hydrate.default;

function renderApplication(RootComponent, initialProps, rootTag, WrapperComponent, callback) {
  (0, _invariant.default)(rootTag, 'Expect to have a valid rootTag, instead got ', rootTag);
  renderFn(_react.default.createElement(_AppContainer.default, {
    WrapperComponent: WrapperComponent,
    rootTag: rootTag
  }, _react.default.createElement(RootComponent, initialProps)), rootTag, callback);
}

function getApplication(RootComponent, initialProps, WrapperComponent) {
  var element = _react.default.createElement(_AppContainer.default, {
    WrapperComponent: WrapperComponent,
    rootTag: {}
  }, _react.default.createElement(RootComponent, initialProps)); // Don't escape CSS text


  var getStyleElement = function getStyleElement(props) {
    var sheet = _styleResolver.default.getStyleSheet();

    return _react.default.createElement("style", (0, _extends2.default)({}, props, {
      dangerouslySetInnerHTML: {
        __html: sheet.textContent
      },
      id: sheet.id
    }));
  };

  return {
    element: element,
    getStyleElement: getStyleElement
  };
}