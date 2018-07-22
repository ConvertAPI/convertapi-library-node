import fs from 'fs';

const URI_REGEXP = /^https?:/i;

const buildFileParam = (api, value) => {
  if (URI_REGEXP.test(value)) {
    return value;
  }

  const stream = fs.createReadStream(value);

  return api.client.upload(stream, 'test.docx');
};

export default {
  buildFileParam
};
