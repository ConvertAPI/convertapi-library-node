export default class ClientError extends Error {
  constructor(error, data = null) {
    let message;

    if (data && data.Message) {
      message = `${data.Message} Code: ${data.Code}`;

      if (data.InvalidParameters) {
        message += ` ${JSON.stringify(data.InvalidParameters)}`;
      }
    }

    super(message || error.message);

    this.request = error.request;
    this.response = error.response;
    this.data = data;
  }
}
