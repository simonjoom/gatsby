"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _createRuleBlock = _interopRequireDefault(require("./createRuleBlock"));

var _createReactDOMStyle = _interopRequireDefault(require("./createReactDOMStyle"));

var _i18nStyle = _interopRequireDefault(require("./i18nStyle"));

var _hash = _interopRequireDefault(require("../../vendor/hash"));

var hashObject = function hashObject(obj) {
  return (0, _hash.default)(JSON.stringify(obj));
};

var createIdentifier = function createIdentifier(obj) {
  var hashed = hashObject(obj);
  return process.env.NODE_ENV !== 'production' ? "rn-anim-" + hashed : "rn-" + hashed;
};

var prefixes = ['-webkit-', ''];

var makeBlock = function makeBlock(rule) {
  var domStyle = (0, _createReactDOMStyle.default)((0, _i18nStyle.default)(rule));
  return (0, _createRuleBlock.default)(domStyle);
};

var makeSteps = function makeSteps(keyframes) {
  return Object.keys(keyframes).map(function (stepName) {
    var rule = keyframes[stepName];
    var block = makeBlock(rule);
    return stepName + "{" + block + "}";
  }).join('');
};

var createKeyframesRules = function createKeyframesRules(keyframes) {
  var identifier = createIdentifier(keyframes);
  var rules = prefixes.map(function (prefix) {
    return "@media all {@" + prefix + "keyframes " + identifier + "{" + makeSteps(keyframes) + "}}";
  });
  return {
    identifier: identifier,
    rules: rules
  };
};

var _default = createKeyframesRules;
exports.default = _default;