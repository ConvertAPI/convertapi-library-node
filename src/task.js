import {
  normalizeFilesParam,
  buildFileParam,
  detectFormat,
} from './utils';
import Result from './result';

const Task = class {
  constructor(api, fromFormat, toFormat, params, conversionTimeout) {
    this.api = api;
    this.fromFormat = fromFormat;
    this.toFormat = toFormat;
    this.conversionTimeout = conversionTimeout || api.conversionTimeout;
    this.params = params;
    this.defaultParams = { StoreFile: true };
  }

  async run() {
    let timeout;

    const params = await this.normalizeParams(this.params);

    if (this.conversionTimeout) {
      params.Timeout = this.conversionTimeout;
      timeout = this.conversionTimeout + this.api.conversionTimeoutDelta;
    }

    const fromFormat = this.fromFormat || detectFormat(params, this.toFormat);
    const path = `convert/${fromFormat}/to/${this.toFormat}`;
    const response = await this.api.client.post(path, params, timeout);

    return new Result(this.api, response);
  }

  async normalizeParams(params) {
    const result = Object.assign({}, params, this.defaultParams);
    const fileParams = Object.keys(params).filter(key => key.endsWith('File') && key !== 'StoreFile');

    await Promise.all(fileParams.map(async (key) => {
      const file = await params[key];
      result[key] = await buildFileParam(this.api, file);
    }));

    if (params.Files) {
      const files = await normalizeFilesParam(params.Files);
      const promises = files.map(file => buildFileParam(this.api, file));
      result.Files = await Promise.all(promises);
    }

    return result;
  }
};

export default Task;
