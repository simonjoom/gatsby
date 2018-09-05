"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

/**
 * Copyright (c) 2018-present, Nicolas Gallagher.
 * Copyright (c) 2016-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var Share =
/*#__PURE__*/
function () {
  function Share() {}

  Share.share = function share(content, options) {
    if (options === void 0) {
      options = {};
    }

    (0, _invariant.default)(typeof content === 'object' && content !== null, 'Content to share must be a valid object');
    (0, _invariant.default)(typeof content.url === 'string' || typeof content.message === 'string', 'At least one of URL and message is required');
    (0, _invariant.default)(typeof options === 'object' && options !== null, 'Options must be a valid object');
    (0, _invariant.default)(!content.title || typeof content.title === 'string', 'Invalid title: title should be a string.');

    if (window.navigator.share !== undefined) {
      return window.navigator.share({
        title: content.title,
        text: content.message,
        url: content.url
      });
    } else {
      return Promise.reject(new Error('Share is not supported in this browser'));
    }
  };
  /**
   * The content was successfully shared.
   */


  (0, _createClass2.default)(Share, null, [{
    key: "sharedAction",
    get: function get() {
      return 'sharedAction';
    }
    /**
     * The dialog has been dismissed.
     * @platform ios
     */

  }, {
    key: "dismissedAction",
    get: function get() {
      return 'dismissedAction';
    }
  }]);
  return Share;
}();

var _default = Share;
exports.default = _default;