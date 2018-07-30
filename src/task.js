import { normalizeFilesParam, buildFileParam, detectFormat } from './utils';
import Result from './result';

const Task = class {
  constructor(api, fromFormat, toFormat, params, conversionTimeout) {
    this.api = api;
    this.fromFormat = fromFormat;
    this.toFormat = toFormat;
    this.conversionTimeout = conversionTimeout || api.conversionTimeout;
    this.params = params;
    this.defaultParams = {
      StoreFile: true,
      Timeout: this.conversionTimeout,
    };
  }

  async run() {
    const params = await this.normalizeParams(this.params);
    const fromFormat = this.fromFormat || detectFormat(params);
    const path = `convert/${fromFormat}/to/${this.toFormat}`;
    const timeout = this.conversionTimeout + this.api.conversionTimeoutDelta;
    const response = await this.api.client.post(path, params, timeout);

    return new Result(this.api, response);
  }

  async normalizeParams(params) {
    const result = Object.assign({}, params, this.defaultParams);

    if (params.File) {
      const file = await params.File;
      result.File = await buildFileParam(this.api, file);
    }

    if (params.Files) {
      const files = await normalizeFilesParam(params.Files);
      const promises = files.map(file => buildFileParam(this.api, file));
      result.Files = await Promise.all(promises);
    }

    return result;
  }
};

export default Task;
