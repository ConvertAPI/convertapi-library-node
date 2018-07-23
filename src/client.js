import axios from 'axios';
import fs from 'fs';
import qs from 'qs';

export default class Client {
  constructor(api) {
    this.api = api;
    this.defaultHeader = {
      'User-Agent': api.userAgent,
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    };
  }

  post(path, params, timeout = null) {
    return axios({
      method: 'post',
      url: this.url(path),
      headers: this.defaultHeader,
      data: qs.stringify(params),
      timeout: timeout * 1000,
    }).then(response => response.data);
  }

  download(url, path) {
    return axios({
      url,
      timeout: this.api.downloadTimeout * 1000,
      responseType: 'stream',
    }).then((response) => {
      response.data.pipe(fs.createWriteStream(path));
      return path;
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
    }).then(response => response.data.FileId);
  }

  url(path) {
    return `${this.api.baseUri}${path}?secret=${this.api.secret}`;
  }
}
