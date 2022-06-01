'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var _result = require('./result');

var _result2 = _interopRequireDefault(_result);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Task = class {
  constructor(api, fromFormat, toFormat, params, conversionTimeout) {
    this.api = api;
    this.fromFormat = fromFormat;
    this.toFormat = toFormat;
    this.conversionTimeout = conversionTimeout || api.conversionTimeout;
    this.params = params;
    this.defaultParams = { StoreFile: true };
  }

  run() {
    var _this = this;

    return _asyncToGenerator(function* () {
      let timeout;

      const params = yield _this.normalizeParams(_this.params);

      if (_this.conversionTimeout) {
        params.Timeout = _this.conversionTimeout;
        timeout = _this.conversionTimeout + _this.api.conversionTimeoutDelta;
      }

      const fromFormat = _this.fromFormat || (0, _utils.detectFormat)(params, _this.toFormat);
      const converter = params.converter ? `/converter/${params.converter}` : '';
      const path = `convert/${fromFormat}/to/${_this.toFormat}${converter}`;
      const response = yield _this.api.client.post(path, params, timeout);

      return new _result2.default(_this.api, response);
    })();
  }

  normalizeParams(params) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const result = Object.assign({}, params, _this2.defaultParams);

      if (params.File) {
        const file = yield params.File;
        result.File = yield (0, _utils.buildFileParam)(_this2.api, file);
      }

      if (params.Files) {
        const files = yield (0, _utils.normalizeFilesParam)(params.Files);
        const promises = files.map(function (file) {
          return (0, _utils.buildFileParam)(_this2.api, file);
        });
        result.Files = yield Promise.all(promises);
      }

      return result;
    })();
  }
};

exports.default = Task;