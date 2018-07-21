import pkg from '../package.json';
import Task from './task';
import Client from './client';

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
}

const init = secret => new ConvertAPI(secret);

export default init;
