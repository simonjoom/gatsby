"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ExecutionEnvironment = require("fbjs/lib/ExecutionEnvironment");

var _debounce = _interopRequireDefault(require("debounce"));

var _findNodeHandle = _interopRequireDefault(require("../../exports/findNodeHandle"));

/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */
var emptyObject = {};
var registry = {};
var id = 1;

var guid = function guid() {
  return "r-" + id++;
};

var resizeObserver;

if (_ExecutionEnvironment.canUseDOM) {
  if (typeof window.ResizeObserver !== 'undefined') {
    resizeObserver = new window.ResizeObserver(function (entries) {
      entries.forEach(function (_ref) {
        var target = _ref.target;
        var instance = registry[target._layoutId];
        instance && instance._handleLayout();
      });
    });
  } else {
    if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
      console.warn('onLayout relies on ResizeObserver which is not supported by your browser. ' + 'Please include a polyfill, e.g., https://github.com/que-etc/resize-observer-polyfill. ' + 'Falling back to window.onresize.');
    }

    var triggerAll = function triggerAll() {
      Object.keys(registry).forEach(function (key) {
        var instance = registry[key];

        instance._handleLayout();
      });
    };

    window.addEventListener('resize', (0, _debounce.default)(triggerAll, 16), false);
  }
}

var observe = function observe(instance) {
  var id = guid();
  registry[id] = instance;

  if (resizeObserver) {
    var node = (0, _findNodeHandle.default)(instance);

    if (node) {
      node._layoutId = id;
      resizeObserver.observe(node);
    }
  } else {
    instance._layoutId = id;

    instance._handleLayout();
  }
};

var unobserve = function unobserve(instance) {
  delete registry[instance._layoutId];

  if (resizeObserver) {
    var node = (0, _findNodeHandle.default)(instance);

    if (node) {
      delete node._layoutId;
      resizeObserver.unobserve(node);
    }
  } else {
    delete instance._layoutId;
  }
};

var safeOverride = function safeOverride(original, next) {
  if (original) {
    return function prototypeOverride() {
      /* eslint-disable prefer-rest-params */
      original.call(this, arguments);
      next.call(this, arguments);
      /* eslint-enable prefer-rest-params */
    };
  }

  return next;
};

var applyLayout = function applyLayout(Component) {
  var componentDidMount = Component.prototype.componentDidMount;
  var componentDidUpdate = Component.prototype.componentDidUpdate;
  var componentWillUnmount = Component.prototype.componentWillUnmount;
  Component.prototype.componentDidMount = safeOverride(componentDidMount, function componentDidMount() {
    this._layoutState = emptyObject;
    this._isMounted = true;
    observe(this);
  });
  Component.prototype.componentDidUpdate = safeOverride(componentDidUpdate, function componentDidUpdate(prevProps) {
    if (this.props.onLayout && !prevProps.onLayout) {
      observe(this);
    } else if (!this.props.onLayout && prevProps.onLayout) {
      unobserve(this);
    }
  });
  Component.prototype.componentWillUnmount = safeOverride(componentWillUnmount, function componentWillUnmount() {
    this._isMounted = false;
    unobserve(this);
  });

  Component.prototype._handleLayout = function () {
    var _this = this;

    var layout = this._layoutState;
    var onLayout = this.props.onLayout;

    if (onLayout) {
      this.measure(function (x, y, width, height) {
        if (_this._isMounted) {
          if (layout.x !== x || layout.y !== y || layout.width !== width || layout.height !== height) {
            _this._layoutState = {
              x: x,
              y: y,
              width: width,
              height: height
            };
            var nativeEvent = {
              layout: _this._layoutState
            };
            Object.defineProperty(nativeEvent, 'target', {
              enumerable: true,
              get: function get() {
                return (0, _findNodeHandle.default)(_this);
              }
            });
            onLayout({
              nativeEvent: nativeEvent,
              timeStamp: Date.now()
            });
          }
        }
      });
    }
  };

  return Component;
};

var _default = applyLayout;
exports.default = _default;