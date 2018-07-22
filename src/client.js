import request from 'superagent';
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
    return request
      .post(this.url(path))
      .set(this.defaultHeader)
      .timeout(timeout * 1000)
      // .on('error', (error) => {
      //   // console.log(error.response.req);
      // })
      .type('form')
      .send(params)
      .then(response => response.body);
  }

  async download(url, path) {
    const stream = fs.createWriteStream(path);

    request
      .get(url)
      .timeout(this.api.downloadTimeout * 1000)
      .pipe(stream);

    return new Promise((resolve) => {
      stream.on('finish', () => {
        stream.close(() => resolve(path));
      });
    });
  }

  async upload(stream, fileName) {
    const encodedFileName = encodeURIComponent(fileName);

    const headers = Object.assign({
      'Content-Disposition': `attachment; filename*=UTF-8''${encodedFileName}`
    }, this.defaultHeader);

    return new Promise((resolve) => {
      const req = request
        .post(this.url('upload'))
        .set(headers)
        .type('octet-stream')
        .timeout(this.api.uploadTimeout * 1000)
        .on('response', response => resolve(response.body.FileId));

      stream.pipe(req);
    });
  }

  url(path) {
    return `${this.api.baseUri}${path}?secret=${this.api.secret}`;
  }
}
