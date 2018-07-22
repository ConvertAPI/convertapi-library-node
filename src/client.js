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
      .send(await params)
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

  url(path) {
    return `${this.api.baseUri}${path}?secret=${this.api.secret}`;
  }
}
