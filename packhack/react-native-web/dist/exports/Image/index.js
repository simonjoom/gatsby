"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _applyNativeMethods = _interopRequireDefault(require("../../modules/applyNativeMethods"));

var _createElement = _interopRequireDefault(require("../createElement"));

var _AssetRegistry = require("../../modules/AssetRegistry");

var _resolveShadowValue = _interopRequireDefault(require("../StyleSheet/resolveShadowValue"));

var _ImageLoader = _interopRequireDefault(require("../../modules/ImageLoader"));

var _ImageResizeMode = _interopRequireDefault(require("./ImageResizeMode"));

var _ImageSourcePropType = _interopRequireDefault(require("./ImageSourcePropType"));

var _ImageStylePropTypes = _interopRequireDefault(require("./ImageStylePropTypes"));

var _ImageUriCache = _interopRequireDefault(require("./ImageUriCache"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _StyleSheetPropType = _interopRequireDefault(require("../../modules/StyleSheetPropType"));

var _View = _interopRequireDefault(require("../View"));

var _ViewPropTypes = _interopRequireDefault(require("../ViewPropTypes"));

var _propTypes = require("prop-types");

var _react = _interopRequireWildcard(require("react"));

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var emptyObject = {};
var STATUS_ERRORED = 'ERRORED';
var STATUS_LOADED = 'LOADED';
var STATUS_LOADING = 'LOADING';
var STATUS_PENDING = 'PENDING';
var STATUS_IDLE = 'IDLE';

var getImageState = function getImageState(uri, shouldDisplaySource) {
  return shouldDisplaySource ? STATUS_LOADED : uri ? STATUS_PENDING : STATUS_IDLE;
};

var resolveAssetDimensions = function resolveAssetDimensions(source) {
  if (typeof source === 'number') {
    var _getAssetByID = (0, _AssetRegistry.getAssetByID)(source),
        height = _getAssetByID.height,
        width = _getAssetByID.width;

    return {
      height: height,
      width: width
    };
  } else if (typeof source === 'object') {
    var _height = source.height,
        _width = source.width;
    return {
      height: _height,
      width: _width
    };
  }
};

var svgDataUriPattern = /^(data:image\/svg\+xml;utf8,)(.*)/;

var resolveAssetUri = function resolveAssetUri(source) {
  var uri = '';

  if (typeof source === 'number') {
    // get the URI from the packager
    var asset = (0, _AssetRegistry.getAssetByID)(source);
    var scale = asset.scales[0];
    var scaleSuffix = scale !== 1 ? "@" + scale + "x" : '';
    uri = asset ? asset.httpServerLocation + "/" + asset.name + scaleSuffix + "." + asset.type : '';
  } else if (typeof source === 'string') {
    uri = source;
  } else if (source && typeof source.uri === 'string') {
    uri = source.uri;
  }

  if (uri) {
    var match = uri.match(svgDataUriPattern); // inline SVG markup may contain characters (e.g., #, ") that need to be escaped

    if (match) {
      var prefix = match[1],
          svg = match[2];
      var encodedSvg = encodeURIComponent(svg);
      return "" + prefix + encodedSvg;
    }
  }

  return uri;
};

var filterId = 0;

var createTintColorSVG = function createTintColorSVG(tintColor, id) {
  return tintColor && id != null ? _react.default.createElement("svg", {
    style: {
      position: 'absolute',
      height: 0,
      visibility: 'hidden',
      width: 0
    }
  }, _react.default.createElement("defs", null, _react.default.createElement("filter", {
    id: "tint-" + id
  }, _react.default.createElement("feFlood", {
    floodColor: "" + tintColor
  }), _react.default.createElement("feComposite", {
    in2: "SourceAlpha",
    operator: "atop"
  })))) : null;
};

var Image =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Image, _Component);

  Image.getSize = function getSize(uri, success, failure) {
    _ImageLoader.default.getSize(uri, success, failure);
  };

  Image.prefetch = function prefetch(uri) {
    return _ImageLoader.default.prefetch(uri);
  };

  function Image(props, context) {
    var _this;

    _this = _Component.call(this, props, context) || this; // If an image has been loaded before, render it immediately

    _this._filterId = 0;
    _this._imageRef = null;
    _this._imageRequestId = null;
    _this._imageState = null;
    _this._isMounted = false;

    _this._createLayoutHandler = function (resizeMode) {
      var onLayout = _this.props.onLayout;

      if (resizeMode === 'center' || resizeMode === 'repeat' || onLayout) {
        return function (e) {
          var layout = e.nativeEvent.layout;
          onLayout && onLayout(e);

          _this.setState(function () {
            return {
              layout: layout
            };
          });
        };
      }
    };

    _this.srcset = function (images, maxWidth, maxHeight) {
      var maxDensity = 1;
      var candidates = images.split(',');
      if (candidates.length == 0) return false;
      var result;
      var filename, width, height, density;

      for (var i = 0; i < candidates.length; i++) {
        var descriptors = candidates[i].match(/^\s*([^\s]+)\s*(\s(\d+)w)?\s*(\s(\d+)h)?\s*(\s(\d+)x)?\s*$/);
        filename = descriptors[1];
        width = descriptors[3] || false;
        height = descriptors[5] || false;
        density = descriptors[7] || 1;

        if (width && width < maxWidth) {
          continue;
        }

        if (density && density > maxDensity) {
          continue;
        }

        return {
          result: filename,
          width: width,
          height: height
        };
      }

      return {
        result: filename,
        width: width,
        height: height
      };
    };

    _this._getBackgroundSize = function (resizeMode) {
      if (_this._imageRef && (resizeMode === 'center' || resizeMode === 'repeat')) {
        var _this$_imageRef = _this._imageRef,
            naturalHeight = _this$_imageRef.naturalHeight,
            naturalWidth = _this$_imageRef.naturalWidth;
        var _this$state$layout = _this.state.layout,
            height = _this$state$layout.height,
            width = _this$state$layout.width;

        if (naturalHeight && naturalWidth && height && width) {
          if (window && _this.props.srcSet) {
            var mywidth = _this.srcset(_this.props.srcSet, width, height).width; 
            if (mywidth > naturalWidth) window.location.reload();
          }

          var scaleFactor = Math.min(1, width / naturalWidth, height / naturalHeight);
          var x = Math.ceil(scaleFactor * naturalWidth);
          var y = Math.ceil(scaleFactor * naturalHeight);
          return {
            backgroundSize: x + "px " + y + "px"
          };
        }
      }
    };

    _this._onError = function () {
      var _this$props = _this.props,
          onError = _this$props.onError,
          source = _this$props.source;

      _this._updateImageState(STATUS_ERRORED);

      if (onError) {
        onError({
          nativeEvent: {
            error: "Failed to load resource " + resolveAssetUri(source) + " (404)"
          }
        });
      }

      _this._onLoadEnd();
    };

    _this._onLoad = function (e) {
      var _this$props2 = _this.props,
          onLoad = _this$props2.onLoad,
          source = _this$props2.source;
      var event = {
        nativeEvent: e
      };

      _ImageUriCache.default.add(resolveAssetUri(source));

      _this._updateImageState(STATUS_LOADED);

      if (onLoad) {
        onLoad(event);
      }

      _this._onLoadEnd();
    };

    _this._setImageRef = function (ref) {
      _this._imageRef = ref;
    };

    var uri = resolveAssetUri(props.source);

    var shouldDisplaySource = _ImageUriCache.default.has(uri);

    _this.state = {
      layout: {},
      shouldDisplaySource: shouldDisplaySource
    };
    _this._imageState = getImageState(uri, shouldDisplaySource);
    _this._filterId = filterId;
    filterId++;
    return _this;
  }

  var _proto = Image.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this._isMounted = true;

    if (this._imageState === STATUS_PENDING) {
      this._createImageLoader();
    } else if (this._imageState === STATUS_LOADED) {
      this._onLoad({
        target: this._imageRef
      });
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var prevUri = resolveAssetUri(prevProps.source);
    var uri = resolveAssetUri(this.props.source);

    if (prevUri !== uri) {
      _ImageUriCache.default.remove(prevUri);

      var isPreviouslyLoaded = _ImageUriCache.default.has(uri);

      isPreviouslyLoaded && _ImageUriCache.default.add(uri);

      this._updateImageState(getImageState(uri, isPreviouslyLoaded));
    }

    if (this._imageState === STATUS_PENDING) {
      this._createImageLoader();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var uri = resolveAssetUri(this.props.source);

    _ImageUriCache.default.remove(uri);

    this._destroyImageLoader();

    this._isMounted = false;
  };

  _proto.render = function render() {
    var shouldDisplaySource = this.state.shouldDisplaySource;
    var _this$props3 = this.props,
        accessibilityLabel = _this$props3.accessibilityLabel,
        srcSet = _this$props3.srcSet,
        accessible = _this$props3.accessible,
        blurRadius = _this$props3.blurRadius,
        defaultSource = _this$props3.defaultSource,
        draggable = _this$props3.draggable,
        source = _this$props3.source,
        testID = _this$props3.testID,
        capInsets = _this$props3.capInsets,
        style = _this$props3.style,
        styleAccessibilityImage = _this$props3.styleAccessibilityImage,
        styleImage = _this$props3.styleImage,
        onError = _this$props3.onError,
        onLayout = _this$props3.onLayout,
        onLoad = _this$props3.onLoad,
        onLoadEnd = _this$props3.onLoadEnd,
        onLoadStart = _this$props3.onLoadStart,
        resizeMethod = _this$props3.resizeMethod,
        resizeMode = _this$props3.resizeMode,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props3, ["accessibilityLabel", "srcSet", "accessible", "blurRadius", "defaultSource", "draggable", "source", "testID", "capInsets", "style", "styleAccessibilityImage", "styleImage", "onError", "onLayout", "onLoad", "onLoadEnd", "onLoadStart", "resizeMethod", "resizeMode"]);

    if (process.env.NODE_ENV !== 'production') {
      if (this.props.src) {
        console.warn('The <Image> component requires a `source` property rather than `src`.');
      }

      if (this.props.children) {
        throw new Error('The <Image> component cannot contain children. If you want to render content on top of the image, consider using the <ImageBackground> component or absolute positioning.');
      }
    }

    var selectedSource = shouldDisplaySource ? source : defaultSource;
    var displayImageUri = resolveAssetUri(selectedSource);
    var imageSizeStyle = resolveAssetDimensions(selectedSource);
    var backgroundImage = displayImageUri ? "url(\"" + displayImageUri + "\")" : null;
    var flatStyle = (0, _extends2.default)({}, _StyleSheet.default.flatten(style));
    var finalResizeMode = resizeMode || flatStyle.resizeMode || _ImageResizeMode.default.cover; // CSS filters

    var filters = [];
    var tintColor = flatStyle.tintColor;

    if (flatStyle.filter) {
      filters.push(flatStyle.filter);
    }

    if (blurRadius) {
      filters.push("blur(" + blurRadius + "px)");
    }

    if (flatStyle.shadowOffset) {
      var shadowString = (0, _resolveShadowValue.default)(flatStyle);

      if (shadowString) {
        filters.push("drop-shadow(" + shadowString + ")");
      }
    }

    if (flatStyle.tintColor) {
      filters.push("url(#tint-" + this._filterId + ")");
    } // these styles were converted to filters


    delete flatStyle.shadowColor;
    delete flatStyle.shadowOpacity;
    delete flatStyle.shadowOffset;
    delete flatStyle.shadowRadius;
    delete flatStyle.tintColor; // these styles are not supported on View

    delete flatStyle.overlayColor;
    delete flatStyle.resizeMode; // Accessibility image allows users to trigger the browser's image context menu

    var hiddenImage = displayImageUri ? (0, _createElement.default)('img', {
      alt: accessibilityLabel || '',
      draggable: draggable || false,
      ref: this._setImageRef,
      src: displayImageUri,
     // srcSet: srcSet,
      style: _StyleSheet.default.flatten([styles.accessibilityImage, styleAccessibilityImage])
    }) : null;

    var styleImages = _StyleSheet.default.flatten([styles.image, styleImage]);

    var View1Style = _StyleSheet.default.flatten([styles.root, this.context.isInAParentText && styles.inline, imageSizeStyle, flatStyle]);

    var View2style = _StyleSheet.default.flatten([styleImages, this._getBackgroundSize(finalResizeMode), backgroundImage && {
      backgroundImage: backgroundImage
    }, filters.length > 0 && {
      filter: filters.join(' ')
    }]);

    return _react.default.createElement(_View.default, (0, _extends2.default)({}, other, {
      accessibilityLabel: accessibilityLabel,
      accessible: accessible,
      onLayout: this._createLayoutHandler(finalResizeMode),
      style: View1Style,
      testID: testID
    }), _react.default.createElement(_View.default, {
      style: View2style
    }), hiddenImage, createTintColorSVG(tintColor, this._filterId));
  };

  _proto._createImageLoader = function _createImageLoader() {
    var source = this.props.source;

    this._destroyImageLoader();

    var uri = resolveAssetUri(source);
    this._imageRequestId = _ImageLoader.default.load(uri, this._onLoad, this._onError);

    this._onLoadStart();
  };

  _proto._destroyImageLoader = function _destroyImageLoader() {
    if (this._imageRequestId) {
      _ImageLoader.default.abort(this._imageRequestId);

      this._imageRequestId = null;
    }
  };

  _proto._onLoadEnd = function _onLoadEnd() {
    var onLoadEnd = this.props.onLoadEnd;

    if (onLoadEnd) {
      onLoadEnd();
    }
  };

  _proto._onLoadStart = function _onLoadStart() {
    var onLoadStart = this.props.onLoadStart;

    this._updateImageState(STATUS_LOADING);

    if (onLoadStart) {
      onLoadStart();
    }
  };

  _proto._updateImageState = function _updateImageState(status) {
    this._imageState = status;
    var shouldDisplaySource = this._imageState === STATUS_LOADED || this._imageState === STATUS_LOADING; // only triggers a re-render when the image is loading (to support PJEG), loaded, or failed

    if (shouldDisplaySource !== this.state.shouldDisplaySource) {
      if (this._isMounted) {
        this.setState(function () {
          return {
            shouldDisplaySource: shouldDisplaySource
          };
        });
      }
    }
  };

  return Image;
}(_react.Component);

Image.displayName = 'Image';
Image.contextTypes = {
  isInAParentText: _propTypes.bool
};
Image.propTypes = (0, _extends2.default)({}, _ViewPropTypes.default, {
  blurRadius: _propTypes.number,
  defaultSource: _ImageSourcePropType.default,
  draggable: _propTypes.bool,
  onError: _propTypes.func,
  onLayout: _propTypes.func,
  onLoad: _propTypes.func,
  onLoadEnd: _propTypes.func,
  onLoadStart: _propTypes.func,
  resizeMode: (0, _propTypes.oneOf)(Object.keys(_ImageResizeMode.default)),
  source: _ImageSourcePropType.default,
  style: (0, _StyleSheetPropType.default)(_ImageStylePropTypes.default),
  // compatibility with React Native

  /* eslint-disable react/sort-prop-types */
  capInsets: (0, _propTypes.shape)({
    top: _propTypes.number,
    left: _propTypes.number,
    bottom: _propTypes.number,
    right: _propTypes.number
  }),
  resizeMethod: (0, _propTypes.oneOf)(['auto', 'resize', 'scale'])
  /* eslint-enable react/sort-prop-types */

});
Image.defaultProps = {
  style: emptyObject
};
Image.resizeMode = _ImageResizeMode.default;

var styles = _StyleSheet.default.create({
  root: {
    flexBasis: 'auto',
    overflow: 'hidden',
    zIndex: 0
  },
  inline: {
    display: 'inline-flex'
  },
  image: (0, _extends2.default)({}, _StyleSheet.default.absoluteFillObject, {
    backgroundColor: 'transparent',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100%',
    width: '100%',
    zIndex: -1
  }),
  accessibilityImage: (0, _extends2.default)({}, _StyleSheet.default.absoluteFillObject, {
    height: '100%',
    opacity: 0,
    width: '100%',
    zIndex: -1
  })
});

var resizeModeStyles = _StyleSheet.default.create({
  center: {
    backgroundSize: 'auto'
  },
  contain: {
    backgroundSize: 'contain'
  },
  cover: {
    backgroundSize: 'cover'
  },
  none: {
    backgroundPosition: '0 0',
    backgroundSize: 'auto'
  },
  repeat: {
    backgroundPosition: '0 0',
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto'
  },
  stretch: {
    backgroundSize: '100% 100%'
  }
});

var _default = (0, _applyNativeMethods.default)(Image);

exports.default = _default;