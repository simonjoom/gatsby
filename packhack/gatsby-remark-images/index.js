"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireWildcard(require("react"));

var _reactNativeWeb = require("react-native-web");

var _jsxFileName = "/Users/simon/gatsby/gatsby-blog/gatsby-remark-images/src/index.js";

var ReactDOMServer = require('react-dom/server');

var visitWithParents = require("unist-util-visit-parents");

var path = require("path");

var isRelativeUrl = require("is-relative-url");

var _ = require("lodash");

var _require = require("gatsby-plugin-sharp"),
    fluid = _require.fluid;

var Promise = require("bluebird");

var cheerio = require("cheerio");

var slash = require("slash"); // If the image is relative (not hosted elsewhere)
// 1. Find the image file
// 2. Find the image's size
// 3. Filter out any responsive image fluid sizes that are greater than the image's width
// 4. Create the responsive images.
// 5. Set the html w/ aspect ratio helper.


var MakeTag = function MakeTag(props) {
  var srcIm = props.srcIm,
      options = props.options,
      myclass = props.myclass,
      presentationWidth = props.presentationWidth,
      webpFluidResult = props.webpFluidResult,
      fluidResult = props.fluidResult,
      srcSet = props.srcSet,
      ratio = props.ratio,
      style = props.style,
      other = props.other;

  if (webpFluidResult) {
    return _react.default.createElement("picture", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34
      },
      __self: this
    }, _react.default.createElement("source", {
      srcset: webpFluidResult.srcSet,
      sizes: webpFluidResult.sizes,
      type: webpFluidResult.srcSetType,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 35
      },
      __self: this
    }), _react.default.createElement("source", {
      srcset: srcSet,
      sizes: fluidResult.sizes,
      type: fluidResult.srcSetType,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40
      },
      __self: this
    }), _react.default.createElement(_reactNativeWeb.Image, {
      defaultSource: {
        uri: fluidResult.base64
      },
      source: {
        uri: srcIm
      },
      style: style,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45
      },
      __self: this
    }));
  } else {
    var style1 = {
      maxWidth: presentationWidth + 'px'
    };
    var style2 = [options.wrapperStyle, {
      paddingBottom: ratio,
      bottom: 0,
      left: 0
    }];
    return _react.default.createElement(_reactNativeWeb.View, {
      className: "gatsby-resp-image-wrapper",
      style: style1,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 65
      },
      __self: this
    }, _react.default.createElement(_reactNativeWeb.View, {
      className: "gatsby-resp-image-background-image",
      style: style2,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 66
      },
      __self: this
    }, _react.default.createElement(_reactNativeWeb.Image, {
      defaultSource: {
        uri: fluidResult.base64
      },
      source: {
        uri: srcIm
      },
      style: style,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 67
      },
      __self: this
    })));
  }
};

module.exports =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(_ref, pluginOptions) {
    var files, markdownNode, markdownAST, pathPrefix, getNode, reporter, defaults, options, findParentLinks, rawHtmlNodes, markdownImageNodes, generateImagesAndUpdateNode;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            files = _ref.files, markdownNode = _ref.markdownNode, markdownAST = _ref.markdownAST, pathPrefix = _ref.pathPrefix, getNode = _ref.getNode, reporter = _ref.reporter;
            defaults = {
              maxWidth: 650,
              wrapperStyle: {
                position: 'relative'
              },
              backgroundColor: "white",
              linkImagesToOriginal: true,
              showCaptions: false,
              pathPrefix: pathPrefix,
              withWebp: false
            };
            options = _.defaults(pluginOptions, defaults);

            findParentLinks = function findParentLinks(_ref3) {
              var children = _ref3.children;
              return children.some(function (node) {
                return node.type === "html" && !!node.value.match(/<a /) || node.type === "link";
              });
            }; // This will allow the use of html image tags
            // const rawHtmlNodes = select(markdownAST, `html`)


            rawHtmlNodes = [];
            visitWithParents(markdownAST, "html", function (node, ancestors) {
              var inLink = ancestors.some(findParentLinks);
              rawHtmlNodes.push({
                node: node,
                inLink: inLink
              });
            }); // This will only work for markdown syntax image tags

            markdownImageNodes = [];
            visitWithParents(markdownAST, "image", function (node, ancestors) {
              var inLink = ancestors.some(findParentLinks);
              markdownImageNodes.push({
                node: node,
                inLink: inLink
              });
            }); // Takes a node and generates the needed images and then returns
            // the needed HTML replacement for the image

            generateImagesAndUpdateNode =
            /*#__PURE__*/
            function () {
              var _ref4 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee(node, resolve, inLink) {
                var parentNode, imagePath, imageNode, fluidResult, ratio, originalImg, fallbackSrc, srcSet, presentationWidth, srcSplit, fileName, fileNameNoExt, defaultAlt, imageClass, imageStyle, webpFluidResult, Wrappimagetag, showCaptions, ImageTag, Wrappimagetagfinal, svgDataUriPattern, Pattern, rawHTML, match, before, svg, after;
                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        // Check if this markdownNode has a File parent. This plugin
                        // won't work if the image isn't hosted locally.
                        parentNode = getNode(markdownNode.parent);

                        if (!(parentNode && parentNode.dir)) {
                          _context.next = 5;
                          break;
                        }

                        imagePath = slash(path.join(parentNode.dir, node.url));
                        _context.next = 6;
                        break;

                      case 5:
                        return _context.abrupt("return", null);

                      case 6:
                        //console.log('visitWithParents', files)
                        imageNode = _.find(files, function (file) {
                          if (file && file.name === '.DS_Store') return null;

                          if (file && file.absolutePath) {
                            return file.absolutePath === imagePath;
                          }

                          return null;
                        });

                        if (!(!imageNode || !imageNode.absolutePath)) {
                          _context.next = 9;
                          break;
                        }

                        return _context.abrupt("return", resolve());

                      case 9:
                        _context.next = 11;
                        return fluid({
                          file: imageNode,
                          args: options,
                          reporter: reporter
                        });

                      case 11:
                        fluidResult = _context.sent;

                        if (fluidResult) {
                          _context.next = 14;
                          break;
                        }

                        return _context.abrupt("return", resolve());

                      case 14:
                        // Calculate the paddingBottom %
                        ratio = 1 / fluidResult.aspectRatio * 100 + "%";
                        originalImg = fluidResult.originalImg;
                        fallbackSrc = fluidResult.src;
                        srcSet = fluidResult.srcSet;
                        presentationWidth = fluidResult.presentationWidth; // Generate default alt tag

                        srcSplit = node.url.split("/");
                        fileName = srcSplit[srcSplit.length - 1];
                        fileNameNoExt = fileName.replace(/\.[^/.]+$/, "");
                        defaultAlt = fileNameNoExt.replace(/[^A-Z0-9]/gi, " "); // TODO
                        // Fade in images on load.
                        // https://www.perpetual-beta.org/weblog/silky-smooth-image-loading.html

                        imageClass = "gatsby-resp-image-image";
                        imageStyle = {
                          height: '50px',
                          //  verticalAlign: 'middle',
                          position: 'relative',
                          boxShadow: 'inset 0px 0px 0px 400px ' + options.backgroundColor
                        };
                        showCaptions = options.showCaptions && node.title;

                        if (!options.withWebp) {
                          _context.next = 30;
                          break;
                        }

                        _context.next = 29;
                        return fluid({
                          file: imageNode,
                          args: _.defaults({
                            toFormat: "WEBP"
                          }, // override options if it's an object, otherwise just pass through defaults
                          options.withWebp === true ? {} : options.withWebp, pluginOptions, defaults),
                          reporter: reporter
                        });

                      case 29:
                        webpFluidResult = _context.sent;

                      case 30:
                        // Create our base image tag
                        ImageTag = _react.default.createElement(MakeTag, {
                          options: options,
                          ratio: ratio,
                          webpFluidResult: webpFluidResult,
                          fluidResult: fluidResult,
                          myclass: imageClass,
                          style: imageStyle,
                          srcIm: fallbackSrc,
                          srcSet: srcSet,
                          alt: node.alt ? node.alt : defaultAlt,
                          title: node.title ? node.title : "",
                          presentationWidth: presentationWidth,
                          __source: {
                            fileName: _jsxFileName,
                            lineNumber: 198
                          },
                          __self: this
                        });

                        if (!inLink && options.linkImagesToOriginal) {
                          Wrappimagetag = function Wrappimagetag() {
                            return _react.default.createElement("a", {
                              className: "gatsby-resp-image-link",
                              href: originalImg,
                              style: {
                                display: 'block'
                              },
                              target: "_blank",
                              rel: "noopener",
                              __source: {
                                fileName: _jsxFileName,
                                lineNumber: 215
                              },
                              __self: this
                            }, _react.default.createElement(ImageTag, {
                              __source: {
                                fileName: _jsxFileName,
                                lineNumber: 222
                              },
                              __self: this
                            }));
                          };
                        }

                        // Wrap in figure and use title as caption
                        if (showCaptions) {
                          Wrappimagetagfinal = function Wrappimagetagfinal() {
                            return _react.default.createElement("figure", {
                              className: "gatsby-resp-image-figure",
                              style: options.wrapperStyle,
                              __source: {
                                fileName: _jsxFileName,
                                lineNumber: 230
                              },
                              __self: this
                            }, _react.default.createElement(Wrappimagetag, {
                              __source: {
                                fileName: _jsxFileName,
                                lineNumber: 234
                              },
                              __self: this
                            }), _react.default.createElement("figcaption", {
                              className: "gatsby-resp-image-figcaption",
                              __source: {
                                fileName: _jsxFileName,
                                lineNumber: 235
                              },
                              __self: this
                            }, "$", node.title));
                          };
                        } else {
                          Wrappimagetagfinal = function Wrappimagetagfinal() {
                            return _react.default.createElement(Wrappimagetag, {
                              __source: {
                                fileName: _jsxFileName,
                                lineNumber: 241
                              },
                              __self: this
                            });
                          };
                        }

                        svgDataUriPattern = /(.*)url\(&quot;data:image\/jpeg;base64,(.*)&quot;\)(">.*)/;
                        Pattern = new RegExp(/&quot;/, 'g'); // Make linking to original image optional.

                        _context.next = 37;
                        return ReactDOMServer.renderToStaticMarkup(ImageTag);

                      case 37:
                        rawHTML = _context.sent;
                        // rawHTML = rawHTML.replace(Pattern, '')
                        match = rawHTML.match(svgDataUriPattern); // inline SVG markup may contain characters (e.g., #, ") that need to be escaped

                        if (match) {
                          before = match[1], svg = match[2], after = match[3]; //rawHTML = before + "url('data:image/svg+xml;utf8,zefzefezfze')" + encodedS + encodedSvg + after

                          rawHTML = before + 'url(data:image/jpeg;base64,' + svg + ')' + after;
                          rawHTML = rawHTML.replace(Pattern, '');
                        }

                        return _context.abrupt("return", rawHTML);

                      case 41:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function generateImagesAndUpdateNode(_x3, _x4, _x5) {
                return _ref4.apply(this, arguments);
              };
            }();

            return _context4.abrupt("return", Promise.all( // Simple because there is no nesting in markdown
            markdownImageNodes.map(function (_ref5) {
              var node = _ref5.node,
                  inLink = _ref5.inLink;
              return new Promise(
              /*#__PURE__*/
              function () {
                var _ref6 = (0, _asyncToGenerator2.default)(
                /*#__PURE__*/
                _regenerator.default.mark(function _callee2(resolve, reject) {
                  var fileType, rawHTML;
                  return _regenerator.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          fileType = node.url.slice(-3); // Ignore gifs as we can't process them,
                          // svgs as they are already responsive by definition

                          if (!(isRelativeUrl(node.url) && fileType !== "gif" && fileType !== "svg")) {
                            _context2.next = 9;
                            break;
                          }

                          _context2.next = 4;
                          return generateImagesAndUpdateNode(node, resolve, inLink);

                        case 4:
                          rawHTML = _context2.sent;

                          if (rawHTML) {
                            // Replace the image node with an inline HTML node.
                            node.type = "html";
                            node.value = rawHTML;
                          }

                          return _context2.abrupt("return", resolve(node));

                        case 9:
                          return _context2.abrupt("return", resolve());

                        case 10:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this);
                }));

                return function (_x6, _x7) {
                  return _ref6.apply(this, arguments);
                };
              }());
            })).then(function (markdownImageNodes) {
              return (// HTML image node stuff
                Promise.all( // Complex because HTML nodes can contain multiple images
                rawHtmlNodes.map(function (_ref7) {
                  var node = _ref7.node,
                      inLink = _ref7.inLink;
                  return new Promise(
                  /*#__PURE__*/
                  function () {
                    var _ref8 = (0, _asyncToGenerator2.default)(
                    /*#__PURE__*/
                    _regenerator.default.mark(function _callee3(resolve, reject) {
                      var $, imageRefs, _i, thisImg, formattedImgTag, fileType, rawHTML;

                      return _regenerator.default.wrap(function _callee3$(_context3) {
                        while (1) {
                          switch (_context3.prev = _context3.next) {
                            case 0:
                              if (node.value) {
                                _context3.next = 2;
                                break;
                              }

                              return _context3.abrupt("return", resolve());

                            case 2:
                              $ = cheerio.load(node.value);

                              if (!($("img").length === 0)) {
                                _context3.next = 5;
                                break;
                              }

                              return _context3.abrupt("return", resolve());

                            case 5:
                              imageRefs = [];
                              $("img").each(function () {
                                imageRefs.push($(this));
                              });
                              _i = 0;

                            case 8:
                              if (!(_i < imageRefs.length)) {
                                _context3.next = 29;
                                break;
                              }

                              thisImg = imageRefs[_i];
                              // Get the details we need.
                              formattedImgTag = {};
                              formattedImgTag.url = thisImg.attr("src");
                              formattedImgTag.title = thisImg.attr("title");
                              formattedImgTag.alt = thisImg.attr("alt");

                              if (formattedImgTag.url) {
                                _context3.next = 16;
                                break;
                              }

                              return _context3.abrupt("return", resolve());

                            case 16:
                              fileType = formattedImgTag.url.slice(-3); // Ignore gifs as we can't process them,
                              // svgs as they are already responsive by definition

                              if (!(isRelativeUrl(formattedImgTag.url) && fileType !== "gif" && fileType !== "svg")) {
                                _context3.next = 26;
                                break;
                              }

                              _context3.next = 20;
                              return generateImagesAndUpdateNode(formattedImgTag, resolve, inLink);

                            case 20:
                              rawHTML = _context3.sent;

                              if (!rawHTML) {
                                _context3.next = 25;
                                break;
                              }

                              // Replace the image string
                              thisImg.replaceWith(rawHTML);
                              _context3.next = 26;
                              break;

                            case 25:
                              return _context3.abrupt("return", resolve());

                            case 26:
                              _i++;
                              _context3.next = 8;
                              break;

                            case 29:
                              // Replace the image node with an inline HTML node.
                              node.type = "html";
                              node.value = $("body").html(); // fix for cheerio v1

                              return _context3.abrupt("return", resolve(node));

                            case 32:
                            case "end":
                              return _context3.stop();
                          }
                        }
                      }, _callee3, this);
                    }));

                    return function (_x8, _x9) {
                      return _ref8.apply(this, arguments);
                    };
                  }());
                })).then(function (htmlImageNodes) {
                  return markdownImageNodes.concat(htmlImageNodes).filter(function (node) {
                    return !!node;
                  });
                })
              );
            }));

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();