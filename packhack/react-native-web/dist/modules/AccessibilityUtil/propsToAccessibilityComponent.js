"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _propsToAriaRole = _interopRequireDefault(require("./propsToAriaRole"));

/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var roleComponents = {
  article: 'article',
  banner: 'header',
  complementary: 'aside',
  contentinfo: 'footer',
  form: 'form',
  label: 'label',
  link: 'a',
  list: 'ul',
  listitem: 'li',
  main: 'main',
  navigation: 'nav',
  region: 'section'
};
var emptyObject = {};

var propsToAccessibilityComponent = function propsToAccessibilityComponent(props) {
  if (props === void 0) {
    props = emptyObject;
  }

  var role = (0, _propsToAriaRole.default)(props);

  if (role) {
    if (role === 'heading') {
      var level = props['aria-level'] || 1;
      return "h" + level;
    }

    return roleComponents[role];
  }
};

var _default = propsToAccessibilityComponent;
exports.default = _default;