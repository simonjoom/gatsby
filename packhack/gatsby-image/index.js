"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactNative = require("react-native");

var _jsxFileName = "/Users/simon/gatsby/gatsby-blog/packhack/gatsby-image/src/index.js";

/*
const FancyImage = React.forwardRef((props, ref) => (
  <Image forwardedRef={ref} {...props} />
))
const ref = React.createRef()*/
// Handle legacy names for image queries.
var convertProps = function convertProps(props) {
  var convertedProps = (0, _extends2.default)({}, props);

  if (convertedProps.sizes) {
    convertedProps.fluid = convertedProps.sizes;
    delete convertedProps.sizes;
  }

  return convertedProps;
}; // Cache if we've seen an image before so we don't both with
// lazy-loading & fading in on subsequent mounts.


var imageCache = {};

var inImageCache = function inImageCache(props) {
  var convertedProps = convertProps(props); // Find src

  var src = convertedProps.fluid.src; // ? convertedProps.fluid.src
  // : convertedProps.fixed.src

  if (imageCache[src]) {
    return true;
  } else {
    imageCache[src] = true;
    return false;
  }
};

var io;
var listeners = [];

function getIO() {
  if (typeof io === "undefined" && typeof window !== "undefined" && window.IntersectionObserver) {
    io = new window.IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        listeners.forEach(function (l) {
          if (l[0] === entry.target) {
            // Edge doesn't currently support isIntersecting, so also test for an intersectionRatio > 0
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
              io.unobserve(l[0]);
              l[1]();
            }
          }
        });
      });
    }, {
      rootMargin: "200px"
    });
  }

  return io;
}

var listenToIntersections = function listenToIntersections(el, cb) {
  getIO().observe(el);
  listeners.push([el, cb]);
};

var isWebpSupportedCache = null;

var isWebpSupported = function isWebpSupported() {
  if (isWebpSupportedCache !== null) {
    return isWebpSupportedCache;
  }

  var elem = typeof window !== "undefined" ? window.document.createElement("canvas") : {};

  if (elem.getContext && elem.getContext("2d")) {
    isWebpSupportedCache = elem.toDataURL("image/webp").indexOf("data:image/webp") === 0;
  } else {
    isWebpSupportedCache = false;
  }

  return isWebpSupportedCache;
};

var noscriptImg = function noscriptImg(props) {
  // Check if prop exists before adding each attribute to the string output below to prevent
  // HTML validation issues caused by empty values like width="" and height=""
  var src = props.src ? "src=\"" + props.src + "\" " : "src=\"\" "; // required attribute

  var srcSet = props.srcSet ? "srcset=\"" + props.srcSet + "\" " : "";
  var sizes = props.sizes ? "sizes=\"" + props.sizes + "\" " : "";
  var title = props.title ? "title=\"" + props.title + "\" " : "";
  var alt = props.alt ? "alt=\"" + props.alt + "\" " : "alt=\"\" "; // required attribute

  var width = props.width ? "width=\"" + props.width + "\" " : "";
  var height = props.height ? "height=\"" + props.height + "\" " : "";
  var opacity = props.opacity ? props.opacity : "1";
  var transitionDelay = props.transitionDelay ? props.transitionDelay : "0.5s";
  return "<img " + width + height + src + srcSet + alt + title + sizes + "style=\"position:absolute;top:0;left:0;transition:opacity 0.5s;transition-delay:" + transitionDelay + ";opacity:" + opacity + ";width:100%;height:100%;object-fit:cover;object-position:center\"/>";
};
/*
const Img = props => {
  const { style, onLoad, onError, ...otherProps } = props
  return (
    <img
      {...otherProps}
      onLoad={onLoad}
      onError={onError}
      style={{
        position: `absolute`,
        top: 0,
        left: 0,
        transition: `opacity 0.5s`,
        width: `100%`,
        height: `100%`,
        objectFit: `cover`,
        objectPosition: `center`,
        ...style,
      }}
    />
  )
}

Img.propTypes = {
  style: PropTypes.object,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
}*/


var GatsbyImage =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(GatsbyImage, _React$Component);

  function GatsbyImage(props) {
    var _this;

    _this = _React$Component.call(this, props) || this; // If this browser doesn't support the IntersectionObserver API
    // we default to start downloading the image right away.

    var isVisible = true;
    var imgLoaded = true;
    var IOSupported = false;
    var Imgheight; // If this image has already been loaded before then we can assume it's
    // already in the browser cache so it's cheap to just show directly.

    var seenBefore = inImageCache(props);

    if (!seenBefore && typeof window !== "undefined" && window.IntersectionObserver) {
      isVisible = false;
      imgLoaded = false;
      IOSupported = true;
    } // Always don't render image while server rendering


    if (typeof window === "undefined") {
      isVisible = false;
      imgLoaded = false;
    }

    _this.state = {
      Imgheight: Imgheight,
      isVisible: isVisible,
      imgLoaded: imgLoaded,
      IOSupported: IOSupported
    };
    _this.handleRef = _this.handleRef.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = GatsbyImage.prototype;

  _proto.handleRef = function handleRef(ref) {
    var _this2 = this;

    if (this.state.IOSupported && ref) {
      listenToIntersections(ref, function () {
        _this2.setState({
          isVisible: true,
          imgLoaded: false
        });
      });
    }
  };

  _proto.render = function render() {
    var _this3 = this;

    var _convertProps = convertProps(this.props),
        title = _convertProps.title,
        alt = _convertProps.alt,
        resizeMode = _convertProps.resizeMode,
        height = _convertProps.height,
        className = _convertProps.className,
        outerWrapperClassName = _convertProps.outerWrapperClassName,
        _convertProps$imgStyl = _convertProps.imgStyle,
        imgStyle = _convertProps$imgStyl === void 0 ? {} : _convertProps$imgStyl,
        _convertProps$placeho = _convertProps.placeholderStyle,
        placeholderStyle = _convertProps$placeho === void 0 ? {} : _convertProps$placeho,
        fluid = _convertProps.fluid,
        backgroundColor = _convertProps.backgroundColor;

    var bgColor;

    if (typeof backgroundColor === "boolean") {
      bgColor = "lightgray";
    } else {
      bgColor = backgroundColor;
    }

    if (fluid) {
      var image = fluid;
      var Pattern = /\(max-width: (.*)px\).*vw, (.*)px/;
      var match = fluid.sizes.match(Pattern);
      var presentationWidth = match[1] + 'px';
      var presentationHeight = height || match[2] + 'px';
      var imagePlaceholderStyle = (0, _extends2.default)({
        opacity: this.state.imgLoaded ? 0 : 1,
        transitionDelay: "0.25s"
      }, imgStyle, placeholderStyle);
      var imageStyle = (0, _extends2.default)({
        opacity: this.state.imgLoaded || this.props.fadeIn === false ? 1 : 0
      }, imgStyle); // Use webp by default if browser supports it

      if (image.srcWebp && image.srcSetWebp && isWebpSupported()) {
        image.src = image.srcWebp;
        image.srcSet = image.srcSetWebp;
      }

      var srcFront = image.tracedSVG || image.base64; // The outer div is necessary to reset the z-index to 0.

      return _react.default.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 231
        },
        __self: this
      }, bgColor && _react.default.createElement(_reactNative.View, {
        title: title,
        style: {
          backgroundColor: bgColor,
          position: "absolute",
          top: 0,
          bottom: 0,
          opacity: !this.state.imgLoaded ? 1 : 0,
          transitionDelay: "0.35s",
          right: 0,
          left: 0
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 233
        },
        __self: this
      }), _react.default.createElement("div", {
        ref: this.handleRef,
        style: {
          width: "100%"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 247
        },
        __self: this
      }), this.state.isVisible && _react.default.createElement(_reactNative.Image, {
        alt: alt,
        resizeMode: resizeMode,
        title: title,
        srcSet: image.srcSet,
        defaultSource: srcFront,
        source: image.src,
        sizes: image.sizes,
        styleAccessibilityImage: imagePlaceholderStyle,
        styleImage: imageStyle,
        style: {
          height: presentationHeight,
          maxWidth: '100%'
        },
        onLoadEnd: function onLoadEnd() {
          _this3.state.IOSupported && _this3.setState({
            imgLoaded: true
          });
          _this3.props.onLoad && _this3.props.onLoad();
        },
        onError: this.props.onError,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 255
        },
        __self: this
      }), _react.default.createElement("noscript", {
        dangerouslySetInnerHTML: {
          __html: noscriptImg((0, _extends2.default)({
            alt: alt,
            title: title
          }, image))
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 277
        },
        __self: this
      }));
    }

    return null;
  };

  return GatsbyImage;
}(_react.default.Component);

_reactNative.Image.defaultProps = {
  fadeIn: true,
  alt: "",
  resizeMode: 'center'
};

var fixedObject = _propTypes.default.shape({
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  src: _propTypes.default.string.isRequired,
  srcSet: _propTypes.default.string.isRequired,
  base64: _propTypes.default.string,
  tracedSVG: _propTypes.default.string,
  srcWebp: _propTypes.default.string,
  srcSetWebp: _propTypes.default.string
});

var fluidObject = _propTypes.default.shape({
  aspectRatio: _propTypes.default.number.isRequired,
  src: _propTypes.default.string.isRequired,
  srcSet: _propTypes.default.string.isRequired,
  sizes: _propTypes.default.string.isRequired,
  base64: _propTypes.default.string,
  tracedSVG: _propTypes.default.string,
  srcWebp: _propTypes.default.string,
  srcSetWebp: _propTypes.default.string
});
/*
Image.propTypes = {
  resolutions: fixedObject,
  sizes: fluidObject,
  fluid: fluidObject,
  fadeIn: PropTypes.bool,
  title: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // Support Glamor's css prop.
  outerWrapperClassName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  style: PropTypes.object,
  imgStyle: PropTypes.object,
  placeholderStyle: PropTypes.object,
  position: PropTypes.string,
  backgroundColor: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onLoad: PropTypes.func,
  onError: PropTypes.func,
   style={{
               // height: this.state.Imgheight || presentationHeight,
               // maxWidth: '100%',
              }}
}*/


var _default = GatsbyImage;
exports.default = _default;