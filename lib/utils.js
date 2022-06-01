'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encodeFileName = exports.getReadableStream = exports.buildQueryString = exports.detectFormat = exports.buildFileParam = exports.normalizeFilesParam = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _stream = require('stream');

var _stream2 = _interopRequireDefault(_stream);

var _result = require('./result');

var _result2 = _interopRequireDefault(_result);

var _result_file = require('./result_file');

var _result_file2 = _interopRequireDefault(_result_file);

var _upload_result = require('./upload_result');

var _upload_result2 = _interopRequireDefault(_upload_result);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const URI_REGEXP = /^https?:/i;
const DEFAULT_URL_FORMAT = 'url';
const ANY_FORMAT = 'any';

const normalizeFilesParam = exports.normalizeFilesParam = (() => {
  var _ref = _asyncToGenerator(function* (promise) {
    const value = yield promise;

    if (value instanceof _result2.default) {
      return value.files;
    }

    return Promise.all(value);
  });

  return function normalizeFilesParam(_x) {
    return _ref.apply(this, arguments);
  };
})();

const buildFileParam = exports.buildFileParam = (() => {
  var _ref2 = _asyncToGenerator(function* (api, value) {
    if (URI_REGEXP.test(value)) {
      return value;
    }

    if (value instanceof _result2.default) {
      return value.file.url;
    }

    if (value instanceof _result_file2.default) {
      return value.url;
    }

    if (value instanceof _upload_result2.default) {
      return value;
    }

    return api.upload(value);
  });

  return function buildFileParam(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
})();

const detectFormat = exports.detectFormat = (params, toFormat) => {
  let resource;

  if (toFormat.toString().toLowerCase() === 'zip') {
    return ANY_FORMAT;
  }

  if (params.Url) {
    return DEFAULT_URL_FORMAT;
  }

  if (params.File) {
    resource = params.File;
  } else if (params.Files) {
    var _params$Files = _slicedToArray(params.Files, 1);

    resource = _params$Files[0];
  }

  if (resource instanceof _result_file2.default) {
    resource = resource.url;
  }

  if (resource instanceof _upload_result2.default) {
    return resource.fileExt;
  }

  var _url$parse = _url2.default.parse(resource);

  const pathname = _url$parse.pathname;


  return _path2.default.extname(pathname).substring(1);
};

const buildQueryString = exports.buildQueryString = params => {
  const result = {};

  Object.keys(params).forEach(key => {
    const val = params[key];

    if (val instanceof Array) {
      val.forEach((v, i) => {
        result[`${key}[${i}]`] = v.toString();
      });
    } else {
      result[key] = val.toString();
    }
  });

  return _querystring2.default.stringify(result);
};

const getReadableStream = exports.getReadableStream = source => {
  if (source instanceof _stream2.default.Readable) {
    return source;
  }

  return _fs2.default.createReadStream(source);
};

const encodeFileName = exports.encodeFileName = fileName => {
  const str = encodeURIComponent(fileName);
  return str.replace(/[!'()*]/g, c => `%${c.charCodeAt(0).toString(16)}`);
};