import Result from './result';

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
    const params = this.normalizeParams();
    const path = `convert/${this.fromFormat}/to/${this.toFormat}`;
    const timeout = this.conversionTimeout + this.api.conversionTimeoutDelta;

    const response = await this.api.client.post(path, params, timeout);

    return new Result(this.api, response);
  }

  async normalizeParams() {
    const result = {};

    Object.keys(this.params).forEach((key) => {
      result[key] = this.params[key];
    });

    return Object.assign(result, this.defaultParams);
  }
}
