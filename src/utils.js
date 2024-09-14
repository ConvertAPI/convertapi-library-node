import path from 'path';
import url from 'url';
import querystring from 'querystring';
import fs from 'fs';
import stream from 'stream';
import Result from './result';
import ResultFile from './result_file';
import UploadResult from './upload_result';

const URI_REGEXP = /^https?:/i;
const DEFAULT_URL_FORMAT = 'url';
const ANY_FORMAT = 'any';

export const normalizeFilesParam = async (promise) => {
  const value = await promise;

  if (value instanceof Result) {
    return value.files;
  }

  return Promise.all(value);
};

export const normalizeBaseUri = (baseUri) => {
  if (baseUri[baseUri.length - 1] !== '/') {
    return `${baseUri}/`;
  }

  return baseUri;
};

export const buildFileParam = async (api, value) => {
  if (URI_REGEXP.test(value)) {
    return value;
  }

  if (value instanceof Result) {
    return value.file.url;
  }

  if (value instanceof ResultFile) {
    return value.url;
  }

  if (value instanceof UploadResult) {
    return value;
  }

  return api.upload(value);
};

export const detectFormat = (params, toFormat) => {
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
    [resource] = params.Files;
  }

  if (resource instanceof ResultFile) {
    resource = resource.url;
  }

  if (resource instanceof UploadResult) {
    return resource.fileExt;
  }

  const { pathname } = url.parse(resource);

  return path.extname(pathname).substring(1);
};

export const buildQueryString = (params) => {
  const result = {};

  Object.keys(params).forEach((key) => {
    const val = params[key];

    if (val instanceof Array) {
      val.forEach((v, i) => {
        result[`${key}[${i}]`] = v.toString();
      });
    } else {
      result[key] = val.toString();
    }
  });

  return querystring.stringify(result);
};

export const getReadableStream = (source) => {
  if (source instanceof stream.Readable) {
    return source;
  }

  return fs.createReadStream(source);
};

export const encodeFileName = (fileName) => {
  const str = encodeURIComponent(fileName);
  return str.replace(/[!'()*]/g, c => `%${c.charCodeAt(0).toString(16)}`);
};
