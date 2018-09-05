"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.assertNodeList = assertNodeList;
exports.setElement = setElement;
exports.validateElement = validateElement;
exports.hide = hide;
exports.show = show;
exports.documentNotReadyOrSSRTesting = documentNotReadyOrSSRTesting;
exports.resetForTesting = resetForTesting;

var _warning = _interopRequireDefault(require("warning"));

var _utils = require("./utils");

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
var globalElement = null;

function assertNodeList(nodeList, selector) {
  if (!nodeList || !nodeList.length) {
    throw new Error("modal-react-native-web: No elements were found for selector " + selector + ".");
  }
}

function setElement(element) {
  var useElement = element;

  if (typeof useElement === 'string' && _utils.canUseDOM) {
    var el = document.querySelectorAll(useElement);
    assertNodeList(el, useElement);
    useElement = 'length' in el ? el[0] : el;
  }

  globalElement = useElement || globalElement;
  return globalElement;
}

function validateElement(appElement) {
  if (!appElement && !globalElement) {
    (0, _warning.default)(false, ['modal-react-native-web: App element is not defined.', 'Please use `Modal.setAppElement(el)` or set `appElement={el}`.', "This is needed so screen readers don't see main content", 'when modal is opened. It is not recommended, but you can opt-out', 'by setting `ariaHideApp={false}`.'].join(' '));
    return false;
  }

  return true;
}

function hide(appElement) {
  if (validateElement(appElement)) {
    (appElement || globalElement).setAttribute('aria-hidden', 'true');
  }
}

function show(appElement) {
  if (validateElement(appElement)) {
    (appElement || globalElement).removeAttribute('aria-hidden');
  }
}

function documentNotReadyOrSSRTesting() {
  globalElement = null;
}

function resetForTesting() {
  globalElement = null;
}