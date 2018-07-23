import Result from './result';
import { detectFormat, buildFileParam } from './utils';

export default class Task {
  constructor(api, fromFormat, toFormat, params, conversionTimeout) {
    this.api = api;
    this.fromFormat = fromFormat;
    this.toFormat = toFormat;
    this.params = params;
    this.conversionTimeout = conversionTimeout || api.conversionTimeout;

    this.defaultParams = {
      StoreFile: true,
      Timeout: this.conversionTimeout,
    };
  }

  async run() {
    const params = await this.normalizeParams();
    const fromFormat = this.fromFormat || detectFormat(this.params);
    const path = `convert/${fromFormat}/to/${this.toFormat}`;
    const timeout = this.conversionTimeout + this.api.conversionTimeoutDelta;

    const response = await this.api.client.post(path, params, timeout);

    return new Result(this.api, response);
  }

  async normalizeParams() {
    const params = Object.assign({}, this.params, this.defaultParams);

    if (params.File) {
      params.File = await buildFileParam(this.api, params.File);
    }

    if (params.Files) {
      const promises = params.Files.map(file => buildFileParam(this.api, file));
      params.Files = await Promise.all(promises);
    }

    return params;
  }
}
