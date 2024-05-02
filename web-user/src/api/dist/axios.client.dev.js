"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _queryString = _interopRequireDefault(require("query-string"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var baseURL = "https://finalserver-kz69.onrender.com/api/";

var axiosClient = _axios["default"].create({
  baseURL: baseURL,
  paramsSerializer: {
    encode: function encode(params) {
      return _queryString["default"].stringify(params);
    }
  }
});

axiosClient.interceptors.request.use(function _callee(config) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", _objectSpread({}, config, {
            headers: {
              Authorization: "Bearer ".concat(localStorage.getItem("token"))
            }
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
axiosClient.interceptors.response.use(function (response) {
  if (response && response.data) return response.data;
  return response;
}, function (err) {
  throw err.response.data;
});
var _default = axiosClient;
exports["default"] = _default;