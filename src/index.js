class ConvertAPI {
  constructor(secret) {
    this.secret = secret;
  }
}

const init = secret => new ConvertAPI(secret);

export default init;
