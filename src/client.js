const request = require('superagent');

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

  url(path) {
    return `${this.api.baseUri}${path}?secret=${this.api.secret}`;
  }
}
