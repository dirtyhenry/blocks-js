"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = void 0;

var _assert = _interopRequireDefault(require("assert"));

var _https = require("https");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Fetches the given URL as a simple `GET` request.
 *
 * Node should bring native support of the Fetch API so this method is scheduled to become
 * obsolete pretty soon.
 *
 * @param url The URL to fetch.
 * @param userAgent The content of the `User-Agent` header sent with the request.
 * @returns The response to the request (ie headers, status code and body).
 */
var fetch = function fetch(url, userAgent) {
  return new Promise(function (resolve, reject) {
    (0, _https.get)(url, {
      headers: {
        "User-Agent": userAgent
      }
    }, function (res) {
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

exports.fetch = fetch;