import path from 'path';
import pkg from '../package.json';
import Task from './task';
import Client from './client';
import { getReadableStream } from './utils';

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
  this.userAgent = `ConvertAPI-Node/${pkg.version}`;
  this.proxy = options.proxy;

  this.client = new Client(this);
}

async function convert(toFormat, params, fromFormat = null, conversionTimeout = null) {
  const task = new Task(this, fromFormat, toFormat, params, conversionTimeout);
  return task.run();
}

async function getUser() {
  return this.client.get('user');
}

async function upload(source, fileName = null) {
  const resolvedFileName = fileName || path.basename(source);
  const stream = getReadableStream(source);

  return this.client.upload(stream, resolvedFileName);
}

ConvertAPI.prototype = { convert, getUser, upload };

module.exports = ConvertAPI;

// expose constructor as a named property to enable mocking with Sinon.JS
module.exports.ConvertAPI = ConvertAPI;

// Allow use with the TypeScript compiler without `esModuleInterop`.
module.exports.default = ConvertAPI;
