"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = require("react");

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var Portal =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Portal, _Component);

  function Portal() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      el: null,
      target: null
    };
    return _this;
  }

  var _proto = Portal.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.setState({
      el: document.createElement('div'),
      target: document.body
    }, function () {
      _this2.state.target.appendChild(_this2.state.el);
    });
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.state.target.removeChild(this.state.el);
  };

  _proto.render = function render() {
    var children = this.props.children;

    if (this.state.el) {
      return _reactDom.default.createPortal(children, this.state.el);
    }

    return null;
  };

  return Portal;
}(_react.Component);

exports.default = Portal;
Portal.propTypes = {
  children: _propTypes.default.node.isRequired
};