"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _ExecutionEnvironment = require("fbjs/lib/ExecutionEnvironment");

var _modality = _interopRequireDefault(require("./modality"));

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var WebStyleSheet =
/*#__PURE__*/
function () {
  function WebStyleSheet(id) {
    this._cssRules = [];
    this._sheet = null;
    this._textContent = '';
    var domStyleElement; // on the client we check for an existing style sheet before injecting

    if (_ExecutionEnvironment.canUseDOM) {
      domStyleElement = document.getElementById(id);

      if (!domStyleElement) {
        var html = "<style id=\"" + id + "\"></style>";

        if (document.head) {
          document.head.insertAdjacentHTML('afterbegin', html);
          domStyleElement = document.getElementById(id);
        }
      }

      if (domStyleElement) {
        (0, _modality.default)(domStyleElement); // $FlowFixMe

        this._sheet = domStyleElement.sheet;
        this._textContent = domStyleElement.textContent;
      }
    }
  }

  var _proto = WebStyleSheet.prototype;

  _proto.containsRule = function containsRule(rule) {
    return this._cssRules.indexOf(rule) > -1;
  };

  _proto.insertRuleOnce = function insertRuleOnce(rule, position) {
    // Reduce chance of duplicate rules
    if (!this.containsRule(rule)) {
      this._cssRules.push(rule); // Check whether a rule was part of any prerendered styles (textContent
      // doesn't include styles injected via 'insertRule')


      if (this._textContent.indexOf(rule) === -1 && this._sheet) {
        var pos = position || this._sheet.cssRules.length;

        this._sheet.insertRule(rule, pos);
      }
    }
  };

  (0, _createClass2.default)(WebStyleSheet, [{
    key: "cssText",
    get: function get() {
      return this._cssRules.join('\n');
    }
  }]);
  return WebStyleSheet;
}();

exports.default = WebStyleSheet;