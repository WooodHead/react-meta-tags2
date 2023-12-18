"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _client = require("react-dom/client");
var _utils = require("./utils");
var _meta_tags_context = require("./meta_tags_context");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/** An wrapper component to wrap element which need to shifted to head **/
var MetaTags = /*#__PURE__*/function (_Component) {
  _inherits(MetaTags, _Component);
  var _super = _createSuper(MetaTags);
  function MetaTags() {
    _classCallCheck(this, MetaTags);
    return _super.apply(this, arguments);
  }
  _createClass(MetaTags, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.temporaryElement = document.createElement('div');
      this.root = (0, _client.createRoot)(this.temporaryElement);
      this.handleChildrens();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(oldProps) {
      if (oldProps.children !== this.props.children) {
        this.handleChildrens();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.root) {
        this.root.unmount();
      }
    }
  }, {
    key: "extractChildren",
    value: function extractChildren() {
      var extract = this.context.extract;
      var children = this.props.children;
      if (!children) {
        return;
      }
      if (extract) {
        extract(children);
      }
    }
  }, {
    key: "handleChildrens",
    value: function handleChildrens() {
      var children = this.props.children;
      if (this.context.extract || !children) {
        return;
      }
      function AppWithCallbackAfterRender(props) {
        var _this = props.this;
        (0, _react.useEffect)(function () {
          var childStr = _this.temporaryElement.innerHTML;

          //if html is not changed return
          if (_this.lastChildStr === childStr) {
            return;
          }
          _this.lastChildStr = childStr;
          var tempHead = _this.temporaryElement.querySelector('.react-head-temp');

          // .react-head-temp might not exist when triggered from async action
          if (tempHead === null) {
            return;
          }
          var childNodes = Array.prototype.slice.call(tempHead.children);
          var head = document.head;
          var headHtml = head.innerHTML;

          //filter children remove if children has not been changed
          childNodes = childNodes.filter(function (child) {
            return headHtml.indexOf(child.outerHTML) === -1;
          });

          //create clone of childNodes
          childNodes = childNodes.map(function (child) {
            return child.cloneNode(true);
          });

          //remove duplicate title and meta from head
          childNodes.forEach(function (child) {
            var tag = child.tagName.toLowerCase();
            if (tag === 'title') {
              var title = (0, _utils.getDuplicateTitle)();
              if (title) (0, _utils.removeChild)(head, title);
            } else if (child.id) {
              // if the element has id defined remove the existing element with that id
              var elm = (0, _utils.getDuplicateElementById)(child);
              if (elm) (0, _utils.removeChild)(head, elm);
            } else if (tag === 'meta') {
              var meta = (0, _utils.getDuplicateMeta)(child);
              if (meta) (0, _utils.removeChild)(head, meta);
            } else if (tag === 'link' && child.rel === 'canonical') {
              var link = (0, _utils.getDuplicateCanonical)(child);
              if (link) (0, _utils.removeChild)(head, link);
            }
          });
          (0, _utils.appendChild)(document.head, childNodes);
        });
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "react-head-temp"
        }, children);
      }
      this.root.render( /*#__PURE__*/_react.default.createElement(AppWithCallbackAfterRender, {
        this: this
      }));
    }
  }, {
    key: "render",
    value: function render() {
      this.extractChildren();
      return null;
    }
  }]);
  return MetaTags;
}(_react.Component);
_defineProperty(MetaTags, "contextType", _meta_tags_context.MetaContext);
var _default = exports.default = MetaTags;
module.exports = exports.default;