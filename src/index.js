import fs from 'fs';
import path from 'path';
import pkg from '../package.json';
import Task from './task';
import Client from './client';
import UploadResult from './upload_result';

class ConvertAPI {
  constructor(secret, options = {}) {
    this.secret = secret;
    this.baseUri = options.baseUri || 'https://v2.convertapi.com/';
    this.conversionTimeout = options.conversionTimeout || 180;
    this.conversionTimeoutDelta = options.conversionTimeoutDelta || 10;
    this.uploadTimeout = options.uploadTimeout || 600;
    this.downloadTimeout = options.downloadTimeout || 600;
    this.userAgent = `convertapi-node-${pkg.version}`;

    this.client = new Client(this);
  }

  async convert(toFormat, params, fromFormat = null, conversionTimeout = null) {
    const task = new Task(this, fromFormat, toFormat, params, conversionTimeout);
    return task.run();
  }

  async upload(source, fileName = null) {
    const resolvedFileName = fileName || path.basename(source);
    const stream = fs.createReadStream(source);
    const fileId = await this.client.upload(stream, resolvedFileName);

    return new UploadResult(fileId, resolvedFileName);
  }

  async user() {
    return this.client.get('user');
  }
}

const init = (secret, options = {}) => new ConvertAPI(secret, options);

export default init;
