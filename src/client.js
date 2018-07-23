import request from 'request';
import fs from 'fs';

export default class Client {
  constructor(api) {
    this.api = api;
    this.defaultHeader = {
      'User-Agent': api.userAgent,
      Accept: 'application/json',
    };
  }

  async post(path, params, timeout = null) {
    const options = {
      url: this.url(path),
      headers: this.defaultHeader,
      form: params,
      timeout: timeout * 1000,
      json: true
    };

    return new Promise((resolve, reject) => {
      request.post(options, (err, _response, body) => {
        if (err) {
          reject(err);
        }

        resolve(body);
      });
    });
  }

  async download(url, path) {
    const stream = fs.createWriteStream(path);
    const timeout = this.api.downloadTimeout * 1000;

    return new Promise((resolve, reject) => {
      request
        .get(url, { timeout })
        .on('error', err => reject(err))
        .pipe(stream);

      stream.on('finish', () => {
        stream.close(() => resolve(path));
      });
    });
  }

  async upload(stream, fileName) {
    const encodedFileName = encodeURIComponent(fileName);

    const headers = Object.assign({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodedFileName}`
    }, this.defaultHeader);

    const options = {
      headers,
      url: this.url('upload'),
      timeout: this.api.uploadTimeout * 1000,
      json: true
    };

    return new Promise((resolve, reject) => {
      const req = request
        .post(options, (err, _response, body) => {
          if (err) {
            reject(err);
          }

          resolve(body.FileId);
        });

      stream.pipe(req);
    });
  }

  url(path) {
    return `${this.api.baseUri}${path}?secret=${this.api.secret}`;
  }
}
