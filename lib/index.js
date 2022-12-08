'use strict';

let convert = (() => {
  var _ref = _asyncToGenerator(function* (toFormat, params, fromFormat = null, conversionTimeout = null) {
    const task = new _task2.default(this, fromFormat, toFormat, params, conversionTimeout);
    return task.run();
  });

  return function convert(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

let getUser = (() => {
  var _ref2 = _asyncToGenerator(function* () {
    return this.client.get('user');
  });

  return function getUser() {
    return _ref2.apply(this, arguments);
  };
})();

let upload = (() => {
  var _ref3 = _asyncToGenerator(function* (source, fileName = null) {
    const resolvedFileName = fileName || _path2.default.basename(source);
    const stream = (0, _utils.getReadableStream)(source);

    return this.client.upload(stream, resolvedFileName);
  });

  return function upload(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _task = require('./task');

var _task2 = _interopRequireDefault(_task);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function ConvertAPI(secret, options = {}) {
  if (!(this instanceof ConvertAPI)) {
    return new ConvertAPI(secret, options);
  }

  this.secret = secret;
  this.baseUri = options.baseUri || 'https://v2.convertapi.com';
  this.conversionTimeout = options.conversionTimeout;
  this.conversionTimeoutDelta = options.conversionTimeoutDelta || 10;
  this.uploadTimeout = options.uploadTimeout || 1800;
  this.downloadTimeout = options.downloadTimeout || 1800;
  this.userAgent = `ConvertAPI-Node/${_package2.default.version}`;
  this.proxy = options.proxy;

  this.client = new _client2.default(this);
}

ConvertAPI.prototype = { convert, getUser, upload };

module.exports = ConvertAPI;

// expose constructor as a named property to enable mocking with Sinon.JS
module.exports.ConvertAPI = ConvertAPI;

// Allow use with the TypeScript compiler without `esModuleInterop`.
module.exports.default = ConvertAPI;