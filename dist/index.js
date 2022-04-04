"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.curl = void 0;

var _assert = _interopRequireDefault(require("assert"));

var _https = require("https");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var curl = function curl(url) {
  return new Promise(function (resolve, reject) {
    (0, _https.get)(url, function (res) {
      var headers = res.headers,
          statusCode = res.statusCode;
      (0, _assert["default"])(!!statusCode);
      res.setEncoding("utf8");
      var body = "";
      res.on("data", function (chunk) {
        body += chunk;
      });
      res.on("end", function () {
        resolve({
          statusCode: statusCode,
          headers: headers,
          body: body
        });
      });
    }).on("error", function (e) {
      reject(e);
    });
  });
};

exports.curl = curl;