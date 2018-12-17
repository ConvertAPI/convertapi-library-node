import axios from 'axios';
import fs from 'fs';
import { buildQueryString } from './utils';
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
    return axios({
      method: 'get',
      url: this.url(path),
      headers: this.defaultHeader,
      params,
      timeout: timeout * 1000,
    }).then(response => response.data).catch((error) => {
      throw new Error(error, error.response.data);
    });
  }

  post(path, params, timeout = null) {
    return axios({
      method: 'post',
      url: this.url(path),
      headers: this.defaultHeader,
      data: buildQueryString(params),
      timeout: timeout * 1000,
    }).then(response => response.data).catch((error) => {
      throw new Error(error, error.response.data);
    });
  }

  async download(url, path) {
    const response = await axios({
      url,
      timeout: this.api.downloadTimeout * 1000,
      responseType: 'stream',
    }).catch((error) => {
      throw new Error(error);
    });

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
    const encodedFileName = encodeURIComponent(fileName);

    const headers = Object.assign({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodedFileName}`
    }, this.defaultHeader);

    return axios({
      method: 'post',
      url: this.url('upload'),
      headers,
      data: stream,
      timeout: this.api.uploadTimeout * 1000,
    }).then(response => new UploadResult(response.data))
      .catch((error) => {
        throw new Error(error);
      });
  }

  url(path) {
    return `${this.api.baseUri}/${path}?secret=${this.api.secret}`;
  }
}
