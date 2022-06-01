'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _result_file = require('./result_file');

var _result_file2 = _interopRequireDefault(_result_file);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class Result {
  constructor(api, response) {
    this.api = api;
    this.response = response;
  }

  get conversionCost() {
    return this.response.ConversionCost;
  }

  get jobId() {
    return this.response.JobId;
  }

  get file() {
    return this.files[0];
  }

  get files() {
    const list = this.response.Files || [];
    return list.map(file => new _result_file2.default(this.api, file));
  }

  saveFiles(path) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const promises = _this.files.map(function (file) {
        return file.save(path);
      });

      return Promise.all(promises);
    })();
  }
}
exports.default = Result;