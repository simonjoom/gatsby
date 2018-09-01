"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.onCreateBabelConfig = function (_ref) {
  var actions = _ref.actions;

  return _extends({}, actions, {
    plugins: actions.setBabelPlugin({name:"babel-plugin-react-native-web"})
  });
};