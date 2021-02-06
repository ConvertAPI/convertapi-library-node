import axios from 'axios';
import fs from 'fs';
import { buildQueryString, encodeFileName } from './utils';
import UploadResult from './upload_result';
import Error from './error';

export default class Client {
  constructor(api) {
    this.api = api;
    this.defaultHeader = {
      'User-Agent': api.userAgent,
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    };
  }

  get(path, params = {}, timeout = null) {
    const options = {
      method: 'get',
      url: this.url(path),
      headers: this.defaultHeader,
      params,
      timeout: timeout * 1000,
      proxy: this.api.proxy,
    };

    return axios(options)
      .then(response => response.data)
      .catch(error => Client.handleError(error));
  }

  post(path, params, timeout = null) {
    const options = {
      method: 'post',
      url: this.url(path),
      headers: this.defaultHeader,
      data: buildQueryString(params),
      timeout: timeout * 1000,
      proxy: this.api.proxy,
    };

    return axios(options)
      .then(response => response.data)
      .catch(error => Client.handleError(error));
  }

  async download(url, path) {
    const options = {
      url,
      timeout: this.api.downloadTimeout * 1000,
      proxy: this.api.proxy,
      responseType: 'stream',
    };

    const response = await axios(options)
      .catch(error => Client.handleError(error));

    response.data.pipe(fs.createWriteStream(path));

    return new Promise((resolve, reject) => {
      response.data.on('end', () => {
        resolve(path);
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

    const options = {
      method: 'post',
      url: this.url('upload'),
      headers,
      data: stream,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      timeout: this.api.uploadTimeout * 1000,
      proxy: this.api.proxy,
    };

    return axios(options)
      .then(response => new UploadResult(response.data))
      .catch(error => Client.handleError(error));
  }

  url(path) {
    return `${this.api.baseUri}/${path}?secret=${this.api.secret}`;
  }

  static handleError(error) {
    let data;

    if (error.response && error.response.data) {
      ({ data } = error.response);
    }

    throw new Error(error, data);
  }
}
