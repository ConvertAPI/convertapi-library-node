'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class ResultFile {
  constructor(api, fileInfo) {
    this.api = api;
    this.fileInfo = fileInfo;
  }

  get url() {
    return this.fileInfo.Url;
  }

  get fileName() {
    return this.fileInfo.FileName;
  }

  get fileSize() {
    return this.fileInfo.FileSize;
  }

  save(filePath) {
    var _this = this;

    return _asyncToGenerator(function* () {
      let downloadPath;

      if (_fs2.default.existsSync(filePath) && _fs2.default.statSync(filePath).isDirectory()) {
        downloadPath = filePath + _path2.default.sep + _this.fileName;
      } else {
        downloadPath = filePath;
      }

      return _this.api.client.download(_this.url, downloadPath);
    })();
  }
}
exports.default = ResultFile;