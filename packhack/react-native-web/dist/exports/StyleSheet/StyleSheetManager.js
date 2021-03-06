"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _createAtomicRules = _interopRequireDefault(require("./createAtomicRules"));

var _hash = _interopRequireDefault(require("../../vendor/hash"));

var _initialRules = _interopRequireDefault(require("./initialRules"));

var _WebStyleSheet = _interopRequireDefault(require("./WebStyleSheet"));

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */
var emptyObject = {};
var STYLE_ELEMENT_ID = 'react-native-stylesheet';

var createClassName = function createClassName(prop, value) {
  var hashed = (0, _hash.default)(prop + normalizeValue(value));
  return process.env.NODE_ENV !== 'production' ? "rn-" + prop + "-" + hashed : "rn-" + hashed;
};

var normalizeValue = function normalizeValue(value) {
  return typeof value === 'object' ? JSON.stringify(value) : value;
};

var StyleSheetManager =
/*#__PURE__*/
function () {
  function StyleSheetManager() {
    var _this = this;

    this._cache = {
      byClassName: {},
      byProp: {}
    };
    this._sheet = new _WebStyleSheet.default(STYLE_ELEMENT_ID);

    _initialRules.default.forEach(function (rule) {
      _this._sheet.insertRuleOnce(rule);
    });
  }

  var _proto = StyleSheetManager.prototype;

  _proto.getClassName = function getClassName(prop, value) {
    var val = normalizeValue(value);
    var cache = this._cache.byProp;
    return cache[prop] && cache[prop].hasOwnProperty(val) && cache[prop][val];
  };

  _proto.getDeclaration = function getDeclaration(className) {
    var cache = this._cache.byClassName;
    return cache[className] || emptyObject;
  };

  _proto.getStyleSheet = function getStyleSheet() {
    var cssText = this._sheet.cssText;
    return {
      id: STYLE_ELEMENT_ID,
      textContent: cssText
    };
  };

  _proto.injectDeclaration = function injectDeclaration(prop, value) {
    var _this2 = this;

    var val = normalizeValue(value);
    var className = this.getClassName(prop, val);

    if (!className) {
      className = createClassName(prop, val);

      this._addToCache(className, prop, val);

      var rules = (0, _createAtomicRules.default)("." + className, prop, value);
      rules.forEach(function (rule) {
        _this2._sheet.insertRuleOnce(rule);
      });
    }

    return className;
  };

  _proto._addToCache = function _addToCache(className, prop, value) {
    var cache = this._cache;

    if (!cache.byProp[prop]) {
      cache.byProp[prop] = {};
    }

    cache.byProp[prop][value] = className;
    cache.byClassName[className] = {
      prop: prop,
      value: value
    };
  };

  return StyleSheetManager;
}();

exports.default = StyleSheetManager;