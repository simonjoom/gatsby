"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Animated = _interopRequireDefault(require("../Animated"));

var _Dimensions = _interopRequireDefault(require("../Dimensions"));

var _Easing = _interopRequireDefault(require("../Easing"));

var _Platform = _interopRequireDefault(require("../Platform"));

var _Portal = _interopRequireDefault(require("./Portal"));

var ariaAppHider = _interopRequireWildcard(require("./ariaAppHider"));

var _utils = require("./utils");

var _styles = _interopRequireDefault(require("./styles"));

var ariaHiddenInstances = 0;

var Modal =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Modal, _Component);

  Modal.setAppElement = function setAppElement(element) {
    ariaAppHider.setElement(element);
  };

  function Modal(props) {
    return _Component.call(this, props) || this;
    /*  this.state = {
        animationSlide: null,
        animationFade: null,
        styleFade: { display: props.visible ? 'flex' : 'none' },
        opacityFade: new Animated.Value(0),
        slideTranslation: new Animated.Value(0),
      };*/
  }

  var _proto = Modal.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.props.visible) this.handleShow();
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(_ref) {
    var visible = _ref.visible;
    if (visible && !this.props.visible) this.handleShow();
    if (!visible && this.props.visible) this.handleClose();
  };

  _proto.handleShow = function handleShow() {
    var _this$props = this.props,
        animationType = _this$props.animationType,
        onShow = _this$props.onShow,
        ariaHideApp = _this$props.ariaHideApp,
        appElement = _this$props.appElement;

    if (ariaHideApp) {
      ariaHiddenInstances += 1;
      ariaAppHider.hide(appElement);
    }
    /*
        if (animationType === 'slide') {
          this.animateSlideIn(onShow);
        } else if (animationType === 'fade') {
          this.animateFadeIn(onShow);
        } else {
          onShow();
        }*/

  };

  _proto.handleClose = function handleClose() {
    var _this$props2 = this.props,
        animationType = _this$props2.animationType,
        onDismiss = _this$props2.onDismiss,
        ariaHideApp = _this$props2.ariaHideApp,
        appElement = _this$props2.appElement;
    /*
        if (animationType === 'slide') {
          this.animateSlideOut(onDismiss);
        } else if (animationType === 'fade') {
          this.animateFadeOut(onDismiss);
        } else {
          onDismiss();
        }
    */

    if (ariaHideApp && ariaHiddenInstances > 0) {
      ariaHiddenInstances -= 1;

      if (ariaHiddenInstances === 0) {
        ariaAppHider.show(appElement);
      }
    }
  };
  /*
    // Fade Animation Implementation
    animateFadeIn = (callback) => {
      if (this.state.animationFade) {
        this.state.animationFade.stop();
      }
  
      const animationFade = Animated.timing(this.state.opacityFade, {
        toValue: 1,
        duration: 300,
      });
  
      this.setState(
        {
          animationFade,
        },
        () => {
          requestAnimationFrame(() => {
            this.setState({ styleFade: { display: 'flex' } }, () =>
              this.state.animationFade.start(callback)
            );
          });
        }
      );
    };
  
    animateFadeOut = (callback) => {
      if (this.state.animationFade) {
        this.state.animationFade.stop();
      }
  
      const animationFade = Animated.timing(this.state.opacityFade, {
        toValue: 0,
        duration: 300,
      });
  
      this.setState(
        {
          animationFade,
        },
        () => {
          requestAnimationFrame(() => {
            this.state.animationFade.start(() => {
              this.setState(
                {
                  styleFade: { display: 'none' },
                },
                callback
              );
            });
          });
        }
      );
    };
    // End of Fade Animation Implementation
  
    // Slide Animation Implementation
    animateSlideIn = (callback) => {
      if (this.state.animationSlide) {
        this.state.animationSlide.stop();
      }
  
      const animationSlide = Animated.timing(this.state.slideTranslation, {
        toValue: 1,
        easing: Easing.out(Easing.poly(4)),
        duration: 300,
      });
  
      this.setState(
        {
          animationSlide,
        },
        () => {
          requestAnimationFrame(() => {
            this.setState({ styleFade: { display: 'flex' } }, () =>
              this.state.animationSlide.start(callback)
            );
          });
        }
      );
    };
  
    animateSlideOut = (callback) => {
      if (this.state.animationSlide) {
        this.state.animationSlide.stop();
      }
  
      const animationSlide = Animated.timing(this.state.slideTranslation, {
        toValue: 0,
        easing: Easing.in(Easing.poly(4)),
        duration: 300,
      });
  
      this.setState(
        {
          animationSlide,
        },
        () => {
          requestAnimationFrame(() => {
            this.state.animationSlide.start(() => {
              this.setState(
                {
                  styleFade: { display: 'none' },
                },
                callback
              );
            });
          });
        }
      );
    };*/
  // End of Slide Animation Implementation


  _proto.getAnimationStyle = function getAnimationStyle() {
    var _this$props3 = this.props,
        visible = _this$props3.visible,
        animationType = _this$props3.animationType;
    var styleFade = this.state.styleFade;
    /*  if (animationType === 'slide') {
        return [
          {
            transform: [
              {
                translateY: this.state.slideTranslation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [Dimensions.get('window').height, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
          styleFade,
        ];
      }
      if (animationType === 'fade') {
        return [{ opacity: this.state.opacityFade }, styleFade];
      }
    */

    return [_styles.default[visible ? 'visible' : 'hidden']];
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        transparent = _this$props4.transparent,
        children = _this$props4.children;
    var transparentStyle = transparent ? _styles.default.bgTransparent : _styles.default.bgNotTransparent;
    var animationStyle = this.getAnimationStyle();
    return _react.default.createElement(_Portal.default, null, children);
  };

  return Modal;
}(_react.Component);
/*
        <Animated.View
          aria-modal="true"
          style={[styles.baseStyle, transparentStyle, animationStyle]}
        >
        </Animated.View>*/


exports.default = Modal;
Modal.defaultProps = {
  animationType: 'fade',
  transparent: false,
  visible: true,
  onShow: function onShow() {},
  onRequestClose: function onRequestClose() {},
  onDismiss: function onDismiss() {},
  ariaHideApp: true,
  appElement: null
};