import fs from 'fs';

const URI_REGEXP = /^https?:/i;

export const buildFileParam = (api, value) => {
  if (URI_REGEXP.test(value)) {
    return value;
  }

  const stream = fs.createReadStream(value);

  return api.client.upload(stream, 'test.docx');
};

export default {};
