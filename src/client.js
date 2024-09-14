import axios from 'axios';
import fs from 'fs';
import https from 'https';
import { buildQueryString, encodeFileName } from './utils';
import UploadResult from './upload_result';
import Error from './error';

export default class Client {
  constructor(api) {
    this.api = api;
    this.defaultHeader = {
      'User-Agent': api.userAgent,
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${api.credentials}`,
      Accept: 'application/json',
    };
    this.httpsAgent = new https.Agent({ keepAlive: api.keepAlive });
  }

  get(path, params = {}, timeout = null) {
    const options = this.buildOptions({
      method: 'get',
      url: this.url(path),
      params,
      timeout: timeout * 1000,
    });

    return axios(options)
      .then(response => response.data)
      .catch(error => Client.handleError(error));
  }

  post(path, params, timeout = null) {
    const options = this.buildOptions({
      method: 'post',
      url: this.url(path),
      data: buildQueryString(params),
      timeout: timeout * 1000,
    });

    return axios(options)
      .then(response => response.data)
      .catch(error => Client.handleError(error));
  }

  async download(url, path) {
    const options = this.buildOptions({
      url,
      timeout: this.api.downloadTimeout * 1000,
      responseType: 'stream',
    });

    const response = await axios(options)
      .catch(error => Client.handleError(error));

    const writer = fs.createWriteStream(path);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        resolve(path);
      });

      writer.on('error', (error) => {
        reject(new Error(error));
      });

      response.data.on('error', (error) => {
        reject(new Error(error));
      });
    });
  }

  upload(stream, fileName) {
    const encodedFileName = encodeFileName(fileName);

    const headers = Object.assign({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodedFileName}`
    }, this.defaultHeader);

    const options = this.buildOptions({
      method: 'post',
      url: this.url('upload'),
      headers,
      data: stream,
      timeout: this.api.uploadTimeout * 1000,
    });

    return axios(options)
      .then(response => new UploadResult(response.data))
      .catch(error => Client.handleError(error));
  }

  url(path) {
    return `${this.api.baseUri}${path}`;
  }

  buildOptions(options) {
    return Object.assign({
      headers: this.defaultHeader,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      proxy: this.api.proxy,
      httpsAgent: this.httpsAgent,
    }, options);
  }

  static handleError(error) {
    let data;

    if (error.response && error.response.data) {
      ({ data } = error.response);
    }

    throw new Error(error, data);
  }
}
