"use strict";

exports.__esModule = true;
exports.default = void 0;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var mapKeyValue = function mapKeyValue(obj, fn) {
  var result = [];

  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      var r = fn(key, obj[key]);
      r && result.push(r);
    }
  }

  return result;
};

var _default = mapKeyValue;
exports.default = _default;