"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _createReactClass = _interopRequireDefault(require("create-react-class"));

var _dismissKeyboard = _interopRequireDefault(require("../../modules/dismissKeyboard"));

var _findNodeHandle = _interopRequireDefault(require("../findNodeHandle"));

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

var _ScrollResponder = _interopRequireDefault(require("../../modules/ScrollResponder"));

var _ScrollViewBase = _interopRequireDefault(require("./ScrollViewBase"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _View = _interopRequireDefault(require("../View"));

var _ViewPropTypes = _interopRequireDefault(require("../ViewPropTypes"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = require("prop-types");

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */
var emptyObject = {};
/* eslint-disable react/prefer-es6-class, react/prop-types */

var ScrollView = (0, _createReactClass.default)({
  displayName: "ScrollView",
  propTypes: (0, _extends2.default)({}, _ViewPropTypes.default, {
    contentContainerStyle: _ViewPropTypes.default.style,
    horizontal: _propTypes.bool,
    keyboardDismissMode: (0, _propTypes.oneOf)(['none', 'interactive', 'on-drag']),
    onContentSizeChange: _propTypes.func,
    onScroll: _propTypes.func,
    pagingEnabled: _propTypes.bool,
    refreshControl: _propTypes.element,
    scrollEnabled: _propTypes.bool,
    scrollEventThrottle: _propTypes.number,
    stickyHeaderIndices: (0, _propTypes.arrayOf)(_propTypes.number),
    style: _ViewPropTypes.default.style
  }),
  mixins: [_ScrollResponder.default.Mixin],
  getInitialState: function getInitialState() {
    return this.scrollResponderMixinGetInitialState();
  },
  flashScrollIndicators: function flashScrollIndicators() {
    this.scrollResponderFlashScrollIndicators();
  },
  setNativeProps: function setNativeProps(props) {
    if (this._scrollViewRef) {
      this._scrollViewRef.setNativeProps(props);
    }
  },

  /**
   * Returns a reference to the underlying scroll responder, which supports
   * operations like `scrollTo`. All ScrollView-like components should
   * implement this method so that they can be composed while providing access
   * to the underlying scroll responder's methods.
   */
  getScrollResponder: function getScrollResponder() {
    return this;
  },
  getScrollableNode: function getScrollableNode() {
    return (0, _findNodeHandle.default)(this._scrollViewRef);
  },
  getInnerViewNode: function getInnerViewNode() {
    return (0, _findNodeHandle.default)(this._innerViewRef);
  },

  /**
   * Scrolls to a given x, y offset, either immediately or with a smooth animation.
   * Syntax:
   *
   * scrollTo(options: {x: number = 0; y: number = 0; animated: boolean = true})
   *
   * Note: The weird argument signature is due to the fact that, for historical reasons,
   * the function also accepts separate arguments as as alternative to the options object.
   * This is deprecated due to ambiguity (y before x), and SHOULD NOT BE USED.
   */
  scrollTo: function scrollTo(y, x, animated) {
    if (typeof y === 'number') {
      console.warn('`scrollTo(y, x, animated)` is deprecated. Use `scrollTo({x: 5, y: 5, animated: true})` instead.');
    } else {
      var _ref = y || emptyObject;

      x = _ref.x;
      y = _ref.y;
      animated = _ref.animated;
    }

    this.getScrollResponder().scrollResponderScrollTo({
      x: x || 0,
      y: y || 0,
      animated: animated !== false
    });
  },

  /**
   * If this is a vertical ScrollView scrolls to the bottom.
   * If this is a horizontal ScrollView scrolls to the right.
   *
   * Use `scrollToEnd({ animated: true })` for smooth animated scrolling,
   * `scrollToEnd({ animated: false })` for immediate scrolling.
   * If no options are passed, `animated` defaults to true.
   */
  scrollToEnd: function scrollToEnd(options) {
    // Default to true
    var animated = (options && options.animated) !== false;
    var horizontal = this.props.horizontal;
    var scrollResponder = this.getScrollResponder();
    var scrollResponderNode = scrollResponder.scrollResponderGetScrollableNode();
    var x = horizontal ? scrollResponderNode.scrollWidth : 0;
    var y = horizontal ? 0 : scrollResponderNode.scrollHeight;
    scrollResponder.scrollResponderScrollTo({
      x: x,
      y: y,
      animated: animated
    });
  },

  /**
   * Deprecated, do not use.
   */
  scrollWithoutAnimationTo: function scrollWithoutAnimationTo(y, x) {
    if (y === void 0) {
      y = 0;
    }

    if (x === void 0) {
      x = 0;
    }

    console.warn('`scrollWithoutAnimationTo` is deprecated. Use `scrollTo` instead');
    this.scrollTo({
      x: x,
      y: y,
      animated: false
    });
  },
  render: function render() {
    var _this$props = this.props,
        contentContainerStyle = _this$props.contentContainerStyle,
        horizontal = _this$props.horizontal,
        onContentSizeChange = _this$props.onContentSizeChange,
        refreshControl = _this$props.refreshControl,
        stickyHeaderIndices = _this$props.stickyHeaderIndices,
        keyboardDismissMode = _this$props.keyboardDismissMode,
        onScroll = _this$props.onScroll,
        pagingEnabled = _this$props.pagingEnabled,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["contentContainerStyle", "horizontal", "onContentSizeChange", "refreshControl", "stickyHeaderIndices", "keyboardDismissMode", "onScroll", "pagingEnabled"]);

    if (process.env.NODE_ENV !== 'production' && this.props.style) {
      var style = _StyleSheet.default.flatten(this.props.style);

      var childLayoutProps = ['alignItems', 'justifyContent'].filter(function (prop) {
        return style && style[prop] !== undefined;
      });
      (0, _invariant.default)(childLayoutProps.length === 0, "ScrollView child layout (" + JSON.stringify(childLayoutProps) + ") " + 'must be applied through the contentContainerStyle prop.');
    }

    var contentSizeChangeProps = {};

    if (onContentSizeChange) {
      contentSizeChangeProps = {
        onLayout: this._handleContentOnLayout
      };
    }

    var children = !horizontal && Array.isArray(stickyHeaderIndices) ? _react.default.Children.map(this.props.children, function (child, i) {
      if (stickyHeaderIndices.indexOf(i) > -1) {
        return _react.default.cloneElement(child, {
          style: [child.props.style, styles.stickyHeader]
        });
      } else {
        return child;
      }
    }) : this.props.children;

    var contentContainer = _react.default.createElement(_View.default, (0, _extends2.default)({}, contentSizeChangeProps, {
      children: children,
      collapsable: false,
      ref: this._setInnerViewRef,
      style: [horizontal && styles.contentContainerHorizontal, contentContainerStyle]
    }));

    var baseStyle = horizontal ? styles.baseHorizontal : styles.baseVertical;
    var props = (0, _extends2.default)({}, other, {
      style: [baseStyle, this.props.style],
      onTouchStart: this.scrollResponderHandleTouchStart,
      onTouchMove: this.scrollResponderHandleTouchMove,
      onTouchEnd: this.scrollResponderHandleTouchEnd,
      onScrollBeginDrag: this.scrollResponderHandleScrollBeginDrag,
      onScrollEndDrag: this.scrollResponderHandleScrollEndDrag,
      onMomentumScrollBegin: this.scrollResponderHandleMomentumScrollBegin,
      onMomentumScrollEnd: this.scrollResponderHandleMomentumScrollEnd,
      onStartShouldSetResponder: this.scrollResponderHandleStartShouldSetResponder,
      onStartShouldSetResponderCapture: this.scrollResponderHandleStartShouldSetResponderCapture,
      onScrollShouldSetResponder: this.scrollResponderHandleScrollShouldSetResponder,
      onScroll: this._handleScroll,
      onResponderGrant: this.scrollResponderHandleResponderGrant,
      onResponderTerminationRequest: this.scrollResponderHandleTerminationRequest,
      onResponderTerminate: this.scrollResponderHandleTerminate,
      onResponderRelease: this.scrollResponderHandleResponderRelease,
      onResponderReject: this.scrollResponderHandleResponderReject
    });
    var ScrollViewClass = _ScrollViewBase.default;
    (0, _invariant.default)(ScrollViewClass !== undefined, 'ScrollViewClass must not be undefined');

    if (refreshControl) {
      return _react.default.cloneElement(refreshControl, {
        style: props.style
      }, _react.default.createElement(ScrollViewClass, (0, _extends2.default)({}, props, {
        ref: this._setScrollViewRef,
        style: baseStyle
      }), contentContainer));
    }

    return _react.default.createElement(ScrollViewClass, (0, _extends2.default)({}, props, {
      ref: this._setScrollViewRef,
      style: props.style
    }), contentContainer);
  },
  _handleContentOnLayout: function _handleContentOnLayout(e) {
    var _e$nativeEvent$layout = e.nativeEvent.layout,
        width = _e$nativeEvent$layout.width,
        height = _e$nativeEvent$layout.height;
    this.props.onContentSizeChange(width, height);
  },
  _handleScroll: function _handleScroll(e) {
    if (process.env.NODE_ENV !== 'production') {
      if (this.props.onScroll && !this.props.scrollEventThrottle) {
        console.log('You specified `onScroll` on a <ScrollView> but not ' + '`scrollEventThrottle`. You will only receive one event. ' + 'Using `16` you get all the events but be aware that it may ' + "cause frame drops, use a bigger number if you don't need as " + 'much precision.');
      }
    }

    if (this.props.keyboardDismissMode === 'on-drag') {
      (0, _dismissKeyboard.default)();
    }

    this.scrollResponderHandleScroll(e);
  },
  _setInnerViewRef: function _setInnerViewRef(component) {
    this._innerViewRef = component;
  },
  _setScrollViewRef: function _setScrollViewRef(component) {
    this._scrollViewRef = component;
  }
});
var commonStyle = {
  flexGrow: 1,
  flexShrink: 1,
  // Enable hardware compositing in modern browsers.
  // Creates a new layer with its own backing surface that can significantly
  // improve scroll performance.
  transform: [{
    translateZ: 0
  }],
  // iOS native scrolling
  WebkitOverflowScrolling: 'touch'
};

var styles = _StyleSheet.default.create({
  baseVertical: (0, _extends2.default)({}, commonStyle, {
    flexDirection: 'column',
    overflowX: 'hidden',
    overflowY: 'auto',
    touchAction: 'pan-y'
  }),
  baseHorizontal: (0, _extends2.default)({}, commonStyle, {
    flexDirection: 'row',
    overflowX: 'auto',
    overflowY: 'hidden',
    touchAction: 'pan-x'
  }),
  contentContainerHorizontal: {
    flexDirection: 'row'
  },
  stickyHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 10
  }
});

var _default = ScrollView;
exports.default = _default;