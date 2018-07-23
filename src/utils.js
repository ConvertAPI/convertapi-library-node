import fs from 'fs';
import path from 'path';

const URI_REGEXP = /^https?:/i;

export const buildFileParam = (api, value) => {
  if (URI_REGEXP.test(value)) {
    return value;
  }

  const stream = fs.createReadStream(value);
  const fileName = path.basename(value);

  return api.client.upload(stream, fileName);
};

export default {};
